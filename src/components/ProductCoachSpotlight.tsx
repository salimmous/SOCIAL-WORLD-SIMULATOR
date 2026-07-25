'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CoachStep {
  targetSelector: string;
  featureName: string;
  whatItDoes: string;
  whyImportant: string;
  howItWorks: string;
}

const COACH_STEPS: CoachStep[] = [
  {
    targetSelector: '[data-tour="preset-dropdown"]',
    featureName: 'Preset Scenario Switcher',
    whatItDoes: 'Selects pre-configured viral video templates, B2B SaaS launch scripts, or controversial tech hot-takes.',
    whyImportant: 'Accelerates testing by populating realistic script payloads and platform algorithms in 1 click.',
    howItWorks: 'Swaps simulation payload tokens and target audience persona bias curves.',
  },
  {
    targetSelector: '[data-tour="upload-dropzone"]',
    featureName: 'Content Intelligence Dropzone',
    whatItDoes: 'Ingests raw MP4 videos, images, social URLs, or script text.',
    whyImportant: 'Pre-publish simulation requires a precise mathematical understanding of your hook, pacing, and visual style.',
    howItWorks: 'Passes content into NVIDIA Llama 3.3 70B visual frame analyzer & Whisper speech-to-text.',
  },
  {
    targetSelector: '[data-tour="canvas-graph"]',
    featureName: '60 FPS 2D Physics Canvas',
    whatItDoes: 'Renders 200+ autonomous AI persona entities orbiting a central content node in a force-directed graph.',
    whyImportant: 'Visualizes viral signal heatwaves, cohort clusters, and real-time network propagation.',
    howItWorks: 'Calculates orbital velocity, gravitational pull, and persona state transitions in 60 FPS HTML5 Canvas.',
  },
  {
    targetSelector: '[data-tour="timeline-scrubber"]',
    featureName: 'Attention & Retention Timeline',
    whatItDoes: 'Plots simulated audience retention percentage across a 60-second window.',
    whyImportant: 'Identifies micro-drop-off moments down to the exact second.',
    howItWorks: 'Aggregates frame-by-frame attention signals from all 200+ active personas.',
  },
  {
    targetSelector: '[data-tour="optimization-lab"]',
    featureName: 'Strict AI Critique & Optimization Lab',
    whatItDoes: 'Generates 1-click script rewrites targeting weak retention points.',
    whyImportant: 'Raw critique is useless without immediate actionable solutions.',
    howItWorks: 'Passes current retention dips into NVIDIA Nemotron LLM to propose optimized hooks.',
  },
];

interface ProductCoachSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemo?: () => void;
}

export function ProductCoachSpotlight({
  isOpen,
  onClose,
  onRunDemo,
}: ProductCoachSpotlightProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = COACH_STEPS[stepIdx];

  // Measure bounding rectangle of current target element
  useEffect(() => {
    if (!isOpen || !currentStep) return;

    const updateRect = () => {
      const el = document.querySelector(currentStep.targetSelector);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [isOpen, stepIdx, currentStep]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (stepIdx < COACH_STEPS.length - 1) {
      setStepIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      setStepIdx((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    onClose();
  };

  const handleRunDemo = () => {
    onClose();
    if (onRunDemo) onRunDemo();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none text-[#F7F6F1]">
        {/* Darkened Semi-Transparent Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto"
          onClick={handleFinish}
        />

        {/* Highlight Ring Anchor over Target Element */}
        {targetRect && !isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              top: targetRect.top - 6,
              left: targetRect.left - 6,
              width: targetRect.width + 12,
              height: targetRect.height + 12,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute rounded-2xl ring-4 ring-[#DEDBC8] ring-offset-2 ring-offset-black bg-[#DEDBC8]/10 pointer-events-auto cursor-pointer shadow-[0_0_30px_rgba(222,219,200,0.6)]"
            title="Click highlighted component to test interaction"
          />
        )}

        {/* Floating Coach Bubble */}
        {!isCompleted && currentStep && targetRect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              top: Math.min(window.innerHeight - 340, Math.max(20, targetRect.bottom + 16)),
              left: Math.min(window.innerWidth - 380, Math.max(20, targetRect.left)),
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute w-80 bg-[#111111]/95 border border-[#DEDBC8]/40 rounded-3xl p-5 shadow-2xl space-y-3 pointer-events-auto backdrop-blur-2xl text-zinc-100 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#DEDBC8] uppercase tracking-widest flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-[#DEDBC8]" />
                <span>COACH STEP {stepIdx + 1} OF {COACH_STEPS.length}</span>
              </span>
              <button onClick={handleFinish} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature Content */}
            <div>
              <h4 className="text-sm font-extrabold text-[#F7F6F1]">{currentStep.featureName}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed mt-1 font-sans">{currentStep.whatItDoes}</p>
            </div>

            {/* Details Box */}
            <div className="p-3 rounded-2xl bg-[#181818] border border-white/10 space-y-1.5 font-mono text-[11px]">
              <div>
                <span className="text-[#DEDBC8] font-bold block">Why it matters:</span>
                <span className="text-zinc-300">{currentStep.whyImportant}</span>
              </div>
              <div className="pt-1 border-t border-white/5">
                <span className="text-emerald-400 font-bold block">How it works:</span>
                <span className="text-zinc-400">{currentStep.howItWorks}</span>
              </div>
            </div>

            {/* Interactive Navigation Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handlePrev}
                disabled={stepIdx === 0}
                className="px-3 py-1.5 rounded-xl bg-[#181818] text-zinc-300 text-xs font-bold border border-white/10 disabled:opacity-30 cursor-pointer flex items-center space-x-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                onClick={handleFinish}
                className="text-[11px] font-mono text-zinc-400 hover:text-white cursor-pointer"
              >
                Skip Tour
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold transition-all shadow-lg cursor-pointer flex items-center space-x-1 active:scale-95"
              >
                <span>{stepIdx === COACH_STEPS.length - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Completion Card Modal */}
        {isCompleted && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl pointer-events-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-[#111111] border border-[#DEDBC8]/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#F7F6F1]">Walkthrough Complete!</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  You have inspected every workspace component. You are ready to simulate audience reactions.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleRunDemo}
                  className="w-full py-3 rounded-2xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-xs shadow-xl cursor-pointer flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-black text-black" />
                  <span>Start Demo Simulation Project</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 transition-all cursor-pointer"
                >
                  Close Coach
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
