'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Key,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  LogOut,
  Zap,
  Radio,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'socials' | 'apiKeys'>('socials');

  const [connectedSocials, setConnectedSocials] = useState({
    tiktok: { connected: true, handle: '@salim_viral' },
    twitter: { connected: true, handle: '@salimmous' },
    instagram: { connected: true, handle: '@salim.ai' },
    youtube: { connected: false, handle: '' },
    linkedin: { connected: true, handle: 'Salim Moussaoui' },
  });

  const toggleConnect = (platform: keyof typeof connectedSocials) => {
    setConnectedSocials((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: !prev[platform].connected,
        handle: !prev[platform].connected ? '@salim_connected' : '',
      },
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-6 shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Account & Integrations</h3>
                  <span className="text-xs text-zinc-400 font-mono">
                    PRO Enterprise Workspace
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/[0.06] my-4 p-1 bg-zinc-900/50 rounded-xl">
              <button
                onClick={() => setActiveTab('socials')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'socials'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Social Media OAuth
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'profile'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Profile & Plan
              </button>
              <button
                onClick={() => setActiveTab('apiKeys')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'apiKeys'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                AI API Keys
              </button>
            </div>

            {/* TAB 1: SOCIAL MEDIA CONNECTIONS */}
            {activeTab === 'socials' && (
              <div className="space-y-3 py-1">
                <span className="text-xs text-zinc-400 font-medium block">
                  Connect your live social media accounts for automatic pre-publish flight testing:
                </span>

                {/* TikTok */}
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center font-bold text-xs text-pink-400">
                      TikTok
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">TikTok Creator Studio</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {connectedSocials.tiktok.connected ? connectedSocials.tiktok.handle : 'Not Connected'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnect('tiktok')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      connectedSocials.tiktok.connected
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-600 text-white hover:bg-purple-500'
                    }`}
                  >
                    {connectedSocials.tiktok.connected ? 'Connected ✓' : 'Connect +'}
                  </button>
                </div>

                {/* X / Twitter */}
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-xs text-blue-400">
                      X
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">X / Twitter API v2</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {connectedSocials.twitter.connected ? connectedSocials.twitter.handle : 'Not Connected'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnect('twitter')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      connectedSocials.twitter.connected
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-600 text-white hover:bg-purple-500'
                    }`}
                  >
                    {connectedSocials.twitter.connected ? 'Connected ✓' : 'Connect +'}
                  </button>
                </div>

                {/* Instagram */}
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-xs text-purple-400">
                      IG
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Instagram Business Graph</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {connectedSocials.instagram.connected ? connectedSocials.instagram.handle : 'Not Connected'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnect('instagram')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      connectedSocials.instagram.connected
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-600 text-white hover:bg-purple-500'
                    }`}
                  >
                    {connectedSocials.instagram.connected ? 'Connected ✓' : 'Connect +'}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400">
                      in
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">LinkedIn Creator API</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {connectedSocials.linkedin.connected ? connectedSocials.linkedin.handle : 'Not Connected'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnect('linkedin')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      connectedSocials.linkedin.connected
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-600 text-white hover:bg-purple-500'
                    }`}
                  >
                    {connectedSocials.linkedin.connected ? 'Connected ✓' : 'Connect +'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE & SUBSCRIPTION */}
            {activeTab === 'profile' && (
              <div className="space-y-4 py-1">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-white text-lg font-bold">
                    SM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Salim Moussaoui</h4>
                    <span className="text-xs text-zinc-400 block font-mono">salim@simulator.ai</span>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                      Enterprise CTO Tier
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Simulation Quota</span>
                    <span className="text-white font-mono font-bold">4,850 / 5,000 runs</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-500 h-full w-[94%]" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AI API KEYS */}
            {activeTab === 'apiKeys' && (
              <div className="space-y-3 py-1">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">NVIDIA AI Cloud Key</span>
                    <span className="text-[10px] text-emerald-400 font-mono">nvapi-1-T1JT... Active (Llama 3.3 70B)</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Whisper Speech AI API</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Automatic Transcription Ready</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500">
                Encrypted OAuth 2.0 PKCE Protection
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all cursor-pointer shadow-lg shadow-purple-600/20"
              >
                Save & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
