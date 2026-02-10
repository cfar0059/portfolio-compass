import { Info } from 'lucide-react';
import { StockAnalysis, SECTOR_AVG_PE } from '@/data/mockStockAnalysis';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FundamentalsTabProps {
  stock: StockAnalysis;
}

interface MetricRow {
  label: string;
  value: string;
  context: { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' };
  tooltip: string;
}

function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  return `$${value.toLocaleString()}`;
}

function getMarketCapLabel(value: number): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (value >= 200_000_000_000) return { text: 'Mega Cap', color: 'positive' };
  if (value >= 10_000_000_000) return { text: 'Large Cap', color: 'positive' };
  if (value >= 2_000_000_000) return { text: 'Mid Cap', color: 'neutral' };
  return { text: 'Small Cap', color: 'warning' };
}

function getPeContext(pe: number | null, sector: string): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (pe === null) return { text: 'N/A', color: 'neutral' };
  const sectorAvg = SECTOR_AVG_PE[sector] || 20;
  const ratio = pe / sectorAvg;
  if (ratio < 0.8) return { text: `Low for ${sector}`, color: 'positive' };
  if (ratio <= 1.3) return { text: `Average for ${sector}`, color: 'neutral' };
  return { text: `High vs ${sector}`, color: 'warning' };
}

function getForwardPeContext(forwardPE: number | null, currentPE: number | null): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (forwardPE === null || currentPE === null) return { text: 'N/A', color: 'neutral' };
  if (forwardPE < currentPE) return { text: 'Lower than current', color: 'positive' };
  return { text: 'Higher than current', color: 'warning' };
}

function getPegContext(peg: number | null): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (peg === null) return { text: 'N/A', color: 'neutral' };
  if (peg < 1) return { text: 'Undervalued', color: 'positive' };
  if (peg <= 2) return { text: 'Fairly Valued', color: 'neutral' };
  return { text: 'Expensive', color: 'warning' };
}

function getProfitMarginContext(margin: number | null): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (margin === null) return { text: 'N/A', color: 'neutral' };
  if (margin > 20) return { text: 'Strong', color: 'positive' };
  if (margin >= 10) return { text: 'Healthy', color: 'neutral' };
  return { text: 'Thin', color: 'warning' };
}

function getRoeContext(roe: number | null): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (roe === null) return { text: 'N/A', color: 'neutral' };
  if (roe > 20) return { text: 'Excellent', color: 'positive' };
  if (roe >= 10) return { text: 'Good', color: 'neutral' };
  return { text: 'Weak', color: 'warning' };
}

function getBetaContext(beta: number | null): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (beta === null) return { text: 'N/A', color: 'neutral' };
  if (beta < 0.8) return { text: 'Less Volatile', color: 'positive' };
  if (beta <= 1.2) return { text: 'Market Average', color: 'neutral' };
  return { text: 'More Volatile', color: 'warning' };
}

function getDebtEquityContext(de: number | null): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (de === null) return { text: 'N/A', color: 'neutral' };
  if (de < 0.5) return { text: 'Low Leverage', color: 'positive' };
  if (de <= 1.5) return { text: 'Moderate', color: 'neutral' };
  return { text: 'High Leverage', color: 'warning' };
}

function getDividendContext(dy: number | null): { text: string; color: 'positive' | 'neutral' | 'warning' | 'negative' } {
  if (dy === null || dy === 0) return { text: 'No Dividend', color: 'neutral' };
  if (dy > 4) return { text: 'High Yield', color: 'positive' };
  if (dy >= 1) return { text: 'Moderate Yield', color: 'neutral' };
  return { text: 'Low Yield', color: 'neutral' };
}

const contextColorMap = {
  positive: 'text-primary',
  neutral: 'text-warning',
  warning: 'text-warning',
  negative: 'text-destructive',
};

const dotColorMap = {
  positive: 'bg-primary',
  neutral: 'bg-warning',
  warning: 'bg-warning',
  negative: 'bg-destructive',
};

