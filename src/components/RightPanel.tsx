'use client';

import React, { useState } from 'react';
import {
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
  const [activeTab, setActiveTab] = useState<'overview' | 'retention' | 'comments' | 'fixes'>('overview');

  const handleApplyFix = () => {
    onApplyFixes();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="w-[360px] shrink-0 border-l border-white/[0.06] glass-panel rounded-none border-t-0 border-b-0 border-r-0 flex flex-col h-[calc(100vh-3.5rem)] z-20">
      {/* Top Tab Bar */}
      <div className="flex border-b border-white/[0.06] p-2 bg-zinc-950/40">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('retention')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'retention'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Retention
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'comments'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Comments
        </button>
        <button
          onClick={() => setActiveTab('fixes')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'fixes'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Fixes
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Virality Score Hero Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 text-center relative overflow-hidden shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-1">
                Predicted Virality Index
              </span>

              <div className="my-2">
                <span className="text-6xl font-extrabold text-white font-mono tracking-tight">
                  {metrics.viralityScore}
                </span>
                <span className="text-xl font-bold text-purple-400 ml-1">/100</span>
              </div>

              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                {appliedFixes
                  ? '🚀 Optimal viral cascade potential. Algorithm feed boost unlocked.'
                  : '⚠️ Strong baseline, but 0:08 retention dip lowers tier 1 viral boost.'}
              </p>
            </div>

            {/* Core 4 KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-1">
                <span className="text-xs text-zinc-400 block font-medium">
                  Audience Fit
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {metrics.audienceFit}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-1">
                <span className="text-xs text-zinc-400 block font-medium">
                  Attention Score
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {metrics.attentionScore}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-1">
                <span className="text-xs text-zinc-400 block font-medium">
                  Share Rate
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {metrics.shareProbability}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-1">
                <span className="text-xs text-zinc-400 block font-medium">
                  Brand Safety
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {metrics.brandSafety}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Estimated Reach:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {metrics.estimatedReach}
              </span>
            </div>
          </>
        )}

        {activeTab === 'retention' && (
          <RetentionGraph
            timeline={retentionTimeline}
            currentTime={currentTime}
            onSeek={onSeek}
          />
        )}

        {activeTab === 'comments' && (
          <CommentFeed comments={comments} currentTime={currentTime} />
        )}

        {activeTab === 'fixes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300">
                AI Recommendation Engine
              </span>
              {appliedFixes && (
                <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fixes Applied</span>
                </span>
              )}
            </div>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                    rec.applied
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-zinc-950/70 border-white/10'
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

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {rec.description}
                  </p>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1 text-[11px] font-mono">
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
          </div>
        )}
      </div>

      {/* Bottom Fix Trigger */}
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
