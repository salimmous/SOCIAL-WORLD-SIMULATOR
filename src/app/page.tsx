'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PrismaLandingPage } from '@/components/PrismaLandingPage';

export default function PublicLandingPage() {
  const router = useRouter();

  return (
    <PrismaLandingPage
      onLaunchPlatform={() => router.push('/login')}
      onOpenAtlas={() => router.push('/login')}
      onOpenWorkspace={() => router.push('/login')}
      onOpenAuthModal={() => router.push('/login')}
    />
  );
}
