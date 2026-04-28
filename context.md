# Project context: terminal-portfolio
Generated: 2026-04-28 · 12 files · stripped: comments, blank_lines, console_logs

---

## Project structure

```
terminal-portfolio/
├── README.md
├── package.json
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── components/
    │   ├── OutputLine.js
    │   ├── Terminal.js
    │   └── commands.js
    ├── data/
    │   ├── jokes.js
    │   └── portfolio.js
    ├── hooks/
    │   └── useGitHub.js
    ├── index.css
    └── index.js
```

---

## Files

### `README.md`

```md
# Piyush — Terminal Portfolio
A command-line themed React portfolio. Type commands to explore.
## Quick Start
```bash
npm install
npm start
```
## Customize
Edit `src/data/portfolio.js` to update:
- Your name, title, location, email, links
- About text
- Skills
- Projects
- Experience
- Education
- Contact info
- Windows portfolio URL (`windowsPortfolio`)
## Commands
| Command | Description |
|---------|-------------|
| `help` | Show all commands |
| `about` | Who you are |
| `skills` | Tech stack |
| `projects` | Things you've built |
| `experience` | Work history |
| `education` | Academic background |
| `contact` | Get in touch |
| `theme list` | List color themes |
| `theme <name>` | Switch theme (matrix, amber, cyberpunk, dracula, mono) |
| `gui` / `windows` | Open Windows-style portfolio |
| `clear` | Clear terminal |
| `banner` | Show welcome banner |
### Keyboard Shortcuts
- `↑` / `↓` — Browse command history
- `Tab` — Autocomplete commands
- `Ctrl+L` — Clear terminal
## Themes
- `matrix` — Classic green on black
- `amber` — Retro orange/amber
- `cyberpunk` — Neon blue with pink accents
- `dracula` — Purple tones
- `mono` — Clean monochrome
## Windows Portfolio
Update the `windowsPortfolio` URL in `src/data/portfolio.js` to point to your hosted Windows-themed portfolio.
## Build
```bash
npm run build
```
Deploys to `build/` folder. Works with Vercel, Netlify, GitHub Pages.
```

### `package.json`

```json
{
  "name": "terminal-portfolio",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "piyush17": "^1.0.0",
    "piyushai": "^1.0.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version"
    ]
  }
}
```

### `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0d0d0d" />
    <meta name="description" content="Piyush — Full Stack Developer Portfolio" />
    <title>Piyush · Terminal Portfolio</title>
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin
    />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### `src/App.js`

```js
import React from "react";
import Terminal from "./components/Terminal";
export default function App() {
  return <Terminal />;
}
```

### `src/components/OutputLine.js`

