import { useState } from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';
import { NewsItem } from '@/data/mockStockAnalysis';
import { Button } from '@/components/ui/button';

interface NewsTabProps {
  news: NewsItem[];
  symbol: string;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

export function NewsTab({ news, symbol }: NewsTabProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  if (news.length === 0) {
    return (
      <div className="py-12 text-center">
        <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">No recent news for {symbol}</p>
      </div>
    );
  }

  const visibleNews = news.slice(0, visibleCount);
  const hasMore = visibleCount < news.length;

  return (
    <div className="space-y-3">
      {visibleNews.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-border bg-card/50 p-4 hover:border-primary/30 transition-colors group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                <span className="font-medium text-foreground/70">{item.source}</span>
                <span>·</span>
                <span>{formatTimeAgo(item.publishedAt)}</span>
              </div>
              <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                {item.headline}
              </h4>
              {item.summary && (
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{item.summary}</p>
              )}
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </a>
      ))}

      {hasMore && (
        <div className="text-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVisibleCount((c) => c + 5)}
            className="text-muted-foreground hover:text-foreground"
          >
            Load More Headlines
          </Button>
        </div>
      )}
    </div>
  );
}
