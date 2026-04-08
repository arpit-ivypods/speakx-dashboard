import React from 'react';
import { colors } from '../../theme/tokens';
import { useResponsive } from '../../hooks/useResponsive';

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div
      style={{
        background: colors.bgPrimary,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Radial gradient overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0, 242, 255, 0.02), transparent)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: isMobile ? 10 : isTablet ? 12 : 16,
          paddingTop: 0,
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardShell;
