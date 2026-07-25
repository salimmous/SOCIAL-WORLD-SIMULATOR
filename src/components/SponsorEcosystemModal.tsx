'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Volume2,
  Image as ImageIcon,
  Flame,
  Globe,
  Server,
  Zap,
  CheckCircle2,
  ExternalLink,
  Play,
  Pause,
  RefreshCw,
  Search,
  Check,
} from 'lucide-react';

interface SponsorEcosystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptText: string;
}

export function SponsorEcosystemModal({
  isOpen,
  onClose,
  scriptText,
}: SponsorEcosystemModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'elevenlabs' | 'fal' | 'firecrawl' | 'n8n' | 'render'>('all');
  
  // ElevenLabs state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('Adam (Deep Tech)');
  
  // Firecrawl state
  const [firecrawlQuery, setFirecrawlQuery] = useState('Viral TikTok Hooks 2026');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlResults, setCrawlResults] = useState<string[]>([
    '🔥 "Stop publishing blindly..." (+4.2M views)',
    '💡 "3 tools every creator hides from you..." (+1.8M views)',
    '🚀 "I built an AI simulator and this happened..." (+850K views)',
  ]);

  // fal.ai state
  const [falPrompt, setFalPrompt] = useState('Cyberpunk neon audience visualizer thumbnail 8k render');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [falImage, setFalImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');

  // n8n state
  const [n8nTriggered, setN8nTriggered] = useState(false);

  const handlePlayElevenLabs = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToSpeak = scriptText || 'Welcome to Social World Simulator powered by ElevenLabs voice AI.';
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert('ElevenLabs Voice Simulation Active!');
    }
  };

  const handleRunFirecrawl = () => {
    setIsCrawling(true);
    setTimeout(() => {
      setCrawlResults([
        `🔥 Crawled 14K posts for "${firecrawlQuery}"`,
        '📌 Top Hook Pattern: "I tested 100 AI tools so you don\'t have to"',
        '⚡ Average Retention Peak: 0:04.2s',
      ]);
      setIsCrawling(false);
    }, 1200);
  };

  const handleGenerateFal = () => {
    setIsGeneratingImage(true);
    setTimeout(() => {
      setIsGeneratingImage(false);
    }, 1000);
  };

  const handleTriggerN8n = () => {
    setN8nTriggered(true);
    setTimeout(() => setN8nTriggered(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-[#181818] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 text-[#DEDBC8]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide flex items-center space-x-2">
                  <span>Hackathon AI Sponsor Ecosystem</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#DEDBC8]/20 text-[#DEDBC8] border border-[#DEDBC8]/30 font-semibold">
                    5 Integrations Active
                  </span>
                </h2>
                <p className="text-xs text-zinc-400">
                  ElevenLabs • fal.ai • Firecrawl • n8n Workflow • Render Cloud
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Integration Tabs */}
          <div className="px-6 py-2.5 border-b border-white/5 bg-black/40 flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#DEDBC8] text-black font-extrabold shadow-lg'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              All Sponsors Grid
            </button>
            <button
              onClick={() => setActiveTab('elevenlabs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'elevenlabs'
                  ? 'bg-[#DEDBC8] text-black font-extrabold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-zinc-800" />
              <span>ElevenLabs Voice</span>
            </button>
            <button
              onClick={() => setActiveTab('fal')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'fal'
                  ? 'bg-[#DEDBC8] text-black font-extrabold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>fal.ai Media</span>
            </button>
            <button
              onClick={() => setActiveTab('firecrawl')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'firecrawl'
                  ? 'bg-[#DEDBC8] text-black font-extrabold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Firecrawl Scraper</span>
            </button>
            <button
              onClick={() => setActiveTab('n8n')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'n8n'
                  ? 'bg-[#DEDBC8] text-black font-extrabold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>n8n Workflow</span>
            </button>
            <button
              onClick={() => setActiveTab('render')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'render'
                  ? 'bg-[#DEDBC8] text-black font-extrabold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Render Cloud</span>
            </button>
          </div>

          {/* Modal Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* SPONSOR 1: ELEVENLABS */}
            {(activeTab === 'all' || activeTab === 'elevenlabs') && (
              <div className="p-5 rounded-2xl bg-[#181818] border border-[#DEDBC8]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#DEDBC8]/20 border border-[#DEDBC8]/40 flex items-center justify-center text-[#DEDBC8] font-bold text-lg font-mono">
                      11
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>ElevenLabs AI Voice Synthesis</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                          API Connected
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Generate hyper-realistic AI voiceovers and audio hook previews from your simulation scripts.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePlayElevenLabs}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                      isPlayingAudio
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold shadow-lg'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black text-black" />}
                    <span>{isPlayingAudio ? 'Stop Voice Simulation' : 'Preview ElevenLabs AI Voice'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-zinc-400 block uppercase">Voice Profile</span>
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-xs text-zinc-200 focus:outline-none focus:border-[#DEDBC8]"
                    >
                      <option value="Adam (Deep Tech)">Adam (Tech & Growth Master)</option>
                      <option value="Rachel (Gen Z Hype)">Rachel (Gen Z Viral Trendsetter)</option>
                      <option value="Domi (Narrator)">Domi (Documentary Storyteller)</option>
                      <option value="Bella (Conversational)">Bella (Casual Podcast Host)</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-zinc-400 block uppercase">Live Hook Script Payload</span>
                    <p className="text-xs text-[#DEDBC8] font-mono italic line-clamp-2">
                      "{scriptText || 'Creators publish blindly. We change that. Simulate your audience before posting.'}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SPONSOR 2: FAL.AI */}
            {(activeTab === 'all' || activeTab === 'fal') && (
              <div className="p-5 rounded-2xl bg-[#181818] border border-pink-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 font-bold text-sm font-mono">
                      fal
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>fal.ai Generative Media Engine</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                          $50 Credits Claimed
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Generate high-CTR video thumbnail previews and visual pattern interrupts on demand.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateFal}
                    disabled={isGeneratingImage}
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shadow-lg"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGeneratingImage ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingImage ? 'Generating fal.ai Media...' : 'Generate AI Thumbnail'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 p-3 rounded-xl bg-black/60 border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-400 block uppercase">fal.ai Prompt Input</span>
                    <input
                      type="text"
                      value={falPrompt}
                      onChange={(e) => setFalPrompt(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-pink-500"
                    />
                    <div className="flex items-center space-x-2 text-[10px] text-zinc-400 font-mono">
                      <span>Model: <strong className="text-pink-300">fal-ai/fast-sdxl</strong></span>
                      <span>•</span>
                      <span>Latency: <strong className="text-emerald-400">140ms</strong></span>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/10 h-28 bg-black flex items-center justify-center">
                    <img
                      src={falImage}
                      alt="fal.ai output"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono text-pink-300 border border-pink-500/30">
                      fal.ai preview
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SPONSOR 3: FIRECRAWL */}
            {(activeTab === 'all' || activeTab === 'firecrawl') && (
              <div className="p-5 rounded-2xl bg-[#181818] border border-orange-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-300 font-bold text-sm font-mono">
                      🔥
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>Firecrawl Web & Social Scraper</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-mono">
                          10K Voucher Ready
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Crawl top-performing social posts and competitors to benchmark retention patterns.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleRunFirecrawl}
                    disabled={isCrawling}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shadow-lg"
                  >
                    <Search className="w-4 h-4" />
                    <span>{isCrawling ? 'Crawling Social Web...' : 'Run Firecrawl Research'}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={firecrawlQuery}
                      onChange={(e) => setFirecrawlQuery(e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1 pt-1 font-mono text-xs">
                    {crawlResults.map((res, i) => (
                      <div key={i} className="text-orange-300/90 flex items-center space-x-1.5">
                        <span>►</span>
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SPONSOR 4 & 5: N8N & RENDER */}
            {(activeTab === 'all' || activeTab === 'n8n' || activeTab === 'render') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* n8n */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-red-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-red-500/20 text-red-400 font-bold text-xs font-mono">
                        n8n
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">n8n Workflow Automation</h4>
                        <span className="text-[10px] text-zinc-400">Webhook Posting Pipeline</span>
                      </div>
                    </div>

                    <button
                      onClick={handleTriggerN8n}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                        n8nTriggered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 hover:bg-red-500 text-white'
                      }`}
                    >
                      {n8nTriggered ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                      <span>{n8nTriggered ? 'n8n Triggered ✓' : 'Fire n8n Webhook'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Automatically route approved AI rewrites to TikTok, X, and LinkedIn API publishing queues via n8n Cloud Pro.
                  </p>
                </div>

                {/* Render */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs font-mono">
                        Render
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Render Cloud Platform</h4>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">● Active 99.99% Uptime</span>
                      </div>
                    </div>

                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                      Production Hosted
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Zero-downtime serverless architecture hosting Next.js App Router and GPU Node physics engine.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/60 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Built for Cursor Hackathon Stuttgart 2026
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-bold transition-all cursor-pointer"
            >
              Close Hub
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
