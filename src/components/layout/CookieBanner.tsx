"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent-accepted";

/**
 * Баннер уведомления об использовании cookie и Яндекс.Метрики.
 * Согласие хранится в localStorage — это не критичные персональные данные,
 * а лишь флаг показа баннера, поэтому localStorage здесь допустим.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  function accept() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-700 bg-ink-900/98 px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-ink-600">
          Мы используем файлы cookie и сервис Яндекс.Метрика для аналитики и
          улучшения работы сайта. Продолжая пользоваться сайтом, вы
          соглашаетесь с этим. Подробнее —{" "}
          <Link href="/privacy-policy" className="text-electric hover:underline">
            в политике конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
