'use client';

import { Clock, History as HistoryIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { CoverLetterRow } from '@/lib/supabase';

interface HistoryListProps {
  items: CoverLetterRow[];
  loading: boolean;
  activeId: string | null;
  onSelect: (item: CoverLetterRow) => void;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function HistoryList({ items, loading, activeId, onSelect }: HistoryListProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <HistoryIcon className="h-4 w-4 text-muted-foreground" />
        <div>
          <CardTitle className="text-base">История</CardTitle>
          <CardDescription>Последние сгенерированные письма</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex gap-3 overflow-hidden">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-56 shrink-0 rounded-xl" />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <p className="text-sm text-muted-foreground">Здесь появятся ваши последние письма.</p>
        )}

        {!loading && items.length > 0 && (
          <div className="scrollbar-thin flex gap-3 overflow-x-auto pb-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className={cn(
                  'flex w-56 shrink-0 flex-col gap-1 rounded-xl border border-border/60 bg-secondary/30 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary hover:shadow-sm',
                  activeId === item.id && 'border-primary bg-primary/10'
                )}
              >
                <p className="truncate text-sm font-medium">
                  {item.job_title} · {item.company_name}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDate(item.created_at)}
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
