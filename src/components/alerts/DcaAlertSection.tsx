import { useState, useMemo } from 'react';
import { Target, Bell, BellOff, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import {
  PriceAlert,
  calculateAlertRange,
  calculateDistancePercent,
  getDistanceStatus,
  thresholdOptions,
} from '@/data/mockAlerts';
import { toast } from 'sonner';

interface DcaAlertSectionProps {
  symbol: string;
  companyName: string;
  currentPrice: number;
  existingAlert?: PriceAlert;
  onAlertCreate?: (alert: Partial<PriceAlert>) => void;
  onAlertUpdate?: (alert: PriceAlert) => void;
  onAlertDelete?: (alertId: string) => void;
}

export function DcaAlertSection({
  symbol,
  companyName,
  currentPrice,
  existingAlert,
  onAlertCreate,
  onAlertUpdate,
  onAlertDelete,
}: DcaAlertSectionProps) {
  const [targetPrice, setTargetPrice] = useState<string>(
    existingAlert?.targetPrice?.toString() || ''
  );
  const [threshold, setThreshold] = useState<number>(existingAlert?.threshold || 2);
  const [alertEnabled, setAlertEnabled] = useState(existingAlert?.status === 'active');
  const [isEditing, setIsEditing] = useState(!existingAlert);

  const parsedTargetPrice = parseFloat(targetPrice) || 0;
  const alertRange = useMemo(
    () => calculateAlertRange(parsedTargetPrice, threshold),
    [parsedTargetPrice, threshold]
  );
  const distancePercent = useMemo(
    () => calculateDistancePercent(currentPrice, parsedTargetPrice),
    [currentPrice, parsedTargetPrice]
  );
  const distanceStatus = getDistanceStatus(distancePercent);

  const handleCreateAlert = () => {
    if (!parsedTargetPrice) {
      toast.error('Please enter a valid target price');
      return;
    }
    onAlertCreate?.({
      symbol,
      companyName,
      targetPrice: parsedTargetPrice,
      currentPrice,
      threshold,
      status: 'active',
    });
    setIsEditing(false);
    toast.success(`Alert created! You'll be notified when ${symbol} reaches $${alertRange.min.toFixed(2)} - $${alertRange.max.toFixed(2)}`);
  };

  const handleUpdateAlert = () => {
    if (!existingAlert) return;
    onAlertUpdate?.({
      ...existingAlert,
      targetPrice: parsedTargetPrice,
      threshold,
      status: alertEnabled ? 'active' : 'disabled',
    });
    setIsEditing(false);
    toast.success('Alert updated successfully');
  };

  const handleDeleteAlert = () => {
    if (!existingAlert) return;
    onAlertDelete?.(existingAlert.id);
    setTargetPrice('');
    setThreshold(2);
    setIsEditing(true);
    toast.success('Alert deleted');
  };

  const handleToggleAlert = (enabled: boolean) => {
    setAlertEnabled(enabled);
    if (existingAlert) {
      onAlertUpdate?.({
        ...existingAlert,
        status: enabled ? 'active' : 'disabled',
      });
      toast.success(enabled ? 'Alert enabled' : 'Alert disabled');
    }
  };

  const getDistanceColor = () => {
    if (!parsedTargetPrice) return 'text-muted-foreground';
    switch (distanceStatus) {
      case 'in-range':
        return 'text-success';
      case 'near':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getDistanceBgColor = () => {
    if (!parsedTargetPrice) return 'bg-muted';
    switch (distanceStatus) {
      case 'in-range':
        return 'bg-success/10';
      case 'near':
        return 'bg-warning/10';
      default:
        return 'bg-muted/50';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">
            DCA Target & Alerts
          </CardTitle>
        </div>
        {existingAlert && !isEditing && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
              <span className="sr-only">Edit Alert</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete Alert</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Alert</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the price alert for {symbol}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAlert}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Target Price Section */}
        <div className="space-y-3">
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
                disabled={!isEditing}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Set your ideal buy price for this position
            </p>
          </div>

          {/* Distance Indicator */}
          {parsedTargetPrice > 0 && (
            <div className={cn('rounded-lg p-3', getDistanceBgColor())}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Price</span>
                <span className="font-medium text-foreground">${currentPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-muted-foreground">Distance</span>
                <span className={cn('font-medium', getDistanceColor())}>
                  {distancePercent > 0 ? '+' : ''}
                  {distancePercent.toFixed(2)}% {distancePercent > 0 ? 'above' : 'below'} target
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Alert Configuration */}
        {parsedTargetPrice > 0 && (
          <div className="space-y-4 pt-2 border-t border-border">
            {/* Enable/Disable Toggle */}
            {existingAlert && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {alertEnabled ? (
                    <Bell className="w-4 h-4 text-success" />
                  ) : (
                    <BellOff className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Label htmlFor="alertEnabled" className="cursor-pointer">
                    Enable Price Alerts
                  </Label>
                </div>
                <Switch
                  id="alertEnabled"
                  checked={alertEnabled}
                  onCheckedChange={handleToggleAlert}
                  disabled={!isEditing}
                />
              </div>
            )}

            {/* Threshold Selection */}
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
                    disabled={!isEditing}
                    className={cn(
                      'min-w-[60px]',
                      threshold === option.value && 'bg-primary text-primary-foreground'
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
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Alert Range</span>
                <span className="font-mono text-sm text-foreground">
                  ${alertRange.min.toFixed(2)} - ${alertRange.max.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Notification Channels */}
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
              <div className="flex items-center gap-2 text-sm opacity-50">
                <input type="checkbox" disabled className="rounded border-border" />
                <span className="text-muted-foreground">
                  🔔 Push Notifications
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Coming Soon
                  </Badge>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-2 pt-2">
                {existingAlert ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTargetPrice(existingAlert.targetPrice.toString());
                        setThreshold(existingAlert.threshold);
                        setAlertEnabled(existingAlert.status === 'active');
                        setIsEditing(false);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateAlert} className="flex-1">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleCreateAlert} className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Create Alert
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Active Alert Status */}
        {existingAlert && !isEditing && existingAlert.status === 'active' && (
          <div className="rounded-lg bg-success/10 border border-success/20 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-success text-success-foreground">
                <Bell className="w-3 h-3 mr-1" />
                Alert Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              You'll be notified when {symbol} reaches ${existingAlert.targetPrice.toFixed(2)} (±{existingAlert.threshold}%)
            </p>
            <p className="text-xs text-muted-foreground">
              Alert range: ${alertRange.min.toFixed(2)} - ${alertRange.max.toFixed(2)}
            </p>
            {existingAlert.lastTriggeredAt && (
              <p className="text-xs text-muted-foreground">
                Last alert: {existingAlert.lastTriggeredAt.toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {/* Disabled Alert Status */}
        {existingAlert && !isEditing && existingAlert.status === 'disabled' && (
          <div className="rounded-lg bg-muted/50 border border-border p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <BellOff className="w-3 h-3 mr-1" />
                Alert Disabled
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              This alert is currently paused. Enable it to receive notifications.
            </p>
          </div>
        )}

        {/* Triggered Alert Status */}
        {existingAlert && !isEditing && existingAlert.status === 'triggered' && (
          <div className="rounded-lg bg-warning/10 border border-warning/20 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-warning text-warning-foreground">
                <Bell className="w-3 h-3 mr-1 animate-pulse" />
                Triggered
              </Badge>
              {existingAlert.cooldownEndsAt && (
                <span className="text-xs text-muted-foreground">
                  Cooldown active
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Alert was triggered! {symbol} reached ${existingAlert.currentPrice.toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
