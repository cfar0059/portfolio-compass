import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Purchase } from '@/data/mockPurchases';

const purchaseSchema = z.object({
  date: z.date({ required_error: 'Purchase date is required' }),
  shares: z
    .number({ required_error: 'Number of shares is required' })
    .positive('Shares must be greater than 0'),
  pricePerShare: z
    .number({ required_error: 'Price per share is required' })
    .positive('Price must be greater than 0'),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface AddPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Purchase, 'id' | 'positionId' | 'symbol'>) => void;
  editingPurchase: Purchase | null;
  symbol: string;
}

export function AddPurchaseDialog({
  open,
  onOpenChange,
  onSave,
  editingPurchase,
  symbol,
}: AddPurchaseDialogProps) {
  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      date: new Date(),
      shares: undefined,
      pricePerShare: undefined,
    },
  });

  const shares = form.watch('shares');
  const pricePerShare = form.watch('pricePerShare');

  const totalCost = useMemo(() => {
    if (shares && pricePerShare) {
      return shares * pricePerShare;
    }
    return 0;
  }, [shares, pricePerShare]);

  useEffect(() => {
    if (open) {
      if (editingPurchase) {
        form.reset({
          date: editingPurchase.date,
          shares: editingPurchase.shares,
          pricePerShare: editingPurchase.pricePerShare,
        });
      } else {
        form.reset({
          date: new Date(),
          shares: undefined,
          pricePerShare: undefined,
        });
      }
    }
  }, [open, editingPurchase, form]);

  const onSubmit = (data: PurchaseFormData) => {
    onSave({
      date: data.date,
      shares: data.shares,
      pricePerShare: data.pricePerShare,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {editingPurchase ? 'Edit Purchase' : 'Add Purchase'}
          </DialogTitle>
          <DialogDescription>
            {editingPurchase
              ? `Update your ${symbol} purchase details.`
              : `Record a new ${symbol} purchase to your portfolio.`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Purchase Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal bg-secondary border-border',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Shares</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g., 10"
                      className="bg-secondary border-border"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseFloat(value) : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pricePerShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Share ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 150.00"
                      className="bg-secondary border-border"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseFloat(value) : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Calculated Total Cost */}
            <div className="pt-2 border-t border-border">
              <Label className="text-muted-foreground">Total Cost</Label>
              <p className="text-2xl font-bold text-foreground font-mono">
                ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingPurchase ? 'Save Changes' : 'Add Purchase'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
