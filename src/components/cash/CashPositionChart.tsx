import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cashPositionChart } from '../../data/mockData';

const SVG_W = 480;
const SVG_H = 200;
const PAD_LEFT = 42;
const PAD_RIGHT = 8;
const PAD_TOP = 16;
const PAD_BOTTOM = 22;
const chartW = SVG_W - PAD_LEFT - PAD_RIGHT;
const chartH = SVG_H - PAD_TOP - PAD_BOTTOM;

/** Map a 0-100 normalised value to an SVG y coordinate. */
const toY = (v: number, min: number, range: number): number =>
  PAD_TOP + chartH - ((v - min) / range) * chartH;

/** Map an index to an SVG x coordinate. */
const toX = (i: number, count: number): number =>
  PAD_LEFT + (i / (count - 1)) * chartW;

/** Y-axis tick values (normalised 0-100 scale mapped to billions). */
const Y_TICKS = [0, 25, 50, 75, 100];
const Y_TICK_LABELS = ['₹0B', '₹25B', '₹50B', '₹75B', '₹100B'];
const Y_TICK_LEN = 4; // length of the small horizontal tick mark

/**
 * Build a smooth bezier path string through an array of {x,y} points.
 * Uses a simple catmull-rom-style approach for smooth curves.
 */
const buildSmoothPath = (
  pts: { x: number; y: number }[],
): string => {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M${pts[0].x},${pts[0].y}`;

  let d = `M${pts[0].x},${pts[0].y}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];

    const tension = 0.3;
    const cp1x = p1.x + ((p2.x - p0.x) * tension);
    const cp1y = p1.y + ((p2.y - p0.y) * tension);
    const cp2x = p2.x - ((p3.x - p1.x) * tension);
    const cp2y = p2.y - ((p3.y - p1.y) * tension);

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  return d;
};

/**
 * Close a line path into an area by dropping straight down to the
 * bottom of the chart and back to the start.
 */
const buildAreaPath = (
  pts: { x: number; y: number }[],
  linePath: string,
): string => {
  if (pts.length === 0) return '';
  const bottom = PAD_TOP + chartH;
  return `${linePath} L${pts[pts.length - 1].x},${bottom} L${pts[0].x},${bottom} Z`;
};

const CashPositionChart: React.FC = () => {
  const { xLabels, historic, projection } = cashPositionChart;

  const { min, range } = useMemo(() => {
    const allValues = [
      ...historic,
      ...projection.filter((v): v is number => v !== null),
    ];
    const lo = Math.min(...allValues);
    const hi = Math.max(...allValues);
    const r = hi - lo || 1;
    // add a small margin so lines don't sit on the very edge
    return { min: lo - r * 0.05, range: (r + r * 0.1) };
  }, [historic, projection]);

  const count = xLabels.length;

  /* ---- Historic series ---- */
  const historicPts = useMemo(
    () =>
      historic.map((v, i) => ({
        x: toX(i, count),
        y: toY(v, min, range),
      })),
    [historic, count, min, range],
  );
  const historicLine = useMemo(() => buildSmoothPath(historicPts), [historicPts]);
  const historicArea = useMemo(
    () => buildAreaPath(historicPts, historicLine),
    [historicPts, historicLine],
  );

  /* ---- Projection series (only non-null entries) ---- */
  const projectionPts = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    projection.forEach((v, i) => {
      if (v !== null) {
        pts.push({ x: toX(i, count), y: toY(v, min, range) });
      }
    });
    return pts;
  }, [projection, count, min, range]);
  const projectionLine = useMemo(
    () => buildSmoothPath(projectionPts),
    [projectionPts],
  );
  const projectionArea = useMemo(
    () => buildAreaPath(projectionPts, projectionLine),
    [projectionPts, projectionLine],
  );

  /* Approximate total path length for dash-draw animation */
  const PATH_LEN = 800;

  return (
    <motion.div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: 12,
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'column' as const,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Top row: title + legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}
      >
        {/* Title */}
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          Cash Position
        </span>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: '"Inter", sans-serif',
            fontSize: 9,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Historic legend */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="3" style={{ display: 'block' }}>
              <line
                x1="0"
                y1="1.5"
                x2="12"
                y2="1.5"
                stroke="#00F2FF"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </svg>
            Historic
          </span>

          {/* Projection legend */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="3" style={{ display: 'block' }}>
              <line
                x1="0"
                y1="1.5"
                x2="12"
                y2="1.5"
                stroke="#FF00E5"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="3 2"
              />
            </svg>
            Projection
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible', display: 'block', flex: 1 }}
      >
        <defs>
          {/* Historic area gradient */}
          <linearGradient id="cashHistGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0, 242, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(0, 242, 255, 0.05)" />
          </linearGradient>

          {/* Projection area gradient */}
          <linearGradient id="cashProjGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 0, 229, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 0, 229, 0.03)" />
          </linearGradient>
        </defs>

        {/* Vertical grid lines */}
        {xLabels.map((_, i) => {
          const x = toX(i, count);
          return (
            <line
              key={`grid-${i}`}
              x1={x}
              y1={PAD_TOP}
              x2={x}
              y2={PAD_TOP + chartH}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth={1}
            />
          );
        })}

        {/* Y-axis line */}
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP}
          x2={PAD_LEFT}
          y2={PAD_TOP + chartH}
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth={1}
        />

        {/* Y-axis ticks, labels, and horizontal grid lines */}
        {Y_TICKS.map((tick, i) => {
          const y = toY(tick, min, range);
          return (
            <g key={`ytick-${i}`}>
              {/* Horizontal grid line */}
              <line
                x1={PAD_LEFT}
                y1={y}
                x2={PAD_LEFT + chartW}
                y2={y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={1}
              />
              {/* Tick mark */}
              <line
                x1={PAD_LEFT - Y_TICK_LEN}
                y1={y}
                x2={PAD_LEFT}
                y2={y}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth={1}
              />
              {/* Label */}
              <text
                x={PAD_LEFT - Y_TICK_LEN - 2}
                y={y}
                textAnchor="end"
                dominantBaseline="central"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 7,
                  fill: 'rgba(255, 255, 255, 0.35)',
                }}
              >
                {Y_TICK_LABELS[i]}
              </text>
            </g>
          );
        })}

        {/* Historic area fill */}
        <motion.path
          d={historicArea}
          fill="url(#cashHistGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        />

        {/* Historic line (draw-in animation) */}
        <motion.path
          d={historicLine}
          fill="none"
          stroke="#00F2FF"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: PATH_LEN, strokeDashoffset: PATH_LEN }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />

        {/* Projection area fill */}
        <motion.path
          d={projectionArea}
          fill="url(#cashProjGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
        />

        {/* Projection line (dashed, fade-in after historic) */}
        <motion.path
          d={projectionLine}
          fill="none"
          stroke="#FF00E5"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        />

        {/* X-axis labels */}
        {xLabels.map((label, i) => (
          <text
            key={`xlabel-${i}`}
            x={toX(i, count)}
            y={SVG_H - 3}
            textAnchor="middle"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 8,
              fill: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            {label}
          </text>
        ))}
      </svg>
    </motion.div>
  );
};

export default CashPositionChart;
