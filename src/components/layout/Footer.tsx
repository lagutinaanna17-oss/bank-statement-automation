import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/site-config";
import { PhoneReveal } from "./PhoneReveal";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-deep py-10 text-sm text-white/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/images/brand/coolinauto-logo-wordmark.png"
            alt={company.brandName}
            width={2400}
            height={280}
            className="animated-logo h-7 w-auto brightness-0 invert"
          />
          <p className="mt-3 text-white/80">{company.fullBrandName}</p>
          <p className="mt-2">{company.legalName}</p>
          <p className="mt-1">ИНН {company.inn}</p>
          <p className="mt-1">ОГРН {company.ogrn}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Адрес и время работы</p>
          <p className="mt-2">{company.actualAddress}</p>
          <p className="mt-1">{company.workHours}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Связаться с нами</p>
          <p className="mt-2">
            <PhoneReveal className="hover:text-accent" />
          </p>
          <p className="mt-1">
            <a href={`mailto:${company.email}`} className="hover:text-accent">
              {company.email}
            </a>
          </p>
          <div className="mt-2 flex gap-3">
            <a href={company.whatsappHref} className="hover:text-accent">
              WhatsApp
            </a>
            <a href={company.telegramHref} className="hover:text-accent">
              Telegram
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Документы</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/privacy-policy" className="hover:text-accent">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link href="/consent" className="hover:text-accent">
                Согласие на обработку персональных данных
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-white/40 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {company.fullBrandName}. Все права защищены.
      </div>
    </footer>
  );
}
