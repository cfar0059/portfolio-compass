import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PositionHeader } from '@/components/position-detail/PositionHeader';
import { PositionSummaryCard } from '@/components/position-detail/PositionSummaryCard';
import { PurchaseHistoryTable } from '@/components/position-detail/PurchaseHistoryTable';
import { DangerZone } from '@/components/position-detail/DangerZone';
import { DcaAlertSection } from '@/components/alerts/DcaAlertSection';
import {
  mockPositionDetails,
  getPurchasesForSymbol,
  calculatePositionSummary,
  Purchase,
} from '@/data/mockPurchases';
import { getAlertForSymbol, PriceAlert } from '@/data/mockAlerts';
import { toast } from 'sonner';

export default function PositionDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const upperSymbol = symbol?.toUpperCase() || '';

  // Get position details
  const positionDetails = mockPositionDetails[upperSymbol];

  // State for purchases (would be fetched from API in real app)
  const [purchases, setPurchases] = useState<Purchase[]>(() => 
    getPurchasesForSymbol(upperSymbol)
  );

  // State for alert
  const [alert, setAlert] = useState<PriceAlert | undefined>(() =>
    getAlertForSymbol(upperSymbol)
  );

  // Calculate summary
  const summary = useMemo(() => {
    if (!positionDetails) return null;
    return calculatePositionSummary(purchases, positionDetails.currentPrice);
  }, [purchases, positionDetails]);

  // Handle not found
  if (!positionDetails) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Position Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The symbol "{symbol}" was not found in your portfolio.
          </p>
          <button
            onClick={() => navigate('/positions')}
            className="text-primary hover:underline"
          >
            Return to Positions
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const handleAddPurchase = (data: Omit<Purchase, 'id' | 'positionId' | 'symbol'>) => {
    const newPurchase: Purchase = {
      id: crypto.randomUUID(),
      positionId: upperSymbol,
      symbol: upperSymbol,
      ...data,
    };
    setPurchases((prev) => [newPurchase, ...prev]);
    toast.success('Purchase added successfully');
  };

  const handleEditPurchase = (updatedPurchase: Purchase) => {
    setPurchases((prev) =>
      prev.map((p) => (p.id === updatedPurchase.id ? updatedPurchase : p))
    );
    toast.success('Purchase updated successfully');
  };

  const handleDeletePurchase = (purchaseId: string) => {
    setPurchases((prev) => prev.filter((p) => p.id !== purchaseId));
    toast.success('Purchase deleted');
  };

  const handleDeletePosition = () => {
    // In a real app, this would delete from the database
    // For now, we just navigate away
  };

  const handleAlertCreate = (alertData: Partial<PriceAlert>) => {
    const newAlert: PriceAlert = {
      id: crypto.randomUUID(),
      symbol: upperSymbol,
      companyName: positionDetails.companyName,
      targetPrice: alertData.targetPrice || 0,
      currentPrice: positionDetails.currentPrice,
      threshold: alertData.threshold || 2,
      status: 'active',
      createdAt: new Date(),
      triggerCount: 0,
    };
    setAlert(newAlert);
  };

  const handleAlertUpdate = (updatedAlert: PriceAlert) => {
    setAlert(updatedAlert);
  };

  const handleAlertDelete = () => {
    setAlert(undefined);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PositionHeader position={positionDetails} />

        {summary && <PositionSummaryCard summary={summary} />}

        {/* DCA Alert Section */}
        <DcaAlertSection
          symbol={upperSymbol}
          companyName={positionDetails.companyName}
          currentPrice={positionDetails.currentPrice}
          existingAlert={alert}
          onAlertCreate={handleAlertCreate}
          onAlertUpdate={handleAlertUpdate}
          onAlertDelete={handleAlertDelete}
        />

        <PurchaseHistoryTable
          purchases={purchases}
          currentPrice={positionDetails.currentPrice}
          symbol={upperSymbol}
          onAddPurchase={handleAddPurchase}
          onEditPurchase={handleEditPurchase}
          onDeletePurchase={handleDeletePurchase}
        />

        <DangerZone
          symbol={upperSymbol}
          purchaseCount={purchases.length}
          onDeletePosition={handleDeletePosition}
        />
      </div>
    </DashboardLayout>
  );
}