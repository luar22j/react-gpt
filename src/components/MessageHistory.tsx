import React from "react";
import "../style/style.css";

interface HistoryItem {
  question: string;
  answer: string;
}

interface MessageHistoryProps {
  history: HistoryItem[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageHistory: React.FC<MessageHistoryProps> = ({
  history,
  messagesEndRef,
}) => (
  <div
    className="relative w-full lg:max-w-1/2 mb-4"
    style={{ maxHeight: "60vh" }}
  >
    <div
      className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide"
      style={{ maxHeight: "60vh" }}
    >
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
      <div ref={messagesEndRef} />
    </div>
    <div
      className="pointer-events-none absolute -top-[45px] left-0 w-full h-16"
      style={{
        background:
          "linear-gradient(to bottom, #f3f4f6 70%, rgba(243,244,246,0) 100%)",
      }}
    />
    <div
      className="pointer-events-none absolute -bottom-[40px] left-0 w-full h-16"
      style={{
        background:
          "linear-gradient(to top, #f3f4f6 70%, rgba(243,244,246,0) 100%)",
      }}
    />
  </div>
);

export default MessageHistory;
