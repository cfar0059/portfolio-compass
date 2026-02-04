import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { StockAnalysis } from '@/data/mockStockAnalysis';
import { cn } from '@/lib/utils';

interface StockHeaderCardProps {
  stock: StockAnalysis;
}

export function StockHeaderCard({ stock }: StockHeaderCardProps) {
  const isPositive = stock.dailyChange >= 0;
  const formattedChange = isPositive
    ? `+$${stock.dailyChange.toFixed(2)} (+${stock.dailyChangePercent.toFixed(1)}%)`
    : `-$${Math.abs(stock.dailyChange).toFixed(2)} (${stock.dailyChangePercent.toFixed(1)}%)`;

  const formattedTime = stock.lastUpdated.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });

  return (
    <Card className="bg-card border-border rounded-xl">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{stock.symbol}</h2>
            <p className="text-sm text-muted-foreground mt-1">{stock.companyName}</p>
          </div>
          
          <div className="flex flex-col md:items-end gap-2">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold font-mono text-foreground">
                ${stock.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <div
                className={cn(
                  'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                  isPositive ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{formattedChange}</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              Last updated: {formattedTime}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
