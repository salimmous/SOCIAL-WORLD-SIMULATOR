'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Music,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
  Eye,
  Repeat,
  Send,
  ThumbsUp,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { ContentInput, Comment } from '@/types/simulator';

interface LiveSocialFeedMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentInput;
  comments: Comment[];
  appliedFixes: boolean;
  onApplyFixes: () => void;
}

export function LiveSocialFeedMockupModal({
  isOpen,
  onClose,
  content,
  comments,
  appliedFixes,
  onApplyFixes,
}: LiveSocialFeedMockupModalProps) {
  const [activePlatform, setActivePlatform] = useState<'tiktok' | 'twitter' | 'linkedin' | 'shorts'>('tiktok');
  const [useRewrittenText, setUseRewrittenText] = useState(appliedFixes);
  const [likeCount, setLikeCount] = useState(14820);
  const [hasLiked, setHasLiked] = useState(false);

  // Keyboard Navigation & Shortcuts (Escape, ArrowLeft/Right, Space, L)
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
        e.preventDefault();
        const platforms: ('tiktok' | 'twitter' | 'linkedin' | 'shorts')[] = ['tiktok', 'twitter', 'linkedin', 'shorts'];
        setActivePlatform((prev) => {
          const idx = platforms.indexOf(prev);
          return platforms[(idx + 1) % platforms.length];
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const platforms: ('tiktok' | 'twitter' | 'linkedin' | 'shorts')[] = ['tiktok', 'twitter', 'linkedin', 'shorts'];
        setActivePlatform((prev) => {
          const idx = platforms.indexOf(prev);
          return platforms[(idx - 1 + platforms.length) % platforms.length];
        });
      } else if (e.code === 'Space') {
        e.preventDefault();
        setUseRewrittenText((prev) => !prev);
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        handleLike();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawBody = content.contentBody?.trim() || content.title?.trim() || 'Stop wasting 60% of dev time on manual tests. Here is how AI agents simulate audience reactions.';

  const displayBody = (useRewrittenText || appliedFixes)
    ? (rawBody.startsWith('🔥') ? rawBody : `🔥 REWRITTEN HOOK: ${rawBody}`)
    : rawBody;

  const fallbackMediaUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

  const isUploadedVideo =
    !!content.mediaFileUrl &&
    (content.mediaFileUrl.startsWith('data:video/') ||
      content.mediaFileUrl.startsWith('blob:') ||
      content.mediaFileUrl.endsWith('.mp4') ||
      content.mediaFileUrl.endsWith('.webm') ||
      content.mediaFileUrl.endsWith('.mov') ||
      content.contentType === 'video');

  const renderMedia = (className: string) => {
    if (content.mediaFileUrl) {
      if (isUploadedVideo) {
        return (
          <video
            src={content.mediaFileUrl}
            autoPlay
            loop
            muted
            playsInline
            controls
            className={className}
          />
        );
      }
      return <img src={content.mediaFileUrl} alt="Uploaded Media" className={className} />;
    }
    return <img src={fallbackMediaUrl} alt="Default Media" className={className} />;
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setHasLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl text-[#F7F6F1] font-sans">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl h-[90vh] bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-[#DEDBC8]/15 border border-[#DEDBC8]/30 flex items-center justify-center text-[#DEDBC8]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#F7F6F1]">
                  Live Social Feed Mockup Simulator
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  Pixel-Perfect Dark-Mode Platform Feed Previews {content.mediaFileUrl ? '(Uploaded Media Active)' : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setUseRewrittenText(!useRewrittenText)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  useRewrittenText || appliedFixes
                    ? 'bg-[#DEDBC8] text-black border-[#DEDBC8]'
                    : 'bg-[#181818] text-[#DEDBC8] border-[#DEDBC8]/30 hover:bg-zinc-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{useRewrittenText || appliedFixes ? 'Showing AI Rewritten Hook' : 'Switch to AI Rewrite'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#181818] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Platform Selector Tabs */}
          <div className="px-6 py-2.5 bg-[#0D0D0D] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex space-x-2 font-mono text-xs overflow-x-auto">
              {[
                { id: 'tiktok', label: 'TikTok Feed (9:16 Vertical)', icon: Smartphone },
                { id: 'twitter', label: 'X / Twitter Post', icon: MessageCircle },
                { id: 'linkedin', label: 'LinkedIn Enterprise Feed', icon: Monitor },
                { id: 'shorts', label: 'YouTube Shorts', icon: Play },
              ].map((p) => {
                const IconComp = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePlatform(p.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
                      activePlatform === p.id
                        ? 'border-[#DEDBC8] text-white font-bold bg-[#DEDBC8]/15 shadow-md'
                        : 'border-white/5 text-zinc-400 hover:text-zinc-200 bg-[#181818]'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5 text-[#DEDBC8]" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center space-x-2 text-[10px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Realtime Social Canvas Rendered</span>
            </div>
          </div>

          {/* Body Content Preview Box */}
          <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center bg-black/60 relative">
            {/* PLATFORM 1: TIKTOK / REELS VERTICAL 9:16 FRAME */}
            {activePlatform === 'tiktok' && (
              <div className="w-[340px] h-[580px] bg-black rounded-[40px] border-4 border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none">
                {/* Background Video/Photo preview */}
                {renderMedia('absolute inset-0 w-full h-full object-cover opacity-90')}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

                {/* Top Bar */}
                <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs font-bold">
                  <span className="opacity-70">Following</span>
                  <span className="border-b-2 border-white pb-0.5">For You</span>
                  <Eye className="w-4 h-4 text-white/80" />
                </div>

                {/* Floating Side Action Column */}
                <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center space-y-4 text-white font-mono text-xs">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Avatar" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full text-[8px] flex items-center justify-center font-bold">+</span>
                  </div>

                  <button onClick={handleLike} className="flex flex-col items-center space-y-0.5 cursor-pointer">
                    <div className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                      <Heart className={`w-6 h-6 ${hasLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </div>
                    <span className="text-[10px]">{likeCount.toLocaleString()}</span>
                  </button>

                  <div className="flex flex-col items-center space-y-0.5">
                    <div className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px]">1,280</span>
                  </div>

                  <div className="flex flex-col items-center space-y-0.5">
                    <div className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                      <Bookmark className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px]">4,920</span>
                  </div>

                  <div className="flex flex-col items-center space-y-0.5">
                    <div className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px]">Share</span>
                  </div>
                </div>

                {/* Bottom Overlay Info & Caption */}
                <div className="relative z-10 p-4 pr-16 space-y-2 text-white">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-sm">@salim_viral</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                  </div>

                  <p className="text-xs leading-snug line-clamp-3 font-sans text-zinc-100">
                    {displayBody}
                  </p>

                  <div className="flex items-center space-x-2 text-[10px] opacity-80 font-mono">
                    <Music className="w-3 h-3 animate-spin" />
                    <span className="truncate">Original Audio - Social World AI Sound Engine</span>
                  </div>
                </div>
              </div>
            )}

            {/* PLATFORM 2: X (TWITTER) DARK MODE CARD */}
            {activePlatform === 'twitter' && (
              <div className="w-full max-w-lg bg-black border border-zinc-800 rounded-3xl p-5 space-y-3 shadow-2xl text-white font-sans">
                {/* Header Profile */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm">Salim Moussaoui</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400" />
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">@salimmous • 2h</span>
                    </div>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-zinc-500" />
                </div>

                {/* Post Content */}
                <p className="text-sm leading-relaxed text-zinc-100">
                  {displayBody}
                </p>

                {/* Media Embed Fixed Height Container */}
                <div className="w-full h-64 md:h-72 bg-black rounded-2xl overflow-hidden border border-zinc-800 relative flex items-center justify-center">
                  {renderMedia('w-full h-full object-cover')}
                </div>

                {/* Engagement Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-xs text-zinc-500 font-mono">
                  <span className="flex items-center space-x-1.5 hover:text-blue-400 cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span>342</span>
                  </span>

                  <span className="flex items-center space-x-1.5 hover:text-emerald-400 cursor-pointer">
                    <Repeat className="w-4 h-4" />
                    <span>1,890</span>
                  </span>

                  <button onClick={handleLike} className="flex items-center space-x-1.5 hover:text-red-500 cursor-pointer">
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{likeCount.toLocaleString()}</span>
                  </button>

                  <span className="flex items-center space-x-1.5 hover:text-blue-400 cursor-pointer">
                    <Eye className="w-4 h-4" />
                    <span>420.5K</span>
                  </span>

                  <Share2 className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
              </div>
            )}

            {/* PLATFORM 3: LINKEDIN ENTERPRISE FEED */}
            {activePlatform === 'linkedin' && (
              <div className="w-full max-w-xl bg-[#1B1F23] border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl text-white font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Avatar" className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Salim Moussaoui</h4>
                      <span className="text-[11px] text-zinc-400 block">Founder & AI Systems Architect @ Social World OS</span>
                      <span className="text-[10px] text-zinc-500 font-mono">2 hrs ago • 🌐</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                    + Follow
                  </button>
                </div>

                <p className="text-xs leading-relaxed text-zinc-200 whitespace-pre-line">
                  {displayBody}
                  {"\n\n"}#ArtificialIntelligence #SaaSLaunch #ProductStrategy #SocialWorldOS
                </p>

                {/* Media Embed Fixed Height Container */}
                <div className="w-full h-64 md:h-72 bg-black rounded-2xl overflow-hidden border border-zinc-800 relative flex items-center justify-center">
                  {renderMedia('w-full h-full object-cover')}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs text-zinc-400 font-mono">
                  <button onClick={handleLike} className="flex items-center space-x-1.5 hover:text-blue-400 cursor-pointer">
                    <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-blue-500 text-blue-400' : ''}`} />
                    <span>Like ({likeCount.toLocaleString()})</span>
                  </button>
                  <span className="flex items-center space-x-1.5 hover:text-zinc-200 cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comment (184)</span>
                  </span>
                  <span className="flex items-center space-x-1.5 hover:text-zinc-200 cursor-pointer">
                    <Repeat className="w-4 h-4" />
                    <span>Repost (92)</span>
                  </span>
                  <span className="flex items-center space-x-1.5 hover:text-zinc-200 cursor-pointer">
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </span>
                </div>
              </div>
            )}

            {/* PLATFORM 4: YOUTUBE SHORTS */}
            {activePlatform === 'shorts' && (
              <div className="w-[340px] h-[580px] bg-black rounded-[40px] border-4 border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none">
                {renderMedia('absolute inset-0 w-full h-full object-cover opacity-90')}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

                <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs font-bold">
                  <span className="text-red-500 font-extrabold flex items-center space-x-1">
                    <Play className="w-4 h-4 fill-red-500" />
                    <span>Shorts</span>
                  </span>
                  <MoreHorizontal className="w-5 h-5 text-white/80" />
                </div>

                <div className="relative z-10 p-4 pr-16 space-y-2 text-white">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-sm">Salim Moussaoui</span>
                    <button className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px]">
                      Subscribe
                    </button>
                  </div>

                  <p className="text-xs leading-snug line-clamp-3 text-zinc-100">
                    {displayBody}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
            <span className="text-zinc-400">Showing {activePlatform.toUpperCase()} native preview</span>

            <div className="flex items-center space-x-3">
              {!appliedFixes && (
                <button
                  onClick={onApplyFixes}
                  className="px-4 py-2 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black font-extrabold cursor-pointer transition-all active:scale-95"
                >
                  Apply 1-Click AI Auto-Rewrite
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#212121] hover:bg-zinc-800 text-zinc-300 font-bold border border-white/10 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
