'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { LeftPanel } from '@/components/LeftPanel';
import { SocialWorldCanvas } from '@/components/SocialWorldCanvas';
import { RightPanel } from '@/components/RightPanel';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { AuthModal } from '@/components/AuthModal';
import { PRESET_SCENARIOS } from '@/data/presets';
import { PERSONAS } from '@/data/personas';
import { PresetScenario, ContentInput } from '@/types/simulator';
import { runSimulationEngine, GeneratedSimulationData } from '@/services/simulatorEngine';
import {
  SavedProject,
  getSavedProjects,
  saveProjectToHistory,
} from '@/services/historyStore';

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState<PresetScenario>(PRESET_SCENARIOS[0]);
  const [content, setContent] = useState<ContentInput>({
    title: 'New Simulation Project',
    contentType: 'video',
    platform: 'tiktok',
    contentBody: '',
    mediaFileUrl: undefined,
    targetAudience: 'General Audience',
  });

  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(
    PERSONAS.map((p) => p.id)
  );

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [appliedFixes, setAppliedFixes] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // History Drawer & Auth Modal State
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);

  useEffect(() => {
    setSavedProjects(getSavedProjects());
  }, []);

  // Compute simulation data
  const [simData, setSimData] = useState<GeneratedSimulationData>(() =>
    runSimulationEngine(content, false)
  );

  // Clean New Project Reset
  const handleNewProject = () => {
    const cleanContent: ContentInput = {
      title: 'New Simulation Project',
      contentType: 'video',
      platform: 'tiktok',
      contentBody: '',
      mediaFileUrl: undefined,
      targetAudience: 'General Audience',
      videoIntelligence: undefined,
    };
    setContent(cleanContent);
    setCurrentTime(0);
    setIsRunning(false);
    setAppliedFixes(false);
    setSimData(runSimulationEngine(cleanContent, false));
  };

  // Select Saved Project from History
  const handleSelectSavedProject = (proj: SavedProject) => {
    const restoredContent: ContentInput = {
      title: proj.title,
      contentType: 'video',
      platform: proj.platform,
      contentBody: proj.contentBody,
      mediaFileUrl: proj.mediaUrl,
      targetAudience: 'General Audience',
      videoIntelligence: proj.intel,
    };
    setContent(restoredContent);
    setCurrentTime(0);
    setIsRunning(true);
    setAppliedFixes(false);
    setSimData(runSimulationEngine(restoredContent, false));
  };

  // Handle Preset Switching
  const handleSelectPreset = (preset: PresetScenario) => {
    setCurrentPreset(preset);
    const nextContent: ContentInput = {
      title: preset.title,
      contentType: preset.contentType,
      platform: preset.platform,
      contentBody: preset.sampleText,
      mediaFileUrl: preset.mediaPreview,
      targetAudience: 'Tech & Gen Z Creators',
    };
    setContent(nextContent);
    setCurrentTime(0);
    setIsRunning(true);
    setAppliedFixes(false);
    setSimData(runSimulationEngine(nextContent, false));
  };

  // Handle Content Updates
  const handleChangeContent = (updated: Partial<ContentInput>) => {
    const nextContent = { ...content, ...updated };
    setContent(nextContent);
    setSimData(runSimulationEngine(nextContent, appliedFixes));
  };

  // Handle Toggling Persona
  const handleTogglePersona = (id: string) => {
    setSelectedPersonas((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  // Trigger NVIDIA AI Simulation API Call & Auto-Save Project to History
  const handleRunSimulation = async () => {
    setCurrentTime(0);
    setIsRunning(true);
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      let finalMetrics = simData.metrics;

      if (res.ok) {
        const aiResult = await res.json();
        const baseData = runSimulationEngine(content, appliedFixes);

        if (aiResult.metrics) {
          baseData.metrics = { ...baseData.metrics, ...aiResult.metrics };
          finalMetrics = baseData.metrics;
        }
        if (aiResult.comments && Array.isArray(aiResult.comments)) {
          baseData.comments = aiResult.comments.map((c: any, idx: number) => ({
            ...c,
            id: `ai-comment-${idx}`,
            timeFormatted: `0:${(c.timestamp || 10).toString().padStart(2, '0')}`,
          }));
        }
        if (aiResult.recommendations && Array.isArray(aiResult.recommendations)) {
          baseData.recommendations = aiResult.recommendations.map((r: any) => ({
            ...r,
            applied: appliedFixes,
          }));
        }
        if (aiResult.transcriptHighlights && Array.isArray(aiResult.transcriptHighlights)) {
          setContent(prev => ({
            ...prev,
            videoIntelligence: prev.videoIntelligence ? {
              ...prev.videoIntelligence,
              transcriptHighlights: aiResult.transcriptHighlights
            } : undefined
          }));
        }

        setSimData(baseData);
      }

      // Save project run to history
      saveProjectToHistory({
        title: content.title || 'Untitled Simulation',
        platform: content.platform,
        viralityScore: finalMetrics.viralityScore,
        estimatedReach: finalMetrics.estimatedReach,
        mediaUrl: content.mediaFileUrl,
        contentBody: content.contentBody || 'Simulation script payload',
        intel: content.videoIntelligence,
      });

      setSavedProjects(getSavedProjects());
    } catch (err) {
      console.warn('NVIDIA AI API call error, fallback to local engine:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle Applying AI Recommendations
  const handleApplyFixes = () => {
    setAppliedFixes(true);
    setSimData(runSimulationEngine(content, true));
    setCurrentTime(0);
    setIsRunning(true);
  };

  // Simulation Timeline Tick Loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsRunning(false);
          return duration;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, duration]);

  // Compute stage based on current time
  const stage: 1 | 2 | 3 | 4 =
    currentTime < 10 ? 1 : currentTime < 25 ? 2 : currentTime < 45 ? 3 : 4;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header */}
      <Header
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        onReset={() => setCurrentTime(0)}
        onApplyFixes={handleApplyFixes}
        appliedFixes={appliedFixes}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={savedProjects.length}
        onNewProject={handleNewProject}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* History Slide-over Drawer Modal */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        projects={savedProjects}
        onSelectProject={handleSelectSavedProject}
        onNewProject={handleNewProject}
        onUpdateProjects={(updated) => setSavedProjects(updated)}
      />

      {/* Auth & Social OAuth Accounts Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Main Hero Layout Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Left Setup Drawer */}
        <LeftPanel
          content={content}
          onChangeContent={handleChangeContent}
          selectedPersonas={selectedPersonas}
          onTogglePersona={handleTogglePersona}
          onRunSimulation={handleRunSimulation}
          isRunning={isRunning || isAiLoading}
        />

        {/* Center Hero living Social World Canvas */}
        <SocialWorldCanvas
          nodes={simData.nodes}
          edges={simData.edges}
          currentTime={currentTime}
          duration={duration}
          isRunning={isRunning}
          onTogglePlay={() => setIsRunning(!isRunning)}
          onSeek={(t) => setCurrentTime(t)}
          speed={speed}
          onChangeSpeed={(s) => setSpeed(s)}
          activeComments={simData.comments}
          stage={stage}
        />

        {/* Right Intelligence Accordion Panel */}
        <RightPanel
          metrics={simData.metrics}
          retentionTimeline={simData.retentionTimeline}
          comments={simData.comments}
          recommendations={simData.recommendations}
          currentTime={currentTime}
          onSeek={(t) => setCurrentTime(t)}
          onApplyFixes={handleApplyFixes}
          appliedFixes={appliedFixes}
        />
      </div>
    </div>
  );
}
