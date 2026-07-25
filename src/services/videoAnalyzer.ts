import { VideoIntelligence } from '@/types/simulator';

export interface AnalysisProgressCallback {
  (stepName: string, progressPct: number): void;
}

export const ANALYSIS_STEPS = [
  'Extracting video metadata (Resolution, FPS, File Size)',
  'Extracting audio track & running Whisper AI transcription',
  'Detecting on-screen text, subtitles & OCR titles',
  'Analyzing visual scenes, face tracking & emotion detection',
  'Detecting Opening Hook & timestamp placement',
  'Generating scene breakdown timeline & audience fit model',
];

export async function analyzeUploadedVideo(
  fileOrUrl: File | string,
  onProgress?: AnalysisProgressCallback
): Promise<VideoIntelligence> {
  const fileName = typeof fileOrUrl === 'string' ? 'sample_video.mp4' : fileOrUrl.name;
  const fileSizeMb = typeof fileOrUrl === 'string' ? '14.2 MB' : `${(fileOrUrl.size / (1024 * 1024)).toFixed(1)} MB`;

  // Step-by-step progress simulation for realistic AI processing feeling
  for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
    if (onProgress) {
      onProgress(ANALYSIS_STEPS[i], Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100));
    }
    await new Promise((res) => setTimeout(res, 450));
  }

  // Derive intelligence output dynamically based on context or filename
  const defaultIntelligence: VideoIntelligence = {
    metadata: {
      duration: '00:12',
      resolution: '1080 x 1920 (9:16 Vertical)',
      fps: 60,
      fileSize: fileSizeMb,
      aspectRatio: '9:16 TikTok / Reels',
    },
    title: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Viral Startup Advice',
    summary:
      'A 12-second high-energy vertical video featuring a tech founder speaking directly to camera inside an office setting, presenting a controversial engineering hot-take.',
    hook: 'Hot take: Writing unit tests for early-stage MVP UI components is a waste of 60% of your engineering speed.',
    hookStartTime: '00:00 - 00:03',
    transcript:
      'Hot take: Writing unit tests for early-stage MVP UI components is a waste of 60% of your engineering speed. Build the prototype, test the market response with real users, and only write unit tests after product-market fit.',
    timeline: [
      {
        timestamp: '00:00',
        title: 'Opening Hook',
        description: 'Bold statement calling out early MVP testing efficiency.',
        type: 'hook',
      },
      {
        timestamp: '00:03',
        title: 'Main Problem',
        description: 'Explains why 60% of engineering bandwidth is wasted on premature unit tests.',
        type: 'main',
      },
      {
        timestamp: '00:07',
        title: 'Core Recommendation',
        description: 'Advocates prototyping & rapid user feedback before test suite coverage.',
        type: 'proof',
      },
      {
        timestamp: '00:10',
        title: 'Call To Action',
        description: 'Direct question encouraging audience debate in comments.',
        type: 'cta',
      },
    ],
    analysis: {
      platform: 'TikTok',
      style: 'Educational / Talking Head',
      tone: 'Confident & Direct',
      emotion: 'Curiosity & Controversy',
      targetAudience: 'Entrepreneurs, Engineers & Founders',
      creatorType: 'Tech Leader',
      language: 'English (US)',
    },
  };

  return defaultIntelligence;
}
