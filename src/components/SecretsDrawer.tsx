'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Eye, EyeOff, Copy, Check, RotateCcw, ShieldCheck, X } from 'lucide-react';

interface SecretsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECRETS = [
  { name: 'NVIDIA_API_KEY', value: 'nvapi-7x92kQ0492mX1938502941', status: 'Valid (Active)' },
  { name: 'OPENAI_API_KEY', value: 'sk-proj-94028592019485029104', status: 'Valid (Active)' },
  { name: 'ELEVENLABS_API_KEY', value: 'el-voice-92849104928104', status: 'Valid (Active)' },
  { name: 'FAL_KEY', value: 'fal-sec-840294819284', status: 'Valid (Active)' },
  { name: 'FIRECRAWL_KEY', value: 'fc-crawl-928401948502', status: 'Valid (Active)' },
];

export function SecretsDrawer({ isOpen, onClose }: SecretsDrawerProps) {
  const [revealedKeys, setRevealedKeys] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleReveal = (name: string) => {
    setRevealedKeys((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCopy = (name: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(name);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-[#F7F6F1]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-lg bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F7F6F1]">Environment Secrets</h3>
                <span className="text-[10px] text-zinc-400 font-mono">Encrypted Store</span>
              </div>
            </div>

            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Secrets List */}
          <div className="space-y-3 font-mono">
            {SECRETS.map((sec) => {
              const isRevealed = revealedKeys[sec.name];
              const isCopied = copiedKey === sec.name;

              return (
                <div key={sec.name} className="p-3.5 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{sec.name}</span>
                    <span className="text-[9px] text-emerald-400 font-bold">{sec.status}</span>
                  </div>

                  <div className="flex items-center justify-between bg-black/60 p-2 rounded-xl border border-white/5 text-xs text-zinc-300">
                    <span className="truncate max-w-[240px]">
                      {isRevealed ? sec.value : '••••••••••••••••••••••••••••'}
                    </span>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => toggleReveal(sec.name)}
                        className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                        title={isRevealed ? 'Hide secret' : 'Reveal secret'}
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleCopy(sec.name, sec.value)}
                        className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold transition-all cursor-pointer shadow-lg active:scale-95 text-center"
          >
            Done
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
