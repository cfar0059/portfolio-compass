import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, Pencil, X, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockPositions, calculateProfit, Position } from '@/data/mockPositions';
import { cn } from '@/lib/utils';
import { AddPositionDialog } from './AddPositionDialog';
import { toast } from 'sonner';

type SortField = 'symbol' | 'price' | 'change' | 'shares' | 'buyPrice' | 'profit' | 'dcaAmount';
type SortDirection = 'asc' | 'desc';

export function PositionsTable() {
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [sortField, setSortField] = useState<SortField>('profit');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const existingSymbols = positions.map((p) => p.symbol.toUpperCase());

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleAddPosition = (newPosition: Omit<Position, 'id' | 'price' | 'change'>) => {
    const position: Position = {
      id: crypto.randomUUID(),
      symbol: newPosition.symbol,
      price: newPosition.buyPrice, // Default price to buy price for new positions
      change: 0,
      shares: newPosition.shares,
      buyPrice: newPosition.buyPrice,
      dcaAmount: newPosition.dcaAmount,
    };
    setPositions((prev) => [...prev, position]);
    toast.success(`${newPosition.symbol} added to your portfolio`);
  };

  const sortedPositions = [...positions].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    if (sortField === 'profit') {
      aValue = calculateProfit(a).profit;
      bValue = calculateProfit(b).profit;
    } else if (sortField === 'symbol') {
      return sortDirection === 'asc'
        ? a.symbol.localeCompare(b.symbol)
        : b.symbol.localeCompare(a.symbol);
    } else {
      aValue = a[sortField];
      bValue = b[sortField];
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead
      className="cursor-pointer hover:bg-accent/50 transition-colors text-muted-foreground"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={cn(
          "w-4 h-4",
          sortField === field ? "text-primary" : "text-muted-foreground/50"
        )} />
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Positions</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>

      <AddPositionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        existingSymbols={existingSymbols}
        onAddPosition={handleAddPosition}
      />

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <SortableHeader field="symbol">Symbol</SortableHeader>
              <SortableHeader field="price">Price</SortableHeader>
              <SortableHeader field="change">Change</SortableHeader>
              <SortableHeader field="shares">Shares</SortableHeader>
              <SortableHeader field="buyPrice">Buy Price</SortableHeader>
              <SortableHeader field="profit">Profit</SortableHeader>
              <SortableHeader field="dcaAmount">DCA</SortableHeader>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPositions.map((position) => (
              <PositionRow key={position.id} position={position} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function PositionRow({ position }: { position: Position }) {
  const navigate = useNavigate();
  const { profit, profitPercent } = calculateProfit(position);
  const isPositive = profit >= 0;
  const hasDcaAlert = position.dcaThreshold !== undefined;

  const handleRowClick = () => {
    navigate(`/positions/${position.symbol.toLowerCase()}`);
  };

  return (
    <TableRow 
      className="border-border hover:bg-accent/30 transition-colors cursor-pointer"
      onClick={handleRowClick}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <span className={cn(
            "w-2 h-2 rounded-full",
            isPositive ? "bg-primary" : "bg-destructive"
          )} />
          <span className="font-medium text-foreground">{position.symbol}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className={cn(
          position.change >= 0 ? "text-primary" : "text-foreground"
        )}>
          {position.price.toFixed(2)}
        </span>
        <span className="text-muted-foreground text-xs ml-1">USD</span>
      </TableCell>
      <TableCell>
        <span className={cn(
          "font-mono",
          position.change >= 0 ? "text-primary" : "text-destructive"
        )}>
          {position.change >= 0 ? '+' : ''}{position.change.toFixed(2)}
        </span>
      </TableCell>
      <TableCell className="text-foreground">{position.shares.toFixed(2)}</TableCell>
      <TableCell>
        <span className="text-foreground">{position.buyPrice.toFixed(2)}</span>
        <span className="text-muted-foreground text-xs ml-1">USD</span>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className={cn(
            "font-semibold",
            isPositive ? "text-primary" : "text-destructive"
          )}>
            {isPositive ? '$' : '-$'}{Math.abs(profit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className={cn(
            "text-xs",
            isPositive ? "text-primary/80" : "text-destructive/80"
          )}>
            ({isPositive ? '+' : ''}{profitPercent.toFixed(2)}%)
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="text-foreground">{position.dcaAmount.toFixed(2)}</span>
          <span className="text-muted-foreground text-xs">USD</span>
          {hasDcaAlert && (
            <Badge variant="outline" className="text-xs border-primary/50 text-primary">
              Alert
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
