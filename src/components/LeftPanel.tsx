'use client';

import React, { useState } from 'react';
import {
  Upload,
  Play,
  Sliders,
  Users,
  FileText,
  Check,
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
  const [activeTab, setActiveTab] = useState<'setup' | 'personas' | 'settings'>('setup');

  const platforms: { id: Platform; label: string }[] = [
    { id: 'twitter', label: 'X / Twitter' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'linkedin', label: 'LinkedIn' },
  ];

  return (
    <div className="w-[340px] shrink-0 border-r border-white/[0.06] glass-panel rounded-none border-t-0 border-b-0 border-l-0 flex flex-col h-[calc(100vh-3.5rem)] z-20">
      {/* Top Tab Bar */}
      <div className="flex border-b border-white/[0.06] p-2 bg-zinc-950/40">
        <button
          onClick={() => setActiveTab('setup')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'setup'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Studio Setup
        </button>
        <button
          onClick={() => setActiveTab('personas')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'personas'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Personas ({selectedPersonas.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'settings'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Main Form Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === 'setup' && (
          <>
            {/* Upload Zone */}
            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">
                Content Media
              </span>
              <div className="border border-dashed border-white/10 hover:border-purple-500/40 rounded-2xl p-4 bg-zinc-950/60 transition-all text-center group cursor-pointer">
                {content.mediaFileUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                    <img
                      src={content.mediaFileUrl}
                      alt="Preview"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-xs text-white font-medium line-clamp-1">
                        {content.title}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-5 h-5 text-purple-400" />
                    <p className="text-xs text-zinc-300 font-medium">
                      Upload video, image or script file
                    </p>
                    <span className="text-[11px] text-zinc-500">
                      MP4, MOV, TXT up to 100MB
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Platform Selector Pills */}
            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">
                Target Platform
              </span>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((p) => {
                  const isSelected = content.platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onChangeContent({ platform: p.id })}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
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

            {/* Script Text Payload */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-300">
                  Hook & Script Text
                </span>
                <span className="text-xs text-zinc-500">
                  {content.contentBody.length} chars
                </span>
              </div>
              <textarea
                value={content.contentBody}
                onChange={(e) => onChangeContent({ contentBody: e.target.value })}
                rows={6}
                className="w-full rounded-2xl p-3.5 text-xs font-mono bg-zinc-950/80 border border-white/10 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition-all resize-none leading-relaxed"
                placeholder="Paste script or post hook here..."
              />
            </div>
          </>
        )}

        {activeTab === 'personas' && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 block mb-2">
              Virtual Audience Cohorts
            </span>
            {PERSONAS.map((persona) => {
              const isSelected = selectedPersonas.includes(persona.id);
              return (
                <div
                  key={persona.id}
                  onClick={() => onTogglePersona(persona.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-zinc-900/80 border-purple-500/40'
                      : 'bg-zinc-950/40 border-white/[0.04] opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{persona.avatar}</span>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {persona.name}
                      </span>
                      <span className="text-xs text-zinc-400">
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
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">
                Algorithm Retention Weight
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
          <span>{isRunning ? 'SIMULATING WORLD...' : 'START SIMULATION'}</span>
        </button>
      </div>
    </div>
  );
};
