import React from 'react';
import { motion } from 'framer-motion';
import { historicalTrendsData } from '../../data/mockData';

const SVG_W = 280;
const SVG_H = 158;
const PAD_LEFT = 26;
const PAD_RIGHT = 8;
const PAD_TOP = 8;
const PAD_BOTTOM = 16;
const CHART_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const CHART_H = SVG_H - PAD_TOP - PAD_BOTTOM;
const GRID_LINES = 4;

/* Flatten all points to compute a shared Y-axis range. */
const allPoints = historicalTrendsData.series.flatMap((s) => s.points);
const MIN_VAL = Math.min(...allPoints);
const MAX_VAL = Math.max(...allPoints);
const VAL_RANGE = MAX_VAL - MIN_VAL || 1;

/** Map a data point (seriesIndex, pointIndex) to SVG coordinates. */
const toXY = (val: number, idx: number, totalPts: number) => ({
  x: PAD_LEFT + (idx / (totalPts - 1)) * CHART_W,
  y: PAD_TOP + CHART_H - ((val - MIN_VAL) / VAL_RANGE) * CHART_H,
});

/**
 * Build a smooth cubic bezier path through all points using
 * a Catmull-Rom-to-Bezier conversion (uniform parameterisation, tension 0).
 */
const buildSmoothPath = (points: number[]): string => {
  const coords = points.map((v, i) => toXY(v, i, points.length));
  if (coords.length < 2) return '';

  let d = `M${coords[0].x},${coords[0].y}`;

  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i - 1] ?? coords[0];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[i + 2] ?? coords[coords.length - 1];

    // Catmull-Rom tangents -> cubic bezier control points (tension = 0, factor 1/6)
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  return d;
};

/**
 * Build a closed area path: the smooth curve on top, then a straight
 * line along the bottom of the chart, closing the shape for a subtle fill.
 */
const buildAreaPath = (points: number[]): string => {
  const smoothD = buildSmoothPath(points);
  if (!smoothD) return '';
  const lastPt = toXY(points[points.length - 1], points.length - 1, points.length);
  const firstPt = toXY(points[0], 0, points.length);
  return `${smoothD} L${lastPt.x},${PAD_TOP + CHART_H} L${firstPt.x},${PAD_TOP + CHART_H} Z`;
};

/** Pre-compute paths and estimated total lengths for dash animation. */
const seriesPaths = historicalTrendsData.series.map((s) => ({
  ...s,
  d: buildSmoothPath(s.points),
  areaD: buildAreaPath(s.points),
  approxLen: 600, // generous upper-bound for dasharray animation
}));

const HistoricalTrends: React.FC = () => {
  return (
    <motion.div
      style={{
        height: '100%',
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
      {/* Sub-header */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 6,
        }}
      >
        HISTORICAL TRENDS (5-Year)
      </div>

      {/* Sparkline SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ overflow: 'hidden', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Y-axis line */}
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP}
          x2={PAD_LEFT}
          y2={PAD_TOP + CHART_H}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
        />

        {/* Y-axis tick marks and labels */}
        {[30, 50, 70].map((tickVal) => {
          const y = PAD_TOP + CHART_H - ((tickVal - MIN_VAL) / VAL_RANGE) * CHART_H;
          return (
            <g key={`ytick-${tickVal}`}>
              <line
                x1={PAD_LEFT - 3}
                y1={y}
                x2={PAD_LEFT}
                y2={y}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 5}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize={7}
                fontFamily="Inter, sans-serif"
              >
                {tickVal}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {Array.from({ length: 5 }).map((_, i) => {
          const x = PAD_LEFT + (i / 4) * CHART_W;
          return (
            <text
              key={`xlabel-${i}`}
              x={x}
              y={PAD_TOP + CHART_H + 11}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize={7}
              fontFamily="Inter, sans-serif"
            >
              {`Y${i + 1}`}
            </text>
          );
        })}

        {/* Subtle horizontal grid lines */}
        {Array.from({ length: GRID_LINES }).map((_, i) => {
          const y = PAD_TOP + ((i + 1) / (GRID_LINES + 1)) * CHART_H;
          return (
            <line
              key={`grid-${i}`}
              x1={PAD_LEFT}
              y1={y}
              x2={PAD_LEFT + CHART_W}
              y2={y}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth={1}
            />
          );
        })}

        {/* Clip path to constrain lines within chart area */}
        <defs>
          <clipPath id="htChartClip">
            <rect x={PAD_LEFT} y={PAD_TOP} width={CHART_W} height={CHART_H} />
          </clipPath>
        </defs>

        {/* Data clipped to chart area */}
        <g clipPath="url(#htChartClip)">
        {/* Area fills beneath each line */}
        {seriesPaths.map((s) => (
          <motion.path
            key={`area-${s.label}`}
            d={s.areaD}
            fill={s.color}
            opacity={0.06}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}

        {/* Data lines - animated draw-in with glow */}
        {seriesPaths.map((s, idx) => (
          <motion.path
            key={s.label}
            d={s.d}
            fill="none"
            stroke={s.color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 2px ${s.color}4D)` }}
            initial={{ strokeDashoffset: s.approxLen, strokeDasharray: s.approxLen }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: idx * 0.1,
            }}
          />
        ))}
        </g>
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
          marginTop: 6,
        }}
      >
        {historicalTrendsData.series.map((s) => (
          <div
            key={s.label}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <div
              style={{
                width: 10,
                height: 2,
                backgroundColor: s.color,
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8,
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HistoricalTrends;
