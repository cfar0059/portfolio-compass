export interface StockSearchResult {
  symbol: string;
  companyName: string;
  currentPrice: number;
}

export interface MovingAverage {
  period: string;
  level: number;
  isAbove: boolean;
  distancePercent: number;
}

export interface SupportResistance {
  support: { level: string; price: number }[];
  resistance: { level: string; price: number }[];
}

export interface RSIIndicator {
  value: number;
  status: 'oversold' | 'neutral' | 'overbought';
}

export interface AnalystRating {
  rating: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG SELL';
  totalAnalysts: number;
  distribution: {
    strongBuy: number;
    buy: number;
    hold: number;
    sell: number;
    strongSell: number;
  };
}

export interface PriceTargets {
  low: number;
  mean: number;
  high: number;
  currentPrice: number;
  impliedUpside: number;
}

export interface StockAnalysis {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  lastUpdated: Date;
  movingAverages: MovingAverage[];
  supportResistance: SupportResistance;
  rsi: RSIIndicator;
  analystRating: AnalystRating;
  priceTargets: PriceTargets;
}

export const mockStockSearchResults: StockSearchResult[] = [
  { symbol: 'UBER', companyName: 'Uber Technologies Inc.', currentPrice: 74.23 },
  { symbol: 'AAPL', companyName: 'Apple Inc.', currentPrice: 178.72 },
  { symbol: 'MSFT', companyName: 'Microsoft Corporation', currentPrice: 378.91 },
  { symbol: 'GOOG', companyName: 'Alphabet Inc.', currentPrice: 141.80 },
  { symbol: 'AMD', companyName: 'Advanced Micro Devices Inc.', currentPrice: 124.56 },
  { symbol: 'NVDA', companyName: 'NVIDIA Corporation', currentPrice: 875.28 },
  { symbol: 'TSLA', companyName: 'Tesla Inc.', currentPrice: 248.50 },
  { symbol: 'AMZN', companyName: 'Amazon.com Inc.', currentPrice: 178.25 },
];

