import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockChartData } from '@/data/mockPositions';
import { cn } from '@/lib/utils';

const timeRanges = ['1M', '3M', 'YTD'] as const;
type TimeRange = typeof timeRanges[number];

export function BenchmarkChart() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1M');

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Portfolio vs S&P 500
        </CardTitle>
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRange(range)}
              className={cn(
                "h-7 px-3 text-xs",
                selectedRange === range
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(220, 18%, 14%)',
                  border: '1px solid hsl(220, 14%, 20%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 98%)',
                }}
                labelStyle={{ color: 'hsl(215, 20%, 55%)' }}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === 'portfolio' ? 'Portfolio' : 'S&P 500'
                ]}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: 'hsl(215, 20%, 55%)', fontSize: 12 }}>
                    {value === 'portfolio' ? 'Portfolio' : 'S&P 500'}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="hsl(142, 76%, 36%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(142, 76%, 36%)' }}
              />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke="hsl(199, 89%, 48%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(199, 89%, 48%)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
