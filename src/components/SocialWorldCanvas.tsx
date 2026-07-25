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

  // Spawn dynamic data laser packets periodically (Warm Ivory Palette)
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (edges.length > 0) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const packetColors = ['#DEDBC8', '#ECE8D9', '#7BC89C', '#D9B76A'];
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

  // Main Canvas Render Loop (Enterprise Network Ecosystem — Warm Ivory System)
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
        ctx.fillStyle = `rgba(247, 246, 241, ${star.alpha * 0.35})`;
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
        ctx.strokeStyle = `rgba(222, 219, 200, ${0.05 + Math.sin(pulseTime + i) * 0.025})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        if (i < orbitLabels.length) {
          ctx.font = 'bold 9px Geist, sans-serif';
          ctx.fillStyle = 'rgba(247, 246, 241, 0.35)';
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

      // 2. Draw Connection Lines: rgba(222,219,200,0.12)
      currentNodes.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = `rgba(222, 219, 200, ${0.12 + Math.sin(pulseTime * 2 + node.x) * 0.05})`;
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
        ctx.strokeStyle = `rgba(222, 219, 200, ${0.10 + Math.sin(pulseTime) * 0.04})`;
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

      // 4. Render Hero Central Content Payload Node (Warm Ivory Glow with Soft Bloom)
      const heroPulse = (Math.sin(pulseTime * 2) + 1) * 8;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 40 + heroPulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(222, 219, 200, 0.08)';
      ctx.strokeStyle = 'rgba(222, 219, 200, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#181818';
      ctx.shadowColor = '#DEDBC8';
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#DEDBC8';
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = 'bold 12px Geist, sans-serif';
      ctx.fillStyle = '#F7F6F1';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CONTENT', centerX, centerY - 4);
      ctx.fillText('PAYLOAD', centerX, centerY + 8);

      ctx.font = 'bold 11px Geist, sans-serif';
      ctx.fillStyle = 'rgba(247, 246, 241, 0.45)';
      ctx.fillText('TARGET MEDIA CORE', centerX, centerY + 46);

      // 5. Render Professional Persona Avatars & Status Badges
      currentNodes.forEach((node) => {
        const isAlgo = node.cluster === 'Algorithm';
        const breathe = Math.sin(pulseTime * 1.5 + node.angle * 2) * 2;
        const radius = (isAlgo ? 24 : 20) + breathe;

        // Outer Cluster Glow Ring (#DEDBC8 for Primary, Soft Gray for Secondary)
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(222, 219, 200, 0.35)';
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
          ctx.fillStyle = '#F7F6F1';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.initials || 'US', node.x, node.y + 1);
        }

        // Status Indicator Dot (Top Right of Avatar)
        const badgeX = node.x + radius * 0.7;
        const badgeY = node.y - radius * 0.7;

        ctx.beginPath();
        ctx.arc(badgeX, badgeY, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = node.badge === 'Verified' || node.badge === 'Influencer' ? '#DEDBC8' : node.badge === 'Online' ? '#7BC89C' : '#A1A1AA';
        ctx.strokeStyle = '#09090d';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        // Crisp User Name Label Below
        ctx.font = '500 11px Geist, sans-serif';
        ctx.fillStyle = '#F7F6F1';
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
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] relative bg-[#000000] overflow-hidden">
      {/* Stage Badge */}
      <div className="absolute top-5 left-6 z-20 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center space-x-2.5 pointer-events-auto shadow-xl border border-[#DEDBC8]/20">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DEDBC8] animate-ping" />
          <span className="text-xs font-bold text-[#F7F6F1]">
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
              className="glass-card p-3.5 rounded-2xl border border-[#DEDBC8]/15 shadow-2xl flex items-start space-x-3 pointer-events-auto bg-[#111111]/80"
            >
              {/* Profile Image / Initials */}
              <div className="relative shrink-0">
                <img
                  src={comment.authorAvatarUrl || (comment as any).avatarUrl}
                  alt={comment.authorName || (comment as any).userName}
                  className="w-8 h-8 rounded-full border border-[#DEDBC8]/30 object-cover"
                />
              </div>

              {/* Comment Data */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="text-xs font-bold text-[#F7F6F1] truncate">
                      {comment.authorName || (comment as any).userName}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {comment.authorHandle || (comment as any).userHandle}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold shrink-0">
                    +{(comment as any).sentimentScore || 90}%
                  </span>
                </div>

                <p className="text-xs text-gray-300 mt-1 leading-snug font-normal">
                  {comment.content || (comment as any).text}
                </p>

                {/* Social Metrics Pill */}
                <div className="flex items-center space-x-3 mt-2 text-[10px] text-gray-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-[#DEDBC8]" />
                    <span>{comment.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Share2 className="w-3 h-3 text-[#DEDBC8]" />
                    <span>{comment.shares}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CANVAS ELEMENT */}
      <canvas
        ref={canvasRef}
        onClick={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;

          const clickedNode = nodes.find((n) => {
            const dist = Math.hypot((n.x || 0) - clickX, (n.y || 0) - clickY);
            return dist < 30;
          });

          if (clickedNode && onSelectNode) {
            onSelectNode(clickedNode);
          }
        }}
        className="w-full h-full cursor-crosshair"
      />

      {/* BOTTOM CONTROLS & TIMELINE TOOLBAR */}
      <div className="h-16 px-6 bg-[#0A0A0A]/90 border-t border-white/10 flex items-center justify-between z-20">
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className="p-2.5 rounded-xl bg-[#DEDBC8] hover:bg-[#ECE8D9] text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(222,219,200,0.2)] active:scale-95 flex items-center justify-center shrink-0"
        >
          {isRunning ? <Pause className="w-4 h-4 text-black fill-current" /> : <Play className="w-4 h-4 text-black fill-current ml-0.5" />}
        </button>

        {/* Timeline Slider */}
        <div className="flex-1 mx-6 flex items-center space-x-3">
          <span className="text-xs font-mono text-[#DEDBC8] shrink-0">
            {currentTime.toFixed(1)}s
          </span>

          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="flex-1 accent-[#DEDBC8] cursor-pointer h-1.5 rounded-lg bg-zinc-800"
          />

          <span className="text-xs font-mono text-gray-400 shrink-0">
            {duration}s
          </span>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center space-x-1 bg-[#111111] p-1 rounded-xl border border-white/10 shrink-0">
          {[1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => onChangeSpeed(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                speed === s
                  ? 'bg-[#DEDBC8] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
