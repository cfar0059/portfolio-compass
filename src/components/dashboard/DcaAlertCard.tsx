import { Bell, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDcaAlerts } from '@/data/mockPositions';
import { cn } from '@/lib/utils';

interface DcaAlertCardProps {
  variant?: 'default' | 'compact';
}

export function DcaAlertCard({ variant = 'default' }: DcaAlertCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className={cn("bg-card border-border", isCompact && "h-full")}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between",
        isCompact ? "pb-3" : "pb-2"
      )}>
        <div className="flex items-center gap-2">
          <Bell className={cn("text-primary", isCompact ? "w-4 h-4" : "w-5 h-5")} />
          <CardTitle className={cn(
            "font-semibold text-foreground",
            isCompact ? "text-base" : "text-lg"
          )}>
            Upcoming DCA Triggers
          </CardTitle>
        </div>
        {!isCompact && (
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Subscribe to Email Alerts
          </Button>
        )}
      </CardHeader>
      <CardContent className={cn(isCompact ? "space-y-2" : "space-y-3")}>
        {mockDcaAlerts.map((alert) => (
          <div
            key={alert.symbol}
            className={cn(
              "flex items-center justify-between rounded-lg bg-accent/50 border border-border",
              isCompact ? "p-2" : "p-3"
            )}
          >
            <div className="flex items-center gap-3">
              {!isCompact && (
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 text-destructive" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-semibold text-foreground",
                    isCompact && "text-sm"
                  )}>{alert.symbol}</span>
                  <Badge variant="destructive" className="text-xs">
                    -{alert.currentDrop.toFixed(2)}%
                  </Badge>
                </div>
                {!isCompact && (
                  <span className="text-sm text-muted-foreground">
                    Threshold: -{alert.threshold}%
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className={cn(
                "font-medium",
                isCompact ? "text-xs" : "text-sm",
                alert.suggestedDate === 'Today' ? "text-primary" : "text-foreground"
              )}>
                {alert.suggestedDate}
              </span>
              {!isCompact && (
                <p className="text-xs text-muted-foreground">Suggested buy</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
