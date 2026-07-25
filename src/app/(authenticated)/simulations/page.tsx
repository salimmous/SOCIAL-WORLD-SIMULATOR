'use client';

import React, { useState, useEffect } from 'react';
import { History, Play, Plus, Clock } from 'lucide-react';
import { SavedProject, getSavedProjects } from '@/services/historyStore';
import { useRouter } from 'next/navigation';

export default function SimulationsPage() {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const router = useRouter();

  useEffect(() => {
    setProjects(getSavedProjects());
  }, []);

  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-black text-[#F7F6F1] font-sans space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Simulations & Project History</h1>
            <p className="text-xs text-zinc-400 font-mono">Saved Enterprise Simulation Runs & Historical Benchmarks</p>
          </div>
        </div>

        <button
          onClick={() => router.push('/platform')}
          className="px-4 py-2 rounded-xl bg-[#DEDBC8] text-black font-extrabold text-xs flex items-center space-x-1.5 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Launch New Simulation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#DEDBC8]/15 text-[#DEDBC8] border border-[#DEDBC8]/30">
                  {p.platform}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(p.timestamp).toLocaleDateString()}</span>
                </span>
              </div>
              <h3 className="font-bold text-base text-white">{p.title}</h3>
              <p className="text-xs text-zinc-400 font-mono">
                Viral Score: {p.viralityScore}/100 • Reach: {p.estimatedReach}
              </p>
            </div>

            <button
              onClick={() => router.push('/platform')}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#DEDBC8] flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-[#DEDBC8]" />
              <span>Re-Run Simulation</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
