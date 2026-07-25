'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Sparkles,
  Loader2,
  Film,
  Zap,
  AlignLeft,
  Link as LinkIcon,
  Globe,
} from 'lucide-react';
import { ContentType, Platform, ContentInput } from '@/types/simulator';
import { PERSONAS } from '@/data/personas';
import { analyzeUploadedVideo } from '@/services/videoAnalyzer';

interface LeftPanelProps {
  content: ContentInput;
  onChangeContent: (updated: Partial<ContentInput>) => void;
  selectedPersonas: string[];
  onTogglePersona: (personaId: string) => void;
  onRunSimulation: () => void;
  isRunning: boolean;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  content,
  onChangeContent,
  selectedPersonas,
  onTogglePersona,
  onRunSimulation,
  isRunning,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'summary' | 'timeline' | 'audience'>('upload');

  const [inputMode, setInputMode] = useState<'file' | 'url' | 'samples'>('file');
  const [socialUrlInput, setSocialUrlInput] = useState<string>('');

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const platforms: { id: Platform; label: string }[] = [
    { id: 'tiktok', label: 'TikTok' },
    { id: 'twitter', label: 'X / Twitter' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'linkedin', label: 'LinkedIn' },
  ];

  const sampleMediaFiles = [
    {
      id: 'sample-1',
      title: 'Tech Founder Hot Take Video',
      platform: 'tiktok' as Platform,
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      tag: '🔥 15s High Retention',
    },
    {
      id: 'sample-2',
      title: 'B2B SaaS 0-to-1 Product Pitch',
      platform: 'twitter' as Platform,
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      tag: '🚀 B2B Conversion',
    },
    {
      id: 'sample-3',
      title: 'Gen Z Viral Trend Hook',
      platform: 'instagram' as Platform,
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      tag: '✨ Gen Z Viral',
    },
  ];

