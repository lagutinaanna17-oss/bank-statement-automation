"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Карточка с лёгким 3D-наклоном по курсору мыши (в духе Linear / Vercel / Stripe).
 * На тач-устройствах наведения нет — карточка остаётся плоской, ничего не ломается.
 */
export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    setStyle({
      transform: `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateZ(0)`,
      "--glare-x": `${(px + 0.5) * 100}%`,
      "--glare-y": `${(py + 0.5) * 100}%`,
    } as CSSProperties);
  }

  function handleMouseLeave() {
    setStyle({ transform: "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)" });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", ...style }}
      className={`tilt-card relative transition-transform duration-200 ease-out will-change-transform ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
