import { Platform, VideoIntelligence } from '@/types/simulator';

export interface SavedProject {
  id: string;
  title: string;
  timestamp: string;
  platform: Platform;
  viralityScore: number;
  estimatedReach: string;
  mediaUrl?: string;
  contentBody: string;
  intel?: VideoIntelligence;
}

const STORAGE_KEY = 'social_world_history_v1';

export function getSavedProjects(): SavedProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultProjects: SavedProject[] = [
        {
          id: 'proj-1',
          title: 'SaaS Launch Teaser 🚀',
          timestamp: '2 hours ago',
          platform: 'tiktok',
          viralityScore: 94,
          estimatedReach: '850K - 3.2M',
          contentBody: 'Hot take: Writing unit tests for early-stage MVP UI components is a waste of 60% of your engineering speed.',
          mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
        },
        {
          id: 'proj-2',
          title: 'AI Agent Architecture Walkthrough ⚡',
          timestamp: 'Yesterday',
          platform: 'twitter',
          viralityScore: 88,
          estimatedReach: '320K - 1.1M',
          contentBody: 'Why multi-agent DAG pipelines will replace standard sequential LLM prompts in 2026.',
          mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse history store:', err);
    return [];
  }
}

export function saveProjectToHistory(project: Omit<SavedProject, 'id' | 'timestamp'>): SavedProject {
  const existing = getSavedProjects();
  const newProj: SavedProject = {
    ...project,
    id: `proj-${Date.now()}`,
    timestamp: 'Just now',
  };

  const updated = [newProj, ...existing.slice(0, 19)];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newProj;
}

export function deleteProjectFromHistory(id: string): SavedProject[] {
  const existing = getSavedProjects();
  const updated = existing.filter((p) => p.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
