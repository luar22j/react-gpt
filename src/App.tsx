import { useState, useRef, useEffect } from "react";
import QuestionForm from "./components/QuestionForm";
import MessageHistory from "./components/MessageHistory";
import { useLocalHistory } from "./hooks/useLocalHistory";

function App() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useLocalHistory();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const systemPrompt = {
        role: "system",
        content: "Eres un asistente útil en programación.",
      };
      const messages = [
        systemPrompt,
        ...history
          .slice()
          .reverse()
          .flatMap((item) => [
            { role: "user", content: item.question },
            { role: "assistant", content: item.answer },
          ]),
        { role: "user", content: question },
      ];

      const response = await fetch("http://localhost:3000/api/questions/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          tts: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { answer, audio } = data;
        if (audio) {
          const audioBlob = new Blob(
            [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
            { type: "audio/mpeg" }
          );
          const audioUrl = URL.createObjectURL(audioBlob);
          const audioObj = new Audio(audioUrl);
          audioObj.play();
        }
        const newHistory = [{ question, answer }, ...history];
        setHistory(newHistory);
        setQuestion("");
      } else {
        setError("Error obteniendo respuesta del servidor");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 p-4">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-5 flex-1 items-center justify-center">
          {history.length > 0 ? (
            <MessageHistory history={history} messagesEndRef={messagesEndRef} />
          ) : (
            <h2 className="text-2xl font-bold">Tu profesor de programación</h2>
          )}
          <QuestionForm
            loading={loading}
            question={question}
            setQuestion={setQuestion}
            handleSummit={handleSubmit}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
