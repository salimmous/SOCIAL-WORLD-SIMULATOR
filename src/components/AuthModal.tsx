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
  ArrowRight,
  Globe,
  LogIn,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'socials' | 'apiKeys' | 'security'>('login');
  const [email, setEmail] = useState('salim@simulator.ai');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const [connectedSocials, setConnectedSocials] = useState({
    tiktok: { connected: true, handle: '@salim_viral', autoPublish: true },
    twitter: { connected: true, handle: '@salimmous', autoPublish: true },
    instagram: { connected: true, handle: '@salim.ai', autoPublish: false },
    youtube: { connected: false, handle: '', autoPublish: false },
    linkedin: { connected: true, handle: 'Salim Moussaoui', autoPublish: true },
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

  const handleSimulatedLogin = (provider: string) => {
    setIsLoggedIn(true);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
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
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content Card (Landing Page Colors: #101010, #E1E0CC text, #DEDBC8 accents) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            className="relative w-full max-w-xl bg-[#101010] border border-white/10 rounded-3xl p-6 shadow-[0_0_60px_rgba(222,219,200,0.12)] z-10 overflow-hidden text-[#E1E0CC] font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#212121] border border-white/10 flex items-center justify-center text-[#DEDBC8]">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#E1E0CC]">
                    Social World Simulator Account & Authentication
                  </h3>
                  <span className="text-xs text-[#DEDBC8]/70 font-mono">
                    Enterprise Single Sign-On • PRO AI OS
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#212121] hover:bg-zinc-800 text-gray-400 hover:text-white border border-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 my-4 p-1 bg-[#181818] rounded-xl space-x-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-[#DEDBC8] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Login & Access
              </button>
              <button
                onClick={() => setActiveTab('socials')}
                className={`flex-1 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'socials'
                    ? 'bg-[#DEDBC8] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Social OAuth
              </button>
              <button
                onClick={() => setActiveTab('apiKeys')}
                className={`flex-1 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'apiKeys'
                    ? 'bg-[#DEDBC8] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AI Model Keys
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-[#DEDBC8] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Plan & Usage
              </button>
            </div>

            {/* TAB 1: LOGIN & HOW TO AUTHENTICATE */}
            {activeTab === 'login' && (
              <div className="space-y-5 py-2">
                {/* Account Status Card */}
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-[#DEDBC8] text-black font-bold text-lg flex items-center justify-center">
                      SM
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#E1E0CC] text-sm">Salim Moussaoui</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                          Active User ✓
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono block">salim@simulator.ai</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSimulatedLogin('Google')}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#E1E0CC] text-xs font-semibold border border-white/10 transition-all cursor-pointer"
                  >
                    Switch Account
                  </button>
                </div>

                {/* Step-by-Step Login Instructions */}
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-[#DEDBC8] uppercase tracking-wider">
                    How to Sign In & Connect Workspace
                  </h4>

                  <div className="space-y-2.5 text-xs text-gray-300">
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#DEDBC8] text-black font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        1
                      </span>
                      <p>
                        Choose your single sign-on provider below (**Google**, **GitHub**, or **Email SSO**).
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#DEDBC8] text-black font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        2
                      </span>
                      <p>
                        Your 200+ autonomous personas, simulation history, and custom scripts sync automatically across all devices.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#DEDBC8] text-black font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        3
                      </span>
                      <p>
                        Access your Pro ($25/mo) or Enterprise ($100/mo) simulation credits instantly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Login Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => handleSimulatedLogin('Google')}
                    className="py-3 rounded-2xl bg-[#DEDBC8] hover:bg-white text-black font-extrabold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <span>Sign In with Google</span>
                  </button>

                  <button
                    onClick={() => handleSimulatedLogin('GitHub')}
                    className="py-3 rounded-2xl bg-[#212121] hover:bg-zinc-800 text-[#E1E0CC] border border-white/10 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>Sign In with GitHub</span>
                  </button>
                </div>

                {savedSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Successfully Logged In & Synced Workspace!</span>
                  </motion.div>
                )}
              </div>
            )}

            {/* TAB 2: SOCIAL OAUTH */}
            {activeTab === 'socials' && (
              <div className="space-y-3 py-2">
                <span className="text-xs text-gray-300 block">
                  Connect live social media channels for 1-click pre-publish virality testing:
                </span>

                {['TikTok', 'X / Twitter', 'Instagram', 'LinkedIn'].map((platform, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#E1E0CC] block">{platform} API</span>
                      <span className="text-[10px] text-gray-400 font-mono">Connected as @salim_viral</span>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      Connected ✓
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: AI MODEL KEYS */}
            {activeTab === 'apiKeys' && (
              <div className="space-y-3 py-2">
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#DEDBC8]">NVIDIA Llama 70B Vision Key</span>
                    <span className="text-[10px] text-emerald-400 font-mono">42ms Active</span>
                  </div>
                  <input
                    type="password"
                    readOnly
                    value="nvapi-1-T1JTXUCsty-Xs69BUB_w2Ejfz48sCXi4VXfh5Ty"
                    className="w-full bg-[#101010] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-gray-300"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#DEDBC8]">Whisper Speech Processing Key</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">Connected</span>
                  </div>
                  <input
                    type="password"
                    readOnly
                    value="sk-proj-whisper-enterprise-v2-live"
                    className="w-full bg-[#101010] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-gray-300"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: PLAN & USAGE */}
            {activeTab === 'security' && (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-[#181818] border border-[#DEDBC8] space-y-1">
                    <span className="text-gray-400 block text-[10px] uppercase font-mono">Active Tier</span>
                    <span className="font-extrabold text-[#E1E0CC] text-base block">Pro Creator ($25/mo)</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Unlimited Runs Active</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-1">
                    <span className="text-gray-400 block text-[10px] uppercase font-mono">Team Seats</span>
                    <span className="font-extrabold text-[#E1E0CC] text-base block">12 / 15 Active</span>
                    <span className="text-[#DEDBC8] font-mono text-[10px]">Enterprise Ready</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl bg-[#DEDBC8] hover:bg-white text-black font-extrabold text-xs transition-all cursor-pointer text-center shadow-lg active:scale-95"
                >
                  Close & Launch Platform Studio →
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
