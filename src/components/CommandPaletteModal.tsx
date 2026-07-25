'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  Search,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Sliders,
  Globe,
  FileText,
  HelpCircle,
  Settings,
  Key,
  Database,
  Terminal,
  X,
  Smartphone,
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunSimulation: () => void;
  onReset: () => void;
  onApplyFixes: () => void;
  onOpenReportModal: () => void;
  onOpenHelpCenter: () => void;
  onOpenSettings: () => void;
  onOpenSecrets: () => void;
  onOpenSystemLogs: () => void;
  onOpenAIWorkspace: () => void;
  onOpenFeedMockup?: () => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onRunSimulation,
  onReset,
  onApplyFixes,
  onOpenReportModal,
  onOpenHelpCenter,
  onOpenSettings,
  onOpenSecrets,
  onOpenSystemLogs,
  onOpenAIWorkspace,
  onOpenFeedMockup,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const actions = [
    {
      id: 'run-sim',
      title: 'Run Simulation Engine',
      category: 'Actions',
      icon: Play,
      action: () => {
        onRunSimulation();
        onClose();
      },
    },
    {
      id: 'apply-fixes',
      title: 'Apply 1-Click AI Rewrites',
      category: 'Actions',
      icon: Zap,
      action: () => {
        onApplyFixes();
        onClose();
      },
    },
    {
      id: 'reset-sim',
      title: 'Reset Timeline to 0:00',
      category: 'Controls',
      icon: RotateCcw,
      action: () => {
        onReset();
        onClose();
      },
    },
    {
      id: 'feed-mockup',
      title: 'Open Live Social Feed Mockup Simulator (TikTok, X, Reels, LinkedIn)',
      category: 'Visualizer',
      icon: Smartphone,
      action: () => {
        if (onOpenFeedMockup) onOpenFeedMockup();
        onClose();
      },
    },
    {
      id: 'export-report',
      title: 'Open Pre-Flight Audit Report PDF',
      category: 'Exporter',
      icon: FileText,
      action: () => {
        onOpenReportModal();
        onClose();
      },
    },
    {
      id: 'ai-workspace',
      title: 'Open AI Infrastructure Telemetry Workspace',
      category: 'System',
      icon: Database,
      action: () => {
        onOpenAIWorkspace();
        onClose();
      },
    },
    {
      id: 'secrets',
      title: 'Open Encrypted API Secrets Manager',
      category: 'Security',
      icon: Key,
      action: () => {
        onOpenSecrets();
        onClose();
      },
    },
    {
      id: 'system-logs',
      title: 'Stream Realtime Infrastructure Audit Logs',
      category: 'Developer',
      icon: Terminal,
      action: () => {
        onOpenSystemLogs();
        onClose();
      },
    },
    {
      id: 'help-center',
      title: 'Open Help Center & Product Tour',
      category: 'Documentation',
      icon: HelpCircle,
      action: () => {
        onOpenHelpCenter();
        onClose();
      },
    },
    {
      id: 'settings',
      title: 'Engine Preferences & Model Switcher',
      category: 'Settings',
      icon: Settings,
      action: () => {
        onOpenSettings();
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="w-full max-w-xl bg-[#111111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Search Header Input */}
          <div className="p-4 border-b border-white/10 flex items-center space-x-3">
            <div className="w-6 h-6 rounded-lg bg-[#DEDBC8]/15 p-0.5 border border-[#DEDBC8]/30 overflow-hidden flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search actions (e.g. 'run', 'export', 'fix')..."
              className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-zinc-500 font-sans"
            />
            <div className="flex items-center space-x-1.5 px-2 py-1 rounded-lg bg-[#181818] border border-white/10 text-[10px] font-mono text-zinc-400 shrink-0">
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
                      <div className="w-8 h-8 rounded-xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8] group-hover:scale-105 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#DEDBC8] transition-colors">
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
