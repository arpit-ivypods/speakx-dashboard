import React from 'react';
import { motion } from 'framer-motion';
import { profitabilityData } from '../../data/mockData';

/* ── layout ── */
const SVG_W = 260;
const SVG_H = 260;
const PAD_T = 8;
const PAD_B = 16;   // room for x-axis labels
const PAD_L = 22;   // room for y-axis labels
const PAD_R = 6;
const chartW = SVG_W - PAD_L - PAD_R;
const chartH = SVG_H - PAD_T - PAD_B;

/* ── shared scale across both series ── */
const allPts = [...profitabilityData.ope.points, ...profitabilityData.roa.points];
const minVal = Math.min(...allPts);
const maxVal = Math.max(...allPts);
const valRange = maxVal - minVal || 1;

const toXY = (val: number, idx: number, total: number) => ({
  x: PAD_L + (idx / (total - 1)) * chartW,
  y: PAD_T + chartH - ((val - minVal) / valRange) * chartH,
});

const buildLine = (points: number[]) =>
  points.map((p, i) => {
    const { x, y } = toXY(p, i, points.length);
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');

const buildArea = (points: number[]) => {
  const line = buildLine(points);
  const last = toXY(points[points.length - 1], points.length - 1, points.length);
  const first = toXY(points[0], 0, points.length);
  return `${line} L${last.x},${PAD_T + chartH} L${first.x},${PAD_T + chartH} Z`;
};

const opeLine = buildLine(profitabilityData.ope.points);
const roaLine = buildLine(profitabilityData.roa.points);
const opeArea = buildArea(profitabilityData.ope.points);
const roaArea = buildArea(profitabilityData.roa.points);

/* ── Y-axis ticks ── */
const yTicks = [0, 0.25, 0.5, 0.75, 1].map((frac) => {
  const val = Math.round(minVal + frac * valRange);
  return { label: `${val}`, y: PAD_T + chartH - frac * chartH };
});

/* ── X-axis labels (evenly spaced along 8 data points) ── */
const xLabels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];

const ProfitabilityChart: React.FC = () => {
  return (
    <motion.div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: 12,
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column' as const,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}>
          <span style={{
            fontSize: 12,
            fontFamily: '"Rajdhani", "Inter", sans-serif',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>
            PROFITABILITY RATIO
          </span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>
            (OPE {profitabilityData.ope.currentValue}%, ROA {profitabilityData.roa.currentValue}%)
          </span>
        </div>
        {/* Legend inline */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 14, height: 2, backgroundColor: '#00F2FF', borderRadius: 1 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>OPE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 14, height: 2, backgroundColor: '#FF00E5', borderRadius: 1 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>ROA</span>
          </div>
        </div>
      </div>

      {/* Chart SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ display: 'block', width: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="opeArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,242,255,0.25)" />
            <stop offset="100%" stopColor="rgba(0,242,255,0.02)" />
          </linearGradient>
          <linearGradient id="roaArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,0,229,0.18)" />
            <stop offset="100%" stopColor="rgba(255,0,229,0.02)" />
          </linearGradient>
        </defs>

        {/* ── Y-axis line ── */}
        <line
          x1={PAD_L} y1={PAD_T}
          x2={PAD_L} y2={PAD_T + chartH}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.5}
        />

        {/* ── Y-axis ticks + labels + grid lines ── */}
        {yTicks.map((t) => (
          <g key={t.label}>
            <line
              x1={PAD_L - 3} y1={t.y}
              x2={PAD_L} y2={t.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.5}
            />
            <line
              x1={PAD_L} y1={t.y}
              x2={PAD_L + chartW} y2={t.y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={0.5}
            />
            <text
              x={PAD_L - 5}
              y={t.y + 2.5}
              textAnchor="end"
              fill="rgba(255,255,255,0.3)"
              fontSize={6}
              fontFamily="'JetBrains Mono', monospace"
            >
              {t.label}
            </text>
          </g>
        ))}

        {/* ── X-axis line ── */}
        <line
          x1={PAD_L} y1={PAD_T + chartH}
          x2={PAD_L + chartW} y2={PAD_T + chartH}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.5}
        />

        {/* ── X-axis labels ── */}
        {xLabels.map((label, i) => {
          const x = PAD_L + (i / (xLabels.length - 1)) * chartW;
          return (
            <g key={label}>
              <line
                x1={x} y1={PAD_T + chartH}
                x2={x} y2={PAD_T + chartH + 3}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={0.5}
              />
              <text
                x={x}
                y={PAD_T + chartH + 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.25)"
                fontSize={6}
                fontFamily="'Inter', sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* ── Area fills ── */}
        <path d={opeArea} fill="url(#opeArea)" />
        <path d={roaArea} fill="url(#roaArea)" />

        {/* ── OPE line ── */}
        <motion.path
          d={opeLine}
          fill="none"
          stroke="#00F2FF"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDashoffset: 600, strokeDasharray: 600 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* ── ROA line ── */}
        <motion.path
          d={roaLine}
          fill="none"
          stroke="#FF00E5"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDashoffset: 600, strokeDasharray: 600 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
        />
      </svg>
    </motion.div>
  );
};

export default ProfitabilityChart;
