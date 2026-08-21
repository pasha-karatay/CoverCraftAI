import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  return NextResponse.json({ text });
}
