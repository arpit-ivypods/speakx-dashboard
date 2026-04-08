import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../layout/GlassCard';
import { colors, typography } from '../../theme/tokens';

interface KPICardProps {
  label: string;
  value: number;
  unit: string;
  prefix: string;
  delta: number | null;
  deltaLabel: string | null;
  highlight?: boolean;
  index: number;
  isMobile?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  unit,
  prefix,
  delta,
  deltaLabel,
  highlight = false,
  index,
  isMobile = false,
}) => {
  const formattedValue =
    unit === 'Years'
      ? `${prefix}${value} Years`
      : `${prefix}${value}${unit}`;

  return (
    <motion.div
      style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden' }}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.2 + index * 0.08,
        duration: 0.5,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.02,
      }}
    >
      <GlassCard
        style={{
          height: isMobile ? 68 : 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          padding: isMobile ? '6px 6px' : '8px 8px',
          overflow: 'hidden',
          ...(highlight
            ? { border: '1px solid rgba(255, 255, 255, 0.15)' }
            : {}),
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: typography.body,
            fontSize: isMobile ? 8 : 9,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>

        {/* Value */}
        <span
          style={{
            fontFamily: typography.mono,
            fontWeight: 700,
            fontSize: isMobile ? 18 : 22,
            color: colors.textPrimary,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            ...(highlight
              ? { textShadow: '0 0 12px rgba(255, 255, 255, 0.3)' }
              : {}),
          }}
        >
          {formattedValue}
        </span>

        {/* Delta */}
        {delta !== null && deltaLabel !== null && (
          <span
            style={{
              fontFamily: typography.body,
              fontSize: 10,
              color: delta > 0 ? colors.neonGreen : colors.red,
              whiteSpace: 'nowrap',
            }}
          >
            {deltaLabel}
          </span>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default KPICard;
