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

    // ── joke ────────────────────────────────────────────────────────────────
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

    // ── neofetch card ────────────────────────────────────────────────────────
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
          {/* mini ascii */}
          <div style={{ flexShrink: 0 }}>
            {ASCII_SMALL.map((row, i) => (
              <div key={i} style={{ color: t.accent, fontSize: "11px", lineHeight: "1.55", whiteSpace: "pre" }}>
                {row}
              </div>
            ))}
          </div>
          {/* info rows */}
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

    // ── color palette swatches ───────────────────────────────────────────────
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

    // ── github stats card ────────────────────────────────────────────────────
  case "github_stats": {
  const s = line.stats || {};

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* Header */}
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

      {/* Cards */}
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

      {/* Languages */}
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


    // ── github contribution graph ─────────────────────────────────────────────
case "github_graph": {
  const g = line.graph || {};
  const cells = g.cells || [];   // [weeks][days]  0-4
  const months = g.months || []; // label per week column

  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // GitHub-accurate colors: dark grey for empty, green gradient for activity
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
      {/* Title */}
      <div style={{ color: t.muted, fontSize: "12px", marginBottom: "10px" }}>
        {totalContribs} contributions in the last {cells.length} weeks
      </div>

      <div style={{ display: "flex", gap: "6px" }}>
        {/* Day-of-week labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: `${GAP}px`, paddingTop: "18px" }}>
          {DAY_LABELS.map((d, i) => (
            <div key={i} style={{
              height: CELL,
              fontSize: "9px",
              color: t.muted,
              lineHeight: `${CELL}px`,
              textAlign: "right",
              paddingRight: "4px",
              opacity: i % 2 === 1 ? 1 : 0, // only show Mon, Wed, Fri, Sun
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Month labels row */}
          <div style={{ display: "flex", gap: `${GAP}px`, marginBottom: "4px", height: "14px" }}>
            {months.map((label, wi) => (
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

          {/* Cells — render day rows, not week columns */}
          {Array.from({ length: 7 }, (_, dayIdx) => (
            <div key={dayIdx} style={{ display: "flex", gap: `${GAP}px`, marginBottom: `${GAP}px` }}>
              {cells.map((week, weekIdx) => {
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

      {/* Legend */}
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

    // ── email form ─────────────────────────────────────────────────────────────
    case "email_form":
      return <EmailForm theme={t} onSend={line.onSend} />;

    default:
      return null;
  }
}

// ─── EmailForm inline component ───────────────────────────────────────────────

function EmailForm({ theme: t, onSend }) {
  const [step, setStep] = React.useState("name"); // name → subject → message → done
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

      {/* Filled fields */}
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

      {/* Done state */}
      {step === "done" ? (
        <div style={{ color: sent ? t.success : t.muted, fontSize: "13px", marginTop: "8px", fontFamily: "inherit" }}>
          {sent ? "✓ Mail client opened. Message ready to send!" : "Cancelled. Run 'email' anytime to try again."}
        </div>
      ) : (
        /* Active input */
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