export const mockStockAnalysis: Record<string, StockAnalysis> = {
  UBER: {
    symbol: 'UBER',
    companyName: 'Uber Technologies Inc.',
    currentPrice: 74.23,
    dailyChange: 2.45,
    dailyChangePercent: 3.41,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 88.67, isAbove: false, distancePercent: -16.2 },
      { period: '20-Day', level: 89.25, isAbove: false, distancePercent: -16.8 },
      { period: '50-Day', level: 93.16, isAbove: false, distancePercent: -20.3 },
      { period: '100-Day', level: 93.03, isAbove: false, distancePercent: -20.2 },
      { period: '200-Day', level: 87.19, isAbove: false, distancePercent: -14.8 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 72.50 },
        { level: 'S2', price: 68.20 },
        { level: 'S3', price: 64.00 },
      ],
      resistance: [
        { level: 'R1', price: 78.00 },
        { level: 'R2', price: 82.50 },
        { level: 'R3', price: 87.00 },
      ],
    },
    rsi: { value: 42.5, status: 'neutral' },
    analystRating: {
      rating: 'STRONG BUY',
      totalAnalysts: 30,
      distribution: { strongBuy: 24, buy: 4, hold: 2, sell: 0, strongSell: 0 },
    },
    priceTargets: {
      low: 73,
      mean: 108,
      high: 150,
      currentPrice: 74.23,
      impliedUpside: 45.6,
    },
  },
  AAPL: {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    currentPrice: 178.72,
    dailyChange: -2.18,
    dailyChangePercent: -1.21,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 176.50, isAbove: true, distancePercent: 1.26 },
      { period: '20-Day', level: 174.20, isAbove: true, distancePercent: 2.59 },
      { period: '50-Day', level: 171.80, isAbove: true, distancePercent: 4.03 },
      { period: '100-Day', level: 168.45, isAbove: true, distancePercent: 6.10 },
      { period: '200-Day', level: 165.30, isAbove: true, distancePercent: 8.12 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 175.00 },
        { level: 'S2', price: 170.50 },
        { level: 'S3', price: 165.00 },
      ],
      resistance: [
        { level: 'R1', price: 182.00 },
        { level: 'R2', price: 188.50 },
        { level: 'R3', price: 195.00 },
      ],
    },
    rsi: { value: 58.2, status: 'neutral' },
    analystRating: {
      rating: 'BUY',
      totalAnalysts: 45,
      distribution: { strongBuy: 18, buy: 15, hold: 10, sell: 2, strongSell: 0 },
    },
    priceTargets: {
      low: 160,
      mean: 200,
      high: 250,
      currentPrice: 178.72,
      impliedUpside: 11.9,
    },
  },
  MSFT: {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    currentPrice: 378.91,
    dailyChange: 5.23,
    dailyChangePercent: 1.40,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 372.40, isAbove: true, distancePercent: 1.75 },
      { period: '20-Day', level: 368.50, isAbove: true, distancePercent: 2.83 },
      { period: '50-Day', level: 360.20, isAbove: true, distancePercent: 5.20 },
      { period: '100-Day', level: 352.80, isAbove: true, distancePercent: 7.40 },
      { period: '200-Day', level: 340.15, isAbove: true, distancePercent: 11.39 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 370.00 },
        { level: 'S2', price: 360.00 },
        { level: 'S3', price: 345.00 },
      ],
      resistance: [
        { level: 'R1', price: 385.00 },
        { level: 'R2', price: 400.00 },
        { level: 'R3', price: 420.00 },
      ],
    },
    rsi: { value: 62.8, status: 'neutral' },
    analystRating: {
      rating: 'STRONG BUY',
      totalAnalysts: 52,
      distribution: { strongBuy: 35, buy: 12, hold: 5, sell: 0, strongSell: 0 },
    },
    priceTargets: {
      low: 350,
      mean: 425,
      high: 500,
      currentPrice: 378.91,
      impliedUpside: 12.2,
    },
  },
  GOOG: {
    symbol: 'GOOG',
    companyName: 'Alphabet Inc.',
    currentPrice: 141.80,
    dailyChange: 1.92,
    dailyChangePercent: 1.37,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 139.50, isAbove: true, distancePercent: 1.65 },
      { period: '20-Day', level: 137.20, isAbove: true, distancePercent: 3.35 },
      { period: '50-Day', level: 135.80, isAbove: true, distancePercent: 4.42 },
      { period: '100-Day', level: 132.40, isAbove: true, distancePercent: 7.10 },
      { period: '200-Day', level: 128.90, isAbove: true, distancePercent: 10.01 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 138.00 },
        { level: 'S2', price: 132.50 },
        { level: 'S3', price: 125.00 },
      ],
      resistance: [
        { level: 'R1', price: 148.00 },
        { level: 'R2', price: 155.00 },
        { level: 'R3', price: 165.00 },
      ],
    },
    rsi: { value: 55.4, status: 'neutral' },
    analystRating: {
      rating: 'BUY',
      totalAnalysts: 48,
      distribution: { strongBuy: 20, buy: 18, hold: 8, sell: 2, strongSell: 0 },
    },
    priceTargets: {
      low: 130,
      mean: 170,
      high: 200,
      currentPrice: 141.80,
      impliedUpside: 19.9,
    },
  },
  AMD: {
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices Inc.',
    currentPrice: 124.56,
    dailyChange: -6.82,
    dailyChangePercent: -5.19,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 128.40, isAbove: false, distancePercent: -2.99 },
      { period: '20-Day', level: 135.20, isAbove: false, distancePercent: -7.87 },
      { period: '50-Day', level: 142.80, isAbove: false, distancePercent: -12.78 },
      { period: '100-Day', level: 148.50, isAbove: false, distancePercent: -16.12 },
      { period: '200-Day', level: 138.20, isAbove: false, distancePercent: -9.87 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 120.00 },
        { level: 'S2', price: 112.50 },
        { level: 'S3', price: 105.00 },
      ],
      resistance: [
        { level: 'R1', price: 132.00 },
        { level: 'R2', price: 142.00 },
        { level: 'R3', price: 155.00 },
      ],
    },
    rsi: { value: 28.5, status: 'oversold' },
    analystRating: {
      rating: 'HOLD',
      totalAnalysts: 38,
      distribution: { strongBuy: 8, buy: 10, hold: 15, sell: 4, strongSell: 1 },
    },
    priceTargets: {
      low: 100,
      mean: 160,
      high: 220,
      currentPrice: 124.56,
      impliedUpside: 28.5,
    },
  },
  NVDA: {
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    currentPrice: 875.28,
    dailyChange: 28.45,
    dailyChangePercent: 3.36,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 852.30, isAbove: true, distancePercent: 2.70 },
      { period: '20-Day', level: 820.50, isAbove: true, distancePercent: 6.67 },
      { period: '50-Day', level: 780.40, isAbove: true, distancePercent: 12.16 },
      { period: '100-Day', level: 720.80, isAbove: true, distancePercent: 21.42 },
      { period: '200-Day', level: 580.20, isAbove: true, distancePercent: 50.86 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 850.00 },
        { level: 'S2', price: 800.00 },
        { level: 'S3', price: 750.00 },
      ],
      resistance: [
        { level: 'R1', price: 920.00 },
        { level: 'R2', price: 980.00 },
        { level: 'R3', price: 1050.00 },
      ],
    },
    rsi: { value: 72.8, status: 'overbought' },
    analystRating: {
      rating: 'STRONG BUY',
      totalAnalysts: 55,
      distribution: { strongBuy: 42, buy: 10, hold: 3, sell: 0, strongSell: 0 },
    },
    priceTargets: {
      low: 700,
      mean: 1000,
      high: 1400,
      currentPrice: 875.28,
      impliedUpside: 14.2,
    },
  },
  TSLA: {
    symbol: 'TSLA',
    companyName: 'Tesla Inc.',
    currentPrice: 248.50,
    dailyChange: -8.30,
    dailyChangePercent: -3.23,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 255.40, isAbove: false, distancePercent: -2.70 },
      { period: '20-Day', level: 262.80, isAbove: false, distancePercent: -5.44 },
      { period: '50-Day', level: 245.20, isAbove: true, distancePercent: 1.35 },
      { period: '100-Day', level: 238.90, isAbove: true, distancePercent: 4.02 },
      { period: '200-Day', level: 225.60, isAbove: true, distancePercent: 10.15 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 240.00 },
        { level: 'S2', price: 225.00 },
        { level: 'S3', price: 200.00 },
      ],
      resistance: [
        { level: 'R1', price: 265.00 },
        { level: 'R2', price: 285.00 },
        { level: 'R3', price: 310.00 },
      ],
    },
    rsi: { value: 45.2, status: 'neutral' },
    analystRating: {
      rating: 'HOLD',
      totalAnalysts: 42,
      distribution: { strongBuy: 10, buy: 8, hold: 16, sell: 6, strongSell: 2 },
    },
    priceTargets: {
      low: 150,
      mean: 280,
      high: 400,
      currentPrice: 248.50,
      impliedUpside: 12.7,
    },
  },
  AMZN: {
    symbol: 'AMZN',
    companyName: 'Amazon.com Inc.',
    currentPrice: 178.25,
    dailyChange: 3.15,
    dailyChangePercent: 1.80,
    lastUpdated: new Date(),
    movingAverages: [
      { period: '5-Day', level: 174.80, isAbove: true, distancePercent: 1.97 },
      { period: '20-Day', level: 170.50, isAbove: true, distancePercent: 4.54 },
      { period: '50-Day', level: 165.20, isAbove: true, distancePercent: 7.90 },
      { period: '100-Day', level: 158.40, isAbove: true, distancePercent: 12.53 },
      { period: '200-Day', level: 148.90, isAbove: true, distancePercent: 19.71 },
    ],
    supportResistance: {
      support: [
        { level: 'S1', price: 172.00 },
        { level: 'S2', price: 165.00 },
        { level: 'S3', price: 155.00 },
      ],
      resistance: [
        { level: 'R1', price: 185.00 },
        { level: 'R2', price: 195.00 },
        { level: 'R3', price: 210.00 },
      ],
    },
    rsi: { value: 61.5, status: 'neutral' },
    analystRating: {
      rating: 'STRONG BUY',
      totalAnalysts: 50,
      distribution: { strongBuy: 32, buy: 14, hold: 4, sell: 0, strongSell: 0 },
    },
    priceTargets: {
      low: 160,
      mean: 210,
      high: 260,
      currentPrice: 178.25,
      impliedUpside: 17.8,
    },
  },
};

export function getStockAnalysis(symbol: string): StockAnalysis | null {
  return mockStockAnalysis[symbol.toUpperCase()] || null;
}

export function searchStocks(query: string): StockSearchResult[] {
  if (!query.trim()) return [];
  const normalizedQuery = query.toLowerCase();
  return mockStockSearchResults.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(normalizedQuery) ||
      stock.companyName.toLowerCase().includes(normalizedQuery)
  );
}
