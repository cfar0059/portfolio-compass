import { User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Overview',
  '/positions': 'Positions',
  '/benchmarks': 'Benchmarks',
  '/alerts': 'Alerts',
  '/profile': 'Profile',
};

export function Header() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-sm font-medium text-foreground">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
