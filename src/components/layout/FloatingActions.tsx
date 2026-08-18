import { company } from "@/lib/site-config";

/**
 * Плавающая панель звонка/мессенджеров — всегда доступна на мобильном
 * при скролле, часть аудитории принципиально не звонит и пишет в мессенджеры.
 */
export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:hidden">
      <a
        href={company.whatsappHref}
        aria-label="Написать в WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      >
        WA
      </a>
      <a
        href={company.telegramHref}
        aria-label="Написать в Telegram"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2AABEE] text-white shadow-lg"
      >
        TG
      </a>
      <a
        href={company.phoneHref}
        aria-label="Позвонить"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-xl"
      >
        Звонок
      </a>
    </div>
  );
}
