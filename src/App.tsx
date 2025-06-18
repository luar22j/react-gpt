import { useState, useEffect } from "react";
import { askQuestion as askQuestionAPI } from "./api/questions";
import QuestionForm from "./components/QuestionForm";
import HistoryDrawer from "./components/HistoryDrawer";

interface HistoryItem {
  question: string;
  answer: string;
}

function App() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("questionHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

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
      const newHistory = [{ question, answer: res }, ...history];
      setHistory(newHistory);
      localStorage.setItem("questionHistory", JSON.stringify(newHistory));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 p-4">
      <HistoryDrawer
        open={drawerOpen}
        onToggle={() => setDrawerOpen((v) => !v)}
        history={history}
      />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-5 flex-1 items-center justify-center">
          {history.length > 0 ? (
            <div className="flex flex-col w-full max-w-1/2 gap-3 mb-4">
              {history
                .slice()
                .reverse()
                .map((item, idx) => (
                  <div key={idx} className="bg-white p-3 rounded shadow-md">
                    <div className="font-semibold text-blue-700">
                      Q: {item.question}
                    </div>
                    <div className="text-gray-800">A: {item.answer}</div>
                  </div>
                ))}
            </div>
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
