<div align="center">

# 🌐 SOCIAL WORLD SIMULATOR
### *The Pre-Publish AI Audience Reaction & Virality Engine*

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NVIDIA AI](https://img.shields.io/badge/NVIDIA_AI-Vision_%26_LLM-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://www.nvidia.com/)

---

**Social World Simulator** is an enterprise-grade pre-publishing intelligence platform that models audience reactions, algorithm propagation, second-by-second retention heatmaps, and viral network dynamics using autonomous AI personas before content is published.

[View Architecture](./ARCHITECTURE.md) • [Getting Started](#-getting-started) • [Core Capabilities](#-core-capabilities)

</div>

---

## 📌 Executive Summary

Publishing digital content today is inherently reactive. Creators, marketing teams, and media agencies invest significant capital into content production, yet measure impact **only after public distribution**. When a hook underperforms or retention drops off early, algorithmic distribution penalizes the content irreversibly.

**Social World Simulator** replaces guesswork with predictive simulation:
- **Simulate Before Publishing**: Test scripts, video content, and social posts across distinct AI persona clusters.
- **Identify Drop-off Mechanics**: Pinpoint precise timestamps where audience interest degrades.
- **Automated AI Optimization**: Receive strict, actionable feedback and apply high-retention script rewrites with a single click.

---

## ⚡ Core Capabilities

| Capability | Description | Technology / Engine |
| :--- | :--- | :--- |
| **NVIDIA AI Video Intelligence** | Multimodal analysis of video content, audio extraction, Whisper transcription, and visual tone/emotion detection. | NVIDIA AI API + OpenAI Whisper |
| **Strict AI Content Critic** | Automated line-by-line script auditing that identifies weak hooks, static setups, and low-engagement phrases with direct replacement suggestions. | Custom LLM Prompt Engineering Pipeline |
| **Living Social Graph** | Real-time, 60fps force-directed graph displaying node interactions, community clustering, signal propagation, and viral heatwaves. | Custom HTML5 Canvas 2D Physics Engine |
| **Retention & Drop-off Heatmaps** | Interactive SVG timeline analyzing second-by-second attention retention, highlighting viral spikes and audience drop-offs. | D3/SVG Math Engine |
| **Multi-Platform Adapters** | Custom simulation parameter profiles optimized for TikTok, X (Twitter), Instagram Reels, YouTube Shorts, and LinkedIn. | Platform Preset Matrix |
| **Enterprise Account & OAuth Portal** | Integrated hub for managing user roles, social media account authorizations, API keys, and Okta SAML SSO audit trails. | Enterprise Auth Layer |

---

## 🛠 System Architecture & Stack

```
[ Media Upload / Social URL ] ──► [ Next.js Serverless API ] ──► [ NVIDIA AI & Whisper Pipeline ]
                                          │
                                          ▼
[ Living Canvas (60fps Physics) ] ◄── [ Simulator Engine ] ──► [ Predictive Analytics & Heatmap ]
```

- **Frontend Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling & Design System**: Tailwind CSS v4, Dark Theme, Glassmorphism design tokens
- **Physics & Animation**: Custom HTML5 Canvas 2D Physics Engine, Framer Motion, canvas-confetti
- **State & Storage**: Ephemeral LocalStorage State Store, React Context API

For a comprehensive technical breakdown of data flow, physics algorithms, and API schemas, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR.git
   cd SOCIAL-WORLD-SIMULATOR
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NVIDIA_API_KEY=your_nvidia_api_key_here
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structure

```
SOCIAL-WORLD-SIMULATOR/
├── src/
│   ├── app/
│   │   ├── api/             # Next.js Serverless API endpoints (NVIDIA AI, Simulation)
│   │   ├── page.tsx         # Primary Application View
│   │   └── layout.tsx       # Root Layout & Provider Wrapper
│   ├── components/          # Modular React Components
│   │   ├── Header.tsx       # Top Bar, Preset Switcher, Account Entry
│   │   ├── LeftPanel.tsx    # Multi-Mode Input, Persona Selector, Transcript Critic
│   │   ├── RightPanel.tsx   # Predictive KPIs, Strict AI Critique, Retention Curve
│   │   ├── SocialWorldCanvas.tsx # 60fps Force-Directed Physics Visualizer
│   │   ├── AuthModal.tsx    # Enterprise Account & OAuth Integration Portal
│   │   └── HistoryDrawer.tsx# Saved Simulation Runs & A/B Test History
│   ├── data/                # Persona profiles and platform presets
│   ├── services/            # Simulation physics, math engine, local store
│   └── types/               # TypeScript interfaces & data contracts
├── ARCHITECTURE.md          # Comprehensive System Architecture Guide
└── README.md                # Project Overview & Setup Instructions
```

---

## 🤝 License

Distributed under the MIT License. See `LICENSE` for details.
