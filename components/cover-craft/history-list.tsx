'use client';

import React from "react";
import { HistoryItem } from "@/lib/history";

interface Props {
  items: HistoryItem[];
  activeId: string | null;
  onSelect: (item: HistoryItem) => void;
}

export function HistoryList({ items, activeId, onSelect }: Props) {
  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground">
        История пока пустая — сгенерируй письмо!
      </p>
    );
  }

  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className={`p-3 rounded border text-left ${
            activeId === item.id ? "bg-primary/10 border-primary" : "border-border"
          }`}
        >
          <p className="font-medium">{item.companyName}</p>
          <p className="text-xs text-muted-foreground">{item.jobTitle}</p>
        </button>
      ))}
    </div>
  );
}
