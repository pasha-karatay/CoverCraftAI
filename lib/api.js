export async function generateLetter({ company, position, experience, tone }) {
  const prompt = `
Создай сопроводительное письмо.
Компания: ${company}
Должность: ${position}
Опыт: ${experience}
Тональность: ${tone}

Сделай письмо структурированным, убедительным и естественным.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function applyWishes({ letter, wishes }) {
  const prompt = `
Вот сопроводительное письмо:
${letter}

Вот пожелания пользователя:
${wishes}

Перепиши письмо, учитывая пожелания, сохрани стиль и структуру.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function regenerateLetter(inputs) {
  return generateLetter(inputs);
}
