'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Code,
  Globe,
  X,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export interface AtlasModuleTopic {
  id: string;
  title: string;
  tagline?: string;
  category: string;
  whatItDoes: string;
  whyExists: string;
  howItWorks: string;
  bestPractices: string[];
  examples: string[];
  commonMistakes: string[];
  relatedFeatures: string[];
}

export const ATLAS_TOPICS: { [key: string]: AtlasModuleTopic } = {
  upload: {
    id: 'upload',
    title: 'Content Intelligence Upload',
    category: 'Ingestion Module',
    whatItDoes: 'Parses raw video files, images, scripts, or social URLs into structured multimodal tokens for AI simulation.',
    whyExists: 'Pre-publish simulation requires a precise mathematical understanding of your hook, pacing, and visual style.',
    howItWorks: 'Files pass through NVIDIA Llama 3.3 70B for visual frame analysis and OpenAI Whisper for speech-to-text transcript parsing.',
    bestPractices: [
      'Include the first 15 seconds of your hook in the script text.',
      'Select the exact target platform (TikTok vs LinkedIn) to align algorithm rules.',
      'Specify target audience cohorts to refine persona sentiment bias.',
    ],
    examples: [
      '30-second TikTok video with high-arousal hook.',
      'B2B SaaS product launch script targeting tech founders.',
    ],
    commonMistakes: [
      'Uploading raw video without checking transcript extraction accuracy.',
      'Testing consumer TikTok hooks against B2B LinkedIn persona cohorts.',
    ],
    relatedFeatures: ['Social Simulation Canvas', 'Optimization Lab', 'AI Copilot'],
  },
  simulation: {
    id: 'simulation',
    title: 'Social Simulation Engine',
    category: 'Physics & Agent Core',
    whatItDoes: 'Simulates 200+ autonomous AI personas reacting in real time across a 60 FPS HTML5 Canvas orbital physics graph.',
    whyExists: 'Allows creators and marketing teams to test how content spreads across virtual social networks BEFORE publishing.',
    howItWorks: 'Calculates orbital velocity vectors, gravitational pull towards your content payload, and virality signal heatwaves.',
    bestPractices: [
      'Watch persona nodes shift state from Idle (grey) to Engaged (ivory) or Shared (emerald).',
      'Click any drifting persona node to inspect their explicit AI behavioral reasoning.',
      'Re-run the simulation after applying 1-click script rewrites to verify score deltas.',
    ],
    examples: [
      'Simulating a controversial tech hot-take to measure critic vs enthusiast split.',
      'Testing a product feature reveal across Gen Z vs Enterprise B2B cohorts.',
    ],
    commonMistakes: [
      'Evaluating virality based only on raw likes rather than share probability and retention.',
      'Ignoring persona node AI explanations for early drop-offs.',
    ],
    relatedFeatures: ['Persona Modal', 'Retention Timeline', 'Optimization Lab'],
  },
  personas: {
    id: 'personas',
    title: 'Persona AI Reasoning & Cohorts',
    category: 'Agent Intelligence',
    whatItDoes: 'Provides individual AI persona profiles with explicit Influence Scores (94/100), Trust Scores (88/100), and behavioral reasoning.',
    whyExists: 'Audiences are not homogeneous. Synthetic personas provide distinct memory biases (Enthusiastic, Critical, Hater, Creator).',
    howItWorks: 'Each persona evaluates content against their background profile and calculates sentiment probability.',
    bestPractices: [
      'Filter persona cohorts to match your exact target demographic.',
      'Inspect Influence Scores to see which personas act as key viral nodes.',
      'Pay attention to skeptical personas — their feedback prevents public backlashes.',
    ],
    examples: [
      'Tech Founder persona evaluating product utility.',
      'Gen Z Creator persona auditing hook pacing speed.',
    ],
    commonMistakes: [
      'Targeting only friendly personas and turning off critical audience cohorts.',
      'Failing to adjust content pacing when high-influence nodes scroll away early.',
    ],
    relatedFeatures: ['Social Simulation Canvas', 'Content Intelligence', 'Executive Reports'],
  },
  timeline: {
    id: 'timeline',
    title: 'Attention & Retention Timeline',
    category: 'Analytics Engine',
    whatItDoes: 'Plots simulated audience retention percentage across a 60-second window.',
    whyExists: 'Identifies micro-drop-off moments down to the exact second.',
    howItWorks: 'Aggregates frame-by-frame attention signals from all 200+ active personas.',
    bestPractices: [
      'Click any point on the retention graph to scrub the simulation canvas to that moment.',
      'Look out for red alert indicators representing retention dips.',
    ],
    examples: [
      'Detecting a 28% drop-off at 0:08 due to a slow transition.',
    ],
    commonMistakes: ['Focusing on the final score instead of fixing middle retention drops.'],
    relatedFeatures: ['Optimization Lab', 'Live Event Feed'],
  },
  optimization: {
    id: 'optimization',
    title: 'Strict AI Critique & Optimization Lab',
    category: 'Generative Rewrite Core',
    whatItDoes: 'Generates 1-click script rewrites targeting weak retention points.',
    whyExists: 'Raw critique is useless without immediate actionable solutions.',
    howItWorks: 'Passes current retention dips into NVIDIA Nemotron LLM to propose optimized hooks.',
    bestPractices: ['Click 1-Click Auto Rewrite to apply fixes instantly.'],
    examples: ['Replacing generic intro with visual pattern interrupt.'],
    commonMistakes: ['Ignoring AI critique suggestions.'],
    relatedFeatures: ['Social Simulation Canvas', 'Retention Timeline'],
  },
};

