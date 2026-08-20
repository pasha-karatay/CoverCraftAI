export type LetterTone = 'professional' | 'friendly' | 'confident' | 'creative';

export interface LetterInput {
  companyName: string;
  jobTitle: string;
  experience: string;
  tone: LetterTone;
}

const GREETINGS: Record<LetterTone, string[]> = {
  professional: ['Здравствуйте!', 'Уважаемая команда {company}!'],
  friendly: ['Привет!', 'Добрый день!'],
  confident: ['Здравствуйте!', 'Приветствую команду {company}!'],
  creative: ['Здравствуйте, {company}!', 'Доброго дня творческой команде {company}!'],
};

const OPENERS: Record<LetterTone, string[]> = {
  professional: [
    'Меня заинтересовала вакансия «{role}» в компании {company}, и я хотел бы предложить свою кандидатуру.',
    'Пишу по поводу открытой позиции «{role}» в {company} — уверен, что мой опыт будет полезен вашей команде.',
    'Хочу откликнуться на позицию «{role}» в {company}: мой профиль и стек хорошо совпадают с вашими задачами.',
  ],
  friendly: [
    'Увидел(а) у вас открытую позицию «{role}» — и сразу захотелось откликнуться!',
    'Наткнулся(ась) на вакансию «{role}» в {company} и подумал(а), что это отличная возможность познакомиться.',
    'Мне очень откликается то, что вы делаете в {company}, — поэтому пишу насчёт позиции «{role}».',
  ],
  confident: [
    'Я — именно тот специалист, который нужен {company} на позицию «{role}».',
    'Уверенно откликаюсь на вакансию «{role}»: мой опыт и результаты говорят сами за себя.',
    'Позиция «{role}» в {company} — ровно то, где я могу быть максимально полезен с первого дня.',
  ],
  creative: [
    'Каждая хорошая история начинается с подходящего момента — и позиция «{role}» в {company} кажется именно таким моментом для меня.',
    'Если бы вакансии могли находить своих идеальных кандидатов, «{role}» в {company} нашла бы меня.',
    'Меня зацепила ваша вакансия «{role}» — и вот почему я считаю, что мы можем сделать что-то хорошее вместе.',
  ],
};

const BRIDGES: Record<LetterTone, string[]> = {
  professional: [
    'Кратко о моём опыте и ключевых навыках:',
    'Хочу отметить несколько моментов из своего опыта, которые относятся к этой роли:',
    'Вот что я умею и чем могу быть полезен вашей команде:',
  ],
  friendly: [
    'Немного о том, что я умею и чем занимался(ась) до этого:',
    'Расскажу немного о своём опыте:',
    'Пара слов о том, что я уже умею и что мне особенно нравится делать:',
  ],
  confident: [
    'Вот что я уже успел(а) сделать и какую пользу могу принести:',
    'Мой опыт подтверждает, что я справлюсь с задачами этой роли:',
    'Конкретика по опыту — чтобы было понятно, откуда моя уверенность:',
  ],
  creative: [
    'Немного контекста, который поможет увидеть картину целиком:',
    'Вот несколько штрихов к моему профессиональному портрету:',
    'Чтобы вы сразу увидели, о ком речь, — немного фактов обо мне:',
  ],
};

