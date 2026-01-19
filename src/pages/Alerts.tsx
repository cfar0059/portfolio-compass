import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DcaAlertCard } from '@/components/dashboard/DcaAlertCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Settings } from 'lucide-react';

const Alerts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">DCA Alerts</h1>
          <p className="text-muted-foreground">Manage your dollar-cost averaging alerts</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email for Alerts</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-accent border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold">Default DCA Threshold (%)</Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="10"
                  className="bg-accent border-border"
                />
              </div>
            </div>
            <Button>
              <Bell className="w-4 h-4 mr-2" />
              Save Alert Settings
            </Button>
          </CardContent>
        </Card>

        <DcaAlertCard />
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
