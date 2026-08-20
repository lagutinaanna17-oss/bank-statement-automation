import Link from "next/link";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

/** Чекбокс согласия на обработку персональных данных — обязателен под каждой формой (152-ФЗ). */
export function ConsentCheckbox({ checked, onChange, id }: ConsentCheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-2 text-xs text-ink-600">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-600 bg-ink-800 text-accent focus:ring-accent"
      />
      <span>
        Я согласен(на) на{" "}
        <Link href="/consent" className="text-electric hover:underline" target="_blank">
          обработку персональных данных
        </Link>{" "}
        в соответствии с{" "}
        <Link href="/privacy-policy" className="text-electric hover:underline" target="_blank">
          политикой конфиденциальности
        </Link>
      </span>
    </label>
  );
}
