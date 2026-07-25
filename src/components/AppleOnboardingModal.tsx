'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Upload,
  Sparkles,
  Play,
  User,
  Clock,
  Zap,
  TrendingUp,
  FileText,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AppleOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: '1. Content Intelligence Upload',
    tagline: 'EVERYTHING STARTS HERE',
    description: 'Upload a video, image, script, or social media link. Our AI automatically extracts Whisper transcripts, visual tone, and audience hooks.',
    learnMore: 'Supports MP4, MOV, PNG, JPG, and raw text scripts up to 500MB. The file passes through NVIDIA AI for multimodal parsing and Whisper speech-to-text.',
    icon: Upload,
  },
  {
    step: 2,
    title: '2. Multimodal AI Extraction',
    tagline: 'AUTOMATIC DEEP ANALYSIS',
    description: 'The AI extracts Whisper transcript, hook energy, emotion curves, visual style, and target audience segments automatically.',
    learnMore: 'Processes frame-by-frame visual pacing, detects high-arousal emotional words, and evaluates hook strength against 14,000+ top-performing posts indexed by Firecrawl.',
    icon: Sparkles,
  },
  {
    step: 3,
    title: '3. 60 FPS Social Simulation Canvas',
    tagline: 'THE HEART OF THE PLATFORM',
    description: 'Watch 200+ autonomous AI personas react in real time. Persona nodes drift, connections pulse, and comments stream live.',
    learnMore: 'Powered by HTML5 Canvas 2D orbital physics. Calculates gravitational attraction, velocity vectors, and virality heatwave propagation across 7 community clusters.',
    icon: Globe,
  },
  {
    step: 4,
    title: '4. Persona Node AI Reasoning',
    tagline: 'EXPLICIT BEHAVIORAL REASONING',
    description: 'Click any persona node to view their Influence Score (94/100), Trust Score (88/100), and deep AI explanation of why they engaged or dropped off.',
    learnMore: 'Each persona evaluates your content against their synthetic memory bias (Enthusiastic, Critical, Hater, Creator) and calculates sentiment probability.',
    icon: User,
  },
  {
    step: 5,
    title: '5. Retention & Timeline Scrubber',
    tagline: 'REPLAY EVERY MOMENT',
    description: 'Watch exactly when engagement spiked and retention dropped. Pinpoint the exact second your hook lost traction.',
    learnMore: 'Displays second-by-second retention heatmaps (🔥 High Excitement, ⚠️ Drop-off Risk) synced with audio waveforms.',
    icon: Clock,
  },
  {
    step: 6,
    title: '6. AI Copilot Live Assistant',
    tagline: 'PERSISTENT LIVE ADVISOR',
    description: 'The AI Copilot watches your simulation live and suggests actionable edits (e.g. "Pacing slows at 0:04, remove first 5s").',
    learnMore: 'Continuously monitors simulation metrics and allows conversational Q&A like "Why did Gen Z ignore this script?"',
    icon: Sparkles,
  },
  {
    step: 7,
    title: '7. Optimization Lab & 1-Click Rewrites',
    tagline: 'INSTANT RE-SIMULATION',
    description: 'Trigger 1-click script rewrites for better hooks, CTAs, and captions. A new simulation automatically validates the score boost.',
    learnMore: 'Applies GPT-4o high-retention script structures and re-runs the physics simulation engine instantly to compute delta improvements.',
    icon: Zap,
  },
  {
    step: 8,
    title: '8. Side-by-Side Before vs After',
    tagline: 'MEASURED VIRALITY BOOST',
    description: 'Compare Original Draft (Score 72) vs AI Optimized Version (Score 91) with virality boost deltas.',
    learnMore: 'Side-by-side A/B comparison metrics highlighting Virality Score, Attention Score, Audience Fit, and Brand Safety.',
    icon: TrendingUp,
  },
  {
    step: 9,
    title: '9. Executive Reports & Exporter',
    tagline: 'PDF, JSON, PNG & LINK EXPORTS',
    description: 'Compile McKinsey-style executive reports with risk analysis, opportunity scores, and printable PDF audit sheets.',
    learnMore: 'Generates client-ready executive decks, printable PDF content audit certificates, and raw JSON payloads for API pipelines.',
    icon: FileText,
  },
  {
    step: 10,
    title: '10. AI Workspace Infrastructure',
    tagline: '7 ENTERPRISE INFRASTRUCTURE MODULES',
    description: 'Monitor NVIDIA Nemotron, OpenAI GPT-4o, ElevenLabs, fal.ai, Firecrawl, n8n, Render, and realtime system telemetry.',
    learnMore: 'Unified control panel displaying latency, API throughput, encrypted secrets manager, and live system audit logs.',
    icon: Cpu,
  },
];

