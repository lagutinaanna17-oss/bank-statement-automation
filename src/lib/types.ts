// Общие типы данных сайта. Хранить в одном месте, чтобы формы, API и
// контент-конфиг были согласованы между собой.

/** Заявка (лид), приходящая с любой формы сайта. */
export interface Lead {
  name: string;
  phone: string;
  comment?: string;
  /** Откуда пришла заявка: 'hero' | 'quiz' | 'final-cta' | 'contacts' и т.д. — для аналитики. */
  source: string;
  /** Согласие на обработку персональных данных (152-ФЗ). Обязательно true. */
  consentGiven: boolean;
  /** Honeypot-поле — невидимое для человека. Если заполнено, запрос считается ботом. */
  honeypot?: string;
  /** Токен, полученный от Яндекс SmartCaptcha на клиенте. */
  captchaToken?: string;
}

export interface LeadResponse {
  ok: boolean;
  message: string;
}

/** Запрос на ИИ-предиагностику по свободному описанию симптомов. */
export interface PrediagnosisRequest {
  description: string;
  consentGiven: boolean;
  honeypot?: string;
  captchaToken?: string;
}

/** Ответ ИИ-предиагностики — ориентировочный, не заменяет очную диагностику. */
export interface PrediagnosisResponse {
  possibleCauses: string[];
  priceRangeFrom: number;
  priceRangeTo: number;
  recommendation: string;
}

export interface Brand {
  slug: string;
  name: string;
  /** Отображаемые модели, для которых делаем ремонт. */
  models: string;
  /** Коды коробок передач (для SEO и точности, напр. JF011E). */
  gearboxCodes: string[];
  description: string;
  logoAlt: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  priceFrom: number;
  unit: string;
  description: string;
  details: string[];
}

export interface CaseItem {
  id: string;
  brand: string;
  model: string;
  gearboxCode: string;
  problem: string;
  workDone: string;
  durationDays: number;
  price: number;
  photoBeforeAlt: string;
  photoAfterAlt: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  carModel: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WorkStage {
  title: string;
  description: string;
}
