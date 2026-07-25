'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogIn, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('salim@enterprise.ai');
  const [password, setPassword] = useState('••••••••••••');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-screen w-full bg-black text-[#E1E0CC] flex flex-col justify-between p-6 font-sans relative overflow-hidden">
      {/* Background Noise & Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div
          onClick={() => router.push('/')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#DEDBC8]/10 p-0.5 border border-[#DEDBC8]/30 overflow-hidden flex items-center justify-center">
            <img src="/logo.png" alt="Social World Simulator" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm text-[#F7F6F1] tracking-tight">SOCIAL WORLD SIMULATOR</span>
        </div>

        <button
          onClick={() => router.push('/')}
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Public Website
        </button>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#101010] border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_rgba(222,219,200,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 mx-auto flex items-center justify-center text-[#DEDBC8]">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-[#F7F6F1]">Sign in to Workspace</h1>
            <p className="text-xs text-zinc-400 font-mono">Enterprise Single Sign-On • PRO AI OS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-zinc-400 mb-1.5 font-bold uppercase text-[10px]">Work Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white focus:outline-none focus:border-[#DEDBC8] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1.5 font-bold uppercase text-[10px]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white focus:outline-none focus:border-[#DEDBC8] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#DEDBC8] hover:bg-white text-black font-extrabold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(222,219,200,0.25)] active:scale-95"
            >
              <span>Access Authenticated Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <span className="text-[10px] font-mono text-zinc-500 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Protected by Enterprise SSL & Single Sign-On</span>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-zinc-600 font-mono text-[11px]">
        © 2026 Social World Simulator Inc. All rights reserved.
      </footer>
    </div>
  );
}
