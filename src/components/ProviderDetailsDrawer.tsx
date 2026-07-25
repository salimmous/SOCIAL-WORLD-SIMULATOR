'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, ShieldCheck, RefreshCw, Key, FileText, Activity, X } from 'lucide-react';

export interface ProviderDetailData {
  name: string;
  model: string;
  endpoint: string;
  contextWindow: string;
  temperature: string;
  maxTokens: string;
  streaming: boolean;
  retryPolicy: string;
  timeout: string;
  fallback: string;
  health: string;
  latency: string;
  recentRequests: number;
}

interface ProviderDetailsDrawerProps {
  provider: ProviderDetailData | null;
  onClose: () => void;
}

export function ProviderDetailsDrawer({ provider, onClose }: ProviderDetailsDrawerProps) {
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!provider) return null;

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTestResult(null);
    setTimeout(() => {
      setTestingConnection(false);
      setTestResult(`Connection Successful: ${provider.latency} latency • 200 OK`);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-zinc-950 border-l border-white/10 h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between font-sans"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-1.5">
                    <span>{provider.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <span className="text-xs font-mono text-purple-300 block">{provider.model}</span>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-xl text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Connection Result Toast */}
            {testResult && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{testResult}</span>
              </div>
            )}

            {/* Configuration Details Matrix */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 font-mono text-xs">
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">
                Provider Configuration
              </span>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Endpoint URL:</span>
                <span className="text-white truncate max-w-[200px]">{provider.endpoint}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Context Window:</span>
                <span className="text-purple-300">{provider.contextWindow}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Temperature:</span>
                <span className="text-white">{provider.temperature}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Max Tokens:</span>
                <span className="text-white">{provider.maxTokens}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Streaming Mode:</span>
                <span className="text-emerald-400">{provider.streaming ? 'Enabled (Server-Sent Events)' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Retry Policy:</span>
                <span className="text-white">{provider.retryPolicy}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Timeout:</span>
                <span className="text-white">{provider.timeout}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-zinc-400">Fallback Provider:</span>
                <span className="text-amber-300">{provider.fallback}</span>
              </div>
            </div>

            {/* Health & Telemetry */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 font-mono text-xs">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Telemetry Metrics
              </span>
              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-[9px] text-zinc-500 block">Avg Response</span>
                  <span className="text-sm font-extrabold text-emerald-400">{provider.latency}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-[9px] text-zinc-500 block">Today Requests</span>
                  <span className="text-sm font-extrabold text-white">{provider.recentRequests}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="space-y-2 pt-4 border-t border-white/10 font-sans">
            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${testingConnection ? 'animate-spin' : ''}`} />
              <span>{testingConnection ? 'Testing Connection...' : 'Test Provider Connection'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
