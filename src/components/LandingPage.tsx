'use client';

import React from 'react';
import { PrismaLandingPage } from './PrismaLandingPage';

interface LandingPageProps {
  onLaunchPlatform?: () => void;
  onOpenAtlas?: () => void;
  onOpenWorkspace?: () => void;
}

export function LandingPage({ onLaunchPlatform }: LandingPageProps) {
  return <PrismaLandingPage />;
}

export { PrismaLandingPage };
