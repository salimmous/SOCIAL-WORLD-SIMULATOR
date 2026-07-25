'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  Globe,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Moon,
  Sun,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface LandingPageProps {
  onLaunchPlatform: () => void;
  onOpenAtlas?: () => void;
  onOpenWorkspace?: () => void;
}

export function LandingPage({ onLaunchPlatform, onOpenAtlas, onOpenWorkspace }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'platform' | 'tech' | 'workspace'>('platform');

  // Track scroll position for navbar backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 60 FPS Living HTML5 Canvas Background Physics
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
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.5 ? '#8b5cf6' : '#6366f1',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 60;
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

      // Draw inter-node neural connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & render nodes
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

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* 60 FPS Living Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Fixed Glassmorphic Navigation Bar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.08] py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Official Brand Logo */}
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

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-zinc-400 font-sans">
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

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/salimmous/SOCIAL-WORLD-SIMULATOR"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs transition-all cursor-pointer hidden sm:flex items-center justify-center"
              title="View Source Code on GitHub"
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
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small Badge */}
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
              Upload your content. Watch AI analyze, simulate, predict, and optimize your social performance across 200+ autonomous persona profiles before going live.
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

            {/* Live Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]">
              <div>
                <span className="text-2xl font-black text-white font-mono block">200+</span>
                <span className="text-[11px] text-zinc-400 font-sans">AI Personas</span>
              </div>
              <div>
                <span className="text-2xl font-black text-purple-400 font-mono block">94%</span>
                <span className="text-[11px] text-zinc-400 font-sans">Prediction Accuracy</span>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-400 font-mono block">4.8s</span>
                <span className="text-[11px] text-zinc-400 font-sans">Simulation Speed</span>
              </div>
              <div>
                <span className="text-2xl font-black text-cyan-400 font-mono block">6</span>
                <span className="text-[11px] text-zinc-400 font-sans">AI Providers</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Simulation Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="p-1 rounded-3xl bg-gradient-to-tr from-purple-500/30 via-white/10 to-indigo-500/30 shadow-2xl backdrop-blur-2xl">
              <div className="bg-zinc-950/90 rounded-[22px] border border-white/10 p-5 space-y-4 shadow-2xl relative overflow-hidden">
                {/* Visual Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white">LIVE SIMULATION CANVAS</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                    Virality Index: 92 / 100
                  </span>
                </div>

                {/* Simulated Graph Preview Box */}
                <div className="relative aspect-video rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden flex items-center justify-center p-4">
                  {/* Floating Mock Node Network */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 rounded-full bg-purple-600/20 blur-2xl animate-pulse" />
                  </div>

                  <div className="relative z-10 text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 p-1 mx-auto flex items-center justify-center shadow-xl">
                      <img src="/logo.png" alt="Simulator Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-white block">200 Autonomous Persona Nodes Orbiting Payload</span>
                    <span className="text-[10px] font-mono text-purple-300 block">NVIDIA Nemotron • 42ms Inference Speed</span>
                  </div>
                </div>

                {/* Simulated Live Comment Stream */}
                <div className="space-y-2 font-sans text-xs">
                  <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/5 flex items-start space-x-2.5">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" className="w-6 h-6 rounded-full object-cover shrink-0" />
                    <div>
                      <span className="font-bold text-white text-[11px] block">Gen Z Creator Node:</span>
                      <p className="text-zinc-300 text-[11px]">"The first 3 seconds are super strong. I shared this immediately!"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block">
            UNIFIED AI ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Built for Enterprise AI Content Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">Multimodal Content Intelligence</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Accepts video, audio, text scripts, and social URLs. Extracts Whisper transcripts, visual tone curves, and hook virality metrics automatically.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">60 FPS Orbital Canvas Physics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Living HTML5 Canvas graphics calculating real-time orbital physics, node attraction, and signal propagation across 200+ persona profiles.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-xl backdrop-blur-xl group">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">1-Click Script Optimization</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Applies high-retention script patterns and generates A/B variant comparisons with verified virality boost deltas (+19%).
            </p>
          </div>
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
