import { useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Purchase, calculatePurchasePL } from '@/data/mockPurchases';
import { AddPurchaseDialog } from './AddPurchaseDialog';
import { DeletePurchaseDialog } from './DeletePurchaseDialog';

interface PurchaseHistoryTableProps {
  purchases: Purchase[];
  currentPrice: number;
  symbol: string;
  onAddPurchase: (purchase: Omit<Purchase, 'id' | 'positionId' | 'symbol'>) => void;
  onEditPurchase: (purchase: Purchase) => void;
  onDeletePurchase: (purchaseId: string) => void;
}

type SortField = 'date' | 'shares' | 'pricePerShare' | 'pl';
type SortDirection = 'asc' | 'desc';

export function PurchaseHistoryTable({
  purchases,
  currentPrice,
  symbol,
  onAddPurchase,
  onEditPurchase,
  onDeletePurchase,
}: PurchaseHistoryTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [deletingPurchase, setDeletingPurchase] = useState<Purchase | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPurchases = [...purchases].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    if (sortField === 'date') {
      aValue = a.date.getTime();
      bValue = b.date.getTime();
    } else if (sortField === 'pl') {
      aValue = calculatePurchasePL(a, currentPrice).pl;
      bValue = calculatePurchasePL(b, currentPrice).pl;
    } else {
      aValue = a[sortField];
      bValue = b[sortField];
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const SortableHeader = ({ field, children, className }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <TableHead
      className={cn("cursor-pointer hover:bg-accent/50 transition-colors text-muted-foreground", className)}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={cn(
          "w-3 h-3",
          sortField === field ? "text-primary" : "text-muted-foreground/50"
        )} />
      </div>
    </TableHead>
  );

  const handleEditClick = (purchase: Purchase) => {
    setEditingPurchase(purchase);
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setEditingPurchase(null);
  };

  const handleSavePurchase = (data: Omit<Purchase, 'id' | 'positionId' | 'symbol'>) => {
    if (editingPurchase) {
      onEditPurchase({ ...editingPurchase, ...data });
    } else {
      onAddPurchase(data);
    }
    handleDialogClose();
  };

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">Purchase History</CardTitle>
          <Button size="sm" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Purchase
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {purchases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">No purchases recorded.</p>
              <Button variant="outline" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                Add your first purchase
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <SortableHeader field="date">Date</SortableHeader>
                      <SortableHeader field="shares">Shares</SortableHeader>
                      <SortableHeader field="pricePerShare">Price/Share</SortableHeader>
                      <TableHead className="text-muted-foreground">Total Cost</TableHead>
                      <TableHead className="text-muted-foreground">Current Value</TableHead>
                      <SortableHeader field="pl">P&L</SortableHeader>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPurchases.map((purchase) => {
                      const { totalCost, currentValue, pl, plPercent } = calculatePurchasePL(purchase, currentPrice);
                      const isPositive = pl >= 0;

                      return (
                        <TableRow key={purchase.id} className="border-border hover:bg-accent/30 transition-colors">
                          <TableCell className="text-foreground font-medium">
                            {format(purchase.date, 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-foreground font-mono">
                            {purchase.shares.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-foreground font-mono">
                            ${purchase.pricePerShare.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-foreground font-mono">
                            ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-foreground font-mono">
                            ${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className={cn(
                                "font-semibold font-mono",
                                isPositive ? "text-primary" : "text-destructive"
                              )}>
                                {isPositive ? '+' : '-'}${Math.abs(pl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                              <span className={cn(
                                "text-xs",
                                isPositive ? "text-primary/80" : "text-destructive/80"
                              )}>
                                ({isPositive ? '+' : ''}{plPercent.toFixed(2)}%)
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => handleEditClick(purchase)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => setDeletingPurchase(purchase)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3 p-4">
                {sortedPurchases.map((purchase) => {
                  const { totalCost, currentValue, pl, plPercent } = calculatePurchasePL(purchase, currentPrice);
                  const isPositive = pl >= 0;

                  return (
                    <div
                      key={purchase.id}
                      className="bg-secondary/50 rounded-lg p-4 space-y-3 border border-border"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-foreground font-medium">
                          {format(purchase.date, 'MMM d, yyyy')}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleEditClick(purchase)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setDeletingPurchase(purchase)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs text-muted-foreground">Shares</span>
                          <p className="text-foreground font-mono font-medium">
                            {purchase.shares.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Price/Share</span>
                          <p className="text-foreground font-mono font-medium">
                            ${purchase.pricePerShare.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Total Cost</span>
                          <p className="text-foreground font-mono font-medium">
                            ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Current Value</span>
                          <p className="text-foreground font-mono font-medium">
                            ${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">P&L</span>
                        <div className="flex items-baseline gap-2">
                          <span className={cn(
                            "text-lg font-bold font-mono",
                            isPositive ? "text-primary" : "text-destructive"
                          )}>
                            {isPositive ? '+' : '-'}${Math.abs(pl).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                          <span className={cn(
                            "text-sm",
                            isPositive ? "text-primary/80" : "text-destructive/80"
                          )}>
                            ({isPositive ? '+' : ''}{plPercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <AddPurchaseDialog
        open={isAddDialogOpen}
        onOpenChange={handleDialogClose}
        onSave={handleSavePurchase}
        editingPurchase={editingPurchase}
        symbol={symbol}
      />

      <DeletePurchaseDialog
        open={!!deletingPurchase}
        onOpenChange={() => setDeletingPurchase(null)}
        purchase={deletingPurchase}
        onConfirm={() => {
          if (deletingPurchase) {
            onDeletePurchase(deletingPurchase.id);
            setDeletingPurchase(null);
          }
        }}
      />
    </>
  );
}
