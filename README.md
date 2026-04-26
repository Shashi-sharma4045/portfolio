# Shashi Kant Sharma — DevOps Portfolio

A brutalist, high-contrast DevOps portfolio built with the **Monolith Gallery** design system. Features an interactive terminal overlay, draggable project cards, and live GitHub data integration.

## 🚀 Live Site

[shashi232.github.io/portfolio](https://shashi232.github.io/portfolio)

## ✨ Features

- **Interactive Terminal** — Click the `>_` icon in the navbar to open a simulated shell. Supports: `whoami`, `projects`, `ls -la`, `ping`, `date`, `uptime`, `top`, `cat`, `neofetch`, `clear`, and more.
- **Draggable Project Cards** — The "Active Nodes" section lets visitors freely drag and reorder project cards within the workspace boundary.
- **Live GitHub Data** — Projects section fetches your latest repositories via the GitHub API.
- **Contact Form** — Powered by Web3Forms with no backend required.
- **Monolith Design System** — Brutalist dark aesthetic: `#0a0a0a` base, `#bcff00` neon accents, 0px border radius, Noto Serif + Space Grotesk typography.

## 🛠️ Tech Stack

- React 18 (Browser CDN, no build step)
- Tailwind CSS (CDN)
- Babel Standalone (in-browser JSX compilation)
- Web3Forms (contact form API)
- GitHub REST API (live repositories)

## 📁 Project Structure

```
portfolio/
├── index.html              # Entry point — loads all scripts
├── app.js                  # Root App component + ErrorBoundary
├── config.js               # API keys (gitignored, generated at deploy)
├── components/
│   ├── Navbar.js           # Navigation + terminal trigger
│   ├── Hero.js             # Hero section with typewriter
│   ├── About.js            # About section
│   ├── Skills.js           # Skills grid
│   ├── Projects.js         # Draggable Active Nodes workspace
│   ├── Experience.js       # Work experience timeline
│   ├── Contact.js          # Web3Forms contact form
│   ├── Footer.js           # Footer + TERMINUS filler section
│   └── TerminalOverlay.js  # Full-screen interactive shell sim
├── utils/
│   └── animations.js       # Scroll reveal & animation utilities
├── data/
│   ├── linkedin.json       # Mock LinkedIn project data
│   └── certificates.json   # Certifications data
└── assets/
    └── profile.png         # Profile portrait
```

## ⚙️ Local Development

No build step required. Just serve the root directory:

```bash
# Using Python
python3 -m http.server 8080

# Or any static server
npx serve .
```

Then open `http://localhost:8080`.

## 🚢 Deployment (GitHub Pages)

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Generates `config.js` from the `WEB3FORMS_ACCESS_KEY` GitHub Secret
2. Deploys the site to the `gh-pages` branch

### Setup Steps
1. Go to **Settings → Secrets → Actions** in your GitHub repo
2. Add secret: `WEB3FORMS_ACCESS_KEY` = your key from [web3forms.com](https://web3forms.com)
3. Push to `main` — the workflow handles the rest

## 🔐 Security

- `.env` and `config.js` are gitignored — API keys never hit version control
- The terminal is a **client-side simulation only** — no real system commands are executed
