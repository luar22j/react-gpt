interface QuestionFormProps {
  loading: boolean;
  question: string;
  setQuestion: (question: string) => void;
  handleSummit: (e: React.FormEvent) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  loading,
  question,
  setQuestion,
  handleSummit,
}) => {
  return (
    <form
      className="flex flex-col items-center justify-center sm:flex-row gap-5 w-full"
      onSubmit={handleSummit}
    >
      <input
        type="text"
        name="question"
        value={question}
        className="border border-gray-300 rounded p-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Haz una pregunta"
        required
      />
      <button
        className={`w-full sm:w-auto bg-blue-500 shadow text-white px-4 py-2 rounded transition-all duration-300 ${
          loading
            ? "opacity-50 hover:cursor-default hover:bg-blue-500"
            : "hover:cursor-pointer hover:bg-blue-700 hover:shadow-md"
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Consultando..." : "Preguntar"}
      </button>
    </form>
  );
};

export default QuestionForm;
