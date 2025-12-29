import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BenchmarkChart } from '@/components/dashboard/BenchmarkChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const benchmarkStats = [
  { name: 'Your Portfolio', value: '+14.76%', isPositive: true },
  { name: 'S&P 500', value: '+6.07%', isPositive: true },
  { name: 'NASDAQ', value: '+8.23%', isPositive: true },
  { name: 'Dow Jones', value: '+4.12%', isPositive: true },
];

const Benchmarks = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Benchmark Comparison</h1>
          <p className="text-muted-foreground">Compare your portfolio against major indices</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benchmarkStats.map((stat) => (
            <Card key={stat.name} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.name}</span>
                  {stat.isPositive ? (
                    <TrendingUp className="w-5 h-5 text-primary" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <span className={cn(
                  "text-2xl font-bold",
                  stat.isPositive ? "text-primary" : "text-destructive"
                )}>
                  {stat.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <BenchmarkChart />
      </div>
    </DashboardLayout>
  );
};

export default Benchmarks;
