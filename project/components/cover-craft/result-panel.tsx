'use client';

import * as React from 'react';
import { Check, Copy, FileText, Loader2, RefreshCw, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

export type ResultStatus = 'idle' | 'loading' | 'ready';

interface ResultPanelProps {
  status: ResultStatus;
  letter: string;
  onLetterChange: (value: string) => void;
  feedback: string;
  onFeedbackChange: (value: string) => void;
  onRegenerate: () => void;
  onRevise: () => void;
  isRevising: boolean;
  isRegenerating: boolean;
}

function countWords(text: string): number {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}

export function ResultPanel({
  status,
  letter,
  onLetterChange,
  feedback,
  onFeedbackChange,
  onRegenerate,
  onRevise,
  isRevising,
  isRegenerating,
}: ResultPanelProps) {
  const [copied, setCopied] = React.useState(false);
  const wordCount = countWords(letter);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      toast.success('Письмо скопировано в буфер обмена');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Не удалось скопировать письмо');
    }
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Результат</CardTitle>
          <CardDescription>Готовое письмо можно редактировать прямо здесь.</CardDescription>
        </div>
        {status === 'ready' && (
          <Badge variant="secondary" className="shrink-0 font-normal">
            {wordCount} слов
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {status === 'idle' && (
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/30 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-4 text-sm font-medium">Здесь появится ваше письмо</p>
            <p className="mt-1 max-w-[260px] text-xs text-muted-foreground">
              Заполните форму слева и нажмите «Сгенерировать письмо»
            </p>
          </div>
        )}

        {status === 'loading' && (
          <div className="min-h-[380px] space-y-4 rounded-xl border border-border/60 bg-muted/20 p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
              Генерирую письмо...
            </div>
            <div className="space-y-2.5 pt-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        )}

        {status === 'ready' && (
          <div className="space-y-5">
            <Textarea
              value={letter}
              onChange={(e) => onLetterChange(e.target.value)}
              className="min-h-[380px] resize-none text-[15px] leading-relaxed"
            />

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                Скопировать
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={onRegenerate} disabled={isRegenerating}>
                {isRegenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Сгенерировать заново
              </Button>
            </div>

            <div className="space-y-2 border-t border-border/60 pt-5">
              <Label htmlFor="feedback">Что изменить / ваши пожелания</Label>
              <Textarea
                id="feedback"
                placeholder="Например: сделай короче и добавь больше конкретики про цифры"
                className="min-h-[80px] resize-none"
                value={feedback}
                onChange={(e) => onFeedbackChange(e.target.value)}
              />
              <Button
                variant="secondary"
                className="w-full gap-2"
                disabled={!feedback.trim() || isRevising}
                onClick={onRevise}
              >
                {isRevising ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Переделываю...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Переделать по пожеланиям
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
