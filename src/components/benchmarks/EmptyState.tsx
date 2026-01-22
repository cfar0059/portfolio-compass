import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EmptyState() {
  const navigate = useNavigate();

  return (
    <Card className="bg-card border-border rounded-xl">
      <CardContent className="p-12 text-center">
        <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          No positions to compare yet
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          Add some positions to your portfolio to see how you're performing against the market.
        </p>
        <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
          Add Your First Position
        </Button>
      </CardContent>
    </Card>
  );
}
