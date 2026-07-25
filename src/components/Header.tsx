'use client';

import React, { useState } from 'react';
import {
  Globe,
  Share2,
  Download,
  User,
  RotateCcw,
  Sparkles,
  History,
  Plus,
  Check,
  ChevronDown,
  Cpu,
  HelpCircle,
  Smartphone,
} from 'lucide-react';
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
  onOpenAuthModal: () => void;
  onOpenSponsors: () => void;
  onOpenSettings?: () => void;
  onOpenExport?: () => void;
  onOpenHelp?: () => void;
  onOpenAtlas?: () => void;
  onOpenFeedMockup?: () => void;
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
  onOpenAuthModal,
  onOpenSponsors,
  onOpenSettings,
  onOpenExport,
  onOpenHelp,
  onOpenAtlas,
  onOpenFeedMockup,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showPresetDropdown, setShowPresetDropdown] = useState<boolean>(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleExport = () => {
    const report = {
      title: currentPreset.title,
      timestamp: new Date().toISOString(),
      platform: currentPreset.platform,
      baselineMetrics: currentPreset.baselineMetrics,
      presetDescription: currentPreset.description,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `social_world_insights_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-14 px-4 sm:px-6 flex items-center justify-between z-30 border-b border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-xl shrink-0 text-[#F7F6F1]">
      {/* Left: Logo & Live Status */}
      <div className="flex items-center space-x-3 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-[#DEDBC8]/10 p-0.5 border border-[#DEDBC8]/30 shadow-[0_0_15px_rgba(222,219,200,0.12)] overflow-hidden flex items-center justify-center">
          <img src="/logo.png" alt="Social World Simulator" className="w-full h-full object-contain" />
        </div>
        <div className="hidden sm:block">
          <span className="font-bold tracking-tight text-[#F7F6F1] text-xs lg:text-sm flex items-center space-x-1.5">
            <span>SOCIAL WORLD SIMULATOR</span>
            <span className="px-1.5 py-0.2 rounded-md bg-[#DEDBC8]/10 text-[#DEDBC8] text-[9px] font-mono font-bold border border-[#DEDBC8]/25">
              PRO AI OS
            </span>
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-zinc-400 font-mono">
              Live Network Environment • 60 FPS Engine
            </span>
          </div>
        </div>
      </div>

      {/* Center: Sleek Compact Preset Selector Dropdown */}
      <div className="relative mx-2" data-tour="preset-selector">
        <button
          onClick={() => setShowPresetDropdown(!showPresetDropdown)}
          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-[#F7F6F1] border border-white/10 text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
        >
          <span className="text-zinc-500 font-mono text-[10px] uppercase">Preset:</span>
          <span className="truncate max-w-[140px] sm:max-w-[200px]">{currentPreset.title}</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        </button>

        {showPresetDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 p-1.5 rounded-2xl bg-[#111111] border border-[#DEDBC8]/20 shadow-2xl z-50 space-y-1 backdrop-blur-2xl">
            <span className="text-[9px] font-bold text-zinc-500 px-2 py-1 block uppercase font-mono">
              Simulation Presets
            </span>
            {PRESET_SCENARIOS.map((scenario) => {
              const isActive = scenario.id === currentPreset.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    onSelectPreset(scenario);
                    setShowPresetDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#DEDBC8]/15 text-[#DEDBC8] font-bold border border-[#DEDBC8]/30'
                      : 'text-zinc-400 hover:text-white hover:bg-[#181818]'
                  }`}
                >
                  <span className="truncate">{scenario.title}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#DEDBC8] shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right: Actions (New Project, History, Fixes, Share, Export, Account) */}
      <div className="flex items-center space-x-2 shrink-0">
        {onOpenFeedMockup && (
          <button
            onClick={onOpenFeedMockup}
            className="px-3 py-1.5 rounded-xl bg-[#DEDBC8]/15 hover:bg-[#DEDBC8]/25 text-[#DEDBC8] border border-[#DEDBC8]/30 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 shadow-sm"
            title="Preview Live Feed Mockup on TikTok, X, Reels, and LinkedIn"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span className="hidden sm:inline">Live Feed Preview</span>
          </button>
        )}

        {onOpenAtlas && (
          <button
            onClick={onOpenAtlas}
            className="px-3 py-1.5 rounded-xl bg-[#DEDBC8]/10 hover:bg-[#DEDBC8]/20 text-[#DEDBC8] border border-[#DEDBC8]/25 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 shadow-sm"
            title="Open Atlas Official AI Product Guide & Senior Mentor"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DEDBC8] animate-pulse" />
            <span>Ask Atlas</span>
          </button>
        )}

        <button
          onClick={onOpenSponsors}
          data-tour="ai-workspace-button"
          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-[#DEDBC8] border border-[#DEDBC8]/20 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
          title="AI Workspace Infrastructure & Health Dashboard"
        >
          <Cpu className="w-3.5 h-3.5 text-[#DEDBC8] animate-pulse" />
          <span className="hidden sm:inline">AI Workspace</span>
        </button>

        {onOpenHelp && (
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-xl bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-white border border-white/10 text-xs transition-all cursor-pointer shrink-0"
            title="Open Help Center & Interactive Documentation"
          >
            <HelpCircle className="w-4 h-4 text-[#DEDBC8]" />
          </button>
        )}

        <button
          onClick={onNewProject}
          className="px-3.5 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-[0_0_15px_rgba(222,219,200,0.18)] active:scale-95 shrink-0"
          title="Start Clean Simulation"
        >
          <Plus className="w-3.5 h-3.5 text-black stroke-[3]" />
          <span className="hidden sm:inline">New Project</span>
        </button>

        <button
          onClick={onOpenHistory}
          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer relative shrink-0"
          title="View Project History"
        >
          <History className="w-3.5 h-3.5 text-[#DEDBC8]" />
          <span className="hidden sm:inline">History</span>
          {historyCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#DEDBC8]/15 text-[#DEDBC8] text-[9px] font-mono font-bold border border-[#DEDBC8]/30">
              {historyCount}
            </span>
          )}
        </button>

        {appliedFixes ? (
          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shrink-0">
            Fixes Active
          </span>
        ) : (
          <button
            onClick={onApplyFixes}
            className="px-3 py-1.5 rounded-xl bg-[#DEDBC8]/10 hover:bg-[#DEDBC8]/20 text-[#DEDBC8] text-xs font-medium border border-[#DEDBC8]/25 transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span className="hidden md:inline">Apply Fixes</span>
          </button>
        )}

        <button
          onClick={onReset}
          className="p-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer shrink-0"
          title="Reset Timeline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleShare}
          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 relative"
          title="Share Simulation"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span className="hidden lg:inline">{copied ? 'Copied!' : 'Share'}</span>
        </button>

        <button
          onClick={onOpenExport || handleExport}
          data-tour="export-button"
          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
          title="Export Insights Report"
          aria-label="Export Insights Report"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Export</span>
        </button>

        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer shrink-0"
            title="Open Settings"
            aria-label="Open Engine Settings"
          >
            <span className="text-xs">⚙️</span>
          </button>
        )}

        {/* PROFILE / ACCOUNT / SOCIAL CONNECTIONS BUTTON */}
        <button
          onClick={onOpenAuthModal}
          className="w-8 h-8 rounded-full bg-[#DEDBC8] text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_12px_rgba(222,219,200,0.25)] shrink-0 cursor-pointer transition-all hover:scale-105"
          title="Account Settings & Social OAuth Connections"
        >
          SM
        </button>
      </div>
    </header>
  );
};
