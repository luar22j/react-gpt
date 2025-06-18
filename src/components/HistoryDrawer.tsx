import React from "react";

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
  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-white shadow hover:bg-gray-100 hover:cursor-pointer focus:outline-none transition-all duration-300 w-10 h-10"
        onClick={onToggle}
        aria-label={open ? "Ocultar historial" : "Mostrar historial"}
        style={{ position: "fixed" }}
      >
        <span className="relative w-full h-full block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 transition-opacity duration-100 absolute inset-0 m-auto ${
              open ? "opacity-0" : "opacity-100"
            }`}
            style={{ pointerEvents: open ? "none" : "auto" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 transition-opacity duration-100 absolute inset-0 m-auto ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </button>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-14 flex flex-col gap-1">
          <h2 className="font-bold">Historial</h2>
          <div className="text-sm">
            {history.length === 0 && (
              <p className="text-gray-400">Sin preguntas</p>
            )}
            {history.map((q, i) => (
              <button
                key={i}
                className="w-full text-left hover:bg-gray-100 hover:cursor-pointer p-2 rounded hover:shadow transition-all duration-300"
                onClick={() => onToggle()}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30" onClick={onToggle} />}
    </>
  );
};

export default HistoryDrawer;
