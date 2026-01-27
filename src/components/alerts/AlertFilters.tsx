import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlertStatus } from '@/data/mockAlerts';

export type AlertFilter = 'all' | AlertStatus;

interface AlertFiltersProps {
  activeFilter: AlertFilter;
  onFilterChange: (filter: AlertFilter) => void;
  counts: {
    all: number;
    active: number;
    triggered: number;
    disabled: number;
  };
}

export function AlertFilters({ activeFilter, onFilterChange, counts }: AlertFiltersProps) {
  const filters: { value: AlertFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'triggered', label: 'Triggered' },
    { value: 'disabled', label: 'Disabled' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const count = counts[filter.value];
        return (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              'gap-2',
              activeFilter === filter.value && 'bg-primary text-primary-foreground'
            )}
          >
            {filter.label}
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-full text-xs min-w-[20px]',
                activeFilter === filter.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {count}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
