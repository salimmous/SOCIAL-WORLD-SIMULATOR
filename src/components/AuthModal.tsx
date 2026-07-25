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
  LogOut,
  Mail,
  Eye,
  EyeOff,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'socials' | 'apiKeys' | 'security'>('login');
  const [email, setEmail] = useState('salim@simulator.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authStatusMessage, setAuthStatusMessage] = useState<string | null>(null);

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

  const handleEmailPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setAuthStatusMessage(`Authenticated! Redirecting to Dashboard...`);
    setTimeout(() => {
      setAuthStatusMessage(null);
      onClose();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 400);
  };

  const handleSimulatedOAuthLogin = (provider: string) => {
    setIsLoggedIn(true);
    setAuthStatusMessage(`Signed in via ${provider}! Redirecting to Dashboard...`);
    setTimeout(() => {
      setAuthStatusMessage(null);
      onClose();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 400);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthStatusMessage('Successfully logged out.');
    setTimeout(() => setAuthStatusMessage(null), 2500);
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

          {/* Modal Content Card */}
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
                    Social World Simulator Account
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

            {/* Status Toast Message */}
            {authStatusMessage && (
              <div className="mt-3 p-3 rounded-xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 text-[#DEDBC8] text-xs font-mono font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{authStatusMessage}</span>
              </div>
            )}

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

            {/* TAB 1: LOGIN, EMAIL/PASSWORD & LOGOUT */}
            {activeTab === 'login' && (
              <div className="space-y-5 py-2">
                {/* Account Status Card */}
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-[#DEDBC8] text-black font-bold text-lg flex items-center justify-center">
                      {isLoggedIn ? 'SM' : '?'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#E1E0CC] text-sm">
                          {isLoggedIn ? 'Salim Moussaoui' : 'Guest User'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                            isLoggedIn
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                              : 'bg-zinc-800 text-gray-400 border-white/10'
                          }`}
                        >
                          {isLoggedIn ? 'Logged In ✓' : 'Not Logged In'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono block">
                        {isLoggedIn ? email : 'Enter your credentials below to sign in'}
                      </span>
                    </div>
                  </div>

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs font-bold border border-red-500/30 transition-all cursor-pointer flex items-center space-x-1.5 active:scale-95"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#DEDBC8] font-mono font-bold">Sign In Required</span>
                  )}
                </div>

                {/* Email & Password Form */}
                <form onSubmit={handleEmailPasswordSubmit} className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-[#DEDBC8] uppercase tracking-wider flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email & Password Sign In</span>
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1 font-mono">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="salim@simulator.ai"
                        className="w-full bg-[#101010] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1 font-mono">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-[#101010] border border-white/10 rounded-xl px-3.5 py-2 pr-10 text-xs text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold text-xs transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <span>Log In to Dashboard Studio →</span>
                  </button>
                </form>

                {/* OAuth Provider Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSimulatedOAuthLogin('Google')}
                    className="py-3 rounded-2xl bg-[#212121] hover:bg-zinc-800 text-[#E1E0CC] border border-white/10 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <span>Google SSO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSimulatedOAuthLogin('GitHub')}
                    className="py-3 rounded-2xl bg-[#212121] hover:bg-zinc-800 text-[#E1E0CC] border border-white/10 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub SSO</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: SOCIAL OAUTH CONNECTIONS */}
            {activeTab === 'socials' && (
              <div className="space-y-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#DEDBC8] font-mono uppercase tracking-wider">
                    Connected Publishing Accounts
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    Auto-publish simulation triggers
                  </span>
                </div>

                <div className="space-y-2.5">
                  {(Object.keys(connectedSocials) as Array<keyof typeof connectedSocials>).map(
                    (platform) => {
                      const item = connectedSocials[platform];
                      return (
                        <div
                          key={platform}
                          className="p-3.5 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-xl bg-[#212121] border border-white/10 flex items-center justify-center text-[#DEDBC8] uppercase font-mono text-xs font-bold">
                              {platform.substring(0, 2)}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-[#E1E0CC] capitalize block">
                                {platform}
                              </span>
                              <span className="text-[11px] text-gray-400 font-mono">
                                {item.connected ? item.handle : 'Not Connected'}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleConnect(platform)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              item.connected
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900'
                                : 'bg-[#212121] text-gray-300 border-white/10 hover:text-white'
                            }`}
                          >
                            {item.connected ? 'Connected ✓' : 'Connect'}
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: API KEYS */}
            {activeTab === 'apiKeys' && (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#DEDBC8] font-bold">NVIDIA AI Nemotron Key</span>
                    <span className="text-emerald-400 text-[10px]">Active (Unlimited)</span>
                  </div>
                  <input
                    type="password"
                    readOnly
                    value="nvapi-70b-simulated-enterprise-key-xxxx"
                    className="w-full bg-[#101010] border border-white/10 rounded-xl px-3 py-2 text-[#E1E0CC]"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#DEDBC8] font-bold">ElevenLabs Audio Token</span>
                    <span className="text-amber-400 text-[10px]">10,000 Chars</span>
                  </div>
                  <input
                    type="password"
                    readOnly
                    value="el-key-multilingual-v2-speech-xxxx"
                    className="w-full bg-[#101010] border border-white/10 rounded-xl px-3 py-2 text-[#E1E0CC]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: PLAN & USAGE */}
            {activeTab === 'security' && (
              <div className="space-y-4 py-2">
                <div className="p-5 rounded-2xl bg-[#181818] border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Enterprise PRO AI Plan</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#DEDBC8] text-black font-extrabold text-[10px]">
                      $100 / MONTH
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Simulations Run This Month:</span>
                      <span className="text-[#DEDBC8] font-bold">14,289 / Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Persona Entities Active:</span>
                      <span className="text-emerald-400 font-bold">200 / 200 Nodes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Physics FPS Performance:</span>
                      <span className="text-blue-400 font-bold">60 FPS Hardware Accelerate</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
