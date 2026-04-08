import React from 'react';
import { motion } from 'framer-motion';
import { colors, typography } from '../../theme/tokens';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <span
        style={{
          fontFamily: typography.heading,
          fontWeight: 700,
          fontSize: 18,
          color: colors.textPrimary,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </span>
      <motion.div
        style={{
          width: 60,
          height: 1,
          backgroundColor: colors.cyan,
          marginTop: 4,
          boxShadow: `0 0 8px ${colors.sectionGlow}`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default SectionHeader;
