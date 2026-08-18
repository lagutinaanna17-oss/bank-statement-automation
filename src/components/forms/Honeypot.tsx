interface HoneypotProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

/**
 * Невидимое для человека поле-ловушка для ботов.
 * Скрыто визуально и от скринридеров, но остаётся в DOM и в потоке табуляции
 * отключено — обычные боты, заполняющие все поля формы, попадутся здесь.
 */
export function Honeypot({ value, onChange, name = "company_website" }: HoneypotProps) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor={name}>Не заполняйте это поле</label>
      <input
        id={name}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
