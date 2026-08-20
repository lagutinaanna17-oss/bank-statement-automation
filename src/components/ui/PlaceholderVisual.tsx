const icons: Record<string, JSX.Element> = {
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5a1.5 1.5 0 0 1-2.1-2.1l2.6-2.4Z" />
  ),
  gauge: (
    <>
      <path d="M12 20a8 8 0 1 0-8-8" />
      <path d="M12 12 8.5 9" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M15 14.2c2.4.4 4 2.3 4 5.8" />
    </>
  ),
  shield: (
    <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-1.2 10.2L8.5 11l1.4-1.4 1 .9 3.2-3.2 1.4 1.4-4.7 4.5Z" />
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7 9.5 4.5h5L16 7" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
};

const gradients: Record<string, string> = {
  accent: "from-accent/25 via-accent/10 to-electric/15",
  electric: "from-electric/25 via-electric/10 to-violet/15",
  violet: "from-violet/25 via-electric/10 to-accent/15",
};

interface PlaceholderVisualProps {
  icon: keyof typeof icons;
  label: string;
  gradient?: keyof typeof gradients;
  className?: string;
}

/**
 * Заглушка вместо реального фото — стилизованная градиентная плашка с
 * иконкой и подписью. Используется там, где реальных фото ещё нет, чтобы
 * не показывать битую картинку (next/image на несуществующий файл).
 * Замените на реальное фото через next/image, когда оно появится.
 */
export function PlaceholderVisual({ icon, label, gradient = "accent", className }: PlaceholderVisualProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradients[gradient]} bg-ink-800 ${className ?? ""}`}
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-10 w-10 text-ink-deep/70"
      >
        {icons[icon]}
      </svg>
      <span className="relative text-center text-[11px] font-medium text-ink-600">{label}</span>
    </div>
  );
}
