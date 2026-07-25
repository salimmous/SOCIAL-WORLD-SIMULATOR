'use client';

import React from 'react';
import { Globe, Share2, Download, User, RotateCcw, Sparkles, History, Plus } from 'lucide-react';
import { PRESET_SCENARIOS } from '@/data/presets';
import { PresetScenario } from '@/types/simulator';

interface HeaderProps {
  currentPreset: PresetScenario;
  onSelectPreset: (preset: PresetScenario) => void;
  onReset: () => void;
  onApplyFixes: () => void;
  appliedFixes: boolean;
  onOpenHistory: () => void;
  historyCount: number;
  onNewProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPreset,
  onSelectPreset,
  onReset,
  onApplyFixes,
  appliedFixes,
  onOpenHistory,
  historyCount,
  onNewProject,
}) => {
  return (
    <header className="h-14 px-6 flex items-center justify-between z-30 border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-xl">
      {/* Left: Logo & Live Status */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
          <Globe className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <span className="font-bold tracking-tight text-white text-sm">
            SOCIAL WORLD SIMULATOR
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-zinc-400 font-medium">
              Live Simulation Environment
            </span>
          </div>
        </div>
      </div>

      {/* Center: Preset Selector */}
      <div className="hidden md:flex items-center space-x-2">
        <span className="text-xs text-zinc-400 font-medium mr-1">Preset:</span>
        {PRESET_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === currentPreset.id;
          return (
            <button
              key={scenario.id}
              onClick={() => onSelectPreset(scenario)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md font-semibold'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-white/[0.04]'
              }`}
            >
              {scenario.title}
            </button>
          );
        })}
      </div>

      {/* Right: Actions (New Project, History, Fixes, Share, Export) */}
      <div className="flex items-center space-x-2">
        {/* NEW PROJECT BUTTON */}
        <button
          onClick={onNewProject}
          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-purple-600/20"
          title="Start Clean Simulation"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>

        {/* HISTORY DRAWER BUTTON */}
        <button
          onClick={onOpenHistory}
          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer relative"
          title="View Project History"
        >
          <History className="w-3.5 h-3.5 text-purple-400" />
          <span>History</span>
          {historyCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold border border-purple-500/30">
              {historyCount}
            </span>
          )}
        </button>

        {appliedFixes ? (
          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            Fixes Active
          </span>
        ) : (
          <button
            onClick={onApplyFixes}
            className="px-3 py-1 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-medium border border-purple-500/30 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Apply Fixes</span>
          </button>
        )}

        <button
          onClick={onReset}
          className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06] transition-all cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.06] text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer"
          title="Share Simulation"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.06] text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer"
          title="Export Insights"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          <User className="w-4 h-4 text-purple-300" />
        </div>
      </div>
    </header>
  );
};
