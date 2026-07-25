'use client';

import React from 'react';
import { RetentionPoint } from '@/types/simulator';
import { Flame, Snowflake, AlertTriangle, Sparkles } from 'lucide-react';

interface RetentionGraphProps {
  timeline: RetentionPoint[];
  currentTime: number;
  onSeek: (time: number) => void;
}

export const RetentionGraph: React.FC<RetentionGraphProps> = ({
  timeline,
  currentTime,
  onSeek,
}) => {
  if (!timeline || timeline.length === 0) return null;

  const width = 360;
  const height = 140;
  const maxTime = 60;

  // Build SVG path points
  const points = timeline.map((pt) => {
    const x = (pt.time / maxTime) * width;
    const y = height - (pt.retentionPct / 100) * (height - 20) - 10;
    return { ...pt, x, y };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  // Find key moments with notes
  const keyMoments = timeline.filter((pt) => pt.isKeyMoment && pt.note);

  return (
    <div className="space-y-4">
      {/* Retention Graph Container */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Attention & Retention Curve
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            60 Seconds Window
          </span>
        </div>

        {/* SVG Area Chart */}
        <div className="relative w-full h-[140px] cursor-pointer">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Fill */}
            <path d={areaD} fill="url(#retentionGradient)" />

            {/* Main Stroke Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Current Simulation Scrub Line */}
            <line
              x1={(currentTime / maxTime) * width}
              y1="0"
              x2={(currentTime / maxTime) * width}
              y2={height}
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="4 2"
            />

            {/* Key Moment Data Circles */}
            {points.map((pt, i) => {
              if (!pt.isKeyMoment) return null;
              const isFire = pt.status === 'fire';
              return (
                <g
                  key={i}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  onClick={() => onSeek(pt.time)}
                  className="cursor-pointer hover:scale-125 transition-transform"
                >
                  <circle
                    r="6"
                    fill={isFire ? '#ef4444' : '#38bdf8'}
                    className="animate-pulse"
                  />
                  <circle r="3" fill="#ffffff" />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2 border-t border-white/5 pt-2">
          <span>0:00 Hook</span>
          <span>0:15 Demo</span>
          <span>0:30 Payload</span>
          <span>0:45 Offer</span>
          <span>1:00 Outro</span>
        </div>
      </div>

      {/* Key Retention Drop-off & Spike Explanations */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
          Retention Micro-Insights
        </span>

        {keyMoments.map((moment, index) => {
          const isFire = moment.status === 'fire';
          return (
            <div
              key={index}
              onClick={() => onSeek(moment.time)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                isFire
                  ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50'
                  : 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500/50'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isFire ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}
              >
                {isFire ? <Flame className="w-3.5 h-3.5" /> : <Snowflake className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    @{moment.timeFormatted}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-zinc-300">
                    {moment.retentionPct}% Retention
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 mt-0.5 leading-snug">
                  {moment.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
