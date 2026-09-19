/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';

export type SparklineTheme = 'emerald' | 'amber' | 'indigo' | 'sky' | 'rose';

interface SparklineChartProps {
  data: number[];
  width?: number | string;
  height?: number;
  theme?: SparklineTheme;
  label?: string;
  unit?: string;
  targetRefValue?: number;
  targetRefLabel?: string;
  showMinMax?: boolean;
  showCurrentBadge?: boolean;
  minScale?: number;
  maxScale?: number;
  className?: string;
}

const THEME_CONFIGS: Record<
  SparklineTheme,
  {
    stroke: string;
    fillGradientStart: string;
    fillGradientStop: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  emerald: {
    stroke: '#10b981',
    fillGradientStart: 'rgba(16, 185, 129, 0.35)',
    fillGradientStop: 'rgba(16, 185, 129, 0.0)',
    glow: 'rgba(16, 185, 129, 0.4)',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
    badgeText: 'text-emerald-400'
  },
  amber: {
    stroke: '#f59e0b',
    fillGradientStart: 'rgba(245, 158, 11, 0.35)',
    fillGradientStop: 'rgba(245, 158, 11, 0.0)',
    glow: 'rgba(245, 158, 11, 0.4)',
    badgeBg: 'bg-amber-500/10 border-amber-500/20',
    badgeText: 'text-amber-400'
  },
  indigo: {
    stroke: '#6366f1',
    fillGradientStart: 'rgba(99, 102, 241, 0.35)',
    fillGradientStop: 'rgba(99, 102, 241, 0.0)',
    glow: 'rgba(99, 102, 241, 0.4)',
    badgeBg: 'bg-indigo-500/10 border-indigo-500/20',
    badgeText: 'text-indigo-400'
  },
  sky: {
    stroke: '#0ea5e9',
    fillGradientStart: 'rgba(14, 165, 233, 0.35)',
    fillGradientStop: 'rgba(14, 165, 233, 0.0)',
    glow: 'rgba(14, 165, 233, 0.4)',
    badgeBg: 'bg-sky-500/10 border-sky-500/20',
    badgeText: 'text-sky-400'
  },
  rose: {
    stroke: '#f43f5e',
    fillGradientStart: 'rgba(244, 63, 94, 0.35)',
    fillGradientStop: 'rgba(244, 63, 94, 0.0)',
    glow: 'rgba(244, 63, 94, 0.4)',
    badgeBg: 'bg-rose-500/10 border-rose-500/20',
    badgeText: 'text-rose-400'
  }
};

