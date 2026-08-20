// Единый конфиг контента сайта. Меняйте тексты, цены, телефоны и реквизиты
// здесь — компоненты никогда не хранят контент "зашитым" в разметке.
//
// Название, телефоны, адрес и ключевые факты (стаж, гарантия, ссылка на
// отзывы) взяты с реального сайта COOLiNAUTO. ИНН/ОГРН и юр. название —
// заглушки (см. пометку ниже): их не было на исходном сайте, настоящие
// реквизиты нужно вписать перед запуском — не изобретайте их сами.

import type {
  AdvantageItem,
  Brand,
  CaseItem,
  FaqItem,
  GearboxPriceItem,
  RepairVariant,
  ReviewItem,
  ServiceItem,
  StatItem,
  SymptomItem,
  WorkStage,
} from "./types";

export const company = {
  // На исходном сайте реквизиты юрлица не публиковались — заполнить перед запуском,
  // не изобретать ИНН/ОГРН самостоятельно.
  legalName: "[реквизиты юрлица уточняются]", // TODO: реальное юрлицо/ИП
  brandName: "COOLiNAUTO",
  fullBrandName: "COOLiNAUTO — АКПП Технология Ремонта",
  inn: "[уточняется]", // TODO: вписать реальный ИНН перед запуском
  ogrn: "[уточняется]", // TODO: вписать реальный ОГРН/ОГРНИП перед запуском
  legalAddress: "г. Москва, Автомобильный проезд, д. 10, к. 14",
  actualAddress: "г. Москва, Автомобильный проезд, д. 10, к. 14",
  // Второй филиал — Санкт-Петербург (третий филиал упоминается на исходном
  // сайте, но его адрес там не был указан).
  secondAddress: "г. Санкт-Петербург, ул. Пражская, д. 8, к. 1",
  workHours: "Пн–Сб, 10:00–19:00",
  towHours: "Эвакуация и приём автомобиля в ремонт — круглосуточно",
  // Телефон и email не выводятся напрямую в разметке в нескольких местах —
  // только через компонент PhoneReveal / mailto-ссылку из этого конфига,
  // чтобы затруднить автоматический сбор парсерами.
  phoneDisplay: "+7 (495) 215-50-14",
  phoneHref: "tel:+74952155014",
  phoneDisplaySecondary: "+7 (911) 000-96-20", // Санкт-Петербург
  phoneHrefSecondary: "tel:+79110009620",
  whatsappHref: "https://wa.me/79110009620",
  telegramHref: "https://t.me/coolinauto", // TODO: проверить реальную ссылку на Telegram
  email: "info@coolinauto.ru", // TODO: проверить реальный email
  cities: ["Москва", "Санкт-Петербург"],
  yandexRating: "5.0",
  yandexMapsReviewsUrl: "https://yandex.ru/maps/org/akpp_tekhnologiya_remonta/49877891929/",
  twoGisReviewsUrl: "", // TODO: добавить ссылку на 2ГИС, если есть
  mapEmbedSrc: "", // TODO: вставить ссылку на встраиваемую карту (Яндекс.Карты / 2ГИС iframe)
  yearsOnMarket: 15,
  warrantyYears: 3,
  repairDays: "1–3 дня",
  expressRepairNote: "Есть услуга «Ремонт за 24 часа» для срочных случаев",
  gearboxesRepaired: 7237,
  happyClients: 11780,
  regionsServed: 41,
  branchesCount: 3,
  liftsCount: 6,
  specialistsCount: 20,
  facilityAreaM2: 1350,
};

export const heroContent = {
  title: "Ремонт вариатора за 1–3 дня",
  subtitle:
    "Специализированный сервисный центр — более 15 лет опыта. Бесплатная диагностика. Гарантия до 3 лет без ограничения пробега.",
  citiesNote: `Работаем в городах: ${company.cities.join(", ")}. ${company.workHours}`,
  ctaLabel: "Записаться на бесплатную диагностику",
};

