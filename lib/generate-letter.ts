export async function generateLetter(values: any) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Не удалось сгенерировать письмо");
  }

  if (typeof data.text !== "string" || !data.text.trim()) {
    throw new Error("API не вернуло текст письма");
  }

  return data.text;
}

export async function reviseLetter(letter: string, feedback: string, values: any) {
  const res = await fetch("/api/revise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      letter,
      feedback,
      tone: values.tone,
      experience: values.experience,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Не удалось изменить письмо");
  }

  if (typeof data.text !== "string" || !data.text.trim()) {
    throw new Error("API не вернуло изменённое письмо");
  }

  return data.text;
}
