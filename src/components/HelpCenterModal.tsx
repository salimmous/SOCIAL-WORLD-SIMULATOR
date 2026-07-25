'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, BookOpen, Keyboard, Cpu, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplayTour: () => void;
}

export function HelpCenterModal({ isOpen, onClose, onReplayTour }: HelpCenterModalProps) {
  const [tab, setTab] = useState<'tour' | 'docs' | 'keys' | 'specs' | 'changelog'>('docs');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl font-sans text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl h-[85vh] bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#F7F6F1]">Help Center & Documentation</h2>
                <span className="text-xs text-zinc-400 font-mono">Platform v2.4.0 • Enterprise Specs</span>
              </div>
            </div>

            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="px-6 py-3 bg-[#0D0D0D] border-b border-white/10 flex space-x-2 shrink-0 font-mono text-xs overflow-x-auto">
            {[
              { id: 'docs', label: 'Documentation', icon: BookOpen },
              { id: 'keys', label: 'Shortcuts', icon: Keyboard },
              { id: 'specs', label: 'AI Specs', icon: Cpu },
              { id: 'changelog', label: 'Release Notes', icon: Sparkles },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={`px-3 py-1.5 rounded-xl border transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                    tab === t.id
                      ? 'bg-[#DEDBC8]/20 border-[#DEDBC8] text-[#DEDBC8] font-bold'
                      : 'bg-[#181818] border-white/5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {tab === 'docs' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#DEDBC8]/10 border border-[#DEDBC8]/30 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#F7F6F1]">Interactive Guided Product Tour</h3>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      Replay the 10-step guided tour explaining every module on the platform.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onReplayTour();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-xs cursor-pointer shadow-lg active:scale-95"
                  >
                    Replay Tour
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-[#DEDBC8] font-mono">1. Content Intelligence</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Uploads raw video/script files, extracts Whisper transcripts, calculates hook energy, emotion curves, visual style, and target audience fit automatically.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-[#DEDBC8] font-mono">2. Social World Physics</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      200+ autonomous AI persona entities orbiting a central content node in a 60 FPS HTML5 Canvas 2D force-directed graph.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-[#DEDBC8] font-mono">3. Optimization Lab</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      1-click script rewrites with side-by-side A/B variant testing and immediate re-simulation validation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-[#DEDBC8] font-mono">4. Executive Exporter</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Compiles McKinsey-style audit reports exportable to PDF, JSON, PNG snapshots, and shareable web links.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tab === 'keys' && (
              <div className="space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-[#DEDBC8] uppercase tracking-wider block">
                  Global Keyboard Shortcuts
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: '⌘K / Ctrl+K', desc: 'Open Linear-Style Command Palette' },
                    { key: 'Space', desc: 'Play / Pause Simulation Playback' },
                    { key: 'R', desc: 'Reset Simulation Timeline to 0:00' },
                    { key: 'C', desc: 'Open Side-by-Side A/B Comparison' },
                    { key: 'E', desc: 'Open Multi-Format Export Suite' },
                    { key: 'Esc', desc: 'Close Active Modal / Drawer' },
                  ].map((k) => (
                    <div key={k.key} className="p-3 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-between">
                      <span className="px-2 py-1 rounded-lg bg-black border border-white/10 text-[#DEDBC8] font-bold">
                        {k.key}
                      </span>
                      <span className="text-zinc-300 text-[11px]">{k.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'specs' && (
              <div className="space-y-4 font-mono text-xs">
                <span className="text-xs font-bold text-[#DEDBC8] uppercase tracking-wider block">
                  Infrastructure AI Specs
                </span>
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                  <div className="flex justify-between border-b border-white/5 py-1.5">
                    <span className="text-zinc-400">Inference Providers:</span>
                    <span className="text-white font-bold">NVIDIA Nemotron 70B • OpenAI GPT-4o • Anthropic</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1.5">
                    <span className="text-zinc-400">Voice Engine:</span>
                    <span className="text-[#DEDBC8]">ElevenLabs AI Speech Synthesis</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1.5">
                    <span className="text-zinc-400">Media Engine:</span>
                    <span className="text-pink-400">fal.ai Generative Media (FLUX.1 0.4s)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1.5">
                    <span className="text-zinc-400">Research Scraper:</span>
                    <span className="text-amber-400">Firecrawl Social Crawler</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400">Physics Engine:</span>
                    <span className="text-emerald-400">60 FPS HTML5 Canvas 2D Orbital Physics</span>
                  </div>
                </div>
              </div>
            )}

            {tab === 'changelog' && (
              <div className="space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  ● Version 2.4.0 — Production Enterprise OS Release
                </span>
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2 text-zinc-300">
                  <p>• Added Apple/Linear 10-step guided product onboarding tour.</p>
                  <p>• Added AI Workspace with 7 enterprise infrastructure telemetry modules.</p>
                  <p>• Added Encrypted Secrets Manager & Realtime System Audit Logs stream.</p>
                  <p>• Added Floating Getting Started progress checklist widget.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
            <span className="text-zinc-500">Social World Simulator Docs</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-bold transition-all cursor-pointer font-sans active:scale-95"
            >
              Close Help Center
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
