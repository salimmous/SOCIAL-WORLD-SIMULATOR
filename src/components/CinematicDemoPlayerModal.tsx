'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Clapperboard,
} from 'lucide-react';

interface CinematicDemoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: (section: string) => void;
}

const SCRIPT_CHAPTERS = [
  {
    id: 'hook',
    timestamp: '0:00 – 0:15',
    title: 'Scene 1: The Hook',
    visualCue: 'Landing page → Logo animation → Dashboard Studio transition',
    voiceover:
      'Every day, millions of creators publish content without knowing how people will react. Social World Simulator changes that. Instead of guessing, our AI predicts audience behavior before content goes live.',
    durationSec: 15,
  },
  {
    id: 'ingestion',
    timestamp: '0:15 – 0:40',
    title: 'Scene 2: Problem & Ingestion',
    visualCue: 'Upload dropzone → NVIDIA 70B & Whisper AI transcript extraction',
    voiceover:
      'Simply upload a video, script, or social media post. Our AI automatically extracts the transcript, detects the hook, analyzes emotions, identifies the target audience, and predicts content performance in seconds.',
    durationSec: 25,
  },
  {
    id: 'simulation',
    timestamp: '0:40 – 1:10',
    title: 'Scene 3: Simulation Engine (Hero)',
    visualCue: '60 FPS Canvas graph → 200+ AI personas orbiting → Live comments & retention drop-offs',
    voiceover:
      'The core innovation is our simulation engine. Instead of showing historical analytics, we generate AI personas that simulate how different communities react. Every interaction, comment, share, or drop in engagement is predicted before publishing.',
    durationSec: 30,
  },
  {
    id: 'optimization',
    timestamp: '1:10 – 1:35',
    title: 'Scene 4: Optimization & A/B Battle',
    visualCue: 'AI Copilot → 1-Click Auto Rewrite → Before vs After A/B comparison matrix',
    voiceover:
      'Our AI Copilot explains every prediction and suggests improvements. Users can rewrite hooks, captions, and calls to action, then instantly compare the original content with the optimized version using a new simulation.',
    durationSec: 25,
  },
  {
    id: 'infrastructure',
    timestamp: '1:35 – 1:55',
    title: 'Scene 5: Infrastructure & Exporter',
    visualCue: 'AI Workspace telemetry dashboard → Executive PDF audit report generator',
    voiceover:
      'Behind the scenes, the platform combines multiple AI services inside a unified workspace, generates professional reports, and provides a complete environment for creators, agencies, and marketing teams.',
    durationSec: 20,
  },
  {
    id: 'closing',
    timestamp: '1:55 – 2:00',
    title: 'Scene 6: Closing & Call to Action',
    visualCue: 'Logo glow animation + Hero tag: "Predict the Internet Before It Happens"',
    voiceover:
      'Social World Simulator helps creators make smarter publishing decisions by predicting the internet before it happens.',
    durationSec: 5,
  },
];

