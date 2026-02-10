import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StockSearchInput } from '@/components/analyze/StockSearchInput';
import { StockHeaderCard } from '@/components/analyze/StockHeaderCard';
import { TechnicalAnalysisCard } from '@/components/analyze/TechnicalAnalysisCard';
import { AnalystConsensusCard } from '@/components/analyze/AnalystConsensusCard';
import { FundamentalsTab } from '@/components/analyze/FundamentalsTab';
import { NewsTab } from '@/components/analyze/NewsTab';
import { AnalyzeEmptyState } from '@/components/analyze/AnalyzeEmptyState';
import { AnalyzeLoadingSkeleton } from '@/components/analyze/AnalyzeLoadingSkeleton';
import { getStockAnalysis, StockAnalysis } from '@/data/mockStockAnalysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function Analyze() {
  const [selectedStock, setSelectedStock] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (symbol: string) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const analysis = getStockAnalysis(symbol);
      if (analysis) {
        setSelectedStock(analysis);
        setError(null);
      } else {
        setSelectedStock(null);
        setError(`No data available for ${symbol}. Check back later.`);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleClear = () => {
    setSelectedStock(null);
    setError(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Stock Analysis</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Search for any stock to view fundamentals, technical analysis and analyst consensus
          </p>
        </div>

        {/* Search Input */}
        <StockSearchInput onSelect={handleSelect} onClear={handleClear} />

        {/* Content Area */}
        {isLoading ? (
          <AnalyzeLoadingSkeleton />
        ) : error ? (
          <div className="bg-card border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => handleClear()}
              className="text-primary hover:underline text-sm"
            >
              Try another search
            </button>
          </div>
        ) : selectedStock ? (
          <div className="space-y-6">
            <StockHeaderCard stock={selectedStock} />

            {/* Tab Navigation */}
            <Tabs defaultValue="fundamentals" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
                <TabsTrigger value="technicals">Technicals</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>

              <Card className="bg-card border-border rounded-xl mt-4">
                <CardContent className="p-6">
                  <TabsContent value="fundamentals" className="mt-0">
                    <FundamentalsTab stock={selectedStock} />
                  </TabsContent>
                  <TabsContent value="technicals" className="mt-0">
                    <TechnicalAnalysisCard stock={selectedStock} />
                  </TabsContent>
                  <TabsContent value="news" className="mt-0">
                    <NewsTab news={selectedStock.news} symbol={selectedStock.symbol} />
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>

            {/* Shared Analyst Consensus */}
            <AnalystConsensusCard stock={selectedStock} />
          </div>
        ) : (
          <AnalyzeEmptyState />
        )}
      </div>
    </DashboardLayout>
  );
}
