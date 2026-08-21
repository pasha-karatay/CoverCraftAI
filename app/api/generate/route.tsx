import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { companyName, jobTitle, experience, tone } = await req.json();

  const prompt = `
Сгенерируй сопроводительное письмо для вакансии ${jobTitle} в компании ${companyName}.
Укажи опыт: ${experience}.
Тон письма: ${tone}.
Стиль: кратко, структурировано, профессионально, без воды.
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