export function CinematicDemoPlayerModal({
  isOpen,
  onClose,
  onNavigateToSection,
}: CinematicDemoPlayerModalProps) {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentChapter = SCRIPT_CHAPTERS[currentChapterIdx];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentChapterIdx < SCRIPT_CHAPTERS.length - 1) {
        setCurrentChapterIdx((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, currentChapter.durationSec * 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentChapterIdx, currentChapter.durationSec]);

  if (!isOpen) return null;

  const handleCopyVoiceover = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleResetDemo = () => {
    setCurrentChapterIdx(0);
    setIsPlaying(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl text-[#F7F6F1] font-sans">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh]"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#F7F6F1]">
                  Official Hackathon Demo Video Script Player
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  2-Minute Pitch Voiceover Timeline & Visual Cues
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetDemo}
                className="px-3 py-1.5 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-300 border border-white/10 text-xs font-mono font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset (0:00)</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chapter Timeline Bar */}
          <div className="px-6 py-3 bg-[#0D0D0D] border-b border-white/10 flex space-x-2 shrink-0 font-mono text-xs overflow-x-auto">
            {SCRIPT_CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => {
                  setCurrentChapterIdx(idx);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
                  currentChapterIdx === idx
                    ? 'border-[#DEDBC8] text-white font-bold bg-[#DEDBC8]/15 shadow-md'
                    : 'border-white/5 text-zinc-400 hover:text-zinc-200 bg-[#181818]'
                }`}
              >
                <span className="text-[10px] text-[#DEDBC8]">{chap.timestamp}</span>
                <span>{chap.title.split(':')[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Chapter Hero Player Box */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-black/40">
            <div className="p-6 rounded-3xl bg-[#181818] border border-[#DEDBC8]/30 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#DEDBC8]/15 text-[#DEDBC8] border border-[#DEDBC8]/30 text-xs font-mono font-bold">
                    {currentChapter.timestamp}
                  </span>
                  <h4 className="text-base font-extrabold text-[#F7F6F1]">
                    {currentChapter.title}
                  </h4>
                </div>

                <button
                  onClick={() => handleCopyVoiceover(currentChapter.voiceover, currentChapterIdx)}
                  className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black text-[#DEDBC8] border border-white/10 text-xs font-mono font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  {copiedIndex === currentChapterIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === currentChapterIdx ? 'Copied Voiceover' : 'Copy Text'}</span>
                </button>
              </div>

              {/* Visual Cue Banner */}
              <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 text-xs font-mono space-y-1">
                <span className="text-[10px] text-[#DEDBC8] font-bold uppercase tracking-wider block">
                  🎬 Screen & Visual Direction:
                </span>
                <span className="text-zinc-200">{currentChapter.visualCue}</span>
              </div>

              {/* Voiceover Script Block */}
              <div className="p-5 rounded-2xl bg-[#101010] border border-[#DEDBC8]/20 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#DEDBC8] font-mono">
                  <Volume2 className="w-4 h-4 text-[#DEDBC8] animate-pulse" />
                  <span>VOICEOVER SCRIPT (Read Aloud):</span>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-zinc-100 italic font-serif pl-2 border-l-2 border-[#DEDBC8]">
                  "{currentChapter.voiceover}"
                </p>
              </div>
            </div>

            {/* List of All Chapters */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono text-[#DEDBC8] uppercase tracking-wider">
                Full 2-Minute Demo Script Timeline
              </h4>

              <div className="space-y-2 font-mono text-xs">
                {SCRIPT_CHAPTERS.map((chap, idx) => (
                  <div
                    key={chap.id}
                    onClick={() => {
                      setCurrentChapterIdx(idx);
                      setIsPlaying(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      currentChapterIdx === idx
                        ? 'bg-[#181818] border-[#DEDBC8] text-white shadow-lg'
                        : 'bg-black/40 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-xl bg-[#DEDBC8]/10 text-[#DEDBC8] font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-white block">{chap.title}</span>
                        <span className="text-[11px] text-zinc-500 font-sans line-clamp-1">"{chap.voiceover}"</span>
                      </div>
                    </div>

                    <span className="text-xs text-[#DEDBC8] font-bold shrink-0">{chap.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold flex items-center space-x-2 cursor-pointer transition-all active:scale-95 shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                <span>{isPlaying ? 'Pause Demo Stream' : 'Play Full 2-Min Demo'}</span>
              </button>

              <button
                onClick={() => setCurrentChapterIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentChapterIdx === 0}
                className="p-2.5 rounded-xl bg-black border border-white/10 text-zinc-300 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentChapterIdx((prev) => Math.min(SCRIPT_CHAPTERS.length - 1, prev + 1))}
                disabled={currentChapterIdx === SCRIPT_CHAPTERS.length - 1}
                className="p-2.5 rounded-xl bg-black border border-white/10 text-zinc-300 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#212121] hover:bg-zinc-800 text-zinc-300 font-bold border border-white/10 cursor-pointer"
            >
              Close Pitch Player
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
