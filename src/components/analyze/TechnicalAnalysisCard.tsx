import { LineChart, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StockAnalysis } from '@/data/mockStockAnalysis';
import { cn } from '@/lib/utils';

interface TechnicalAnalysisCardProps {
  stock: StockAnalysis;
}

export function TechnicalAnalysisCard({ stock }: TechnicalAnalysisCardProps) {
  const getRsiPosition = (value: number) => ((value / 100) * 100);

  return (
    <Card className="bg-card border-border rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
          <LineChart className="w-5 h-5 text-primary" />
          Technical Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Moving Averages */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Moving Averages
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">Period</TableHead>
                  <TableHead className="text-muted-foreground">Level</TableHead>
                  <TableHead className="text-muted-foreground">Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stock.movingAverages.map((ma) => (
                  <TableRow key={ma.period}>
                    <TableCell className="text-sm text-foreground">{ma.period}</TableCell>
                    <TableCell className="font-mono text-foreground">
                      ${ma.level.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div
                        className={cn(
                          'flex items-center gap-1 text-sm',
                          ma.isAbove ? 'text-primary' : 'text-destructive'
                        )}
                      >
                        {ma.isAbove ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        <span>
                          {ma.isAbove ? 'Above' : 'Below'} ({ma.distancePercent > 0 ? '+' : ''}
                          {ma.distancePercent.toFixed(1)}%)
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Support & Resistance */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Support & Resistance
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">Support</TableHead>
                  <TableHead className="text-muted-foreground"></TableHead>
                  <TableHead className="text-muted-foreground">Resistance</TableHead>
                  <TableHead className="text-muted-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stock.supportResistance.support.map((sup, idx) => (
                  <TableRow key={sup.level}>
                    <TableCell className="text-sm text-muted-foreground">{sup.level}</TableCell>
                    <TableCell className="font-mono text-primary">${sup.price.toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {stock.supportResistance.resistance[idx]?.level}
                    </TableCell>
                    <TableCell className="font-mono text-warning">
                      ${stock.supportResistance.resistance[idx]?.price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* RSI Indicator */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">RSI (14-day):</span>
              <span className="text-lg font-bold font-mono text-foreground">
                {stock.rsi.value.toFixed(1)}
              </span>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                {/* Zone colors */}
                <div className="absolute inset-0 flex">
                  <div className="w-[30%] bg-primary/40" />
                  <div className="w-[40%] bg-muted-foreground/30" />
                  <div className="w-[30%] bg-destructive/40" />
                </div>
                {/* Position indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background shadow"
                  style={{ left: `calc(${getRsiPosition(stock.rsi.value)}% - 6px)` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">Oversold</span>
                <span className="text-xs text-muted-foreground">Neutral</span>
                <span className="text-xs text-muted-foreground">Overbought</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
