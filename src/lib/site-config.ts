// Единый конфиг контента сайта. Меняйте тексты, цены, телефоны и реквизиты
// здесь — компоненты никогда не хранят контент "зашитым" в разметке.
//
// Все значения в [квадратных скобках] — плейсхолдеры. Замените их на
// реальные данные клиента перед запуском в production.

import type {
  Brand,
  CaseItem,
  FaqItem,
  ReviewItem,
  ServiceItem,
  WorkStage,
} from "./types";

export const company = {
  legalName: "ООО «[Название компании]»",
  brandName: "[АвтоВариатор]",
  inn: "[0000000000]",
  ogrn: "[0000000000000]",
  legalAddress: "[г. Город, ул. Улица, д. 0]",
  actualAddress: "[г. Город, ул. Улица, д. 0, СТО]",
  workHours: "Ежедневно, 9:00–21:00",
  // Телефон и email не выводятся напрямую в разметке в нескольких местах —
  // только через компонент PhoneReveal / mailto-ссылку из этого конфига,
  // чтобы затруднить автоматический сбор парсерами.
  phoneDisplay: "+7 (000) 000-00-00",
  phoneHref: "tel:+70000000000",
  whatsappHref: "https://wa.me/70000000000",
  telegramHref: "https://t.me/[username]",
  email: "info@[domain].ru",
  cities: ["[Город 1]", "[Город 2]", "[Город 3]"],
  yandexMapsReviewsUrl: "https://yandex.ru/maps/[org-id]/reviews/",
  twoGisReviewsUrl: "https://2gis.ru/[city]/firm/[firm-id]/tab/reviews",
  mapEmbedSrc: "", // TODO: вставить ссылку на встраиваемую карту (Яндекс.Карты / 2ГИС iframe)
  yearsOnMarket: 12,
  gearboxesRepaired: 3400,
  warrantyYears: 3,
};

export const heroContent = {
  title: "Ремонт вариаторов за 24 часа",
  subtitle:
    "Бесплатная диагностика. Гарантия до 3 лет без ограничения пробега.",
  citiesNote: `Работаем в городах: ${company.cities.join(", ")}`,
  ctaLabel: "Записаться на бесплатную диагностику",
};

export const services: ServiceItem[] = [
  {
    slug: "oil-change",
    title: "Замена масла в вариаторе",
    priceFrom: 14000,
    unit: "₽",
    description:
      "Полная замена масла методом аппаратной прокачки с заменой фильтра.",
    details: [
      "Аппаратная замена (до 90% старого масла)",
      "Замена фильтра и прокладки поддона",
      "Диагностика адаптаций коробки после замены",
    ],
  },
  {
    slug: "cvt-repair",
    title: "Ремонт вариатора (CVT)",
    priceFrom: 20000,
    unit: "₽",
    description:
      "Ремонт вариатора любой сложности: от замены ремня и конусов до полной переборки.",
    details: [
      "Бесплатная дефектовка при ремонте у нас",
      "Оригинальные и качественные аналоговые запчасти",
      "Гарантия до 3 лет без ограничения пробега",
    ],
  },
  {
    slug: "at-repair",
    title: "Ремонт АКПП",
    priceFrom: 25000,
    unit: "₽",
    description: "Диагностика и ремонт классических автоматических коробок передач.",
    details: [
      "Компьютерная диагностика блока управления",
      "Ремонт гидроблока, замена фрикционов",
      "Тест-драйв после ремонта",
    ],
  },
  {
    slug: "diagnostics",
    title: "Диагностика коробки передач",
    priceFrom: 0,
    unit: "бесплатно",
    description:
      "Компьютерная и механическая диагностика с выдачей точной сметы на ремонт.",
    details: [
      "Считывание и расшифровка ошибок",
      "Проверка адаптаций и давления в системе",
      "Смета не меняется после дефектовки без согласования",
    ],
  },
];

export const workStages: WorkStage[] = [
  {
    title: "Заявка",
    description: "Оставляете заявку на сайте или звоните — перезваниваем в течение 10 минут.",
  },
  {
    title: "Бесплатная диагностика",
    description: "Приезжаете в сервис или вызываете эвакуатор — диагностика бесплатна в любом случае.",
  },
  {
    title: "Согласование сметы",
    description: "Показываем реальную стоимость ремонта и согласовываем её с вами до начала работ.",
  },
  {
    title: "Ремонт",
    description: "Выполняем ремонт в оговорённый срок — в среднем от 1 до 5 дней.",
  },
  {
    title: "Гарантия",
    description: "Выдаём гарантийный талон на срок до 3 лет без ограничения пробега.",
  },
];

export const workStagesNote =
  "Цена не меняется после дефектовки без вашего согласования — это правило работы нашего сервиса.";

