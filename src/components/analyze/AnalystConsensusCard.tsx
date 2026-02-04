import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockAnalysis } from '@/data/mockStockAnalysis';
import { cn } from '@/lib/utils';

interface AnalystConsensusCardProps {
  stock: StockAnalysis;
}

export function AnalystConsensusCard({ stock }: AnalystConsensusCardProps) {
  const { analystRating, priceTargets } = stock;
  const { distribution, totalAnalysts } = analystRating;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'STRONG BUY':
        return 'bg-primary text-primary-foreground';
      case 'BUY':
        return 'bg-primary/70 text-primary-foreground';
      case 'HOLD':
        return 'bg-muted text-muted-foreground';
      case 'SELL':
        return 'bg-destructive/70 text-destructive-foreground';
      case 'STRONG SELL':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPercentage = (value: number) => (value / totalAnalysts) * 100;

  const currentPricePosition = () => {
    const range = priceTargets.high - priceTargets.low;
    const position = ((priceTargets.currentPrice - priceTargets.low) / range) * 100;
    return Math.max(0, Math.min(100, position));
  };

  return (
    <Card className="bg-card border-border rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Users className="w-5 h-5 text-primary" />
          Analyst Consensus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating Badge */}
        <div className="flex justify-center">
          <span
            className={cn(
              'px-4 py-2 rounded-lg text-lg font-bold',
              getRatingColor(analystRating.rating)
            )}
          >
            {analystRating.rating}
          </span>
        </div>

        {/* Distribution Bar */}
        <div className="space-y-2">
          <div className="h-4 rounded-full overflow-hidden flex w-full">
            {distribution.strongBuy > 0 && (
              <div
                className="bg-primary"
                style={{ width: `${getPercentage(distribution.strongBuy)}%` }}
              />
            )}
            {distribution.buy > 0 && (
              <div
                className="bg-primary/60"
                style={{ width: `${getPercentage(distribution.buy)}%` }}
              />
            )}
            {distribution.hold > 0 && (
              <div
                className="bg-muted-foreground"
                style={{ width: `${getPercentage(distribution.hold)}%` }}
              />
            )}
            {distribution.sell > 0 && (
              <div
                className="bg-destructive/60"
                style={{ width: `${getPercentage(distribution.sell)}%` }}
              />
            )}
            {distribution.strongSell > 0 && (
              <div
                className="bg-destructive"
                style={{ width: `${getPercentage(distribution.strongSell)}%` }}
              />
            )}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {totalAnalysts} analysts
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Strong Buy: {distribution.strongBuy}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary/60" />
            Buy: {distribution.buy}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            Hold: {distribution.hold}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-destructive/60" />
            Sell: {distribution.sell}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            Strong Sell: {distribution.strongSell}
          </span>
        </div>

        {/* Price Targets */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Price Targets
          </h3>
          
          <div className="flex justify-between items-end mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-destructive">
                ${priceTargets.low.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Low</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-foreground">
                ${priceTargets.mean.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Mean</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-primary">
                ${priceTargets.high.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">High</p>
            </div>
          </div>

          {/* Range Bar */}
          <div className="relative h-2 bg-muted rounded-full mb-6">
            <div
              className="absolute inset-y-0 rounded-full"
              style={{
                left: 0,
                right: 0,
                background: 'linear-gradient(to right, hsl(var(--destructive)), hsl(var(--muted-foreground)), hsl(var(--primary)))',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-foreground rounded"
              style={{ left: `${currentPricePosition()}%` }}
            />
          </div>
          
          <div className="text-center" style={{ marginLeft: `${currentPricePosition()}%`, transform: 'translateX(-50%)' }}>
            <p className="text-xs text-muted-foreground">
              Current: ${priceTargets.currentPrice.toFixed(2)}
            </p>
          </div>

          {/* Implied Upside */}
          <div className="text-center mt-4">
            <span
              className={cn(
                'font-medium',
                priceTargets.impliedUpside >= 0 ? 'text-primary' : 'text-destructive'
              )}
            >
              Implied Upside: {priceTargets.impliedUpside >= 0 ? '+' : ''}
              {priceTargets.impliedUpside.toFixed(1)}% from current price
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
