/**
 * Декоративные плавающие градиентные пятна для фона секций — создают
 * ощущение глубины/3D без тяжёлых WebGL-библиотек. Чисто CSS, не мешает
 * кликам (pointer-events-none) и скрыта от скринридеров.
 */
export function GlowOrbs({ variant = "hero" }: { variant?: "hero" | "section" }) {
  if (variant === "section") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-1/3 h-72 w-72 animate-float-slow rounded-full bg-electric/10 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 animate-float rounded-full bg-accent/10 blur-[100px]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-10%] h-[420px] w-[620px] -translate-x-1/2 animate-float-slow rounded-full bg-accent/20 blur-[120px]" />
      <div className="absolute -left-32 top-1/2 h-72 w-72 animate-float rounded-full bg-electric/20 blur-[110px]" />
      <div className="absolute -right-24 top-1/4 h-64 w-64 animate-float-slow rounded-full bg-electric/10 blur-[100px]" />
      <div className="bg-grid absolute inset-0 opacity-40" />
    </div>
  );
}