export const brands: Brand[] = [
  {
    slug: "nissan",
    name: "Nissan",
    models: "Qashqai, X-Trail, Teana, Murano, Note",
    gearboxCodes: ["JF011E", "JF015E", "JF016E"],
    description:
      "Ремонт вариаторов Nissan / Renault-Nissan Alliance JF011E, JF015E — самых массовых CVT на рынке.",
    logoAlt: "Логотип Nissan",
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    models: "Outlander, ASX, Lancer",
    gearboxCodes: ["JF011E", "F1CJC"],
    description: "Ремонт вариаторов Mitsubishi всех поколений.",
    logoAlt: "Логотип Mitsubishi",
  },
  {
    slug: "toyota",
    name: "Toyota",
    models: "Corolla, RAV4, C-HR",
    gearboxCodes: ["K313", "K111"],
    description: "Ремонт вариаторов Toyota / Lexus серии K3.",
    logoAlt: "Логотип Toyota",
  },
  {
    slug: "renault",
    name: "Renault",
    models: "Kaptur, Sandero, Duster",
    gearboxCodes: ["JF011E", "DP0"],
    description: "Ремонт вариаторов и коробок Renault.",
    logoAlt: "Логотип Renault",
  },
  {
    slug: "honda",
    name: "Honda",
    models: "CR-V, Civic, Accord",
    gearboxCodes: ["K1M7"],
    description: "Ремонт вариаторов Honda.",
    logoAlt: "Логотип Honda",
  },
  {
    slug: "subaru",
    name: "Subaru",
    models: "Forester, Outback, XV",
    gearboxCodes: ["TR580"],
    description: "Ремонт вариаторов Subaru Lineartronic.",
    logoAlt: "Логотип Subaru",
  },
];

export const cases: CaseItem[] = [
  {
    id: "case-1",
    brand: "Nissan",
    model: "Qashqai",
    gearboxCode: "JF015E",
    problem: "Рывки при разгоне, ошибка проскальзывания ремня",
    workDone: "Замена ремня, шкивов, масла и фильтра",
    durationDays: 2,
    price: 45000,
    photoBeforeAlt: "[Заменить на реальное фото: вариатор Nissan Qashqai до ремонта]",
    photoAfterAlt: "[Заменить на реальное фото: вариатор Nissan Qashqai после ремонта]",
  },
  {
    id: "case-2",
    brand: "Toyota",
    model: "RAV4",
    gearboxCode: "K313",
    problem: "Гул на скорости 60+ км/ч, перегрев",
    workDone: "Замена подшипников, промывка радиатора, замена масла",
    durationDays: 1,
    price: 32000,
    photoBeforeAlt: "[Заменить на реальное фото: вариатор Toyota RAV4 до ремонта]",
    photoAfterAlt: "[Заменить на реальное фото: вариатор Toyota RAV4 после ремонта]",
  },
  {
    id: "case-3",
    brand: "Mitsubishi",
    model: "Outlander",
    gearboxCode: "JF011E",
    problem: "Коробка не переключается, аварийный режим",
    workDone: "Полная переборка, замена гидроблока",
    durationDays: 4,
    price: 78000,
    photoBeforeAlt: "[Заменить на реальное фото: вариатор Mitsubishi Outlander до ремонта]",
    photoAfterAlt: "[Заменить на реальное фото: вариатор Mitsubishi Outlander после ремонта]",
  },
];

export const reviews: ReviewItem[] = [
  {
    id: "review-1",
    author: "[Имя клиента — заменить на реальное]",
    carModel: "Nissan Qashqai",
    rating: 5,
    text: "[Текст отзыва — заменить на реальный]",
    date: "2026-05-10",
  },
  {
    id: "review-2",
    author: "[Имя клиента — заменить на реальное]",
    carModel: "Toyota RAV4",
    rating: 5,
    text: "[Текст отзыва — заменить на реальный]",
    date: "2026-04-22",
  },
  {
    id: "review-3",
    author: "[Имя клиента — заменить на реальное]",
    carModel: "Mitsubishi Outlander",
    rating: 4,
    text: "[Текст отзыва — заменить на реальный]",
    date: "2026-03-15",
  },
];

export const faq: FaqItem[] = [
  {
    question: "Сколько стоит диагностика вариатора?",
    answer:
      "Диагностика бесплатна при обращении по любому каналу связи с сайта — по телефону, WhatsApp, Telegram или через форму заявки.",
  },
  {
    question: "Сколько по времени занимает ремонт?",
    answer:
      "В среднем от 1 до 5 дней в зависимости от сложности. Точный срок называем после дефектовки и согласуем с вами заранее.",
  },
  {
    question: "Даёте ли вы гарантию?",
    answer: `Да, гарантия на ремонт — до ${company.warrantyYears} лет без ограничения пробега, в зависимости от вида работ.`,
  },
  {
    question: "Изменится ли цена после разборки коробки?",
    answer:
      "Нет. Финальная смета согласуется с вами до начала ремонтных работ и не меняется без вашего подтверждения.",
  },
  {
    question: "Можно ли пригнать автомобиль своим ходом, если коробка не работает?",
    answer:
      "Да, при необходимости поможем с эвакуацией автомобиля до сервиса — уточните детали у мастера по телефону.",
  },
];

export const trustBadges = [
  { label: "лет на рынке", value: `${company.yearsOnMarket}+` },
  { label: "отремонтированных коробок", value: `${company.gearboxesRepaired}+` },
  { label: "года гарантии", value: `до ${company.warrantyYears}` },
];
