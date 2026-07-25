'use client';

import React from 'react';
import { Globe, RotateCcw, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { PRESET_SCENARIOS } from '@/data/presets';
import { PresetScenario } from '@/types/simulator';

interface HeaderProps {
  currentPreset: PresetScenario;
  onSelectPreset: (preset: PresetScenario) => void;
  onReset: () => void;
  onApplyFixes: () => void;
  appliedFixes: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPreset,
  onSelectPreset,
  onReset,
  onApplyFixes,
  appliedFixes,
}) => {
  return (
    <header className="h-14 px-6 flex items-center justify-between z-30 border-b border-white/[0.06] bg-zinc-950/60 backdrop-blur-xl">
      {/* Brand & Identity */}
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
          <Globe className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <span className="font-bold tracking-tight text-white text-sm">
            SOCIAL WORLD SIMULATOR
          </span>
          <span className="text-xs text-zinc-400 ml-2 font-medium">
            AI Audience Engine
          </span>
        </div>
      </div>

      {/* Preset Selector Pills */}
      <div className="hidden lg:flex items-center space-x-2">
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

      {/* Auxiliary Controls */}
      <div className="flex items-center space-x-2">
        {appliedFixes ? (
          <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI Fixes Active</span>
          </div>
        ) : (
          <button
            onClick={onApplyFixes}
            className="px-3 py-1 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-medium border border-purple-500/30 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Apply Fixes</span>
          </button>
        )}

        <button
          onClick={onReset}
          className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06] transition-all cursor-pointer"
          title="Reset Simulation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
