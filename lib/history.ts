export interface HistoryItem {
  id: string;
  companyName: string;
  jobTitle: string;
  experience: string;
  tone: string;
  letter: string;
  createdAt: number;
}

const STORAGE_KEY = "covercraft_history";

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(item: HistoryItem) {
  if (typeof window === "undefined") return;
  const history = loadHistory();
  const updated = [item, ...history].slice(0, 8);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function findHistoryItem(id: string): HistoryItem | undefined {
  return loadHistory().find((x) => x.id === id);
}
