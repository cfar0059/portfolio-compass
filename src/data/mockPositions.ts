export interface Position {
  id: string;
  symbol: string;
  price: number;
  change: number;
  shares: number;
  buyPrice: number;
  dcaAmount: number;
  dcaThreshold?: number;
}

export const mockPositions: Position[] = [
  { id: '1', symbol: 'AMD', price: 214.44, change: -0.55, shares: 64.16, buyPrice: 130.02, dcaAmount: 200.00 },
  { id: '2', symbol: 'GOOG', price: 314.15, change: -0.81, shares: 25.52, buyPrice: 162.00, dcaAmount: 300.00 },
  { id: '3', symbol: 'SHLD', price: 65.68, change: -0.31, shares: 136.65, buyPrice: 49.25, dcaAmount: 40.00 },
  { id: '4', symbol: 'QTUM', price: 110.08, change: -1.43, shares: 67.09, buyPrice: 79.43, dcaAmount: 68.00 },
  { id: '5', symbol: 'NU', price: 16.59, change: -0.17, shares: 175.41, buyPrice: 13.11, dcaAmount: 14.00 },
  { id: '6', symbol: 'NBIS', price: 86.16, change: -1.43, shares: 40, buyPrice: 78.10, dcaAmount: 70.00 },
  { id: '7', symbol: 'META', price: 656.78, change: -6.51, shares: 11.2, buyPrice: 629.35, dcaAmount: 600.00 },
  { id: '8', symbol: 'UBER', price: 81.28, change: 0.02, shares: 63.67, buyPrice: 83.85, dcaAmount: 80.00, dcaThreshold: 5 },
  { id: '9', symbol: 'DIS', price: 114.20, change: 0.64, shares: 40, buyPrice: 148.00, dcaAmount: 100.00, dcaThreshold: 10 },
];

export const calculateProfit = (position: Position) => {
  const currentValue = position.price * position.shares;
  const costBasis = position.buyPrice * position.shares;
  const profit = currentValue - costBasis;
  const profitPercent = ((position.price - position.buyPrice) / position.buyPrice) * 100;
  return { profit, profitPercent };
};

export const mockChartData = [
  { date: 'Nov 1', portfolio: 45000, sp500: 44500 },
  { date: 'Nov 15', portfolio: 47200, sp500: 45200 },
  { date: 'Dec 1', portfolio: 46800, sp500: 45800 },
  { date: 'Dec 15', portfolio: 49500, sp500: 46500 },
  { date: 'Dec 29', portfolio: 51200, sp500: 47200 },
];

export const mockDcaAlerts = [
  { symbol: 'UBER', threshold: 5, currentDrop: 3.08, suggestedDate: 'Jan 3, 2025' },
  { symbol: 'DIS', threshold: 10, currentDrop: 22.84, suggestedDate: 'Today' },
];
