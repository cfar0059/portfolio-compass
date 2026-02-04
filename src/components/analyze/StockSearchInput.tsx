import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchStocks, StockSearchResult } from '@/data/mockStockAnalysis';
import { cn } from '@/lib/utils';

interface StockSearchInputProps {
  onSelect: (symbol: string) => void;
  onClear: () => void;
}

export function StockSearchInput({ onSelect, onClear }: StockSearchInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        setResults(searchStocks(query));
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: StockSearchResult) => {
    setQuery(result.symbol);
    setIsOpen(false);
    onSelect(result.symbol);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onClear();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by symbol or company name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 pl-12 pr-10 bg-card border-border rounded-lg text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
          {results.map((result) => (
            <button
              key={result.symbol}
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-3 hover:bg-accent cursor-pointer text-left flex items-center gap-2"
            >
              <span className="text-sm font-bold text-foreground">{result.symbol}</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-sm text-muted-foreground">{result.companyName}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-muted-foreground text-center">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
