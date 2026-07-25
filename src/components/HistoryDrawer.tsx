'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, Plus, Trash2, ArrowUpRight, Sparkles, Film } from 'lucide-react';
import { SavedProject, deleteProjectFromHistory } from '@/services/historyStore';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projects: SavedProject[];
  onSelectProject: (project: SavedProject) => void;
  onNewProject: () => void;
  onUpdateProjects: (updated: SavedProject[]) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onNewProject,
  onUpdateProjects,
}) => {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteProjectFromHistory(id);
    onUpdateProjects(updated);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md bg-zinc-950/95 border-l border-white/10 h-full flex flex-col z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-zinc-950">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Project History</h3>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {projects.length} Saved Simulations
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    onNewProject();
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-purple-600/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Project</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {projects.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl p-6 bg-zinc-950/40 space-y-3">
                  <Film className="w-8 h-8 text-zinc-600 mx-auto" />
                  <p className="text-xs text-zinc-400 font-medium">
                    No simulation history yet.
                  </p>
                  <button
                    onClick={() => {
                      onNewProject();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Clean Project</span>
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
                    className="p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/[0.06] hover:border-purple-500/40 transition-all cursor-pointer group flex items-start space-x-3"
                  >
                    {/* Media Thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-black overflow-hidden border border-white/10 shrink-0 relative">
                      {proj.mediaUrl ? (
                        <img
                          src={proj.mediaUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-purple-950/40 text-purple-400">
                          <Sparkles className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500">
                          {proj.timestamp}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[9px] font-mono font-bold uppercase border border-purple-500/20">
                          {proj.platform}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white truncate mt-1 group-hover:text-purple-300 transition-colors">
                        {proj.title}
                      </h4>

                      <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-sans">
                        {proj.contentBody}
                      </p>

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/[0.04]">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          Score: {proj.viralityScore}/100
                        </span>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => handleDelete(e, proj.id)}
                            className="p-1 rounded-lg hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-purple-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                            <ArrowUpRight className="w-3.5 h-3.5" />
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
};
