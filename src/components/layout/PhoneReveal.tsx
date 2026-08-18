"use client";

import { useState } from "react";
import { company } from "@/lib/site-config";

/**
 * Показывает телефон только по клику пользователя, а не сразу в разметке.
 * Это усложняет автоматический сбор номера парсерами контактов на странице.
 */
export function PhoneReveal({ className }: { className?: string }) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <a href={company.phoneHref} className={className}>
        {company.phoneDisplay}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className={className}
    >
      Показать номер телефона
    </button>
  );
}
