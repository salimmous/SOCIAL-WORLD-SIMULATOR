'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Sparkles, Play, BarChart3, ChevronRight, CheckCircle2, X } from 'lucide-react';

interface OnboardingTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

const TOUR_STEPS = [
  {
    title: '1. Content Intelligence Module',
    description: 'Upload video, image, transcript, or social URL. AI extracts Whisper transcripts, visual tone, and audience hooks.',
    icon: Sparkles,
  },
  {
    title: '2. 60 FPS Social Graph Simulation',
    description: 'Watch 200+ autonomous AI personas (Tech Founders, Gen Z, VPs) react in real-time centered around your content node.',
    icon: Globe,
  },
  {
    title: '3. Optimization Lab & 1-Click Rewrites',
    description: 'Recalculate virality scores and trigger 1-click script rewrites to boost retention by up to 24%.',
    icon: BarChart3,
  },
];

export function OnboardingTourModal({ isOpen, onClose, onStartDemo }: OnboardingTourModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onStartDemo();
      onClose();
    }
  };

  const StepIcon = TOUR_STEPS[currentStep].icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-zinc-950 border border-purple-500/30 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  WELCOME TO SOCIAL WORLD
                </h3>
                <span className="text-[10px] text-purple-400 font-mono">Platform Guided Tour</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Step Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <StepIcon className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-white">{TOUR_STEPS[currentStep].title}</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {TOUR_STEPS[currentStep].description}
            </p>
          </div>

          {/* Action Buttons & Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1.5">
              {TOUR_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentStep ? 'w-6 bg-purple-500' : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-900/30 flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <span>{currentStep === TOUR_STEPS.length - 1 ? 'Start Interactive Simulation' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
