
# Stock Analysis Page Implementation Plan

## Overview
Create a new `/analyze` page where users can search for any stock symbol and view comprehensive technical analysis, analyst consensus data, and price targets. The page will follow JustDCA's existing design patterns with dark theme, card-based layout, and responsive design.

---

## File Structure

```text
src/
├── pages/
│   └── Analyze.tsx                          # Main page component
├── components/
│   └── analyze/
│       ├── StockSearchInput.tsx             # Search input with autocomplete
│       ├── StockHeaderCard.tsx              # Symbol, price, daily change
│       ├── TechnicalAnalysisCard.tsx        # Moving averages + support/resistance
│       ├── AnalystConsensusCard.tsx         # Ratings distribution + price targets
│       ├── AiSentimentCard.tsx              # Coming soon placeholder
│       ├── AnalyzeEmptyState.tsx            # Initial state before search
│       └── AnalyzeLoadingSkeleton.tsx       # Loading skeleton states
└── data/
    └── mockStockAnalysis.ts                 # Types + mock data for analysis
```

---

## Component Specifications

### 1. Mock Data Layer (`src/data/mockStockAnalysis.ts`)

**Types to Define:**
```typescript
interface StockSearchResult {
  symbol: string;
  companyName: string;
  currentPrice: number;
}

interface MovingAverage {
  period: string;           // "5-Day", "20-Day", etc.
  level: number;            // e.g., 88.67
  isAbove: boolean;         // Current price above/below
  distancePercent: number;  // e.g., -16.2
}

interface SupportResistance {
  support: { level: string; price: number }[];   // S1, S2, S3
  resistance: { level: string; price: number }[]; // R1, R2, R3
}

interface RSIIndicator {
  value: number;            // 0-100
  status: 'oversold' | 'neutral' | 'overbought';
}

interface AnalystRating {
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

interface PriceTargets {
  low: number;
  mean: number;
  high: number;
  currentPrice: number;
  impliedUpside: number;    // Percentage
}

interface StockAnalysis {
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
```

**Mock Data:**
- Pre-populate with 5-6 popular stocks (UBER, AAPL, MSFT, GOOG, AMD, NVDA)
- Include realistic moving average levels
- Varied analyst consensus (some bullish, some neutral)

---

### 2. Search Input Component (`src/components/analyze/StockSearchInput.tsx`)

**Visual Specifications:**
- Container: Full width input with `bg-card border-border rounded-lg`
- Height: `h-12` for comfortable touch targets
- Icon: `Search` (lucide) on left, `w-5 h-5 text-muted-foreground`
- Clear button: `X` icon appears when text entered, `w-4 h-4`
- Placeholder: `text-muted-foreground` "Search by symbol or company name..."

**Dropdown Specifications:**
- Position: `absolute top-full left-0 right-0 mt-1`
- Background: `bg-popover border border-border rounded-lg shadow-lg`
- Max height: `max-h-64 overflow-y-auto`
- Item styling:
  - `px-4 py-3 hover:bg-accent cursor-pointer`
  - Symbol: `text-sm font-bold text-foreground`
  - Separator: ` - ` in `text-muted-foreground`
  - Company: `text-sm text-muted-foreground`

**Behavior:**
- Debounce input by 300ms
- Filter mock data as user types
- Close dropdown on selection or click outside
- Clear input shows empty state again

---

### 3. Stock Header Card (`src/components/analyze/StockHeaderCard.tsx`)

**Layout:** Single card with horizontal layout (desktop), stacked (mobile)

**Visual Specifications:**
- Card: `bg-card border-border rounded-xl p-6`
- Symbol: `text-3xl font-bold text-foreground`
- Company name: `text-sm text-muted-foreground mt-1`
- Current price: `text-4xl font-bold font-mono text-foreground`
- Daily change container:
  - Positive: `bg-primary/10 text-primary` with `TrendingUp` icon
  - Negative: `bg-destructive/10 text-destructive` with `TrendingDown` icon
  - Format: `+$2.45 (+3.4%)` or `-$6.82 (-8.4%)`
  - Styling: `px-3 py-1 rounded-full text-sm font-medium`
- Last updated: `text-xs text-muted-foreground` bottom-right

**Grid:**
- Desktop: `flex justify-between items-center`
- Mobile: `flex flex-col gap-4`

---

### 4. Technical Analysis Card (`src/components/analyze/TechnicalAnalysisCard.tsx`)

**Card Header:**
- Title: "Technical Analysis" with `LineChart` icon
- Styling: `text-xl font-bold text-foreground` + `w-5 h-5 text-primary`

