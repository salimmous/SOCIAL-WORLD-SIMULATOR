'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Heart, MessageCircle, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { NetworkNode, NetworkEdge, Comment } from '@/types/simulator';

interface DataPacket {
  id: string;
  sourceId: string;
  targetId: string;
  progress: number;
  speed: number;
  color: string;
}

interface SocialWorldCanvasProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  currentTime: number;
  duration: number;
  isRunning: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  speed: number;
  onChangeSpeed: (speed: number) => void;
  activeComments: Comment[];
  stage: 1 | 2 | 3 | 4;
  onSelectNode?: (node: NetworkNode) => void;
}

export const SocialWorldCanvas: React.FC<SocialWorldCanvasProps> = ({
  nodes,
  edges,
  currentTime,
  duration,
  isRunning,
  onTogglePlay,
  onSeek,
  speed,
  onChangeSpeed,
  activeComments,
  stage,
  onSelectNode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const nodesRef = useRef<NetworkNode[]>(nodes);
  nodesRef.current = nodes;

  const packetsRef = useRef<DataPacket[]>([]);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Unlocked social media comment cards by timeline
  const visibleComments = activeComments
    .filter((c) => c.timestamp <= currentTime)
    .slice(-3);

  // Preload avatar images into memory
  useEffect(() => {
    nodes.forEach((node) => {
      if (node.avatarUrl && !imageCacheRef.current.has(node.avatarUrl)) {
        const img = new Image();
        img.src = node.avatarUrl;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageCacheRef.current.set(node.avatarUrl, img);
        };
      }
    });
  }, [nodes]);

  // Spawn dynamic data laser packets periodically
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (edges.length > 0) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const packetColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f97316'];
        const color = packetColors[Math.floor(Math.random() * packetColors.length)];

        packetsRef.current.push({
          id: `pkt-${Date.now()}-${Math.random()}`,
          sourceId: edge.sourceId,
          targetId: edge.targetId,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          color,
        });
      }
    }, 400 / speed);

    return () => clearInterval(interval);
  }, [edges, isRunning, speed]);

  // Main Canvas Render Loop (Enterprise Network Ecosystem)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pulseTime = 0;

    const stardust = Array.from({ length: 140 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      size: Math.random() * 1.5,
      alpha: 0.2 + Math.random() * 0.4,
    }));

    const render = () => {
      pulseTime += 0.04 * speed;

      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentNodes = nodesRef.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 0. Render Background Stardust
      stardust.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x % canvas.width, star.y % canvas.height, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.35})`;
        ctx.fill();
      });

      // 1. Render Concentric Orbital Rings & Community Cohort Labels
      const orbitRadii = [110, 150, 190, 240, 280, 320];
      const orbitLabels = [
        'CREATORS COHORT',
        'INFLUENCERS NETWORK',
        'FANS & VIRAL SPREADERS',
        'ENTERPRISE CUSTOMERS',
        'ANALYSTS & CRITICS',
        'ALGORITHM NEURAL HUB',
      ];

      orbitRadii.forEach((rad, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, rad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 + Math.sin(pulseTime + i) * 0.03})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        if (i < orbitLabels.length) {
          ctx.font = 'bold 9px Geist, sans-serif';
          ctx.fillStyle = 'rgba(161, 161, 170, 0.35)';
          ctx.textAlign = 'center';
          ctx.fillText(orbitLabels[i], centerX, centerY - rad - 4);
        }
      });

      // Update positions with organic orbital motion
      currentNodes.forEach((node) => {
        if (isRunning) {
          node.angle = (node.angle || 0) + (node.orbitSpeed || 0.005) * speed;
          node.x = centerX + Math.cos(node.angle) * (node.orbitRadius || 150);
          node.y = centerY + Math.sin(node.angle) * (node.orbitRadius || 150);
        }
      });

      // 2. Draw Neural Connection Filaments
      currentNodes.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 + Math.sin(pulseTime * 2 + node.x) * 0.08})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      edges.forEach((edge) => {
        const source = currentNodes.find((n) => n.id === edge.sourceId);
        const target = currentNodes.find((n) => n.id === edge.targetId);
        if (!source || !target) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = `rgba(129, 140, 248, ${0.12 + Math.sin(pulseTime) * 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 3. Render Data Laser Packets
      packetsRef.current.forEach((pkt) => {
        if (isRunning) pkt.progress += pkt.speed * speed;

        const source = currentNodes.find((n) => n.id === pkt.sourceId) || { x: centerX, y: centerY };
        const target = currentNodes.find((n) => n.id === pkt.targetId) || { x: centerX, y: centerY };

        const px = source.x + (target.x - source.x) * pkt.progress;
        const py = source.y + (target.y - source.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      packetsRef.current = packetsRef.current.filter((p) => p.progress < 1);

      // 4. Render Hero Central Content Payload Node
      const heroPulse = (Math.sin(pulseTime * 2) + 1) * 8;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 40 + heroPulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124, 58, 237, 0.12)';
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1b4b';
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#a78bfa';
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = 'bold 12px Geist, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CONTENT', centerX, centerY - 4);
      ctx.fillText('PAYLOAD', centerX, centerY + 8);

      ctx.font = 'bold 11px Geist, sans-serif';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText('TARGET MEDIA CORE', centerX, centerY + 46);

      // 5. Render Professional Persona Avatars & Status Badges
      currentNodes.forEach((node) => {
        const isAlgo = node.cluster === 'Algorithm';
        const breathe = Math.sin(pulseTime * 1.5 + node.angle * 2) * 2;
        const radius = (isAlgo ? 24 : 20) + breathe;

        // Outer Cluster Glow Ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `${node.color}66`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Check preloaded profile image
        const img = imageCacheRef.current.get(node.avatarUrl);

        if (img && img.complete) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, node.x - radius, node.y - radius, radius * 2, radius * 2);
          ctx.restore();
        } else {
          // Fallback Initials Circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = '#18181b';
          ctx.fill();

          ctx.font = 'bold 12px Geist, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.initials || 'US', node.x, node.y + 1);
        }

        // Status Indicator Dot (Top Right of Avatar)
        const badgeX = node.x + radius * 0.7;
        const badgeY = node.y - radius * 0.7;

        ctx.beginPath();
        ctx.arc(badgeX, badgeY, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = node.badge === 'Verified' || node.badge === 'Influencer' ? '#3b82f6' : node.badge === 'Online' ? '#10b981' : node.color;
        ctx.strokeStyle = '#09090d';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        // Crisp User Name Label Below
        ctx.font = '500 11px Geist, sans-serif';
        ctx.fillStyle = '#f4f4f5';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + radius + 14);
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [edges, isRunning, speed, stage]);

  const stageTitles = {
    1: 'Stage 1: Content Ingestion & Orbital Alignment',
    2: 'Stage 2: Early Community Impression Wave',
    3: 'Stage 3: Algorithm Neural Feed Boost',
    4: 'Stage 4: Exponential Galactic Viral Cascade',
  };

  const progressPct = (currentTime / duration) * 100;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] relative bg-zinc-950/90 overflow-hidden">
      {/* Stage Badge */}
      <div className="absolute top-5 left-6 z-20 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center space-x-2.5 pointer-events-auto shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
          <span className="text-xs font-bold text-white">
            {stageTitles[stage]}
          </span>
        </div>
      </div>

      {/* FLOATING PROFESSIONAL SOCIAL MEDIA COMMENT CARDS */}
      <div className="absolute bottom-20 left-6 z-20 pointer-events-none max-w-sm space-y-2">
        <AnimatePresence>
          {visibleComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-3.5 rounded-2xl border border-white/10 shadow-2xl flex items-start space-x-3 pointer-events-auto"
            >
              {/* Profile Image / Initials */}
              <div className="relative shrink-0">
                <img
                  src={comment.authorAvatarUrl}
                  alt={comment.authorName}
                  className="w-9 h-9 rounded-full object-cover border border-white/15 shadow-sm"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-950"
                  style={{ backgroundColor: comment.authorColor }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-white leading-none">
                      {comment.authorName}
                    </span>
                    {comment.badge === 'Verified' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    @{comment.timeFormatted}
                  </span>
                </div>

                <p className="text-xs text-zinc-200 mt-1 line-clamp-2 leading-snug font-sans">
                  "{comment.content}"
                </p>

                <div className="flex items-center space-x-4 mt-2 text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500/20" />
                    <span>{comment.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
                    <MessageCircle className="w-3 h-3 text-purple-400" />
                    <span>{comment.replies}</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                    <Share2 className="w-3 h-3 text-emerald-400" />
                    <span>{comment.shares}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hero Canvas Area */}
      <div className="flex-1 relative w-full h-full" data-tour="social-canvas">
        <canvas
          ref={canvasRef}
          onClick={(e) => {
            if (!onSelectNode || !canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Find closest node to click
            const clickedNode = nodesRef.current.find((node) => {
              const dx = (node.x || 0) - clickX;
              const dy = (node.y || 0) - clickY;
              const nodeRadius = (node as any).radius || 20;
              return Math.sqrt(dx * dx + dy * dy) <= nodeRadius + 10;
            });

            if (clickedNode) {
              onSelectNode(clickedNode);
            }
          }}
          className="w-full h-full block cursor-pointer"
        />
      </div>

      {/* Integrated Bottom Timeline & Heatmap Scrubber */}
      <div className="p-4 border-t border-white/[0.06] glass-panel rounded-none border-b-0 border-l-0 border-r-0 z-20 space-y-3">
        {/* Timeline Scrubber */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono font-bold text-purple-400 w-10 text-right">
            0:{currentTime.toString().padStart(2, '0')}
          </span>

          <div className="flex-1 relative cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration}
              step="1"
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div
              className="absolute left-0 top-0 h-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-lg pointer-events-none"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <span className="text-xs font-mono text-zinc-500 w-10">
            1:00
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={onTogglePlay}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-white/10 transition-all flex items-center space-x-2 cursor-pointer"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => onSeek(0)}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-xl border border-white/10">
            {[1, 2, 5].map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed(s)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  speed === s ? 'bg-purple-600 text-white' : 'text-zinc-400'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
