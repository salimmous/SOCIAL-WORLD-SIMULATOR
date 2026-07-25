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
  HelpCircle,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CoachStep {
  targetId: string; // data-tour value
  featureName: string;
  whatItDoes: string;
  whyImportant: string;
  howItWorks: string;
  example: string;
}

const COACH_STEPS: CoachStep[] = [
  {
    targetId: 'preset-selector',
    featureName: '1. Preset Scenario Selector',
    whatItDoes: 'Switch between pre-configured viral content templates (e.g. AI SaaS pitch, TikTok trend, Tech debate).',
    whyImportant: 'Allows instant benchmarking across different content formats without typing custom scripts.',
    howItWorks: 'Loads pre-calculated baseline metrics, audience profiles, and script samples.',
    example: 'Select "AI Agent Launch" to test B2B creator virality.',
  },
  {
    targetId: 'content-input',
    featureName: '2. Multimodal Content Intelligence Upload',
    whatItDoes: 'Accepts raw video files, audio, images, scripts, or social URLs for automatic AI parsing.',
    whyImportant: 'Extracts Whisper transcripts, visual tone, emotion curves, and hook strength before simulation.',
    howItWorks: 'Passes media through NVIDIA AI multimodal vision and OpenAI Whisper speech-to-text.',
    example: 'Paste your draft script or drop a 30-second TikTok video file.',
  },
  {
    targetId: 'persona-selector',
    featureName: '3. Persona Community Clusters',
    whatItDoes: 'Select which synthetic audience communities (Creators, Influencers, Fans, Haters) will participate.',
    whyImportant: 'Different audiences react with completely different sentiment biases.',
    howItWorks: 'Activates weighted sentiment multipliers across 200+ persona node profiles.',
    example: 'Enable "Tech Founders" and "Critics" to evaluate polarizing topics.',
  },
  {
    targetId: 'run-simulation-btn',
    featureName: '4. Launch Simulation Engine',
    whatItDoes: 'Triggers the 60 FPS HTML5 Canvas orbital physics simulation engine.',
    whyImportant: 'Generates real-time engagement, virality scores, and second-by-second retention heatmaps.',
    howItWorks: 'Simulates gravitational attraction, reach levels, and signal propagation across persona nodes.',
    example: 'Click "Run AI Simulation" to watch 200 personas react live.',
  },
  {
    targetId: 'social-canvas',
    featureName: '5. 60 FPS Social Graph Canvas',
    whatItDoes: 'Interactive living canvas displaying 200+ persona nodes orbiting your content payload.',
    whyImportant: 'Visualizes viral propagation, community clustering, and audience excitement in real time.',
    howItWorks: 'Calculates orbital physics vectors, pulse strength, and node color states at 60 FPS.',
    example: 'Click any drifting node to view their explicit AI behavioral reasoning.',
  },
  {
    targetId: 'timeline-scrubber',
    featureName: '6. Retention & Timeline Scrubber',
    whatItDoes: 'Scrub through every second of content to inspect engagement spikes and drop-offs.',
    whyImportant: 'Pinpoints the exact second audience interest degrades.',
    howItWorks: 'Syncs audio waveforms with second-by-second retention curves (🔥 High Excitement vs ⚠️ Drop-off).',
    example: 'Scrub to second 0:04 to inspect hook drop-off mechanics.',
  },
  {
    targetId: 'copilot-widget',
    featureName: '7. Floating AI Copilot Assistant',
    whatItDoes: 'Persistent conversational AI watching your simulation live.',
    whyImportant: 'Provides real-time commentary and answers questions like "Why did Gen Z ignore this?"',
    howItWorks: 'Evaluates simulation metrics and offers 1-click script rewrites.',
    example: 'Click "Rewrite Hook" for instant 1-click script optimization.',
  },
  {
    targetId: 'optimization-lab',
    featureName: '8. Optimization Lab & 1-Click Rewrites',
    whatItDoes: 'Generates high-retention script alternatives and measures virality boost deltas.',
    whyImportant: 'Ensures every edit is validated through a brand-new simulation run.',
    howItWorks: 'Applies high-retention script patterns and re-computes virality scores.',
    example: 'Original Virality 72 ➔ Optimized Virality 91 (+19% boost).',
  },
  {
    targetId: 'export-button',
    featureName: '9. Executive Reports Exporter',
    whatItDoes: 'Compiles McKinsey-style content audit reports.',
    whyImportant: 'Provides client-ready executive decks and printable PDF audit certificates.',
    howItWorks: 'Formats risk analysis, retention heatmaps, and JSON payloads into downloadable exports.',
    example: 'Export Executive PDF or JSON payload for your marketing team.',
  },
  {
    targetId: 'ai-workspace-button',
    featureName: '10. AI Workspace Infrastructure',
    whatItDoes: 'Displays 7 enterprise infrastructure telemetry modules.',
    whyImportant: 'Provides complete visibility into connected AI models, latency, and system health.',
    howItWorks: 'Monitors NVIDIA, OpenAI, ElevenLabs, fal.ai, Firecrawl, n8n, and Render.',
    example: 'Inspect NVIDIA Nemotron 42ms inference speed and live audit logs.',
  },
];

