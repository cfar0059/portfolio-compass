import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonCardsProps {
  portfolioReturn: number;
  benchmarkReturn: number;
  benchmarkName: string;
  benchmarkDescription: string;
}

function formatReturn(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function ReturnIcon({ value, className }: { value: number; className?: string }) {
  if (value > 0) return <TrendingUp className={cn('h-5 w-5', className)} />;
  if (value < 0) return <TrendingDown className={cn('h-5 w-5', className)} />;
  return <Minus className={cn('h-5 w-5', className)} />;
}

export function ComparisonCards({
  portfolioReturn,
  benchmarkReturn,
  benchmarkName,
  benchmarkDescription,
}: ComparisonCardsProps) {
  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-foreground';
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      {/* Portfolio Card */}
      <Card className="w-full sm:flex-1 bg-card border-border rounded-xl">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground font-medium">Your Portfolio</span>
            <ReturnIcon value={portfolioReturn} className={getReturnColor(portfolioReturn)} />
          </div>
          <span className={cn('text-4xl font-bold', getReturnColor(portfolioReturn))}>
            {formatReturn(portfolioReturn)}
          </span>
        </CardContent>
      </Card>

      {/* VS Separator */}
      <div className="text-muted-foreground text-sm font-medium py-2 sm:py-0">vs</div>

      {/* Benchmark Card */}
      <Card className="w-full sm:flex-1 bg-card border-border rounded-xl">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground font-medium">{benchmarkName}</span>
            <ReturnIcon value={benchmarkReturn} className={getReturnColor(benchmarkReturn)} />
          </div>
          <p className="text-xs text-muted-foreground mb-2">{benchmarkDescription}</p>
          <span className={cn('text-4xl font-bold', getReturnColor(benchmarkReturn))}>
            {formatReturn(benchmarkReturn)}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
