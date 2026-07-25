'use client';

import React from 'react';
import { PrismaLandingPage } from './PrismaLandingPage';

interface LandingPageProps {
  onLaunchPlatform?: () => void;
  onOpenAtlas?: () => void;
  onOpenWorkspace?: () => void;
}

export function LandingPage({ onLaunchPlatform, onOpenAtlas, onOpenWorkspace }: LandingPageProps) {
  return (
    <PrismaLandingPage
      onLaunchPlatform={onLaunchPlatform}
      onOpenAtlas={onOpenAtlas}
      onOpenWorkspace={onOpenWorkspace}
    />
  );
}

export { PrismaLandingPage };
