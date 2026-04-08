import { useResponsive } from './hooks/useResponsive'
import GlobalHeader from './components/header/GlobalHeader'
import DashboardShell from './components/layout/DashboardShell'
import SectionHeader from './components/layout/SectionHeader'
import KPIStrip from './components/kpi/KPIStrip'
import WaterfallChart3D from './components/pnl/WaterfallChart3D'
import ProfitabilityChart from './components/pnl/ProfitabilityChart'
import DebtEquityReadout from './components/pnl/DebtEquityReadout'
import BalanceSheetTable from './components/balance/BalanceSheetTable'
import AssetDonut from './components/balance/AssetDonut'
import CashLiquidityTable from './components/cash/CashLiquidityTable'
import CashPositionChart from './components/cash/CashPositionChart'
import ComplianceDonut from './components/trends/ComplianceDonut'
import VarianceRadar from './components/trends/VarianceRadar'
import HistoricalTrends from './components/trends/HistoricalTrends'
import AmbientParticles from './effects/AmbientParticles'
import GridFloor from './effects/GridFloor'

function App() {
  const { isMobile, isTablet } = useResponsive();
  const sectionGap = isMobile ? 10 : 18;
  const colGap = isMobile ? 8 : 12;

  return (
    <>
      <GridFloor />
      <AmbientParticles />
      <GlobalHeader />
      <DashboardShell>
        {/* Section 1: Executive Summary */}
        <section style={{ marginTop: isMobile ? 6 : 10 }}>
          <SectionHeader title="EXECUTIVE SUMMARY" />
          <KPIStrip />
        </section>

        {/* Section 2: P&L Performance */}
        <section style={{ marginTop: sectionGap }}>
          <SectionHeader title="P&L PERFORMANCE" />
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: colGap }}>
            {/* Left: Waterfall 70% */}
            <div style={{ flex: isMobile ? 'none' : '7' }}>
              <WaterfallChart3D />
            </div>
            {/* Right: Stacked panels 30% */}
            <div style={{ flex: isMobile ? 'none' : '3', display: 'flex', flexDirection: 'column', gap: isMobile ? colGap : 8 }}>
              <div style={{ flex: '1 1 auto', minHeight: isMobile ? 180 : 120, display: 'flex', flexDirection: 'column' }}>
                <ProfitabilityChart />
              </div>
              <div style={{ flex: '0 0 auto', height: 44 }}>
                <DebtEquityReadout />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Balance Sheet & Assets */}
        <section style={{ marginTop: sectionGap }}>
          <SectionHeader title="BALANCE SHEET & ASSETS" />
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: colGap }}>
            <div style={{ flex: 1 }}>
              <BalanceSheetTable />
            </div>
            <div style={{ flex: 1 }}>
              <AssetDonut />
            </div>
          </div>
        </section>

        {/* Section 4: Cash & Liquidity */}
        <section style={{ marginTop: sectionGap }}>
          <SectionHeader title="CASH & LIQUIDITY" />
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: colGap }}>
            <div style={{ flex: 1 }}>
              <CashLiquidityTable />
            </div>
            <div style={{ flex: 1 }}>
              <CashPositionChart />
            </div>
          </div>
        </section>

        {/* Section 5: Trends & Compliance */}
        <section style={{ marginTop: sectionGap, paddingBottom: 20 }}>
          <SectionHeader title="TRENDS & COMPLIANCE" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr', gap: colGap, alignItems: 'stretch' }}>
            <ComplianceDonut />
            <VarianceRadar />
            <HistoricalTrends />
          </div>
        </section>
      </DashboardShell>
    </>
  )
}

export default App
