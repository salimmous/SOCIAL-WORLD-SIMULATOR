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
  Users,
  Settings,
  BookOpen,
  LogOut,
  Sliders,
  PlaySquare,
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
  onOpenAIWorkspace: () => void;
  onOpenSettings?: () => void;
  onOpenExport?: () => void;
  onOpenHelp?: () => void;
  onOpenAtlas?: () => void;
  onOpenFeedMockup?: () => void;
  onOpenPersonas?: () => void;
  onLogout?: () => void;
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
  onOpenAIWorkspace,
  onOpenSettings,
  onOpenExport,
  onOpenHelp,
  onOpenAtlas,
  onOpenFeedMockup,
  onOpenPersonas,
  onLogout,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showPresetDropdown, setShowPresetDropdown] = useState<boolean>(false);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

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
    <header className="h-14 px-4 sm:px-6 flex items-center justify-between z-30 border-b border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-xl shrink-0 text-[#F7F6F1]">
      {/* Left: Brand Logo & Authenticated Navigation Bar */}
      <div className="flex items-center space-x-6 shrink-0">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-xl bg-[#DEDBC8]/10 p-0.5 border border-[#DEDBC8]/30 shadow-[0_0_15px_rgba(222,219,200,0.12)] overflow-hidden flex items-center justify-center">
            <img src="/logo.png" alt="Social World Simulator" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold tracking-tight text-[#F7F6F1] text-xs lg:text-sm hidden sm:inline-flex items-center space-x-1.5">
            <span>SOCIAL WORLD</span>
            <span className="px-1.5 py-0.2 rounded-md bg-[#DEDBC8]/15 text-[#DEDBC8] text-[9px] font-mono font-bold border border-[#DEDBC8]/30">
              ENTERPRISE OS
            </span>
          </span>
        </div>

        {/* AUTHENTICATED NAVIGATION LINKS (Platform, Personas, Simulations, AI Workspace, Documentation, Settings) */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs text-zinc-400 border-l border-white/10 pl-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1.5 text-[#DEDBC8] font-bold"
          >
            <PlaySquare className="w-3.5 h-3.5" />
            <span>Platform</span>
          </button>

          <button
            onClick={onOpenPersonas || onOpenAuthModal}
            className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1.5"
          >
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>Personas</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1.5 relative"
          >
            <History className="w-3.5 h-3.5 text-zinc-400" />
            <span>Simulations</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#DEDBC8]/15 text-[#DEDBC8] text-[9px] font-mono font-bold border border-[#DEDBC8]/30">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAIWorkspace}
            className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span>AI Workspace</span>
          </button>

          <button
            onClick={onOpenHelp || onOpenAtlas}
            className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Documentation</span>
          </button>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-zinc-400" />
              <span>Settings</span>
            </button>
          )}
        </nav>
      </div>

      {/* Center: Preset Selector Dropdown */}
      <div className="relative mx-2" data-tour="preset-selector">
        <button
          onClick={() => setShowPresetDropdown(!showPresetDropdown)}
          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-[#F7F6F1] border border-white/10 text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
        >
          <span className="text-zinc-500 font-mono text-[10px] uppercase">Preset:</span>
          <span className="truncate max-w-[130px] sm:max-w-[180px]">{currentPreset.title}</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        </button>

        {showPresetDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 p-1.5 rounded-2xl bg-[#111111] border border-[#DEDBC8]/20 shadow-2xl z-50 space-y-1 backdrop-blur-2xl">
            <span className="text-[9px] font-bold text-zinc-500 px-2 py-1 block uppercase font-mono">
              Simulation Scenarios
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

      {/* Right: Studio Actions & Authenticated Account Menu */}
      <div className="flex items-center space-x-2 shrink-0">
        {onOpenFeedMockup && (
          <button
            onClick={onOpenFeedMockup}
            className="px-3 py-1.5 rounded-xl bg-[#DEDBC8]/15 hover:bg-[#DEDBC8]/25 text-[#DEDBC8] border border-[#DEDBC8]/30 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 shadow-sm"
            title="Preview Live Feed Mockup on TikTok, X, Reels, and LinkedIn"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span className="hidden sm:inline">Live Feed</span>
          </button>
        )}

        <button
          onClick={onNewProject}
          className="px-3 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-[0_0_15px_rgba(222,219,200,0.18)] active:scale-95 shrink-0"
          title="Start Clean Simulation"
        >
          <Plus className="w-3.5 h-3.5 text-black stroke-[3]" />
          <span className="hidden sm:inline">New Project</span>
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
          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
          title="Export Insights Report"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Export</span>
        </button>

        {/* AUTHENTICATED PROFILE & LOGOUT DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="w-8 h-8 rounded-full bg-[#DEDBC8] text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_12px_rgba(222,219,200,0.25)] shrink-0 cursor-pointer transition-all hover:scale-105"
            title="User Account & Session Controls"
          >
            SM
          </button>

          {showUserDropdown && (
            <div className="absolute top-full right-0 mt-2 w-64 p-3 rounded-2xl bg-[#111111] border border-[#DEDBC8]/30 shadow-2xl z-50 space-y-3 backdrop-blur-2xl font-sans text-xs">
              <div className="pb-2 border-b border-white/10 space-y-0.5">
                <span className="font-extrabold text-white block">Salim Moussaoui</span>
                <span className="text-[11px] text-zinc-400 font-mono block">salim@enterprise.ai</span>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[9px] font-mono font-bold border border-emerald-500/30">
                  Enterprise Workspace • Active
                </span>
              </div>

              <div className="space-y-1 font-mono text-[11px]">
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    if (onOpenAuthModal) onOpenAuthModal();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5 text-[#DEDBC8]" />
                  <span>Account & Social OAuth</span>
                </button>

                {onOpenSettings && (
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenSettings();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center space-x-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#DEDBC8]" />
                    <span>Workspace Settings</span>
                  </button>
                )}
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
