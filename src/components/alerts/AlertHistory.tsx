import { useState } from 'react';
import { CheckCircle, ExternalLink, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertHistoryEntry } from '@/data/mockAlerts';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface AlertHistoryProps {
  entries: AlertHistoryEntry[];
  showSymbol?: boolean;
  maxEntries?: number;
}

export function AlertHistory({
  entries,
  showSymbol = true,
  maxEntries = 10,
}: AlertHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(maxEntries);

  const visibleEntries = entries.slice(0, displayCount);
  const hasMore = entries.length > displayCount;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (entries.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Alert History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No alerts have been triggered yet
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Alert History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          {visibleEntries.map((entry, index) => (
            <div key={entry.id} className="relative pl-6 pb-4 last:pb-0">
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-0 top-1.5 w-[14px] h-[14px] rounded-full border-2 bg-card',
                  entry.notificationSent
                    ? 'border-success'
                    : 'border-muted-foreground'
                )}
              />

              <button
                onClick={() => toggleExpand(entry.id)}
                className="w-full text-left rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {showSymbol && (
                        <span className="font-semibold text-foreground">
                          {entry.symbol}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        reached ${entry.priceAtTrigger.toFixed(2)}
                      </span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          entry.distancePercent >= 0
                            ? 'bg-success/10 text-success'
                            : 'bg-destructive/10 text-destructive'
                        )}
                      >
                        {entry.distancePercent > 0 ? '+' : ''}
                        {entry.distancePercent.toFixed(2)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(entry.triggeredAt, 'MMM d, yyyy \'at\' h:mm a')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {entry.notificationSent && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                    {expandedId === entry.id ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === entry.id && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Trigger Price:
                        </span>
                        <span className="ml-2 text-foreground">
                          ${entry.priceAtTrigger.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target:</span>
                        <span className="ml-2 text-foreground">
                          ${entry.targetPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {entry.notificationSent && entry.notificationEmail && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">
                          Email sent to {entry.notificationEmail}
                        </span>
                      </div>
                    )}
                    <Link
                      to={`/positions/${entry.symbol}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Position
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => setDisplayCount((prev) => prev + maxEntries)}
            >
              Load More ({entries.length - displayCount} remaining)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
