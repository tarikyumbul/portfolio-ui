# Portfolio UI

Frontend for [Tarik Yumbul's developer portfolio](https://tarikyumbul.vercel.app/) — a single-page React application styled as a **Fallout Pip-Boy 3000** terminal. It features a retro-futuristic green phosphor aesthetic with CRT effects, a boot-up splash sequence, and keyboard-driven navigation.

**Live site:** https://tarikyumbul.vercel.app/

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Language    | JavaScript (ES Modules)       |
| Framework   | React 19                      |
| Build Tool  | Vite 8                        |
| HTTP Client | Axios                         |
| Routing     | React Router DOM 7 (SPA)      |
| Linting     | ESLint 10                     |
| Deployment  | Vercel                        |

## Features

- **Pip-Boy themed UI** — authentic Fallout terminal look with scanlines, glow effects, and amber/green color palette
- **Boot sequence** — animated startup screen with progressive log lines and a progress bar
- **Tab navigation** — five content sections accessible via click, keyboard shortcuts (1–5), or arrow keys (Q/E)
- **Aggregated data fetch** — single API call (`/api/v1/portfolio`) loads all data at once for fast page loads
- **Offline resilience** — gracefully degrades with a status indicator when the backend is unavailable
- **Responsive design** — fluid typography and layout that adapts from mobile to desktop
- **Accessible** — ARIA roles, keyboard navigation, and semantic HTML throughout

## Pages

| Tab | Page           | Description                               |
|-----|----------------|-------------------------------------------|
| 1   | **About**      | Profile banner, status stats, summary, and contact links |
| 2   | **Experience** | Work history with expandable bullet points |
| 3   | **Skills**     | Skills grouped by category with level bars |
| 4   | **Education**  | Degrees, institutions, and GPA            |
| 5   | **Projects**   | Project cards with tech stack and links    |

## Project Structure

```
portfolio-ui/
├── public/                # Static assets (favicon, etc.)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BootScreen.jsx     # Startup splash animation
│   │   ├── PipClock.jsx       # Real-time clock display
│   │   ├── SectionHeader.jsx  # Styled section dividers
│   │   └── SkillBar.jsx       # Animated skill level bars
│   ├── hooks/
│   │   └── usePortfolio.js    # Data-fetching hook
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── ExperiencePage.jsx
│   │   ├── SkillsPage.jsx
│   │   ├── EducationPage.jsx
│   │   └── ProjectsPage.jsx
│   ├── services/
│   │   └── api.js             # Axios client & API methods
│   ├── App.jsx                # Root component with tab routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles & Pip-Boy theme
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js 18+**
- **npm 9+**

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm start
```

The app will be available at **http://localhost:5173**. In development, API requests to `/api` are proxied to `http://localhost:8080` via Vite's dev server proxy.

### 3. Build for production

```bash
npm run build
```

Output is written to the `dist/` directory, ready for deployment.

### 4. Preview the production build

```bash
npm run preview
```

## Environment Variables

| Variable              | Default                              | Description             |
|-----------------------|--------------------------------------|-------------------------|
| `VITE_API_BASE_URL`   | `http://localhost:8080/api/v1`       | Backend API base URL    |

## Keyboard Controls

| Key           | Action          |
|---------------|-----------------|
| `1` – `5`     | Jump to tab     |
| `←` / `→`     | Cycle tabs      |
| `Q` / `E`     | Cycle tabs      |
