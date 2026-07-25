'use client';

import React from 'react';
import { Cpu, Zap, Activity, CheckCircle2, Server, Globe } from 'lucide-react';

export default function WorkspacePage() {
  const PROVIDERS = [
    { name: 'NVIDIA AI Nemotron 70B', type: 'LLM & Reasoning Engine', status: 'Operational', latency: '24ms' },
    { name: 'ElevenLabs Voice Synthesis', type: 'Audio Hook & Speech AI', status: 'Connected', latency: '42ms' },
    { name: 'fal.ai Generative Media', type: 'Visual Interrupts & Thumbnails', status: 'Connected', latency: '140ms' },
    { name: 'Firecrawl Social Scraper', type: 'Live Web Scraping', status: 'Active', latency: '88ms' },
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-black text-[#F7F6F1] font-sans space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">AI Workspace Infrastructure</h1>
            <p className="text-xs text-zinc-400 font-mono">Connected AI Providers & Telemetry Engine</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
        {PROVIDERS.map((prov, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">{prov.name}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{prov.status}</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans">{prov.type}</p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Latency:</span>
              <span className="text-[#DEDBC8] font-bold">{prov.latency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
