'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  Globe,
  TrendingUp,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Layers,
  Cpu,
  Clock,
  User,
  Flame,
  BarChart2,
  FileText,
  Activity,
  Check,
} from 'lucide-react';

interface LandingPageProps {
  onLaunchPlatform: () => void;
  onOpenAtlas?: () => void;
  onOpenWorkspace?: () => void;
}

export function LandingPage({ onLaunchPlatform, onOpenAtlas, onOpenWorkspace }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const demoCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'network' | 'retention' | 'reasoning' | 'optimization'>('network');
  const [selectedPreset, setSelectedPreset] = useState<'b2b' | 'genz' | 'tech'>('b2b');

  // Track scroll position for navbar backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 60 FPS Living Background Canvas Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Persona node particles
    const nodes = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.5 ? '#a855f7' : '#6366f1',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 70;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Inter-node connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Hero Preview Box 60 FPS Orbit Canvas Simulation
  useEffect(() => {
    if (activePreviewTab !== 'network') return;
    const canvas = demoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let angle = 0;

    const renderDemo = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 260;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Orbiting Persona Nodes
      for (let i = 0; i < 18; i++) {
        const orbitRadius = 45 + (i % 3) * 35;
        const currentAngle = angle * (i % 2 === 0 ? 1 : -1) + (i * Math.PI) / 9;
        const x = centerX + Math.cos(currentAngle) * orbitRadius;
        const y = centerY + Math.sin(currentAngle) * (orbitRadius * 0.55);

        // Vector linkage to payload
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Persona Node
        ctx.fillStyle = i % 2 === 0 ? '#a855f7' : '#34d399';
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Payload Center Core
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      angle += 0.015;
      frameId = requestAnimationFrame(renderDemo);
    };

    renderDemo();
    return () => cancelAnimationFrame(frameId);
  }, [activePreviewTab]);

  const presetData = {
    b2b: { title: 'B2B SaaS 0-to-1 Pitch', virality: 92, reach: '142K', retention: '88%' },
    genz: { title: 'Gen Z Viral TikTok Hook', virality: 96, reach: '480K', retention: '94%' },
    tech: { title: 'AI Agent Founder Hot Take', virality: 89, reach: '98K', retention: '82%' },
  };

  const currentPreset = presetData[selectedPreset];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Living Physics Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Top Ambient Lighting Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Liquid Glass Navigation Bar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/85 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onLaunchPlatform}>
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 p-0.5 border border-purple-500/40 shadow-lg shadow-purple-600/20 overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="Social World Simulator" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold tracking-tight text-white text-sm sm:text-base flex items-center space-x-2">
              <span>SOCIAL WORLD SIMULATOR</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                PRO AI OS
              </span>
            </span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-zinc-400 font-sans">
            <button onClick={onLaunchPlatform} className="hover:text-white transition-colors cursor-pointer">
              Platform
            </button>
            <button onClick={onOpenWorkspace} className="hover:text-white transition-colors cursor-pointer">
              Technology
            </button>
            <button onClick={onOpenWorkspace} className="hover:text-white transition-colors cursor-pointer">
              AI Workspace
            </button>
            <button onClick={onOpenAtlas} className="hover:text-white transition-colors cursor-pointer">
              Documentation
            </button>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs transition-all cursor-pointer hidden sm:flex items-center justify-center"
              title="View GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <button
              onClick={onLaunchPlatform}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer border border-purple-400/30"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold backdrop-blur-md shadow-lg shadow-purple-500/10">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-purple-400" />
              <span>AI Content Intelligence Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-sans">
              Predict the Internet <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Before You Publish.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-xl">
              Upload your content payload. Watch AI analyze pacing, simulate 200+ autonomous persona reactions across force-directed community graphs, and optimize retention before going live.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onLaunchPlatform}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-right text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-2xl shadow-purple-600/40 transition-all flex items-center space-x-3 active:scale-95 cursor-pointer border border-purple-400/40"
              >
                <span>Launch Platform Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLaunchPlatform}
                className="px-6 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-xl shadow-lg"
              >
                <Play className="w-4 h-4 fill-purple-400 text-purple-400" />
                <span>Watch Live Demo</span>
              </button>
            </div>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]">
              <div>
                <span className="text-2xl font-black text-white font-mono block">200+</span>
                <span className="text-[11px] text-zinc-400 font-sans">Autonomous Personas</span>
              </div>
              <div>
                <span className="text-2xl font-black text-purple-400 font-mono block">94.2%</span>
                <span className="text-[11px] text-zinc-400 font-sans">Prediction Accuracy</span>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-400 font-mono block">4.8s</span>
                <span className="text-[11px] text-zinc-400 font-sans">Simulation Velocity</span>
              </div>
              <div>
                <span className="text-2xl font-black text-cyan-400 font-mono block">6</span>
                <span className="text-[11px] text-zinc-400 font-sans">AI Provider Engines</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Simulation Interactive Studio Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="p-1 rounded-3xl bg-gradient-to-tr from-purple-500/30 via-white/10 to-indigo-500/30 shadow-[0_0_60px_rgba(168,85,247,0.15)] backdrop-blur-3xl">
              <div className="bg-zinc-950/90 rounded-[22px] border border-white/10 p-5 space-y-4 shadow-2xl relative overflow-hidden">
                {/* Header & View Mode Switcher */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Interactive Engine Visualizer
                    </span>
                  </div>

                  <div className="flex p-0.5 bg-zinc-900 rounded-xl border border-white/10 font-mono text-[9px]">
                    <button
                      onClick={() => setActivePreviewTab('network')}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        activePreviewTab === 'network' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400'
                      }`}
                    >
                      Network
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('retention')}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        activePreviewTab === 'retention' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400'
                      }`}
                    >
                      Retention
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('reasoning')}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        activePreviewTab === 'reasoning' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400'
                      }`}
                    >
                      Reasoning
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('optimization')}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        activePreviewTab === 'optimization' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400'
                      }`}
                    >
                      Optimization
                    </button>
                  </div>
                </div>

                {/* TAB 1: 60 FPS Orbit Canvas */}
                {activePreviewTab === 'network' && (
                  <div className="relative aspect-video rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden flex items-center justify-center">
                    <canvas ref={demoCanvasRef} className="w-full h-full block" />
                    <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 rounded-xl border border-white/10 backdrop-blur-md">
                      <span className="text-[10px] font-mono text-purple-300 font-bold">● 200 Persona Orbit Vectors</span>
                    </div>
                  </div>
                )}

                {/* TAB 2: Retention Heatmap Graph */}
                {activePreviewTab === 'retention' && (
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 aspect-video flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">Second-by-Second Retention Curve</span>
                      <span className="text-emerald-400 font-bold">🔥 Excitement Peak @ 0:02</span>
                    </div>
                    {/* Graph bars */}
                    <div className="flex items-end space-x-1.5 h-32 pt-4">
                      {[95, 98, 92, 88, 85, 91, 96, 94, 90, 87, 89, 93, 95].map((val, idx) => (
                        <div key={idx} className="flex-1 bg-zinc-800 rounded-t-lg relative group overflow-hidden">
                          <div
                            className="bg-gradient-to-t from-purple-600 to-indigo-400 w-full rounded-t-lg transition-all duration-500"
                            style={{ height: `${val}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: Autonomous Reasoning Stream */}
                {activePreviewTab === 'reasoning' && (
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2.5 aspect-video font-sans text-xs overflow-y-auto">
                    <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 space-y-1">
                      <span className="font-bold text-white text-[11px] block">Tech Founder Node (Influence 94):</span>
                      <p className="text-zinc-300 text-[11px]">"The hook addresses a critical B2B bottleneck in second 2. Retained interest and shared to team."</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 space-y-1">
                      <span className="font-bold text-amber-400 text-[11px] block">Skeptical Critic Node (Influence 88):</span>
                      <p className="text-zinc-300 text-[11px]">"Requires a clearer ROI benchmark. Raised a question in replies."</p>
                    </div>
                  </div>
                )}

                {/* TAB 4: 1-Click Script Optimization Lab */}
                {activePreviewTab === 'optimization' && (
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 aspect-video font-sans text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">1-Click Auto Rewrite Delta</span>
                      <span className="text-purple-300 font-bold">+19 Virality Score Boost</span>
                    </div>
                    <div className="p-3 rounded-xl bg-red-950/10 border border-red-500/30 text-[11px]">
                      <span className="text-red-400 font-bold block mb-1">Original Draft (Score 72):</span>
                      <p className="text-zinc-400 line-through">"In this video I want to explain my new AI product..."</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/30 text-[11px]">
                      <span className="text-emerald-400 font-bold block mb-1">AI Optimized Variant (Score 91):</span>
                      <p className="text-zinc-200 font-bold">"Stop publishing social content before testing this rule..."</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Sandbox Scenario Selector Bar */}
      <section className="relative z-10 py-12 px-6 max-w-7xl mx-auto">
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
              LIVE INTERACTIVE SANDBOX
            </span>
            <h3 className="text-lg font-extrabold text-white">Test Pre-Configured Content Scenarios</h3>
          </div>

          {/* Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedPreset('b2b')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                selectedPreset === 'b2b'
                  ? 'bg-purple-600 text-white font-bold border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              B2B SaaS Launch
            </button>
            <button
              onClick={() => setSelectedPreset('genz')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                selectedPreset === 'genz'
                  ? 'bg-purple-600 text-white font-bold border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              Gen Z TikTok Hook
            </button>
            <button
              onClick={() => setSelectedPreset('tech')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                selectedPreset === 'tech'
                  ? 'bg-purple-600 text-white font-bold border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              Tech Hot Take
            </button>
          </div>

          <button
            onClick={onLaunchPlatform}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 cursor-pointer shrink-0"
          >
            Simulate Selected Scenario →
          </button>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block">
            UNIFIED PLATFORM ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Engineered for High-Retention Creators & Enterprise AI Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">Multimodal Content Intelligence</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Parses video, audio, text scripts, and social URLs. Extracts Whisper transcripts, visual frame pacing, and emotion curves automatically via NVIDIA Llama 70B.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">60 FPS Orbital Graph Physics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Living HTML5 Canvas graphics calculating gravitational pull, velocity vectors, and virality heatwaves across 200+ persona profiles in real time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">1-Click Script Optimization Lab</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Applies high-retention script patterns and generates A/B variant comparisons with verified virality boost deltas (+19% score increase).
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">Retention Timeline & Scrubber</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Scrub second-by-second excitement markers (🔥 High Excitement) and drop-off warnings (⚠️ Pacing Slowdown) synced with audio waveforms.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">Atlas Senior AI Product Guide</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Persistent senior product mentor explaining feature mechanics, why components exist, internal API execution, and best practices.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">AI Workspace Infrastructure</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Full telemetry for connected providers (NVIDIA Nemotron 42ms, OpenAI, ElevenLabs, fal.ai, Firecrawl), secrets management, and live logs.
            </p>
          </div>
        </div>
      </section>

      {/* Atlas AI Product Mentor Callout Section */}
      <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/30 via-zinc-950 to-indigo-950/30 border border-purple-500/30 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 p-1 border border-purple-400/40 flex items-center justify-center text-white shadow-xl overflow-hidden shrink-0">
              <img src="/logo.png" alt="Atlas Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-white">Atlas AI Product Guide</h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                  Senior Product Mentor
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed max-w-xl">
                Need guidance? Atlas is built directly into every workspace module to explain how algorithms evaluate content and guide your optimization strategy.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAtlas}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-xl shadow-purple-600/30 cursor-pointer shrink-0"
          >
            Explore Atlas Guide →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 max-w-7xl mx-auto border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 font-sans text-xs text-zinc-500">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
          <span>© 2026 Social World Simulator Inc. All rights reserved.</span>
        </div>

        <div className="flex items-center space-x-6">
          <button onClick={onOpenAtlas} className="hover:text-zinc-300 transition-colors cursor-pointer">
            Atlas Product Guide
          </button>
          <button onClick={onOpenWorkspace} className="hover:text-zinc-300 transition-colors cursor-pointer">
            AI Workspace Telemetry
          </button>
          <a
            href="https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
