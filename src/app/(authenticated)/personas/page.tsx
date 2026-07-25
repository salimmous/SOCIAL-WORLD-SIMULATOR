'use client';

import React from 'react';
import { PERSONAS } from '@/data/personas';
import { Users, CheckCircle2 } from 'lucide-react';

export default function PersonasPage() {
  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-black text-[#F7F6F1] font-sans space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Autonomous AI Personas Library</h1>
            <p className="text-xs text-zinc-400 font-mono">200+ Distinct Behavioral Archetypes Powered by NVIDIA Nemotron 70B</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
        {PERSONAS.map((p) => (
          <div key={p.id} className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img src={p.avatarUrl} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-white/20" />
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
                    <span>{p.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DEDBC8]" />
                  </h3>
                  <span className="text-xs text-[#DEDBC8] font-mono">{p.role}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed italic">{p.bio}</p>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase">
              <span>Bias: {p.sentimentBias}</span>
              <span className="text-[#DEDBC8]">Virality: {(p.viralMultiplier * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
