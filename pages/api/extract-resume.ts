import type { NextApiRequest, NextApiResponse } from 'next';
import { askGroq } from '@/lib/groq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Текст резюме не получен или неверный формат' });
    }

    const summary = await askGroq([
      {
        role: 'user',
        content: `Сделай краткое summary резюме. Выдели опыт, навыки и достижения. Текст:\n\n${text}`,
      },
    ]);

    return res.status(200).json({ summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ошибка при обращении к Groq';
    console.error('Ошибка API:', message);
    return res.status(500).json({ error: message });
  }
}