function MetricItem({ metric }: { metric: MetricRow }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">{metric.label}</span>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px]">
              <p className="text-xs">{metric.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-mono font-semibold text-foreground">{metric.value}</span>
        <span className={cn('flex items-center gap-1.5 text-xs', contextColorMap[metric.context.color])}>
          <span className={cn('w-1.5 h-1.5 rounded-full', dotColorMap[metric.context.color])} />
          {metric.context.text}
        </span>
      </div>
    </div>
  );
}

export function FundamentalsTab({ stock }: FundamentalsTabProps) {
  const f = stock.fundamentals;

  const valuationMetrics: MetricRow[] = [
    { label: 'Market Cap', value: formatMarketCap(f.marketCap), context: getMarketCapLabel(f.marketCap), tooltip: 'Total market value of all shares. Indicates company size.' },
    { label: 'P/E Ratio (TTM)', value: f.peRatio !== null ? f.peRatio.toFixed(1) : 'N/A', context: getPeContext(f.peRatio, stock.sector), tooltip: "How much you pay for $1 of earnings. Lower may indicate better value." },
    { label: 'Forward P/E', value: f.forwardPE !== null ? f.forwardPE.toFixed(1) : 'N/A', context: getForwardPeContext(f.forwardPE, f.peRatio), tooltip: 'Expected P/E based on future earnings estimates.' },
    { label: 'PEG Ratio', value: f.pegRatio !== null ? f.pegRatio.toFixed(2) : 'N/A', context: getPegContext(f.pegRatio), tooltip: 'P/E adjusted for growth. Under 1.0 suggests potential undervaluation.' },
  ];

  const profitabilityMetrics: MetricRow[] = [
    { label: 'EPS (TTM)', value: f.eps !== null ? `$${f.eps.toFixed(2)}` : 'N/A', context: { text: f.eps !== null && f.eps > 0 ? 'Profitable' : 'Unprofitable', color: f.eps !== null && f.eps > 0 ? 'positive' : 'negative' }, tooltip: 'Earnings per share. Shows how much profit each share earns.' },
    { label: 'Profit Margin', value: f.profitMargin !== null ? `${f.profitMargin.toFixed(1)}%` : 'N/A', context: getProfitMarginContext(f.profitMargin), tooltip: 'Percentage of revenue kept as profit after all expenses.' },
    { label: 'ROE', value: f.roe !== null ? `${f.roe.toFixed(1)}%` : 'N/A', context: getRoeContext(f.roe), tooltip: 'Return on equity. How efficiently the company uses shareholder capital.' },
  ];

  const riskMetrics: MetricRow[] = [
    { label: 'Beta', value: f.beta !== null ? f.beta.toFixed(2) : 'N/A', context: getBetaContext(f.beta), tooltip: "Measures volatility vs the market. 1.0 = moves with market." },
    { label: 'Debt/Equity', value: f.debtToEquity !== null ? f.debtToEquity.toFixed(2) : 'N/A', context: getDebtEquityContext(f.debtToEquity), tooltip: 'How much debt vs equity. Lower means less financial risk.' },
    { label: 'Dividend Yield', value: f.dividendYield !== null && f.dividendYield > 0 ? `${f.dividendYield.toFixed(2)}%` : 'None', context: getDividendContext(f.dividendYield), tooltip: 'Annual dividends as a percentage of share price.' },
  ];

  const groups = [
    { title: 'Valuation', subtitle: 'Is this stock expensive or cheap?', metrics: valuationMetrics },
    { title: 'Profitability', subtitle: 'Is the company making money efficiently?', metrics: profitabilityMetrics },
    { title: 'Risk & Income', subtitle: 'How risky is this stock? Does it pay dividends?', metrics: riskMetrics },
  ];

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {group.title}
            </h3>
            <p className="text-xs text-muted-foreground italic">{group.subtitle}</p>
          </div>
          <div className="divide-y divide-border">
            {group.metrics.map((metric) => (
              <MetricItem key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
