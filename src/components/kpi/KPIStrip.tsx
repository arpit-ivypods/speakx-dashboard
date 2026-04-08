import React from 'react';
import KPICard from './KPICard';
import { kpiData } from '../../data/mockData';
import { useResponsive } from '../../hooks/useResponsive';

const KPIStrip: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? 8 : 10,
      }}
    >
      {kpiData.map((kpi, index) => (
        <div
          key={kpi.id}
          style={{
            flex: isMobile ? '1 1 45%' : isTablet ? '1 1 30%' : '1 1 0',
            minWidth: 0,
          }}
        >
          <KPICard
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            prefix={kpi.prefix}
            delta={kpi.delta}
            deltaLabel={kpi.deltaLabel}
            highlight={'highlight' in kpi ? kpi.highlight : false}
            index={index}
            isMobile={isMobile}
          />
        </div>
      ))}
    </div>
  );
};

export default KPIStrip;
