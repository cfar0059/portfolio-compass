import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TimePeriodSelector, TimePeriod } from '@/components/benchmarks/TimePeriodSelector';
import { BenchmarkSelector, Benchmark, benchmarkOptions } from '@/components/benchmarks/BenchmarkSelector';
import { ComparisonCards } from '@/components/benchmarks/ComparisonCards';
import { InsightCard } from '@/components/benchmarks/InsightCard';
import { ViewToggle, ViewMode } from '@/components/benchmarks/ViewToggle';
import { PerformanceChart } from '@/components/benchmarks/PerformanceChart';
import { StatCardsGrid } from '@/components/benchmarks/StatCardsGrid';
import { EmptyState } from '@/components/benchmarks/EmptyState';
import { mockPositions } from '@/data/mockPositions';

// Mock data - in production, these would be calculated from real data
const mockBenchmarkReturns: Record<Benchmark, number> = {
  sp500: 6.07,
  nasdaq: 8.23,
  dow: 4.12,
};

const mockPortfolioReturn = 14.76;

const Benchmarks = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('since-start');
  const [selectedBenchmark, setSelectedBenchmark] = useState<Benchmark>('sp500');
  const [viewMode, setViewMode] = useState<ViewMode>('chart');

  const hasPositions = mockPositions.length > 0;
  const benchmarkInfo = benchmarkOptions.find((o) => o.value === selectedBenchmark)!;
  const benchmarkReturn = mockBenchmarkReturns[selectedBenchmark];

  if (!hasPositions) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Benchmark Comparison</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Compare your portfolio performance against major market indices
            </p>
          </div>
          <EmptyState />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Benchmark Comparison</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Compare your portfolio performance against major market indices
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center gap-4">
          <TimePeriodSelector value={timePeriod} onValueChange={setTimePeriod} />
          <BenchmarkSelector value={selectedBenchmark} onValueChange={setSelectedBenchmark} />
        </div>

        {/* Comparison Cards */}
        <ComparisonCards
          portfolioReturn={mockPortfolioReturn}
          benchmarkReturn={benchmarkReturn}
          benchmarkName={benchmarkInfo.label}
          benchmarkDescription={benchmarkInfo.description}
        />

        {/* Insight Card */}
        <InsightCard
          portfolioReturn={mockPortfolioReturn}
          benchmarkReturn={benchmarkReturn}
          benchmarkName={benchmarkInfo.label}
        />

        {/* View Toggle */}
        <ViewToggle value={viewMode} onValueChange={setViewMode} />

        {/* Performance Chart OR Stat Cards Grid */}
        {viewMode === 'chart' ? (
          <PerformanceChart
            benchmarkName={benchmarkInfo.label}
            benchmarkKey={selectedBenchmark}
          />
        ) : (
          <StatCardsGrid
            portfolioReturn={mockPortfolioReturn}
            benchmarkReturns={mockBenchmarkReturns}
            selectedBenchmark={selectedBenchmark}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Benchmarks;
