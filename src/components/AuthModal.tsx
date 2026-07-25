'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Key,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  CreditCard,
  Users,
  Settings,
  Building,
  Save,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'socials' | 'apiKeys' | 'security'>('profile');

  const [connectedSocials, setConnectedSocials] = useState({
    tiktok: { connected: true, handle: '@salim_viral', autoPublish: true },
    twitter: { connected: true, handle: '@salimmous', autoPublish: true },
    instagram: { connected: true, handle: '@salim.ai', autoPublish: false },
    youtube: { connected: false, handle: '', autoPublish: false },
    linkedin: { connected: true, handle: 'Salim Moussaoui', autoPublish: true },
  });

  const [apiKeys, setApiKeys] = useState({
    nvidiaKey: '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',
    whisperKey: 'sk-proj-whisper-enterprise-v2',
    elevenLabsKey: 'el_prod_live_89104',
  });

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

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

  const toggleAutoPublish = (platform: keyof typeof connectedSocials) => {
    setConnectedSocials((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        autoPublish: !prev[platform].autoPublish,
      },
    }));
  };

  const handleSaveKeys = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-3xl p-6 shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">CTO Workspace & Integrations</h3>
                  <span className="text-xs text-purple-300 font-mono">
                    Enterprise Tier • Antigravity AI Labs
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
            <div className="flex border-b border-white/[0.06] my-4 p-1 bg-zinc-900/50 rounded-xl space-x-1">
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
                onClick={() => setActiveTab('socials')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'socials'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Social OAuth
              </button>
              <button
                onClick={() => setActiveTab('apiKeys')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'apiKeys'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                AI Models & Keys
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'security'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Security & Team
              </button>
            </div>

            {/* TAB 1: PROFILE & SUBSCRIPTION PLAN */}
            {activeTab === 'profile' && (
              <div className="space-y-4 py-1">
                {/* User Info Card */}
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-white text-lg font-bold">
                    SM
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Salim Moussaoui</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                        Enterprise CTO
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 block font-mono">salim@simulator.ai</span>
                    <span className="text-[11px] text-zinc-500 block mt-0.5">
                      Organization: <strong className="text-zinc-300">Antigravity AI Labs</strong>
                    </span>
                  </div>
                </div>

                {/* Quota Metric */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Monthly AI Simulation Quota</span>
                    <span className="text-purple-300 font-mono font-bold">4,850 / 5,000 runs</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-400 h-full w-[94%]" />
                  </div>
                </div>

                {/* Billing Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                    <div className="flex items-center space-x-2 text-zinc-400 mb-1">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      <span>Current Plan</span>
                    </div>
                    <span className="font-bold text-white block text-sm">Enterprise Unlimited</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Renews Aug 2026</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                    <div className="flex items-center space-x-2 text-zinc-400 mb-1">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>Team Seats</span>
                    </div>
                    <span className="font-bold text-white block text-sm">12 / 15 Active Seats</span>
                    <span className="text-[10px] text-purple-400 font-mono">+3 Available</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SOCIAL MEDIA OAUTH CONNECTIONS */}
            {activeTab === 'socials' && (
              <div className="space-y-3 py-1 max-h-[320px] overflow-y-auto pr-1">
                <span className="text-xs text-zinc-400 font-medium block">
                  Connect live social media channels for 1-click pre-publish simulation & auto-publishing:
                </span>

                {/* TikTok */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
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

                  <div className="flex items-center space-x-2">
                    {connectedSocials.tiktok.connected && (
                      <button
                        onClick={() => toggleAutoPublish('tiktok')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                          connectedSocials.tiktok.autoPublish
                            ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                        title="Auto-publish when Virality Score > 90"
                      >
                        Auto-Post: {connectedSocials.tiktok.autoPublish ? 'ON' : 'OFF'}
                      </button>
                    )}
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
                </div>

                {/* X / Twitter */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
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

                  <div className="flex items-center space-x-2">
                    {connectedSocials.twitter.connected && (
                      <button
                        onClick={() => toggleAutoPublish('twitter')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                          connectedSocials.twitter.autoPublish
                            ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        Auto-Post: {connectedSocials.twitter.autoPublish ? 'ON' : 'OFF'}
                      </button>
                    )}
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
                </div>

                {/* Instagram */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
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
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
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

            {/* TAB 3: AI MODELS & CUSTOM API KEYS */}
            {activeTab === 'apiKeys' && (
              <div className="space-y-4 py-1">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-zinc-300">NVIDIA AI Key (Llama 3.3 70B)</span>
                    <span className="text-[9px] text-emerald-400 font-mono">Connected & Verified</span>
                  </div>
                  <input
                    type="password"
                    value={apiKeys.nvidiaKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, nvidiaKey: e.target.value })}
                    className="w-full p-2.5 rounded-xl text-xs font-mono bg-zinc-900/80 border border-white/10 text-purple-300 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-zinc-300">Whisper Speech AI Key</span>
                    <span className="text-[9px] text-emerald-400 font-mono">Active</span>
                  </div>
                  <input
                    type="password"
                    value={apiKeys.whisperKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, whisperKey: e.target.value })}
                    className="w-full p-2.5 rounded-xl text-xs font-mono bg-zinc-900/80 border border-white/10 text-purple-300 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-zinc-300">ElevenLabs Voice AI Key</span>
                    <span className="text-[9px] text-purple-400 font-mono">Optional Voice Replica</span>
                  </div>
                  <input
                    type="password"
                    value={apiKeys.elevenLabsKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, elevenLabsKey: e.target.value })}
                    className="w-full p-2.5 rounded-xl text-xs font-mono bg-zinc-900/80 border border-white/10 text-purple-300 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={handleSaveKeys}
                  className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savedSuccess ? 'Keys Saved Successfully ✓' : 'Update AI API Keys'}</span>
                </button>
              </div>
            )}

            {/* TAB 4: SECURITY & TEAM MANAGEMENT */}
            {activeTab === 'security' && (
              <div className="space-y-3 py-1">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Multi-Factor Authentication (MFA)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Hardware YubiKey / TOTP Enabled</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">SSO Single Sign-On</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Google Workspace / Okta SAML</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Audit Access Logs</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Last login: Today 11:34 AM from Mac OS</span>
                  </div>
                  <button className="text-xs text-purple-400 font-mono hover:underline cursor-pointer">
                    View Logs
                  </button>
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
