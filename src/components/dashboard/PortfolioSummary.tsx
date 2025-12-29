import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { mockPositions, calculateProfit } from '@/data/mockPositions';
import { cn } from '@/lib/utils';

export function PortfolioSummary() {
  const totalValue = mockPositions.reduce((sum, pos) => sum + pos.price * pos.shares, 0);
  const totalCost = mockPositions.reduce((sum, pos) => sum + pos.buyPrice * pos.shares, 0);
  const totalProfit = totalValue - totalCost;
  const profitPercent = ((totalValue - totalCost) / totalCost) * 100;
  const isPositive = totalProfit >= 0;

  const todayChange = mockPositions.reduce((sum, pos) => sum + (pos.change * pos.shares), 0);
  const todayPercent = (todayChange / totalValue) * 100;
  const isTodayPositive = todayChange >= 0;

  const stats = [
    {
      label: 'Portfolio Value',
      value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      trend: null,
    },
    {
      label: 'Total Profit',
      value: `${isPositive ? '+' : '-'}$${Math.abs(totalProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subValue: `${isPositive ? '+' : ''}${profitPercent.toFixed(2)}%`,
      icon: isPositive ? TrendingUp : TrendingDown,
      trend: isPositive ? 'up' : 'down',
    },
    {
      label: "Today's Change",
      value: `${isTodayPositive ? '+' : '-'}$${Math.abs(todayChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subValue: `${isTodayPositive ? '+' : ''}${todayPercent.toFixed(2)}%`,
      icon: isTodayPositive ? TrendingUp : TrendingDown,
      trend: isTodayPositive ? 'up' : 'down',
    },
    {
      label: 'Positions',
      value: mockPositions.length.toString(),
      icon: PieChart,
      trend: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={cn(
                "w-5 h-5",
                stat.trend === 'up' ? "text-primary" :
                stat.trend === 'down' ? "text-destructive" :
                "text-muted-foreground"
              )} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-2xl font-bold",
                stat.trend === 'up' ? "text-primary" :
                stat.trend === 'down' ? "text-destructive" :
                "text-foreground"
              )}>
                {stat.value}
              </span>
              {stat.subValue && (
                <span className={cn(
                  "text-sm",
                  stat.trend === 'up' ? "text-primary/80" :
                  stat.trend === 'down' ? "text-destructive/80" :
                  "text-muted-foreground"
                )}>
                  {stat.subValue}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
