export async function askQuestion(question: string): Promise<string> {
  const response = await fetch("http://localhost:3000/api/questions/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) {
    throw new Error("Error al consultar la API");
  }
  const data = await response.json();
  return data.answer;
}
