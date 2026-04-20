export const portfolioData = {
  name: "Piyush",
  title: "Full Stack Developer",
  location: "Mumbai",
  email: "piyushbhalwalkar01@gmail.com",
  github: "https://github.com/piyush17011",
  githubUsername: "piyush17011", // ← used for live GitHub API calls
  linkedin: "https://linkedin.com/in/piyushbhalwalkar",
  windowsPortfolio: "https://piyushportfolio17.netlify.app/",
  cvUrl: "/resume.pdf", // ← drop your resume.pdf in /public folder

  about: `I'm a Full Stack Developer who loves building products from the ground up.
I thrive at the intersection of clean architecture and great user experience.
From crafting REST APIs and microservices to pixel-perfect frontends —
I bring ideas to life, end to end.

Always learning. Always shipping.`,

  skills: {
    frontend: ["React", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python","REST APIs"],
    database: ["MongoDB", "MySQL"],
    devops: ["Git", "AWS", "CI/CD", "Docker", "Linux"],
    tools: ["Figma", "Postman", "VS Code"],
  },

  projects: [
    {
      name: "ProjectAlpha",
      tech: "React · Node.js · PostgreSQL",
      desc: "A full-stack SaaS dashboard with real-time analytics and role-based access control.",
      github: "https://github.com/piyush/project-alpha",
      live: "https://project-alpha.vercel.app",
    },
    {
      name: "ShopEngine",
      tech: "Next.js · Django · Redis",
      desc: "High-performance e-commerce engine handling 10k+ concurrent users with sub-100ms response times.",
      github: "https://github.com/piyush/shop-engine",
      live: "https://shopengine.vercel.app",
    },
    {
      name: "DevFlow",
      tech: "React · GraphQL · MongoDB",
      desc: "Collaborative developer workflow tool with live code sharing, task tracking, and PR integrations.",
      github: "https://github.com/piyush/devflow",
      live: null,
    },
    {
      name: "APIForge",
      tech: "Node.js · Docker · AWS",
      desc: "API scaffolding CLI that generates production-ready Express boilerplate in seconds.",
      github: "https://github.com/piyush/apiforge",
      live: null,
    },
  ],

  // experience: [
  //   {
  //     role: "Senior Full Stack Developer",
  //     company: "TechCorp Inc.",
  //     period: "2022 – Present",
  //     highlights: [
  //       "Led rebuild of core platform serving 500k+ users",
  //       "Reduced API latency by 60% through caching strategy",
  //       "Mentored 3 junior developers",
  //     ],
  //   },
  //   {
  //     role: "Full Stack Developer",
  //     company: "StartupXYZ",
  //     period: "2020 – 2022",
  //     highlights: [
  //       "Built MVP from scratch — 0 to production in 3 months",
  //       "Designed and implemented microservices architecture",
  //       "Integrated 10+ third-party APIs",
  //     ],
  //   },
  //   {
  //     role: "Frontend Developer",
  //     company: "DigitalAgency",
  //     period: "2018 – 2020",
  //     highlights: [
  //       "Delivered 20+ client websites using React",
  //       "Improved Lighthouse scores from ~50 to 95+",
  //       "Introduced TypeScript to the team's workflow",
  //     ],
  //   },
  // ],

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
    linkedin: "linkedin.com/in/piyushbhalwalkar",
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