const CLOSERS: Record<LetterTone, string[]> = {
  professional: [
    'Буду рад(а) обсудить, как мой опыт может быть полезен {company}, на собеседовании.',
    'С удовольствием отвечу на любые вопросы и готов(а) обсудить детали в удобное для вас время.',
    'Спасибо за уделённое время — с нетерпением жду возможности пообщаться лично.',
  ],
  friendly: [
    'Буду рад(а) пообщаться и рассказать больше — пишите в любое удобное время!',
    'Если это звучит интересно — давайте созвонимся и обсудим детали!',
    'Буду очень рад(а) продолжить разговор — легко доступен(на) для звонка или переписки.',
  ],
  confident: [
    'Готов(а) начать приносить результат {company} уже в первые недели работы. Жду вашего ответа.',
    'Убеждён(а), что личная встреча подтвердит: я — правильный выбор для этой позиции.',
    'Открыт(а) к разговору и готов(а) сразу погрузиться в задачи — буду ждать обратной связи.',
  ],
  creative: [
    'Буду рад(а) продолжить эту историю на собеседовании и рассказать больше деталей.',
    'Давайте встретимся и обсудим, как вместе мы можем создать что-то по-настоящему интересное.',
    'С удовольствием расскажу остальное при встрече — мне важно, чтобы мы оказались на одной волне.',
  ],
};

const SIGNATURES: Record<LetterTone, string> = {
  professional: 'С уважением,\nВаше имя',
  friendly: 'С теплом,\nВаше имя',
  confident: 'С уверенностью в результате,\nВаше имя',
  creative: 'До скорой встречи,\nВаше имя',
};

const WEAVE_CONNECTORS: Record<LetterTone, string[]> = {
  professional: ['Также', 'Дополнительно', 'Помимо этого'],
  friendly: ['Кстати', 'А ещё', 'И между прочим'],
  confident: ['Отдельно', 'При этом', 'Важно подчеркнуть'],
  creative: ['И ещё', 'Между прочим', 'В дополнение'],
};

function pick(list: string[], exclude?: string): string {
  const options = exclude && list.length > 1 ? list.filter((item) => item !== exclude) : list;
  return options[Math.floor(Math.random() * options.length)];
}

