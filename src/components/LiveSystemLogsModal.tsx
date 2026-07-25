'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Download, Search, X, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

interface LiveSystemLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOG_ENTRIES = [
  { timestamp: '12:42:01', level: 'INFO', module: 'SIMULATOR', message: 'Simulation initialized with 200 persona entities.' },
  { timestamp: '12:42:02', level: 'INFO', module: 'NVIDIA_AI', message: 'Multimodal video analysis completed (0.4s).' },
  { timestamp: '12:42:03', level: 'INFO', module: 'FIRECRAWL', message: 'Scraped 14,280 benchmark hook patterns.' },
  { timestamp: '12:42:05', level: 'INFO', module: 'ELEVENLABS', message: 'Voice synthesis stream generated.' },
  { timestamp: '12:42:08', level: 'WARN', module: 'RETENTION', message: 'Retention drop-off detected at 0:04 timeline marker.' },
  { timestamp: '12:42:12', level: 'INFO', module: 'AI_REWRITE', message: '1-Click Auto Rewrite script applied.' },
  { timestamp: '12:42:15', level: 'INFO', module: 'EXPORTS', message: 'Executive PDF audit report compiled.' },
];

export function LiveSystemLogsModal({ isOpen, onClose }: LiveSystemLogsModalProps) {
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const filteredLogs = LOG_ENTRIES.filter(
    (l) =>
      l.module.toLowerCase().includes(filter.toLowerCase()) ||
      l.message.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDownloadLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(LOG_ENTRIES, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `system-audit-logs-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl relative overflow-hidden font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-sans">Realtime System Audit Logs</h3>
                <span className="text-[10px] text-emerald-400">● Live Stream Enabled</span>
              </div>
            </div>

            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white cursor-pointer font-sans">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Filter Bar */}
          <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10 flex items-center space-x-2">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter logs by module or message..."
              className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-zinc-500"
            />
          </div>

          {/* Logs Output Box */}
          <div className="p-4 rounded-2xl bg-black border border-white/10 h-72 overflow-y-auto space-y-2 text-xs">
            {filteredLogs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-zinc-300">
                <span className="text-zinc-500 shrink-0">{log.timestamp}</span>
                <span
                  className={`font-bold shrink-0 ${
                    log.level === 'WARN' ? 'text-amber-400' : 'text-purple-400'
                  }`}
                >
                  [{log.level}]
                </span>
                <span className="text-purple-300 font-bold shrink-0">[{log.module}]</span>
                <span className="text-zinc-200">{log.message}</span>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleDownloadLogs}
              className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer font-sans"
            >
              <Download className="w-4 h-4" />
              <span>Download Logs JSON</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 cursor-pointer font-sans"
            >
              Close Log Viewer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
