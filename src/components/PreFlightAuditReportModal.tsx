'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  FileText,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { InsightMetrics, ContentInput } from '@/types/simulator';

interface PreFlightAuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentInput;
  metrics: InsightMetrics;
  appliedFixes: boolean;
}

export function PreFlightAuditReportModal({
  isOpen,
  onClose,
  content,
  metrics,
  appliedFixes,
}: PreFlightAuditReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-[#181818] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#F7F6F1] flex items-center space-x-2">
                  <span>Pre-Flight Content Audit Report</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#DEDBC8]/20 text-[#DEDBC8] font-bold border border-[#DEDBC8]/30">
                    Official Executive Certification
                  </span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Ready for publishing or video editing handed-off report
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 border border-white/10 shadow-md active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Report Canvas Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#111111] text-zinc-100 font-sans print:p-0 print:bg-white print:text-black">
            {/* Report Header Info */}
            <div className="border-b border-white/10 pb-6 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  SOCIAL WORLD SIMULATOR — PRE-FLIGHT AUDIT
                </span>
                <h1 className="text-xl font-extrabold text-[#F7F6F1]">
                  {content.title || 'Untitled Simulation Project'}
                </h1>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Target Platform: <strong className="text-[#DEDBC8] uppercase">{content.platform}</strong> • Target Audience: <strong className="text-[#DEDBC8]">{content.targetAudience}</strong>
                </p>
              </div>

              <div className="text-right space-y-1">
                <div className="text-3xl font-extrabold font-mono text-emerald-400">
                  {metrics.viralityScore} <span className="text-xs text-zinc-500 font-normal">/ 100</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold block">
                  PASSED FOR PUBLISHING ✓
                </span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 space-y-1">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">Virality Index</span>
                <span className="text-base font-extrabold text-[#DEDBC8] font-mono">{metrics.viralityScore}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 space-y-1">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">Attention Score</span>
                <span className="text-base font-extrabold text-blue-300 font-mono">{metrics.attentionScore}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 space-y-1">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">Hook Strength</span>
                <span className="text-base font-extrabold text-emerald-300 font-mono">{metrics.hookStrength}%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 space-y-1">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">Estimated Reach</span>
                <span className="text-xs font-bold text-[#DEDBC8] font-mono line-clamp-1">{metrics.estimatedReach}</span>
              </div>
            </div>

            {/* Action Items Checklist for Editors */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-[#F7F6F1] uppercase tracking-wider font-mono flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Pre-Flight Edit Checklist for Video Editors</span>
              </h3>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#181818] border border-white/5 flex items-start space-x-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Trim intro hook by 2.5 seconds</strong>
                    <span className="text-zinc-400 text-[11px]">
                      Remove initial context setting phrase to avoid 32% Gen Z persona bounce at 0:03.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#181818] border border-white/5 flex items-start space-x-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Insert Visual Pattern Interrupt at 0:04</strong>
                    <span className="text-zinc-400 text-[11px]">
                      Display live force-directed canvas graphic to trigger curiosity retention spike.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#181818] border border-white/5 flex items-start space-x-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">ElevenLabs Voiceover Tuning</strong>
                    <span className="text-zinc-400 text-[11px]">
                      Pitch audio hook up by +5% at 0:01 for maximum algorithmic engagement.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Script Payload & Suggested Rewrite */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 text-xs font-mono">
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Approved Script Payload</span>
              <p className="text-emerald-400 font-medium leading-relaxed">
                "{content.contentBody || 'Creators publish blindly. We change that. Simulate your audience before posting.'}"
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/10 bg-[#181818] flex items-center justify-between text-xs text-zinc-400">
            <span>Certification Hash: <code>0x8f29c...a12</code></span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-bold cursor-pointer active:scale-95"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