  // Automatic Video Intelligence Workflow via NVIDIA AI
  const processUploadedFile = async (fileOrTitle: File | string, mediaPreviewUrl?: string) => {
    const isFile = typeof fileOrTitle !== 'string';
    const mediaUrl = isFile ? URL.createObjectURL(fileOrTitle) : mediaPreviewUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';

    setIsAnalyzing(true);
    setAnalysisProgress(5);

    try {
      const intel = await analyzeUploadedVideo(fileOrTitle, (stepName, pct) => {
        setAnalysisStep(stepName);
        setAnalysisProgress(pct);
      });

      onChangeContent({
        mediaFileUrl: mediaUrl,
        title: intel.title,
        contentBody: intel.transcript,
        videoIntelligence: intel,
      });

      setActiveTab('summary');

      // Auto-launch simulation
      setTimeout(() => {
        onRunSimulation();
      }, 500);
    } catch (err) {
      console.error('NVIDIA AI Video Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processUploadedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processUploadedFile(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialUrlInput) return;
    processUploadedFile(`Social Post: ${socialUrlInput}`);
  };

  const handleRemoveMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChangeContent({ mediaFileUrl: undefined, videoIntelligence: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setActiveTab('upload');
  };

  const intel = content.videoIntelligence;

  if (isCollapsed) {
    return (
      <div className="w-12 shrink-0 border-r border-white/[0.06] glass-panel rounded-none border-t-0 border-b-0 border-l-0 flex flex-col items-center py-4 justify-between z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-all cursor-pointer"
          title="Expand Studio Setup"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={onRunSimulation}
          className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 cursor-pointer"
          title="Start Simulation"
        >
          <Play className="w-4 h-4 fill-current" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[320px] shrink-0 border-r border-white/[0.06] glass-panel rounded-none border-t-0 border-b-0 border-l-0 flex flex-col h-[calc(100vh-3.5rem)] z-20 relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,.txt"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Top Drawer Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-zinc-950/40">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            NVIDIA AI Studio
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
          title="Collapse Studio"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Segmented Control Bar */}
      <div className="flex border-b border-white/[0.06] p-1.5 bg-zinc-950/20">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === 'upload'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Media
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === 'summary'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === 'timeline'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('audience')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === 'audience'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Audience
        </button>
      </div>

      {/* Main Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AUTOMATIC NVIDIA AI ANALYSIS PROGRESS */}
        {isAnalyzing && (
          <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-xl space-y-4">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
              <div>
                <span className="text-xs font-bold text-white block">
                  NVIDIA Llama 3.3 70B AI Engine
                </span>
                <span className="text-[10px] text-purple-300 font-mono">
                  {analysisProgress}% Analyzing Payload...
                </span>
              </div>
            </div>

            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-indigo-400 h-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>

            <p className="text-[11px] font-mono text-zinc-300 animate-pulse">
              {analysisStep}
            </p>
          </div>
        )}

        {/* MEDIA TAB: FILE UPLOAD + SOCIAL LINK + SAMPLES */}
        {activeTab === 'upload' && !isAnalyzing && (
          <div className="space-y-4">
            {/* Mode Switcher Pills */}
            <div className="flex p-1 bg-zinc-900/60 rounded-xl border border-white/5 text-[10px] font-bold">
              <button
                onClick={() => setInputMode('file')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  inputMode === 'file' ? 'bg-purple-600 text-white' : 'text-zinc-400'
                }`}
              >
                File Upload
              </button>
              <button
                onClick={() => setInputMode('url')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  inputMode === 'url' ? 'bg-purple-600 text-white' : 'text-zinc-400'
                }`}
              >
                Post Link
              </button>
              <button
                onClick={() => setInputMode('samples')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  inputMode === 'samples' ? 'bg-purple-600 text-white' : 'text-zinc-400'
                }`}
              >
                Test Samples
              </button>
            </div>

            {/* MODE 1: FILE UPLOAD DROPZONE */}
            {inputMode === 'file' && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-white/15 hover:border-purple-500/60 rounded-2xl p-4 bg-zinc-950/60 transition-all text-center group cursor-pointer relative overflow-hidden"
              >
                {content.mediaFileUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                    {content.mediaFileUrl.includes('blob:') || content.mediaFileUrl.endsWith('.mp4') || content.mediaFileUrl.endsWith('.webm') ? (
                      <video src={content.mediaFileUrl} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={content.mediaFileUrl} alt="Preview" className="w-full h-full object-cover opacity-90" />
                    )}
                    <button
                      onClick={handleRemoveMedia}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs border border-white/20 shadow-md cursor-pointer transition-transform hover:scale-110"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-zinc-300 font-semibold">
                      Upload Video File
                    </p>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      MP4, MOV, WEBP (Auto-Launches Simulation)
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* MODE 2: PASTE SOCIAL POST LINK */}
            {inputMode === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <span className="text-xs font-bold text-zinc-300 block">
                  Paste Live TikTok / Tweet / IG Link
                </span>
                <div className="relative">
                  <input
                    type="url"
                    value={socialUrlInput}
                    onChange={(e) => setSocialUrlInput(e.target.value)}
                    placeholder="https://tiktok.com/@user/video/123..."
                    className="w-full p-3 pl-9 rounded-2xl text-xs font-mono bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60"
                  />
                  <LinkIcon className="w-4 h-4 text-purple-400 absolute left-3 top-3.5" />
                </div>
                <button
                  type="submit"
                  disabled={!socialUrlInput}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-purple-600/20 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Link with NVIDIA AI</span>
                </button>
              </form>
            )}

            {/* MODE 3: 1-CLICK TEST SAMPLES GALLERY */}
            {inputMode === 'samples' && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-300 block">
                  Select 1-Click Test Media Payload:
                </span>
                {sampleMediaFiles.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onChangeContent({ platform: s.platform });
                      processUploadedFile(s.title, s.url);
                    }}
                    className="p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer flex items-center space-x-3 group"
                  >
                    <img
                      src={s.url}
                      alt={s.title}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-purple-300 font-bold block uppercase">
                        {s.tag}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                        {s.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Platform Selector Pills */}
            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">
                Target Distribution Channel
              </span>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((p) => {
                  const isSelected = content.platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onChangeContent({ platform: p.id })}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600/30 text-purple-200 border-purple-500/50 font-bold'
                          : 'bg-zinc-900/60 text-zinc-400 border-white/[0.04] hover:text-zinc-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* NVIDIA AI EXTRACTED SUMMARY & METADATA */}
        {activeTab === 'summary' && !isAnalyzing && (
          <div className="space-y-4">
            {intel && (
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-zinc-950/80 border border-white/10 text-[10px] font-mono">
                <div>
                  <span className="text-zinc-500 block">Duration</span>
                  <span className="text-zinc-200 font-bold">{intel.metadata.duration}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Resolution</span>
                  <span className="text-zinc-200 font-bold">{intel.metadata.resolution}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">NVIDIA Model</span>
                  <span className="text-purple-400 font-bold">Llama 3.3 70B</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Aspect Ratio</span>
                  <span className="text-purple-400 font-bold">{intel.metadata.aspectRatio}</span>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-zinc-300 flex items-center space-x-1">
                  <Film className="w-3.5 h-3.5 text-purple-400" />
                  <span>Video Title</span>
                </span>
                <span className="text-[9px] text-purple-400 font-mono uppercase">NVIDIA AI</span>
              </div>
              <input
                type="text"
                value={content.title}
                onChange={(e) => onChangeContent({ title: e.target.value })}
                className="w-full p-2.5 rounded-xl text-xs font-medium bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-purple-500/60"
              />
            </div>

            {intel && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-purple-300 flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Extracted Opening Hook</span>
                  </span>
                  <span className="text-[9px] text-amber-400 font-mono">{intel.hookStartTime}</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-sans italic leading-relaxed">
                  "{intel.hook}"
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-zinc-300 flex items-center space-x-1">
                  <AlignLeft className="w-3.5 h-3.5 text-blue-400" />
                  <span>Full Transcript</span>
                </span>
                <span className="text-[9px] text-zinc-500 font-mono">{content.contentBody.length} chars</span>
              </div>
              <textarea
                value={content.contentBody}
                onChange={(e) => onChangeContent({ contentBody: e.target.value })}
                rows={5}
                className="w-full p-3 rounded-2xl text-xs font-mono bg-zinc-950/80 border border-white/10 text-zinc-200 focus:outline-none focus:border-purple-500/60 leading-relaxed resize-none"
              />
              
              {intel?.transcriptHighlights && intel.transcriptHighlights.length > 0 && (
                <div className="mt-3 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Strict AI Critique
                  </span>
                  {intel.transcriptHighlights.map((hl, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/30 text-xs">
                      <div className="text-red-400 font-mono line-through mb-1 block">"{hl.text}"</div>
                      <div className="flex items-start space-x-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-300 text-[9px] font-bold uppercase shrink-0">
                          {hl.type.replace('_', ' ')}
                        </span>
                        <span className="text-emerald-400 font-medium leading-snug">
                          {hl.suggestion}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {intel && (
              <div className="space-y-2 pt-1 border-t border-white/[0.06]">
                <span className="text-xs font-bold text-zinc-300 block">
                  NVIDIA AI Content Intelligence
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-[9px] text-zinc-500 block uppercase font-mono">Style</span>
                    <span className="text-xs font-medium text-zinc-200">{intel.analysis.style}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-[9px] text-zinc-500 block uppercase font-mono">Tone</span>
                    <span className="text-xs font-medium text-zinc-200">{intel.analysis.tone}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-[9px] text-zinc-500 block uppercase font-mono">Emotion</span>
                    <span className="text-xs font-medium text-purple-300">{intel.analysis.emotion}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-[9px] text-zinc-500 block uppercase font-mono">Audience</span>
                    <span className="text-xs font-medium text-emerald-300 line-clamp-1">{intel.analysis.targetAudience}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TIMELINE VIEW */}
        {activeTab === 'timeline' && !isAnalyzing && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-300 block">
              NVIDIA AI Video Scene Breakdown
            </span>
            {intel?.timeline.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-1 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 font-mono">
                    {item.timestamp}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                      item.type === 'hook'
                        ? 'bg-amber-500/20 text-amber-300'
                        : item.type === 'cta'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* AUDIENCE SELECTOR VIEW */}
        {activeTab === 'audience' && !isAnalyzing && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 block mb-2">
              Target AI Audience Cohorts
            </span>
            {PERSONAS.map((persona) => {
              const isSelected = selectedPersonas.includes(persona.id);
              return (
                <div
                  key={persona.id}
                  onClick={() => onTogglePersona(persona.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-zinc-900/80 border-purple-500/40'
                      : 'bg-zinc-950/40 border-white/[0.04] opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="relative shrink-0">
                      <img
                        src={persona.avatarUrl}
                        alt={persona.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <span
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-zinc-950"
                        style={{ backgroundColor: persona.color }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-bold text-white block">
                          {persona.name}
                        </span>
                        {persona.badge === 'Verified' && (
                          <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20" />
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {persona.role}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-purple-500 bg-purple-600 text-white'
                        : 'border-zinc-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* THE ONE PRIMARY CTA BUTTON */}
      <div className="p-4 border-t border-white/[0.06] bg-zinc-950/60">
        <button
          onClick={onRunSimulation}
          disabled={isAnalyzing}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center space-x-2.5 active:scale-[0.98] cursor-pointer border border-purple-400/30 disabled:opacity-50"
        >
          <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'SIMULATING...' : '▶ START SIMULATION'}</span>
        </button>
      </div>
    </div>
  );
};
