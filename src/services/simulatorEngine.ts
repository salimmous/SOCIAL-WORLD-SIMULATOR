import {
  Persona,
  NetworkNode,
  NetworkEdge,
  Comment,
  RetentionPoint,
  InsightMetrics,
  Recommendation,
  ContentInput,
} from '@/types/simulator';
import { PERSONAS } from '@/data/personas';

export interface GeneratedSimulationData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  comments: Comment[];
  retentionTimeline: RetentionPoint[];
  metrics: InsightMetrics;
  recommendations: Recommendation[];
}

export function generateInitialNetwork(personas: Persona[] = PERSONAS): {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
} {
  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;

  const nodes: NetworkNode[] = personas.map((persona, index) => {
    const angle = (index / personas.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * persona.orbitRadius;
    const y = centerY + Math.sin(angle) * persona.orbitRadius;

    return {
      id: `node-${persona.id}`,
      personaId: persona.id,
      name: persona.name,
      role: persona.role,
      avatarUrl: persona.avatarUrl,
      initials: persona.initials,
      badge: persona.badge,
      color: persona.color,
      cluster: persona.cluster,
      orbitRadius: persona.orbitRadius,
      orbitSpeed: persona.orbitSpeed,
      angle,
      x,
      y,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: persona.cluster === 'Algorithm' ? 24 : 18,
      state: 'idle',
      reachLevel: 1,
    };
  });

  const edges: NetworkEdge[] = [];
  nodes.forEach((node, i) => {
    nodes.forEach((targetNode, j) => {
      if (i < j) {
        const sameCluster = node.cluster === targetNode.cluster;
        const isAlgo = node.cluster === 'Algorithm' || targetNode.cluster === 'Algorithm';
        const isInfluencer = node.cluster === 'Influencers' || targetNode.cluster === 'Influencers';

        if (sameCluster || isAlgo || isInfluencer || (i % 2 === 0 && j % 2 === 0)) {
          edges.push({
            id: `edge-${node.id}-${targetNode.id}`,
            sourceId: node.id,
            targetId: targetNode.id,
            strength: sameCluster ? 0.9 : 0.4,
            activePulse: false,
          });
        }
      }
    });
  });

  return { nodes, edges };
}

export function generateSimulatedComments(
  content: ContentInput,
  appliedFixes: boolean = false
): Comment[] {
  const baseComments: Omit<Comment, 'id' | 'timestamp' | 'timeFormatted'>[] = [
    {
      authorName: 'Alex Vance',
      authorHandle: '@alexvance_tech',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      authorInitials: 'AV',
      authorRole: 'Tech Founder',
      authorColor: '#3b82f6',
      badge: 'Verified',
      content: appliedFixes
        ? 'This hook hits way harder now. The neural distribution model clearly backs up the metrics.'
        : 'The concept is brilliant, but the intro took 6 seconds too long to get to the demo.',
      sentiment: appliedFixes ? 'viral' : 'analytical',
      likes: 142,
      replies: 18,
      shares: 34,
    },
    {
      authorName: 'Chloe Zhang',
      authorHandle: '@chloez_genz',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      authorInitials: 'CZ',
      authorRole: 'Gen Z Trend Analyst',
      authorColor: '#10b981',
      badge: 'Online',
      content: appliedFixes
        ? 'The visual preview pacing is spot on. High retention probability.'
        : 'Stopped watching at 0:08 because the text contrast was too low for mobile.',
      sentiment: appliedFixes ? 'positive' : 'skeptical',
      likes: 289,
      replies: 42,
      shares: 95,
    },
    {
      authorName: 'Skeptical Sam',
      authorHandle: '@sam_hater',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      authorInitials: 'SS',
      authorRole: 'Resident Critic',
      authorColor: '#ef4444',
      badge: 'Anonymous',
      content: appliedFixes
        ? 'The quantitative data visualization backs up the retention claims.'
        : 'Is the retention model empirically tested or estimated? Requesting baseline specs.',
      sentiment: appliedFixes ? 'analytical' : 'hater',
      likes: 88,
      replies: 31,
      shares: 12,
    },
    {
      authorName: 'Zara Chen',
      authorHandle: '@zara_viral',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      authorInitials: 'ZC',
      authorRole: 'Viral Media Curator',
      authorColor: '#8b5cf6',
      badge: 'Influencer',
      content:
        'Reshared to 150k subscribers. Pre-publish flight simulation is a massive category.',
      sentiment: 'viral',
      likes: 512,
      replies: 67,
      shares: 210,
    },
    {
      authorName: 'Marcus Sterling',
      authorHandle: '@msterling_b2b',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      authorInitials: 'MS',
      authorRole: 'Enterprise SaaS VP',
      authorColor: '#f97316',
      badge: 'Premium',
      content:
        'Requesting workspace demo. Need to validate our product video before Q3 campaign release.',
      sentiment: 'positive',
      likes: 95,
      replies: 12,
      shares: 19,
    },
    {
      authorName: 'Devin Miller',
      authorHandle: '@devin_builds',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      authorInitials: 'DM',
      authorRole: 'Product Engineer',
      authorColor: '#3b82f6',
      badge: 'Verified',
      content:
        'The neural galaxy visualization in the center canvas is extremely smooth and responsive.',
      sentiment: 'positive',
      likes: 176,
      replies: 24,
      shares: 28,
    },
    {
      authorName: 'ALGO_BOT_01',
      authorHandle: '@system_algo',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      authorInitials: 'AI',
      authorRole: 'Feed Recommendation Engine',
      authorColor: '#eab308',
      badge: 'AI Core',
      content:
        'High engagement velocity detected in first 15 seconds. Amplifying reach to Tier 1 creator cohort (+300%).',
      sentiment: 'bot',
      likes: 410,
      replies: 8,
      shares: 154,
    },
  ];

  const timestamps = [3, 8, 14, 22, 31, 44, 52];

  return baseComments.map((comment, index) => {
    const sec = timestamps[index % timestamps.length];
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;

    return {
      ...comment,
      id: `comment-${index + 1}`,
      timestamp: sec,
      timeFormatted,
    };
  });
}

export function generateRetentionTimeline(appliedFixes: boolean = false): RetentionPoint[] {
  const points: RetentionPoint[] = [];

  for (let sec = 0; sec <= 60; sec += 3) {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;

    let retentionPct = 100;
    let excitementScore = 90;
    let status: 'fire' | 'neutral' | 'ice' = 'fire';
    let note: string | undefined = undefined;
    let isKeyMoment = false;

    if (appliedFixes) {
      retentionPct = Math.max(65, Math.round(100 - sec * 0.5 + Math.sin(sec / 4) * 4));
      excitementScore = Math.round(85 + Math.cos(sec / 5) * 10);
      if (sec === 0) {
        status = 'fire';
        note = 'Ultra-strong visual hook captures 98% immediate attention';
        isKeyMoment = true;
      } else if (sec === 15) {
        status = 'fire';
        note = 'Demo payload reveals core value proposition without delay';
        isKeyMoment = true;
      } else if (sec === 36) {
        status = 'fire';
        note = 'High-leverage takeaway maintains 82% retention';
        isKeyMoment = true;
      } else {
        status = retentionPct > 75 ? 'fire' : 'neutral';
      }
    } else {
      if (sec === 0) {
        retentionPct = 100;
        excitementScore = 92;
        status = 'fire';
        note = 'Strong title hook grabs initial curiosity';
        isKeyMoment = true;
      } else if (sec <= 9) {
        retentionPct = 100 - sec * 3.5;
        excitementScore = 45;
        if (sec === 9) {
          status = 'ice';
          note = 'Intro dragged 3 seconds too long — 32% audience drop-off';
          isKeyMoment = true;
        }
      } else if (sec <= 27) {
        retentionPct = 68 + (sec - 9) * 0.6;
        excitementScore = 80;
        if (sec === 18) {
          status = 'fire';
          note = 'Neural galaxy ecosystem preview sparks sudden excitement (+14%)';
          isKeyMoment = true;
        }
      } else if (sec <= 42) {
        retentionPct = 78 - (sec - 27) * 1.8;
        if (sec === 39) {
          status = 'ice';
          note = 'Dense text block without visual pattern interrupt';
          isKeyMoment = true;
        }
      } else {
        retentionPct = Math.max(45, Math.round(52 - (sec - 42) * 0.3));
        excitementScore = 70;
      }
    }

    points.push({
      time: sec,
      timeFormatted,
      retentionPct: Math.min(100, Math.max(10, Math.round(retentionPct))),
      excitementScore: Math.min(100, Math.max(10, Math.round(excitementScore))),
      status,
      note,
      isKeyMoment,
    });
  }

  return points;
}

export function generateRecommendations(appliedFixes: boolean = false): Recommendation[] {
  return [
    {
      id: 'rec-1',
      title: 'Shorten Video Intro by 2.5 Seconds',
      category: 'Hook',
      impact: 'CRITICAL',
      description:
        '32% of Gen Z & Tech Founder personas drop off between 0:03 and 0:08 because the context setup is static.',
      beforeAfter: {
        before: 'In this video I want to talk about how creators...',
        after: 'Creators publish blindly. We change that. Watch this',
      },
      metricBoost: '+18% Retention, +14 Virality Score',
      applied: appliedFixes,
    },
    {
      id: 'rec-2',
      title: 'Move Live Demo Visual to 0:04',
      category: 'Visual',
      impact: 'HIGH',
      description:
        'Audience curiosity peaks when seeing the live node network. Displaying it earlier triggers the algorithm retention boost.',
      beforeAfter: {
        before: 'Display node canvas at 0:18',
        after: 'Display node canvas at 0:04 with glowing pulse animation',
      },
      metricBoost: '+22% Share Probability',
      applied: appliedFixes,
    },
    {
      id: 'rec-3',
      title: 'Add Clear Micro CTA Before 0:45',
      category: 'CTA',
      impact: 'MEDIUM',
      description:
        'B2B & Angel personas reported wanting to try the tool immediately. Insert a clear website URL badge before attention declines.',
      beforeAfter: {
        before: 'No link mentioned until final slide',
        after: 'Persistent floating pill badge: Try on simulator.ai',
      },
      metricBoost: '+35% Click-Through Intent',
      applied: appliedFixes,
    },
  ];
}

export function runSimulationEngine(
  content: ContentInput,
  appliedFixes: boolean = false
): GeneratedSimulationData {
  const { nodes, edges } = generateInitialNetwork();
  const comments = generateSimulatedComments(content, appliedFixes);
  const retentionTimeline = generateRetentionTimeline(appliedFixes);
  const recommendations = generateRecommendations(appliedFixes);

  const baseVirality = appliedFixes ? 96 : 88;
  const baseAttention = appliedFixes ? 94 : 79;
  const baseHook = appliedFixes ? 97 : 81;
  const baseShare = appliedFixes ? 92 : 76;

  const metrics: InsightMetrics = {
    viralityScore: baseVirality,
    attentionScore: baseAttention,
    hookStrength: baseHook,
    shareProbability: baseShare,
    audienceFit: 93,
    brandSafety: 98,
    algorithmConfidence: appliedFixes ? 95 : 87,
    estimatedReach: appliedFixes ? '850K - 3.2M impressions' : '220K - 850K impressions',
  };

  return {
    nodes,
    edges,
    comments,
    retentionTimeline,
    metrics,
    recommendations,
  };
}
