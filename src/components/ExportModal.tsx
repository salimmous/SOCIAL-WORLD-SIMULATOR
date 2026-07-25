'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Code, Image as ImageIcon, Link as LinkIcon, Check, X } from 'lucide-react';
import { ContentInput } from '@/types/simulator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentInput;
  simData: any;
}

export function ExportModal({ isOpen, onClose, content, simData }: ExportModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ content, simData }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `social-world-simulation-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                <Download className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Export Simulation Suite</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-zinc-400">
            Export your simulation results, AI critique, and audience reaction data in standard formats.
          </p>

          {/* Export Options Matrix */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadPDF}
              className="p-4 rounded-2xl bg-[#181818] border border-white/10 hover:border-[#DEDBC8]/40 text-left space-y-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <FileText className="w-5 h-5 text-[#DEDBC8]" />
              <div>
                <h4 className="text-xs font-bold text-white">Executive PDF Report</h4>
                <span className="text-[10px] text-zinc-500 block">Printable audit layout</span>
              </div>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="p-4 rounded-2xl bg-[#181818] border border-white/10 hover:border-emerald-500/40 text-left space-y-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Code className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Raw JSON Payload</h4>
                <span className="text-[10px] text-zinc-500 block">Node graph & metrics</span>
              </div>
            </button>
          </div>

          {/* Share Link Input */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 truncate">
              <LinkIcon className="w-4 h-4 text-[#DEDBC8] shrink-0" />
              <span className="text-xs font-mono text-zinc-300 truncate">
                {typeof window !== 'undefined' ? window.location.href : 'https://socialworld.ai'}
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold shrink-0 transition-all cursor-pointer flex items-center space-x-1 active:scale-95"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