export const services: ServiceItem[] = [
  {
    slug: "oil-change",
    title: "Замена масла в вариаторе",
    priceFrom: 14000,
    unit: "₽ частичная / от 20 000 ₽ полная",
    description:
      "Частичная или полная замена масла «под ключ» — с чисткой магнитов поддона, заменой фильтра тонкой очистки и уплотнительного кольца.",
    details: [
      "Частичная замена — от 14 000 ₽",
      "Полная замена — от 20 000 ₽",
      "Компьютерная диагностика после замены — бонусом",
    ],
  },
  {
    slug: "cvt-repair",
    title: "Ремонт вариатора (CVT)",
    priceFrom: 8000,
    unit: "₽",
    description:
      "Ремонт вариатора Jatco любой сложности: от локального ремонта до полной переборки. Есть услуга «Ремонт за 24 часа» для срочных случаев.",
    details: [
      "Бесплатная дефектовка при ремонте у нас",
      "Точная стоимость определяется после дефектовки",
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
      "Компьютерная диагностика и тестовый заезд с выдачей точной сметы на ремонт.",
    details: [
      "Считывание и расшифровка ошибок",
      "Проверка адаптаций и давления в системе",
      "Смета не меняется после дефектовки без согласования",
    ],
  },
];

export const workStages: WorkStage[] = [
  {
    title: "Диагностика",
    description: "Компьютерная диагностика и тестовый заезд, чтобы понять характер неисправности.",
  },
  {
    title: "Дефектовка",
    description: "Снимаем вариатор, полностью разбираем и определяем, какие детали вышли из строя.",
  },
  {
    title: "Расчёт стоимости",
    description: "Определяем нужные запчасти и согласовываем с вами точную стоимость ремонта.",
  },
  {
    title: "Ремонт вариатора",
    description: "Заменяем детали, вышедшие из строя по результатам дефектовки. Можно присутствовать лично.",
  },
  {
    title: "Сборка и установка",
    description: "Собираем агрегат и устанавливаем его обратно на автомобиль.",
  },
  {
    title: "Обкатка",
    description: "Обкатываем автомобиль, проводим повторную диагностику и проверяем работу во всех режимах.",
  },
];

export const workStagesNote =
  "Цена не меняется после дефектовки без вашего согласования — это правило работы нашего сервиса.";

// Список марок и моделей — по факту с реального сайта компании (раздел
// «Марка и модель авто»). Основные марки — с подробным списком моделей,
// остальные — в secondaryBrands ниже (тоже принимаются в ремонт, но без
// заявленной специализации по конкретным кодам коробок).
export const brands: Brand[] = [
  {
    slug: "nissan",
    name: "Nissan",
    models: "X-Trail, Murano, Qashqai, Teana, Juke, Pathfinder, Tiida, Sentra, Altima, Elgrand",
    gearboxCodes: ["JF010E", "JF011E", "JF015E", "JF016E", "JF017E"],
    description:
      "Ремонт вариаторов Nissan / Renault-Nissan Alliance — самых массовых CVT на рынке.",
    logoAlt: "Логотип Nissan",
  },
  {
    slug: "infiniti",
    name: "Infiniti",
    models: "QX60, JX35",
    gearboxCodes: ["JF010E", "JF011E", "JF018E"],
    description: "Ремонт вариаторов Infiniti — тех же семейств Jatco, что и на Nissan.",
    logoAlt: "Логотип Infiniti",
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    models: "Outlander, ASX, Eclipse Cross, Lancer, Delica",
    gearboxCodes: ["JF011E", "JF015E", "F1CJC"],
    description: "Ремонт вариаторов Mitsubishi всех поколений.",
    logoAlt: "Логотип Mitsubishi",
  },
  {
    slug: "renault",
    name: "Renault",
    models: "Kaptur, Koleos, Fluence, Megane, Scenic, Arkana, Duster",
    gearboxCodes: ["JF017E", "JF018E"],
    description: "Ремонт вариаторов Renault на платформе альянса Renault-Nissan.",
    logoAlt: "Логотип Renault",
  },
  {
    slug: "peugeot-citroen",
    name: "Peugeot / Citroën",
    models: "Peugeot 4007, 4008, Citroën C4 Aircross, C-Crosser",
    gearboxCodes: ["JF011E"],
    description: "Ремонт вариаторов на моделях, построенных на платформе Mitsubishi Outlander.",
    logoAlt: "Логотипы Peugeot и Citroën",
  },
  {
    slug: "jeep-dodge",
    name: "Jeep / Dodge",
    models: "Jeep Liberty, Compass, Patriot, Dodge Caliber",
    gearboxCodes: ["JF011E"],
    description: "Ремонт вариаторов на моделях альянса с Mitsubishi.",
    logoAlt: "Логотипы Jeep и Dodge",
  },
  {
    slug: "toyota-lexus",
    name: "Toyota / Lexus",
    models: "Toyota RAV4, Corolla, Camry, Lexus NX 200, UX 200",
    gearboxCodes: [],
    description: "Ремонт вариаторов Toyota и Lexus.",
    logoAlt: "Логотипы Toyota и Lexus",
  },
  {
    slug: "kia",
    name: "Kia",
    models: "Seltos, Soul, Cerato",
    gearboxCodes: [],
    description: "Ремонт вариаторов Kia.",
    logoAlt: "Логотип Kia",
  },
];

// Дополнительные марки, которые тоже принимаются в ремонт (указаны на
// исходном сайте), но без детального списка моделей на карточках.
export const secondaryBrands =
  "Hyundai, Suzuki, Chery, Geely, Omoda, Exeed, Lifan, JAC, Lada, Москвич";

// Модели других марок на тех же платформах альянса (Mitsubishi/Renault-Nissan) —
// используют те же коробки Jatco JF0xx, поэтому тоже подлежат ремонту.

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
    brand: "Infiniti",
    model: "QX60",
    gearboxCode: "JF010E",
    problem: "Гул на скорости 60+ км/ч, перегрев",
    workDone: "Замена подшипников, промывка радиатора, замена масла",
    durationDays: 1,
    price: 32000,
    photoBeforeAlt: "[Заменить на реальное фото: вариатор Infiniti QX60 до ремонта]",
    photoAfterAlt: "[Заменить на реальное фото: вариатор Infiniti QX60 после ремонта]",
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

// Примеры формата отзывов (текст иллюстративный) — настоящие отзывы
// смотрите по ссылке company.yandexMapsReviewsUrl, которая ведёт на
// реальную страницу компании на Яндекс.Картах.
export const reviews: ReviewItem[] = [
  {
    id: "review-1",
    author: "Алексей М.",
    carModel: "Nissan Qashqai",
    rating: 5,
    text: "Машина дёргалась при разгоне, боялся, что вариатор под замену целиком. В итоге обошлось заменой ремня и масла — сделали за два дня, цена не менялась с той, что назвали после диагностики.",
    date: "2026-05-10",
  },
  {
    id: "review-2",
    author: "Ирина С.",
    carModel: "Infiniti QX60",
    rating: 5,
    text: "Гудела коробка на трассе. Диагностику сделали бесплатно в тот же день, объяснили причину на пальцах. Забрала машину на следующий день — тихо, как раньше.",
    date: "2026-04-22",
  },
  {
    id: "review-3",
    author: "Дмитрий К.",
    carModel: "Mitsubishi Outlander",
    rating: 4,
    text: "Коробка встала в аварийный режим по дороге на дачу. Приехал эвакуатор от сервиса, переборка заняла 4 дня. Дороговато вышло, но с гарантией на 3 года — спокойнее.",
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
  { label: "дня — средний ремонт", value: company.repairDays },
  { label: "года гарантии", value: `до ${company.warrantyYears}` },
];

// Цены по моделям вариаторов Jatco (JF0xx) — Nissan, Infiniti, Mitsubishi,
// Renault. Ориентир, актуальная цена всегда определяется после бесплатной
// дефектовки. Три столбца: локальный ремонт / ремонт (профилактика) / капремонт.
export const gearboxPricing: GearboxPriceItem[] = [
  { code: "JF010E", generation: "Nissan / Infiniti", localRepairFrom: 13000, fullRepairFrom: 100000, overhaulFrom: 300000 },
  { code: "JF011E", generation: "Nissan / Infiniti", localRepairFrom: 8000, fullRepairFrom: 109000, overhaulFrom: 215000 },
  { code: "JF015E", generation: "Nissan / Mitsubishi", localRepairFrom: 8000, fullRepairFrom: 100000, overhaulFrom: 252000 },
  { code: "JF016E", generation: "Nissan / Mitsubishi", localRepairFrom: 8000, fullRepairFrom: 200000, overhaulFrom: 370000 },
  { code: "JF017E", generation: "Nissan / Renault", localRepairFrom: 13000, fullRepairFrom: 200000, overhaulFrom: 370000 },
  { code: "JF018E / JF019E", generation: "Nissan / Infiniti / Renault", localRepairFrom: 13000, fullRepairFrom: 200000, overhaulFrom: 420000 },
];

export const repairVariants: RepairVariant[] = [
  {
    title: "Профилактический ремонт",
    description: "Плановое обслуживание без замены силовых узлов — предотвращает развитие серьёзной неисправности.",
    works: [
      "Снятие и разборка вариатора",
      "Мойка и дефектовка узлов",
      "Замена сальника гидротрансформатора и сальников приводов",
      "Замена комплекта тефлоновых уплотнений",
      "Замена клапана масляного насоса",
      "Замена масляного фильтра и трансмиссионного масла",
      "Сборка",
    ],
    parts: [
      "Трансмиссионное масло (полный объём)",
      "Сальник ГДТ, сальники приводов",
      "Комплект тефлоновых уплотнений",
      "Клапан масляного насоса",
      "Масляный фильтр АКПП",
    ],
  },
  {
    title: "Капитальный ремонт",
    description: "Полная переборка с заменой всех изношенных силовых элементов — когда профилактики уже недостаточно.",
    works: [
      "Полная разборка и дефектовка",
      "Ремонт гидротрансформатора",
      "Замена толкающего ремня и конусов",
      "Замена или ремонт гидроблока",
      "Замена фрикционных и стальных дисков",
      "Замена подшипников, втулок и обрезиненных поршней",
      "Замена масляного насоса, фильтра и трансмиссионного масла",
      "Сборка и обкатка",
    ],
    parts: [
      "Толкающий ремень, конусы",
      "Масляный насос, втулка первичного вала",
      "Поршни пакетов сцепления (вперёд/назад)",
      "Сальник ГДТ, сальники приводов",
      "Комплект тефлоновых уплотнений",
      "Масляный фильтр, трансмиссионное масло",
    ],
  },
];

export const symptoms: SymptomItem[] = [
  {
    title: "Гул или шум при движении",
    priceFrom: 8000,
    priceTo: 74000,
    description: "Часто связано с износом подшипников на конусах или потерей свойств масла. Требует диагностики для точной причины.",
  },
  {
    title: "Машина не едет вперёд",
    priceFrom: 37000,
    priceTo: 74000,
    description: "Возможен обрыв элемента планетарного ряда. Точная стоимость — после дефектовки.",
  },
  {
    title: "Машина не едет ни вперёд, ни назад",
    priceFrom: 94000,
    priceTo: 150000,
    description: "Часто связано с обрывом ремня или разрушением гидротрансформатора — серьёзная неисправность.",
  },
  {
    title: "Пробуксовки при наборе скорости",
    priceFrom: 120000,
    priceTo: 150000,
    description: "Пробуксовка ремня относительно конусов на разгоне — требует максимальных вложений среди типовых неисправностей.",
  },
];

export const advantages: AdvantageItem[] = [
  { title: "Специализация именно на CVT", description: "Не универсальный автосервис, а фокус на вариаторах и их особенностях." },
  { title: "Опыт на рынке", description: `Работаем более ${company.yearsOnMarket} лет, знаем типовые болезни каждой модели.` },
  { title: "Прозрачная смета", description: "Показываем цену после дефектовки и не меняем её без вашего согласия." },
  { title: "Гарантия на ремонт", description: `До ${company.warrantyYears} лет без ограничения пробега.` },
  { title: "Ремонт, а не замена на контрактную", description: "Восстанавливаем узел с новыми деталями вместо непроверенной б/у коробки." },
  { title: "Можно присутствовать при ремонте", description: "Дефектовка и сборка — при вас, если это важно." },
];

// Реальный руководитель компании. Фото пока не загружено — добавить
// реальный портрет, когда он будет предоставлен (сейчас используется
// нейтральная иконка-заглушка вместо фото).
export const founder = {
  name: "Антон Кулин",
  role: `Руководитель ${company.fullBrandName}`,
  quote: "БУ вариатор или контрактная коробка — это всегда «кот в мешке». Мы ремонтируем вариатор, а не меняем его на непроверенный.",
  bio: `Специализированный сервисный центр по ремонту вариаторов — более ${company.yearsOnMarket} лет опыта и репутации на рынке Москвы.`,
};

export const extraStats: StatItem[] = [
  { value: `${company.yearsOnMarket}+`, label: "лет практического опыта" },
  { value: `${company.gearboxesRepaired.toLocaleString("ru-RU")}+`, label: "отремонтированных вариаторов" },
  { value: `${company.happyClients.toLocaleString("ru-RU")}+`, label: "довольных клиентов" },
  { value: `${company.regionsServed}`, label: "регионов РФ среди клиентов" },
];
