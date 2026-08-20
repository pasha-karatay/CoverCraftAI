'use client';

import * as React from 'react';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';
import { LetterForm, FormValues } from '@/components/cover-craft/letter-form';
import { ResultPanel, ResultStatus } from '@/components/cover-craft/result-panel';
import { HistoryList } from '@/components/cover-craft/history-list';
import { generateLetter, reviseLetter } from '@/lib/generate-letter';
import { supabase, CoverLetterRow } from '@/lib/supabase';

const GENERATION_DELAY_MS = 1400;

const INITIAL_VALUES: FormValues = {
  companyName: '',
  jobTitle: '',
  experience: '',
  tone: 'professional',
};

export default function Home() {

  console.log("deploy test");   // ← ВОТ СЮДА ВСТАВИТЬ

  const [values, setValues] = React.useState<FormValues>(INITIAL_VALUES);
  const [status, setStatus] = React.useState<ResultStatus>('idle');
  const [letter, setLetter] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [isRegenerating, setIsRegenerating] = React.useState(false);
  const [isRevising, setIsRevising] = React.useState(false);
  const [history, setHistory] = React.useState<CoverLetterRow[]>([]);
  const [historyLoading, setHistoryLoading] = React.useState(true);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setHistoryLoading(true);
    const { data, error } = await supabase
      .from('cover_letters')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8);

    if (error) {
      toast.error('Не удалось загрузить историю');
      setHistoryLoading(false);
      return;
    }

    setHistory(data ?? []);
    setHistoryLoading(false);
  }

  async function saveToHistory(input: FormValues, letterText: string) {
    const { data, error } = await supabase
      .from('cover_letters')
      .insert({
        company_name: input.companyName,
        job_title: input.jobTitle,
        experience: input.experience,
        tone: input.tone,
        letter: letterText,
      })
      .select()
      .maybeSingle();

    if (error || !data) {
      toast.error('Письмо создано, но не сохранилось в истории');
      return;
    }

    setActiveId(data.id);
    setHistory((prev) => [data, ...prev].slice(0, 8));
  }

  async function handleGenerate() {
    setStatus('loading');
    setFeedback('');
    await new Promise((resolve) => setTimeout(resolve, GENERATION_DELAY_MS));
    const generated = generateLetter(values);
    setLetter(generated);
    setStatus('ready');
    await saveToHistory(values, generated);
  }

  async function handleRegenerate() {
    setIsRegenerating(true);
    await new Promise((resolve) => setTimeout(resolve, GENERATION_DELAY_MS));
    const generated = generateLetter(values);
    setLetter(generated);
    setIsRegenerating(false);
    await saveToHistory(values, generated);
  }

  async function handleRevise() {
    if (!feedback.trim()) return;
    setIsRevising(true);
    await new Promise((resolve) => setTimeout(resolve, GENERATION_DELAY_MS));
    const revised = reviseLetter(letter, feedback, values);
    setLetter(revised);
    setIsRevising(false);
    setFeedback('');
    await saveToHistory(values, revised);
  }

  function handleSelectHistory(item: CoverLetterRow) {
    setValues({
      companyName: item.company_name,
      jobTitle: item.job_title,
      experience: item.experience,
      tone: item.tone as FormValues['tone'],
    });
    setLetter(item.letter);
    setActiveId(item.id);
    setStatus('ready');
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm shrink-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight sm:text-base">CoverCraft AI</p>
              <p className="text-[11px] leading-tight text-muted-foreground hidden sm:block">
                Идеальное сопроводительное письмо за 15 секунд
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 sm:px-6 sm:py-6">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6 items-start">
          <LetterForm
            values={values}
            onChange={setValues}
            onSubmit={handleGenerate}
            isGenerating={status === 'loading'}
          />
          <ResultPanel
            status={status}
            letter={letter}
            onLetterChange={setLetter}
            feedback={feedback}
            onFeedbackChange={setFeedback}
            onRegenerate={handleRegenerate}
            onRevise={handleRevise}
            isRevising={isRevising}
            isRegenerating={isRegenerating}
          />
        </div>

        <div className="mt-4">
          <HistoryList
            items={history}
            loading={historyLoading}
            activeId={activeId}
            onSelect={handleSelectHistory}
          />
        </div>
      </main>
    </div>
  );
}
