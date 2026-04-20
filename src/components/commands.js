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

// ─── neofetch builder ────────────────────────────────────────────────────────

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

// ─── open command ─────────────────────────────────────────────────────────────

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

// ─── main processor ───────────────────────────────────────────────────────────

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
