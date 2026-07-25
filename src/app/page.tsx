'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { LeftPanel } from '@/components/LeftPanel';
import { SocialWorldCanvas } from '@/components/SocialWorldCanvas';
import { RightPanel } from '@/components/RightPanel';
import { PRESET_SCENARIOS } from '@/data/presets';
import { PERSONAS } from '@/data/personas';
import { PresetScenario, ContentInput } from '@/types/simulator';
import { runSimulationEngine, GeneratedSimulationData } from '@/services/simulatorEngine';

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState<PresetScenario>(PRESET_SCENARIOS[0]);
  const [content, setContent] = useState<ContentInput>({
    title: currentPreset.title,
    contentType: currentPreset.contentType,
    platform: currentPreset.platform,
    contentBody: currentPreset.sampleText,
    mediaFileUrl: currentPreset.mediaPreview,
    targetAudience: 'Tech & Gen Z Creators',
  });

  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(
    PERSONAS.map((p) => p.id)
  );

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [appliedFixes, setAppliedFixes] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Compute simulation data
  const [simData, setSimData] = useState<GeneratedSimulationData>(() =>
    runSimulationEngine(content, false)
  );

  // Handle Preset Switching
  const handleSelectPreset = (preset: PresetScenario) => {
    setCurrentPreset(preset);
    const nextContent = {
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

  // Trigger NVIDIA AI Simulation API Call
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

      if (res.ok) {
        const aiResult = await res.json();
        const baseData = runSimulationEngine(content, appliedFixes);

        // Merge NVIDIA AI generated metrics, comments, and recommendations
        if (aiResult.metrics) baseData.metrics = { ...baseData.metrics, ...aiResult.metrics };
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

        setSimData(baseData);
      }
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
      />

      {/* Main 70/30 Hero Layout Interface */}
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

        {/* Center Hero living Social World Canvas (70% viewport width) */}
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

        {/* Right Intelligence Accordion Panel (30% viewport width) */}
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
