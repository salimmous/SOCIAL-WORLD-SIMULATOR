'use client';

import React, { useState } from 'react';
import { Volume2, Play, Pause, Flame, Zap, AlertCircle } from 'lucide-react';

interface AudioPacingWaveformProps {
  scriptText: string;
  currentTime: number;
  duration: number;
}

export function AudioPacingWaveform({
  scriptText,
  currentTime,
  duration,
}: AudioPacingWaveformProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleElevenLabsAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const text = scriptText || 'Social World Simulator powered by ElevenLabs AI.';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  // Waveform bar heights
  const bars = [15, 28, 45, 80, 95, 60, 40, 75, 90, 100, 85, 70, 50, 30, 65, 85, 95, 40, 20, 60, 80, 55, 30, 40];

  return (
    <div className="p-3 rounded-2xl bg-[#111111] border border-white/10 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-3.5 h-3.5 text-[#DEDBC8]" />
          <span className="text-xs font-bold text-zinc-200">
            ElevenLabs AI Audio Waveform & Pacing
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#DEDBC8]/15 text-[#DEDBC8] border border-[#DEDBC8]/30 font-mono">
            Voice AI Sync
          </span>
        </div>

        <button
          onClick={toggleElevenLabsAudio}
          className="px-2.5 py-1 rounded-lg bg-[#DEDBC8]/15 hover:bg-[#DEDBC8]/30 text-[#DEDBC8] border border-[#DEDBC8]/30 text-[10px] font-bold transition-all cursor-pointer flex items-center space-x-1"
        >
          {isPlaying ? <Pause className="w-3 h-3 text-red-400" /> : <Play className="w-3 h-3 fill-[#DEDBC8] text-[#DEDBC8]" />}
          <span>{isPlaying ? 'Pause AI Voice' : 'Play ElevenLabs AI Voice'}</span>
        </button>
      </div>

      {/* Waveform Bars */}
      <div className="h-10 flex items-center justify-between space-x-1 px-1 bg-black/60 rounded-xl border border-white/5 relative overflow-hidden">
        {/* Progress Overlay */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-[#DEDBC8]/10 border-r border-[#DEDBC8]/40 transition-all duration-300"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />

        {bars.map((height, i) => {
          const isHook = i >= 3 && i <= 5;
          const isSlow = i >= 11 && i <= 13;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-center relative group"
            >
              <div
                className={`w-full rounded-full transition-all duration-300 ${
                  isHook
                    ? 'bg-[#7BC89C] shadow-sm shadow-[#7BC89C]/50'
                    : isSlow
                    ? 'bg-[#D9B76A]/60'
                    : i < (currentTime / duration) * bars.length
                    ? 'bg-[#DEDBC8]'
                    : 'bg-zinc-700'
                }`}
                style={{ height: `${height}%` }}
              />

              {/* Pacing Marker Badges */}
              {isHook && i === 4 && (
                <span className="absolute -top-1 text-[7px] font-mono font-bold text-[#7BC89C] bg-emerald-950 px-1 rounded border border-[#7BC89C]/40">
                  🔥 Hook
                </span>
              )}
              {isSlow && i === 12 && (
                <span className="absolute -top-1 text-[7px] font-mono font-bold text-[#D9B76A] bg-amber-950 px-1 rounded border border-[#D9B76A]/40">
                  ⚠️ Pacing Drop
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
