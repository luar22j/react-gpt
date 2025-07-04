import { useState, useEffect } from "react";

export interface HistoryItem {
  question: string;
  answer: string;
}

export function useLocalHistory(key = "questionHistory") {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setHistory(JSON.parse(stored));
  }, [key]);

  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  };

  return [history, saveHistory] as const;
}
