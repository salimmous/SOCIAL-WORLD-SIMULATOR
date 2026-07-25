'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, ChevronRight, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AICopilotWidgetProps {
  currentTime: number;
  duration: number;
  onApplyFixes: () => void;
  appliedFixes: boolean;
}

const COPILOT_OBSERVATIONS = [
  { time: 2, text: 'Strong initial visual hook detected. 94% retention across Gen Z creators.', type: 'positive' },
  { time: 5, text: 'Pacing slows at 0:04. 28% of enterprise personas drop off here.', type: 'warning' },
  { time: 10, text: 'Algorithm confidence surging to 92%. Viral amplification starting.', type: 'positive' },
  { time: 18, text: 'Debate starting in comments. High engagement ratio detected.', type: 'positive' },
  { time: 30, text: 'Reach expanding 3.4x across influencer networks.', type: 'positive' },
];

export function AICopilotWidget({
  currentTime,
  duration,
  onApplyFixes,
  appliedFixes,
}: AICopilotWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentNote, setCurrentNote] = useState(COPILOT_OBSERVATIONS[0].text);

  useEffect(() => {
    const obs = COPILOT_OBSERVATIONS.filter((o) => o.time <= currentTime).slice(-1)[0];
    if (obs) {
      setCurrentNote(obs.text);
    }
  }, [currentTime]);

  const isComplete = currentTime >= duration;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40 max-w-sm"
    >
      <div className="p-4 rounded-3xl bg-zinc-950/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl space-y-3 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block leading-none">
                AI Copilot Live Engine
              </span>
              <span className="text-[9px] text-emerald-400 font-mono">
                {isComplete ? '● Simulation Complete' : '● Watching Live Network'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isMinimized && (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-zinc-200 leading-relaxed font-sans font-medium">
              {isComplete
                ? 'Simulation Complete. Your strongest opportunity is improving the first 8 seconds.'
                : `"${currentNote}"`}
            </p>

            {!appliedFixes ? (
              <button
                onClick={onApplyFixes}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>1-Click Auto Rewrite Script</span>
              </button>
            ) : (
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold flex items-center justify-center space-x-1 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AI Rewrites Applied to Simulation</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
