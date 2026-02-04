import { BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AnalyzeEmptyState() {
  return (
    <Card className="bg-card border-border rounded-xl">
      <CardContent className="p-12 text-center">
        <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Enter a stock symbol to get started
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Try searching for AAPL, MSFT, or UBER
        </p>
      </CardContent>
    </Card>
  );
}
