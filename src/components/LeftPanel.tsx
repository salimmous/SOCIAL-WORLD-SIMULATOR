'use client';

import React, { useState } from 'react';
import {
  Upload,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { ContentType, Platform, ContentInput } from '@/types/simulator';
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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'platform' | 'audience' | 'settings'>('upload');

  const platforms: { id: Platform; label: string }[] = [
    { id: 'twitter', label: 'X / Twitter' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'linkedin', label: 'LinkedIn' },
  ];

  if (isCollapsed) {
    return (
      <div className="w-12 shrink-0 border-r border-white/[0.06] glass-panel rounded-none border-t-0 border-b-0 border-l-0 flex flex-col items-center py-4 justify-between z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-all cursor-pointer"
          title="Expand Setup Drawer"
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
      {/* Top Drawer Header & Collapse Toggle */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-zinc-950/40">
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          Simulation Studio
        </span>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
          title="Collapse Setup"
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
          Upload
        </button>
        <button
          onClick={() => setActiveTab('platform')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === 'platform'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Platform
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
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === 'settings'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Main Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">
                Media & Content File
              </span>
              <div className="border border-dashed border-white/10 hover:border-purple-500/40 rounded-2xl p-4 bg-zinc-950/60 transition-all text-center group cursor-pointer">
                {content.mediaFileUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                    <img
                      src={content.mediaFileUrl}
                      alt="Preview"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs text-white font-medium line-clamp-1">
                        {content.title}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-5 flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-5 h-5 text-purple-400" />
                    <p className="text-xs text-zinc-300 font-medium">
                      Upload video, image or script
                    </p>
                    <span className="text-[10px] text-zinc-500">
                      MP4, MOV, TXT up to 100MB
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-300">
                  Hook & Script Text
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {content.contentBody.length} chars
                </span>
              </div>
              <textarea
                value={content.contentBody}
                onChange={(e) => onChangeContent({ contentBody: e.target.value })}
                rows={6}
                className="w-full rounded-2xl p-3 text-xs font-mono bg-zinc-950/80 border border-white/10 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition-all resize-none leading-relaxed"
                placeholder="Paste script or post hook here..."
              />
            </div>
          </div>
        )}

        {activeTab === 'platform' && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-300 block">
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
        )}

        {activeTab === 'audience' && (
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
                    <span className="text-base">{persona.avatar}</span>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {persona.name}
                      </span>
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

        {activeTab === 'settings' && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">
                Algorithm Retention Bias
              </span>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full accent-purple-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">
                Viral Cascade Threshold
              </span>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="85"
                className="w-full accent-purple-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
            </div>
          </div>
        )}
      </div>

      {/* THE ONE PRIMARY CTA BUTTON */}
      <div className="p-4 border-t border-white/[0.06] bg-zinc-950/60">
        <button
          onClick={onRunSimulation}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center space-x-2.5 active:scale-[0.98] cursor-pointer border border-purple-400/30"
        >
          <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'SIMULATING...' : '▶ START SIMULATION'}</span>
        </button>
      </div>
    </div>
  );
};
