import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { AlertCard } from '@/components/alerts/AlertCard';
import { AlertFilters, AlertFilter } from '@/components/alerts/AlertFilters';
import { AlertsEmptyState } from '@/components/alerts/AlertsEmptyState';
import { AlertHistory } from '@/components/alerts/AlertHistory';
import { CreateAlertDialog } from '@/components/alerts/CreateAlertDialog';
import { mockAlerts, mockAlertHistory, PriceAlert } from '@/data/mockAlerts';
import { toast } from 'sonner';

const Alerts = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>(mockAlerts);
  const [activeFilter, setActiveFilter] = useState<AlertFilter>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<PriceAlert | undefined>();

  // Filter counts
  const counts = useMemo(
    () => ({
      all: alerts.length,
      active: alerts.filter((a) => a.status === 'active').length,
      triggered: alerts.filter((a) => a.status === 'triggered').length,
      disabled: alerts.filter((a) => a.status === 'disabled').length,
    }),
    [alerts]
  );

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    if (activeFilter === 'all') return alerts;
    return alerts.filter((a) => a.status === activeFilter);
  }, [alerts, activeFilter]);

  const handleEdit = (alert: PriceAlert) => {
    setEditingAlert(alert);
    setDialogOpen(true);
  };

  const handleToggle = (alert: PriceAlert) => {
    const newStatus = alert.status === 'active' ? 'disabled' : 'active';
    setAlerts((prev) =>
      prev.map((a) => (a.id === alert.id ? { ...a, status: newStatus } : a))
    );
    toast.success(
      newStatus === 'active'
        ? `Alert for ${alert.symbol} enabled`
        : `Alert for ${alert.symbol} disabled`
    );
  };

  const handleDelete = (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId);
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    toast.success(`Alert for ${alert?.symbol} deleted`);
  };

  const handleSave = (alertData: Partial<PriceAlert>) => {
    if (alertData.id) {
      // Editing existing alert
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertData.id ? { ...a, ...alertData } : a))
      );
      toast.success(`Alert for ${alertData.symbol} updated`);
    } else {
      // Creating new alert
      const newAlert: PriceAlert = {
        id: crypto.randomUUID(),
        symbol: alertData.symbol || '',
        companyName: alertData.companyName || '',
        targetPrice: alertData.targetPrice || 0,
        currentPrice: alertData.currentPrice || 0,
        threshold: alertData.threshold || 2,
        status: 'active',
        createdAt: new Date(),
        triggerCount: 0,
      };
      setAlerts((prev) => [newAlert, ...prev]);
      toast.success(`Alert for ${alertData.symbol} created`);
    }
    setEditingAlert(undefined);
  };

  const handleCreateNew = () => {
    setEditingAlert(undefined);
    setDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Price Alerts</h1>
            <p className="text-muted-foreground">
              Get notified when stocks reach your target prices
            </p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Create Alert
          </Button>
        </div>

        {alerts.length > 0 ? (
          <>
            {/* Filters */}
            <AlertFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />

            {/* Alerts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onEdit={handleEdit}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No {activeFilter} alerts found
                </p>
              </div>
            )}

            {/* Alert History */}
            <AlertHistory entries={mockAlertHistory} />
          </>
        ) : (
          <AlertsEmptyState onCreateAlert={handleCreateNew} />
        )}

        {/* Create/Edit Dialog */}
        <CreateAlertDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditingAlert(undefined);
          }}
          editingAlert={editingAlert}
          onSave={handleSave}
        />
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
