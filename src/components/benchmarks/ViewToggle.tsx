import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart, LayoutGrid } from 'lucide-react';

export type ViewMode = 'chart' | 'cards';

interface ViewToggleProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onValueChange }: ViewToggleProps) {
  return (
    <div className="flex justify-end">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => val && onValueChange(val as ViewMode)}
        className="bg-muted p-1 rounded-lg"
      >
        <ToggleGroupItem
          value="chart"
          aria-label="Chart view"
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-3 py-1.5 rounded-md text-sm"
        >
          <LineChart className="h-4 w-4 mr-2" />
          Chart
        </ToggleGroupItem>
        <ToggleGroupItem
          value="cards"
          aria-label="Cards view"
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-3 py-1.5 rounded-md text-sm"
        >
          <LayoutGrid className="h-4 w-4 mr-2" />
          Cards
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
