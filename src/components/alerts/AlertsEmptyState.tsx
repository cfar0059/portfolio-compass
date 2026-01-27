import { Bell, Sparkles, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlertsEmptyStateProps {
  onCreateAlert: () => void;
}

export function AlertsEmptyState({ onCreateAlert }: AlertsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        {/* Main bell icon */}
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Bell className="w-10 h-10 text-primary" />
        </div>
        {/* Sparkle decorations */}
        <Sparkles className="w-6 h-6 text-warning absolute -top-1 -right-1 animate-pulse" />
        <Sparkles className="w-4 h-4 text-primary absolute bottom-2 -left-2 animate-pulse delay-300" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">
        No Price Alerts Yet
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        Create your first alert to get notified when stocks reach your target prices.
        Never miss a DCA opportunity!
      </p>

      <Button onClick={onCreateAlert} size="lg">
        <Plus className="w-5 h-5 mr-2" />
        Create Your First Alert
      </Button>

      {/* Feature highlights */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
        <div className="text-center p-4">
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
            <span className="text-success text-lg">🎯</span>
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Set Target Prices</h4>
          <p className="text-xs text-muted-foreground">
            Define your ideal DCA entry points
          </p>
        </div>
        <div className="text-center p-4">
          <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
            <span className="text-warning text-lg">📧</span>
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Email Notifications</h4>
          <p className="text-xs text-muted-foreground">
            Get notified when prices drop
          </p>
        </div>
        <div className="text-center p-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <span className="text-primary text-lg">⚡</span>
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">Never Miss Out</h4>
          <p className="text-xs text-muted-foreground">
            Catch every buying opportunity
          </p>
        </div>
      </div>
    </div>
  );
}
