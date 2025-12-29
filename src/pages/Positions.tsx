import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PositionsTable } from '@/components/positions/PositionsTable';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';

const Positions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PortfolioSummary />
        <PositionsTable />
      </div>
    </DashboardLayout>
  );
};

export default Positions;
