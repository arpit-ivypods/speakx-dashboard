import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { balanceSheetData } from '../../data/mockData';

const BalanceSheetTable: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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
        minHeight: 340,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Sub-header */}
      <div
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: 12,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: 8,
        }}
      >
        Balance Sheet Snapshot
      </div>

      {/* Table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
        }}
      >
        <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>

        {/* Column Headers */}
        <thead>
          <tr>
            <th
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 9,
                fontWeight: 400,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.08em',
                textAlign: 'left',
                padding: '4px 8px 6px 4px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            />
            <th
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 9,
                fontWeight: 400,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.08em',
                textAlign: 'right',
                padding: '4px 12px 6px 8px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              Current
            </th>
            <th
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 9,
                fontWeight: 400,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.08em',
                textAlign: 'right',
                padding: '4px 12px 6px 8px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              Projected
            </th>
          </tr>
        </thead>

        {/* Data Rows */}
        <tbody>
          {balanceSheetData.map((row, i) => {
            const isEven = i % 2 === 0;
            const isHovered = hoveredRow === i;

            return (
              <motion.tr
                key={`${row.metric}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.04,
                  ease: 'easeOut',
                }}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  height: 24,
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: isHovered
                    ? 'rgba(0,242,255,0.06)'
                    : isEven
                      ? 'rgba(255,255,255,0.025)'
                      : 'transparent',
                  transition: 'background 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Metric */}
                <td
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: row.bold ? 600 : 400,
                    fontSize: 10,
                    color: row.bold ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                    textAlign: 'left',
                    padding: '0 8px 0 4px',
                    lineHeight: '24px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.metric}
                  {row.sub && (
                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', marginLeft: 3 }}>
                      {row.sub}
                    </span>
                  )}
                </td>

                {/* Current */}
                <td
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10,
                    fontWeight: row.bold ? 600 : 400,
                    color: row.bold ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                    textAlign: 'right',
                    paddingRight: 12,
                    lineHeight: '24px',
                  }}
                >
                  {row.current}
                </td>

                {/* Projected */}
                <td
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10,
                    fontWeight: row.bold ? 600 : 400,
                    color: row.bold ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                    textAlign: 'right',
                    paddingRight: 12,
                    lineHeight: '24px',
                  }}
                >
                  {row.projected}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
};

export default BalanceSheetTable;
