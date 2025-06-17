import React, { useState } from "react";

interface HistoryDrawerProps {
  open: boolean;
  onToggle: () => void;
  history: string[];
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  open,
  onToggle,
  history,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle();
  };

  return (
    <>
      {!isOpen ? (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded bg-white shadow hover:bg-gray-100 focus:outline-none"
          onClick={handleToggle}
          aria-label="Mostrar historial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleToggle}
          className="fixed top-4 left-4 z-50 p-2 rounded bg-white shadow hover:bg-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-14 flex flex-col gap-1">
          <h2 className="font-bold">Historial</h2>
          <ul className="text-sm space-y-2">
            {history.length === 0 && (
              <li className="text-gray-400">Sin preguntas</li>
            )}
            {history.map((q, i) => (
              <li key={i} title={q}>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30" onClick={onToggle} />}
    </>
  );
};

export default HistoryDrawer;
