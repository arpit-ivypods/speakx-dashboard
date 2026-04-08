import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', style }) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: 12,
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        ...style,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
