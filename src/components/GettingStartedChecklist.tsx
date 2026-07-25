'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, ChevronDown, ChevronUp, X, Sparkles } from 'lucide-react';

interface GettingStartedChecklistProps {
  hasRunSim: boolean;
  hasAppliedFix: boolean;
  onOpenTour: () => void;
}

export function GettingStartedChecklist({
  hasRunSim,
  hasAppliedFix,
  onOpenTour,
}: GettingStartedChecklistProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const tasks = [
    { id: 'tour', label: 'Complete Product Tour', done: true },
    { id: 'upload', label: 'Upload Content / Script', done: true },
    { id: 'extract', label: 'Run AI Extraction', done: true },
    { id: 'sim', label: 'Launch Simulation Engine', done: hasRunSim },
    { id: 'rewrite', label: 'Apply 1-Click Auto Rewrite', done: hasAppliedFix },
    { id: 'export', label: 'Export Executive PDF Audit', done: hasAppliedFix },
  ];

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-40 max-w-xs font-sans text-[#F7F6F1]"
    >
      <div className="p-4 rounded-3xl bg-[#111111]/95 border border-[#DEDBC8]/30 backdrop-blur-2xl shadow-2xl space-y-3 relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block leading-none">Getting Started</span>
              <span className="text-[9px] text-[#DEDBC8] font-mono">{progressPct}% Complete</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#DEDBC8] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {!isMinimized && (
          <div className="space-y-1.5 pt-1 text-xs font-mono">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-2">
                {task.done ? (
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                )}
                <span className={task.done ? 'text-zinc-300 line-through opacity-70' : 'text-zinc-200'}>
                  {task.label}
                </span>
              </div>
            ))}

            <button
              onClick={onOpenTour}
              className="w-full mt-2 pt-2 border-t border-white/5 text-[10px] text-[#DEDBC8] hover:text-[#ECE8D9] font-bold flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#DEDBC8]" />
              <span>Replay Product Tour</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
