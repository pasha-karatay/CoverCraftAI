'use client';

import { Briefcase, Building2, Smile, Sparkles, Zap, Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { LetterTone, TONE_LABELS } from '@/lib/generate-letter';

export interface FormValues {
  companyName: string;
  jobTitle: string;
  experience: string;
  tone: LetterTone;
}

export interface LetterExample {
  label: string;
  description: string;
  values: FormValues;
}

const TONE_ICONS: Record<LetterTone, typeof Briefcase> = {
  professional: Briefcase,
  friendly: Smile,
  confident: Zap,
  creative: Sparkles,
};

export const EXAMPLES: LetterExample[] = [
  {
    label: 'Frontend-разработчик',
    description: 'TechFlow · React, TypeScript',
    values: {
      companyName: 'TechFlow',
      jobTitle: 'Frontend-разработчик',
      experience:
        '3 года разрабатываю интерфейсы на React и TypeScript. Переписал ключевой модуль приложения, ускорив загрузку страниц на 40%. Руководил командой из 4 разработчиков и внедрил code review как обязательный процесс.',
      tone: 'professional',
    },
  },
  {
    label: 'Маркетолог',
    description: 'BrightMedia · digital-маркетинг',
    values: {
      companyName: 'BrightMedia',
      jobTitle: 'Маркетолог',
      experience:
        '4 года веду digital-кампании для B2C брендов. Увеличил органический трафик на 65% за год и запустил email-рассылку с открываемостью 38%. Люблю тестировать гипотезы и считать цифры.',
      tone: 'friendly',
    },
  },
  {
    label: 'Менеджер проектов',
    description: 'Orbit Logistics · управление командами',
    values: {
      companyName: 'Orbit Logistics',
      jobTitle: 'Менеджер проектов',
      experience:
        '5 лет управляю проектами в логистике с бюджетом до 10 млн рублей. Внедрил Scrum в команде из 12 человек и сократил сроки поставки на 20%. Умею находить общий язык и с разработчиками, и с заказчиками.',
      tone: 'confident',
    },
  },
];

interface LetterFormProps {
  values: FormValues;
  onChange: (values: FormValues) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export function LetterForm({ values, onChange, onSubmit, isGenerating }: LetterFormProps) {
  const isValid = values.companyName.trim() && values.jobTitle.trim() && values.experience.trim();

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle>Данные для письма</CardTitle>
        <CardDescription>Заполните форму — и мы соберём письмо под конкретную вакансию.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Название компании</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="company"
                placeholder="Например: TechFlow"
                className="pl-9"
                value={values.companyName}
                onChange={(e) => onChange({ ...values, companyName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Должность</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="role"
                placeholder="Например: Frontend-разработчик"
                className="pl-9"
                value={values.jobTitle}
                onChange={(e) => onChange({ ...values, jobTitle: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Ваш опыт и ключевые навыки</Label>
          <Textarea
            id="experience"
            placeholder="Например: 3 года работал frontend-разработчиком, специализируюсь на React и TypeScript, руководил командой из 4 человек, увеличил скорость загрузки сайта на 40%..."
            className="min-h-[140px] resize-none"
            value={values.experience}
            onChange={(e) => onChange({ ...values, experience: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Тон письма</Label>
          <ToggleGroup
            type="single"
            value={values.tone}
            onValueChange={(tone) => tone && onChange({ ...values, tone: tone as LetterTone })}
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {(Object.keys(TONE_LABELS) as LetterTone[]).map((tone) => {
              const Icon = TONE_ICONS[tone];
              return (
                <ToggleGroupItem
                  key={tone}
                  value={tone}
                  className={cn(
                    'h-auto flex-col gap-1.5 rounded-xl border border-input bg-transparent py-3 text-xs font-medium text-muted-foreground transition-all',
                    'data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {TONE_LABELS[tone]}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Быстрые примеры</Label>
          <div className="grid gap-2 sm:grid-cols-3">
            {EXAMPLES.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => onChange(example.values)}
                className="group rounded-xl border border-border/60 bg-secondary/40 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary hover:shadow-sm"
              >
                <p className="text-sm font-medium">{example.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{example.description}</p>
              </button>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full gap-2 text-base"
          disabled={!isValid || isGenerating}
          onClick={onSubmit}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Генерирую...
            </>
          ) : (
            <>
              Сгенерировать письмо
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
