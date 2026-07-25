'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap, CheckCircle2, TrendingUp, Eye, Heart, Share2 } from 'lucide-react';

interface LiveEventFeedProps {
  currentTime: number;
}

const EVENTS = [
  { time: 1, text: 'David (Tech Founder) viewed payload', type: 'view' },
  { time: 2, text: 'Zara (Gen Z Creator) liked content', type: 'like' },
  { time: 3, text: 'Algorithm detected high retention spike (94%)', type: 'algo' },
  { time: 5, text: 'Creator community started sharing network wide', type: 'share' },
  { time: 8, text: 'Debate started in comment thread', type: 'comment' },
  { time: 11, text: 'Influencer node entered amplification orbit', type: 'influencer' },
  { time: 14, text: 'Reach increased 3.2x across secondary clusters', type: 'virality' },
];

export function LiveEventFeed({ currentTime }: LiveEventFeedProps) {
  const visibleEvents = EVENTS.filter((e) => e.time <= currentTime);

  return (
    <div className="p-4 rounded-2xl bg-[#111111] border border-white/10 space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#F7F6F1] uppercase tracking-wider flex items-center space-x-1.5">
          <Activity className="w-3.5 h-3.5 text-[#DEDBC8] animate-pulse" />
          <span>Live Storytelling Event Feed</span>
        </span>
        <span className="text-[9px] text-zinc-500 font-mono">0:{(currentTime || 0).toString().padStart(2, '0')}s</span>
      </div>

      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
        {visibleEvents.length === 0 ? (
          <div className="text-[11px] text-zinc-500 italic py-3 text-center">
            Play simulation to stream live network events...
          </div>
        ) : (
          visibleEvents.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-2 rounded-xl bg-black/60 border border-white/5 text-[11px] flex items-center justify-between"
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="text-[#DEDBC8] font-bold">00:{(evt.time || 0).toString().padStart(2, '0')}</span>
                <span className="text-zinc-300 truncate">{evt.text}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