interface AtlasProductGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  topicId?: string | null;
  initialTopicId?: string;
}

export function AtlasProductGuideDrawer({
  isOpen,
  onClose,
  topicId,
  initialTopicId = 'upload',
}: AtlasProductGuideDrawerProps) {
  const [selectedKey, setSelectedKey] = useState<string>(topicId || initialTopicId);

  if (!isOpen) return null;

  const topic = ATLAS_TOPICS[selectedKey] || ATLAS_TOPICS.upload;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-lg bg-[#111111] border-l border-white/10 h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between text-[#F7F6F1]"
        >
          <div className="space-y-6">
            {/* Atlas Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#DEDBC8]/15 p-1 border border-[#DEDBC8]/30 flex items-center justify-center text-white shadow-xl overflow-hidden">
                  <img src="/logo.png" alt="Atlas Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#F7F6F1] flex items-center space-x-1.5">
                    <span>Atlas</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#DEDBC8]/20 text-[#DEDBC8] text-[10px] font-mono border border-[#DEDBC8]/30 font-bold">
                      Senior AI Product Mentor
                    </span>
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono">Official Platform Guide</span>
                </div>
              </div>

              <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Topic Switcher Pills */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 font-mono text-[10px]">
              {Object.keys(ATLAS_TOPICS).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                    selectedKey === key
                      ? 'bg-[#DEDBC8]/30 text-[#DEDBC8] border-[#DEDBC8] font-bold'
                      : 'bg-[#181818] text-zinc-400 border-white/5 hover:text-zinc-200'
                  }`}
                >
                  {ATLAS_TOPICS[key].title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Title & Category */}
            <div>
              <span className="text-[10px] font-mono font-bold text-[#DEDBC8] uppercase tracking-widest block">
                {topic.category}
              </span>
              <h2 className="text-xl font-extrabold text-white mt-0.5">{topic.title}</h2>
            </div>

            {/* What It Does */}
            <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-[#DEDBC8] font-bold uppercase tracking-wider block">
                What This Feature Does
              </span>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">{topic.whatItDoes}</p>
            </div>

            {/* Why It Exists */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Why It Exists</span>
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed bg-black/60 p-3 rounded-xl border border-white/5 font-sans">
                {topic.whyExists}
              </p>
            </div>

            {/* How It Works Internally */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                <Code className="w-3.5 h-3.5 text-[#DEDBC8]" />
                <span>How It Works Internally</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed bg-[#181818] p-3 rounded-xl border border-white/10 font-mono text-[11px]">
                {topic.howItWorks}
              </p>
            </div>

            {/* Best Practices */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Best Practices</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                {topic.bestPractices.map((bp, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-[#181818] p-2.5 rounded-xl border border-white/5">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Common Mistakes To Avoid</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400 font-sans">
                {topic.commonMistakes.map((cm, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-amber-950/10 p-2.5 rounded-xl border border-amber-500/20">
                    <span className="text-amber-400 font-bold shrink-0">⚠️</span>
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500">Atlas Product Mentor v2.4</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold transition-all cursor-pointer active:scale-95"
            >
              Close Atlas Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