**Layout:**
- Desktop: Two columns side-by-side using `grid grid-cols-2 gap-6`
- Mobile: Stack vertically `grid grid-cols-1 gap-6`

**Moving Averages Table (Left Section):**
- Section title: "Moving Averages" `text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3`
- Table styling: Use existing `Table` components
- Columns: Period | Level | Position
- Position cell:
  - Above: `CheckCircle` icon `w-4 h-4 text-primary` + "Above (+X.X%)" in `text-primary`
  - Below: `XCircle` icon `w-4 h-4 text-destructive` + "Below (-X.X%)" in `text-destructive`
- Price values: `font-mono text-foreground`

**Support & Resistance Table (Right Section):**
- Section title: "Support & Resistance"
- Two sub-columns: Support (green) | Resistance (red)
- Row styling:
  - Level labels (S1, S2, S3): `text-muted-foreground text-sm`
  - Support prices: `text-primary font-mono`
  - Resistance prices: `text-warning font-mono` (using orange/warning color)

**RSI Indicator (Below tables):**
- Separator: `border-t border-border mt-6 pt-6`
- Label: "RSI (14-day):" `text-sm text-muted-foreground`
- Value: `text-lg font-bold font-mono text-foreground`
- Visual bar:
  - Container: `h-2 rounded-full bg-muted w-full max-w-md`
  - Zones marked with color gradients:
    - 0-30: `bg-primary` (oversold zone)
    - 30-70: `bg-muted-foreground` (neutral)
    - 70-100: `bg-destructive` (overbought)
  - Position indicator: Small circle `w-3 h-3` at RSI value position
- Zone labels: `text-xs text-muted-foreground` showing "Oversold", "Neutral", "Overbought"

---

### 5. Analyst Consensus Card (`src/components/analyze/AnalystConsensusCard.tsx`)

**Card Header:**
- Title: "Analyst Consensus" with `Users` icon
- Styling: Same as Technical Analysis card

**Overall Rating Badge:**
- Large badge at top: `px-4 py-2 rounded-lg text-lg font-bold`
- Color mapping:
  - STRONG BUY: `bg-primary text-primary-foreground`
  - BUY: `bg-primary/70 text-primary-foreground`
  - HOLD: `bg-muted text-muted-foreground`
  - SELL: `bg-destructive/70 text-destructive-foreground`
  - STRONG SELL: `bg-destructive text-destructive-foreground`

**Distribution Bar:**
- Container: `h-4 rounded-full overflow-hidden flex w-full`
- Segments (left to right):
  - Strong Buy: `bg-primary` (dark green)
  - Buy: `bg-primary/60` (light green)
  - Hold: `bg-muted-foreground` (gray)
  - Sell: `bg-destructive/60` (light red)
  - Strong Sell: `bg-destructive` (dark red)
- Width calculated as percentage of total analysts

**Analyst Count:**
- Below bar: "30 analysts" `text-sm text-muted-foreground text-center mt-2`

**Legend:**
- Horizontal row with counts
- Format: "Strong Buy: 24 | Buy: 4 | Hold: 2 | Sell: 0 | Strong Sell: 0"
- Styling: `text-xs text-muted-foreground flex flex-wrap justify-center gap-2`
- Each segment color-coded with small dot indicator

**Price Targets Section:**
- Separator: `border-t border-border mt-6 pt-6`
- Title: "Price Targets" `text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4`
- Three values in row:
  - Low: `text-destructive` with label
  - Mean: `text-foreground font-bold` (emphasized)
  - High: `text-primary` with label
  - Values: `text-2xl font-bold font-mono`
  - Labels: `text-xs text-muted-foreground`
- Range bar:
  - Container: `h-2 bg-muted rounded-full relative`
  - Gradient from red (low) to green (high)
  - Current price marker: `w-1 h-4 bg-foreground absolute` at calculated position
  - Current price label below marker
- Implied upside:
  - Format: "Implied Upside: +45.6% from current price"
  - Positive: `text-primary font-medium`
  - Negative: `text-destructive font-medium`

---

### 6. AI Sentiment Card (`src/components/analyze/AiSentimentCard.tsx`)

**Styling (Coming Soon state):**
- Card: `bg-card/50 border-dashed border-border rounded-xl p-6`
- Opacity: `opacity-60`

**Content:**
- Lock icon: `Lock` from lucide, `w-8 h-8 text-muted-foreground mx-auto mb-3`
- Title: "AI Sentiment Analysis" `text-lg font-semibold text-muted-foreground`
- Badge: "Coming Soon" `text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full`
- Description: "AI-powered market sentiment analysis and bull/bear case generation"
  - `text-sm text-muted-foreground max-w-md mx-auto mt-3`
