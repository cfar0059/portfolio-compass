import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockChartData } from '@/data/mockPositions';

interface PerformanceChartProps {
  benchmarkName: string;
  benchmarkKey: string;
}

export function PerformanceChart({ benchmarkName, benchmarkKey }: PerformanceChartProps) {
  return (
    <Card className="bg-card border-border rounded-xl">
      <CardContent className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))',
                }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === 'portfolio' ? 'Your Portfolio' : benchmarkName
                ]}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: 12 }}>
                    {value === 'portfolio' ? 'Your Portfolio' : benchmarkName}
                  </span>
                )}
              />
              {/* Portfolio Line - solid green */}
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
              />
              {/* Benchmark Line - dashed muted */}
              <Line
                type="monotone"
                dataKey="sp500"
                name={benchmarkKey}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(var(--muted-foreground))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-primary" />
            <span>Your Portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 border-t-2 border-dashed border-muted-foreground" />
            <span>{benchmarkName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
