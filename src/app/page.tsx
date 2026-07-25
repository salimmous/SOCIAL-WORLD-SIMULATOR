'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { LeftPanel } from '@/components/LeftPanel';
import { SocialWorldCanvas } from '@/components/SocialWorldCanvas';
import { RightPanel } from '@/components/RightPanel';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { AuthModal } from '@/components/AuthModal';
import { AIWorkspaceModal } from '@/components/AIWorkspaceModal';
import { ABComparisonModal } from '@/components/ABComparisonModal';
import { PreFlightAuditReportModal } from '@/components/PreFlightAuditReportModal';
import { CinematicPipelineModal } from '@/components/CinematicPipelineModal';
import { MobileAppLayout } from '@/components/MobileAppLayout';
import { AICopilotWidget } from '@/components/AICopilotWidget';
import { PersonaModal } from '@/components/PersonaModal';
import { SettingsModal } from '@/components/SettingsModal';
import { ExportModal } from '@/components/ExportModal';
import { CommandPaletteModal } from '@/components/CommandPaletteModal';
import { OnboardingTourModal } from '@/components/OnboardingTourModal';
import { AppleOnboardingModal } from '@/components/AppleOnboardingModal';
import { GettingStartedChecklist } from '@/components/GettingStartedChecklist';
import { FeatureDocDrawer, FeatureDocData } from '@/components/FeatureDocDrawer';
import { HelpCenterModal } from '@/components/HelpCenterModal';
import { ProductCoachSpotlight } from '@/components/ProductCoachSpotlight';
import { PRESET_SCENARIOS } from '@/data/presets';
import { PERSONAS } from '@/data/personas';
import { PresetScenario, ContentInput, NetworkNode } from '@/types/simulator';
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

  // History Drawer & Auth Modal & Practical Feature States
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSponsorsOpen, setIsSponsorsOpen] = useState<boolean>(false);
  const [isABOpen, setIsABOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isPipelineLoading, setIsPipelineLoading] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isCmdKOpen, setIsCmdKOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState<boolean>(false);
  const [isCoachActive, setIsCoachActive] = useState<boolean>(false);
  const [selectedFeatureDoc, setSelectedFeatureDoc] = useState<FeatureDocData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);

  // Global Keyboard Shortcuts (Space, R, C, E, CMD+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsRunning((prev) => !prev);
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setCurrentTime(0);
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsABOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsExportOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check First-Time Onboarding
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeen) {
      setIsOnboardingOpen(true);
    }
  }, []);

  // Demo Project Mode Trigger
  const handleStartDemoProject = () => {
    const demo = PRESET_SCENARIOS[0];
    setCurrentPreset(demo);
    setContent({
      title: demo.title,
      contentType: 'video',
      platform: demo.platform,
      targetAudience: demo.tags.join(', '),
      contentBody: demo.sampleText,
      mediaFileUrl: demo.mediaPreview,
    });
    setAppliedFixes(true);
    setIsRunning(true);
  };

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
    setIsPipelineLoading(true);
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
    <div className="min-h-screen w-screen overflow-hidden bg-zinc-950">
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

      {/* AI Workspace Infrastructure Dashboard Modal */}
      <AIWorkspaceModal
        isOpen={isSponsorsOpen}
        onClose={() => setIsSponsorsOpen(false)}
        scriptText={content.contentBody}
      />

      {/* A/B Test Comparison Modal */}
      <ABComparisonModal
        isOpen={isABOpen}
        onClose={() => setIsABOpen(false)}
        originalMetrics={simData.metrics}
        onApplyFixes={handleApplyFixes}
        appliedFixes={appliedFixes}
      />

      {/* Pre-Flight Audit Executive Report Modal */}
      <PreFlightAuditReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        content={content}
        metrics={simData.metrics}
        appliedFixes={appliedFixes}
      />

      {/* Enterprise Export Suite Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        content={content}
        simData={simData}
      />

      {/* Global AI Engine Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        speed={speed}
        onChangeSpeed={(s) => setSpeed(s)}
      />

      {/* Linear-Style ⌘K Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
        onRunSimulation={handleRunSimulation}
        onApplyFixes={handleApplyFixes}
        onOpenABModal={() => setIsABOpen(true)}
        onOpenReportModal={() => setIsReportOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        onOpenSponsorsModal={() => setIsSponsorsOpen(true)}
        onExplainPage={() => setIsCoachActive(true)}
      />

      {/* Apple-Quality Guided Onboarding Tour Modal */}
      <AppleOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartDemo={handleStartDemoProject}
      />

      {/* Floating Getting Started Progress Checklist */}
      <GettingStartedChecklist
        hasRunSim={simData.metrics.viralityScore > 0}
        hasAppliedFix={appliedFixes}
        onOpenTour={() => setIsOnboardingOpen(true)}
      />

      {/* Cinematic AI Pipeline Loading Modal */}
      <CinematicPipelineModal
        isOpen={isPipelineLoading}
        onComplete={() => {
          setIsPipelineLoading(false);
          setIsRunning(true);
        }}
      />

      {/* Floating AI Copilot Widget */}
      <AICopilotWidget
        currentTime={currentTime}
        duration={duration}
        onApplyFixes={handleApplyFixes}
        appliedFixes={appliedFixes}
      />

      {/* Persona AI Reasoning Bottom Sheet Modal */}
      <PersonaModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {/* Enterprise Help Center & Platform Docs Modal */}
      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        onReplayTour={() => setIsOnboardingOpen(true)}
      />

      {/* Interactive Feature Documentation Drawer */}
      <FeatureDocDrawer
        doc={selectedFeatureDoc}
        onClose={() => setSelectedFeatureDoc(null)}
      />

      {/* In-Product Coach Spotlight Component */}
      <ProductCoachSpotlight
        isActive={isCoachActive}
        onClose={() => setIsCoachActive(false)}
        onStartDemo={handleStartDemoProject}
      />

      {/* MOBILE NATIVE APP EXPERIENCE (block md:hidden) */}
      <div className="block md:hidden w-full h-full">
        <MobileAppLayout
          content={content}
          onChangeContent={handleChangeContent}
          onRunSimulation={handleRunSimulation}
          isRunning={isRunning}
          onTogglePlay={() => setIsRunning(!isRunning)}
          onReset={() => setCurrentTime(0)}
          simData={simData}
          currentTime={currentTime}
          duration={duration}
          speed={speed}
          onChangeSpeed={(s) => setSpeed(s)}
          onSeek={(t) => setCurrentTime(t)}
          appliedFixes={appliedFixes}
          onApplyFixes={handleApplyFixes}
          onOpenSponsors={() => setIsSponsorsOpen(true)}
          onOpenABModal={() => setIsABOpen(true)}
          onOpenReportModal={() => setIsReportOpen(true)}
          onSelectPreset={handleSelectPreset}
        />
      </div>

      {/* DESKTOP SUITE INTERFACE (hidden md:flex) */}
      <div className="hidden md:flex flex-col min-h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
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
          onOpenSponsors={() => setIsSponsorsOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
          onOpenHelp={() => setIsHelpCenterOpen(true)}
        />

        {/* Main Desktop 3-Panel Hero Interface */}
        <div className="flex-1 flex overflow-hidden">
          <LeftPanel
            content={content}
            onChangeContent={handleChangeContent}
            selectedPersonas={selectedPersonas}
            onTogglePersona={handleTogglePersona}
            onRunSimulation={handleRunSimulation}
            isRunning={isRunning || isAiLoading}
          />

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
            onSelectNode={(node) => setSelectedNode(node)}
          />

          <RightPanel
            metrics={simData.metrics}
            retentionTimeline={simData.retentionTimeline}
            comments={simData.comments}
            recommendations={simData.recommendations}
            currentTime={currentTime}
            onSeek={(t) => setCurrentTime(t)}
            onApplyFixes={handleApplyFixes}
            appliedFixes={appliedFixes}
            onOpenABModal={() => setIsABOpen(true)}
            onOpenReportModal={() => setIsReportOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}
