'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  MessageSquare,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Share2,
  Eye,
  Radio,
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
  const [activeTab, setActiveTab] = useState<'scores' | 'retention' | 'comments' | 'recommendations'>('scores');

  const handleApplyFix = () => {
    onApplyFixes();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 75) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="w-[380px] xl:w-[420px] shrink-0 border-l border-white/10 glass-panel flex flex-col h-[calc(100vh-4rem)] z-20">
      {/* Top Tab Selector with Clear Icons */}
      <div className="flex border-b border-white/10 p-2 bg-zinc-950/40">
        <button
          onClick={() => setActiveTab('scores')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'scores'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span>Scores</span>
        </button>
        <button
          onClick={() => setActiveTab('retention')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'retention'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Retention</span>
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'comments'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-pink-400" />
          <span>Comments</span>
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'recommendations'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Fixes</span>
        </button>
      </div>

      {/* Main Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === 'scores' && (
          <>
            {/* Virality Score Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/50 via-zinc-950 to-purple-950/40 border border-indigo-500/40 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-28 h-28 text-indigo-400" />
              </div>

              <div className="flex items-center justify-center space-x-1.5 mb-1">
                <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                  Predicted Virality Index
                </span>
              </div>

              {/* Score Value Display */}
              <div className="relative inline-flex items-center justify-center my-2">
                <span className="text-6xl font-extrabold tracking-tight text-white font-mono drop-shadow-lg">
                  {metrics.viralityScore}
                </span>
                <span className="text-xl font-bold text-indigo-400 ml-1">/100</span>
              </div>

              <p className="text-xs text-zinc-300 font-medium max-w-[280px] mx-auto mt-1 leading-snug">
                {appliedFixes
                  ? '🚀 High viral cascade probability. Algorithm feed boost unlocked.'
                  : '⚠️ Strong baseline, but 0:08 retention dip lowers tier 1 viral boost.'}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Estimated Reach:</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {metrics.estimatedReach}
                </span>
              </div>
            </div>

            {/* Score Grid Cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Hook Strength', score: metrics.hookStrength, icon: Zap, color: 'text-amber-400' },
                { label: 'Attention Score', score: metrics.attentionScore, icon: Flame, color: 'text-red-400' },
                { label: 'Share Probability', score: metrics.shareProbability, icon: Share2, color: 'text-indigo-400' },
                { label: 'Audience Fit', score: metrics.audienceFit, icon: Award, color: 'text-purple-400' },
                { label: 'Brand Safety', score: metrics.brandSafety, icon: ShieldCheck, color: 'text-emerald-400' },
                { label: 'Algo Confidence', score: metrics.algorithmConfidence, icon: TrendingUp, color: 'text-cyan-400' },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2 hover:border-indigo-500/30 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="text-[11px] font-medium leading-none">
                        {item.label}
                      </span>
                      <div className="p-1 rounded-lg bg-zinc-900 border border-white/5">
                        <IconComponent className={`w-3.5 h-3.5 ${item.color}`} />
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white font-mono">
                        {item.score}%
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${getScoreColor(
                          item.score
                        )}`}
                      >
                        {item.score >= 90 ? 'OPTIMAL' : item.score >= 75 ? 'GOOD' : 'NEEDS FIX'}
                      </span>
                    </div>
                  </div>
                );
              })}
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

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Recommendation Engine</span>
              </span>
              {appliedFixes ? (
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fixes Applied</span>
                </span>
              ) : (
                <button
                  onClick={handleApplyFix}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Apply All Fixes</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    rec.applied
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-zinc-950/80 border-white/10 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {rec.title}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        Impact: {rec.metricBoost}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                        rec.impact === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {rec.impact}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-snug">
                    {rec.description}
                  </p>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5 text-[11px] font-mono">
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

      {/* Bottom Action Button */}
      <div className="p-4 border-t border-white/10 bg-zinc-950/80">
        <button
          onClick={handleApplyFix}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 border border-indigo-400/30 text-xs font-bold transition-all flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>{appliedFixes ? 'Re-Run Optimization Pass' : 'Apply AI Recommendations & Re-Simulate'}</span>
        </button>
      </div>
    </div>
  );
};
