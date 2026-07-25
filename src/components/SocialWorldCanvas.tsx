'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Heart, MessageCircle, Share2 } from 'lucide-react';
import { NetworkNode, NetworkEdge, Comment } from '@/types/simulator';

interface FloatingParticle {
  id: string;
  x: number;
  y: number;
  emoji: string;
  opacity: number;
}

interface DataPacket {
  id: string;
  sourceId: string;
  targetId: string;
  progress: number;
  speed: number;
  type: 'like' | 'comment' | 'share';
  color: string;
}

interface SocialWorldCanvasProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  currentTime: number; // 0 to 60 seconds
  duration: number;
  isRunning: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  speed: number;
  onChangeSpeed: (speed: number) => void;
  activeComments: Comment[];
  stage: 1 | 2 | 3 | 4;
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
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const animFrameId = useRef<number | null>(null);
  const nodesRef = useRef<NetworkNode[]>(nodes);
  nodesRef.current = nodes;

  const packetsRef = useRef<DataPacket[]>([]);

  const reactionEmojis = ['🔥', '💡', '🚀', '💬', '⚡', '✨', '🤩', '💎'];

  // Latest 3 floating social media comment cards unlocked by timeline
  const visibleComments = activeComments
    .filter((c) => c.timestamp <= currentTime)
    .slice(-3);

  // Spawn organic reaction particles
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (nodesRef.current.length === 0) return;
      const target = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
      const emoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

      setParticles((prev) => [
        ...prev.slice(-16),
        {
          id: `p-${Date.now()}-${Math.random()}`,
          x: target.x,
          y: target.y - 18,
          emoji,
          opacity: 1,
        },
      ]);

      // Spawn traveling data packet along random edge
      if (edges.length > 0) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const packetTypes: ('like' | 'comment' | 'share')[] = ['like', 'comment', 'share'];
        const pType = packetTypes[Math.floor(Math.random() * packetTypes.length)];
        const pColor = pType === 'like' ? '#f472b6' : pType === 'comment' ? '#38bdf8' : '#34d399';

        packetsRef.current.push({
          id: `pkt-${Date.now()}-${Math.random()}`,
          sourceId: edge.sourceId,
          targetId: edge.targetId,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          type: pType,
          color: pColor,
        });
      }
    }, 450 / speed);

    return () => clearInterval(interval);
  }, [edges, isRunning, speed]);

  // Main Canvas Render Loop (Galactic Neural Ecosystem)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pulseTime = 0;

    // Generate static stardust background particles
    const stardust = Array.from({ length: 120 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      size: Math.random() * 1.5,
      alpha: 0.2 + Math.random() * 0.5,
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
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.4})`;
        ctx.fill();
      });

      // 1. Render Concentric Orbital Rings & Community Cohort Labels
      const orbitRadii = [110, 150, 190, 240, 280, 320];
      const orbitLabels = [
        '✨ CREATORS',
        '🚀 INFLUENCERS',
        '🔥 FANS & VIRAL SPREADERS',
        '👔 CUSTOMERS & ENTERPRISE',
        '🧐 SKEPTICS & CRITICS',
        '🤖 ALGORITHM NEURAL HUB',
      ];

      orbitRadii.forEach((rad, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, rad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 + Math.sin(pulseTime + i) * 0.03})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label on orbit
        if (i < orbitLabels.length) {
          ctx.font = 'bold 9px Geist, sans-serif';
          ctx.fillStyle = 'rgba(161, 161, 170, 0.35)';
          ctx.textAlign = 'center';
          ctx.fillText(orbitLabels[i], centerX, centerY - rad - 4);
        }
      });

      // Update positions with organic orbital motion around Content Core
      currentNodes.forEach((node) => {
        if (isRunning) {
          node.angle = (node.angle || 0) + (node.orbitSpeed || 0.005) * speed;
          node.x = centerX + Math.cos(node.angle) * (node.orbitRadius || 150);
          node.y = centerY + Math.sin(node.angle) * (node.orbitRadius || 150);
        }
      });

      // 2. Draw Neural Connections (Core to Nodes + Node to Node)
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

      // 3. Render Dynamic Traveling Data Packets (Likes, Comments, Shares)
      packetsRef.current.forEach((pkt, idx) => {
        if (isRunning) pkt.progress += pkt.speed * speed;

        const source = currentNodes.find((n) => n.id === pkt.sourceId) || { x: centerX, y: centerY };
        const target = currentNodes.find((n) => n.id === pkt.targetId) || { x: centerX, y: centerY };

        const px = source.x + (target.x - source.x) * pkt.progress;
        const py = source.y + (target.y - source.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Filter finished packets
      packetsRef.current = packetsRef.current.filter((p) => p.progress < 1);

      // 4. Render Hero Central Content Payload Core Node
      const heroPulse = (Math.sin(pulseTime * 2) + 1) * 8;

      // Outer radial aura
      ctx.beginPath();
      ctx.arc(centerX, centerY, 42 + heroPulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124, 58, 237, 0.12)';
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();

      // Main Core Circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1b4b';
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#a78bfa';
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚀', centerX, centerY + 1);

      ctx.font = 'bold 11px Geist, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('UPLOADED CONTENT', centerX, centerY + 46);

      // 5. Render Community Nodes
      currentNodes.forEach((node) => {
        const isAlgo = node.cluster === 'Algorithm';
        const breathe = Math.sin(pulseTime * 1.5 + node.angle * 2) * 2.5;
        const radius = (isAlgo ? 26 : 18) + breathe;

        // Reach Aura
        if (stage >= 3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 10, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}33`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Main Node Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0d0d12';
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isRunning ? 18 : 6;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Avatar Emoji
        ctx.font = '15px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.avatar, node.x, node.y + 1);

        // Label
        ctx.font = '500 11px Geist, sans-serif';
        ctx.fillStyle = '#e4e4e7';
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

      {/* Floating Reaction Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-xl animate-particle-float transition-all"
            style={{ left: `${p.x}px`, top: `${p.y}px` }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* FLOATING TIKTOK-STYLE LIVE COMMENTS OVERLAY */}
      <div className="absolute bottom-20 left-6 z-20 pointer-events-none max-w-sm space-y-2">
        <AnimatePresence>
          {visibleComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-3 rounded-2xl border border-white/10 shadow-2xl flex items-start space-x-3 pointer-events-auto"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 font-bold shadow-sm"
                style={{ backgroundColor: `${comment.authorColor}30` }}
              >
                {comment.authorAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white leading-none">
                    {comment.authorName}
                  </span>
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
      <div className="flex-1 relative w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
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
