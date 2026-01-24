import { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';

interface DangerZoneProps {
  symbol: string;
  purchaseCount: number;
  onDeletePosition: () => void;
}

export function DangerZone({ symbol, purchaseCount, onDeletePosition }: DangerZoneProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Simulate deletion
    setTimeout(() => {
      onDeletePosition();
      toast.success(`${symbol} has been removed from your portfolio`);
      navigate('/positions');
    }, 500);
  };

  return (
    <Card className="bg-card border-destructive/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-destructive flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Delete entire position</p>
            <p className="text-xs text-muted-foreground">
              This will remove {symbol} and all {purchaseCount} purchase{purchaseCount !== 1 ? 's' : ''} from your portfolio.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-2 shrink-0">
                <Trash2 className="w-4 h-4" />
                Delete Position
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">
                  Delete {symbol} from your portfolio?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the {symbol} position
                  and all {purchaseCount} associated purchase{purchaseCount !== 1 ? 's' : ''} from your portfolio.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Position'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
