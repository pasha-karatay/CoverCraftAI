import { NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { companyName, jobTitle, experience, tone } = await req.json();

  const prompt = `
Сгенерируй сопроводительное письмо для вакансии ${jobTitle} в компании ${companyName}.
Укажи опыт: ${experience}.
Тон письма: ${tone}.
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
