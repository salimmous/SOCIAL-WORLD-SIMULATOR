'use client';

import React from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  Globe,
  ShieldCheck,
  Share2,
  Briefcase,
  Video,
  Pause,
} from 'lucide-react';
import { PRESET_SCENARIOS } from '@/data/presets';
import { PresetScenario } from '@/types/simulator';

interface HeaderProps {
  currentPreset: PresetScenario;
  onSelectPreset: (preset: PresetScenario) => void;
  isRunning: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onApplyFixes: () => void;
  appliedFixes: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPreset,
  onSelectPreset,
  isRunning,
  onTogglePlay,
  onReset,
  onApplyFixes,
  appliedFixes,
}) => {
  const getPresetIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Share2 className="w-3 h-3 text-cyan-400" />;
      case 'linkedin':
        return <Briefcase className="w-3 h-3 text-blue-400" />;
      case 'tiktok':
        return <Video className="w-3 h-3 text-pink-400" />;
      default:
        return <Sparkles className="w-3 h-3 text-indigo-400" />;
    }
  };

  return (
    <header className="h-16 border-b border-white/10 glass-panel px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Brand & Category */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
            <Globe className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-white text-base">
                SOCIAL WORLD SIMULATOR
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                v1.0 MVP
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">
              Pre-Publish AI Audience Reaction Engine
            </p>
          </div>
        </div>

        <div className="h-6 w-px bg-white/10 hidden md:block" />

        {/* Preset Selector Bar */}
        <div className="hidden lg:flex items-center space-x-2">
          <span className="text-xs text-zinc-400 font-bold mr-1 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Presets:</span>
          </span>
          {PRESET_SCENARIOS.map((scenario) => {
            const isActive = scenario.id === currentPreset.id;
            return (
              <button
                key={scenario.id}
                onClick={() => onSelectPreset(scenario)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                    : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-white/5'
                }`}
              >
                {getPresetIcon(scenario.platform)}
                <span className="truncate max-w-[130px]">{scenario.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-3">
        {appliedFixes ? (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-1.5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI Fixes Active (+18% Retention)</span>
          </div>
        ) : (
          <button
            onClick={onApplyFixes}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-1.5 border border-emerald-400/30 active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200" />
            <span>Apply AI Fixes</span>
          </button>
        )}

        <button
          onClick={onReset}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all active:scale-95"
          title="Reset Simulation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onTogglePlay}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-lg active:scale-95 cursor-pointer ${
            isRunning
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-amber-500/10'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 border border-indigo-400/30'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isRunning ? 'Pause Simulation' : 'Run Simulation'}</span>
        </button>
      </div>
    </header>
  );
};
