import { TrendingUp, TrendingDown, Wallet, DollarSign, BarChart3, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PositionSummaryCardProps {
  summary: {
    totalShares: number;
    avgCostBasis: number;
    totalInvested: number;
    currentValue: number;
    totalPL: number;
    totalPLPercent: number;
  };
}

export function PositionSummaryCard({ summary }: PositionSummaryCardProps) {
  const isPositive = summary.totalPL >= 0;

  const stats = [
    {
      label: 'Total Shares',
      value: summary.totalShares.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      icon: BarChart3,
    },
    {
      label: 'Avg Cost Basis',
      value: `$${summary.avgCostBasis.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Target,
    },
    {
      label: 'Total Invested',
      value: `$${summary.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Wallet,
    },
    {
      label: 'Current Value',
      value: `$${summary.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
    },
  ];

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{stat.label}</span>
              </div>
              <p className="text-xl font-semibold text-foreground font-mono">{stat.value}</p>
            </div>
          ))}

          {/* P&L - Highlighted */}
          <div className="col-span-2 lg:col-span-1 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-primary" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className="text-xs font-medium">Total P&L</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className={cn(
                "text-2xl font-bold font-mono",
                isPositive ? "text-primary" : "text-destructive"
              )}>
                {isPositive ? '+' : '-'}${Math.abs(summary.totalPL).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <span className={cn(
                "text-sm font-medium",
                isPositive ? "text-primary/80" : "text-destructive/80"
              )}>
                ({isPositive ? '+' : ''}{summary.totalPLPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
