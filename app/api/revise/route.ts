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
