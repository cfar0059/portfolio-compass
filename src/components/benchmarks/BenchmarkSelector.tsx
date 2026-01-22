import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type Benchmark = 'sp500' | 'nasdaq' | 'dow';

interface BenchmarkOption {
  value: Benchmark;
  label: string;
  description: string;
}

export const benchmarkOptions: BenchmarkOption[] = [
  { value: 'sp500', label: 'S&P 500', description: '500 largest US companies' },
  { value: 'nasdaq', label: 'NASDAQ', description: 'Tech-heavy index' },
  { value: 'dow', label: 'Dow Jones', description: '30 blue-chip stocks' },
];

interface BenchmarkSelectorProps {
  value: Benchmark;
  onValueChange: (value: Benchmark) => void;
}

export function BenchmarkSelector({ value, onValueChange }: BenchmarkSelectorProps) {
  const selectedOption = benchmarkOptions.find((o) => o.value === value);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Compare to:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[160px] bg-card border-border">
          <SelectValue placeholder="Select benchmark" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {benchmarkOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="cursor-pointer">
              <div className="flex flex-col">
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
