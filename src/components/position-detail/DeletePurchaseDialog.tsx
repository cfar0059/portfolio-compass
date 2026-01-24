import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Purchase } from '@/data/mockPurchases';

interface DeletePurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchase: Purchase | null;
  onConfirm: () => void;
}

export function DeletePurchaseDialog({
  open,
  onOpenChange,
  purchase,
  onConfirm,
}: DeletePurchaseDialogProps) {
  if (!purchase) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">Delete this purchase?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>This action cannot be undone. This will permanently delete:</p>
            <p className="font-medium text-foreground bg-secondary/50 p-3 rounded-md">
              {purchase.shares.toLocaleString('en-US', { minimumFractionDigits: 2 })} shares @ $
              {purchase.pricePerShare.toFixed(2)} on {format(purchase.date, 'MMM d, yyyy')}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Purchase
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
