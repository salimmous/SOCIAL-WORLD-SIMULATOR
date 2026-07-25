'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Cpu, Zap, Sliders, Globe, ShieldCheck, X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  speed: number;
  onChangeSpeed: (s: number) => void;
}

export function SettingsModal({ isOpen, onClose, speed, onChangeSpeed }: SettingsModalProps) {
  const [selectedModel, setSelectedModel] = useState('NVIDIA Nemotron LLM');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden text-[#F7F6F1]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                <Settings className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#F7F6F1]">Engine Settings</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* AI Model Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-300 flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-[#DEDBC8]" />
                <span>Primary AI Intelligence Model</span>
              </span>
              <div className="grid grid-cols-1 gap-2">
                {['NVIDIA Nemotron LLM', 'OpenAI GPT-4o', 'ElevenLabs Voice + Vision Engine'].map((model) => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      selectedModel === model
                        ? 'bg-[#DEDBC8]/20 border-[#DEDBC8] text-white'
                        : 'bg-[#181818] border-white/10 text-zinc-400'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Physics Speed */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-300 flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Simulation Speed Multiplier</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => onChangeSpeed(s)}
                    className={`p-2.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                      speed === s
                        ? 'bg-[#DEDBC8]/20 border-[#DEDBC8] text-[#DEDBC8]'
                        : 'bg-[#181818] border-white/10 text-zinc-400'
                    }`}
                  >
                    {s}x Speed
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold transition-all cursor-pointer shadow-lg active:scale-95 text-center"
          >
            Save Preferences
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
