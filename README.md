# 🌐 SOCIAL WORLD SIMULATOR — Hackathon MVP
> **The World's First Pre-Publish AI Audience Reaction Engine**
> *Flight Simulator × GitHub Copilot × Figma for Content Creators*

![Social World Simulator Hero](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## ⚡ The Problem: Creators Fly Blind
Today, content creators, marketers, and brands publish content completely blind. They spend hours scripting, filming, and editing, but they only learn if their content works **AFTER** they post it. If the hook is weak, the algorithm buries the post. If the joke doesn't land, retention tanks.

## 🚀 The Solution: Simulate Before You Publish
**Social World Simulator changes the paradigm.** 
Instead of guessing, creators can simulate their content's performance across an ecosystem of AI persona entities before ever hitting publish. The platform visualizes audience reactions, comment threads, algorithm propagation, and second-by-second retention heatmaps in real-time.

> *"Don't guess what happens when you post. Simulate it first."*

---

## ✨ Key Features

### 1. 🤖 NVIDIA AI Video & Script Intelligence
- **NVIDIA AI API Integration**: Upload a video, paste a TikTok/X link, or input text, and the AI immediately transcribes the speech (Whisper), analyzes the emotion, detects objects, and understands the core narrative.
- **Strict AI Content Critic**: The AI acts as a harsh, actionable editor. It highlights exactly which lines in your script are weak, crosses them out, and provides high-retention rewrites.
- **1-Click Auto Rewrite**: Instantly apply the AI's suggested fixes to your payload with a single click.

### 2. 🧠 Living Social Ecosystem Canvas
- **Force-Directed Physics Engine**: An animated 2D physics graph displaying clustered audience communities (Tech Founders, Gen Z Trendsetters, B2B VPs, Algorithm Bots).
- **Breathing Node Physics**: Nodes breathe organically, edges pulse with signal transmissions, and expanding heat waves visualize reach propagation as your content goes viral.
- **Live Simulated Comments**: Real-time, platform-specific audience comments float directly over the canvas visualizer.

### 3. 📊 Predictive Analytics & Retention Heatmaps
- **Core 4 KPIs**: Virality Score, Audience Fit, Attention Score, and Reach Estimate.
- **Retention Heatmap Curve**: Interactive SVG attention graph showing exactly *when* and *why* audiences drop off (e.g., "Static visual setup drops Gen Z retention by 32%").

### 4. 🏢 Enterprise CTO Portal
- **SSO & Security**: SAML Okta integration UI and Audit Logs.
- **OAuth & API Hub**: Connect X, TikTok, LinkedIn, and Instagram accounts, and manage NVIDIA/ElevenLabs API keys in a centralized modal.
- **Saved Run History**: A slide-over drawer that saves every simulation run, allowing you to A/B test variations of your content.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router) + React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Glassmorphism UI tokens (`backdrop-blur-2xl bg-zinc-950/60 border border-white/[0.06]`)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) + HTML5 Canvas 2D Physics Engine + `canvas-confetti`
- **AI Engine**: Custom `simulatorEngine.ts` mapping payloads to NVIDIA AI endpoints.

---

## 🏗️ Architecture

Please see the [**ARCHITECTURE.md**](./ARCHITECTURE.md) file for a deep dive into the state management, Node Physics Engine, AI Analysis pipeline, and component structure. Designed for the Hackathon Judges.

---

## 🚀 Quick Start & Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR.git
cd SOCIAL-WORLD-SIMULATOR
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Design Philosophy & Aesthetics

Inspired by the design quality of **Apple Vision Pro, Linear, and Vercel**:
- **Background**: Soft elevated dark palette (`#09090d`) with ambient purple (`#7c3aed`) radial lighting.
- **Premium UX**: Micro-interactions on every button, sleek glass panels, and absolute zero visual clutter.
- **Action-Oriented**: The UI prioritizes telling the user exactly *what to fix* rather than just showing vanity metrics.

---
*Built for the Hackathon 2026.*
