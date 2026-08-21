'use client';

import { useState } from 'react';
import { LetterForm, FormValues } from '@/components/cover-craft/letter-form';
import { generateLetter, reviseLetter } from '@/lib/generate-letter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Home() {
  const [values, setValues] = useState<FormValues>({
    companyName: '',
    jobTitle: '',
    experience: '',
    tone: 'professional',
  });

  const [letter, setLetter] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isRevising, setIsRevising] = useState(false);
  const [error, setError] = useState('');

  const [history, setHistory] = useState<
    { values: FormValues; letter: string; date: string }[]
  >([]);

  function addToHistory(values: FormValues, letter: string) {
    setHistory((prev) => [
      { values, letter, date: new Date().toLocaleString() },
      ...prev,
    ]);
  }

  // 🔥 Генерация письма
  async function handleGenerate() {
    setIsGenerating(true);
    setError('');

    try {
      const generated = await generateLetter(values);
      setLetter(generated);
      addToHistory(values, generated);
      toast.success('Письмо готово');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось сгенерировать письмо';
      setError(message);
      toast.error('Не удалось сгенерировать письмо', { description: message });
    } finally {
      setIsGenerating(false);
    }
  }

  // 🔥 Перегенерация письма
  async function handleRegenerate() {
    setIsRegenerating(true);
    setError('');

    try {
      const generated = await generateLetter(values);
      setLetter(generated);
      addToHistory(values, generated);
      toast.success('Письмо обновлено');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось сгенерировать письмо';
      setError(message);
      toast.error('Не удалось обновить письмо', { description: message });
    } finally {
      setIsRegenerating(false);
    }
  }

  // 🔥 Ревизия письма по пожеланиям
  async function handleRevise() {
    if (!letter.trim() || !feedback.trim()) return;

    setIsRevising(true);
    setError('');

    try {
      const revised = await reviseLetter(letter, feedback, values);
      setLetter(revised);
      addToHistory(values, revised);
      toast.success('Письмо переработано');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось изменить письмо';
      setError(message);
      toast.error('Не удалось переработать письмо', { description: message });
    } finally {
      setIsRevising(false);
    }
  }

  return (
    <div className="container mx-auto grid animate-page-in gap-6 py-10 lg:grid-cols-2">
      {/* Левая колонка — форма */}
      <LetterForm
        values={values}
        onChange={setValues}
        onSubmit={handleGenerate}
        isGenerating={isGenerating}
      />

      {/* Правая колонка — результат */}
      <Card className="animate-rise border-border/60 shadow-sm [animation-delay:120ms]">
        <CardHeader>
          <CardTitle>Ваше письмо</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Пустое состояние */}
          {!letter && !isGenerating && (
            <p className="text-muted-foreground">Здесь появится ваше письмо</p>
          )}

          {/* Лоадер */}
          {isGenerating && (
            <p className="text-muted-foreground">Генерирую письмо...</p>
          )}

          {error && <p className="text-red-500">{error}</p>}

          {/* Письмо */}
          {letter && (
            <>
              <Textarea
                className="min-h-[240px]"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
              />

              <div className="flex gap-2">
                <Button onClick={handleRegenerate} disabled={isRegenerating}>
                  {isRegenerating ? 'Генерирую...' : 'Сгенерировать заново'}
                </Button>
              </div>

              <div className="space-y-2 pt-4">
                <Textarea
                  placeholder="Что изменить / ваши пожелания..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />

                <Button onClick={handleRevise} disabled={isRevising}>
                  {isRevising ? 'Переделываю...' : 'Переделать по пожеланиям'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* История */}
      <Card className="animate-rise lg:col-span-2 border-border/60 shadow-sm [animation-delay:240ms]">
        <CardHeader>
          <CardTitle>История</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.length === 0 && (
            <p className="text-muted-foreground">История пока пустая</p>
          )}

          {history.map((item, idx) => (
            <button
              key={idx}
              className="w-full rounded-lg border p-3 text-left hover:bg-secondary/40"
              onClick={() => {
                setValues(item.values);
                setLetter(item.letter);
              }}
            >
              <p className="font-medium">{item.values.jobTitle}</p>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
