import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PositionDetails } from '@/data/mockPurchases';

interface PositionHeaderProps {
  position: PositionDetails;
}

export function PositionHeader({ position }: PositionHeaderProps) {
  const navigate = useNavigate();
  const isPositive = position.dailyChange >= 0;

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
        onClick={() => navigate('/positions')}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Positions
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">{position.symbol}</h1>
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              isPositive 
                ? "bg-primary/10 text-primary" 
                : "bg-destructive/10 text-destructive"
            )}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isPositive ? '+' : ''}{position.dailyChangePercent.toFixed(2)}%
            </div>
          </div>
          <p className="text-muted-foreground">{position.companyName}</p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-foreground font-mono">
            ${position.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className={cn(
            "text-lg font-medium",
            isPositive ? "text-primary" : "text-destructive"
          )}>
            {isPositive ? '+' : ''}${position.dailyChange.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
