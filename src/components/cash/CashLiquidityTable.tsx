import React from 'react';
import { motion } from 'framer-motion';
import { cashLiquidityData } from '../../data/mockData';

const CashLiquidityTable: React.FC = () => {
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
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: 8,
        }}
      >
        Cash &amp; Liquidity
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

        {/* Header row */}
        <thead>
          <tr>
            <th
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 9,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'left',
                padding: '2px 6px 4px 4px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            />
            <th
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 9,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'right',
                padding: '2px 8px 4px 6px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              Current
            </th>
            <th
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 9,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'right',
                padding: '2px 8px 4px 6px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              Projected
            </th>
          </tr>
        </thead>

        {/* Data rows */}
        <tbody>
          {cashLiquidityData.map((row, i) => {
            const isBold =
              row.bold ||
              row.metric === 'Cash Position' ||
              row.metric === 'Total Cash & Liquidity';

            return (
              <motion.tr
                key={`${row.metric}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.04,
                  duration: 0.35,
                  ease: 'easeOut',
                }}
                style={{
                  height: 24,
                  background:
                    i % 2 === 1
                      ? 'rgba(255, 255, 255, 0.02)'
                      : 'transparent',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  cursor: 'default',
                }}
                whileHover={{
                  backgroundColor: 'rgba(0, 242, 255, 0.04)',
                }}
              >
                {/* Metric */}
                <td
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: isBold ? 600 : 400,
                    fontSize: 10,
                    color: isBold ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'left',
                    paddingLeft: 4,
                    paddingRight: 6,
                    lineHeight: '24px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.metric}
                  {row.sub && (
                    <span
                      style={{
                        fontSize: 8,
                        color: 'rgba(255, 255, 255, 0.25)',
                        marginLeft: 4,
                        fontWeight: 400,
                      }}
                    >
                      {row.sub}
                    </span>
                  )}
                </td>

                {/* Current */}
                <td
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: isBold ? 600 : 400,
                    fontSize: 10,
                    color: isBold ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'right',
                    paddingRight: 8,
                    lineHeight: '24px',
                  }}
                >
                  {row.current}
                </td>

                {/* Projected */}
                <td
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: isBold ? 600 : 400,
                    fontSize: 10,
                    color: isBold ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'right',
                    paddingRight: 8,
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

export default CashLiquidityTable;
