import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { PositionsTable } from '@/components/positions/PositionsTable';
import { BenchmarkChart } from '@/components/dashboard/BenchmarkChart';
import { DcaAlertCard } from '@/components/dashboard/DcaAlertCard';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PortfolioSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-full">
            <BenchmarkChart />
          </div>
          <div className="h-full">
            <DcaAlertCard variant="compact" />
          </div>
        </div>

        <PositionsTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
