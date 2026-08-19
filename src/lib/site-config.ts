// Единый конфиг контента сайта. Меняйте тексты, цены, телефоны и реквизиты
// здесь — компоненты никогда не хранят контент "зашитым" в разметке.
//
// ⚠️ ДЕМО-ДАННЫЕ: название компании, реквизиты, телефон и отзывы ниже —
// правдоподобные примеры для демонстрации вёрстки, а НЕ реальные данные.
// Перед запуском в production замените их на настоящие (чек-лист — в README).

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
  legalName: "ООО «ВариаторПро Сервис»", // ДЕМО — заменить на реальное юрлицо
  brandName: "ВариаторПро",
  inn: "7712345678", // ДЕМО
  ogrn: "1157746123456", // ДЕМО
  legalAddress: "г. Москва, Дмитровское шоссе, д. 15, стр. 2",
  actualAddress: "г. Москва, Дмитровское шоссе, д. 15, стр. 2 (СТО)",
  workHours: "Ежедневно, 9:00–21:00",
  // Телефон и email не выводятся напрямую в разметке в нескольких местах —
  // только через компонент PhoneReveal / mailto-ссылку из этого конфига,
  // чтобы затруднить автоматический сбор парсерами.
  phoneDisplay: "+7 (495) 123-45-67", // ДЕМО
  phoneHref: "tel:+74951234567",
  whatsappHref: "https://wa.me/74951234567",
  telegramHref: "https://t.me/variatorpro",
  email: "info@variatorpro.ru",
  cities: ["Москва", "Санкт-Петербург", "Казань"],
  yandexMapsReviewsUrl: "https://yandex.ru/maps/org/variatorpro/reviews/",
  twoGisReviewsUrl: "https://2gis.ru/moscow/firm/variatorpro/tab/reviews",
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

// ДЕМО-ОТЗЫВЫ для примера вёрстки — обязательно заменить на реальные
// (с Яндекс.Карт / 2ГИС) перед запуском. См. также badge "Демо-отзывы"
// над блоком отзывов на сайте.
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
    carModel: "Toyota RAV4",
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
  { label: "отремонтированных коробок", value: `${company.gearboxesRepaired}+` },
  { label: "года гарантии", value: `до ${company.warrantyYears}` },
];

// Цены по конкретным моделям коробок — ориентир, актуальная цена всегда
// определяется после бесплатной дефектовки.
export const gearboxPricing: GearboxPriceItem[] = [
  { code: "JF010E", generation: "1-е поколение", localRepairFrom: 13000, fullRepairFrom: 60000, overhaulFrom: 130000 },
  { code: "JF011E", generation: "1-е поколение", localRepairFrom: 8000, fullRepairFrom: 45000, overhaulFrom: 95000 },
  { code: "JF015E", generation: "1-е поколение", localRepairFrom: 8000, fullRepairFrom: 42000, overhaulFrom: 90000 },
  { code: "JF016E", generation: "2-е поколение", localRepairFrom: 8000, fullRepairFrom: 55000, overhaulFrom: 140000 },
  { code: "JF017E", generation: "2-е поколение", localRepairFrom: 13000, fullRepairFrom: 60000, overhaulFrom: 150000 },
  { code: "K313 / K111", generation: "Toyota K3", localRepairFrom: 10000, fullRepairFrom: 40000, overhaulFrom: 100000 },
];

export const repairVariants: RepairVariant[] = [
  {
    title: "Профилактический ремонт",
    description: "Плановое обслуживание без замены силовых узлов — предотвращает развитие серьёзной неисправности.",
    works: [
      "Снятие и разбор вариатора",
      "Мойка и дефектовка узлов",
      "Замена сальников и уплотнений",
      "Замена масляного фильтра",
      "Замена трансмиссионного масла",
    ],
    parts: ["Комплект сальников и уплотнений", "Масляный фильтр", "Трансмиссионное масло"],
  },
  {
    title: "Капитальный ремонт",
    description: "Полная переборка с заменой всех изношенных силовых элементов — когда профилактики уже недостаточно.",
    works: [
      "Полная разборка и дефектовка",
      "Замена ремня/цепи и конусов",
      "Замена или ремонт гидроблока",
      "Замена подшипников и втулок",
      "Замена масляного насоса",
      "Сборка и обкатка на стенде",
    ],
    parts: ["Ремень/цепь вариатора", "Конусы", "Гидроблок", "Масляный насос", "Комплект подшипников"],
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
    title: "Рывки и пробуксовка при разгоне",
    priceFrom: 14000,
    priceTo: 120000,
    description: "От банальной замены масла до пробуксовки ремня относительно конуса — диапазон причин широкий.",
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

// ДЕМО — вымышленный руководитель для примера блока доверия.
// Заменить на реального человека, его фото и подпись перед запуском.
export const founder = {
  name: "[Имя Фамилия] — заменить на реального руководителя",
  role: `Основатель ${company.brandName}`,
  quote: "Мы ремонтируем вариаторы, а не меняем их на «кота в мешке» — контрактную коробку без истории.",
  bio: "Текст о руководителе и истории компании — заменить на реальный перед запуском.",
};

export const extraStats: StatItem[] = [
  { value: `${company.yearsOnMarket}+`, label: "лет практического опыта" },
  { value: `${company.gearboxesRepaired}+`, label: "отремонтированных вариаторов" },
  { value: "1", label: "минимум обслуживаем автомобилей в день" },
  { value: `до ${company.warrantyYears}`, label: "года гарантии на ремонт" },
];
