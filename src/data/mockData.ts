// ===== KPI Strip =====
export const kpiData = [
  { id: 'ytd-revenue',   label: 'YTD REVENUE',   value: 14.8, unit: 'B', prefix: '₹', delta: +5.2, deltaLabel: '▲ 5.2%' },
  { id: 'cm1',           label: 'CM1',            value: 14.8, unit: 'B', prefix: '₹', delta: +5.0, deltaLabel: '▲ 5.0%' },
  { id: 'cm2',           label: 'CM2',            value: 14.8, unit: 'B', prefix: '₹', delta: +1.5, deltaLabel: '▲ 1.5%' },
  { id: 'ebitda',        label: 'EBITDA',         value: 14.8, unit: 'B', prefix: '₹', delta: +1.5, deltaLabel: '▲ 1.5%' },
  { id: 'cash-balance',  label: 'CASH BALANCE',   value: 9.1,  unit: 'B', prefix: '₹', delta: +1.1, deltaLabel: '▲ 1.1%' },
  { id: 'cash-runway',   label: 'CASH RUNWAY',    value: 2.1,  unit: 'Years', prefix: '', delta: null, deltaLabel: null, highlight: true },
];

// ===== Waterfall Chart =====
export const waterfallData = [
  { label: 'Gross Rev',     value: 14.8, delta: null },
  { label: 'Gross Rev (2)', value: 14.8, delta: 3.5 },
  { label: 'CM1',           value: 14.6, delta: 1.5 },
  { label: 'CM2',           value: 14.8, delta: null },
  { label: 'EBITDA',        value: 14.8, delta: null },
  { label: 'Net',           value: 14.6, delta: null },
];

// ===== Profitability Ratios =====
export const profitabilityData = {
  ope: { label: 'OPE', currentValue: -21, points: [40, 38, 35, 30, 28, 32, 36, 38] },
  roa: { label: 'ROA', currentValue: -41, points: [55, 50, 42, 35, 30, 28, 25, 22] },
};

// ===== Global Revenue Map =====
export const revenueHubs = [
  { id: 'na',    label: 'North America', lat: 40.7, lng: -74.0,  revenue: 3.2, color: '#00F2FF', radius: 4 },
  { id: 'eu',    label: 'Europe',        lat: 51.5, lng: -0.1,   revenue: 2.8, color: '#FFB800', radius: 3 },
  { id: 'sa',    label: 'South Asia',    lat: 19.1, lng: 72.9,   revenue: 5.1, color: '#39FF14', radius: 5 },
  { id: 'ea',    label: 'East Asia',     lat: 1.35, lng: 103.8,  revenue: 2.5, color: '#FF00E5', radius: 3 },
  { id: 'au',    label: 'Australia',     lat: -33.9, lng: 151.2, revenue: 1.2, color: '#00F2FF', radius: 2 },
];

// ===== Debt/Equity =====
export const debtEquity = { ratio: 0.16 };

// ===== Balance Sheet =====
export const balanceSheetData = [
  { metric: 'Total Revenue',          current: '₹14.8B', projected: '₹14.8B', bold: true },
  { metric: 'Cost of Goods Sold',     current: '₹14.0B', projected: '₹14.8B', bold: false, sub: '(As Comm)' },
  { metric: 'Gross Profit',           current: '₹1.0B',  projected: '—',      bold: false, sub: '(As Ecommerce & Assets)' },
  { metric: 'Operating Expenses',     current: '₹14.0B', projected: '₹14.8B', bold: false },
  { metric: 'Operating Income',       current: '₹0.8B',  projected: '—',      bold: false, sub: '(As Revenue & Receivable)' },
  { metric: 'Cash Assets',            current: '₹14.0B', projected: '₹14.8B', bold: true },
  { metric: 'Cash Balance',           current: '₹9.1B',  projected: '₹9.1B',  bold: false },
  { metric: 'Operating Reserves',     current: '₹14.8B', projected: '—',      bold: false, sub: '(As Operating Reserve)' },
  { metric: 'Capital Reserves',       current: '2.1',    projected: 'Years',  bold: false, sub: '(As Capital Reserve)' },
  { metric: 'Total Assets',           current: '₹14.8B', projected: '₹14.8B', bold: true },
];

// ===== Global Asset Composition =====
export const assetComposition = {
  centerLabel: '6.4%',
  segments: [
    { label: 'Tax',        value: 40, color: '#FFB800' },
    { label: 'Inv',        value: 22, color: '#A855F7' },
    { label: 'Rev Var',    value: 20, color: '#00F2FF' },
    { label: 'Op Exp Var', value: 18, color: '#39FF14' },
  ],
};

// ===== Cash & Liquidity Table =====
export const cashLiquidityData = [
  { metric: 'Cash & Liquidity',       current: '₹14.8B',  projected: '₹14.8B',  bold: false, sub: '(As Cash & Liquidity)' },
  { metric: 'Operating Reserves',     current: '₹9.1B',   projected: '₹9.1B',   bold: false, sub: '(As Cash From Operating)' },
  { metric: 'Invested Assets',        current: '₹3.2B',   projected: '₹3.2B',   bold: false, sub: '(As Cash From Investing)' },
  { metric: 'Invested Assets',        current: '₹3.2B',   projected: '₹3.2B',   bold: false, sub: '(As Cash From Investing)' },
  { metric: 'Cash Position',          current: '₹14.8B',  projected: '₹14.8B',  bold: true },
  { metric: 'Operating Reserves',     current: '₹14.8B',  projected: '—',       bold: false, sub: '(As Operating Reserve)' },
  { metric: 'Capital Reserves',       current: '₹3.2B',   projected: '₹4.2B',   bold: false, sub: '(As Current Reserves)' },
  { metric: 'Total Cash & Liquidity', current: '₹91.5B',  projected: '₹192.6B', bold: true },
];

// ===== Cash Position Chart =====
export const cashPositionChart = {
  xLabels: ['2118', '2119', '2120', '2121', '2122', '2123', '2124'],
  historic:   [60, 65, 58, 52, 62, 75, 88],
  projection: [null, null, null, null, 62, 80, 95],
};

// ===== Compliance Ratios =====
export const complianceData = { value: 46, max: 100 };

// ===== Variance Radar =====
export const varianceRadarData = {
  axes: ['Tax', 'Rev Var', 'Op Exp Var', 'Axis 4', 'Axis 5'],
  values: [70, 50, 60, 40, 80],
};

// ===== Historical Trends (5-Year) =====
export const historicalTrendsData = {
  series: [
    { label: 'Series A', color: '#00F2FF', points: [40, 45, 48, 52, 58, 62, 68, 72] },
    { label: 'Series B', color: '#39FF14', points: [38, 42, 46, 50, 55, 59, 64, 70] },
    { label: 'Series C', color: '#FFB800', points: [35, 38, 40, 44, 48, 52, 56, 60] },
    { label: 'Series D', color: '#A855F7', points: [32, 35, 38, 42, 46, 50, 54, 58] },
  ],
};
