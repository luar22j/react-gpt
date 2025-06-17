import { useState, useEffect } from "react";
import { askQuestion } from "./api/questions";
import QuestionForm from "./components/QuestionForm";
import HistoryDrawer from "./components/HistoryDrawer";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("questionHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await askQuestion(question);
      setAnswer(res);
      const newHistory = [question, ...history];
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
          {answer ? (
            <div className="flex flex-col justify-center w-full max-w-1/2 bg-white p-4 rounded shadow-md">
              <h3 className="bold">Respuesta:</h3>
              <p>{answer}</p>
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
