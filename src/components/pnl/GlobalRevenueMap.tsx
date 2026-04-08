import React from 'react';
import { motion } from 'framer-motion';
import { revenueHubs } from '../../data/mockData';

/* Improved simplified world map continent outlines.
   Equirectangular projection in a 360x180 space (0,0 = top-left).
   More recognizable shapes with better proportions. */
const continentPaths = [
  // North America — recognizable shape with Alaska, Canada, US, Mexico
  'M18,18 L28,14 L45,12 L60,14 L78,18 L92,26 L100,34 L106,42 L102,50 L96,56 L88,62 L82,68 L74,72 L68,68 L60,62 L52,58 L44,54 L38,48 L32,40 L24,34 L18,26 Z',
  // Greenland
  'M108,12 L118,8 L128,10 L130,18 L126,24 L118,26 L110,22 L108,16 Z',
  // South America
  'M82,72 L90,68 L98,72 L104,80 L106,90 L104,100 L100,110 L94,118 L88,126 L82,132 L76,128 L72,118 L70,108 L68,98 L70,88 L74,80 Z',
  // Europe
  'M158,16 L168,12 L178,14 L186,18 L192,24 L190,32 L186,38 L180,42 L174,44 L168,42 L162,38 L156,32 L154,24 Z',
  // Africa
  'M158,48 L166,44 L174,44 L182,48 L188,54 L192,64 L194,76 L192,88 L186,98 L178,106 L170,110 L162,106 L156,98 L152,88 L150,76 L152,64 L154,54 Z',
  // Asia — large landmass spanning Russia, China, India
  'M192,14 L210,10 L230,8 L252,10 L270,14 L286,20 L296,28 L298,36 L292,42 L284,46 L274,48 L264,50 L254,48 L244,46 L236,50 L228,56 L220,58 L212,54 L206,48 L200,42 L196,34 L194,26 L192,18 Z',
  // India / Southeast Asia peninsula
  'M228,56 L236,54 L244,58 L248,66 L246,74 L240,80 L232,78 L226,72 L224,64 Z',
  // Japan / Korean peninsula
  'M286,28 L294,26 L300,30 L298,38 L292,42 L286,38 Z',
  // Indonesia / Maritime SE Asia
  'M254,76 L262,74 L272,76 L280,78 L286,80 L282,84 L274,86 L264,84 L256,82 Z',
  // Australia
  'M268,96 L280,90 L294,92 L304,98 L308,108 L304,118 L294,124 L282,126 L272,122 L264,114 L262,104 Z',
];

const SVG_W = 360;
const SVG_H = 180;

/* Convert lat/lng to equirectangular SVG coords */
const toSvg = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * SVG_W,
  y: ((90 - lat) / 180) * SVG_H,
});

const GlobalRevenueMap: React.FC = () => {
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        style={{
          fontSize: 10,
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: 4,
        }}
      >
        Global Revenue Mix
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ overflow: 'visible', flex: 1, minHeight: 0 }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>{`
            @keyframes dotPulse {
              0%, 100% { transform-origin: center; transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.5); opacity: 1; }
            }
          `}</style>
        </defs>

        {/* Continent outlines */}
        {continentPaths.map((d, i) => (
          <path key={i} d={d} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        ))}

        {/* Revenue hub dots */}
        {revenueHubs.map((hub, i) => {
          const pos = toSvg(hub.lat, hub.lng);
          return (
            <circle
              key={hub.id}
              cx={pos.x}
              cy={pos.y}
              r={hub.radius * 1.4}
              fill={hub.color}
              filter="url(#glow)"
              style={{
                animation: `dotPulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

export default GlobalRevenueMap;
