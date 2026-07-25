'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import {
  InsightMetrics,
  RetentionPoint,
  Comment,
  Recommendation,
} from '@/types/simulator';
import { RetentionGraph } from './RetentionGraph';
import { CommentFeed } from './CommentFeed';
import confetti from 'canvas-confetti';

interface RightPanelProps {
  metrics: InsightMetrics;
  retentionTimeline: RetentionPoint[];
  comments: Comment[];
  recommendations: Recommendation[];
  currentTime: number;
  onSeek: (time: number) => void;
  onApplyFixes: () => void;
  appliedFixes: boolean;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  metrics,
  retentionTimeline,
  comments,
  recommendations,
  currentTime,
  onSeek,
  onApplyFixes,
  appliedFixes,
}) => {
  // Collapsible Accordion Sections
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    overview: true,
    audience: true,
    insights: true,
    recommendations: true,
    comments: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyFix = () => {
    onApplyFixes();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="w-[360px] shrink-0 border-l border-white/[0.06] glass-panel rounded-none border-t-0 border-b-0 border-r-0 flex flex-col h-[calc(100vh-3.5rem)] z-20 overflow-hidden">
      {/* Scrollable Panel Body with Collapsible Accordions */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* SECTION 1: OVERVIEW */}
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-sm font-bold text-white tracking-wide">
              Overview
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                openSections.overview ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openSections.overview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 border-t border-white/[0.04]"
              >
                <div className="pt-3 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-1">
                    Predicted Virality Index
                  </span>
                  <div className="my-1">
                    <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                      {metrics.viralityScore}
                    </span>
                    <span className="text-lg font-bold text-purple-400 ml-1">/100</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                    {appliedFixes
                      ? '🚀 Optimal viral cascade potential. Algorithm feed boost unlocked.'
                      : '⚠️ Strong baseline, but 0:08 retention dip lowers tier 1 viral boost.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 2: AUDIENCE KPIs */}
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection('audience')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-sm font-bold text-white tracking-wide">
              Audience & Metrics
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                openSections.audience ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openSections.audience && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 border-t border-white/[0.04]"
              >
                <div className="grid grid-cols-2 gap-2.5 pt-3">
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                    <span className="text-xs text-zinc-400 block font-medium">
                      Audience Fit
                    </span>
                    <span className="text-xl font-bold text-white font-mono">
                      {metrics.audienceFit}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                    <span className="text-xs text-zinc-400 block font-medium">
                      Attention Score
                    </span>
                    <span className="text-xl font-bold text-white font-mono">
                      {metrics.attentionScore}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                    <span className="text-xs text-zinc-400 block font-medium">
                      Share Rate
                    </span>
                    <span className="text-xl font-bold text-white font-mono">
                      {metrics.shareProbability}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                    <span className="text-xs text-zinc-400 block font-medium">
                      Brand Safety
                    </span>
                    <span className="text-xl font-bold text-white font-mono">
                      {metrics.brandSafety}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Reach Estimate:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {metrics.estimatedReach}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 3: INSIGHTS & RETENTION */}
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection('insights')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-sm font-bold text-white tracking-wide">
              Insights & Retention Timeline
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                openSections.insights ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openSections.insights && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 border-t border-white/[0.04]"
              >
                <div className="pt-3">
                  <RetentionGraph
                    timeline={retentionTimeline}
                    currentTime={currentTime}
                    onSeek={onSeek}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 4: RECOMMENDATIONS */}
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection('recommendations')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white tracking-wide">
                AI Recommendations
              </span>
              {appliedFixes && (
                <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Applied</span>
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                openSections.recommendations ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openSections.recommendations && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 border-t border-white/[0.04] space-y-3"
              >
                <div className="pt-3 space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                        rec.applied
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-zinc-950/60 border-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-white block">
                          {rec.title}
                        </span>
                        <span className="text-[10px] font-mono text-purple-400 font-bold">
                          {rec.metricBoost}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-snug">
                        {rec.description}
                      </p>

                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 space-y-1 text-[11px] font-mono">
                        <div className="text-red-400 line-through">
                          BEFORE: {rec.beforeAfter.before}
                        </div>
                        <div className="text-emerald-400 font-bold">
                          AFTER: {rec.beforeAfter.after}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 5: COMMENTS */}
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection('comments')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-sm font-bold text-white tracking-wide">
              Live Comment Stream
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                openSections.comments ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openSections.comments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 border-t border-white/[0.04]"
              >
                <div className="pt-3">
                  <CommentFeed comments={comments} currentTime={currentTime} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Sticky Recommendation Trigger */}
      <div className="p-4 border-t border-white/[0.06] bg-zinc-950/60">
        <button
          onClick={handleApplyFix}
          className="w-full py-3.5 rounded-2xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>{appliedFixes ? 'Re-Run Optimization Pass' : 'Apply AI Recommendations'}</span>
        </button>
      </div>
    </div>
  );
};
