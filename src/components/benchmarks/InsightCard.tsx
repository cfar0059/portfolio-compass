import { Card, CardContent } from '@/components/ui/card';
import { PartyPopper, BarChart3, Lightbulb, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

type InsightState = 'winning' | 'losing-close' | 'losing-significant' | 'tied';

interface InsightCardProps {
  portfolioReturn: number;
  benchmarkReturn: number;
  benchmarkName: string;
}

function getInsightState(portfolioReturn: number, benchmarkReturn: number): InsightState {
  const difference = portfolioReturn - benchmarkReturn;
  
  if (Math.abs(difference) <= 0.5) return 'tied';
  if (difference > 0) return 'winning';
  if (difference >= -5) return 'losing-close';
  return 'losing-significant';
}

interface InsightConfig {
  icon: React.ElementType;
  title: string;
  body: string;
  bgColor: string;
  borderColor: string;
  titleColor: string;
}

function getInsightConfig(
  state: InsightState,
  portfolioReturn: number,
  benchmarkReturn: number,
  benchmarkName: string
): InsightConfig {
  const difference = Math.abs(portfolioReturn - benchmarkReturn).toFixed(2);
  
  switch (state) {
    case 'winning':
      return {
        icon: PartyPopper,
        title: `You're beating the ${benchmarkName} by ${difference}%`,
        body: "Your investment choices are outperforming a simple index fund strategy. Keep it up!",
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        titleColor: 'text-green-500',
      };
    case 'losing-close':
      return {
        icon: BarChart3,
        title: `The ${benchmarkName} is ahead by ${difference}%`,
        body: "You're close to the market average. Many professional fund managers also trail the index - patience and consistency pay off with DCA.",
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        titleColor: 'text-yellow-500',
      };
    case 'losing-significant':
      return {
        icon: Lightbulb,
        title: `The ${benchmarkName} is ahead by ${difference}%`,
        body: "Consider adding broad market ETFs like SPY or VOO to your portfolio for diversification.",
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        titleColor: 'text-blue-500',
      };
    case 'tied':
      return {
        icon: Scale,
        title: `You're matching the ${benchmarkName}`,
        body: "Your portfolio is performing in line with the broader market. That's solid, consistent investing!",
        bgColor: 'bg-muted',
        borderColor: 'border-border',
        titleColor: 'text-foreground',
      };
  }
}

export function InsightCard({ portfolioReturn, benchmarkReturn, benchmarkName }: InsightCardProps) {
  const state = getInsightState(portfolioReturn, benchmarkReturn);
  const config = getInsightConfig(state, portfolioReturn, benchmarkReturn, benchmarkName);
  const Icon = config.icon;

  return (
    <Card className={cn('rounded-xl border', config.bgColor, config.borderColor)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Icon className={cn('h-6 w-6 flex-shrink-0 mt-0.5', config.titleColor)} />
          <div>
            <h3 className={cn('font-semibold mb-1', config.titleColor)}>{config.title}</h3>
            <p className="text-sm text-muted-foreground">{config.body}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
