import { useState, useRef, useEffect } from "react";
import { askQuestion as askQuestionAPI } from "./api/questions";
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
      const res = await askQuestionAPI(messages);

      const response = await fetch("http://localhost:3000/api/questions/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: messages[messages.length - 1].content },
          ],
          tts: true,
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
      const newHistory = [{ question, answer: res }, ...history];
      setHistory(newHistory);
      setQuestion("");
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
