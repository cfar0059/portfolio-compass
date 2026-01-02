import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Position } from '@/data/mockPositions';

const addPositionSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Symbol is required')
    .max(10, 'Symbol must be 10 characters or less')
    .transform((val) => val.toUpperCase().trim()),
  shares: z
    .string()
    .min(1, 'Shares is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Shares must be a positive number',
    }),
  buyPrice: z
    .string()
    .min(1, 'Buy price is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Buy price must be a positive number',
    }),
  targetDca: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: 'Target DCA must be a valid number',
    }),
});

type AddPositionFormData = z.infer<typeof addPositionSchema>;

interface AddPositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingSymbols: string[];
  onAddPosition: (position: Omit<Position, 'id' | 'price' | 'change'>) => void;
}

export function AddPositionDialog({
  open,
  onOpenChange,
  existingSymbols,
  onAddPosition,
}: AddPositionDialogProps) {
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const form = useForm<AddPositionFormData>({
    resolver: zodResolver(addPositionSchema),
    defaultValues: {
      symbol: '',
      shares: '',
      buyPrice: '',
      targetDca: '',
    },
  });

  const watchedSymbol = form.watch('symbol');

  // Check for duplicate on symbol change (blur-like validation)
  useEffect(() => {
    const normalizedSymbol = watchedSymbol?.toUpperCase().trim();
    if (normalizedSymbol && existingSymbols.includes(normalizedSymbol)) {
      setDuplicateError(
        'This symbol already exists in your portfolio. You can edit the existing position instead.'
      );
    } else {
      setDuplicateError(null);
    }
  }, [watchedSymbol, existingSymbols]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setDuplicateError(null);
    }
  }, [open, form]);

  const onSubmit = (data: AddPositionFormData) => {
    const normalizedSymbol = data.symbol.toUpperCase().trim();
    
    // Final duplicate check on submit
    if (existingSymbols.includes(normalizedSymbol)) {
      setDuplicateError(
        'This symbol already exists in your portfolio. You can edit the existing position instead.'
      );
      return;
    }

    onAddPosition({
      symbol: normalizedSymbol,
      shares: Number(data.shares),
      buyPrice: Number(data.buyPrice),
      dcaAmount: data.targetDca ? Number(data.targetDca) : 0,
    });

    onOpenChange(false);
  };

  const isSubmitDisabled = !!duplicateError || !form.formState.isValid;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Add Position
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Symbol
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. AMD"
                      className={`bg-background border-border text-foreground placeholder:text-muted-foreground/50 uppercase ${
                        duplicateError ? 'border-destructive/50 focus-visible:ring-destructive/30' : ''
                      }`}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value.toUpperCase());
                      }}
                    />
                  </FormControl>
                  {duplicateError ? (
                    <p className="text-sm text-destructive/90 mt-1.5">
                      {duplicateError}
                    </p>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shares"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Shares
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="e.g. 10"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Buy Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="e.g. 120"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="targetDca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Target DCA{' '}
                    <span className="text-muted-foreground/50 font-normal">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g. 100"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="min-w-[120px]"
              >
                Add Position
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
