'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, Plus, Trash2, ArrowRight, Play, Film, Clock } from 'lucide-react';
import { SavedProject } from '@/services/historyStore';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projects: SavedProject[];
  onSelectProject: (project: SavedProject) => void;
  onNewProject: () => void;
  onUpdateProjects?: (projects: SavedProject[]) => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onNewProject,
  onUpdateProjects,
}: HistoryDrawerProps) {
  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = projects.filter((p) => p.id !== id);
    if (onUpdateProjects) onUpdateProjects(updated);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#111111] border-l border-white/10 h-full shadow-2xl z-10 flex flex-col font-sans text-[#F7F6F1]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#181818]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F7F6F1]">Simulation Project History</h3>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {projects.length} Saved Network Payloads
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    onNewProject();
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black text-xs font-extrabold transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {projects.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-white/10 rounded-3xl p-6 bg-[#181818]">
                  <Film className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <h4 className="text-xs font-bold text-zinc-300">No Saved Projects Yet</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 max-w-xs mx-auto">
                    Start a simulation payload to automatically save historical runs to your project drawer.
                  </p>
                  <button
                    onClick={() => {
                      onNewProject();
                      onClose();
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#DEDBC8]/15 hover:bg-[#DEDBC8]/25 text-[#DEDBC8] border border-[#DEDBC8]/30 text-xs font-bold transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#DEDBC8]" />
                    <span>Create First Project</span>
                  </button>
                </div>
              ) : (
                projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-[#181818] hover:bg-zinc-900 border border-white/10 hover:border-[#DEDBC8]/40 transition-all cursor-pointer group flex items-start space-x-3"
                  >
                    {/* Thumbnail / Media Icon */}
                    <div className="w-14 h-14 rounded-xl bg-black border border-white/10 overflow-hidden relative shrink-0">
                      {proj.mediaUrl ? (
                        <img
                          src={proj.mediaUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#DEDBC8]/10 text-[#DEDBC8]">
                          <Film className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-[#DEDBC8]/10 text-[#DEDBC8] text-[9px] font-mono font-bold uppercase border border-[#DEDBC8]/20">
                          {proj.platform}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          Virality: <strong className="text-[#DEDBC8]">{proj.viralityScore}/100</strong>
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white truncate mt-1 group-hover:text-[#DEDBC8] transition-colors">
                        {proj.title}
                      </h4>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[10px] text-zinc-500 font-mono">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          <span>{proj.timestamp}</span>
                        </span>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => handleDeleteProject(e, proj.id)}
                            className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-[#DEDBC8] group-hover:translate-x-0.5 transition-transform flex items-center">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
