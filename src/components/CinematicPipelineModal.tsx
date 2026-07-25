'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck, Cpu, Globe } from 'lucide-react';

interface CinematicPipelineModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const PIPELINE_STEPS = [
  'Extracting video metadata & Whisper audio transcript...',
  'NVIDIA AI analyzing visual tone, emotion & hook strength...',
  'Clustering 200+ persona entities (Tech Founders, Gen Z, Critics)...',
  'Initializing center-orbital gravitational physics canvas...',
  'Waking up social network communities...',
];

export function CinematicPipelineModal({
  isOpen,
  onComplete,
}: CinematicPipelineModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= PIPELINE_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / PIPELINE_STEPS.length) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg p-8 bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-center space-y-6"
        >
          {/* Ambient Glowing Background Orb */}
          <div className="absolute -top-20 -left-20 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="relative mx-auto w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Globe className="w-8 h-8 animate-pulse text-purple-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="space-y-2 relative">
            <h3 className="text-base font-bold text-white tracking-wide">
              Synthesizing Social World Simulation
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              Powered by NVIDIA AI Multimodal Intelligence Engine
            </p>
          </div>

          {/* Step Progress Checklist */}
          <div className="space-y-2.5 text-left bg-black/60 p-4 rounded-2xl border border-white/5 relative">
            {PIPELINE_STEPS.map((step, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={idx} className="flex items-center space-x-3 text-xs">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0" />
                  )}

                  <span
                    className={`font-mono transition-all ${
                      isDone
                        ? 'text-zinc-400 line-through'
                        : isCurrent
                        ? 'text-purple-300 font-bold'
                        : 'text-zinc-600'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 relative">
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-400"
                initial={{ width: '0%' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>Initializing Quantum Physics Loop</span>
              <span>{progressPercent}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