function fill(template: string, input: LetterInput): string {
  return template.replaceAll('{company}', input.companyName).replaceAll('{role}', input.jobTitle);
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function lowercaseFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function ensurePeriod(text: string): string {
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

interface ParsedFeedback {
  additions: string[];
  removals: string[];
}

const INSTRUCTION_PREFIXES: RegExp[] = [
  /^(?:добавь(?:те)?|напиши(?:те)?|вставь(?:те)?|поставь(?:те)?|поменяй(?:те)?|измени(?:те)?|перепиши(?:те)?|поправь(?:те)?|сделай(?:те)?(?:\s+так\s+чтобы)?)\s+(?:про\s+|о\s+|что\s+)?/i,
  /^(?:что|чтобы)\s+/i,
  /^(?:я\s+хочу|хочу|нужно|надо|пусть|пожалуйста)\s+/i,
];

const REMOVAL_PREFIX: RegExp =
  /^(?:убери(?:те)?|не\s+(?:пиши(?:те)?|пишите|упоминай(?:те)?|говори(?:те)?|ставь(?:те)?)|удали(?:те)?|вырежи(?:те)?|исключи(?:те)?)\s+(?:про\s+|о\s+|упоминание\s+(?:о\s+|про\s+))?/i;

function parseFeedback(feedback: string): ParsedFeedback {
  const additions: string[] = [];
  const removals: string[] = [];

  const parts = feedback
    .split(/,|;|\s+и\s+что\s+|\s+а\s+также\s+|\s+плюс\s+|\s+ещё\s+|\s+еще\s+/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);

  for (const part of parts) {
    const removalMatch = part.match(REMOVAL_PREFIX);
    if (removalMatch) {
      const keyword = part.slice(removalMatch[0].length).trim();
      if (keyword.length > 1) removals.push(keyword);
      continue;
    }

    let cleaned = part;
    let prev = '';
    while (prev !== cleaned) {
      prev = cleaned;
      for (const re of INSTRUCTION_PREFIXES) {
        cleaned = cleaned.replace(re, '').trim();
      }
    }

    if (cleaned.length > 2) additions.push(cleaned);
  }

  return { additions, removals };
}

function rephrasePoint(rawPoint: string, tone: LetterTone): string {
  let point = rawPoint.trim();

  // Убираем команды типа «добавь», «напиши» и т.д.
  point = point
    .replace(/^(?:добавь(?:те)?|напиши(?:те)?|вставь(?:те)?|поставь(?:те)?|поменяй(?:те)?|измени(?:те)?|перепиши(?:те)?|поправь(?:те)?|сделай(?:те)?(?:\s+так\s+чтобы)?)\s+(?:про\s+|о\s+|что\s+)?/i, '')
    .replace(/^(?:что|чтобы)\s+/i, '')
    .replace(/^(?:я\s+хочу|хочу|нужно|надо|пусть|пожалуйста)\s+/i, '')
    .trim();

  // Перефразируем разговорные формулировки в презентабельные
  point = point
    .replace(/\s*на\s+ты\s+с\s+/gi, ' свободно владею ')
    .replace(/\s*на\s+короткой\s+ноге\s+с\s+/gi, ' свободно владею ')
    .replace(/\s*выучил(а)?\s+(их\s+)?сам(а)?\s*/gi, ' освоил$1 самостоятельно')
    .replace(/\s*выучил(а)?\s+сам(а)?\s*/gi, ' освоил$1 самостоятельно')
    .replace(/\s*умею\s+/gi, ' владею ')
    .replace(/\s*хорошо\s+знаю\s+/gi, ' уверенно владею ')
    .replace(/\s*разбираюсь\s+в\s+/gi, ' работаю с ')
    .replace(/\s*ну\s+/gi, ' ')
    .replace(/\s*вот\s+/gi, ' ')
    .replace(/\s*типа\s+/gi, ' ')
    .replace(/\s*как\s+бы\s+/gi, ' ')
    .replace(/\s*между\s+прочим\s+/gi, ' ')
    .replace(/\s*кстати\s+/gi, ' ')
    .replace(/\s*а\s+ещё\s+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Подстраиваем под тон
  if (tone === 'confident') {
    point = point
      .replace(/\s*свободно\s+владею\s+/gi, ' уверенно владею ')
      .replace(/\s*владею\s+/gi, ' уверенно владею ');
  }
  if (tone === 'friendly') {
    point = point
      .replace(/\s*свободно\s+владею\s+/gi, ' хорошо разбираюсь в ')
      .replace(/\s*владею\s+/gi, ' хорошо работаю с ');
  }
  if (tone === 'creative') {
    point = point
      .replace(/\s*свободно\s+владею\s+/gi, ' на короткой ноге с ')
      .replace(/\s*владею\s+/gi, ' свободно работаю с ');
  }
  if (tone === 'professional') {
    point = point
      .replace(/\s*свободно\s+владею\s+/gi, ' уверенно владею ')
      .replace(/\s*владею\s+/gi, ' владею ');
  }

  // Делаем первое слово с заглавной и ставим точку
  point = capitalize(point);
  point = ensurePeriod(point);

  return point;
}

function applyRemovals(experience: string, removals: string[]): string {
  if (removals.length === 0) return experience;

  const sentences = splitSentences(experience);
  const filtered = sentences.filter((sentence) => {
    const lower = sentence.toLowerCase();
    return !removals.some((removal) => {
      const stem = removal.toLowerCase().replace(/(?:ание|ение|ие|ство)$/i, '');
      return lower.includes(removal.toLowerCase()) || (stem.length > 3 && lower.includes(stem));
    });
  });

  return filtered.length > 0 ? filtered.join(' ') : experience;
}

function weavePoints(experience: string, points: string[], tone: LetterTone): string {
  const sentences = splitSentences(experience);
  let lastConnector = '';

  for (const point of points) {
    const rephrased = rephrasePoint(point, tone);
    const connector = pick(WEAVE_CONNECTORS[tone], lastConnector);
    lastConnector = connector;
    const fragment = lowercaseFirst(rephrased);
    sentences.push(`${connector} ${fragment}`);
  }

  return sentences.join(' ');
}

export function generateLetter(input: LetterInput): string {
  const greeting = fill(pick(GREETINGS[input.tone]), input);
  const opener = fill(pick(OPENERS[input.tone]), input);
  const bridge = pick(BRIDGES[input.tone]);
  const closer = fill(pick(CLOSERS[input.tone]), input);
  const signature = SIGNATURES[input.tone];
  const experienceSection = input.experience.trim();

  return [greeting, '', opener, '', bridge, '', experienceSection, '', closer, '', signature].join('\n');
}

export function reviseLetter(currentLetter: string, feedback: string, input: LetterInput): string {
  const lowerFeedback = feedback.toLowerCase().trim();

  // === Обработка запросов на улучшение качества и увеличение объёма ===
  const isQualityRequest =
    /презентабельн|улучш|сделай лучше|сделай сильнее|сделай убедительнее|перепиши|более профессиональн|более сильный|красивее|сильнее|убедительнее/.test(lowerFeedback);

  const isExpandRequest =
    /увелич|расшир|длиннее|больше текста|на 1\.?[23]|в 1\.?[23]|на треть|побольше/.test(lowerFeedback);

  if (isQualityRequest || isExpandRequest) {
    // Берём текущий опыт и делаем его более развёрнутым и презентабельным
    let experience = input.experience.trim();

    // Делаем предложения более развёрнутыми
    const sentences = splitSentences(experience);
    const expanded: string[] = [];

    for (const s of sentences) {
      let sentence = s;

      // Добавляем лёгкое усиление без выдумывания фактов
      if (sentence.length < 90 && !sentence.includes('в результате') && !sentence.includes('что позволило')) {
        if (/ускор|улучш|сократ|увелич|внедр/.test(sentence.toLowerCase())) {
          sentence = sentence.replace(/\.$/, '') + ', что положительно сказалось на работе команды.';
        } else if (/руковод|управлял|команд/.test(sentence.toLowerCase())) {
          sentence = sentence.replace(/\.$/, '') + ', развивая навыки лидерства и коммуникации.';
        } else {
          sentence = sentence.replace(/\.$/, '') + '.';
        }
      }
      expanded.push(ensurePeriod(sentence));
    }

    // Если просили увеличить — добавляем ещё одно связующее предложение
    if (isExpandRequest) {
      expanded.push(
        'Стремлюсь применять накопленный опыт для решения сложных задач и постоянного профессионального роста.'
      );
    }

    experience = expanded.join(' ');

    // Собираем письмо заново с улучшенным блоком опыта
    const greeting = fill(pick(GREETINGS[input.tone]), input);
    const opener = fill(pick(OPENERS[input.tone]), input);
    const bridge = pick(BRIDGES[input.tone]);
    const closer = fill(pick(CLOSERS[input.tone]), input);
    const signature = SIGNATURES[input.tone];

    return [greeting, '', opener, '', bridge, '', experience, '', closer, '', signature].join('\n');
  }

  // === Обычная логика для конкретных пожеланий (добавить/убрать факт) ===
  const { additions, removals } = parseFeedback(feedback);

  let experienceSection = input.experience.trim();
  experienceSection = applyRemovals(experienceSection, removals);
  experienceSection = weavePoints(experienceSection, additions, input.tone);

  const greeting = fill(pick(GREETINGS[input.tone]), input);
  const opener = fill(pick(OPENERS[input.tone]), input);
  const bridge = pick(BRIDGES[input.tone]);
  const closer = fill(pick(CLOSERS[input.tone]), input);
  const signature = SIGNATURES[input.tone];

  return [greeting, '', opener, '', bridge, '', experienceSection, '', closer, '', signature].join('\n');
}

export const TONE_LABELS: Record<LetterTone, string> = {
  professional: 'Профессиональный',
  friendly: 'Дружелюбный',
  confident: 'Уверенный',
  creative: 'Креативный',
};
