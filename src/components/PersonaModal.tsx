'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Zap, Sparkles, Activity, Heart, Share2 } from 'lucide-react';
import { NetworkNode } from '@/types/simulator';

interface PersonaModalProps {
  node: NetworkNode | null;
  onClose: () => void;
}

export function PersonaModal({ node, onClose }: PersonaModalProps) {
  if (!node) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl p-6 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={node.avatarUrl}
                  alt={node.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/40 shadow-lg"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-1.5">
                  <span>{node.name}</span>
                  {node.badge === 'Verified' && (
                    <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                  )}
                </h3>
                <span className="text-xs font-mono text-purple-300 block">{node.role}</span>
                <span className="text-[10px] text-zinc-400 font-mono">Cluster: {node.cluster}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scores Grid */}
          <div className="grid grid-cols-3 gap-2 font-mono">
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 text-center space-y-0.5">
              <span className="text-[9px] text-zinc-400 uppercase block">Influence</span>
              <span className="text-base font-extrabold text-purple-300">94 / 100</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 text-center space-y-0.5">
              <span className="text-[9px] text-zinc-400 uppercase block">Trust Score</span>
              <span className="text-base font-extrabold text-blue-300">88 / 100</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 text-center space-y-0.5">
              <span className="text-[9px] text-zinc-400 uppercase block">Activity</span>
              <span className="text-base font-extrabold text-emerald-300">High</span>
            </div>
          </div>

          {/* Detailed AI Behavioral Reasoning */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-300 font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Behavioral Reasoning</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              "{node.name} reacted positively because the visual intro graph triggered high curiosity. As a {node.role}, they value data transparency and are 3.4x more likely to amplify this post across their network."
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close Breakdown
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
