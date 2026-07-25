<div align="center">

# 🌐 SOCIAL WORLD SIMULATOR
### *The Pre-Publish AI Audience Reaction & Virality Engine*

[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-AI_Voice_Synthesis-6B21A8?style=for-the-badge&logo=speaker&logoColor=white)](https://elevenlabs.io/)
[![fal.ai](https://img.shields.io/badge/fal.ai-Generative_Media-EC4899?style=for-the-badge&logo=sparkles&logoColor=white)](https://fal.ai/)
[![Firecrawl](https://img.shields.io/badge/Firecrawl-Web_%26_Social_Scraper-EA580C?style=for-the-badge&logo=firefox&logoColor=white)](https://firecrawl.dev/)
[![n8n](https://img.shields.io/badge/n8n-Workflow_Automation-DC2626?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io/)
[![Render](https://img.shields.io/badge/Render-Cloud_Host-059669?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---

**Social World Simulator** is an enterprise-grade pre-publishing intelligence platform that models audience reactions, algorithm propagation, second-by-second retention heatmaps, and viral network dynamics using autonomous AI personas before content is published.

[View Architecture](./ARCHITECTURE.md) • [Getting Started](#-getting-started) • [Core Capabilities](#-core-capabilities) • [Sponsor Stack](#-hackathon-sponsor-ai-stack)

</div>

---

## 📌 Executive Summary

Publishing digital content today is inherently reactive. Creators, marketing teams, and media agencies invest significant capital into content production, yet measure impact **only after public distribution**. When a hook underperforms or retention drops off early, algorithmic distribution penalizes the content irreversibly.

**Social World Simulator** replaces guesswork with predictive simulation:
- **Simulate Before Publishing**: Test scripts, video content, and social posts across distinct AI persona clusters.
- **Identify Drop-off Mechanics**: Pinpoint precise timestamps where audience interest degrades.
- **Automated AI Optimization**: Receive strict, actionable feedback and apply high-retention script rewrites with a single click.

---

## 🏆 Hackathon Sponsor AI Stack

We integrated **all 5 major hackathon sponsor APIs & tools** directly into the platform workflow:

| Sponsor Partner | Integration Feature | Live Implementation |
| :--- | :--- | :--- |
| **ElevenLabs** | **AI Voice & Speech Synthesis Engine** | Real-time AI voiceover preview of simulation scripts and hook audio pacing. |
| **fal.ai** | **Generative Video & Thumbnail Engine** | Instant AI visual thumbnail preview generation via `fal-ai/fast-sdxl`. |
| **Firecrawl** | **Social Web Trend & Competitor Scraper** | Crawls 10K+ top-performing posts to extract high-retention hook patterns. |
| **n8n** | **Automated Publishing Webhook Pipeline** | Automated n8n Cloud Pro workflows for publishing approved scripts to social channels. |
| **Render** | **Cloud Production Hosting Platform** | Zero-downtime serverless architecture hosting Next.js 16 App Router & physics engine. |

---

## ⚡ Core Capabilities

| Capability | Description | Technology / Engine |
| :--- | :--- | :--- |
| **NVIDIA AI Video Intelligence** | Multimodal analysis of video content, audio extraction, Whisper transcription, and visual tone/emotion detection. | NVIDIA AI API + OpenAI Whisper |
| **Strict AI Content Critic** | Automated line-by-line script auditing that identifies weak hooks, static setups, and low-engagement phrases with direct replacement suggestions. | Custom LLM Prompt Engineering Pipeline |
| **Side-by-Side A/B Simulation** | Compare Variant A (Original Draft) vs Variant B (AI Optimized) side-by-side with virality boost deltas. | A/B Comparison Engine |
| **Pre-Flight Audit Report Exporter** | Executive printable content audit report with timestamped editor checklists and certification hash. | PDF / Print Audit Engine |
| **Audio Waveform & Voice Sync** | Interactive audio waveform displaying pacing markers (🔥 Hook, ⚠️ Drop-off) synced with ElevenLabs AI Voice. | Audio Waveform Engine |
| **Living Social Graph** | Real-time, 60fps force-directed graph displaying node interactions, community clustering, signal propagation, and viral heatwaves. | Custom HTML5 Canvas 2D Physics Engine |

---

## 🛠 System Architecture & Stack

```
[ Media Upload / Social URL ] ──► [ Next.js Serverless API ] ──► [ NVIDIA AI & ElevenLabs Pipeline ]
                                          │
                                          ▼
[ Living Canvas (60fps Physics) ] ◄── [ Simulator Engine ] ──► [ A/B Testing & Audit Report ]
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
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 License

Distributed under the MIT License. See `LICENSE` for details.
