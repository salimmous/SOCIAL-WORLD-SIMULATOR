'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Zap, TrendingUp, Download, Settings, Sparkles, Command, X, Globe } from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunSimulation: () => void;
  onApplyFixes: () => void;
  onOpenABModal: () => void;
  onOpenReportModal: () => void;
  onOpenExportModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenSponsorsModal: () => void;
  onExplainPage?: () => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onRunSimulation,
  onApplyFixes,
  onOpenABModal,
  onOpenReportModal,
  onOpenExportModal,
  onOpenSettingsModal,
  onOpenSponsorsModal,
  onExplainPage,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'explain-page',
      title: 'Explain This Page (Interactive Coach Spotlight)',
      category: 'Learning Mode',
      icon: Sparkles,
      action: () => {
        if (onExplainPage) onExplainPage();
        onClose();
      },
    },
    {
      id: 'run-sim',
      title: 'Run AI Simulation Engine',
      category: 'Simulation',
      icon: Play,
      action: () => {
        onRunSimulation();
        onClose();
      },
    },
    {
      id: 'apply-fix',
      title: '1-Click Auto Rewrite Script',
      category: 'Optimization Lab',
      icon: Zap,
      action: () => {
        onApplyFixes();
        onClose();
      },
    },
    {
      id: 'ab-compare',
      title: 'Open A/B Variant Comparison',
      category: 'Optimization Lab',
      icon: TrendingUp,
      action: () => {
        onOpenABModal();
        onClose();
      },
    },
    {
      id: 'export-suite',
      title: 'Export Simulation Suite (PDF, JSON, Link)',
      category: 'Executive Reports',
      icon: Download,
      action: () => {
        onOpenExportModal();
        onClose();
      },
    },
    {
      id: 'engine-settings',
      title: 'Open AI Engine Settings',
      category: 'Settings',
      icon: Settings,
      action: () => {
        onOpenSettingsModal();
        onClose();
      },
    },
    {
      id: 'sponsors-hub',
      title: 'Open Hackathon AI Sponsors Hub',
      category: 'Sponsors',
      icon: Sparkles,
      action: () => {
        onOpenSponsorsModal();
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="w-full max-w-xl bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Search Header Input */}
          <div className="p-4 border-b border-white/10 flex items-center space-x-3">
            <Search className="w-5 h-5 text-purple-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search actions (e.g. 'run', 'export', 'fix')..."
              className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-zinc-500 font-sans"
            />
            <div className="flex items-center space-x-1.5 px-2 py-1 rounded-lg bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-400 shrink-0">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filtered Action List */}
          <div className="p-2 max-h-80 overflow-y-auto space-y-1">
            {filteredActions.length === 0 ? (
              <div className="p-6 text-center text-xs text-zinc-500 italic">
                No matching commands found.
              </div>
            ) : (
              filteredActions.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full p-3 rounded-2xl hover:bg-white/5 text-left flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                      Jump to →
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
