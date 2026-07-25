'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Zap,
  Volume2,
  Image as ImageIcon,
  Flame,
  Globe,
  Server,
  ShieldCheck,
  X,
  ExternalLink,
  CheckCircle2,
  Activity,
  Key,
  Database,
  Terminal,
} from 'lucide-react';

interface AIWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSecrets: () => void;
  onOpenSystemLogs: () => void;
}

const AI_PROVIDERS = [
  {
    name: 'NVIDIA AI Nemotron 70B',
    type: 'Primary LLM & Reasoning Engine',
    status: 'Operational (24ms Latency)',
    badge: 'NVIDIA Enterprise',
    color: 'emerald',
    model: 'nemotron-3-70b-instruct',
    contextWindow: '128K Tokens',
  },
  {
    name: 'ElevenLabs Voice Synthesis',
    type: 'Audio Hook & Speech AI',
    status: 'Connected (Voice Stream Ready)',
    badge: 'ElevenLabs Pro',
    color: 'amber',
    model: 'eleven_multilingual_v2',
    contextWindow: 'Realtime Speech API',
  },
  {
    name: 'fal.ai Generative Media',
    type: 'Thumbnail & Visual Interrupts',
    status: 'Connected (High-Speed Edge)',
    badge: 'fal.ai Turbo',
    color: 'pink',
    model: 'fal-ai/fast-sdxl (140ms)',
    contextWindow: '4K Generative Frame Rate',
  },
  {
    name: 'Firecrawl Social Scraper',
    type: 'Live Web Scraping & Benchmarks',
    status: 'Ready (10K Voucher)',
    badge: 'Firecrawl API',
    color: 'orange',
    model: 'v1/crawl & v1/scrape',
    contextWindow: 'Realtime DOM Parser',
  },
];

export function AIWorkspaceModal({
  isOpen,
  onClose,
  onOpenSecrets,
  onOpenSystemLogs,
}: AIWorkspaceModalProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'providers' | 'audio' | 'media' | 'scraper' | 'webhooks'
  >('overview');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl font-sans text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-5xl h-[85vh] bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#F7F6F1]">AI Infrastructure Workspace</h2>
                <span className="text-xs text-zinc-400 font-mono">
                  Multi-Provider Telemetry & Workflow Center
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenSecrets}
                className="px-3 py-1.5 rounded-xl bg-[#181818] hover:bg-zinc-800 text-[#DEDBC8] border border-[#DEDBC8]/30 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Key className="w-3.5 h-3.5 text-[#DEDBC8]" />
                <span>API Secrets</span>
              </button>

              <button
                onClick={onOpenSystemLogs}
                className="px-3 py-1.5 rounded-xl bg-[#181818] hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Live Logs</span>
              </button>

              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="px-6 py-2.5 bg-[#0D0D0D] border-b border-white/10 flex space-x-2 shrink-0 font-mono text-xs overflow-x-auto">
            {[
              { id: 'overview', label: 'Telemetry Overview' },
              { id: 'providers', label: 'AI Providers' },
              { id: 'audio', label: 'ElevenLabs Voice' },
              { id: 'media', label: 'fal.ai Visuals' },
              { id: 'scraper', label: 'Firecrawl Search' },
              { id: 'webhooks', label: 'n8n Automation' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                  activeTab === t.id
                    ? 'border-[#DEDBC8] text-white font-bold bg-[#DEDBC8]/15'
                    : 'border-white/5 text-zinc-400 hover:text-zinc-200 bg-[#181818]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono">
                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-1">
                    <span className="text-[9px] text-zinc-400 uppercase block">Total Inference Requests</span>
                    <span className="text-xl font-extrabold text-[#DEDBC8]">14,289</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-1">
                    <span className="text-[9px] text-zinc-400 uppercase block">Average Latency</span>
                    <span className="text-xl font-extrabold text-emerald-400">28ms</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-1">
                    <span className="text-[9px] text-zinc-400 uppercase block">Canvas Physics FPS</span>
                    <span className="text-xl font-extrabold text-blue-300">60 FPS</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-1">
                    <span className="text-[9px] text-zinc-400 uppercase block">Connected AI Providers</span>
                    <span className="text-xl font-extrabold text-[#DEDBC8]">5 Active</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold font-mono text-[#DEDBC8] uppercase tracking-wider">
                    Active AI Model Pipeline Grid
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AI_PROVIDERS.map((prov, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{prov.name}</span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#DEDBC8]/15 text-[#DEDBC8] font-bold border border-[#DEDBC8]/30">
                            {prov.badge}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">{prov.type}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono">
                          <span className="text-emerald-400">{prov.status}</span>
                          <span className="text-[10px] font-mono text-[#DEDBC8]">{prov.model}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'providers' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-[#DEDBC8] uppercase tracking-wider">
                  NVIDIA Nemotron 70B & Multi-LLM Routing
                </h3>
                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-3 text-xs text-zinc-300">
                  <p>
                    NVIDIA Llama 3.3 70B Instruct handles deep script semantic parsing, hook arousal rating, and audience persona simulation.
                  </p>
                  <div className="p-3 rounded-xl bg-black/60 font-mono text-[11px] space-y-1">
                    <span className="text-zinc-400 block">Model Endpoint:</span>
                    <span className="text-emerald-400 block">https://integrate.api.nvidia.com/v1/chat/completions</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audio' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-[#DEDBC8] uppercase tracking-wider">
                  ElevenLabs Voice Synthesis Integration
                </h3>
                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-5 h-5 text-[#DEDBC8]" />
                    <span className="text-xs font-bold text-white">ElevenLabs Multilingual v2 Engine</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Provides voiceover previews for hooks, pacing alignment, and voice pitch shifts.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-[#DEDBC8] uppercase tracking-wider">
                  fal.ai Fast SDXL Generative Media Engine
                </h3>
                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
                  <span className="text-xs text-zinc-300">
                    Generates 140ms visual pattern interrupts and high-CTR thumbnail previews.
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'scraper' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-[#DEDBC8] uppercase tracking-wider">
                  Firecrawl Social Web Crawler
                </h3>
                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
                  <span className="text-xs text-zinc-300">
                    Crawls social feeds, TikTok viral hooks, and X threads for real-time benchmark comparison.
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'webhooks' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-[#DEDBC8] uppercase tracking-wider">
                  n8n Workflow Automation
                </h3>
                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
                  <span className="text-xs text-zinc-300">
                    Routes approved content rewrites automatically to publishing webhooks.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
            <span className="text-zinc-500">Social World Infrastructure v2.4</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-bold cursor-pointer active:scale-95"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
