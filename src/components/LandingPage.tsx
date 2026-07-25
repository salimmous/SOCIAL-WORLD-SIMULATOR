'use client';

import React from 'react';
import { PrismaLandingPage } from './PrismaLandingPage';

interface LandingPageProps {
  onLaunchPlatform?: () => void;
  onOpenAtlas?: () => void;
  onOpenWorkspace?: () => void;
  onOpenAuthModal?: () => void;
}

export function LandingPage({
  onLaunchPlatform,
  onOpenAtlas,
  onOpenWorkspace,
  onOpenAuthModal,
}: LandingPageProps) {
  return (
    <PrismaLandingPage
      onLaunchPlatform={onLaunchPlatform}
      onOpenAtlas={onOpenAtlas}
      onOpenWorkspace={onOpenWorkspace}
      onOpenAuthModal={onOpenAuthModal}
    />
  );
}

export { PrismaLandingPage };
