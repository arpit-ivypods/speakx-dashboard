import React from 'react';
import { motion } from 'framer-motion';
import { assetComposition } from '../../data/mockData';

const OUTER_R = 90;
const INNER_R = 62;
const STROKE_W = OUTER_R - INNER_R; // 28
const CENTER_R = (OUTER_R + INNER_R) / 2; // 76 — radius for stroke circles
const CIRCUMFERENCE = 2 * Math.PI * CENTER_R;
const GAP_DEG = 2; // 2-degree transparent gap between segments

// Bloom ring (larger, semi-transparent behind each segment)
const BLOOM_EXTRA = 4;
const BLOOM_R = CENTER_R + BLOOM_EXTRA / 2;
const BLOOM_W = STROKE_W + BLOOM_EXTRA;
const BLOOM_CIRC = 2 * Math.PI * BLOOM_R;

const AssetDonut: React.FC = () => {
  const { centerLabel, segments } = assetComposition;
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  // Calculate dasharray/offset for each segment
  const totalGapDeg = GAP_DEG * segments.length;
  const availableDeg = 360 - totalGapDeg;
  const gapLength = (GAP_DEG / 360) * CIRCUMFERENCE;

  const bloomGapLength = (GAP_DEG / 360) * BLOOM_CIRC;

  let accumulatedOffset = 0;
  let bloomAccOffset = 0;
  const arcs = segments.map((seg) => {
    const segDeg = (seg.value / total) * availableDeg;
    const segLength = (segDeg / 360) * CIRCUMFERENCE;
    const dashArray = `${segLength} ${CIRCUMFERENCE - segLength}`;
    const dashOffset = CIRCUMFERENCE * 0.25 - accumulatedOffset;
    accumulatedOffset += segLength + gapLength;

    // Bloom (slightly larger ring)
    const bloomSegLength = (segDeg / 360) * BLOOM_CIRC;
    const bloomDashArray = `${bloomSegLength} ${BLOOM_CIRC - bloomSegLength}`;
    const bloomDashOffset = BLOOM_CIRC * 0.25 - bloomAccOffset;
    bloomAccOffset += bloomSegLength + bloomGapLength;

    return { ...seg, dashArray, dashOffset, segLength, bloomDashArray, bloomDashOffset };
  });

  const svgSize = OUTER_R * 2 + 24; // extra padding for glow
  const cx = svgSize / 2;
  const cy = svgSize / 2;

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
        minHeight: 340,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Sub-header */}
      <div
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          letterSpacing: '0.08em',
          marginBottom: 12,
        }}
      >
        GLOBAL ASSET COMPOSITION
      </div>

      {/* SVG Donut */}
      <div style={{ position: 'relative', width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            {arcs.map((arc, i) => (
              <filter
                key={`glow-${i}`}
                id={`donut-glow-${i}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="6"
                  result="blur"
                />
                <feFlood floodColor={arc.color} floodOpacity="0.55" />
                <feComposite in2="blur" operator="in" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            {/* Center label glow filter */}
            <filter id="center-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feFlood floodColor="#FFFFFF" floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" result="whiteGlow" />
              <feMerge>
                <feMergeNode in="whiteGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Bloom rings (behind) */}
          {arcs.map((arc, i) => (
            <motion.circle
              key={`bloom-${arc.label}`}
              cx={cx}
              cy={cy}
              r={BLOOM_R}
              fill="none"
              stroke={arc.color}
              strokeWidth={BLOOM_W}
              strokeLinecap="butt"
              strokeDasharray={arc.bloomDashArray}
              strokeDashoffset={arc.bloomDashOffset}
              opacity={0.15}
              initial={{
                strokeDasharray: `0 ${BLOOM_CIRC}`,
                strokeDashoffset: arc.bloomDashOffset,
              }}
              animate={{
                strokeDasharray: arc.bloomDashArray,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}

          {/* Main arcs with glow filter */}
          {arcs.map((arc, i) => (
            <motion.circle
              key={arc.label}
              cx={cx}
              cy={cy}
              r={CENTER_R}
              fill="none"
              stroke={arc.color}
              strokeWidth={STROKE_W}
              strokeLinecap="butt"
              strokeDasharray={arc.dashArray}
              strokeDashoffset={arc.dashOffset}
              filter={`url(#donut-glow-${i})`}
              initial={{
                strokeDasharray: `0 ${CIRCUMFERENCE}`,
                strokeDashoffset: arc.dashOffset,
              }}
              animate={{
                strokeDasharray: arc.dashArray,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </svg>

        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 700,
              fontSize: 28,
              color: '#FFFFFF',
              textShadow: '0 0 12px rgba(255,255,255,0.35), 0 0 4px rgba(255,255,255,0.2)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            {centerLabel}
          </motion.span>
        </div>
      </div>

      {/* Legend */}
      <motion.div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
          marginTop: 12,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {segments.map((seg) => (
          <div
            key={seg.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: seg.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 8,
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {seg.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AssetDonut;
