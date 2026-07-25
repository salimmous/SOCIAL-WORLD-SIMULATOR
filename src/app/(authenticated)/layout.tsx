'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { PRESET_SCENARIOS } from '@/data/presets';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-[#DEDBC8] flex items-center justify-center font-mono text-xs">
        <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#111111] border border-white/10">
          <span className="w-3 h-3 rounded-full bg-[#DEDBC8] animate-ping" />
          <span>Authenticating Enterprise Session...</span>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-zinc-950 flex flex-col font-sans">
      <Header
        currentPreset={PRESET_SCENARIOS[0]}
        onSelectPreset={() => {}}
        onReset={() => {}}
        onApplyFixes={() => {}}
        appliedFixes={false}
        onOpenHistory={() => router.push('/simulations')}
        historyCount={4}
        onNewProject={() => router.push('/platform')}
        onOpenAuthModal={() => router.push('/settings')}
        onOpenAIWorkspace={() => router.push('/workspace')}
        onOpenSettings={() => router.push('/settings')}
        onOpenExport={() => router.push('/platform')}
        onOpenHelp={() => router.push('/documentation')}
        onOpenAtlas={() => router.push('/documentation')}
        onOpenFeedMockup={() => router.push('/platform')}
        onOpenPersonas={() => router.push('/personas')}
        onLogout={logout}
      />

      <main className="flex-1 flex overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}
