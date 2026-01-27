import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bell, Mail, MessageSquare, Smartphone, Send, Shield } from 'lucide-react';
import { mockNotificationPreferences, cooldownOptions } from '@/data/mockAlerts';
import { toast } from 'sonner';

const NotificationPreferences = () => {
  const [maxAlertsPerDay, setMaxAlertsPerDay] = useState(
    mockNotificationPreferences.maxAlertsPerDay
  );
  const [cooldownHours, setCooldownHours] = useState(
    mockNotificationPreferences.cooldownHours
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Notification preferences saved');
    setIsSaving(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notification Preferences</h1>
          <p className="text-muted-foreground">
            Configure how and when you receive alerts
          </p>
        </div>

        {/* Email Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Email Notifications</CardTitle>
            </div>
            <CardDescription>
              Email is the primary notification channel for all alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Required for receiving price alerts
                </p>
              </div>
              <Switch
                id="email-enabled"
                checked
                disabled
                className="data-[state=checked]:bg-success"
              />
            </div>
            <div className="rounded-lg bg-muted/50 p-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Email notifications ensure you never miss an important alert
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Spam Prevention */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Alert Limits</CardTitle>
            </div>
            <CardDescription>
              Prevent notification overload with smart limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Max Alerts Per Day */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Maximum Alerts Per Day</Label>
                <span className="text-sm font-medium text-primary">
                  {maxAlertsPerDay} alerts/day
                </span>
              </div>
              <Slider
                value={[maxAlertsPerDay]}
                onValueChange={([value]) => setMaxAlertsPerDay(value)}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Limit the total number of alerts you receive each day
              </p>
            </div>

            <Separator />

            {/* Cooldown Period */}
            <div className="space-y-2">
              <Label htmlFor="cooldown">Cooldown Period</Label>
              <Select
                value={cooldownHours.toString()}
                onValueChange={(value) => setCooldownHours(parseInt(value))}
              >
                <SelectTrigger id="cooldown" className="bg-accent border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cooldownOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Minimum time between repeated alerts for the same position
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Section */}
        <Card className="bg-card border-border opacity-75">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              More Notification Channels
              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
            </CardTitle>
            <CardDescription>
              Additional ways to receive your price alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Push Notifications */}
            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Browser notifications</p>
                </div>
              </div>
              <Switch disabled />
            </div>

            {/* SMS */}
            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">SMS Alerts</Label>
                  <p className="text-xs text-muted-foreground">Text message notifications</p>
                </div>
              </div>
              <Switch disabled />
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">WhatsApp</Label>
                  <p className="text-xs text-muted-foreground">WhatsApp messages</p>
                </div>
              </div>
              <Switch disabled />
            </div>

            {/* Telegram */}
            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Send className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Telegram</Label>
                  <p className="text-xs text-muted-foreground">Telegram bot messages</p>
                </div>
              </div>
              <Switch disabled />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NotificationPreferences;
