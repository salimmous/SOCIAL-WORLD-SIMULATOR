'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Zap,
  Globe,
  Database,
  Activity,
  Layers,
  Server,
  RefreshCw,
  CheckCircle2,
  X,
  Volume2,
  Image as ImageIcon,
  Search,
  Workflow,
  Cloud,
  HardDrive,
  BarChart3,
  Sliders,
  Settings,
  Key,
  Terminal,
} from 'lucide-react';
import { ProviderDetailsDrawer, ProviderDetailData } from './ProviderDetailsDrawer';
import { SecretsDrawer } from './SecretsDrawer';
import { LiveSystemLogsModal } from './LiveSystemLogsModal';

interface AIWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptText?: string;
}

export function AIWorkspaceModal({ isOpen, onClose, scriptText }: AIWorkspaceModalProps) {
  const [activeTab, setActiveTab] = useState<'providers' | 'media' | 'research' | 'automation' | 'deployment' | 'storage' | 'monitoring'>('providers');
  const [activeModel, setActiveModel] = useState('NVIDIA Nemotron 70B');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderDetailData | null>(null);
  const [isSecretsOpen, setIsSecretsOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-5xl h-[85vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans"
        >
          {/* Vercel / Cloudflare Header Status Bar */}
          <div className="px-6 py-4 bg-zinc-900/80 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-extrabold text-white tracking-tight">AI Workspace</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Operational</span>
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  Unified AI Infrastructure • 12 Connected Services • Realtime Monitoring Enabled
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSecretsOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold font-mono transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-purple-400" />
                <span>Secrets</span>
              </button>

              <button
                onClick={() => setIsLogsOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold font-mono transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Logs</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="px-6 border-b border-white/10 flex items-center space-x-1 bg-zinc-950/60 overflow-x-auto shrink-0 font-mono text-xs">
            {[
              { id: 'providers', label: 'AI Providers', icon: Cpu },
              { id: 'media', label: 'Media Gen', icon: Volume2 },
              { id: 'research', label: 'Research Engine', icon: Search },
              { id: 'automation', label: 'Automation', icon: Workflow },
              { id: 'deployment', label: 'Deployment', icon: Cloud },
              { id: 'storage', label: 'Storage', icon: HardDrive },
              { id: 'monitoring', label: 'Monitoring', icon: Activity },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 border-b-2 flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-white font-bold bg-purple-500/10'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Module Content Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* SECTION 1: AI PROVIDERS */}
            {activeTab === 'providers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                    Core AI Models & Inference Providers
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Active Provider: {activeModel}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'NVIDIA Nemotron', model: 'Nemotron-3 70B', latency: '42ms', health: '99.9%', status: 'Connected', desc: 'Accelerated LLM inference engine for rapid persona simulations.' },
                    { name: 'OpenAI Platform', model: 'GPT-4o Omnimodal', latency: '120ms', health: '100%', status: 'Connected', desc: 'Complex reasoning, script restructuring, and audience sentiment.' },
                    { name: 'Anthropic Claude', model: 'Claude 3.5 Sonnet', latency: '85ms', health: '99.9%', status: 'Connected', desc: 'Deep textual evaluation and long-form transcript breakdown.' },
                    { name: 'Google Gemini AI', model: 'Gemini 1.5 Pro', latency: '65ms', health: '100%', status: 'Connected', desc: 'Multimodal video intelligence & frame-by-frame visual analysis.' },
                    { name: 'Groq LPU Acceleration', model: 'Llama 3 70B (800 t/s)', latency: '18ms', health: '100%', status: 'Connected', desc: 'Ultra-low latency token generation for 60 FPS live chats.' },
                    { name: 'OpenRouter Unified API', model: 'Multi-Model Mesh', latency: '55ms', health: '99.8%', status: 'Connected', desc: 'Automatic failover and dynamic model routing.' },
                  ].map((prov) => (
                    <div key={prov.name} className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                            <span>{prov.name}</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </h4>
                          <span className="text-[10px] font-mono text-purple-300">{prov.model}</span>
                        </div>
                        <button
                          onClick={() => setActiveModel(prov.model)}
                          className={`px-3 py-1 rounded-xl text-[10px] font-bold font-mono border transition-all cursor-pointer ${
                            activeModel === prov.model
                              ? 'bg-purple-600 text-white border-purple-500'
                              : 'bg-zinc-800 text-zinc-300 border-white/10 hover:bg-zinc-700'
                          }`}
                        >
                          {activeModel === prov.model ? 'Active' : 'Switch Model'}
                        </button>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{prov.desc}</p>

                      <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-white/5 text-zinc-500">
                        <span>Latency: <strong className="text-emerald-400">{prov.latency}</strong></span>
                        <span>Uptime: <strong className="text-white">{prov.health}</strong></span>
                        <button
                          onClick={() =>
                            setSelectedProvider({
                              name: prov.name,
                              model: prov.model,
                              endpoint: `https://api.${prov.name.toLowerCase().replace(/\s+/g, '')}.ai/v1`,
                              contextWindow: '128K Tokens',
                              temperature: '0.7',
                              maxTokens: '4096',
                              streaming: true,
                              retryPolicy: 'Exponential Backoff (3x)',
                              timeout: '30s',
                              fallback: 'OpenRouter Unified API',
                              health: prov.health,
                              latency: prov.latency,
                              recentRequests: 1420,
                            })
                          }
                          className="text-purple-400 hover:text-purple-300 font-bold underline cursor-pointer"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 2: MEDIA GENERATION */}
            {activeTab === 'media' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                  Audio & Visual Generation Infrastructure
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ElevenLabs */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-5 h-5 text-purple-400" />
                        <div>
                          <h4 className="text-sm font-bold text-white">ElevenLabs Voice Synthesis</h4>
                          <span className="text-[10px] font-mono text-emerald-400">Status: Operational</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Generating lifelike neural voiceovers for script hooks and simulated video audio previews.
                    </p>

                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlayingAudio ? 'Pause Voice Synthesis' : 'Preview ElevenLabs Voice'}</span>
                    </button>
                  </div>

                  {/* fal.ai */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="w-5 h-5 text-blue-400" />
                        <div>
                          <h4 className="text-sm font-bold text-white">fal.ai Generative Media Engine</h4>
                          <span className="text-[10px] font-mono text-emerald-400">Status: Operational</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Real-time FLUX image generation and video thumbnail previews for social media feeds.
                    </p>

                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono">
                      <span>Model: <strong className="text-white">FLUX.1 [schnell]</strong></span>
                      <span className="text-emerald-400">Generation Speed: 0.4s</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: RESEARCH ENGINE */}
            {activeTab === 'research' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                  Deep Web Scraping & Trend Intelligence
                </h3>

                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-amber-400" />
                      <div>
                        <h4 className="text-sm font-bold text-white">Firecrawl Web Crawler</h4>
                        <span className="text-[10px] font-mono text-emerald-400">Operational</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 font-mono text-center">
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Indexed Pages</span>
                      <span className="text-base font-extrabold text-amber-300">14,280</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Crawler Speed</span>
                      <span className="text-base font-extrabold text-emerald-300">180ms</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Success Rate</span>
                      <span className="text-base font-extrabold text-purple-300">99.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: AUTOMATION */}
            {activeTab === 'automation' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                  Workflow Orchestration & Webhooks
                </h3>

                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Workflow className="w-5 h-5 text-rose-400" />
                      <div>
                        <h4 className="text-sm font-bold text-white">n8n Pipeline Integration</h4>
                        <span className="text-[10px] font-mono text-emerald-400">Webhook Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 font-mono text-center">
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Active Workflows</span>
                      <span className="text-base font-extrabold text-rose-300">8</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Daily Executions</span>
                      <span className="text-base font-extrabold text-white">1,420</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Queue Status</span>
                      <span className="text-base font-extrabold text-emerald-400">Empty (0)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: DEPLOYMENT */}
            {activeTab === 'deployment' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                  Cloud Infrastructure & Edge Hosting
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Render Cloud Host</h4>
                      <span className="text-[10px] font-mono text-emerald-400">Production</span>
                    </div>
                    <p className="text-xs text-zinc-400">Primary cloud app instance hosting Node API routes.</p>
                    <div className="text-[10px] font-mono text-zinc-500">Uptime: <strong className="text-emerald-400">99.99%</strong></div>
                  </div>

                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Vercel Edge Network</h4>
                      <span className="text-[10px] font-mono text-emerald-400">Global CDN</span>
                    </div>
                    <p className="text-xs text-zinc-400">Next.js Turbopack frontend edge deployment.</p>
                    <div className="text-[10px] font-mono text-zinc-500">Build Status: <strong className="text-emerald-400">Success</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 6: STORAGE */}
            {activeTab === 'storage' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                  Simulation Storage & Database
                </h3>

                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4 font-mono">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Projects Saved</span>
                      <span className="text-base font-extrabold text-white">24</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Export History</span>
                      <span className="text-base font-extrabold text-purple-300">18.4 MB</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                      <span className="text-[9px] text-zinc-400 block">Available Space</span>
                      <span className="text-base font-extrabold text-emerald-400">98.2 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 7: MONITORING */}
            {activeTab === 'monitoring' && (
              <div className="space-y-4 font-mono">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Realtime Telemetry & Health Monitoring
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
                    <span className="text-[9px] text-zinc-400 block uppercase">CPU Load</span>
                    <span className="text-2xl font-extrabold text-emerald-400">12%</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
                    <span className="text-[9px] text-zinc-400 block uppercase">Memory Used</span>
                    <span className="text-2xl font-extrabold text-white">1.2 GB</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
                    <span className="text-[9px] text-zinc-400 block uppercase">Avg Latency</span>
                    <span className="text-2xl font-extrabold text-purple-300">142ms</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
                    <span className="text-[9px] text-zinc-400 block uppercase">API Requests</span>
                    <span className="text-2xl font-extrabold text-blue-400">420 / min</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 py-4 bg-zinc-900/80 border-t border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
            <span className="text-zinc-500">System Clock: {new Date().toLocaleTimeString()}</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all cursor-pointer"
            >
              Close Infrastructure Dashboard
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slide-over Provider Details Drawer */}
      <ProviderDetailsDrawer
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />

      {/* Secrets & API Key Management Drawer */}
      <SecretsDrawer
        isOpen={isSecretsOpen}
        onClose={() => setIsSecretsOpen(false)}
      />

      {/* Realtime System Logs Viewer Modal */}
      <LiveSystemLogsModal
        isOpen={isLogsOpen}
        onClose={() => setIsLogsOpen(false)}
      />
    </AnimatePresence>
  );
}
