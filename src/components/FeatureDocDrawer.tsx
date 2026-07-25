'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, Zap, HelpCircle, X, Code, ExternalLink } from 'lucide-react';

export interface FeatureDocData {
  title: string;
  category: string;
  summary: string;
  whyItExists: string;
  howItWorks: string;
  bestPractices: string[];
  examples: string[];
  shortcuts?: string[];
}

interface FeatureDocDrawerProps {
  doc: FeatureDocData | null;
  onClose: () => void;
}

export function FeatureDocDrawer({ doc, onClose }: FeatureDocDrawerProps) {
  if (!doc) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md font-sans text-[#F7F6F1]">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-[#111111] border-l border-white/10 h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{doc.title}</h3>
                  <span className="text-[10px] font-mono text-[#DEDBC8] uppercase tracking-wider block">
                    {doc.category} Documentation
                  </span>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-1.5 text-xs text-zinc-300 leading-relaxed font-sans">
              <span className="text-[10px] text-[#DEDBC8] font-mono font-bold uppercase tracking-wider block">
                Overview
              </span>
              <p>{doc.summary}</p>
            </div>

            {/* Why It Exists */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Why This Exists</span>
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed bg-black/50 p-3 rounded-xl border border-white/5 font-sans">
                {doc.whyItExists}
              </p>
            </div>

            {/* How It Works Under The Hood */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                <Code className="w-3.5 h-3.5 text-[#DEDBC8]" />
                <span>How It Works Under The Hood</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed bg-[#181818] p-3 rounded-xl border border-white/10 font-mono text-[11px]">
                {doc.howItWorks}
              </p>
            </div>

            {/* Best Practices */}
            <div className="space-y-2 font-sans">
              <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Best Practices & Pro Tips</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {doc.bestPractices.map((bp, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-[#181818] p-2 rounded-xl border border-white/5">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold transition-all cursor-pointer shadow-lg active:scale-95 text-center"
          >
            Close Documentation
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
