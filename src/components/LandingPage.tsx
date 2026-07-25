'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Globe, ArrowRight, Share2, MessageSquare } from 'lucide-react';

interface LandingPageProps {
  onLaunchPlatform: () => void;
  onOpenAtlas?: () => void;
  onOpenWorkspace?: () => void;
}

export function LandingPage({ onLaunchPlatform, onOpenAtlas, onOpenWorkspace }: LandingPageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opacity, setOpacity] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  // Fade animation helper
  const fadeTo = (targetOpacity: number, duration: number, onComplete?: () => void) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const startOpacity = opacity;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startOpacity + (targetOpacity - startOpacity) * progress;
      setOpacity(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        animFrameRef.current = null;
        if (onComplete) onComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  // Video looping and custom requestAnimationFrame fade logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.play().catch(() => {});
      fadeTo(1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const timeRemaining = video.duration - video.currentTime;

      if (timeRemaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      setOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          fadingOutRef.current = false;
          video.play().catch(() => {});
          fadeTo(1, 500);
        }
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Initial play trigger if ready
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col justify-between text-white selection:bg-white/20 selection:text-white">
      {/* Full-Screen Looping Background Video shifted 17% down */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%] pointer-events-none z-0"
        style={{ opacity }}
      />

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-0" />

      {/* Navigation Bar */}
      <header className="relative z-20 pl-6 pr-6 py-6 w-full">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          {/* Left Side: Logo area */}
          <div className="flex items-center gap-8">
            <button
              onClick={onLaunchPlatform}
              className="flex items-center gap-2 text-white font-semibold text-lg cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Globe className="w-6 h-6 text-white" />
              <span>Social World Simulator</span>
            </button>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-white/80 hover:text-white transition-colors text-sm font-medium">
              <button onClick={onLaunchPlatform} className="hover:text-white transition-colors cursor-pointer">
                Features
              </button>
              <button onClick={onOpenWorkspace} className="hover:text-white transition-colors cursor-pointer">
                Pricing
              </button>
              <button onClick={onOpenAtlas} className="hover:text-white transition-colors cursor-pointer">
                About
              </button>
            </nav>
          </div>

          {/* Right Side: Sign Up & Login */}
          <div className="flex items-center gap-4">
            <button
              onClick={onLaunchPlatform}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer px-2 py-1"
            >
              Sign Up
            </button>
            <button
              onClick={onLaunchPlatform}
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        {/* Heading in Instrument Serif */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        {/* Max-w-xl w-full container */}
        <div className="max-w-xl w-full space-y-4">
          {/* Email Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLaunchPlatform();
            }}
            className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 w-full"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/40 text-base"
              required
            />
            <button
              type="submit"
              aria-label="Submit email"
              className="bg-white rounded-full p-3 text-black hover:bg-zinc-200 transition-colors flex items-center justify-center cursor-pointer shrink-0"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Subtitle */}
          <p className="text-white text-sm leading-relaxed px-4">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          {/* Manifesto Button */}
          <div className="pt-2">
            <button
              onClick={onLaunchPlatform}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              Explore Platform Studio
            </button>
          </div>
        </div>
      </main>

      {/* Social Icons Footer */}
      <footer className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <button
          onClick={onLaunchPlatform}
          aria-label="Social World Simulator"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <Globe className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
