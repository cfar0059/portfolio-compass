import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Benchmark, benchmarkOptions } from './BenchmarkSelector';

interface StatCard {
  id: string;
  name: string;
  value: number;
  isPortfolio?: boolean;
}

interface StatCardsGridProps {
  portfolioReturn: number;
  benchmarkReturns: Record<Benchmark, number>;
  selectedBenchmark: Benchmark;
}

export function StatCardsGrid({ portfolioReturn, benchmarkReturns, selectedBenchmark }: StatCardsGridProps) {
  const stats: StatCard[] = [
    { id: 'portfolio', name: 'Your Portfolio', value: portfolioReturn, isPortfolio: true },
    ...benchmarkOptions.map((opt) => ({
      id: opt.value,
      name: opt.label,
      value: benchmarkReturns[opt.value],
    })),
  ];

  const formatReturn = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-foreground';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const isSelected = stat.id === selectedBenchmark;
        
        return (
          <Card
            key={stat.id}
            className={cn(
              'bg-card border-border rounded-xl transition-all',
              isSelected && !stat.isPortfolio && 'ring-2 ring-primary'
            )}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">{stat.name}</span>
                {stat.value >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <span className={cn('text-2xl font-bold', getReturnColor(stat.value))}>
                {formatReturn(stat.value)}
              </span>
              {isSelected && !stat.isPortfolio && (
                <p className="text-xs text-primary mt-2 font-medium">(selected)</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