```js
import React from "react";
export default function OutputLine({ line, theme: t }) {
  const base = { fontFamily: "inherit", lineHeight: "1.65", margin: "1px 0" };
  switch (line.type) {
    case "ascii":
      return <pre style={{ ...base, color: t.accent, fontSize: "12px", lineHeight: "1.2", margin: "2px 0", whiteSpace: "pre" }}>{line.content}</pre>;
    case "spacer":
      return <div style={{ height: "6px" }} />;
    case "divider":
      return <div style={{ height: "1px", background: t.border, margin: "5px 0" }} />;
    case "section":
      return (
        <div style={{ ...base, color: t.accent, fontSize: "10px", letterSpacing: "3px", borderBottom: `1px solid ${t.border}`, paddingBottom: "3px", margin: "8px 0 4px 0" }}>
          {line.content}
        </div>
      );
    case "text":
      return <div style={{ ...base, color: t.text, fontSize: "13px", whiteSpace: "pre-wrap" }}>{line.content}</div>;
    case "muted":
      return <div style={{ ...base, color: t.muted, fontSize: "12px" }}>{line.content}</div>;
    case "info":
      return <div style={{ ...base, color: t.info, fontSize: "13px", fontWeight: "bold" }}>{line.content}</div>;
    case "error":
      return <div style={{ ...base, color: t.error, fontSize: "13px" }}>✗ {line.content}</div>;
    case "success":
      return <div style={{ ...base, color: t.success, fontSize: "13px" }}>✓ {line.content}</div>;
    case "link":
      return (
        <div
          style={{ ...base, color: t.accent, fontSize: "12px", textDecoration: "underline", cursor: "pointer" }}
          onClick={() => window.open(line.content.trim(), "_blank")}
        >
          {line.content}
        </div>
      );
    case "project_name":
      return <div style={{ ...base, color: t.accent, fontSize: "13px", fontWeight: "bold" }}>{line.content}</div>;
    case "project_links": {
      return (
        <div style={{ display: "flex", gap: "16px", paddingLeft: "4px", margin: "2px 0" }}>
          {line.github && (
            <span
              onClick={() => window.open(line.github, "_blank")}
              style={{ color: t.muted, fontSize: "12px", cursor: "pointer", fontFamily: "inherit" }}
              onMouseEnter={(e) => (e.target.style.color = t.accent)}
              onMouseLeave={(e) => (e.target.style.color = t.muted)}
            >
              ⌥ GitHub
            </span>
          )}
          {line.live && (
            <span
              onClick={() => window.open(line.live, "_blank")}
              style={{ color: t.muted, fontSize: "12px", cursor: "pointer", fontFamily: "inherit" }}
              onMouseEnter={(e) => (e.target.style.color = t.success)}
              onMouseLeave={(e) => (e.target.style.color = t.muted)}
            >
              ↗ Live
            </span>
          )}
        </div>
      );
    }
    case "bullet":
      return (
        <div style={{ ...base, color: t.text, fontSize: "13px", paddingLeft: "14px" }}>
          <span style={{ color: t.muted, marginRight: "7px" }}>›</span>
          {line.content}
        </div>
      );
    case "keyval":
      return (
        <div style={{ display: "flex", gap: "8px", margin: "2px 0", fontFamily: "inherit" }}>
          <span style={{ color: t.muted, fontSize: "12px", minWidth: "120px" }}>{line.label}</span>
          <span style={{ color: t.text, fontSize: "13px" }}>{line.value}</span>
        </div>
      );
    case "skillrow":
      return (
        <div style={{ display: "flex", gap: "12px", margin: "3px 0", fontFamily: "inherit", alignItems: "flex-start" }}>
          <span style={{ color: t.accent, fontSize: "10px", letterSpacing: "1px", minWidth: "100px", paddingTop: "2px" }}>
            {line.label}
          </span>
          <span style={{ color: t.text, fontSize: "12px", lineHeight: "1.7" }}>
            {line.items.join("  ·  ")}
          </span>
        </div>
      );
    case "exp_role":
      return (
        <div style={{ margin: "2px 0", fontFamily: "inherit" }}>
          <span style={{ color: t.accent, fontSize: "13px", fontWeight: "bold" }}>{line.role}</span>
          <span style={{ color: t.muted, fontSize: "12px" }}> @ {line.company}</span>
          <span style={{ color: t.muted, fontSize: "11px", float: "right", fontStyle: "italic" }}>{line.period}</span>
        </div>
      );
    case "education_item":
      return (
        <div style={{ margin: "2px 0", fontFamily: "inherit" }}>
          <div style={{ color: t.accent, fontSize: "13px", fontWeight: "bold" }}>{line.degree}</div>
          <div style={{ color: t.muted, fontSize: "12px" }}>{line.school} · {line.year}</div>
        </div>
      );
    case "theme_item":
      return (
        <div style={{ display: "flex", gap: "12px", margin: "2px 0", fontFamily: "inherit" }}>
          <span style={{ color: t.accent, fontSize: "12px", minWidth: "110px" }}>{line.name}</span>
          <span style={{ color: t.muted, fontSize: "12px" }}>{line.label}</span>
        </div>
      );
    case "cmd":
      return (
        <div style={{ display: "flex", gap: "12px", margin: "2px 0", fontFamily: "inherit" }}>
          <span style={{ color: t.accent, fontSize: "12px", minWidth: "160px" }}>{line.label}</span>
          <span style={{ color: t.muted, fontSize: "12px" }}>{line.desc}</span>
        </div>
      );
    case "joke":
      return (
        <div style={{
          ...base,
          color: t.text,
          fontSize: "13px",
          borderLeft: `2px solid ${t.accent}`,
          paddingLeft: "12px",
          fontStyle: "italic",
          maxWidth: "600px",
        }}>
          {line.content}
        </div>
      );
    case "neofetch_card": {
      const ASCII_SMALL = [
        " ██████╗ ",
        " ██╔══██╗",
        " ██████╔╝",
        " ██╔═══╝ ",
        " ██║     ",
        " ╚═╝     ",
      ];
      return (
        <div style={{ display: "flex", gap: "24px", fontFamily: "inherit" }}>
          {}
          <div style={{ flexShrink: 0 }}>
            {ASCII_SMALL.map((row, i) => (
              <div key={i} style={{ color: t.accent, fontSize: "11px", lineHeight: "1.55", whiteSpace: "pre" }}>
                {row}
              </div>
            ))}
          </div>
          {}
          <div style={{ flex: 1 }}>
            {line.rows.map(([label, value], i) => (
              <div key={i} style={{ display: "flex", gap: "6px", margin: "1px 0" }}>
                <span style={{ color: t.accent, fontSize: "12px", minWidth: "130px", fontWeight: "bold" }}>{label}</span>
                <span style={{ color: t.muted, fontSize: "12px", marginRight: "4px" }}>~</span>
                <span style={{ color: t.text, fontSize: "12px" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "color_palette": {
      const swatchColors = [t.error, t.success, t.info, t.accent, t.text, t.muted, t.border, t.prompt];
      return (
        <div style={{ display: "flex", gap: "4px", paddingLeft: "0px", marginTop: "4px" }}>
          {swatchColors.map((c, i) => (
            <div key={i} style={{ width: "16px", height: "16px", background: c, borderRadius: "2px" }} />
          ))}
        </div>
      );
    }
  case "github_stats": {
  const s = line.stats || {};
  return (
    <div style={{ fontFamily: "inherit" }}>
      {}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: t.accent,
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          @{s.username || "github-user"}
        </span>
        <span style={{ color: t.muted, fontSize: "12px" }}>
          {s.bio || "GitHub Developer"}
        </span>
      </div>
      {}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        {[
          ["Repositories", s.publicRepos ?? 0],
          ["Stars Earned", s.totalStars ?? 0],
          ["Top Language", s.topLanguage || "JavaScript"],
          ["Pinned Projects", s.pinnedProjects ?? 0],
          ["Forks", s.totalForks ?? 0],
          ["Total Contributions", s.contributions ?? 0],
        ].map(([label, val]) => (
          <div
            key={label}
            style={{
              border: `1px solid ${t.border}`,
              padding: "10px",
              borderRadius: "6px",
              background: t.surface,
            }}
          >
            <div
              style={{
                color: t.accent,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {val}
            </div>
            <div style={{ color: t.muted, fontSize: "11px" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      {}
      {(s.topLangs || []).length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "6px",
          }}
        >
          {(s.topLangs || []).map((lang) => (
            <span
              key={lang}
              style={{
                padding: "3px 8px",
                borderRadius: "12px",
                fontSize: "11px",
                background: t.accent,
                color: t.bg,
              }}
            >
              {lang}
            </span>
          ))}
        </div>
      )}
      <div style={{ color: t.muted, fontSize: "11px" }}>
        GitHub since {s.createdAt || "2023"}
      </div>
    </div>
  );
}
case "github_graph": {
  const g = line.graph || {};
  const cells = g.cells || [];   
  const months = g.months || []; 
  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const levelColor = (level) => {
    if (level === 0) return "#161b22";
    if (level === 1) return "#0e4429";
    if (level === 2) return "#006d32";
    if (level === 3) return "#26a641";
    return "#39d353";
  };
  const CELL = 11;
  const GAP  = 3;
  const totalContribs = cells.reduce((sum, week) =>
    sum + week.reduce((s, d) => s + d, 0), 0
  );
  return (
    <div style={{ fontFamily: "inherit", overflowX: "auto" }}>
      {}
      <div style={{ color: t.muted, fontSize: "12px", marginBottom: "10px" }}>
        {totalContribs} contributions in the last {cells.length} weeks
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {}
        <div style={{ display: "flex", flexDirection: "column", gap: `${GAP}px`, paddingTop: "18px" }}>
          {DAY_LABELS.map((d, i) => (
            <div key={i} style={{
              height: CELL,
              fontSize: "9px",
              color: t.muted,
              lineHeight: `${CELL}px`,
              textAlign: "right",
              paddingRight: "4px",
              opacity: i % 2 === 1 ? 1 : 0, 
            }}>
              {d}
            </div>
          ))}
        </div>
        {}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {}
          <div style={{ display: "flex", gap: `${GAP}px`, marginBottom: "4px", height: "14px" }}>
            {[...months].reverse().map((label, wi) => (
              <div key={wi} style={{
                width: CELL,
                fontSize: "9px",
                color: t.muted,
                whiteSpace: "nowrap",
                overflow: "visible",
              }}>
                {label}
              </div>
            ))}
          </div>
          {}
          {Array.from({ length: 7 }, (_, dayIdx) => (
            <div key={dayIdx} style={{ display: "flex", gap: `${GAP}px`, marginBottom: `${GAP}px` }}>
              {[...cells].reverse().map((week, weekIdx) => {
                const level = week[dayIdx] ?? 0;
                return (
                  <div
                    key={weekIdx}
                    title={`${level} contribution${level !== 1 ? "s" : ""}`}
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: "2px",
                      background: levelColor(level),
                      flexShrink: 0,
                      transition: "background 0.15s",
                      cursor: "default",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "10px" }}>
        <span style={{ color: "#8b949e", fontSize: "10px", marginRight: "4px" }}>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} style={{
            width: CELL,
            height: CELL,
            borderRadius: "2px",
            background: levelColor(l),
            border: "1px solid rgba(255,255,255,0.05)",
          }} />
        ))}
        <span style={{ color: "#8b949e", fontSize: "10px", marginLeft: "4px" }}>More</span>
      </div>
    </div>
  );
}
    case "email_form":
      return <EmailForm theme={t} onSend={line.onSend} />;
    default:
      return null;
  }
}
function EmailForm({ theme: t, onSend }) {
  const [step, setStep] = React.useState("name"); 
  const [form, setForm] = React.useState({ name: "", subject: "", message: "" });
  const [input, setInput] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [step]);
  const STEPS = {
    name: { prompt: "Your name:", field: "name", next: "subject" },
    subject: { prompt: "Subject:", field: "subject", next: "message" },
    message: { prompt: "Message:", field: "message", next: "confirm" },
    confirm: { prompt: "Send this message? [y/n]:", field: null, next: "done" },
  };
  const handleKey = (e) => {
    if (e.key !== "Enter") return;
    const val = input.trim();
    if (step === "confirm") {
      if (val.toLowerCase() === "y") {
        const { name, subject, message } = form;
        window.open(
          `mailto:${portfolioData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\n\n${message}`)}`,
          "_blank"
        );
        setSent(true);
        setStep("done");
      } else {
        setSent(false);
        setStep("done");
      }
      setInput("");
      return;
    }
    const current = STEPS[step];
    if (!val && step !== "confirm") return;
    setForm((prev) => ({ ...prev, [current.field]: val }));
    setInput("");
    setStep(current.next);
  };
  const labelStyle = { color: t.accent, fontSize: "12px", minWidth: "90px", flexShrink: 0, fontFamily: "inherit" };
  const valStyle = { color: t.text, fontSize: "12px", fontFamily: "inherit" };
  return (
    <div style={{ border: `1px solid ${t.border}`, padding: "12px 16px", borderRadius: "4px", marginTop: "4px", maxWidth: "520px" }}>
      <div style={{ color: t.accent, fontSize: "10px", letterSpacing: "2px", marginBottom: "10px", borderBottom: `1px solid ${t.border}`, paddingBottom: "6px" }}>
        COMPOSE MESSAGE
      </div>
      {}
      {form.name && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
          <span style={labelStyle}>Name</span>
          <span style={valStyle}>{form.name}</span>
        </div>
      )}
      {form.subject && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
          <span style={labelStyle}>Subject</span>
          <span style={valStyle}>{form.subject}</span>
        </div>
      )}
      {form.message && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
          <span style={labelStyle}>Message</span>
          <span style={valStyle}>{form.message}</span>
        </div>
      )}
      {}
      {step === "done" ? (
        <div style={{ color: sent ? t.success : t.muted, fontSize: "13px", marginTop: "8px", fontFamily: "inherit" }}>
          {sent ? "✓ Mail client opened. Message ready to send!" : "Cancelled. Run 'email' anytime to try again."}
        </div>
      ) : (
        <div style={{ display: "flex", gap: "8px", marginTop: "6px", alignItems: "center" }}>
          <span style={labelStyle}>{STEPS[step]?.prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${t.border}`,
              outline: "none",
              color: t.text,
              fontFamily: "inherit",
              fontSize: "12px",
              flex: 1,
              caretColor: t.cursor,
              padding: "2px 0",
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
}
```

### `src/components/Terminal.js`

```js
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
  useEffect(() => {
    if (!displayedBanner) {
      setHistory([{ id: Date.now(), type: "output", lines: WELCOME_MESSAGE }]);
      setDisplayedBanner(true);
    }
  }, [displayedBanner]);
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
      if (result.action === "clear") {
        setHistory([]);
        return;
      }
      setHistory((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), type: "entry", command: trimmed },
      ]);
      if (result.action?.type === "github_stats") {
        pushOutput([{ type: "muted", content: "Fetching GitHub stats..." }]);
        try {
          const token = process.env.REACT_APP_GITHUB_TOKEN;
          if (!token) throw new Error("REACT_APP_GITHUB_TOKEN not set in .env");
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
        {}
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
        {}
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
          {}
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
        {}
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
      {}
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
import { portfolioData } from "../data/portfolio";
function getGithubUsername() {
  return portfolioData.githubUsername;
}
```

### `src/components/commands.js`

```js
import { portfolioData, themes } from "../data/portfolio";
import { getRandomJoke } from "../data/jokes";
export const ASCII_ART = `
██████╗ ██╗██╗   ██╗██╗   ██╗███████╗██╗  ██╗
██╔══██╗██║╚██╗ ██╔╝██║   ██║██╔════╝██║  ██║
██████╔╝██║ ╚████╔╝ ██║   ██║███████╗███████║
██╔═══╝ ██║  ╚██╔╝  ██║   ██║╚════██║██╔══██║
██║     ██║   ██║   ╚██████╔╝███████║██║  ██║
╚═╝     ╚═╝   ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝
`;
export const WELCOME_MESSAGE = [
  { type: "ascii", content: ASCII_ART },
  { type: "info", content: `  ${portfolioData.title}  ·  ${portfolioData.location}` },
  { type: "divider" },
  { type: "text", content: `  Welcome to my interactive terminal portfolio.` },
  { type: "text", content: `  Type 'help' to see available commands, or 'gui' if you prefer a visual interface.` },
  { type: "spacer" },
];
const HELP_TEXT = [
  { type: "section", content: "PORTFOLIO" },
  { type: "cmd", label: "about", desc: "Who I am" },
  { type: "cmd", label: "skills", desc: "Tech stack & expertise" },
  { type: "cmd", label: "projects", desc: "Things I've built" },
  { type: "cmd", label: "open <name>", desc: "Open a project — live or GitHub (e.g. open projectalpha)" },
  { type: "cmd", label: "experience", desc: "Work history" },
  { type: "cmd", label: "education", desc: "Academic background" },
  { type: "cmd", label: "contact", desc: "Links & handles" },
  { type: "cmd", label: "email", desc: "Send me a message right here in the terminal" },
  { type: "spacer" },
  { type: "section", content: "GITHUB" },
  { type: "cmd", label: "github", desc: "Live GitHub stats — repos, stars, PRs" },
  { type: "cmd", label: "contrib", desc: "ASCII contribution graph (last 15 weeks)" },
  { type: "spacer" },
  { type: "section", content: "EXTRAS" },
  { type: "cmd", label: "neofetch", desc: "System-info style summary card" },
  { type: "cmd", label: "download cv", desc: "Download my resume as PDF" },
  { type: "cmd", label: "joke", desc: "A random dev joke" },
  { type: "cmd", label: "gui / windows", desc: "Switch to Windows-style visual portfolio" },
  { type: "cmd", label: "theme [name]", desc: "Change color theme (try: theme list)" },
  { type: "cmd", label: "clear", desc: "Clear the terminal" },
  { type: "cmd", label: "banner", desc: "Show the welcome banner" },
  { type: "spacer" },
  { type: "muted", content: "Tip: ↑ / ↓ browse history · Tab autocomplete · Ctrl+L clear" },
];
const ABOUT_TEXT = [
  { type: "section", content: "ABOUT ME" },
  ...portfolioData.about.trim().split("\n").map((line) => ({ type: "text", content: line })),
  { type: "spacer" },
  { type: "keyval", label: "Name", value: portfolioData.name },
  { type: "keyval", label: "Role", value: portfolioData.title },
  { type: "keyval", label: "Location", value: portfolioData.location },
  { type: "keyval", label: "Email", value: portfolioData.email },
];
const SKILLS_TEXT = [
  { type: "section", content: "SKILLS & TECH STACK" },
  { type: "spacer" },
  ...Object.entries(portfolioData.skills).map(([category, items]) => ({
    type: "skillrow",
    label: category.toUpperCase(),
    items,
  })),
];
const PROJECTS_TEXT = [
  { type: "section", content: "PROJECTS" },
  { type: "spacer" },
  ...portfolioData.projects.flatMap((p, i) => [
    { type: "project_name", content: `[${i + 1}] ${p.name}` },
    { type: "muted", content: `    ${p.tech}` },
    { type: "text", content: `    ${p.desc}` },
    { type: "project_links", github: p.github, live: p.live },
    { type: "spacer" },
  ]),
  { type: "muted", content: "Tip: 'open <name>' to launch a project directly  e.g. open projectalpha" },
];
const EXPERIENCE_TEXT = [
  { type: "section", content: "EXPERIENCE" },
  { type: "spacer" },
  ...( portfolioData.experience || []).flatMap((exp) => [
    { type: "exp_role", role: exp.role, company: exp.company, period: exp.period },
    ...exp.highlights.map((h) => ({ type: "bullet", content: h })),
    { type: "spacer" },
  ]),
  ...( !portfolioData.experience?.length ? [{ type: "muted", content: "Coming soon." }] : []),
];
const EDUCATION_TEXT = [
  { type: "section", content: "EDUCATION" },
  { type: "spacer" },
  ...portfolioData.education.map((e) => ({
    type: "education_item",
    degree: e.degree,
    school: e.school,
    year: e.year,
  })),
];
const CONTACT_TEXT = [
  { type: "section", content: "CONTACT" },
  { type: "spacer" },
  { type: "keyval", label: "Email", value: portfolioData.contact.email },
  { type: "keyval", label: "GitHub", value: portfolioData.contact.github },
  { type: "keyval", label: "LinkedIn", value: portfolioData.contact.linkedin },
  { type: "keyval", label: "Twitter", value: portfolioData.contact.twitter },
  { type: "spacer" },
  { type: "muted", content: "Or type 'email' to send a message directly from this terminal." },
];
const THEME_LIST = [
  { type: "section", content: "AVAILABLE THEMES" },
  { type: "spacer" },
  ...Object.values(themes).map((t) => ({ type: "theme_item", name: t.name, label: t.label })),
  { type: "spacer" },
  { type: "muted", content: "Usage: theme <name>   e.g. theme cyberpunk" },
];
function buildNeofetch(githubStats) {
  const yearsActive = new Date().getFullYear() - 2018;
  return [
    { type: "section", content: "NEOFETCH" },
    { type: "spacer" },
    {
      type: "neofetch_card",
      rows: [
        ["OS", "FullStackOS v4.2 (LTS)"],
        ["Host", portfolioData.name],
        ["Role", portfolioData.title],
        ["Location", portfolioData.location],
        ["Uptime", `${yearsActive} years in the game`],
        ["Shell", "portfolio.sh 2.0"],
        ["Terminal", "piyush-term"],
        ["Frontend", portfolioData.skills.frontend.slice(0, 3).join(", ")],
        ["Backend", portfolioData.skills.backend.slice(0, 3).join(", ")],
        ["Database", portfolioData.skills.database.slice(0, 2).join(", ")],
        ...(githubStats
          ? [
              ["GitHub Repos", String(githubStats.publicRepos)],
              ["GitHub Stars", String(githubStats.totalStars)],
              ["On GitHub Since", String(githubStats.createdAt)],
            ]
          : [["GitHub", `@${portfolioData.githubUsername}`]]),
        ["Contact", portfolioData.email],
      ],
    },
    { type: "spacer" },
    { type: "color_palette" },
  ];
}
function handleOpen(arg) {
  if (!arg) {
    return {
      lines: [
        { type: "error", content: "Usage: open <project-name>" },
        {
          type: "muted",
          content:
            "Available: " +
            portfolioData.projects.map((p) => p.name.toLowerCase()).join(", "),
        },
      ],
      action: null,
    };
  }
  const project = portfolioData.projects.find(
    (p) =>
      p.name.toLowerCase() === arg.toLowerCase() ||
      p.name.toLowerCase().replace(/\s+/g, "") === arg.toLowerCase()
  );
  if (!project) {
    return {
      lines: [
        { type: "error", content: `Project '${arg}' not found.` },
        {
          type: "muted",
          content:
            "Available: " +
            portfolioData.projects.map((p) => p.name.toLowerCase()).join(", "),
        },
      ],
      action: null,
    };
  }
  const url = project.live || project.github;
  const destination = project.live ? "live site" : "GitHub repo";
  return {
    lines: [
      { type: "success", content: `Opening ${project.name} — ${destination}` },
      { type: "muted", content: `  → ${url}` },
    ],
    action: { type: "redirect", url },
  };
}
export function processCommand(input, currentTheme, setTheme, githubStats) {
  const raw = input.trim();
  const lower = raw.toLowerCase();
  const parts = lower.split(/\s+/);
  const cmd = parts[0];
  const arg = parts[1];
  const rest = parts.slice(1).join(" ");
  if (!raw) return null;
  switch (cmd) {
    case "help":
      return { lines: HELP_TEXT, action: null };
    case "about":
      return { lines: ABOUT_TEXT, action: null };
    case "skills":
      return { lines: SKILLS_TEXT, action: null };
    case "projects":
      return { lines: PROJECTS_TEXT, action: null };
    case "experience":
      return { lines: EXPERIENCE_TEXT, action: null };
    case "education":
      return { lines: EDUCATION_TEXT, action: null };
    case "contact":
      return { lines: CONTACT_TEXT, action: null };
    case "banner":
      return { lines: WELCOME_MESSAGE, action: null };
    case "clear":
      return { lines: [], action: "clear" };
    case "open":
      return handleOpen(rest);
    case "email":
      return { lines: [], action: { type: "email_form" } };
    case "joke":
      return {
        lines: [
          { type: "spacer" },
          { type: "joke", content: getRandomJoke() },
          { type: "spacer" },
          { type: "muted", content: "Run 'joke' again for another one." },
        ],
        action: null,
      };
    case "download":
      if (arg === "cv" || arg === "resume") {
        return {
          lines: [
            { type: "success", content: "Initiating download: Piyush_Resume.pdf" },
            {
              type: "muted",
              content:
                "If nothing downloads, ensure resume.pdf is in your /public folder.",
            },
          ],
          action: {
            type: "download",
            url: portfolioData.cvUrl,
            filename: "Piyush_Resume.pdf",
          },
        };
      }
      return { lines: [{ type: "error", content: "Usage: download cv" }], action: null };
    case "neofetch":
      return { lines: buildNeofetch(githubStats), action: null };
    case "github":
      return { lines: [], action: { type: "github_stats" } };
    case "contrib":
    case "contributions":
      return { lines: [], action: { type: "github_graph" } };
    case "gui":
    case "windows":
      return {
        lines: [
          { type: "info", content: "Launching Windows portfolio..." },
          { type: "muted", content: portfolioData.windowsPortfolio },
        ],
        action: { type: "redirect", url: portfolioData.windowsPortfolio },
      };
    case "theme":
      if (!arg || arg === "list") return { lines: THEME_LIST, action: null };
      if (themes[arg]) {
        setTheme(themes[arg]);
        return {
          lines: [
            {
              type: "success",
              content: `Theme changed to "${themes[arg].label}". Looking fresh!`,
            },
          ],
          action: null,
        };
      }
      return {
        lines: [
          {
            type: "error",
            content: `Unknown theme "${arg}". Run 'theme list' to see options.`,
          },
        ],
        action: null,
      };
    case "sudo":
      return {
        lines: [{ type: "error", content: "Nice try. Permission denied. 😄" }],
        action: null,
      };
    case "ls":
    case "dir":
      return {
        lines: [
          {
            type: "muted",
            content:
              "about  skills  projects  experience  education  contact  github  contrib  neofetch",
          },
        ],
        action: null,
      };
    case "whoami":
      return {
        lines: [
          {
            type: "text",
            content: `${portfolioData.name.toLowerCase()} — ${portfolioData.title}`,
          },
        ],
        action: null,
      };
    case "pwd":
      return {
        lines: [
          {
            type: "text",
            content: `/home/${portfolioData.name.toLowerCase()}/portfolio`,
          },
        ],
        action: null,
      };
    case "date":
      return { lines: [{ type: "text", content: new Date().toString() }], action: null };
    case "echo":
      return { lines: [{ type: "text", content: raw.slice(5) || "" }], action: null };
    default:
      return {
        lines: [
          {
            type: "error",
            content: `Command not found: ${cmd}. Type 'help' to see available commands.`,
          },
        ],
        action: null,
      };
  }
}
```

### `src/data/jokes.js`

```js
export const DEV_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "How many programmers does it take to change a light bulb? None — it's a hardware problem.",
  "Why do Java developers wear glasses? Because they don't C#.",
  "A programmer's partner says: 'Go to the store and get a gallon of milk. If they have eggs, get a dozen.' They come back with 12 gallons of milk.",
  "Why did the developer go broke? Because he used up all his cache.",
  "It's not a bug — it's an undocumented feature.",
];
export function getRandomJoke() {
  return DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)];
}
```

### `src/data/portfolio.js`

```js
export const portfolioData = {
  name: "Piyush",
  title: "Full Stack Developer",
  location: "Mumbai",
  email: "piyushbhalwalkar01@gmail.com",
  github: "https://github.com/piyush17011",
  githubUsername: "piyush17011", 
  windowsPortfolio: "https://piyush17gui.netlify.app/",
  cvUrl: "/resume.pdf", 
  about: `I'm a Full Stack Developer who loves building products from the ground up.
         I bring ideas to life, end to end.
         Always learning. Always shipping.`,
  skills: {
    frontend: ["React", "HTML/CSS","Java"],
    backend: ["Node.js", "Express", "Python","REST APIs","WebSockets"],
    database: ["MongoDB", "MySQL"],
    devops: ["Git", "AWS", "CI/CD", "Docker", "Linux"],
    tools: ["Figma", "Postman", "VS Code"],
  },
  projects: [
    {
      name: "SHOELIFY",
      tech: "React · Node.js · Express.js · MongoDB",
      desc: "A full-stack ecommerce site for sneaker heads.",
      github: "https://github.com/piyush17011/SSHOPLIFY",
      live: "https://shoelify.onrender.com/",
    },
    {
      name: "XO",
      tech: "Node.js · Express.js · WebSockets",
      desc: "A live multiplayer miniproject built for understanding of how socket works - TicTacToe Game",
      github: "https://github.com/piyush17011/XO",
      live: "https://xo-ztjb.onrender.com/",
    },
    {
      name: "RTSLD - Real Time Sign Language Detection System",
      tech: "Node.js · Express.js · Python · WebRTC · WebSockets · Machine Learning",
      desc: "A video calling platform for deaf-dumb,on which they can communicate using sign language generating live captions",
      github: "https://github.com/piyush17011/RealTimeWorkingMain",
      live: "https://rtsld.onrender.com",
    },
    {
      name: "Animator's Portfolio",
      tech: "React.js · 3D Model Rendering",
      desc: "A portfolio website built for a client with 3D model rendering.",
      github: "https://github.com/piyush17011/animator-portfolio",
      live: "https://omkar-bane.vercel.app/",
    },
    {
      name: "Kisaan Saathi",
      tech: "React Native.js · Python · MySQL · Gemini API",
      desc: "An AI-assistant based android app for indian farmers with weather api and live current market price of crops.",
      github: "https://github.com/piyush17011/ks",
      live: null,
    },
     {
      name : "NPM packages : piyush17, piyushai",
      tech : "Node.js",
      desc : "piyush 17 for my portfolio and piyushai to create a context file on whole project",
    }
  ],
  education: [
    {
      degree: "B.Tech in Information Technology",
      school: "SAKEC, Mumbai University",
      year: "2025",
    },
  ],
  contact: {
    email: "piyushbhalwalkar01@gmail.com",
    github: "github.com/piyush17011",
    phone : "+91 9082420911"
  },
};
export const themes = {
  matrix: {
    name: "matrix",
    label: "Matrix Green",
    bg: "#0d0d0d",
    surface: "#0a0a0a",
    text: "#00ff41",
    muted: "#00aa2b",
    accent: "#00ff41",
    prompt: "#00cc33",
    cursor: "#00ff41",
    error: "#ff4444",
    success: "#00ff41",
    info: "#00ccff",
    border: "#003a0f",
    selection: "#003a0f",
  },
  amber: {
    name: "amber",
    label: "Amber Retro",
    bg: "#0f0a00",
    surface: "#0a0700",
    text: "#ffb300",
    muted: "#cc8800",
    accent: "#ffcc00",
    prompt: "#ff9900",
    cursor: "#ffb300",
    error: "#ff4444",
    success: "#88dd00",
    info: "#ffcc00",
    border: "#3d2700",
    selection: "#3d2700",
  },
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk Blue",
    bg: "#020b18",
    surface: "#010810",
    text: "#00d4ff",
    muted: "#0088bb",
    accent: "#ff0099",
    prompt: "#ff0099",
    cursor: "#00d4ff",
    error: "#ff0044",
    success: "#00ff99",
    info: "#00d4ff",
    border: "#003355",
    selection: "#003355",
  },
  dracula: {
    name: "dracula",
    label: "Dracula Purple",
    bg: "#0e0e16",
    surface: "#090910",
    text: "#caa9fa",
    muted: "#8a6bcc",
    accent: "#ff79c6",
    prompt: "#ff79c6",
    cursor: "#caa9fa",
    error: "#ff5555",
    success: "#50fa7b",
    info: "#8be9fd",
    border: "#2a1f4a",
    selection: "#2a1f4a",
  },
  mono: {
    name: "mono",
    label: "Monochrome",
    bg: "#0a0a0a",
    surface: "#050505",
    text: "#e8e8e8",
    muted: "#888888",
    accent: "#ffffff",
    prompt: "#aaaaaa",
    cursor: "#e8e8e8",
    error: "#ff5555",
    success: "#55ff55",
    info: "#5599ff",
    border: "#222222",
    selection: "#222222",
  },
};
```

### `src/hooks/useGitHub.js`

```js
import { useState, useEffect, useCallback } from "react";
const GITHUB_USERNAME = "piyush17011";
export function useGitHub() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
      ]);
      if (!userRes.ok) throw new Error("GitHub user not found");
      const user = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];
      const totalStars = repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count || 0),
        0
      );
      const totalForks = repos.reduce(
        (sum, repo) => sum + (repo.forks_count || 0),
        0
      );
      const languages = {};
      repos.forEach((repo) => {
        if (repo.language) {
          languages[repo.language] =
            (languages[repo.language] || 0) + 1;
        }
      });
      const topLangs = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);
      setStats({
        username: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        totalStars,
        totalForks,
        topLangs,
        graphImage: `https://ghchart.rshah.org/00ff00/${GITHUB_USERNAME}`
      });
    } catch (err) {
      setError(err.message || "Failed to fetch GitHub data");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  return { stats, loading, error, fetchStats };
}
```

### `src/index.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #0d0d0d;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
::selection {
  background: #00ff4122;
}
```

### `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

---

*End of context. You now have full visibility into this project.*
