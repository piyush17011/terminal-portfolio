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
