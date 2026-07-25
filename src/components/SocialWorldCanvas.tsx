'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Activity,
  Flame,
  MessageSquare,
  Share2,
  Sparkles,
  Zap,
  Radio,
} from 'lucide-react';
import { NetworkNode, NetworkEdge, Comment } from '@/types/simulator';

interface FloatingReaction {
  id: string;
  x: number;
  y: number;
  emoji: string;
  opacity: number;
  scale: number;
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
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const animFrameId = useRef<number | null>(null);
  const nodesRef = useRef<NetworkNode[]>(nodes);
  nodesRef.current = nodes;

  const reactionsList = ['🔥', '💡', '🚀', '💬', '😡', '✨', '🔁', '⚡', '💎', '🎯'];

  // Trigger floating reaction particles periodically as simulation runs
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (nodesRef.current.length === 0) return;
      const randomNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
      const emoji = reactionsList[Math.floor(Math.random() * reactionsList.length)];

      const newParticle: FloatingReaction = {
        id: `react-${Date.now()}-${Math.random()}`,
        x: randomNode.x,
        y: randomNode.y - 20,
        emoji,
        opacity: 1,
        scale: 0.9 + Math.random() * 0.4,
      };

      setFloatingReactions((prev) => [...prev.slice(-18), newParticle]);
    }, 500 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed]);

  // Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pulseTime = 0;

    const render = () => {
      pulseTime += 0.05 * speed;

      // Handle High-DPI canvas resizing
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentNodes = nodesRef.current;
      const padding = 50;

      // Physics update
      currentNodes.forEach((node) => {
        if (isRunning) {
          node.x += node.vx * speed;
          node.y += node.vy * speed;

          if (node.x < padding || node.x > canvas.width - padding) node.vx *= -1;
          if (node.y < padding || node.y > canvas.height - padding) node.vy *= -1;
        }
      });

      // 1. Draw Edges
      edges.forEach((edge) => {
        const source = currentNodes.find((n) => n.id === edge.sourceId);
        const target = currentNodes.find((n) => n.id === edge.targetId);
        if (!source || !target) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        const isActive = stage >= 2 && (source.state !== 'idle' || target.state !== 'idle');

        if (isActive) {
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.3 + Math.sin(pulseTime) * 0.15})`;
          ctx.lineWidth = 1.8;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
          ctx.lineWidth = 1;
        }
        ctx.stroke();

        // Animated signal pulse traveling along active edge
        if (isActive && isRunning) {
          const pulsePos = (pulseTime * 0.5) % 1;
          const px = source.x + (target.x - source.x) * pulsePos;
          const py = source.y + (target.y - source.y) * pulsePos;

          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#a5b4fc';
          ctx.shadowColor = '#818cf8';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 2. Draw Nodes
      currentNodes.forEach((node) => {
        const isAlgo = node.role.includes('Algorithm');
        const nodeRadius = isAlgo ? 28 : 20;

        // Expanding ripple rings if active/viral
        if (stage >= 3 && (isAlgo || node.reachLevel > 2)) {
          const rippleRadius = nodeRadius + (Math.sin(pulseTime * 2) + 1) * 14;
          ctx.beginPath();
          ctx.arc(node.x, node.y, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}44`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node Outer Glow Ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isAlgo ? '#18181b' : '#0c0c0e';
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isRunning ? 20 : 8;
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Avatar Emoji / Symbol rendering
        ctx.font = isAlgo ? '18px sans-serif' : '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.avatar, node.x, node.y + 1);

        // Crisp Label Tag below
        ctx.font = 'bold 11px Geist, sans-serif';
        ctx.fillStyle = '#e4e4e7';
        ctx.fillText(node.name, node.x, node.y + nodeRadius + 15);
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [edges, isRunning, speed, stage]);

  const stageLabels = {
    1: { title: 'Stage 1: Content Ingestion', desc: 'Analyzing video hook & audience persona match...' },
    2: { title: 'Stage 2: Early Impression Wave', desc: 'First 20 AI entities evaluating 0-8s retention...' },
    3: { title: 'Stage 3: Algorithm Feed Boost', desc: 'High retention score triggers 10x distribution wave!' },
    4: { title: 'Stage 4: Exponential Viral Cascade', desc: 'Cross-platform shares & comment debates emerging!' },
  };

  const progressPct = (currentTime / duration) * 100;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] relative bg-zinc-950/90 overflow-hidden">
      {/* Top Floating Stage Indicator */}
      <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center space-x-3 pointer-events-auto border border-white/10 shadow-2xl">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white">
                {stageLabels[stage].title}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">
              {stageLabels[stage].desc}
            </p>
          </div>
        </div>

        {/* Live Stats Pills */}
        <div className="hidden sm:flex items-center space-x-2 pointer-events-auto">
          <div className="glass-panel px-3.5 py-2 rounded-xl flex items-center space-x-2 text-xs border border-white/10 shadow-lg">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span className="text-zinc-300 font-mono">
              Active Reactions: <strong className="text-white">{Math.round(currentTime * 4.2)}</strong>
            </span>
          </div>
          <div className="glass-panel px-3.5 py-2 rounded-xl flex items-center space-x-2 text-xs border border-white/10 shadow-lg">
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span className="text-zinc-300 font-mono">
              Reach Multiplier: <strong className="text-indigo-300">{(1 + currentTime * 0.15).toFixed(1)}x</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Reaction Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {floatingReactions.map((p) => (
          <div
            key={p.id}
            className="absolute text-2xl animate-float-particle transition-all drop-shadow-md"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              opacity: p.opacity,
              transform: `scale(${p.scale})`,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* Main Interactive HTML5 Canvas */}
      <div className="flex-1 relative w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
      </div>

      {/* Bottom Scrubber & Control Bar */}
      <div className="p-4 border-t border-white/10 glass-panel z-20 space-y-3">
        {/* Scrubber Slider */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono font-bold text-indigo-400 w-12 text-right">
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, '0')}
          </span>

          <div className="flex-1 relative group cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration}
              step="1"
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:bg-zinc-700 transition-colors"
            />
            <div
              className="absolute left-0 top-0 h-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-lg pointer-events-none"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <span className="text-xs font-mono text-zinc-500 w-12">
            01:00
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={onTogglePlay}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center space-x-2 font-bold cursor-pointer border border-indigo-400/30"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="text-xs">{isRunning ? 'PAUSE WORLD' : 'RUN WORLD SIMULATION'}</span>
            </button>

            <button
              onClick={() => onSeek(0)}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
              title="Restart Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Modifiers */}
          <div className="flex items-center space-x-1 bg-zinc-900/90 p-1.5 rounded-xl border border-white/10">
            {[1, 2, 5].map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed(s)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  speed === s
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
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
