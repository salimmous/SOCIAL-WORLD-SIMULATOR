'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  BarChart3,
  Globe,
  Sliders,
  CheckCircle2,
  Share2,
  FileText,
  AlignLeft,
  ChevronRight,
  TrendingUp,
  Flame,
  Volume2,
  Cpu,
} from 'lucide-react';
import { ContentInput, PresetScenario, Recommendation } from '@/types/simulator';
import { GeneratedSimulationData } from '@/services/simulatorEngine';
import { PRESET_SCENARIOS } from '@/data/presets';
import { SocialWorldCanvas } from './SocialWorldCanvas';
import { RetentionGraph } from './RetentionGraph';
import { AudioPacingWaveform } from './AudioPacingWaveform';

interface MobileAppLayoutProps {
  content: ContentInput;
  onChangeContent: (updated: Partial<ContentInput>) => void;
  onRunSimulation: () => void;
  isRunning: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  simData: GeneratedSimulationData;
  currentTime: number;
  duration: number;
  speed: number;
  onChangeSpeed: (s: number) => void;
  onSeek: (t: number) => void;
  appliedFixes: boolean;
  onApplyFixes: () => void;
  onOpenSponsors: () => void;
  onOpenABModal: () => void;
  onOpenReportModal: () => void;
  onSelectPreset: (preset: PresetScenario) => void;
}

