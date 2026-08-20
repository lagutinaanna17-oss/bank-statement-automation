// Валидация и нормализация телефона для российских номеров.

/** Приводит номер к формату +7XXXXXXXXXX, убирая пробелы, скобки и дефисы. */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8") && digits.length === 11) {
    digits = "7" + digits.slice(1);
  }
  if (digits.length === 10) {
    digits = "7" + digits;
  }
  return `+${digits}`;
}

/** Проверяет, что номер после нормализации похож на валидный российский номер. */
export function isValidRuPhone(raw: string): boolean {
  const normalized = normalizePhone(raw);
  return /^\+7\d{10}$/.test(normalized);
}

export function isNonEmptyName(name: string): boolean {
  return name.trim().length >= 2;
}
