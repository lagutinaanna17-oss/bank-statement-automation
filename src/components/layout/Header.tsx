import Link from "next/link";
import { company } from "@/lib/site-config";
import { PhoneReveal } from "./PhoneReveal";

const navLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/brands", label: "Марки" },
  { href: "/cases", label: "Кейсы" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/60 bg-ink-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-ink-deep">
          {company.brandName}
        </Link>

        <nav className="hidden gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 hover:text-ink-deep"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <PhoneReveal className="text-sm font-semibold text-ink-deep hover:text-accent" />
          <Link
            href="#lead-form"
            className="btn-3d rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-depth shadow-glow"
          >
            Записаться
          </Link>
        </div>
      </div>
    </header>
  );
}