export function AppleOnboardingModal({ isOpen, onClose, onStartDemo }: AppleOnboardingModalProps) {
  const [mode, setMode] = useState<'welcome' | 'tour' | 'complete'>('welcome');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [showLearnMore, setShowLearnMore] = useState(false);

  if (!isOpen) return null;

  const handleStartTour = () => {
    setMode('tour');
    setCurrentStepIdx(0);
  };

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      setMode('complete');
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    onClose();
  };

  const handleRunDemo = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    onStartDemo();
    onClose();
  };

  const ActiveStepIcon = TOUR_STEPS[currentStepIdx].icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl font-sans">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="w-full max-w-xl bg-zinc-950 border border-purple-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-zinc-100"
        >
          {/* Ambient Purple Lighting */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* MODE 1: WELCOME CARD */}
          {mode === 'welcome' && (
            <div className="space-y-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-xl">
                  <Globe className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Social World Simulator
                  </h2>
                  <span className="text-xs font-mono text-purple-400 font-bold block mt-0.5">
                    Predict the Internet Before You Publish
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans max-w-md mx-auto">
                Upload your content. Watch AI simulate 200+ autonomous audience reactions across force-directed community graphs. Optimize before going live.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleStartTour}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-xl shadow-purple-900/40 transition-all cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Start Guided Product Tour</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleRunDemo}
                    className="py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all cursor-pointer"
                  >
                    Try Demo Project
                  </button>
                  <button
                    onClick={handleFinish}
                    className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
                  >
                    Skip Onboarding
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                <span>Est. Time: ~45 seconds</span>
                <span>Replay tour anytime via ⌘K menu</span>
              </div>
            </div>
          )}

          {/* MODE 2: GUIDED TOUR STEPS */}
          {mode === 'tour' && (
            <div className="space-y-6">
              {/* Tour Header Bar */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                  STEP {TOUR_STEPS[currentStepIdx].step} OF {TOUR_STEPS.length} — {TOUR_STEPS[currentStepIdx].tagline}
                </span>
                <button onClick={handleFinish} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step Card */}
              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg">
                  <ActiveStepIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {TOUR_STEPS[currentStepIdx].title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1 font-sans">
                    {TOUR_STEPS[currentStepIdx].description}
                  </p>

                  {/* Expandable Learn More Section */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => setShowLearnMore(!showLearnMore)}
                      className="text-[11px] font-mono text-purple-400 hover:text-purple-300 font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{showLearnMore ? 'Hide Deep Dive' : 'Learn More (Specs & API Details)'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showLearnMore ? 'rotate-90' : ''}`} />
                    </button>

                    {showLearnMore && (
                      <p className="text-xs font-mono text-purple-300/90 leading-relaxed mt-2 p-3 rounded-xl bg-purple-950/40 border border-purple-500/20">
                        {TOUR_STEPS[currentStepIdx].learnMore}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls & Progress Dots */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIdx === 0}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 disabled:opacity-30 cursor-pointer flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="flex space-x-1.5">
                  {TOUR_STEPS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentStepIdx ? 'w-5 bg-purple-500' : 'w-1.5 bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 cursor-pointer flex items-center space-x-1"
                >
                  <span>{currentStepIdx === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* MODE 3: CELEBRATION WOW SCREEN */}
          {mode === 'complete' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-white">You're Ready.</h2>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans max-w-md mx-auto">
                  You now know how to simulate the internet before publishing content online.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleRunDemo}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-900/40 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Demo Simulation Project</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 transition-all cursor-pointer"
                >
                  Go to Main Workspace
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
