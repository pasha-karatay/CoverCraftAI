export async function generateLetter(values) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();
  return data.text;
}

export async function reviseLetter(letter, feedback, values) {
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
  return data.text;
}
