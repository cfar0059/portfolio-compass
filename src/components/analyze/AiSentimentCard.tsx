import { Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AiSentimentCard() {
  return (
    <Card className="bg-card/50 border-dashed border-border rounded-xl opacity-60">
      <CardContent className="p-6 text-center">
        <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-muted-foreground">
          AI Sentiment Analysis
        </h3>
        <Badge variant="secondary" className="mt-2 text-xs">
          Coming Soon
        </Badge>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3">
          AI-powered market sentiment analysis and bull/bear case generation
        </p>
      </CardContent>
    </Card>
  );
}