export function SparklineChart({
  data,
  width = '100%',
  height = 56,
  theme = 'emerald',
  label,
  unit = '',
  targetRefValue,
  targetRefLabel,
  showMinMax = true,
  showCurrentBadge = true,
  minScale,
  maxScale,
  className = ''
}: SparklineChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const colors = THEME_CONFIGS[theme];
  const uniqueId = useMemo(() => `sparkline-grad-${theme}-${Math.random().toString(36).substr(2, 6)}`, [theme]);

  const sanitizedData = useMemo(() => {
    if (!data || data.length === 0) return [0, 0];
    if (data.length === 1) return [data[0], data[0]];
    return data;
  }, [data]);

  const currentValue = sanitizedData[sanitizedData.length - 1] ?? 0;

  const { points, linePath, areaPath, minVal, maxVal, targetY, coordinates } = useMemo(() => {
    const vals = sanitizedData;
    const computedMin = minScale !== undefined ? minScale : Math.min(...vals);
    let computedMax = maxScale !== undefined ? maxScale : Math.max(...vals);

    if (computedMax === computedMin) {
      computedMax = computedMin + 1;
    }

    const range = computedMax - computedMin;
    const svgWidth = 240;
    const svgHeight = height;
    const paddingX = 4;
    const paddingTop = 6;
    const paddingBottom = 6;
    const innerHeight = svgHeight - paddingTop - paddingBottom;
    const innerWidth = svgWidth - paddingX * 2;

    const coords = vals.map((v, i) => {
      const x = paddingX + (i / (vals.length - 1)) * innerWidth;
      const normalizedY = (v - computedMin) / range;
      const y = paddingTop + innerHeight - normalizedY * innerHeight;
      return { x, y, value: v };
    });

    // Build smooth Bezier path
    let dLine = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? i : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2 < coords.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      dLine += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const dArea = `${dLine} L ${coords[coords.length - 1].x.toFixed(1)} ${svgHeight} L ${coords[0].x.toFixed(1)} ${svgHeight} Z`;

    let targetCoordY: number | null = null;
    if (targetRefValue !== undefined) {
      const norm = (targetRefValue - computedMin) / range;
      targetCoordY = paddingTop + innerHeight - norm * innerHeight;
    }

    return {
      points: coords,
      linePath: dLine,
      areaPath: dArea,
      minVal: computedMin,
      maxVal: computedMax,
      targetY: targetCoordY,
      coordinates: coords
    };
  }, [sanitizedData, height, minScale, maxScale, targetRefValue]);

  const activeHoverPoint = hoverIndex !== null && coordinates[hoverIndex] ? coordinates[hoverIndex] : null;

  return (
    <div className={`flex flex-col gap-1 w-full select-none ${className}`}>
      {/* Header bar with label, target, and current readout */}
      {(label || showCurrentBadge) && (
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 font-medium text-slate-400">
            {label && <span>{label}</span>}
            {targetRefLabel && (
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/5 text-slate-400">
                Ref: {targetRefLabel}
              </span>
            )}
          </div>

          {showCurrentBadge && (
            <div className="flex items-baseline gap-1">
              <span className={`font-mono font-bold text-xs ${colors.badgeText}`}>
                {activeHoverPoint ? activeHoverPoint.value.toFixed(1) : currentValue.toFixed(1)}
              </span>
              {unit && <span className="font-mono text-[9px] text-slate-400">{unit}</span>}
            </div>
          )}
        </div>
      )}

      {/* SVG Sparkline Container */}
      <div
        className="relative w-full overflow-hidden rounded-lg bg-black/10 border border-inherit cursor-crosshair group"
        style={{ height: `${height}px` }}
        onMouseLeave={() => setHoverIndex(null)}
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width;
          const idx = Math.min(coordinates.length - 1, Math.max(0, Math.round(relX * (coordinates.length - 1))));
          setHoverIndex(idx);
        }}
      >
        <svg
          viewBox={`0 0 240 ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full block"
          style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }}
        >
          <defs>
            <linearGradient id={uniqueId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.fillGradientStart} />
              <stop offset="100%" stopColor={colors.fillGradientStop} />
            </linearGradient>
          </defs>

          {/* Reference target line if provided (e.g. 60 FPS target line) */}
          {targetY !== null && targetY >= 0 && targetY <= height && (
            <line
              x1="0"
              y1={targetY}
              x2="240"
              y2={targetY}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          )}

          {/* Sparkline Gradient Fill */}
          <path d={areaPath} fill={`url(#${uniqueId})`} />

          {/* Sparkline Stroke Line */}
          <path d={linePath} fill="none" stroke={colors.stroke} strokeWidth="1.8" strokeLinecap="round" />

          {/* Active Hover / Current Dot */}
          {activeHoverPoint ? (
            <>
              <line
                x1={activeHoverPoint.x}
                y1="0"
                x2={activeHoverPoint.x}
                y2={height}
                stroke={colors.stroke}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.7"
              />
              <circle cx={activeHoverPoint.x} cy={activeHoverPoint.y} r="3.5" fill="#ffffff" stroke={colors.stroke} strokeWidth="2" />
            </>
          ) : (
            <circle
              cx={coordinates[coordinates.length - 1]?.x ?? 236}
              cy={coordinates[coordinates.length - 1]?.y ?? height / 2}
              r="2.5"
              fill={colors.stroke}
            />
          )}
        </svg>

        {/* Hover Readout Tooltip */}
        {activeHoverPoint && (
          <div
            className="absolute top-1 pointer-events-none px-1.5 py-0.5 rounded bg-slate-900/90 text-white font-mono text-[9px] border border-white/10 shadow-lg -translate-x-1/2 backdrop-blur-md"
            style={{
              left: `${(activeHoverPoint.x / 240) * 100}%`
            }}
          >
            {activeHoverPoint.value.toFixed(1)} {unit}
          </div>
        )}
      </div>

      {/* Min / Max Guides */}
      {showMinMax && (
        <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 px-0.5">
          <span>Min: {minVal.toFixed(0)}{unit}</span>
          <span>Max: {maxVal.toFixed(0)}{unit}</span>
        </div>
      )}
    </div>
  );
}
