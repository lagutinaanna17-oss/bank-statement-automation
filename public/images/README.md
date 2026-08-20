# Фотографии для сайта

Перед запуском в production замените плейсхолдеры реальными фотографиями
(WebP или JPG, next/image сам оптимизирует и сожмёт).

| Путь | Что должно быть на фото |
|---|---|
| `workshop-1.jpg` | Рабочая зона цеха с подъёмником |
| `workshop-2.jpg` | Стенд диагностики вариаторов |
| `team-1.jpg` | Команда мастеров сервиса |
| `warranty-card.jpg` | Гарантийный талон |
| `workshop-cover.jpg` | Обложка цеха для Schema.org / соцсетей |
| `og-cover.jpg` | Картинка 1200×630 для Open Graph (превью в соцсетях и мессенджерах) |
| `cases/case-1-before.jpg`, `case-1-after.jpg` | Фото коробки до/после — кейс 1 (см. `src/lib/site-config.ts`) |
| `cases/case-2-before.jpg`, `case-2-after.jpg` | Фото коробки до/после — кейс 2 |
| `cases/case-3-before.jpg`, `case-3-after.jpg` | Фото коробки до/после — кейс 3 |

Список кейсов и их alt-тексты редактируются в `src/lib/site-config.ts` (массив `cases`).
