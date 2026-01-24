export interface Purchase {
  id: string;
  positionId: string;
  symbol: string;
  date: Date;
  shares: number;
  pricePerShare: number;
}

export interface PositionDetails {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangePercent: number;
}

export const mockPositionDetails: Record<string, PositionDetails> = {
  'AMD': {
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices, Inc.',
    currentPrice: 214.44,
    dailyChange: -1.18,
    dailyChangePercent: -0.55,
  },
  'GOOG': {
    symbol: 'GOOG',
    companyName: 'Alphabet Inc.',
    currentPrice: 314.15,
    dailyChange: -2.57,
    dailyChangePercent: -0.81,
  },
  'SHLD': {
    symbol: 'SHLD',
    companyName: 'Sears Holdings Corp.',
    currentPrice: 65.68,
    dailyChange: -0.20,
    dailyChangePercent: -0.31,
  },
  'QTUM': {
    symbol: 'QTUM',
    companyName: 'Defiance Quantum ETF',
    currentPrice: 110.08,
    dailyChange: -1.60,
    dailyChangePercent: -1.43,
  },
  'NU': {
    symbol: 'NU',
    companyName: 'Nu Holdings Ltd.',
    currentPrice: 16.59,
    dailyChange: -0.03,
    dailyChangePercent: -0.17,
  },
  'NBIS': {
    symbol: 'NBIS',
    companyName: 'Nebius Group N.V.',
    currentPrice: 86.16,
    dailyChange: -1.25,
    dailyChangePercent: -1.43,
  },
  'META': {
    symbol: 'META',
    companyName: 'Meta Platforms, Inc.',
    currentPrice: 656.78,
    dailyChange: -43.12,
    dailyChangePercent: -6.51,
  },
  'UBER': {
    symbol: 'UBER',
    companyName: 'Uber Technologies, Inc.',
    currentPrice: 81.28,
    dailyChange: 0.02,
    dailyChangePercent: 0.02,
  },
  'DIS': {
    symbol: 'DIS',
    companyName: 'The Walt Disney Company',
    currentPrice: 114.20,
    dailyChange: 0.73,
    dailyChangePercent: 0.64,
  },
};

export const mockPurchases: Purchase[] = [
  // AMD purchases
  { id: 'p1', positionId: '1', symbol: 'AMD', date: new Date('2024-03-15'), shares: 20, pricePerShare: 120.50 },
  { id: 'p2', positionId: '1', symbol: 'AMD', date: new Date('2024-06-22'), shares: 15, pricePerShare: 135.00 },
  { id: 'p3', positionId: '1', symbol: 'AMD', date: new Date('2024-09-10'), shares: 10, pricePerShare: 142.80 },
  { id: 'p4', positionId: '1', symbol: 'AMD', date: new Date('2024-12-05'), shares: 19.16, pricePerShare: 128.50 },
  
  // GOOG purchases
  { id: 'p5', positionId: '2', symbol: 'GOOG', date: new Date('2024-01-10'), shares: 10, pricePerShare: 150.00 },
  { id: 'p6', positionId: '2', symbol: 'GOOG', date: new Date('2024-05-18'), shares: 8, pricePerShare: 168.50 },
  { id: 'p7', positionId: '2', symbol: 'GOOG', date: new Date('2024-10-25'), shares: 7.52, pricePerShare: 175.00 },
  
  // META purchases
  { id: 'p8', positionId: '7', symbol: 'META', date: new Date('2024-02-14'), shares: 5, pricePerShare: 580.00 },
  { id: 'p9', positionId: '7', symbol: 'META', date: new Date('2024-07-30'), shares: 3.5, pricePerShare: 650.00 },
  { id: 'p10', positionId: '7', symbol: 'META', date: new Date('2024-11-15'), shares: 2.7, pricePerShare: 715.00 },
  
  // DIS purchases
  { id: 'p11', positionId: '9', symbol: 'DIS', date: new Date('2023-08-20'), shares: 15, pricePerShare: 165.00 },
  { id: 'p12', positionId: '9', symbol: 'DIS', date: new Date('2024-01-05'), shares: 10, pricePerShare: 142.00 },
  { id: 'p13', positionId: '9', symbol: 'DIS', date: new Date('2024-06-12'), shares: 15, pricePerShare: 138.50 },
  
  // UBER purchases
  { id: 'p14', positionId: '8', symbol: 'UBER', date: new Date('2024-04-08'), shares: 25, pricePerShare: 78.50 },
  { id: 'p15', positionId: '8', symbol: 'UBER', date: new Date('2024-08-20'), shares: 20, pricePerShare: 85.00 },
  { id: 'p16', positionId: '8', symbol: 'UBER', date: new Date('2024-12-01'), shares: 18.67, pricePerShare: 88.00 },
];

export function getPurchasesForSymbol(symbol: string): Purchase[] {
  return mockPurchases
    .filter(p => p.symbol.toUpperCase() === symbol.toUpperCase())
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function calculatePositionSummary(purchases: Purchase[], currentPrice: number) {
  const totalShares = purchases.reduce((sum, p) => sum + p.shares, 0);
  const totalInvested = purchases.reduce((sum, p) => sum + (p.shares * p.pricePerShare), 0);
  const avgCostBasis = totalShares > 0 ? totalInvested / totalShares : 0;
  const currentValue = totalShares * currentPrice;
  const totalPL = currentValue - totalInvested;
  const totalPLPercent = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0;

  return {
    totalShares,
    avgCostBasis,
    totalInvested,
    currentValue,
    totalPL,
    totalPLPercent,
  };
}

export function calculatePurchasePL(purchase: Purchase, currentPrice: number) {
  const totalCost = purchase.shares * purchase.pricePerShare;
  const currentValue = purchase.shares * currentPrice;
  const pl = currentValue - totalCost;
  const plPercent = ((currentPrice - purchase.pricePerShare) / purchase.pricePerShare) * 100;

  return { totalCost, currentValue, pl, plPercent };
}
