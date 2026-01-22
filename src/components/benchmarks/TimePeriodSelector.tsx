import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type TimePeriod = 'since-start' | '1m' | '3m' | '6m' | 'ytd' | '1y' | 'all';

interface TimePeriodOption {
  value: TimePeriod;
  label: string;
  description: string;
}

const timePeriodOptions: TimePeriodOption[] = [
  { value: 'since-start', label: 'Since Start', description: 'From when you created your portfolio' },
  { value: '1m', label: '1M', description: 'Last 30 days' },
  { value: '3m', label: '3M', description: 'Last 3 months' },
  { value: '6m', label: '6M', description: 'Last 6 months' },
  { value: 'ytd', label: 'YTD', description: 'Year to date' },
  { value: '1y', label: '1Y', description: 'Last 12 months' },
  { value: 'all', label: 'All Time', description: 'Complete history' },
];

interface TimePeriodSelectorProps {
  value: TimePeriod;
  onValueChange: (value: TimePeriod) => void;
}

export function TimePeriodSelector({ value, onValueChange }: TimePeriodSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[160px] bg-card border-border">
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {timePeriodOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
