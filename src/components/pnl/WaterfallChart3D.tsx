import React from 'react';
import { motion } from 'framer-motion';
import { waterfallData } from '../../data/mockData';

/* ── layout constants ────────────────────────────────────────── */
const SVG_W = 480;
const SVG_H = 210;
const PAD_T = 30;  // more space for value labels above tallest bar
const PAD_B = 20;  // space for x-axis labels
const PAD_L = 36;  // space for Y-axis labels
const PAD_R = 12;
const DEPTH = 6;   // slightly thinner 3D extrusion

const chartW = SVG_W - PAD_L - PAD_R;
const chartH = SVG_H - PAD_T - PAD_B;

/* ── bar geometry ────────────────────────────────────────────── */
const barCount = waterfallData.length;
const gap = 8;
const barW = (chartW - gap * (barCount - 1)) / barCount;

// Waterfall cascade — each bar steps down
const scales = [1.0, 0.96, 0.90, 0.84, 0.78, 0.70];

const fmt = (v: number) => `₹${v.toFixed(1)}B`;

// Y-axis tick values
const yTicks = [
  { label: '₹14.8B', frac: 1.0 },
  { label: '₹11.1B', frac: 0.75 },
  { label: '₹7.4B', frac: 0.5 },
];

const WaterfallChart3D: React.FC = () => {
  const bars = waterfallData.map((d, i) => {
    const s = scales[i] ?? 0.7;
    const barH = s * chartH;
    const x = PAD_L + i * (barW + gap);
    const y = PAD_T + chartH - barH;
    return { ...d, barH, x, y, i };
  });

  return (
    <motion.div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '12px 12px 8px',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Sub-header */}
      <div
        style={{
          fontFamily: '"Rajdhani", "Inter", sans-serif',
          fontWeight: 600,
          fontSize: 12,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.04em',
          marginBottom: 4,
        }}
      >
        P&amp;L Waterfall 3D Bar Chart
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        <defs>
          {/* ── Front face gradient (per-bar unique for the last bar) ── */}
          <linearGradient id="wfFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22E8F0" />
            <stop offset="40%" stopColor="#0EB5C2" />
            <stop offset="100%" stopColor="#0C2E42" />
          </linearGradient>
          {/* "Net" bar — has warm amber tint at base */}
          <linearGradient id="wfFrontNet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18C8D2" />
            <stop offset="45%" stopColor="#0A7888" />
            <stop offset="80%" stopColor="#3D3010" />
            <stop offset="100%" stopColor="#2E2008" />
          </linearGradient>
          {/* ── Right side face ── */}
          <linearGradient id="wfSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A4858" />
            <stop offset="100%" stopColor="#061A24" />
          </linearGradient>
          {/* ── Top face ── */}
          <linearGradient id="wfTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3EF0F8" />
            <stop offset="100%" stopColor="#18B8C4" />
          </linearGradient>
          {/* ── Glow filter for bars ── */}
          <filter id="wfGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feFlood floodColor="#00F2FF" floodOpacity="0.08" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* ── Clip ── */}
          <clipPath id="wfClip">
            <rect
              x={PAD_L - 2}
              y={PAD_T - DEPTH - 4}
              width={chartW + DEPTH + 6}
              height={chartH + DEPTH + 8}
            />
          </clipPath>
        </defs>

        {/* ── Y-axis ticks + labels ── */}
        {yTicks.map((t) => {
          const ty = PAD_T + chartH - t.frac * chartH;
          return (
            <g key={t.label}>
              <line
                x1={PAD_L}
                y1={ty}
                x2={PAD_L + chartW}
                y2={ty}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={0.5}
              />
              <text
                x={PAD_L - 5}
                y={ty + 3}
                textAnchor="end"
                fill="rgba(255,255,255,0.25)"
                fontSize={7}
                fontFamily="'JetBrains Mono', monospace"
              >
                {t.label}
              </text>
            </g>
          );
        })}

        {/* ── Baseline ── */}
        <line
          x1={PAD_L}
          y1={PAD_T + chartH}
          x2={PAD_L + chartW}
          y2={PAD_T + chartH}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.5}
        />

        {/* ── Connector lines between bar tops ── */}
        {bars.map((b, i) => {
          if (i >= bars.length - 1) return null;
          const next = bars[i + 1];
          return (
            <line
              key={`c-${i}`}
              x1={b.x + barW}
              y1={b.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(255,255,255,0.10)"
              strokeDasharray="3 2"
              strokeWidth={0.7}
            />
          );
        })}

        {/* ── Bars (clipped) ── */}
        <g clipPath="url(#wfClip)" filter="url(#wfGlow)">
          {bars.map((b) => {
            const fx = b.x;
            const fy = b.y;
            const fW = barW;
            const fH = b.barH;


            // Right face parallelogram
            const side = [
              `${fx + fW},${fy + fH}`,
              `${fx + fW + DEPTH},${fy + fH - DEPTH}`,
              `${fx + fW + DEPTH},${fy - DEPTH}`,
              `${fx + fW},${fy}`,
            ].join(' ');

            // Top face parallelogram
            const top = [
              `${fx},${fy}`,
              `${fx + DEPTH},${fy - DEPTH}`,
              `${fx + fW + DEPTH},${fy - DEPTH}`,
              `${fx + fW},${fy}`,
            ].join(' ');

            return (
              <g key={b.label}>
                {/* Front face */}
                <motion.rect
                  x={fx}
                  width={fW}
                  fill="url(#wfFront)"
                  rx={0.5}
                  initial={{ y: fy + fH, height: 0 }}
                  animate={{ y: fy, height: fH }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + b.i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                {/* Right side */}
                <motion.polygon
                  points={side}
                  fill="url(#wfSide)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.25 + b.i * 0.08 }}
                />
                {/* Top face */}
                <motion.polygon
                  points={top}
                  fill="url(#wfTop)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.25 + b.i * 0.08 }}
                />
                {/* Subtle edge highlight on front-left */}
                <motion.line
                  x1={fx}
                  y1={fy + fH}
                  x2={fx}
                  y2={fy}
                  stroke="rgba(0,242,255,0.12)"
                  strokeWidth={0.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + b.i * 0.08 }}
                />
              </g>
            );
          })}
        </g>

        {/* ── Value labels above bars ── */}
        {bars.map((b) => (
          <motion.text
            key={`v-${b.label}`}
            x={b.x + barW / 2 + DEPTH / 2}
            y={b.y - DEPTH - 5}
            textAnchor="middle"
            fill="rgba(255,255,255,0.9)"
            fontSize={7.5}
            fontFamily="'JetBrains Mono', monospace"
            fontWeight={600}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + b.i * 0.08 }}
          >
            {fmt(b.value)}
          </motion.text>
        ))}

        {/* ── Delta labels — centered on the bar they belong to ── */}
        {bars.map((b) => {
          if (b.delta === null) return null;
          const cx = b.x + barW / 2;
          const cy = b.y + b.barH * 0.3;
          return (
            <motion.g
              key={`d-${b.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + b.i * 0.08 }}
            >
              <rect
                x={cx - 16}
                y={cy - 6}
                width={32}
                height={13}
                rx={3}
                fill="rgba(11,14,20,0.7)"
                stroke="rgba(57,255,20,0.25)"
                strokeWidth={0.5}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill="#39FF14"
                fontSize={7}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={600}
              >
                {`▲ ${b.delta}%`}
              </text>
            </motion.g>
          );
        })}

        {/* ── X-axis labels ── */}
        {bars.map((b) => (
          <text
            key={`x-${b.label}`}
            x={b.x + barW / 2}
            y={PAD_T + chartH + 13}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize={7.5}
            fontFamily="'Inter', sans-serif"
          >
            {b.label}
          </text>
        ))}
      </svg>
    </motion.div>
  );
};

export default WaterfallChart3D;
