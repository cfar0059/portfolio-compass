import { Bell, BellOff, Edit2, Trash2, Pause, Play } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  PriceAlert,
  calculateAlertRange,
  calculateDistancePercent,
  getDistanceStatus,
} from '@/data/mockAlerts';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface AlertCardProps {
  alert: PriceAlert;
  onEdit: (alert: PriceAlert) => void;
  onToggle: (alert: PriceAlert) => void;
  onDelete: (alertId: string) => void;
}

export function AlertCard({ alert, onEdit, onToggle, onDelete }: AlertCardProps) {
  const alertRange = calculateAlertRange(alert.targetPrice, alert.threshold);
  const distancePercent = calculateDistancePercent(alert.currentPrice, alert.targetPrice);
  const distanceStatus = getDistanceStatus(distancePercent);

  const getStatusBadge = () => {
    switch (alert.status) {
      case 'active':
        return (
          <Badge className="bg-success text-success-foreground animate-pulse">
            ACTIVE
          </Badge>
        );
      case 'triggered':
        return (
          <Badge className="bg-warning text-warning-foreground">
            TRIGGERED
          </Badge>
        );
      case 'disabled':
        return (
          <Badge variant="secondary">
            DISABLED
          </Badge>
        );
    }
  };

  const getDistanceColor = () => {
    switch (distanceStatus) {
      case 'in-range':
        return 'text-success';
      case 'near':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card border-border relative group hover:border-primary/30 transition-colors">
      {/* Status Badge - Absolute positioned */}
      <div className="absolute top-3 right-3">
        {getStatusBadge()}
      </div>

      <CardHeader className="pb-2">
        <Link 
          to={`/positions/${alert.symbol}`}
          className="hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-bold text-foreground">{alert.symbol}</h3>
        </Link>
        <p className="text-sm text-muted-foreground truncate pr-20">
          {alert.companyName}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Current Price */}
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Current Price</span>
          <span className="text-2xl font-bold text-foreground">
            ${alert.currentPrice.toFixed(2)}
          </span>
        </div>

        {/* Target Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Target</span>
          <span className="text-sm font-medium text-foreground">
            ${alert.targetPrice.toFixed(2)}
          </span>
        </div>

        {/* Distance Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Distance</span>
          <span className={cn('text-sm font-medium', getDistanceColor())}>
            {distancePercent > 0 ? '+' : ''}
            {distancePercent.toFixed(2)}% {distancePercent > 0 ? 'above' : 'below'}
          </span>
        </div>

        {/* Alert Info */}
        <div className="pt-2 border-t border-border space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Threshold</span>
            <span className="text-foreground">±{alert.threshold}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Range</span>
            <span className="font-mono text-foreground text-xs">
              ${alertRange.min.toFixed(2)} - ${alertRange.max.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>{alert.triggerCount} alerts sent</span>
          {alert.lastTriggeredAt && (
            <span>Last: {formatDistanceToNow(alert.lastTriggeredAt, { addSuffix: true })}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t border-border pt-3 flex justify-end gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onEdit(alert)}
            >
              <Edit2 className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit Alert</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onToggle(alert)}
            >
              {alert.status === 'active' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span className="sr-only">
                {alert.status === 'active' ? 'Pause' : 'Resume'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {alert.status === 'active' ? 'Pause Alert' : 'Resume Alert'}
          </TooltipContent>
        </Tooltip>

        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete Alert</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Alert</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the price alert for {alert.symbol}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(alert.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
