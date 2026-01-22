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
  return (
    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
      <span className="text-xs text-muted-foreground font-medium">Compare to:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full sm:w-[220px] h-14 bg-card border-border px-4">
          <div className="flex flex-col items-start text-left">
            <span className="font-medium">{benchmarkOptions.find(o => o.value === value)?.label}</span>
            <span className="text-xs text-muted-foreground">{benchmarkOptions.find(o => o.value === value)?.description}</span>
          </div>
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
