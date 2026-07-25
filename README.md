<div align="center">

# 🌐 SOCIAL WORLD SIMULATOR
### *Unified Enterprise AI Platform for Content Virality Simulation*

[![Platform](https://img.shields.io/badge/Platform-Enterprise_AI_SaaS-6B21A8?style=for-the-badge&logo=openai&logoColor=white)](https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR)
[![Infrastructure](https://img.shields.io/badge/Infrastructure-NVIDIA_--_OpenAI_--_ElevenLabs_--_fal.ai_--_Firecrawl-3B82F6?style=for-the-badge&logo=cloudflare&logoColor=white)](https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR)
[![Status](https://img.shields.io/badge/Status-Operational_Healthy-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)](https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR)

---

**Social World Simulator** is an enterprise-grade pre-publishing intelligence platform. Before releasing digital media online, creators and enterprise marketing teams simulate audience reactions, 2D force-directed community graph propagation, second-by-second retention heatmaps, and autonomous AI persona feedback.

[View Architecture](./ARCHITECTURE.md) • [Getting Started](#-getting-started) • [The 6 Platform Modules](#-the-6-platform-modules) • [AI Workspace Infrastructure](#-ai-workspace-infrastructure)

</div>

---

## 📌 Executive Overview

Publishing digital content today is inherently reactive. Marketing teams invest significant capital into content production, yet measure impact **only after public distribution**. When a hook underperforms or retention drops early, algorithmic feeds penalize the post irreversibly.

**Social World Simulator** replaces guesswork with predictive simulation:
- **Simulate Before Publishing**: Test scripts, video content, and social posts across 200+ distinct AI persona clusters.
- **Identify Retention Drop-offs**: Pinpoint precise timestamps where audience interest degrades.
- **Automated AI Optimization**: Receive strict, actionable feedback and apply high-retention script rewrites with a single click.

---

## 🏛 The 6 Platform Modules

| Module | Core Purpose & Capabilities | Technology Stack |
| :--- | :--- | :--- |
| **1. Content Intelligence** | Automated video analysis, Whisper transcript extraction, hook energy detection, visual tone, and audience targeting. | NVIDIA AI + OpenAI Whisper + Vision APIs |
| **2. 60 FPS Simulation Engine** | Living canvas rendering 200+ autonomous AI personas, community graph physics, share propagation, and retention curves. | Custom HTML5 Canvas 2D Physics Engine |
| **3. AI Copilot Engine** | Persistent live assistant observing network simulation, emitting real-time commentary, and executing 1-click script rewrites. | Floating AI Live Engine (`AICopilotWidget.tsx`) |
| **4. Optimization Lab** | Side-by-side A/B variant testing, 1-click auto rewrites, and instant virality score recalculations. | A/B Comparison Engine (`ABComparisonModal.tsx`) |
| **5. Executive Reports** | McKinsey-style 6-section report (Summary, Findings, Weaknesses, Risk, Confidence) with multi-format exports. | Executive Report & Audit Exporter |
| **6. Project History & Analytics** | Auto-saved simulation runs drawer with search, filter, reopen, duplicate, and delete options. | LocalStorage History Store (`HistoryDrawer.tsx`) |

---

## ⚡️ AI Workspace Unified Infrastructure

The **AI Workspace** dashboard provides realtime operational telemetry across 7 enterprise infrastructure layers:

| Infrastructure Layer | Connected Services & Capabilities | Latency / Health |
| :--- | :--- | :--- |
| **1. AI Providers** | NVIDIA Nemotron 70B, OpenAI GPT-4o, Anthropic Claude 3.5, Gemini 1.5 Pro, Groq LPU (800 t/s), OpenRouter | `42ms` • 99.9% Health |
| **2. Media Generation** | ElevenLabs Voice Synthesis & fal.ai Generative Media Engine (`FLUX.1`) | `0.4s` • Operational |
| **3. Research Engine** | Firecrawl Web Crawler (14,280 indexed pages) & Trend Discovery | `180ms` • 99.8% Success |
| **4. Automation Pipeline** | n8n Webhook Pipeline (8 active workflows, 1,420 daily executions) | Queue: `0` • Operational |
| **5. Cloud Deployment** | Render Cloud Host (99.99% uptime) & Vercel Edge Network | Build: `Success` |
| **6. Enterprise Storage** | 24 Saved Projects, 18.4 MB Export History, 98.2 GB Available Storage | Operational |
| **7. Realtime Telemetry** | System Monitoring: CPU (`12%`), Memory (`1.2 GB`), Response Time (`142ms`), API (`420/min`) | Operational |

---

## ⌨️ Native Productivity & Keyboard Shortcuts

- **`⌘K` / `Ctrl+K`**: Linear-Style Command Palette (`CommandPaletteModal.tsx`) for instant global search and quick actions.
- **`Space`**: Play / Pause simulation playback.
- **`R`**: Reset simulation timeline to `0:00`.
- **`C`**: Open Side-by-Side A/B Variant Comparison.
- **`E`**: Open Multi-Format Export Suite.

---

## 📱 Native iOS Mobile Experience

On mobile viewports, the platform switches to a dedicated 3-Screen Native iOS Experience (`MobileAppLayout.tsx`):
1. **Screen 1 (Upload)**: Fullscreen native input view with large touch targets.
2. **Screen 2 (Simulation)**: 100vh Fullscreen Social Graph with floating playback pill.
3. **Screen 3 (Results)**: Native iOS swipeable analytics & AI critique cards.

---

## 🛠 Tech Stack

- **Frontend Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Dark Theme (`#09090b`), Glassmorphism tokens
- **Physics & Motion**: Custom HTML5 Canvas 2D Engine, Framer Motion
- **Exports**: PDF Report, JSON Payload, PNG Snapshot, Share Link

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Local Installation

```bash
# 1. Clone repository
git clone https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR.git
cd SOCIAL-WORLD-SIMULATOR

# 2. Install dependencies
npm install

# 3. Verify TypeScript build
npx tsc --noEmit

# 4. Start development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.
