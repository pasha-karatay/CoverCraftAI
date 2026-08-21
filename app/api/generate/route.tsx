import { NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { companyName, jobTitle, experience, tone } = await req.json();

  const prompt = `
Сгенерируй сопроводительное письмо для вакансии ${jobTitle} в компании ${companyName}.
Используй только факты из данных ниже:
- Опыт кандидата: ${experience}
- Тон письма: ${tone}

Критические правила:
- Никогда не выдумывай имя кандидата, должность, компании, проекты, даты, зарплату или достижения.
- Никогда не добавляй телефон, email, адрес, ссылки, контактные данные или подпись с вымышленными значениями.
- Если каких-то данных нет, просто не упоминай их.
- Не вставляй плейсхолдеры вроде [телефон] или реалистичные вымышленные данные.
- Верни только текст сопроводительного письма без пояснений и выдуманных реквизитов.

Стиль: кратко, структурировано, профессионально, без воды.
`;

    const text = await askGroq([{ role: "user", content: prompt }]);

    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ошибка при обращении к Groq";
    console.error("Ошибка API:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
