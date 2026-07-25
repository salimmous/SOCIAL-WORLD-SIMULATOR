'use client';

import React, { useState } from 'react';
import { Comment } from '@/types/simulator';
import { MessageSquare, Heart, Share2, CornerDownRight, CheckCircle2 } from 'lucide-react';

interface CommentFeedProps {
  comments: Comment[];
  currentTime: number;
}

export const CommentFeed: React.FC<CommentFeedProps> = ({ comments, currentTime }) => {
  const [filterSentiment, setFilterSentiment] = useState<string>('all');

  const visibleComments = comments.filter((c) => c.timestamp <= currentTime);

  const filteredComments = visibleComments.filter((c) => {
    if (filterSentiment === 'all') return true;
    return c.sentiment === filterSentiment;
  });

  const getSentimentBadge = (sentiment: Comment['sentiment']) => {
    switch (sentiment) {
      case 'viral':
        return 'bg-[#DEDBC8]/20 text-[#DEDBC8] border-[#DEDBC8]/30 font-bold';
      case 'positive':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'skeptical':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'hater':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'bot':
        return 'bg-zinc-800 text-zinc-300 border-white/10';
      default:
        return 'bg-zinc-800 text-zinc-300 border-white/10';
    }
  };

  return (
    <div className="space-y-4">
      {/* Sentiment Filter Toolbar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
        {['all', 'viral', 'positive', 'skeptical', 'hater', 'bot'].map((sent) => (
          <button
            key={sent}
            onClick={() => setFilterSentiment(sent)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              filterSentiment === sent
                ? 'bg-[#DEDBC8] text-black font-extrabold shadow-sm'
                : 'bg-[#111111] text-zinc-400 hover:text-zinc-200 border border-white/10'
            }`}
          >
            {sent}
          </button>
        ))}
      </div>

      {/* Comment List */}
      <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
        {filteredComments.length === 0 ? (
          <div className="py-10 text-center border border-dashed border-white/10 rounded-2xl p-4 bg-[#111111]">
            <MessageSquare className="w-5 h-5 text-zinc-600 mx-auto mb-2" />
            <p className="text-xs text-zinc-400 font-medium">
              No simulated audience comments yet.
            </p>
            <span className="text-[10px] text-zinc-500">
              Run simulation forward to generate reactions.
            </span>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="p-3.5 rounded-2xl bg-[#111111] border border-white/10 space-y-2 hover:border-[#DEDBC8]/30 transition-all"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="relative shrink-0">
                    <img
                      src={comment.authorAvatarUrl}
                      alt={comment.authorName}
                      className="w-7 h-7 rounded-full object-cover border border-white/15"
                    />
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-zinc-950"
                      style={{ backgroundColor: comment.authorColor }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-[#F7F6F1] leading-none">
                        {comment.authorName}
                      </span>
                      {comment.badge === 'Verified' && (
                        <CheckCircle2 className="w-3 h-3 text-[#DEDBC8]" />
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 block mt-0.5 font-medium">
                      {comment.authorRole}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${getSentimentBadge(
                    comment.sentiment
                  )}`}
                >
                  {comment.sentiment}
                </span>
              </div>

              {/* Comment Text Body */}
              <p className="text-xs text-zinc-200 leading-relaxed font-normal">
                {comment.content || comment.text}
              </p>

              {/* Engagement Metrics */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-zinc-400 font-mono">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-[#DEDBC8]" />
                    <span>{comment.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Share2 className="w-3 h-3 text-[#DEDBC8]" />
                    <span>{comment.shares}</span>
                  </span>
                </div>
                <span>@{comment.timeFormatted || comment.timestampFormatted}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
