export type Platform = 'twitter' | 'tiktok' | 'youtube' | 'linkedin' | 'instagram';
export type ContentType = 'video' | 'script' | 'caption' | 'tweet' | 'idea';

export interface Persona {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  category: 'Tech' | 'GenZ' | 'B2B' | 'Creator' | 'Critic' | 'Algorithm';
  bio: string;
  color: string;
  sentimentBias: 'enthusiastic' | 'critical' | 'analytical' | 'viral_spreader' | 'troll' | 'passive';
  viralMultiplier: number;
}

export interface NetworkNode {
  id: string;
  personaId: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  state: 'idle' | 'noticed' | 'engaged' | 'shared' | 'hating';
  reachLevel: number; // 1 to 4
  activeReaction?: string;
  reactionExpiry?: number;
}

export interface NetworkEdge {
  id: string;
  sourceId: string;
  targetId: string;
  strength: number;
  activePulse: boolean;
  pulseProgress?: number;
}

export interface Comment {
  id: string;
  timestamp: number; // in simulation seconds
  timeFormatted: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorRole: string;
  authorColor: string;
  content: string;
  sentiment: 'positive' | 'skeptical' | 'hater' | 'analytical' | 'bot' | 'viral';
  likes: number;
  replies: number;
  shares: number;
}

export interface RetentionPoint {
  time: number; // in seconds (e.g. 0 to 60)
  timeFormatted: string;
  retentionPct: number; // 0 to 100
  excitementScore: number; // 0 to 100
  status: 'fire' | 'neutral' | 'ice';
  note?: string;
  isKeyMoment?: boolean;
}

export interface InsightMetrics {
  viralityScore: number;
  attentionScore: number;
  hookStrength: number;
  shareProbability: number;
  audienceFit: number;
  brandSafety: number;
  algorithmConfidence: number;
  estimatedReach: string;
}

export interface Recommendation {
  id: string;
  title: string;
  category: 'Hook' | 'Pacing' | 'CTA' | 'Visual' | 'Audience';
  impact: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  beforeAfter: { before: string; after: string };
  metricBoost: string;
  applied: boolean;
}

export interface PresetScenario {
  id: string;
  title: string;
  contentType: ContentType;
  platform: Platform;
  description: string;
  sampleText: string;
  mediaPreview?: string;
  baselineMetrics: InsightMetrics;
  tags: string[];
}

export interface ContentInput {
  title: string;
  contentType: ContentType;
  platform: Platform;
  contentBody: string;
  mediaFileUrl?: string;
  targetAudience: string;
}
