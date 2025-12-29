import { Flame, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Flame className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">JustDCA</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <NavLink
          to="/"
          end
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          activeClassName="text-foreground"
        >
          Overview
        </NavLink>
        <NavLink
          to="/profile"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          activeClassName="text-foreground"
        >
          Profile
        </NavLink>
      </nav>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
