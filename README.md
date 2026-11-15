# ⚡ Saad // Futuristic Personal Portfolio & Brand

> **"Building Today, Exploring Tomorrow."**  
> A premium, futuristic, award-winning portfolio website engineered for **Saad**, a Computer Science Engineering student and aspiring AI Engineer.

---

## 🌟 Key Highlights & Architecture

- **Awwwards-Inspired Aesthetic**: Deep obsidian black (`#030014`), electric cyan (`#00f0ff`), cyber violet (`#a855f7`), glassmorphic panels, and glowing cyber accents.
- **Three.js Interactive 3D Background**: Real-time particle constellation with additive blending and floating 3D wireframe cyber cores (torus knot & icosahedron) that interact dynamically with mouse cursor parallax.
- **Interactive 3D Tilt Cards**: Custom perspective-1000 3D gyro tilt with dynamic glare sheen on hover.
- **Audio Synthesizer Engine**: Built using native browser **Web Audio API** (subtle sci-fi UI micro-clicks and chimes with instant mute/unmute toggle—zero external audio assets needed).
- **Horizontal Sliding Project Showcase**: Multi-tab horizontal slider with smooth transitions and dedicated interactive live simulators.
- **Live Interactive Project Simulators**:
  1. **Transaction Risk Level Classifier**: Real-time multi-variable heuristic risk engine testing amounts, geographical anomalies, and velocity.
  2. **Expense Tracker**: Interactive personal budget ledger with real-time balance calculations.
  3. **Smart Canteen Token System**: Digital campus ordering simulation with automated kitchen status transitions (*Pending* &rarr; *Preparing* &rarr; *Ready*).
- **No Fake Skill Percentages**: Honest, capability-focused tech stack representation with key competencies and an active "Currently Learning" acceleration matrix.
- **Dedicated Internship & Journey Chronicles**:
  - Highlights one completed industry internship with clear, editable fields (Company, Role, Duration, Responsibilities).
  - Visual timeline detailing the progression from **Diploma at LJ Polytechnic** to **B.Tech in Computer Science Engineering**.
- **Interactive Contact Terminal**: Instant email copy-to-clipboard, form validation, simulated encrypted dispatch, and celebratory confetti burst.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom High-Precision Brand SVGs
- **Celebration Effects**: [Canvas-Confetti](https://github.com/catdad/canvas-confetti)
- **Audio Engine**: Native Browser Web Audio API

---

## 🚀 Getting Started

### 1. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in terminal) to view the live website with instant Hot Module Replacement (HMR).

### 2. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory ready for deployment on Vercel, Netlify, or GitHub Pages.

### 3. Preview Production Build
```bash
npm run preview
```

---

## ✏️ How to Customize Your Information

All personal information, links, project repositories, and internship details are neatly centralized in **one single file**:

📁 `src/data/portfolioData.ts`

### 1. Update Internship Details
Open `src/data/portfolioData.ts` and update the `internship` object:
```typescript
internship: {
  company: "Your Actual Company Name",
  role: "Python / Software Intern",
  duration: "June 2024 - August 2024",
  location: "Ahmedabad, India",
  description: "Brief overview of what you built...",
  responsibilities: [
    "Your responsibility 1",
    "Your responsibility 2"
  ]
}
```

### 2. Update Social & Contact Links
In `src/data/portfolioData.ts` under `personal`:
```typescript
personal: {
  email: "your.email@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile"
}
```

### 3. Update Projects & GitHub Links
In `src/data/portfolioData.ts` under `projects`:
- Update `githubUrl` with your actual repositories.
- Add or modify features, descriptions, or metrics as your projects grow.

---

## 📂 Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CyberBackground.tsx     # Three.js 3D particles & wireframe cores
│   │   │   └── ProjectCard3D.tsx       # 3D interactive tilt container with glare
│   │   ├── common/
│   │   │   ├── CustomCursor.tsx        # Cybernetic trailing cursor with glow
│   │   │   ├── Footer.tsx              # Footer with status and quick links
│   │   │   ├── Icons.tsx               # Crisp SVG icons (GitHub, LinkedIn, Python)
│   │   │   ├── LoadingScreen.tsx       # Neural boot sequence preloader
│   │   │   ├── Navbar.tsx              # Frosted glass HUD navigation + audio toggle
│   │   │   └── SectionHeader.tsx       # Glowing gradient section titles
│   │   ├── modals/
│   │   │   ├── EditGuideModal.tsx      # In-app developer customization guide
│   │   │   └── ProjectModal.tsx        # Interactive live simulators for projects
│   │   └── sections/
│   │       ├── Hero.tsx                # Large animated headline, typing roles, CTA
│   │       ├── About.tsx               # Split screen: Digital ID + narrative bio
│   │       ├── TechStack.tsx           # 3D skill cards + Currently Learning
│   │       ├── CareerInterests.tsx     # 3 premium interest cards with glowing auras
│   │       ├── Projects.tsx            # Horizontal sliding project showcase
│   │       ├── Experience.tsx          # Professional internship + Education
│   │       ├── Journey.tsx             # Futuristic Diploma -> B.Tech timeline
│   │       └── Contact.tsx             # Terminal contact form, copy email, confetti
│   ├── data/
│   │   └── portfolioData.ts            # Centralized config for all portfolio data
│   ├── utils/
│   │   ├── audio.ts                    # Web Audio API futuristic sound effects
│   │   └── cn.ts                       # Class merging utility
│   ├── App.tsx                         # Main app component
│   ├── index.css                       # Tailwind v4 setup & cyber glass utilities
│   ├── main.tsx                        # React DOM entrypoint
│   └── vite-env.d.ts                   # Vite client type definitions
├── index.html                          # HTML template with Google Fonts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

*Designed and engineered with passion for Saad &mdash; Computer Science Engineering.*
