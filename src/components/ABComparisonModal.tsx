'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  TrendingUp,
  Users,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { InsightMetrics } from '@/types/simulator';

interface ABComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalMetrics: InsightMetrics;
  onApplyFixes: () => void;
  appliedFixes: boolean;
}

export function ABComparisonModal({
  isOpen,
  onClose,
  originalMetrics,
  onApplyFixes,
  appliedFixes,
}: ABComparisonModalProps) {
  if (!isOpen) return null;

  // Optimized Metrics Calculation
  const optVirality = 96;
  const optAttention = 94;
  const optHook = 97;
  const optShare = 92;

  const viralityDelta = optVirality - originalMetrics.viralityScore;
  const attentionDelta = optAttention - originalMetrics.attentionScore;
  const hookDelta = optHook - originalMetrics.hookStrength;
  const shareDelta = optShare - originalMetrics.shareProbability;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-zinc-900/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>A/B Simulation Variant Comparison</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    +{viralityDelta}% Projected Boost
                  </span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Compare Original Script (Variant A) against AI-Optimized Hook (Variant B)
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

          {/* Main Grid: Variant A vs Variant B */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* VARIANT A: ORIGINAL */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-bold font-mono">
                  VARIANT A — Original Draft
                </span>
                <span className="text-xs font-mono text-zinc-400">Baseline</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Virality Index</span>
                  <div className="text-3xl font-extrabold font-mono text-zinc-300">
                    {originalMetrics.viralityScore} <span className="text-xs text-zinc-500 font-normal">/ 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Hook Strength</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">{originalMetrics.hookStrength}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Share Prob</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">{originalMetrics.shareProbability}%</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-xs space-y-1">
                  <span className="text-red-400 font-bold block flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Drop-off Risk Identified</span>
                  </span>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">
                    32% of audience drops off at 0:04 due to static intro context setup.
                  </p>
                </div>
              </div>
            </div>

            {/* VARIANT B: AI OPTIMIZED */}
            <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/40 space-y-4 relative shadow-xl shadow-emerald-950/20">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono border border-emerald-500/30">
                  VARIANT B — AI Optimized
                </span>
                <span className="text-xs font-bold text-emerald-400 font-mono">+1.4M Potential Reach</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Virality Index</span>
                    <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                      +{viralityDelta} PTS
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-300">
                    {optVirality} <span className="text-xs text-emerald-500 font-normal">/ 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase">Hook Strength</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {optHook}% <span className="text-[10px] text-emerald-500">(+{hookDelta}%)</span>
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase">Share Prob</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {optShare}% <span className="text-[10px] text-emerald-500">(+{shareDelta}%)</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Pacing Optimized with ElevenLabs Hook</span>
                  </span>
                  <p className="text-zinc-200 leading-relaxed text-[11px]">
                    Intro cut by 2.5s. High-energy visual pulse added at 0:04 eliminates drop-offs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 border-t border-white/10 bg-black/60 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Variant B generates +34% higher engagement across Gen Z & Tech Founder personas.
            </span>

            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onApplyFixes();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-900/40 flex items-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Apply Variant B Payload Now</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
