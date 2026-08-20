# Сайт автосервиса по ремонту вариаторов (CVT) и АКПП

Продающий сайт на Next.js (App Router) + TypeScript + Tailwind CSS: лендинг,
страницы услуг и марок, кейсы, отзывы, юридические страницы по 152-ФЗ.

## Стек

- Next.js 14 (App Router, SSG для SEO-страниц)
- TypeScript
- Tailwind CSS
- next/image (WebP, ленивая загрузка)

## Запуск локально

```bash
npm install
cp .env.example .env.local   # заполните переменные окружения
npm run dev
```

## Структура проекта

```
src/
  app/                    страницы (App Router) и API-роуты
    api/lead/             заявка с любой формы сайта
    api/prediagnosis/     ИИ-предиагностика (заглушка под LLM)
    brands/[brand]/       страницы марок, генерируются из site-config.ts
    privacy-policy/       политика конфиденциальности (152-ФЗ)
    consent/              согласие на обработку персональных данных
  components/
    layout/                Header, Footer, CookieBanner, FloatingActions
    home/                   блоки главной страницы
    forms/                  LeadForm, ConsentCheckbox, Honeypot, SmartCaptcha
    schema/                 JSON-LD (Schema.org)
  lib/
    site-config.ts          ЕДИНЫЙ конфиг контента — телефоны, цены, услуги,
                             марки, отзывы, кейсы, реквизиты
    types.ts                общие типы (Lead, PrediagnosisResponse и т.д.)
    validators.ts            валидация телефона
    rate-limit.ts            in-memory rate-limit для API форм
```

Весь контент (цены, телефоны, реквизиты, отзывы, кейсы, FAQ) редактируется в
одном месте — `src/lib/site-config.ts`, без необходимости лезть в разметку.

## Чек-лист перед запуском в production

Обязательно замените перед публикацией сайта:

- [ ] Реквизиты компании в `src/lib/site-config.ts` (`company`: название, ИНН, ОГРН, адрес, телефон, email, соцсети)
- [ ] Реальные цены на услуги (`services` в `site-config.ts`)
- [ ] Реальные отзывы вместо плейсхолдеров (`reviews` в `site-config.ts`) — **не публикуйте вымышленные отзывы с реальными именами**
- [ ] Реальные кейсы до/после (`cases` в `site-config.ts`)
- [ ] Фотографии цеха, команды, гарантийного талона и кейсов — см. `public/images/README.md`
- [ ] Домен сайта — заменить `siteUrl` в `src/app/layout.tsx`, `sitemap.ts`, `robots.ts`
- [ ] Номер счётчика Яндекс.Метрики — `NEXT_PUBLIC_YANDEX_METRIKA_ID` в `.env.local`
- [ ] Ключ Яндекс SmartCaptcha — `NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY` / `SMARTCAPTCHA_SERVER_KEY`, подключить скрипт капчи (см. TODO в `src/components/forms/SmartCaptcha.tsx`)
- [ ] Интеграция с CRM (amoCRM / Битрикс24) — `CRM_WEBHOOK_URL`, см. TODO в `src/app/api/lead/route.ts`
- [ ] Telegram-уведомления о заявках — `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, см. TODO в `src/app/api/lead/route.ts`
- [ ] LLM API для ИИ-предиагностики — `LLM_API_KEY`, см. TODO в `src/app/api/prediagnosis/route.ts` (сейчас работает на моковых данных)
- [ ] Текст политики конфиденциальности и согласия на ПД (`src/app/privacy-policy`, `src/app/consent`) — согласовать с юристом
- [ ] Embed-ссылка карты проезда — `company.mapEmbedSrc` в `site-config.ts`
- [ ] Для production вместо in-memory rate-limit (`src/lib/rate-limit.ts`) — подключить внешнее хранилище (Redis/Upstash), если сайт будет работать на нескольких инстансах/serverless

## Прочее

В корне репозитория также лежат `svetofor.py` и `vypiska.py` — отдельные
скрипты из другого проекта (автоматизация обработки банковских выписок),
не связаны с сайтом автосервиса.
