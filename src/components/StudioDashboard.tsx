'use client';

import React, { useState, useEffect } from 'react';
import { LeftPanel } from '@/components/LeftPanel';
import { SocialWorldCanvas } from '@/components/SocialWorldCanvas';
import { RightPanel } from '@/components/RightPanel';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { AIWorkspaceModal } from '@/components/AIWorkspaceModal';
import { ABComparisonModal } from '@/components/ABComparisonModal';
import { PreFlightAuditReportModal } from '@/components/PreFlightAuditReportModal';
import { MobileAppLayout } from '@/components/MobileAppLayout';
import { AICopilotWidget } from '@/components/AICopilotWidget';
import { PersonaModal } from '@/components/PersonaModal';
import { SettingsModal } from '@/components/SettingsModal';
import { ExportModal } from '@/components/ExportModal';
import { CommandPaletteModal } from '@/components/CommandPaletteModal';
import { FeatureDocDrawer, FeatureDocData } from '@/components/FeatureDocDrawer';
import { HelpCenterModal } from '@/components/HelpCenterModal';
import { AtlasProductGuideDrawer } from '@/components/AtlasProductGuideDrawer';
import { SecretsDrawer } from '@/components/SecretsDrawer';
import { LiveSystemLogsModal } from '@/components/LiveSystemLogsModal';
import { LiveSocialFeedMockupModal } from '@/components/LiveSocialFeedMockupModal';
import { PRESET_SCENARIOS } from '@/data/presets';
import { PERSONAS } from '@/data/personas';
import { PresetScenario, ContentInput, NetworkNode } from '@/types/simulator';
import { runSimulationEngine, GeneratedSimulationData } from '@/services/simulatorEngine';
import {
  SavedProject,
  getSavedProjects,
} from '@/services/historyStore';

