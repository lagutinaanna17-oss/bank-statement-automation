"use client";

import { useEffect, useRef } from "react";

interface SmartCaptchaProps {
  onToken: (token: string) => void;
}

/**
 * Заготовка виджета Яндекс SmartCaptcha.
 *
 * TODO: подключить SmartCaptcha:
 * 1. Получить sitekey в кабинете https://cloud.yandex.ru/docs/smartcaptcha/
 * 2. Заполнить NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY в .env.local
 * 3. Подключить скрипт https://smartcaptcha.yandexcloud.net/captcha.js в layout
 *    и раскомментировать вызов window.smartCaptcha.render ниже.
 * 4. Проверять captchaToken на сервере через SmartCaptcha Server API
 *    (см. SMARTCAPTCHA_SERVER_KEY в .env.example и api/lead/route.ts).
 */
export function SmartCaptcha({ onToken }: SmartCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    // TODO: window.smartCaptcha.render(containerRef.current, { sitekey: siteKey, callback: onToken })
  }, [siteKey, onToken]);

  if (!siteKey) {
    // Пока ключ не задан — капча не блокирует отправку формы в dev-режиме.
    return null;
  }

  return <div ref={containerRef} className="my-2" />;
}
