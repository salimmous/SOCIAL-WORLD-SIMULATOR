'use client';

import React from 'react';
import { BookOpen, Sparkles, Terminal, FileText } from 'lucide-react';

export default function DocumentationPage() {
  const GUIDES = [
    { title: 'Social World Simulation Engine', desc: 'Complete breakdown of viral score mathematical models and 60 FPS physics timeline.' },
    { title: 'NVIDIA Nemotron 70B Integration', desc: 'How autonomous LLM personas make real-time retention decisions during video playback.' },
    { title: 'A/B Testing & Fix Generator', desc: 'Automated AI hook optimization and viral retention fix recommendations.' },
    { title: 'Live Feed Simulator Mockups', desc: 'Cross-platform feed preview on TikTok, X (Twitter), Instagram Reels, and LinkedIn.' },
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-black text-[#F7F6F1] font-sans space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Enterprise Documentation & Atlas Guide</h1>
            <p className="text-xs text-zinc-400 font-mono">Official System Architecture & AI Mentorship Reference</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GUIDES.map((g, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3 shadow-xl">
            <h3 className="font-bold text-base text-[#DEDBC8] flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#DEDBC8]" />
              <span>{g.title}</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
