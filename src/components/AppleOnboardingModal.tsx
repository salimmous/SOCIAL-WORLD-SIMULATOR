'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  X,
  Play,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  FileText,
  Key,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AppleOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemo?: () => void;
  onOpenReportModal?: () => void;
}

interface TourStep {
  step: number;
  title: string;
  tagline: string;
  description: string;
  learnMore: string;
  icon: React.ElementType;
  elementSelector?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: 'Content Ingestion & Whisper Transcripts',
    tagline: 'Upload & Parse Payload',
    description:
      'Upload raw video, paste social media URLs, or type script hooks. Powered by NVIDIA Llama 3.3 70B and OpenAI Whisper.',
    learnMore:
      'Multimodal frame analysis parses hook arousal index, visual pacing, and speech sentiment into vector tokens.',
    icon: Sliders,
  },
  {
    step: 2,
    title: '60 FPS Social Canvas Physics',
    tagline: '200+ Autonomous AI Personas',
    description:
      'Watch 200+ synthetic personas orbit your content node in real time, shifting from Idle to Engaged as viral signal heatwaves propagate.',
    learnMore:
      'Calculates orbital velocity, gravitational attraction vectors, and network propagation mechanics across 2D Canvas.',
    icon: Globe,
  },
  {
    step: 3,
    title: 'Attention & Retention Micro-Timeline',
    tagline: 'Pinpoint Exact Drop-Off Seconds',
    description:
      'Inspect frame-by-frame retention curves. Scrub to any second on the timeline to diagnose why viewers bounce.',
    learnMore:
      'Calculates audience fatigue, hook decay rate, and visual pattern interrupts across a 60-second window.',
    icon: Sparkles,
  },
  {
    step: 4,
    title: 'Strict AI Critique & 1-Click Rewrites',
    tagline: 'Optimization Lab Engine',
    description:
      'Receive strict AI critique with before-and-after rewrite suggestions. Click 1-Click Auto Rewrite to apply instant script fixes.',
    learnMore:
      'NVIDIA Nemotron 70B evaluates weak retention points and generates optimized hooks tailored to your platform.',
    icon: Zap,
  },
];

export function AppleOnboardingModal({
  isOpen,
  onClose,
  onRunDemo,
  onOpenReportModal,
}: AppleOnboardingModalProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [mode, setMode] = useState<'welcome' | 'tour' | 'complete'>('welcome');
  const [showLearnMore, setShowLearnMore] = useState(false);

  if (!isOpen) return null;

  const handleStartTour = () => {
    setMode('tour');
    setCurrentStepIdx(0);
  };

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
      setShowLearnMore(false);
    } else {
      setMode('complete');
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
      setShowLearnMore(false);
    }
  };

  const handleFinish = () => {
    onClose();
  };

  const handleRunDemo = () => {
    onClose();
    if (onRunDemo) onRunDemo();
  };

  const ActiveStepIcon = TOUR_STEPS[currentStepIdx].icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl font-sans text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="w-full max-w-xl bg-[#111111] border border-[#DEDBC8]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-zinc-100"
        >
          {/* Ambient Warm Lighting */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#DEDBC8]/10 rounded-full blur-3xl pointer-events-none" />

          {/* MODE 1: WELCOME CARD */}
          {mode === 'welcome' && (
            <div className="space-y-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#DEDBC8]/15 p-1 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8] shadow-xl overflow-hidden">
                  <img src="/logo.png" alt="Social World Simulator" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#F7F6F1] tracking-tight">
                    Social World Simulator
                  </h2>
                  <span className="text-xs font-mono text-[#DEDBC8] font-bold block mt-0.5">
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
                  className="w-full py-3.5 rounded-2xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(222,219,200,0.22)] transition-all cursor-pointer active:scale-95 flex items-center justify-center space-x-2 border border-white/20"
                >
                  <span>Start Guided Product Tour</span>
                  <ChevronRight className="w-4 h-4 text-black" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleRunDemo}
                    className="py-2.5 rounded-xl bg-[#DEDBC8]/15 hover:bg-[#DEDBC8]/25 text-[#DEDBC8] border border-[#DEDBC8]/30 text-xs font-bold transition-all cursor-pointer"
                  >
                    Try Demo Project
                  </button>
                  <button
                    onClick={handleFinish}
                    className="py-2.5 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
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
                <span className="text-[10px] font-mono font-bold text-[#DEDBC8] uppercase tracking-widest">
                  STEP {TOUR_STEPS[currentStepIdx].step} OF {TOUR_STEPS.length} — {TOUR_STEPS[currentStepIdx].tagline}
                </span>
                <button onClick={handleFinish} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step Card */}
              <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8] shadow-lg">
                  <ActiveStepIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#F7F6F1]">
                    {TOUR_STEPS[currentStepIdx].title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1 font-sans">
                    {TOUR_STEPS[currentStepIdx].description}
                  </p>

                  {/* Expandable Learn More Section */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => setShowLearnMore(!showLearnMore)}
                      className="text-[11px] font-mono text-[#DEDBC8] hover:text-[#ECE8D9] font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{showLearnMore ? 'Hide Deep Dive' : 'Learn More (Specs & API Details)'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showLearnMore ? 'rotate-90' : ''}`} />
                    </button>

                    {showLearnMore && (
                      <p className="text-xs font-mono text-[#DEDBC8] leading-relaxed mt-2 p-3 rounded-xl bg-[#DEDBC8]/10 border border-[#DEDBC8]/20">
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
                  className="px-4 py-2 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 disabled:opacity-30 cursor-pointer flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="flex space-x-1.5">
                  {TOUR_STEPS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentStepIdx ? 'w-5 bg-[#DEDBC8]' : 'w-1.5 bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold transition-all shadow-lg cursor-pointer flex items-center space-x-1 active:scale-95"
                >
                  <span>{currentStepIdx === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4 text-black" />
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
                <h2 className="text-2xl font-extrabold text-[#F7F6F1]">You're Ready.</h2>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans max-w-md mx-auto">
                  You now know how to simulate the internet before publishing content online.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleRunDemo}
                  className="w-full py-3.5 rounded-2xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(222,219,200,0.22)] transition-all cursor-pointer flex items-center justify-center space-x-2 border border-white/20"
                >
                  <Play className="w-4 h-4 fill-black text-black" />
                  <span>Run Demo Simulation Project</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 transition-all cursor-pointer"
                >
                  Open Empty Workspace Studio
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
