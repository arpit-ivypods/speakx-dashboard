import React from 'react';
import { motion } from 'framer-motion';
import { debtEquity } from '../../data/mockData';

const DebtEquityReadout: React.FC = () => {
  return (
    <motion.div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: 12,
        height: 44,
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        DEBT/EQUITY:
      </span>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          fontSize: 20,
          color: 'white',
          textShadow: '0 0 6px rgba(0,242,255,0.15)',
          lineHeight: 1,
        }}
      >
        {debtEquity.ratio.toFixed(2)}
      </span>
    </motion.div>
  );
};

export default DebtEquityReadout;
