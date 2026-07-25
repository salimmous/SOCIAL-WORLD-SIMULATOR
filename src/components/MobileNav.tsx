'use client';

import React from 'react';
import {
  Globe,
  Sliders,
  BarChart3,
  Sparkles,
  Zap,
  Volume2,
} from 'lucide-react';

export type MobileTab = 'canvas' | 'setup' | 'insights';

interface MobileNavProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  onOpenSponsors: () => void;
  viralityScore: number;
}

export function MobileNav({
  activeTab,
  onChangeTab,
  onOpenSponsors,
  viralityScore,
}: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-white/10 backdrop-blur-xl px-2 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => onChangeTab('setup')}
        className={`flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
          activeTab === 'setup'
            ? 'text-purple-400 bg-purple-500/10 font-bold'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Sliders className="w-4 h-4" />
        <span className="text-[10px] font-mono">Script & Input</span>
      </button>

      <button
        onClick={() => onChangeTab('canvas')}
        className={`flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
          activeTab === 'canvas'
            ? 'text-purple-400 bg-purple-500/10 font-bold'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="text-[10px] font-mono">2D Canvas</span>
      </button>

      <button
        onClick={() => onChangeTab('insights')}
        className={`flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer relative ${
          activeTab === 'insights'
            ? 'text-purple-400 bg-purple-500/10 font-bold'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <BarChart3 className="w-4 h-4" />
        <span className="text-[10px] font-mono">AI Critique</span>
        <span className="absolute -top-1 right-2 px-1 py-0.2 rounded-full bg-purple-500 text-white text-[8px] font-bold font-mono">
          {viralityScore}
        </span>
      </button>

      <button
        onClick={onOpenSponsors}
        className="flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 font-bold transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span className="text-[10px] font-mono">Sponsors</span>
      </button>
    </div>
  );
}
