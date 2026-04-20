import React, { useState, useEffect, useRef, useCallback } from "react";
import OutputLine from "./OutputLine";
import { processCommand, WELCOME_MESSAGE } from "./commands";
import { themes } from "../data/portfolio";
import { useGitHub } from "../hooks/useGitHub";

const PROMPT_HOST = "portfolio";
const PROMPT_USER = "piyush";

const ALL_COMMANDS = [
  "help", "about", "skills", "projects", "open", "experience",
  "education", "contact", "email", "github", "contrib", "neofetch",
  "download cv", "joke", "gui", "theme", "clear", "banner",
  "whoami", "pwd", "ls", "date",
];

export default function Terminal() {
  const [theme, setTheme] = useState(themes.matrix);
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [input, setInput] = useState("");
  const [displayedBanner, setDisplayedBanner] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const { stats: githubStats, graph: githubGraph, loading: ghLoading, error: ghError, fetchStats } = useGitHub();

  // Show welcome banner once
  useEffect(() => {
    if (!displayedBanner) {
      setHistory([{ id: Date.now(), type: "output", lines: WELCOME_MESSAGE }]);
      setDisplayedBanner(true);
    }
  }, [displayedBanner]);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const pushOutput = useCallback((lines) => {
    setHistory((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), type: "output", lines },
    ]);
  }, []);

  const handleCommand = useCallback(
    async (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const result = processCommand(trimmed, theme, setTheme, githubStats);

      setCmdHistory((prev) => [trimmed, ...prev]);
      setCmdIndex(-1);

      if (!result) return;

      // Clear
      if (result.action === "clear") {
        setHistory([]);
        return;
      }

      // Push the command prompt entry
      setHistory((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), type: "entry", command: trimmed },
      ]);

      // ── handle async actions BEFORE pushing static lines ──────────────────

      if (result.action?.type === "github_stats") {
        pushOutput([{ type: "muted", content: "Fetching GitHub stats..." }]);
        try {
          const token = process.env.REACT_APP_GITHUB_TOKEN;
          if (!token) throw new Error("REACT_APP_GITHUB_TOKEN not set in .env");

          // GraphQL query — gets user, repos, contributions all in one request
          const query = `{
            user(login: "${getGithubUsername()}") {
              login
              bio
              followers { totalCount }
              createdAt
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
              }
              repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
                nodes {
                  name
                  stargazerCount
                  forkCount
                  primaryLanguage { name }
                }
              }
            }
          }`;

          const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              "Authorization": `bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
          const json = await res.json();
          if (json.errors) throw new Error(json.errors[0].message);

          const u = json.data.user;
          const repos = u.repositories.nodes;

          const totalStars = repos.reduce((s, r) => s + (r.stargazerCount || 0), 0);
          const totalForks = repos.reduce((s, r) => s + (r.forkCount || 0), 0);
          const langCount = {};
          repos.forEach(r => {
            if (r.primaryLanguage?.name) {
              langCount[r.primaryLanguage.name] = (langCount[r.primaryLanguage.name] || 0) + 1;
            }
          });
          const topLangs = Object.entries(langCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([l]) => l);

          const stats = {
            username: u.login,
            bio: u.bio || "Full Stack Developer",
            publicRepos: repos.length,
            totalStars,
            totalForks,
            topLangs,
            topLanguage: topLangs[0] || "JavaScript",
            followers: u.followers.totalCount,
            contributions: u.contributionsCollection.contributionCalendar.totalContributions,
            createdAt: new Date(u.createdAt).getFullYear(),
          };

          pushOutput([
            { type: "section", content: "GITHUB STATS" },
            { type: "spacer" },
            { type: "github_stats", stats },
          ]);
        } catch (err) {
          pushOutput([{ type: "error", content: `GitHub fetch failed: ${err.message}` }]);
        }
        return;
      }

      if (result.action?.type === "github_graph") {
        pushOutput([{ type: "muted", content: "Building contribution graph..." }]);
        try {
          const token = process.env.REACT_APP_GITHUB_TOKEN;
          if (!token) throw new Error("REACT_APP_GITHUB_TOKEN not set in .env");

          const query = `{
            user(login: "${getGithubUsername()}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }`;

          const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              "Authorization": `bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
          const json = await res.json();
          if (json.errors) throw new Error(json.errors[0].message);

          const calendar = json.data.user.contributionsCollection.contributionCalendar;
          const allWeeks = calendar.weeks;

          // Build cells: each week is an array of 7 days (0-4 intensity)
          const cells = allWeeks.map(w =>
            w.contributionDays.map(d => {
              const c = d.contributionCount;
              if (c === 0) return 0;
              if (c <= 2) return 1;
              if (c <= 5) return 2;
              if (c <= 9) return 3;
              return 4;
            })
          );

          // Month labels — show only when month changes
          const months = allWeeks.map((w, i) => {
            const date = new Date(w.contributionDays[0].date);
            const prev = i > 0 ? new Date(allWeeks[i - 1].contributionDays[0].date) : null;
            return (!prev || date.getMonth() !== prev.getMonth())
              ? date.toLocaleString("default", { month: "short" })
              : "";
          });

          pushOutput([
            { type: "section", content: "CONTRIBUTION GRAPH" },
            { type: "spacer" },
            { type: "github_graph", graph: {
                cells,
                months,
                totalContribs: calendar.totalContributions,
            }},
          ]);
        } catch (err) {
          pushOutput([{ type: "error", content: `Contribution graph failed: ${err.message}` }]);
        }
        return;
      }

      if (result.action?.type === "email_form") {
        pushOutput([{ type: "email_form" }]);
        return;
      }

      if (result.action?.type === "download") {
        const a = document.createElement("a");
        a.href = result.action.url;
        a.download = result.action.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      if (result.action?.type === "redirect") {
        setTimeout(() => window.open(result.action.url, "_blank"), 700);
      }

      // Push static output lines
      if (result.lines?.length > 0) {
        pushOutput(result.lines);
      }
    },
    [theme, githubStats, pushOutput]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = cmdIndex + 1;
      if (next < cmdHistory.length) { setCmdIndex(next); setInput(cmdHistory[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cmdIndex - 1;
      if (next < 0) { setCmdIndex(-1); setInput(""); }
      else { setCmdIndex(next); setInput(cmdHistory[next]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = ALL_COMMANDS.find(
        (c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()
      );
      if (match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const t = theme;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace",
      }}
      onClick={focusInput}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "860px",
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: `0 0 40px ${t.accent}18, 0 20px 60px rgba(0,0,0,0.8)`,
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div style={{ background: t.bg, borderBottom: `1px solid ${t.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <span style={{ color: t.muted, fontSize: "12px", margin: "0 auto", letterSpacing: "1px" }}>
            piyush — portfolio — {PROMPT_USER}@{PROMPT_HOST}
          </span>
          <span style={{ color: t.muted, fontSize: "11px", opacity: 0.6 }}>{t.label || t.name}</span>
        </div>

        {/* Output */}
        <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto", overflowX: "hidden" }}>
          {history.map((item) =>
            item.type === "entry" ? (
              <div key={item.id} style={{ display: "flex", gap: "8px", margin: "10px 0 2px 0", fontFamily: "inherit", fontSize: "13px" }}>
                <span style={{ color: t.success, userSelect: "none" }}>{PROMPT_USER}</span>
                <span style={{ color: t.muted, userSelect: "none" }}>@</span>
                <span style={{ color: t.prompt, userSelect: "none" }}>{PROMPT_HOST}</span>
                <span style={{ color: t.muted, userSelect: "none" }}>:~$</span>
                <span style={{ color: t.text }}>{item.command}</span>
              </div>
            ) : (
              <div key={item.id} style={{ marginBottom: "4px" }}>
                {item.lines.map((line, i) => (
                  <OutputLine key={i} line={line} theme={t} />
                ))}
              </div>
            )
          )}

          {/* Input line */}
          <div style={{ display: "flex", gap: "8px", marginTop: "10px", fontFamily: "inherit", fontSize: "13px", alignItems: "center" }}>
            <span style={{ color: t.success, userSelect: "none" }}>{PROMPT_USER}</span>
            <span style={{ color: t.muted, userSelect: "none" }}>@</span>
            <span style={{ color: t.prompt, userSelect: "none" }}>{PROMPT_HOST}</span>
            <span style={{ color: t.muted, userSelect: "none" }}>:~$</span>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ background: "transparent", border: "none", outline: "none", color: t.text, fontFamily: "inherit", fontSize: "13px", flex: 1, caretColor: t.cursor }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Status bar */}
        <div style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "5px 16px", display: "flex", gap: "16px", flexShrink: 0, flexWrap: "wrap" }}>
          {["help", "github", "contrib", "neofetch", "joke", "download cv", "theme list"].map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => { e.stopPropagation(); handleCommand(cmd); focusInput(); }}
              style={{ background: "none", border: "none", color: t.muted, fontFamily: "inherit", fontSize: "11px", cursor: "pointer", padding: "2px 0", letterSpacing: "0.5px", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.target.style.color = t.accent)}
              onMouseLeave={(e) => (e.target.style.color = t.muted)}
            >
              {cmd}
            </button>
          ))}
          <span style={{ marginLeft: "auto", color: t.muted, fontSize: "11px", opacity: 0.5, alignSelf: "center" }}>
            ↑↓ history · tab · ctrl+l
          </span>
        </div>
      </div>

      {/* Non-tech link */}
      <div style={{ marginTop: "14px", color: t.muted, fontSize: "12px", textAlign: "center", opacity: 0.7 }}>
        Not a developer?{" "}
        <span
          style={{ color: t.accent, cursor: "pointer", textDecoration: "underline" }}
          onClick={() => { handleCommand("gui"); focusInput(); }}
        >
          Click here for the visual portfolio →
        </span>
      </div>
    </div>
  );
}

// ─── helpers ─────────────────────────────────────────────────────────────────
// ─── helpers ─────────────────────────────────────────────────────────────────

import { portfolioData } from "../data/portfolio";

function getGithubUsername() {
  return portfolioData.githubUsername;
}

// buildContribGraph removed — using GitHub GraphQL API instead