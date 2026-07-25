import { Persona } from '@/types/simulator';

export const PERSONAS: Persona[] = [
  {
    id: 'p-1',
    name: 'Alex Vance',
    handle: '@alexvance_tech',
    role: 'Tech Founder & Angel',
    avatar: '⚡',
    category: 'Tech',
    bio: 'Building future infra. Looks for deep tech, high leverage, zero BS.',
    color: '#6366f1', // Indigo
    sentimentBias: 'analytical',
    viralMultiplier: 2.8,
  },
  {
    id: 'p-2',
    name: 'Chloe Zhang',
    handle: '@chloez_genz',
    role: 'Gen Z Trendsetter',
    avatar: '✨',
    category: 'GenZ',
    bio: 'If it does not hook in 2 seconds, swipe away immediately.',
    color: '#ec4899', // Pink
    sentimentBias: 'enthusiastic',
    viralMultiplier: 3.5,
  },
  {
    id: 'p-3',
    name: 'Marcus Sterling',
    handle: '@msterling_b2b',
    role: 'B2B SaaS VP',
    avatar: '👔',
    category: 'B2B',
    bio: 'Wants ROI metrics, actionable frameworks, zero fluff.',
    color: '#3b82f6', // Blue
    sentimentBias: 'analytical',
    viralMultiplier: 1.5,
  },
  {
    id: 'p-4',
    name: 'Skeptical Sam',
    handle: '@sam_hater',
    role: 'Resident Skeptic / Critic',
    avatar: '🧐',
    category: 'Critic',
    bio: 'Will call out fake claims, AI hallucination, and clickbait.',
    color: '#ef4444', // Red
    sentimentBias: 'critical',
    viralMultiplier: 2.1,
  },
  {
    id: 'p-5',
    name: 'Zara Chen',
    handle: '@zara_viral',
    role: 'Viral Curator & Creator',
    avatar: '🚀',
    category: 'Creator',
    bio: 'Spotting early viral trends. Retweets everything high quality.',
    color: '#10b981', // Emerald
    sentimentBias: 'viral_spreader',
    viralMultiplier: 4.2,
  },
  {
    id: 'p-6',
    name: 'Devin Miller',
    handle: '@devin_builds',
    role: 'Indie Builder',
    avatar: '💻',
    category: 'Tech',
    bio: 'Shipping in public. Respects impressive UX and clean builds.',
    color: '#8b5cf6', // Violet
    sentimentBias: 'enthusiastic',
    viralMultiplier: 2.0,
  },
  {
    id: 'p-7',
    name: 'ALGO_NODE_01',
    handle: '@system_algo',
    role: 'For You Feed Algorithm',
    avatar: '🤖',
    category: 'Algorithm',
    bio: 'Evaluates early retention signals to boost velocity 10x.',
    color: '#eab308', // Amber
    sentimentBias: 'viral_spreader',
    viralMultiplier: 5.0,
  },
  {
    id: 'p-8',
    name: 'David Ross',
    handle: '@dross_marketer',
    role: 'Growth Strategist',
    avatar: '📊',
    category: 'B2B',
    bio: 'Analyzing distribution channels, visual pacing, and CTA placement.',
    color: '#06b6d4', // Cyan
    sentimentBias: 'analytical',
    viralMultiplier: 1.8,
  },
  {
    id: 'p-9',
    name: 'Jordan Lee',
    handle: '@jordan_lurker',
    role: 'Casual Viewer',
    avatar: '👀',
    category: 'GenZ',
    bio: 'Watches silently. Shares to DMs if extremely funny or mind blowing.',
    color: '#a855f7', // Purple
    sentimentBias: 'passive',
    viralMultiplier: 1.2,
  },
  {
    id: 'p-10',
    name: 'Elena Rostova',
    handle: '@elena_vc',
    role: 'Venture Partner',
    avatar: '🌐',
    category: 'Tech',
    bio: 'Investing in AI infrastructure & new social paradigms.',
    color: '#f97316', // Orange
    sentimentBias: 'critical',
    viralMultiplier: 3.0,
  },
];