interface ProductCoachSpotlightProps {
  isActive: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

export function ProductCoachSpotlight({ isActive, onClose, onStartDemo }: ProductCoachSpotlightProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = COACH_STEPS[stepIdx];

  // Locate and scroll to target DOM element
  useEffect(() => {
    if (!isActive || isCompleted || !currentStep) return;

    const updateRect = () => {
      const el = document.querySelector(`[data-tour="${currentStep.targetId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    const interval = setInterval(updateRect, 400);
    window.addEventListener('resize', updateRect);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateRect);
    };
  }, [isActive, stepIdx, currentStep, isCompleted]);

  // Click on target DOM element to advance
  useEffect(() => {
    if (!isActive || isCompleted || !currentStep) return;

    const el = document.querySelector(`[data-tour="${currentStep.targetId}"]`);
    if (!el) return;

    const handleTargetClick = () => {
      if (stepIdx < COACH_STEPS.length - 1) {
        setStepIdx((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    };

    el.addEventListener('click', handleTargetClick);
    return () => el.removeEventListener('click', handleTargetClick);
  }, [isActive, stepIdx, currentStep, isCompleted]);

  if (!isActive) return null;

  const handleNext = () => {
    if (stepIdx < COACH_STEPS.length - 1) {
      setStepIdx(stepIdx + 1);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    }
  };

  const handleFinish = () => {
    setIsCompleted(false);
    setStepIdx(0);
    onClose();
  };

  const handleRunDemo = () => {
    setIsCompleted(false);
    setStepIdx(0);
    onStartDemo();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none font-sans">
        {/* Dark Dim Backdrop with Hole Punch via Masking */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-all duration-300" />

        {/* Highlight Ring around Target Element */}
        {targetRect && !isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              top: targetRect.top - 6,
              left: targetRect.left - 6,
              width: targetRect.width + 12,
              height: targetRect.height + 12,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute rounded-2xl ring-4 ring-purple-500 ring-offset-2 ring-offset-black bg-purple-500/10 pointer-events-auto cursor-pointer shadow-[0_0_30px_rgba(139,92,246,0.6)]"
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
            className="absolute w-80 bg-zinc-950/95 border border-purple-500/40 rounded-3xl p-5 shadow-2xl space-y-3 pointer-events-auto backdrop-blur-2xl text-zinc-100 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>COACH STEP {stepIdx + 1} OF {COACH_STEPS.length}</span>
              </span>
              <button onClick={handleFinish} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature Content */}
            <div>
              <h4 className="text-sm font-extrabold text-white">{currentStep.featureName}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed mt-1 font-sans">{currentStep.whatItDoes}</p>
            </div>

            {/* Details Box */}
            <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1.5 font-mono text-[11px]">
              <div>
                <span className="text-purple-400 font-bold block">Why it matters:</span>
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
                className="px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-bold border border-white/10 disabled:opacity-30 cursor-pointer flex items-center space-x-1"
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
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 cursor-pointer flex items-center space-x-1"
              >
                <span>{stepIdx === COACH_STEPS.length - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
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
              className="w-full max-w-md bg-zinc-950 border border-purple-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">Walkthrough Complete!</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  You have inspected every workspace component. You are ready to simulate audience reactions.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleRunDemo}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Demo Simulation Project</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 cursor-pointer"
                >
                  Return to Workspace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
