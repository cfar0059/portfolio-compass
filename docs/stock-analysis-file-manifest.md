# Stock Analysis Page - File Manifest

## Overview
The `/analyze` page was redesigned with a tab-based structure (Fundamentals, Technicals, News) with shared Analyst Consensus visible across all tabs. Fundamentals is the default/primary tab featuring 8 key metrics with contextual labels and educational tooltips.

---

## Files

### Core Data Layer
| File | Status | Description |
|------|--------|-------------|
| `src/data/mockStockAnalysis.ts` | Modified | Types (`StockAnalysis`, `FundamentalsData`, `NewsItem`) + mock data with sector, industry, fundamentals, and news for 8 stocks. Includes `SECTOR_AVG_PE` reference table for sector-relative comparisons. |

### Page Component
| File | Status | Description |
|------|--------|-------------|
| `src/pages/Analyze.tsx` | Modified | Main page with 3-tab layout (Fundamentals/Technicals/News) using shadcn Tabs. Analyst Consensus renders below tabs on all views. |

### Analysis Components (`src/components/analyze/`)
| File | Status | Description |
|------|--------|-------------|
| `FundamentalsTab.tsx` | **New** | 8 metrics in 3 groups (Valuation, Profitability, Risk & Income) with color-coded contextual labels (positive/neutral/warning) and educational tooltips on every metric. |
| `NewsTab.tsx` | **New** | Company headlines list with source name, relative timestamps, optional summary, external link, and "Load More" pagination. |
| `StockHeaderCard.tsx` | Modified | Added sector & industry badges next to the stock symbol. |
| `TechnicalAnalysisCard.tsx` | Modified | Extracted from card wrapper to serve as tab content. Contains moving averages table, support/resistance table, and RSI indicator bar. |
| `AnalystConsensusCard.tsx` | Unchanged | Rating distribution bar, legend, price targets with range bar and implied upside. Shared across all tabs. |
| `StockSearchInput.tsx` | Unchanged | Debounced autocomplete search input with dropdown. |
| `AnalyzeEmptyState.tsx` | Unchanged | Empty state shown before any search. |
| `AnalyzeLoadingSkeleton.tsx` | Unchanged | Skeleton loaders for loading state. |
| `AiSentimentCard.tsx` | Unchanged | Exists in codebase but no longer rendered. Reserved for future premium AI feature. |

### Navigation & Routing
| File | Status | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Previously Modified | Contains the `/analyze` sidebar nav link. |
| `src/App.tsx` | Previously Modified | Contains the `/analyze` route definition. |

### Design System (Context Only - Not Modified)
| File | Description |
|------|-------------|
| `src/index.css` | HSL color tokens: `--primary` (green), `--destructive` (red), `--warning` (amber), `--muted-foreground`, etc. |
| `tailwind.config.ts` | Tailwind theme extending CSS variables. |

---

## Key Design Patterns

- **Contextual Labels**: Every fundamental metric has a color-coded context label (green = positive, amber = neutral/caution, red = concerning) with plain-English explanations.
- **Educational Tooltips**: Info icon on each metric reveals a <20 word beginner-friendly explanation on hover/tap.
- **Sector-Relative Comparisons**: P/E ratio compared against `SECTOR_AVG_PE` lookup table; falls back to absolute thresholds if sector unknown.
- **Shared Component**: `AnalystConsensusCard` renders outside the tab content area so it's always visible.
- **Flat Grouped List**: Fundamentals use a flat list with dividers (not cards) to reduce visual noise, per the design spec.
- **News as Cards**: News items use bordered card-style rows since they are distinct clickable entities.

---

## Tech Stack Used
- React + TypeScript
- shadcn/ui (`Tabs`, `Card`, `Badge`, `Table`, `Tooltip`, `Button`, `Skeleton`)
- Tailwind CSS with HSL design tokens
- lucide-react icons
- Mock data (no external API calls yet)
