import { useState, useMemo, useEffect } from 'react';
import { Bell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  PriceAlert,
  calculateAlertRange,
  thresholdOptions,
} from '@/data/mockAlerts';
import { mockPositions } from '@/data/mockPositions';

interface CreateAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAlert?: PriceAlert;
  preselectedSymbol?: string;
  onSave: (alert: Partial<PriceAlert>) => void;
}

export function CreateAlertDialog({
  open,
  onOpenChange,
  editingAlert,
  preselectedSymbol,
  onSave,
}: CreateAlertDialogProps) {
  const [symbol, setSymbol] = useState<string>(preselectedSymbol || '');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [threshold, setThreshold] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes or editing alert changes
  useEffect(() => {
    if (open) {
      if (editingAlert) {
        setSymbol(editingAlert.symbol);
        setTargetPrice(editingAlert.targetPrice.toString());
        setThreshold(editingAlert.threshold);
      } else {
        setSymbol(preselectedSymbol || '');
        setTargetPrice('');
        setThreshold(2);
      }
    }
  }, [open, editingAlert, preselectedSymbol]);

  const parsedTargetPrice = parseFloat(targetPrice) || 0;
  const alertRange = useMemo(
    () => calculateAlertRange(parsedTargetPrice, threshold),
    [parsedTargetPrice, threshold]
  );

  const selectedPosition = mockPositions.find((p) => p.symbol === symbol);

  const handleSubmit = async () => {
    if (!symbol || !parsedTargetPrice) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSave({
      id: editingAlert?.id,
      symbol,
      companyName: selectedPosition?.symbol || symbol, // Would come from API
      targetPrice: parsedTargetPrice,
      currentPrice: selectedPosition?.price || 0,
      threshold,
      status: 'active',
    });

    setIsSubmitting(false);
    onOpenChange(false);
  };

  const isValid = symbol && parsedTargetPrice > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingAlert ? 'Edit Price Alert' : 'Create Price Alert'}
          </DialogTitle>
          <DialogDescription>
            {editingAlert
              ? `Update alert settings for ${editingAlert.symbol}`
              : 'Set up a new price alert to get notified when a stock reaches your target price.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Position Selector - Only show if not editing and no preselected symbol */}
          {!editingAlert && !preselectedSymbol && (
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select value={symbol} onValueChange={setSymbol}>
                <SelectTrigger className="bg-accent border-border">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  {mockPositions.map((position) => (
                    <SelectItem key={position.id} value={position.symbol}>
                      <span className="flex items-center justify-between w-full gap-4">
                        <span className="font-medium">{position.symbol}</span>
                        <span className="text-muted-foreground">
                          ${position.price.toFixed(2)}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Show selected symbol if preselected */}
          {(editingAlert || preselectedSymbol) && (
            <div className="space-y-2">
              <Label>Position</Label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                <span className="font-bold text-foreground">{symbol}</span>
                {selectedPosition && (
                  <span className="text-muted-foreground">
                    - ${selectedPosition.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Target Price Input */}
          <div className="space-y-2">
            <Label htmlFor="targetPrice">Target DCA Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="targetPrice"
                type="number"
                step="0.01"
                min="0"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="240.00"
                className="pl-7 bg-accent border-border"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              The price you want to buy at
            </p>
          </div>

          {/* Threshold Selector */}
          <div className="space-y-2">
            <Label>Alert Threshold</Label>
            <div className="flex flex-wrap gap-2">
              {thresholdOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={threshold === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setThreshold(option.value)}
                  className={cn(
                    'min-w-[60px]',
                    threshold === option.value &&
                      'bg-primary text-primary-foreground'
                  )}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Get notified when price is within this range
            </p>
          </div>

          {/* Alert Range Preview */}
          {parsedTargetPrice > 0 && (
            <div className="rounded-lg bg-muted/50 border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Alert Range</span>
                <span className="font-mono text-sm text-foreground">
                  ${alertRange.min.toFixed(2)} - ${alertRange.max.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Notification Preferences */}
          <div className="space-y-2">
            <Label>Notification Channels</Label>
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked
                disabled
                className="rounded border-border"
              />
              <span className="text-muted-foreground">✉️ Email (always enabled)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Email notifications are always enabled
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <>
                <Bell className="w-4 h-4 mr-2" />
                {editingAlert ? 'Save Changes' : 'Create Alert'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
