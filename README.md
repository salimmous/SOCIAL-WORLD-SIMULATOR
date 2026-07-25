<div align="center">

# 🌐 SOCIAL WORLD SIMULATOR
### *Unified Enterprise AI Platform for Content Virality Simulation*

[![Platform](https://img.shields.io/badge/Platform-Enterprise_AI_SaaS-DEDBC8?style=for-the-badge&logo=openai&logoColor=black)](https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR)
[![Design System](https://img.shields.io/badge/Theme-Warm_Ivory_%23DEDBC8-ECE8D9?style=for-the-badge&logo=apple&logoColor=black)](https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR)
[![Status](https://img.shields.io/badge/Status-Operational_Healthy-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)](https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR)

---

**Social World Simulator** is an enterprise-grade pre-publishing intelligence platform. Before releasing digital media online, creators and enterprise marketing teams simulate audience reactions, 2D force-directed community graph propagation, second-by-second retention heatmaps, and autonomous AI persona feedback.

[View Architecture](./ARCHITECTURE.md) • [View Demo Script](./DEMO_PITCH_SCRIPT.md) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## 📌 Executive Overview

Publishing digital content today is inherently reactive. Marketing teams invest significant capital into content production, yet measure impact **only after public distribution**. When a hook underperforms or retention drops early, algorithmic feeds penalize the post irreversibly.

**Social World Simulator** replaces guesswork with predictive simulation:
- **Simulate Before Publishing**: Test scripts, video content, and social posts across 200+ distinct AI persona clusters.
- **Identify Retention Drop-offs**: Pinpoint precise timestamps where audience interest degrades.
- **Automated AI Optimization**: Receive strict, actionable feedback and apply high-retention script rewrites with a single click.
- **Live Platform Mockups**: Preview content across native dark-mode feeds for TikTok, X, LinkedIn, and YouTube Shorts.

---

## 🏛 The 6 Platform Modules

| Module | Core Purpose & Capabilities | Technology Stack |
| :--- | :--- | :--- |
| **1. Content Intelligence** | Automated video analysis, Whisper transcript extraction, hook energy detection, visual tone, and audience targeting. | NVIDIA AI + OpenAI Whisper + Vision APIs |
| **2. 60 FPS Simulation Engine** | Living canvas rendering 200+ autonomous AI personas, community graph physics, share propagation, and retention curves. | Custom HTML5 Canvas 2D Physics Engine |
| **3. AI Copilot Engine** | Persistent live assistant observing network simulation, emitting real-time commentary, and executing 1-click script rewrites. | Floating AI Live Engine (`AICopilotWidget.tsx`) |
| **4. Live Feed Visualizer** | Dark-mode platform feed previews (TikTok 9:16, X, LinkedIn, Shorts) with real engagement overlays. | Live Feed Mockup (`LiveSocialFeedMockupModal.tsx`) |
| **5. Pitch Script Player** | Interactive 2-minute pitch player with 6 scenes, visual directions, and voiceover script timeline. | Pitch Player (`CinematicDemoPlayerModal.tsx`) |
| **6. Project History & Analytics** | Auto-saved simulation runs drawer with search, filter, reopen, duplicate, and delete options. | LocalStorage History Store (`HistoryDrawer.tsx`) |

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack), React 19, TypeScript
- **Design System**: Enterprise Warm Ivory (`#DEDBC8`), Tailwind CSS v4, Dark Theme
- **Physics & Graphics**: Custom 60 FPS HTML5 Canvas 2D Physics Engine, Framer Motion
- **AI Integrations**: NVIDIA Nemotron 70B, OpenAI Whisper, ElevenLabs Speech, fal.ai FLUX.1, Firecrawl

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR.git
cd SOCIAL-WORLD-SIMULATOR

# Install dependencies
npm install
```

### 2. Configure Environment (Optional)

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

*(Note: If no API keys are supplied, the application automatically uses high-fidelity local fallback engines).*

### 3. Run Development Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build Verification

```bash
npx tsc --noEmit
npm run build
```

---

## 🌐 Deployment (Vercel)

### Option A: Automatic GitHub Deployment (Recommended)
1. Go to [**vercel.com/new**](https://vercel.com/new).
2. Select repository: `salimmous/SOCIAL-WORLD-SIMULATOR`.
3. Click **Deploy**. Vercel will automatically build and deploy every `git push` to `main`.

### Option B: Vercel CLI
```bash
npx vercel login
npx vercel --prod
```
