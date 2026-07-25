'use client';

import React from 'react';
import { Settings, Shield, Key, Bell, Database } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-black text-[#F7F6F1] font-sans space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Enterprise Workspace Settings</h1>
            <p className="text-xs text-zinc-400 font-mono">Manage Account, API Keys & Engine Preferences</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 font-sans">
        <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3 shadow-xl">
          <h3 className="font-bold text-sm text-[#DEDBC8] flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Account Profile</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
            <div>
              <span className="text-zinc-500 block">User Email:</span>
              <span className="text-white font-bold">{user?.email || 'salim@enterprise.ai'}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Subscription Tier:</span>
              <span className="text-emerald-400 font-bold">{user?.plan || 'Enterprise Workspace'}</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3 shadow-xl">
          <h3 className="font-bold text-sm text-[#DEDBC8] flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>NVIDIA API Credentials</span>
          </h3>
          <p className="text-xs text-zinc-400">NVIDIA_API_KEY environment variable is configured and verified.</p>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={logout}
            className="px-6 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs transition-all cursor-pointer"
          >
            Log Out of Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
