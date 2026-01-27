// Alert data types and mock data for DCA alert system

export type AlertStatus = 'active' | 'triggered' | 'disabled';

export interface PriceAlert {
  id: string;
  symbol: string;
  companyName: string;
  targetPrice: number;
  currentPrice: number;
  threshold: number; // percentage
  status: AlertStatus;
  createdAt: Date;
  lastTriggeredAt?: Date;
  triggerCount: number;
  cooldownEndsAt?: Date;
}

export interface AlertHistoryEntry {
  id: string;
  alertId: string;
  symbol: string;
  triggeredAt: Date;
  priceAtTrigger: number;
  targetPrice: number;
  distancePercent: number;
  notificationSent: boolean;
  notificationEmail?: string;
}

export interface NotificationPreferences {
  emailEnabled: boolean;
  email: string;
  maxAlertsPerDay: number;
  cooldownHours: number;
}

// Calculate alert range based on target price and threshold
export function calculateAlertRange(targetPrice: number, threshold: number): { min: number; max: number } {
  const range = targetPrice * (threshold / 100);
  return {
    min: targetPrice - range,
    max: targetPrice + range,
  };
}

// Calculate distance percentage between current price and target
export function calculateDistancePercent(currentPrice: number, targetPrice: number): number {
  return ((currentPrice - targetPrice) / targetPrice) * 100;
}

// Get distance status based on percentage
export function getDistanceStatus(distancePercent: number): 'in-range' | 'near' | 'out-of-range' {
  const absDistance = Math.abs(distancePercent);
  if (absDistance <= 2) return 'in-range';
  if (absDistance <= 5) return 'near';
  return 'out-of-range';
}

// Mock alerts data
export const mockAlerts: PriceAlert[] = [
  {
    id: '1',
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices',
    targetPrice: 200.00,
    currentPrice: 214.44,
    threshold: 2,
    status: 'active',
    createdAt: new Date('2025-01-10'),
    triggerCount: 2,
    lastTriggeredAt: new Date('2025-01-20'),
  },
  {
    id: '2',
    symbol: 'GOOG',
    companyName: 'Alphabet Inc.',
    targetPrice: 300.00,
    currentPrice: 314.15,
    threshold: 5,
    status: 'active',
    createdAt: new Date('2025-01-05'),
    triggerCount: 1,
    lastTriggeredAt: new Date('2025-01-18'),
  },
  {
    id: '3',
    symbol: 'META',
    companyName: 'Meta Platforms, Inc.',
    targetPrice: 600.00,
    currentPrice: 656.78,
    threshold: 2,
    status: 'triggered',
    createdAt: new Date('2025-01-02'),
    triggerCount: 5,
    lastTriggeredAt: new Date('2025-01-27'),
    cooldownEndsAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
  },
  {
    id: '4',
    symbol: 'DIS',
    companyName: 'The Walt Disney Company',
    targetPrice: 120.00,
    currentPrice: 114.20,
    threshold: 5,
    status: 'disabled',
    createdAt: new Date('2024-12-15'),
    triggerCount: 3,
  },
];

// Mock alert history
export const mockAlertHistory: AlertHistoryEntry[] = [
  {
    id: 'h1',
    alertId: '3',
    symbol: 'META',
    triggeredAt: new Date('2025-01-27T14:30:00'),
    priceAtTrigger: 605.50,
    targetPrice: 600.00,
    distancePercent: 0.92,
    notificationSent: true,
    notificationEmail: 'user@example.com',
  },
  {
    id: 'h2',
    alertId: '1',
    symbol: 'AMD',
    triggeredAt: new Date('2025-01-20T10:15:00'),
    priceAtTrigger: 203.50,
    targetPrice: 200.00,
    distancePercent: 1.75,
    notificationSent: true,
    notificationEmail: 'user@example.com',
  },
  {
    id: 'h3',
    alertId: '2',
    symbol: 'GOOG',
    triggeredAt: new Date('2025-01-18T09:45:00'),
    priceAtTrigger: 298.00,
    targetPrice: 300.00,
    distancePercent: -0.67,
    notificationSent: true,
    notificationEmail: 'user@example.com',
  },
  {
    id: 'h4',
    alertId: '3',
    symbol: 'META',
    triggeredAt: new Date('2025-01-15T16:20:00'),
    priceAtTrigger: 612.00,
    targetPrice: 600.00,
    distancePercent: 2.0,
    notificationSent: true,
    notificationEmail: 'user@example.com',
  },
  {
    id: 'h5',
    alertId: '4',
    symbol: 'DIS',
    triggeredAt: new Date('2025-01-10T11:00:00'),
    priceAtTrigger: 118.50,
    targetPrice: 120.00,
    distancePercent: -1.25,
    notificationSent: true,
    notificationEmail: 'user@example.com',
  },
];

// Mock notification preferences
export const mockNotificationPreferences: NotificationPreferences = {
  emailEnabled: true,
  email: 'user@example.com',
  maxAlertsPerDay: 10,
  cooldownHours: 24,
};

// Get alert for a specific symbol
export function getAlertForSymbol(symbol: string): PriceAlert | undefined {
  return mockAlerts.find(alert => alert.symbol === symbol);
}

// Get alert history for a specific symbol
export function getAlertHistoryForSymbol(symbol: string): AlertHistoryEntry[] {
  return mockAlertHistory.filter(entry => entry.symbol === symbol);
}

// Threshold options
export const thresholdOptions = [
  { value: 0.5, label: '0.5%' },
  { value: 1, label: '1%' },
  { value: 2, label: '2%' },
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
];

// Cooldown options (in hours)
export const cooldownOptions = [
  { value: 1, label: '1 hour' },
  { value: 6, label: '6 hours' },
  { value: 12, label: '12 hours' },
  { value: 24, label: '24 hours' },
  { value: 48, label: '48 hours' },
];
