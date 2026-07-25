'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

// ==========================================
// SHARED ANIMATION COMPONENTS
// ==========================================

interface WordsPullUpProps {
  text: string;
  className?: string;
  delayOffset?: number;
  showAsterisk?: boolean;
}

export function WordsPullUp({
  text,
  className = '',
  delayOffset = 0,
  showAsterisk = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <h1 ref={ref} className={`inline-flex flex-wrap justify-start ${className}`}>
      {words.map((word, wordIdx) => {
        const isLastWord = wordIdx === words.length - 1;
        return (
          <span key={wordIdx} className="inline-block overflow-hidden pb-2 mr-[0.2em] relative">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: wordIdx * 0.08 + delayOffset,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {isLastWord && showAsterisk && (
                <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-medium leading-none">
                  *
                </sup>
              )}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  containerClassName?: string;
  delayOffset?: number;
}

export function WordsPullUpMultiStyle({
  segments,
  containerClassName = '',
  delayOffset = 0,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  let wordCounter = 0;

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(' ');
        return words.map((word, wIdx) => {
          const currentWordIdx = wordCounter++;
          return (
            <span
              key={`${segIdx}-${wIdx}`}
              className="inline-block overflow-hidden pb-1 mx-[0.15em]"
            >
              <motion.span
                className={`inline-block ${segment.className || ''}`}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: currentWordIdx * 0.08 + delayOffset,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        });
      })}
    </div>
  );
}

interface AnimatedLetterProps {
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: any;
}

function AnimatedLetter({ char, index, totalChars, scrollYProgress }: AnimatedLetterProps) {
  const charProgress = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

function AnimatedParagraph({ text, className = '' }: { text: string; className?: string }) {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <p ref={paragraphRef} className={className}>
      {chars.map((char, idx) => (
        <AnimatedLetter
          key={idx}
          char={char}
          index={idx}
          totalChars={chars.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

// ==========================================
// MAIN PRISMA / SOCIAL WORLD SIMULATOR LANDING PAGE
// ==========================================

interface PrismaLandingPageProps {
  onLaunchPlatform?: () => void;
  onOpenAtlas?: () => void;
  onOpenWorkspace?: () => void;
}

export function PrismaLandingPage({
  onLaunchPlatform,
  onOpenAtlas,
  onOpenWorkspace,
}: PrismaLandingPageProps) {
  const navItems = [
    { label: 'Platform', action: onLaunchPlatform },
    { label: 'Personas', action: onLaunchPlatform },
    { label: 'Simulations', action: onLaunchPlatform },
    { label: 'Optimization', action: onLaunchPlatform },
    { label: 'Documentation', action: onOpenAtlas },
  ];

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] selection:bg-[#DEDBC8]/30 selection:text-[#E1E0CC] font-sans overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full p-4 md:p-6 bg-black relative">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black flex flex-col justify-between shadow-2xl">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />

          {/* Noise Overlay */}
          <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

          {/* Navbar Pill */}
          <header className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-auto">
            <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-2xl border-x border-b border-white/5">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.action}
                  className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200 cursor-pointer font-medium"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </header>

          {/* Hero Content (Bottom-aligned Grid) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-10 md:p-14 pointer-events-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* Left 8 columns: Giant Heading */}
              <div className="lg:col-span-8">
                <WordsPullUp
                  text="Social World"
                  className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[13vw] 2xl:text-[13vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]"
                  showAsterisk={true}
                />
              </div>

              {/* Right 4 columns: Text + CTA Button */}
              <div className="lg:col-span-4 flex flex-col items-start space-y-6 pb-2 lg:pb-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#DEDBC8]/70 text-xs sm:text-sm md:text-base leading-[1.2] font-normal"
                >
                  Social World Simulator is a worldwide intelligence network of autonomous AI personas bound not by status or algorithms but by passion to predict viral reach and unlock content potential.
                </motion.p>

                <motion.button
                  onClick={onLaunchPlatform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#DEDBC8] rounded-full pl-5 pr-1.5 py-1.5 flex items-center space-x-3 text-black font-medium text-sm sm:text-base group hover:gap-3 transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <span className="font-semibold text-black">Launch Platform Studio</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 text-[#DEDBC8]" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="bg-black py-24 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="bg-[#101010] rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-16 md:p-24 max-w-6xl mx-auto text-center relative border border-white/5 shadow-2xl">
          {/* Label */}
          <span className="text-[#DEDBC8] text-[10px] sm:text-xs tracking-widest uppercase mb-6 sm:mb-10 block font-medium">
            AI Audience Intelligence
          </span>

          {/* Heading */}
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Predict the Internet', className: 'font-normal text-[#E1E0CC]' },
              { text: 'before you publish.', className: 'italic font-serif text-[#DEDBC8]' },
              {
                text: 'Simulate 200+ autonomous AI personas reacting to your videos, scripts, and posts in real time.',
                className: 'font-normal text-[#E1E0CC]',
              },
            ]}
            containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
          />

          {/* Body paragraph with scroll-linked opacity reveal */}
          <AnimatedParagraph
            text="Over years of research in multi-agent behavioral dynamics, Social World Simulator combines NVIDIA Llama 70B multimodal vision, Whisper speech processing, and orbital graph physics to help creators, brands, and AI teams maximize engagement."
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-10 sm:mt-16 text-center font-normal leading-relaxed"
          />
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="min-h-screen bg-black py-24 sm:py-32 px-4 md:px-6 relative overflow-hidden">
        {/* Subtle noise background */}
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

        <div className="relative z-10">
          {/* Header text */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-1">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Enterprise simulation suite for visionary creators.', className: 'text-[#E1E0CC] font-normal block text-xl sm:text-2xl md:text-3xl lg:text-4xl' },
              ]}
            />
            <div className="pt-1">
              <WordsPullUpMultiStyle
                segments={[
                  { text: 'Built for virality. Powered by autonomous AI.', className: 'text-gray-500 font-normal block text-xl sm:text-2xl md:text-3xl lg:text-4xl' },
                ]}
              />
            </div>
          </div>

          {/* 4-column card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px] max-w-7xl mx-auto">
            {/* Card 1 - Video Card */}
            <FeatureCardWrapper index={0}>
              <div
                onClick={onLaunchPlatform}
                className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[420px] lg:h-full flex flex-col justify-end p-6 group border border-white/5 shadow-2xl cursor-pointer"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <span className="text-[#E1E0CC] font-medium text-lg sm:text-xl relative z-10">
                  Your content intelligence canvas.
                </span>
              </div>
            </FeatureCardWrapper>

            {/* Card 2 - Persona Network (01) */}
            <FeatureCardWrapper index={1}>
              <div className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[420px] lg:h-full relative overflow-hidden group border border-white/5 shadow-2xl">
                <div>
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                    alt="Persona Network Icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-4 sm:mb-6 shadow-md"
                  />
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC]">
                      Persona Network.
                    </h3>
                    <span className="text-xs font-mono text-gray-500">01</span>
                  </div>

                  <ul className="space-y-2.5">
                    {[
                      '200+ synthetic persona profiles',
                      'Behavioral AI sentiment modeling',
                      'Real-time force graph physics',
                      'Demographic cohort analysis',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onLaunchPlatform}
                  className="text-xs font-medium text-[#DEDBC8] flex items-center space-x-1.5 pt-4 group-hover:translate-x-1 transition-transform cursor-pointer text-left"
                >
                  <span>Explore Personas</span>
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                </button>
              </div>
            </FeatureCardWrapper>

            {/* Card 3 - Retention Heatmap (02) */}
            <FeatureCardWrapper index={2}>
              <div className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[420px] lg:h-full relative overflow-hidden group border border-white/5 shadow-2xl">
                <div>
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                    alt="Retention Heatmap Icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-4 sm:mb-6 shadow-md"
                  />
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC]">
                      Retention Heatmap.
                    </h3>
                    <span className="text-xs font-mono text-gray-500">02</span>
                  </div>

                  <ul className="space-y-2.5">
                    {[
                      'Second-by-second excitement curves',
                      'Pacing drop-off warnings',
                      'Waveform audio synchronization',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onLaunchPlatform}
                  className="text-xs font-medium text-[#DEDBC8] flex items-center space-x-1.5 pt-4 group-hover:translate-x-1 transition-transform cursor-pointer text-left"
                >
                  <span>View Analytics</span>
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                </button>
              </div>
            </FeatureCardWrapper>

            {/* Card 4 - Optimization Lab (03) */}
            <FeatureCardWrapper index={3}>
              <div className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[420px] lg:h-full relative overflow-hidden group border border-white/5 shadow-2xl">
                <div>
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                    alt="Optimization Lab Icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-4 sm:mb-6 shadow-md"
                  />
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC]">
                      Optimization Lab.
                    </h3>
                    <span className="text-xs font-mono text-gray-500">03</span>
                  </div>

                  <ul className="space-y-2.5">
                    {[
                      '1-click AI script rewrites',
                      'Virality score delta boosting',
                      'A/B variant comparisons',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onLaunchPlatform}
                  className="text-xs font-medium text-[#DEDBC8] flex items-center space-x-1.5 pt-4 group-hover:translate-x-1 transition-transform cursor-pointer text-left"
                >
                  <span>Optimize Script</span>
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                </button>
              </div>
            </FeatureCardWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCardWrapper({ children, index }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
