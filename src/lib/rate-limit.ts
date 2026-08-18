// Простой in-memory rate-limiter для API-роутов форм.
//
// ВАЖНО: этот вариант подходит только для одного постоянно работающего
// Node.js-процесса (например, self-hosted сервер). На serverless-платформах
// (Vercel и т.п.) каждый инстанс функции имеет свою память, поэтому лимит
// не будет общим между запросами. Для production рекомендуется заменить
// на внешнее хранилище — например, Upstash Redis (@upstash/ratelimit) или
// Redis в связке с ioredis.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

interface RateLimitOptions {
  /** Ключ ограничения — обычно IP-адрес + имя эндпоинта. */
  key: string;
  /** Максимум запросов за окно времени. */
  limit: number;
  /** Длина окна в миллисекундах. */
  windowMs: number;
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "unknown";
}
