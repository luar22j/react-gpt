import { useState } from "react";
import { askQuestion } from "./api/questions";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await askQuestion(question);
      setAnswer(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Haz una pregunta de programación"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Consultando..." : "Preguntar"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {answer && (
        <div>
          <h3>Respuesta:</h3>
          <pre>{answer}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
