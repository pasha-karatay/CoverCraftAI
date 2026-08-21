import { NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { letter, feedback, tone, experience } = await req.json();

  const prompt = `
Отредактируй сопроводительное письмо так, чтобы оно выглядело как профессионально написанный текст.
Вплети смысл пожеланий пользователя естественно в структуру письма, без прямых цитат.
Не используй фразы вроде «учитывая ваши пожелания» и не вставляй текст пользователя дословно.
Сохрани тон письма (${tone}) и опыт (${experience}).

Критические правила:
- Сохраняй только факты, которые уже есть в исходном письме, опыте или пожеланиях.
- Не выдумывай имя, компании, должности, даты, проекты, достижения или другие сведения.
- Никогда не добавляй телефон, email, адрес, ссылки, контактные данные или подпись с вымышленными значениями.
- Если данных нет, не добавляй их.
- Верни только исправленный текст письма.

Вот письмо:
${letter}

Вот пожелания:
${feedback}
`;

    const text = await askGroq([{ role: "user", content: prompt }]);

    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ошибка при обращении к Groq";
    console.error("Ошибка API:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
