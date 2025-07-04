import React from "react";

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
    className="flex flex-col w-full max-w-1/2 gap-3 mb-4 overflow-y-auto"
    style={{ maxHeight: "60vh" }}
  >
    {history
      .slice()
      .reverse()
      .map((item, idx) => (
        <div key={idx} className="bg-white p-3 rounded shadow-md">
          <div className="font-semibold text-blue-700">Q: {item.question}</div>
          <div className="text-gray-800">A: {item.answer}</div>
        </div>
      ))}
    <div ref={messagesEndRef} />
  </div>
);

export default MessageHistory;
