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
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'positive':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
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
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-white/5'
            }`}
          >
            {sent}
          </button>
        ))}
      </div>

      {/* Comment List */}
      <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
        {filteredComments.length === 0 ? (
          <div className="py-10 text-center border border-dashed border-white/10 rounded-2xl p-4 bg-zinc-950/40">
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
              className="p-3.5 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-2 hover:border-purple-500/30 transition-all"
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
                      <span className="text-xs font-bold text-white leading-none">
                        {comment.authorName}
                      </span>
                      {comment.badge === 'Verified' && (
                        <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20" />
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 block mt-0.5 font-medium">
                      {comment.authorRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${getSentimentBadge(
                      comment.sentiment
                    )}`}
                  >
                    {comment.sentiment}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    @{comment.timeFormatted}
                  </span>
                </div>
              </div>

              {/* Comment Text Content */}
              <p className="text-xs text-zinc-200 leading-relaxed font-sans pl-9">
                "{comment.content}"
              </p>

              {/* Comment Footer Stats */}
              <div className="flex items-center space-x-4 pl-9 text-[10px] text-zinc-400 pt-1 font-mono">
                <span className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                  <Heart className="w-3 h-3 text-red-500/80" />
                  <span>{comment.likes}</span>
                </span>
                <span className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
                  <CornerDownRight className="w-3 h-3 text-purple-400" />
                  <span>{comment.replies} replies</span>
                </span>
                <span className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                  <Share2 className="w-3 h-3 text-emerald-400" />
                  <span>{comment.shares}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