export function MobileAppLayout({
  content,
  onChangeContent,
  onRunSimulation,
  isRunning,
  onTogglePlay,
  onReset,
  simData,
  currentTime,
  duration,
  speed,
  onChangeSpeed,
  onSeek,
  appliedFixes,
  onApplyFixes,
  onOpenSponsors,
  onOpenABModal,
  onOpenReportModal,
  onSelectPreset,
}: MobileAppLayoutProps) {
  // Mobile Navigation Screen State: 1 = Upload, 2 = Simulation, 3 = Results
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);
  const [activeResultsCard, setActiveResultsCard] = useState<number>(0);

  const stage: 1 | 2 | 3 | 4 =
    currentTime < 10 ? 1 : currentTime < 25 ? 2 : currentTime < 45 ? 3 : 4;

  const handleStartSimulation = () => {
    onRunSimulation();
    setCurrentScreen(2);
  };

  return (
    <div className="md:hidden flex flex-col h-screen w-screen bg-[#0A0A0A] text-[#F7F6F1] overflow-hidden font-sans selection:bg-[#DEDBC8]/30">
      {/* Native iOS Top Navigation Bar */}
      <div className="h-14 px-4 bg-[#0A0A0A]/90 border-b border-white/10 flex items-center justify-between shrink-0 z-30 backdrop-blur-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#DEDBC8]/20 text-[#DEDBC8] border border-[#DEDBC8]/30 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-wide uppercase">
              SOCIAL WORLD
            </h1>
            <span className="text-[9px] text-zinc-400 font-mono block -mt-0.5">
              Native iOS Simulation Engine
            </span>
          </div>
        </div>

        <button
          onClick={onOpenSponsors}
          className="px-2.5 py-1 rounded-xl bg-[#DEDBC8]/15 hover:bg-[#DEDBC8]/25 border border-[#DEDBC8]/30 text-[#DEDBC8] text-[11px] font-bold flex items-center space-x-1 cursor-pointer"
        >
          <Cpu className="w-3.5 h-3.5 text-[#DEDBC8] animate-pulse" />
          <span>AI Workspace</span>
        </button>
      </div>

      {/* Main Screen Body Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* SCREEN 1: UPLOAD & INPUT */}
        {currentScreen === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 p-5 overflow-y-auto space-y-5 pb-24"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8] font-bold">
                SCREEN 1 OF 3 — UPLOAD & INPUT
              </span>
              <h2 className="text-xl font-extrabold text-[#F7F6F1] tracking-tight">
                Simulate Your Content
              </h2>
              <p className="text-xs text-zinc-400">
                Upload a video, paste a social media post URL, or select a scenario preset.
              </p>
            </div>

            {/* Quick Scenario Presets Chips */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-300 block">Select Scenario Preset</span>
              <div className="grid grid-cols-1 gap-2">
                {PRESET_SCENARIOS.slice(0, 3).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset)}
                    className="p-3 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#DEDBC8]/40 text-left transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{preset.title}</h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-1">{preset.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input Area */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#111111] border border-white/10">
              <div className="space-y-1">
                <span className="text-xs font-bold text-zinc-300 block">Project Title</span>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => onChangeContent({ title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#DEDBC8]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-zinc-300 block">Script / Hook Payload</span>
                <textarea
                  value={content.contentBody}
                  onChange={(e) => onChangeContent({ contentBody: e.target.value })}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#DEDBC8] resize-none leading-relaxed"
                  placeholder="Enter script hook or transcript..."
                />
              </div>
            </div>

            {/* Large 52px Touch CTA Button */}
            <button
              onClick={handleStartSimulation}
              className="w-full h-13 rounded-2xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-sm shadow-[0_0_20px_rgba(222,219,200,0.25)] flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95 border border-white/20"
            >
              <Play className="w-5 h-5 fill-black text-black" />
              <span>START SIMULATION ENGINE</span>
            </button>
          </motion.div>
        )}

        {/* SCREEN 2: FULLSCREEN SIMULATION CANVAS */}
        {currentScreen === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="absolute inset-0 flex flex-col bg-zinc-950 relative"
          >
            {/* 100vh Fullscreen Social Graph */}
            <div className="flex-1 relative w-full h-full">
              <SocialWorldCanvas
                nodes={simData.nodes}
                edges={simData.edges}
                currentTime={currentTime}
                duration={duration}
                isRunning={isRunning}
                onTogglePlay={onTogglePlay}
                onSeek={onSeek}
                speed={speed}
                onChangeSpeed={onChangeSpeed}
                activeComments={simData.comments}
                stage={stage}
              />
            </div>

            {/* Floating Native Playback Control Bar */}
            <div className="absolute bottom-20 left-4 right-4 z-30 p-3 rounded-2xl bg-[#0A0A0A]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between space-x-3">
              <button
                onClick={onTogglePlay}
                className="w-10 h-10 rounded-xl bg-[#DEDBC8] text-black font-bold flex items-center justify-center shrink-0 cursor-pointer"
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-black text-black" />}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>0:{(currentTime || 0).toString().padStart(2, '0')}</span>
                  <span>0:{duration}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#DEDBC8]"
                />
              </div>

              <button
                onClick={onReset}
                className="p-2.5 rounded-xl bg-[#181818] text-zinc-400 hover:text-white border border-white/10 shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: RESULTS & AI CRITIQUE */}
        {currentScreen === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute inset-0 p-5 overflow-y-auto space-y-5 pb-24"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                SCREEN 3 OF 3 — RESULTS & AI CRITIQUE
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Simulation Performance
              </h2>
            </div>

            {/* Virality Score Hero Card */}
            <div className="p-5 rounded-3xl bg-[#111111] border border-[#DEDBC8]/30 text-center space-y-2">
              <span className="text-[10px] font-mono text-[#DEDBC8] uppercase font-bold tracking-wider">
                Predicted Virality Index
              </span>
              <div className="text-5xl font-extrabold font-mono text-white">
                {simData.metrics.viralityScore} <span className="text-base text-[#DEDBC8] font-normal">/ 100</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 inline-block">
                Estimated Reach: {simData.metrics.estimatedReach}
              </span>
            </div>

            {/* Action Buttons: A/B Compare & Pre-Flight Report */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onOpenABModal}
                className="p-3 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 text-[#DEDBC8] text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <TrendingUp className="w-4 h-4" />
                <span>A/B Compare</span>
              </button>
              <button
                onClick={onOpenReportModal}
                className="p-3 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Audit PDF</span>
              </button>
            </div>

            {/* Retention Graph */}
            <div className="p-4 rounded-2xl bg-[#111111] border border-white/10 space-y-2">
              <span className="text-xs font-bold text-white block font-mono">Retention Curve & Drop-offs</span>
              <RetentionGraph
                timeline={simData.retentionTimeline}
                currentTime={currentTime}
                onSeek={onSeek}
              />
            </div>

            {/* Audio Waveform */}
            <AudioPacingWaveform
              scriptText={content.contentBody}
              currentTime={currentTime}
              duration={duration}
            />

            {/* Strict AI Critique List */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#111111] border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono uppercase">Strict AI Critique</span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">Actionable Edits</span>
              </div>

              {simData.recommendations.map((rec: Recommendation) => (
                <div key={rec.id} className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-amber-300">{rec.title}</span>
                    <span className="text-[10px] font-mono text-[#DEDBC8]">{rec.metricBoost}</span>
                  </div>
                  <p className="text-zinc-300 text-[11px]">{rec.description}</p>
                  
                  {!rec.applied ? (
                    <button
                      onClick={onApplyFixes}
                      className="w-full py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>1-Click Auto Rewrite</span>
                    </button>
                  ) : (
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold text-center">
                      AI Rewrite Applied ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Native iOS Bottom 3-Screen Navigation Bar */}
      <div className="h-16 px-6 bg-[#0A0A0A]/95 border-t border-white/10 flex items-center justify-between shrink-0 z-40 backdrop-blur-2xl">
        <button
          onClick={() => setCurrentScreen(1)}
          className={`flex flex-col items-center space-y-1 transition-all cursor-pointer ${
            currentScreen === 1 ? 'text-[#DEDBC8] font-bold scale-105' : 'text-zinc-500'
          }`}
        >
          <Upload className="w-5 h-5" />
          <span className="text-[10px] font-mono">1. Upload</span>
        </button>

        <button
          onClick={() => setCurrentScreen(2)}
          className={`flex flex-col items-center space-y-1 transition-all cursor-pointer ${
            currentScreen === 2 ? 'text-[#DEDBC8] font-bold scale-105' : 'text-zinc-500'
          }`}
        >
          <Globe className="w-5 h-5" />
          <span className="text-[10px] font-mono">2. Simulation</span>
        </button>

        <button
          onClick={() => setCurrentScreen(3)}
          className={`flex flex-col items-center space-y-1 transition-all cursor-pointer relative ${
            currentScreen === 3 ? 'text-[#DEDBC8] font-bold scale-105' : 'text-zinc-500'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-mono">3. Results</span>
          <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-emerald-500 text-black text-[8px] font-bold font-mono">
            {simData.metrics.viralityScore}
          </span>
        </button>
      </div>
    </div>
  );
}
