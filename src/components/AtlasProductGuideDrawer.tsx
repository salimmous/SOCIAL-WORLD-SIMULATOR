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
      'Watch persona nodes shift state from Idle (grey) to Engaged (purple) or Shared (emerald).',
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
    title: 'Retention Timeline & Heatmap',
    category: 'Analytics Module',
    whatItDoes: 'Second-by-second retention scrubber displaying excitement markers (🔥 High Excitement) and drop-off risks (⚠️ Pacing Slowdown).',
    whyExists: 'Algorithms penalize videos that lose audience attention in the first 5 seconds.',
    howItWorks: 'Syncs audio waveform pacing markers with second-by-second synthetic viewer attention curves.',
    bestPractices: [
      'Scrub directly to 0:04 timeline markers to inspect hook drop-off mechanics.',
      'Remove static intros or long filler phrases that cause sharp slope drops.',
      'Use 1-Click Auto Rewrite to trim weak setups automatically.',
    ],
    examples: [
      'Identifying a 15% retention drop-off at second 4 due to a long logo intro.',
      'Verifying excitement spikes when delivering the core value proposition.',
    ],
    commonMistakes: [
      'Ignoring drop-off warnings and assuming viewers will wait for the middle of the video.',
      'Not syncing audio pacing with visual frame changes.',
    ],
    relatedFeatures: ['Audio Pacing Waveform', 'Optimization Lab', 'AI Copilot'],
  },
  copilot: {
    id: 'copilot',
    title: 'AI Copilot Live Assistant',
    tagline: 'PERSISTENT LIVE MENTOR',
    category: 'Conversational AI',
    whatItDoes: 'Persistent live assistant observing your network simulation and delivering real-time commentary and 1-click rewrites.',
    whyExists: 'Transforms static analytics into conversational guidance.',
    howItWorks: 'Continuously monitors simulation metrics and answers natural questions like "Why did engagement drop?"',
    bestPractices: [
      'Ask Atlas or Copilot specific questions about audience cohorts.',
      'Click "Rewrite Hook" directly from the Copilot card for instant script optimization.',
    ],
    examples: [
      '"Why did Gen Z scroll away at second 6?" ➔ "Your introduction takes too long before delivering value."',
    ],
    commonMistakes: [
      'Not reviewing Copilot suggestions before exporting executive reports.',
    ],
    relatedFeatures: ['Optimization Lab', 'Executive Reports', 'AI Workspace'],
  },
  optimization: {
    id: 'optimization',
    title: 'Optimization Lab & A/B Comparison',
    category: 'Content Refinement',
    whatItDoes: 'Generates high-retention script rewrites and presents side-by-side A/B variant comparisons.',
    whyExists: 'Ensures every edit is mathematically validated through a new simulation before publishing.',
    howItWorks: 'Applies GPT-4o high-retention script frameworks and re-computes virality score deltas.',
    bestPractices: [
      'Compare Original Draft (Score 72) vs AI Optimized Version (Score 91) side-by-side.',
      'Apply 1-Click Auto Rewrite to update script text and re-simulate instantly.',
    ],
    examples: [
      'Original: "In this video I want to show you my app..." ➔ Rewritten: "Stop building AI apps before knowing this single rule..."',
    ],
    commonMistakes: [
      'Publishing original drafts without testing AI-optimized variants.',
    ],
    relatedFeatures: ['ABComparisonModal', 'Content Intelligence', 'Executive Reports'],
  },
  workspace: {
    id: 'workspace',
    title: 'AI Workspace Infrastructure',
    category: 'System Telemetry',
    whatItDoes: 'Displays 7 enterprise infrastructure modules: AI Providers, Media Gen, Research Engine, Automation, Deployment, Storage, Monitoring.',
    whyExists: 'Provides full transparency into connected AI models, latency, secrets, and system health.',
    howItWorks: 'Monitors NVIDIA Nemotron, OpenAI GPT-4o, ElevenLabs, fal.ai, Firecrawl, n8n, Render, and realtime telemetry.',
    bestPractices: [
      'Inspect NVIDIA Nemotron 42ms inference speed for low-latency runs.',
      'Manage encrypted environment secrets safely in the Secrets Manager.',
      'Stream live system audit logs to verify API execution.',
    ],
    examples: [
      'Testing provider connections and switching active LLM inference engines.',
    ],
    commonMistakes: [
      'Running large simulations without checking provider connection health.',
    ],
    relatedFeatures: ['ProviderDetailsDrawer', 'SecretsDrawer', 'LiveSystemLogsModal'],
  },
};

interface AtlasProductGuideDrawerProps {
  topicId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AtlasProductGuideDrawer({ topicId, isOpen, onClose }: AtlasProductGuideDrawerProps) {
  const [selectedKey, setSelectedKey] = useState<string>(topicId || 'upload');

  if (!isOpen) return null;

  const topic = ATLAS_TOPICS[selectedKey] || ATLAS_TOPICS['upload'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md font-sans">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-lg bg-zinc-950 border-l border-white/10 h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Atlas Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 p-1 border border-purple-400/40 flex items-center justify-center text-white shadow-xl overflow-hidden">
                  <img src="/logo.png" alt="Atlas Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center space-x-1.5">
                    <span>Atlas</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
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
                      ? 'bg-purple-600/30 text-purple-200 border-purple-500 font-bold'
                      : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-zinc-200'
                  }`}
                >
                  {ATLAS_TOPICS[key].title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Title & Category */}
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
                {topic.category}
              </span>
              <h2 className="text-xl font-extrabold text-white mt-0.5">{topic.title}</h2>
            </div>

            {/* What It Does */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider block">
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
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>How It Works Internally</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/80 p-3 rounded-xl border border-white/10 font-mono text-[11px]">
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
                  <li key={idx} className="flex items-start space-x-2 bg-zinc-900/40 p-2.5 rounded-xl border border-white/5">
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
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Close Atlas Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