export function StudioDashboard() {
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

  // Drawer & Modal States
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isSponsorsOpen, setIsSponsorsOpen] = useState<boolean>(false);
  const [isSecretsOpen, setIsSecretsOpen] = useState<boolean>(false);
  const [isSystemLogsOpen, setIsSystemLogsOpen] = useState<boolean>(false);
  const [isFeedMockupOpen, setIsFeedMockupOpen] = useState<boolean>(false);
  const [isABOpen, setIsABOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isCmdKOpen, setIsCmdKOpen] = useState<boolean>(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState<boolean>(false);
  const [isAtlasOpen, setIsAtlasOpen] = useState<boolean>(false);
  const [atlasTopic, setAtlasTopic] = useState<string | null>(null);
  const [selectedFeatureDoc, setSelectedFeatureDoc] = useState<FeatureDocData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);

  // Simulation Data Calculation
  const [simData, setSimData] = useState<GeneratedSimulationData>(() =>
    runSimulationEngine(content, appliedFixes)
  );

  useEffect(() => {
    setSimData(runSimulationEngine(content, appliedFixes));
    setCurrentTime(0);
  }, [content, appliedFixes]);

  useEffect(() => {
    setSavedProjects(getSavedProjects());
  }, []);

  const handleChangeContent = (updated: Partial<ContentInput>) => {
    setContent((prev) => ({ ...prev, ...updated }));
  };

  const handleTogglePersona = (personaId: string) => {
    setSelectedPersonas((prev) =>
      prev.includes(personaId)
        ? prev.filter((id) => id !== personaId)
        : [...prev, personaId]
    );
  };

  const handleApplyFixes = () => {
    setAppliedFixes(true);
    setCurrentTime(0);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsRunning(false);
    setAppliedFixes(false);
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setCurrentPreset(preset);
    setContent({
      title: preset.title,
      contentType: preset.contentType,
      platform: preset.platform,
      contentBody: preset.description,
      targetAudience: 'General Audience',
    });
    setAppliedFixes(false);
    setCurrentTime(0);
    setIsRunning(false);
  };

  const handleSelectSavedProject = (proj: SavedProject) => {
    setContent({
      title: proj.title,
      contentType: 'video',
      platform: proj.platform,
      contentBody: `Loaded saved simulation project: ${proj.title}`,
      mediaFileUrl: proj.mediaUrl,
      targetAudience: 'Saved Project Audience',
    });
    setIsRunning(false);
    setCurrentTime(0);
  };

  const handleNewProject = () => {
    setContent({
      title: 'Untitled Project ' + Math.floor(Math.random() * 1000),
      contentType: 'video',
      platform: 'tiktok',
      contentBody: '',
      targetAudience: 'General Audience',
    });
    setAppliedFixes(false);
    setCurrentTime(0);
    setIsRunning(false);
  };

  // Playhead Clock Loop
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

  const stage: 1 | 2 | 3 | 4 =
    currentTime < 10 ? 1 : currentTime < 25 ? 2 : currentTime < 45 ? 3 : 4;

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* History Slide-over Drawer Modal */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        projects={savedProjects}
        onSelectProject={handleSelectSavedProject}
        onNewProject={handleNewProject}
        onUpdateProjects={(updated) => setSavedProjects(updated)}
      />

      {/* AI Workspace Infrastructure Dashboard Modal */}
      <AIWorkspaceModal
        isOpen={isSponsorsOpen}
        onClose={() => setIsSponsorsOpen(false)}
        onOpenSecrets={() => setIsSecretsOpen(true)}
        onOpenSystemLogs={() => setIsSystemLogsOpen(true)}
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
        onRunSimulation={() => setIsRunning(true)}
        onReset={handleReset}
        onApplyFixes={handleApplyFixes}
        onOpenReportModal={() => setIsReportOpen(true)}
        onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSecrets={() => setIsSecretsOpen(true)}
        onOpenSystemLogs={() => setIsSystemLogsOpen(true)}
        onOpenAIWorkspace={() => setIsSponsorsOpen(true)}
        onOpenFeedMockup={() => setIsFeedMockupOpen(true)}
      />

      {/* Interactive Feature Deep Dive Drawer */}
      <FeatureDocDrawer
        doc={selectedFeatureDoc}
        onClose={() => setSelectedFeatureDoc(null)}
      />

      {/* Help Center & Enterprise Documentation Modal */}
      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        onReplayTour={() => {}}
      />

      {/* Atlas Senior AI Mentor Product Guide Drawer */}
      <AtlasProductGuideDrawer
        isOpen={isAtlasOpen}
        onClose={() => setIsAtlasOpen(false)}
        initialTopicId={atlasTopic || 'upload'}
      />

      {/* Secrets & API Credentials Drawer */}
      <SecretsDrawer
        isOpen={isSecretsOpen}
        onClose={() => setIsSecretsOpen(false)}
      />

      {/* Live System Logs Modal */}
      <LiveSystemLogsModal
        isOpen={isSystemLogsOpen}
        onClose={() => setIsSystemLogsOpen(false)}
      />

      {/* Live Social Feed Mockup Simulator Modal */}
      <LiveSocialFeedMockupModal
        isOpen={isFeedMockupOpen}
        onClose={() => setIsFeedMockupOpen(false)}
        content={content}
        comments={simData.comments}
        appliedFixes={appliedFixes}
        onApplyFixes={handleApplyFixes}
      />

      {/* DESKTOP SUITE INTERFACE */}
      <div className="hidden md:flex flex-1 w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
        <LeftPanel
          content={content}
          onChangeContent={handleChangeContent}
          selectedPersonas={selectedPersonas}
          onTogglePersona={handleTogglePersona}
          onRunSimulation={() => setIsRunning(true)}
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
          mediaFileUrl={content.mediaFileUrl}
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

      {/* MOBILE NATIVE APP EXPERIENCE (block md:hidden) */}
      <div className="block md:hidden w-full h-full">
        <MobileAppLayout
          content={content}
          onChangeContent={handleChangeContent}
          onRunSimulation={() => setIsRunning(true)}
          isRunning={isRunning}
          onTogglePlay={() => setIsRunning(!isRunning)}
          onReset={handleReset}
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

      {/* Floating Interactive Persona Deep-Dive Inspector */}
      {selectedNode && (
        <PersonaModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* Floating AI Copilot Assistant Widget */}
      <AICopilotWidget
        currentTime={currentTime}
        duration={duration}
        onApplyFixes={handleApplyFixes}
        appliedFixes={appliedFixes}
      />
    </div>
  );
}
