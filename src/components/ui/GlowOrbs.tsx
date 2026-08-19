/**
 * Декоративные плавающие градиентные пятна для фона секций — создают
 * ощущение глубины/3D без тяжёлых WebGL-библиотек. Чисто CSS, не мешает
 * кликам (pointer-events-none) и скрыта от скринридеров.
 */
export function GlowOrbs({ variant = "hero" }: { variant?: "hero" | "section" }) {
  if (variant === "section") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-1/3 h-72 w-72 animate-float-slow rounded-full bg-electric/25 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 animate-float rounded-full bg-accent/25 blur-[110px]" />
        <div className="absolute right-1/3 top-0 h-56 w-56 animate-float-slow rounded-full bg-violet/15 blur-[100px]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-15%] h-[480px] w-[680px] -translate-x-1/2 animate-float-slow rounded-full bg-accent/30 blur-[130px]" />
      <div className="absolute -left-32 top-1/2 h-80 w-80 animate-float rounded-full bg-electric/25 blur-[120px]" />
      <div className="absolute -right-24 top-1/4 h-72 w-72 animate-float-slow rounded-full bg-violet/20 blur-[110px]" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
