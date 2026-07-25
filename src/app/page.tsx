'use client';

import React, { useState, useEffect, useRef } from 'react';
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

  // Compute simulation data
  const [simData, setSimData] = useState<GeneratedSimulationData>(() =>
    runSimulationEngine(content, false)
  );

  // Handle Preset Switching
  const handleSelectPreset = (preset: PresetScenario) => {
    setCurrentPreset(preset);
    setContent({
      title: preset.title,
      contentType: preset.contentType,
      platform: preset.platform,
      contentBody: preset.sampleText,
      mediaFileUrl: preset.mediaPreview,
      targetAudience: 'Tech & Gen Z Creators',
    });
    setCurrentTime(0);
    setIsRunning(true);
    setAppliedFixes(false);
    setSimData(
      runSimulationEngine(
        {
          title: preset.title,
          contentType: preset.contentType,
          platform: preset.platform,
          contentBody: preset.sampleText,
          mediaFileUrl: preset.mediaPreview,
          targetAudience: 'Tech & Gen Z Creators',
        },
        false
      )
    );
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

  // Handle Simulation Run Trigger
  const handleRunSimulation = () => {
    setCurrentTime(0);
    setIsRunning(true);
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
      {/* Minimal Top Header */}
      <Header
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        onReset={() => setCurrentTime(0)}
        onApplyFixes={handleApplyFixes}
        appliedFixes={appliedFixes}
      />

      {/* Main 3-Column Studio Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Content Studio & Simulator Setup */}
        <LeftPanel
          content={content}
          onChangeContent={handleChangeContent}
          selectedPersonas={selectedPersonas}
          onTogglePersona={handleTogglePersona}
          onRunSimulation={handleRunSimulation}
          isRunning={isRunning}
        />

        {/* Center Column: Live Animated Social World Canvas */}
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

        {/* Right Column: Intelligence Scores, Retention Engine & Recommendations */}
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
