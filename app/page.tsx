'use client';

import { useState } from 'react';
import { LetterForm, FormValues } from '@/components/cover-craft/letter-form';
import { generateLetter, reviseLetter } from '@/lib/generate-letter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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

    const generated = await generateLetter(values);
    setLetter(generated);

    setIsGenerating(false);
    addToHistory(values, generated);
  }

  // 🔥 Перегенерация письма
  async function handleRegenerate() {
    setIsRegenerating(true);

    const generated = await generateLetter(values);
    setLetter(generated);

    setIsRegenerating(false);
    addToHistory(values, generated);
  }

  // 🔥 Ревизия письма по пожеланиям
  async function handleRevise() {
    if (!letter.trim() || !feedback.trim()) return;

    setIsRevising(true);

    const revised = await reviseLetter(letter, feedback, values);
    setLetter(revised);

    setIsRevising(false);
    addToHistory(values, revised);
  }

  return (
    <div className="container mx-auto grid gap-6 py-10 lg:grid-cols-2">
      {/* Левая колонка — форма */}
      <LetterForm
        values={values}
        onChange={setValues}
        onSubmit={handleGenerate}
        isGenerating={isGenerating}
      />

      {/* Правая колонка — результат */}
      <Card className="border-border/60 shadow-sm">
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
      <Card className="lg:col-span-2 border-border/60 shadow-sm">
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
