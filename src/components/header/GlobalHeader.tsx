import React from 'react';
import { motion } from 'framer-motion';
import { colors, typography } from '../../theme/tokens';
import { useResponsive } from '../../hooks/useResponsive';

const GlobalHeader: React.FC = () => {
  const { isMobile } = useResponsive();

  return (
    <motion.header
      style={{
        position: 'relative',
        height: 48,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 12px' : '0 24px',
        zIndex: 100,
        borderBottom: `1px solid rgba(0, 242, 255, 0.2)`,
        boxShadow: '0 1px 8px rgba(0, 242, 255, 0.15)',
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, overflow: 'hidden' }}>
        <span
          style={{
            fontFamily: typography.heading,
            fontWeight: 700,
            fontSize: isMobile ? 15 : 18,
            color: colors.cyan,
            letterSpacing: '0.12em',
            flexShrink: 0,
            textShadow: '0 0 10px rgba(0, 242, 255, 0.3)',
          }}
        >
          SPEAKX
        </span>

        {!isMobile && (
          <>
            {/* Separator */}
            <div
              style={{
                width: 1,
                height: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                margin: '0 12px',
                flexShrink: 0,
              }}
            />

            {/* Subtitle */}
            <span
              style={{
                fontFamily: typography.body,
                fontSize: 9,
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              UNIFIED GLOBAL FINANCIAL DASHBOARD | CONSOLIDATED FY 2124-Q1 | BOARD OF DIRECTORS VIEW
            </span>
          </>
        )}
      </div>

      {/* Right side */}
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
        APRIL 7, 2124
      </span>
    </motion.header>
  );
};

export default GlobalHeader;
