import { Bell, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDcaAlerts } from '@/data/mockPositions';
import { cn } from '@/lib/utils';

export function DcaAlertCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">
            Upcoming DCA Triggers
          </CardTitle>
        </div>
        <Button variant="outline" size="sm">
          <Bell className="w-4 h-4 mr-2" />
          Subscribe to Email Alerts
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockDcaAlerts.map((alert) => (
          <div
            key={alert.symbol}
            className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{alert.symbol}</span>
                  <Badge variant="destructive" className="text-xs">
                    -{alert.currentDrop.toFixed(2)}%
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  Threshold: -{alert.threshold}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={cn(
                "text-sm font-medium",
                alert.suggestedDate === 'Today' ? "text-primary" : "text-foreground"
              )}>
                {alert.suggestedDate}
              </span>
              <p className="text-xs text-muted-foreground">Suggested buy</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
