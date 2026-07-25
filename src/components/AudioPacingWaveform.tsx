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

  // Mock waveform bar heights
  const bars = [15, 28, 45, 80, 95, 60, 40, 75, 90, 100, 85, 70, 50, 30, 65, 85, 95, 40, 20, 60, 80, 55, 30, 40];

  return (
    <div className="p-3 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-bold text-zinc-200">
            ElevenLabs AI Audio Waveform & Pacing
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
            Voice AI Sync
          </span>
        </div>

        <button
          onClick={toggleElevenLabsAudio}
          className="px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-[10px] font-bold transition-all cursor-pointer flex items-center space-x-1"
        >
          {isPlaying ? <Pause className="w-3 h-3 text-red-400" /> : <Play className="w-3 h-3 fill-purple-300" />}
          <span>{isPlaying ? 'Pause AI Voice' : 'Play ElevenLabs AI Voice'}</span>
        </button>
      </div>

      {/* Waveform Bars */}
      <div className="h-10 flex items-center justify-between space-x-1 px-1 bg-black/60 rounded-xl border border-white/5 relative overflow-hidden">
        {/* Progress Overlay */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-purple-500/10 border-r border-purple-500/40 transition-all duration-300"
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
                    ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50'
                    : isSlow
                    ? 'bg-amber-500/60'
                    : i < (currentTime / duration) * bars.length
                    ? 'bg-purple-400'
                    : 'bg-zinc-700'
                }`}
                style={{ height: `${height}%` }}
              />

              {/* Pacing Marker Badges */}
              {isHook && i === 4 && (
                <span className="absolute -top-1 text-[7px] font-mono font-bold text-emerald-300 bg-emerald-950 px-1 rounded border border-emerald-500/40">
                  🔥 Hook
                </span>
              )}
              {isSlow && i === 12 && (
                <span className="absolute -top-1 text-[7px] font-mono font-bold text-amber-300 bg-amber-950 px-1 rounded border border-amber-500/40">
                  ⚠️ Pacing Drop
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span className="flex items-center space-x-1 text-emerald-400">
          <Flame className="w-3 h-3 shrink-0" />
          <span>High Hook Energy (0:01 - 0:04s)</span>
        </span>
        <span className="flex items-center space-x-1 text-amber-400">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>Pacing Slow at 0:12s (Add Interrupt)</span>
        </span>
      </div>
    </div>
  );
}
