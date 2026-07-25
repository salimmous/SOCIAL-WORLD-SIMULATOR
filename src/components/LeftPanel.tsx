'use client';

import React, { useState } from 'react';
import {
  Video,
  FileText,
  MessageSquare,
  Share2,
  Sliders,
  Users,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  Play,
  Globe,
  Briefcase,
  Camera,
  Music2,
  PlaySquare,
  Send,
  Zap,
} from 'lucide-react';
import { ContentType, Platform, ContentInput, Persona } from '@/types/simulator';
import { PERSONAS } from '@/data/personas';

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
  const [activeTab, setActiveTab] = useState<'content' | 'personas' | 'algo'>('content');

  const platforms: { id: Platform; label: string; icon: React.ReactNode }[] = [
    { id: 'twitter', label: 'X / Twitter', icon: <Share2 className="w-3.5 h-3.5" /> },
    { id: 'tiktok', label: 'TikTok', icon: <Music2 className="w-3.5 h-3.5 text-pink-400" /> },
    { id: 'youtube', label: 'YouTube', icon: <PlaySquare className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Briefcase className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'instagram', label: 'Instagram', icon: <Camera className="w-3.5 h-3.5 text-purple-400" /> },
  ];

  const contentTypes: { id: ContentType; label: string; icon: React.ReactNode }[] = [
    { id: 'video', label: 'Video Short', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'script', label: 'Script', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'caption', label: 'Caption', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'tweet', label: 'Post / Tweet', icon: <Send className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-[360px] xl:w-[400px] shrink-0 border-r border-white/10 glass-panel flex flex-col h-[calc(100vh-4rem)] z-20">
      {/* Top Tab Selector */}
      <div className="flex border-b border-white/10 p-2 bg-zinc-950/40">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'content'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Content Studio</span>
        </button>
        <button
          onClick={() => setActiveTab('personas')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'personas'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4 text-pink-400" />
          <span>Personas ({selectedPersonas.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('algo')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'algo'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-400" />
          <span>Algorithm</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === 'content' && (
          <>
            {/* Target Platform Selection */}
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Target Platform</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map((p) => {
                  const isSelected = content.platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onChangeContent({ platform: p.id })}
                      className={`px-2.5 py-2.5 rounded-xl text-xs font-medium border text-center transition-all flex items-center justify-center space-x-1.5 ${
                        isSelected
                          ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/60 shadow-md shadow-indigo-600/20 font-bold'
                          : 'bg-zinc-900/70 text-zinc-400 border-white/5 hover:bg-zinc-800/80 hover:text-zinc-200'
                      }`}
                    >
                      {p.icon}
                      <span className="truncate">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Format Tabs */}
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
                <Video className="w-3.5 h-3.5 text-pink-400" />
                <span>Content Format</span>
              </label>
              <div className="grid grid-cols-2 gap-2 bg-zinc-950/70 p-1.5 rounded-2xl border border-white/10">
                {contentTypes.map((type) => {
                  const isSelected = content.contentType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => onChangeContent({ contentType: type.id })}
                      className={`py-2 px-3 text-xs font-medium rounded-xl transition-all flex items-center justify-center space-x-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md font-bold border border-indigo-400/30'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                      }`}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Upload / Video Dropzone */}
            {content.contentType === 'video' && (
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Video Preview Simulation</span>
                </label>
                <div className="relative group border-2 border-dashed border-white/15 hover:border-indigo-500/50 rounded-2xl p-3.5 bg-zinc-950/60 transition-all text-center overflow-hidden">
                  {content.mediaFileUrl ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                      <img
                        src={content.mediaFileUrl}
                        alt="Content Preview"
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-3 text-left">
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-600 text-white font-bold mb-1 inline-flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-indigo-200" />
                            <span>SIMULATION MEDIA READY</span>
                          </span>
                          <p className="text-xs text-white font-bold line-clamp-1">
                            {content.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-zinc-300 font-medium">
                        Drag & Drop video file here or click to upload
                      </p>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        MP4, MOV, WEBM (Max 100MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Text / Script Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Script / Hook Payload</span>
                </label>
                <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {content.contentBody.length} chars
                </span>
              </div>
              <textarea
                value={content.contentBody}
                onChange={(e) => onChangeContent({ contentBody: e.target.value })}
                rows={7}
                className="w-full rounded-2xl p-3.5 text-xs font-mono bg-zinc-950/90 border border-white/15 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all resize-none leading-relaxed"
                placeholder="Paste your video script, caption, or tweet hook here..."
              />
            </div>

            {/* AI Hook Strength Detector */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-purple-950/30 border border-indigo-500/30 flex items-start space-x-3">
              <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 fill-indigo-400" />
              <div>
                <span className="text-xs font-bold text-indigo-200 block">
                  AI Hook Detector
                </span>
                <p className="text-[11px] text-indigo-300/80 leading-snug mt-0.5">
                  "Most creators publish content blindly..." detected as high-curiosity opening pattern.
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'personas' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">
                Active AI Audience Entities
              </span>
              <span className="text-[11px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {selectedPersonas.length} / {PERSONAS.length} Enabled
              </span>
            </div>

            <div className="space-y-2">
              {PERSONAS.map((persona) => {
                const isSelected = selectedPersonas.includes(persona.id);
                return (
                  <div
                    key={persona.id}
                    onClick={() => onTogglePersona(persona.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-zinc-900/80 border-indigo-500/50 shadow-sm'
                        : 'bg-zinc-950/40 border-white/5 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm border border-white/10"
                        style={{ backgroundColor: `${persona.color}25` }}
                      >
                        {persona.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-white">
                            {persona.name}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {persona.handle}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">
                          {persona.role}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-600 text-white'
                          : 'border-zinc-700 bg-transparent'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'algo' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-300 font-medium flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>For You Feed Algorithm Bias</span>
                </span>
                <span className="text-xs font-mono text-indigo-400 font-bold">High Retention</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full accent-indigo-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>Raw Engagement</span>
                <span>Watch Time Retention</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-300 font-medium flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Viral Cascade Sensitivity</span>
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">Top 5% Multiplier</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="85"
                className="w-full accent-emerald-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>Linear Spread</span>
                <span>Exponential Wave</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Simulation Environment Rules</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                The virtual network simulates 100 sub-agents across 4 distribution tiers. Early retention in the first 8 seconds determines algorithm amplification tier.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Run Simulation Trigger Button */}
      <div className="p-4 border-t border-white/10 bg-zinc-950/80">
        <button
          onClick={onRunSimulation}
          className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-[0.98] ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-indigo-600/30 border border-indigo-400/30'
          }`}
        >
          <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Simulating Social World...' : 'Simulate Audience World'}</span>
        </button>
      </div>
    </div>
  );
};
