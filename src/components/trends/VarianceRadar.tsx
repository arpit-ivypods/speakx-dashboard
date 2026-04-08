import React from 'react';
import { motion } from 'framer-motion';
import { varianceRadarData } from '../../data/mockData';

const SVG_SIZE = 200;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;
const MAX_R = 70;
const AXIS_COUNT = varianceRadarData.axes.length;
const ANGLE_STEP = (2 * Math.PI) / AXIS_COUNT;
const START_ANGLE = -Math.PI / 2; // start from top (270 degrees)

const GRID_LEVELS = [0.33, 0.66, 1.0];
const LABEL_OFFSET = 18;

/** Compute SVG (x, y) for a given axis index and radial fraction (0..1). */
const polarToCart = (axisIndex: number, fraction: number) => {
  const angle = START_ANGLE + axisIndex * ANGLE_STEP;
  return {
    x: CX + Math.cos(angle) * MAX_R * fraction,
    y: CY + Math.sin(angle) * MAX_R * fraction,
  };
};

/** Build a polygon points string for a concentric pentagon at the given level. */
const pentagonPoints = (level: number): string =>
  Array.from({ length: AXIS_COUNT })
    .map((_, i) => {
      const { x, y } = polarToCart(i, level);
      return `${x},${y}`;
    })
    .join(' ');

/** Build the data polygon points string from actual values. */
const dataPoints = varianceRadarData.values.map((v, i) =>
  polarToCart(i, v / 100),
);
const dataPolygonStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

/** Origin string for animation (polygon starts collapsed at center). */
const originPolygonStr = Array.from({ length: AXIS_COUNT })
  .map(() => `${CX},${CY}`)
  .join(' ');

/** Legend items (first 3 axes). */
const legendItems = [
  { label: 'Tax', color: '#FFB800' },
  { label: 'Rev Var', color: '#00F2FF' },
  { label: 'Op Exp Var', color: '#39FF14' },
];

const VarianceRadar: React.FC = () => {
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
          marginBottom: 4,
        }}
      >
        VARIANCE RADAR
      </div>

      {/* Radar SVG */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          style={{ overflow: 'visible' }}
        >
          {/* Concentric grid pentagons */}
          {GRID_LEVELS.map((level) => (
            <polygon
              key={`grid-${level}`}
              points={pentagonPoints(level)}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          ))}

          {/* Axis lines from center to each vertex */}
          {Array.from({ length: AXIS_COUNT }).map((_, i) => {
            const tip = polarToCart(i, 1);
            return (
              <line
                key={`axis-${i}`}
                x1={CX}
                y1={CY}
                x2={tip.x}
                y2={tip.y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={1}
              />
            );
          })}

          {/* Data polygon - animated from center */}
          <motion.polygon
            fill="rgba(160, 80, 255, 0.3)"
            stroke="#A855F7"
            strokeWidth={2}
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.4))' }}
            initial={{ points: originPolygonStr }}
            animate={{ points: dataPolygonStr }}
            transition={{ type: 'spring', stiffness: 80, damping: 14, duration: 0.6 }}
          />

          {/* Data vertex dots */}
          {dataPoints.map((p, i) => (
            <motion.circle
              key={`dot-${i}`}
              r={5}
              fill="#A855F7"
              initial={{ cx: CX, cy: CY }}
              animate={{ cx: p.x, cy: p.y }}
              transition={{ type: 'spring', stiffness: 80, damping: 14, duration: 0.6 }}
            />
          ))}

          {/* Axis labels */}
          {varianceRadarData.axes.map((label, i) => {
            const angle = START_ANGLE + i * ANGLE_STEP;
            const lx = CX + Math.cos(angle) * (MAX_R + LABEL_OFFSET);
            const ly = CY + Math.sin(angle) * (MAX_R + LABEL_OFFSET);
            return (
              <text
                key={`label-${i}`}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill="rgba(255,255,255,0.4)"
                fontSize={8}
                fontFamily="Inter, sans-serif"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          marginTop: 6,
        }}
      >
        {legendItems.map((item) => (
          <div
            key={item.label}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: item.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VarianceRadar;
