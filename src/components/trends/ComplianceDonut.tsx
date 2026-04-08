import React from 'react';
import { motion } from 'framer-motion';
import { complianceData } from '../../data/mockData';

const SIZE = 140;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 60;
const INNER_R = 42;
const STROKE_W = OUTER_R - INNER_R; // 18
const MID_R = (OUTER_R + INNER_R) / 2; // radius for stroke circle
const CIRCUMFERENCE = 2 * Math.PI * MID_R;
const FILLED_FRAC = complianceData.value / complianceData.max;
const FILLED_DASH = CIRCUMFERENCE * FILLED_FRAC;
const UNFILLED_DASH = CIRCUMFERENCE - FILLED_DASH;

const ComplianceDonut: React.FC = () => {
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
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        COMPLIANCE RATIOS
      </div>

      {/* Donut SVG */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00F2FF" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <filter id="donutGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feFlood floodColor="#00F2FF" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glowColor" />
              <feMerge>
                <feMergeNode in="glowColor" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Unfilled background ring */}
          <circle
            cx={CX}
            cy={CY}
            r={MID_R}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={STROKE_W}
          />

          {/* Filled segment - animated with glow */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={MID_R}
            fill="none"
            stroke="url(#donutGrad)"
            strokeWidth={STROKE_W}
            strokeLinecap="round"
            strokeDasharray={`${FILLED_DASH} ${UNFILLED_DASH}`}
            transform={`rotate(-90 ${CX} ${CY})`}
            filter="url(#donutGlow)"
            initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
            animate={{ strokeDasharray: `${FILLED_DASH} ${UNFILLED_DASH}` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Center label */}
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize={24}
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
          >
            {complianceData.value}%
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          marginTop: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: '#00F2FF',
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
            Rev Var
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: '#39FF14',
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
            Op Exp Var
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ComplianceDonut;