- Centered layout: `text-center`

---

### 7. Empty State (`src/components/analyze/AnalyzeEmptyState.tsx`)

**Following existing EmptyState pattern:**
- Card: `bg-card border-border rounded-xl`
- Padding: `p-12 text-center`
- Icon: `BarChart3` or `Search` from lucide, `h-16 w-16 text-muted-foreground mx-auto mb-6`
- Heading: "Enter a stock symbol to get started" `text-xl font-semibold text-foreground mb-2`
- Subtitle: "Try searching for AAPL, MSFT, or UBER" `text-muted-foreground text-sm max-w-md mx-auto`

---

### 8. Loading Skeleton (`src/components/analyze/AnalyzeLoadingSkeleton.tsx`)

**Using existing Skeleton component:**
- Stock Header skeleton:
  - Symbol: `Skeleton h-8 w-24`
  - Company: `Skeleton h-4 w-48`
  - Price: `Skeleton h-12 w-32`
  - Change badge: `Skeleton h-6 w-28 rounded-full`

- Technical Analysis skeleton:
  - Table rows: 5x `Skeleton h-8 w-full`
  - RSI bar: `Skeleton h-2 w-full max-w-md`

- Analyst Consensus skeleton:
  - Rating badge: `Skeleton h-10 w-32`
  - Distribution bar: `Skeleton h-4 w-full`
  - Price targets: 3x `Skeleton h-12 w-20`

---

### 9. Main Page (`src/pages/Analyze.tsx`)

**State Management:**
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [selectedStock, setSelectedStock] = useState<StockAnalysis | null>(null);
const [isLoading, setIsLoading] = useState(false);
```

**Layout:**
- Wrapped in `DashboardLayout`
- Container: `space-y-6`
- Header section with title and search
- Conditional rendering:
  - No search: `AnalyzeEmptyState`
  - Loading: `AnalyzeLoadingSkeleton`
  - Results: Stack of cards

**Page Header:**
- Title: "Stock Analysis" `text-3xl font-bold text-foreground`
- Icon: `BarChart3` or `Search` beside title
- Subtitle: "Search for any stock to view technical analysis and analyst consensus"
  - `text-sm text-muted-foreground mt-2`

---

## Navigation Update

**Add to AppSidebar.tsx:**
```typescript
{ title: 'Analyze', url: '/analyze', icon: Search }
```

Position: After "Positions", before "Benchmarks"

**Add Route to App.tsx:**
```typescript
<Route path="/analyze" element={<Analyze />} />
```

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<640px) | Single column, full-width cards, stacked tables |
| Tablet (640-1024px) | Two-column for technical analysis tables |
| Desktop (>1024px) | Full two-column layout, side-by-side sections |

---

## Color Reference (from existing CSS)

| Element | Color Variable |
|---------|----------------|
| Positive/Above/Buy | `text-primary` (green #10B981) |
| Negative/Below/Sell | `text-destructive` (red #EF4444) |
| Neutral/Hold | `text-muted-foreground` |
| Warning/Resistance | `text-warning` (orange #F59E0B) |
| Card background | `bg-card` |
| Card border | `border-border` |

---

## Typography Reference

| Element | Classes |
|---------|---------|
| Page title | `text-3xl font-bold text-foreground` |
| Card title | `text-xl font-bold text-foreground` |
| Section subtitle | `text-sm font-semibold text-muted-foreground uppercase tracking-wide` |
| Price display | `text-4xl font-bold font-mono text-foreground` |
| Table values | `text-sm font-mono text-foreground` |
| Labels | `text-sm text-muted-foreground` |
| Helper text | `text-xs text-muted-foreground` |

---

## Implementation Order

1. Create mock data file with types and sample data
2. Build EmptyState component
3. Build LoadingSkeleton component
4. Build StockSearchInput with autocomplete
5. Build StockHeaderCard
6. Build TechnicalAnalysisCard with tables and RSI
7. Build AnalystConsensusCard with distribution bar and price targets
8. Build AiSentimentCard placeholder
9. Assemble main Analyze page
10. Update navigation (sidebar + routes)
11. Test responsive layouts on mobile/tablet/desktop

---

## Technical Notes

- All components use existing shadcn/ui primitives (Card, Table, Badge, Skeleton)
- Follow existing patterns from AlertCard and PositionSummaryCard for consistency
- Use `cn()` utility for conditional class merging
- Numbers formatted with `toLocaleString()` and `toFixed(2)` for currency
- Icons from lucide-react (Search, BarChart3, TrendingUp, TrendingDown, CheckCircle, XCircle, Users, Lock)
