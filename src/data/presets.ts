import { PresetScenario } from '@/types/simulator';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'preset-1',
    title: 'Flight Simulator for Social Media',
    contentType: 'video',
    platform: 'twitter',
    description: 'Cinematic preview of an AI tool simulating content outcomes before posting.',
    sampleText: `Most creators publish content blindly. Today they only learn AFTER posting.

We built Social World Simulator — the world's first flight simulator for creators. 

Upload your video, watch 100 AI personas react in real time, see retention drop-offs before hitting publish.

Stop guessing. Start simulating. 🚀`,
    mediaPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['AI Product', 'Viral Teaser', 'Product Launch'],
    baselineMetrics: {
      viralityScore: 92,
      attentionScore: 89,
      hookStrength: 95,
      shareProbability: 87,
      audienceFit: 94,
      brandSafety: 98,
      algorithmConfidence: 91,
      estimatedReach: '250K - 1.2M impressions',
    },
  },
  {
    id: 'preset-2',
    title: 'Unpopular Hot Take: Software Dev',
    contentType: 'tweet',
    platform: 'twitter',
    description: 'Controversial industry claim designed to spark heavy debate & reply velocity.',
    sampleText: `Hot take: Writing unit tests for early-stage MVP UI components is a waste of 60% of your engineering speed.

Build the prototype, test the market response with real users, refactor with tests ONLY after product-market fit.

Change my mind. 🧵`,
    tags: ['Hot Take', 'Debate', 'Dev Community'],
    baselineMetrics: {
      viralityScore: 84,
      attentionScore: 91,
      hookStrength: 88,
      shareProbability: 79,
      audienceFit: 81,
      brandSafety: 72,
      algorithmConfidence: 86,
      estimatedReach: '120K - 500K impressions',
    },
  },
  {
    id: 'preset-3',
    title: 'B2B SaaS 0-to-1 Metric Breakdown',
    contentType: 'script',
    platform: 'linkedin',
    description: 'Detailed tactical breakdown of how a startup scaled from 0 to $1M ARR.',
    sampleText: `How we hit $1M ARR in 7 months without spending $1 on paid ads:

1. Focused 100% on product-led growth (PLG) micro-features.
2. Built a viral public benchmark page.
3. Turn every user win into a shareable social card.

Here is the exact step-by-step breakdown of our onboarding funnel...`,
    tags: ['B2B', 'SaaS Growth', 'LinkedIn LeadGen'],
    baselineMetrics: {
      viralityScore: 78,
      attentionScore: 85,
      hookStrength: 82,
      shareProbability: 91,
      audienceFit: 89,
      brandSafety: 99,
      algorithmConfidence: 84,
      estimatedReach: '55K - 180K impressions',
    },
  },
  {
    id: 'preset-4',
    title: '15s High-Paced TikTok Visual Hook',
    contentType: 'video',
    platform: 'tiktok',
    description: 'Short video script designed for Gen Z swipe retention & pattern interrupts.',
    sampleText: `You are using ChatGPT wrong! 🛑

Here are 3 secret prompts that top 1% prompt engineers use to automate 8 hours of work in 30 seconds.

Save this video right now before it gets taken down.`,
    tags: ['TikTok', 'GenZ', 'Quick Tips'],
    baselineMetrics: {
      viralityScore: 96,
      attentionScore: 94,
      hookStrength: 98,
      shareProbability: 92,
      audienceFit: 90,
      brandSafety: 85,
      algorithmConfidence: 95,
      estimatedReach: '800K - 3.5M views',
    },
  },
];
