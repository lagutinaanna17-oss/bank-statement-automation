'use strict';

/* =========================================================================
   CONFIG — единый источник контактных данных, цен и ссылок.
   Меняете что-то на сайте (телефон, адрес, цену) — меняете только здесь.
   ========================================================================= */
const CONFIG = {
  brand: {
    name: 'COOLiNAUTO',
    fullName: 'АКПП Технология ремонта',
    legalEntity: 'ИП Кулин Антон Валерьевич',
    inn: '325305948671',
    ogrnip: '317325600022990',
    founderName: 'Антон Кулин',
    yearsOnMarket: 11,
  },

  cities: {
    moscow: {
      title: 'Москва',
      address: 'Автомобильный проезд, д. 10, к. 14',
      phone: '+7 (495) 215-50-14',
      hours: 'пн–сб, 10:00–19:00',
      directions: 'МЦД Новохохловская или м. Волгоградский проспект',
      mapsUrl: 'https://yandex.ru/maps/-/CCURZ0GYxD',
    },
    spb: {
      title: 'Санкт-Петербург',
      address: 'ул. Пражская, д. 8, к. 1',
      phone: '+7 (911) 000-96-20',
      hours: 'пн–пт, 10:00–19:00',
      directions: 'м. Бухарестская',
      mapsUrl: 'https://yandex.ru/maps/-/CCURZ8bJwD',
    },
  },

  contacts: {
    mainPhone: '+7 (495) 215-50-14',
    whatsapp: '+7 (985) 919-42-92',
    whatsappUrl: 'https://wa.me/79859194292',
    telegramHandle: '@coolinautotech',
    telegramUrl: 'https://t.me/coolinautotech',
    email: 'coolinauto@yandex.ru',
    youtubeUrl: 'https://youtube.com/@coolinautoakpp',
    twoGisSlug: 'coolinauto',
  },

  services: [
    {
      title: 'Замена масла в вариаторе',
      price: 'от 19 000 ₽',
      note: 'Входит: работа, масло, прокладка, фильтр',
    },
    {
      title: 'Локальный ремонт вариатора',
      price: 'от 5 000 ₽',
      note: 'Без демонтажа и полного разбора',
    },
    {
      title: 'Ремонт вариатора (CVT)',
      price: 'от 100 000 ₽',
      note: 'При полном разборе агрегата',
    },
    {
      title: 'Ремонт АКПП',
      price: 'от 100 000 ₽',
      note: 'Полная диагностика и восстановление узлов',
    },
    {
      title: 'Диагностика',
      price: '1 000–5 000 ₽',
      note: 'Бесплатно, если автомобиль остаётся в ремонт',
    },
    {
      title: 'Эвакуация',
      price: 'от 5 000 ₽',
      note: 'При полноценном ремонте покрываем 5 000 ₽',
    },
    {
      title: 'Замена масла в ДВС и других узлах',
      price: 'от 1 500 ₽',
      note: 'Сопутствующее обслуживание',
    },
  ],

  transmissions: [
    { brand: 'JATCO', models: 'JF010E, JF011E, JF015E, JF016E, JF017E, JF022E', note: 'вариаторы, ключевая специализация' },
    { brand: 'WLY / QR', models: 'QR017, QR018, QR019, QR025', note: 'вариаторы, ключевая специализация' },
    { brand: 'Aisin', models: 'K111, K112, K114, K120, U760, U881', note: 'вариаторы и АКПП' },
    { brand: 'ZF', models: 'ZF8HP, ZF6HP', note: 'АКПП' },
  ],

  warranty: {
    headline: 'до 3 лет без ограничения пробега',
    baseYears: 2,
    extendedYears: 3,
    extensionPrice: '50 000 ₽',
  },
};

/* =========================================================================
   Утилиты
   ========================================================================= */
const $ = (selector, scope) => (scope || document).querySelector(selector);
const $$ = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

function telHref(phone) {
  return 'tel:' + phone.replace(/[^\d+]/g, '');
}

/* =========================================================================
   Переключатель городов (шапка). Активный город хранится в переменной
   модуля — намеренно НЕ в localStorage/sessionStorage (по требованиям).
   ========================================================================= */
let activeCity = 'moscow';

function renderCityDependentUI() {
  const city = CONFIG.cities[activeCity];

  // Кнопка телефона в шапке и hero — подставляем город в data-атрибут
  $$('[data-role="header-phone"], [data-role="hero-phone"]').forEach((btn) => {
    btn.dataset.phone = city.phone;
  });

  // Переключатели активного состояния
  $$('.city-switch__btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.city === activeCity);
  });
}

function initCitySwitch() {
  $$('.city-switch__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCity = btn.dataset.city;
      renderCityDependentUI();
    });
  });
  renderCityDependentUI();
}

/* =========================================================================
   Защита номера от парсинга: телефон не лежит текстом в HTML,
   подставляется по клику из CONFIG.
   ========================================================================= */
function initPhoneReveal() {
  $$('.phone-reveal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      let phone;
      if (role === 'header-phone' || role === 'hero-phone') {
        phone = CONFIG.cities[activeCity].phone;
      } else if (role === 'moscow-phone') {
        phone = CONFIG.cities.moscow.phone;
      } else if (role === 'spb-phone') {
        phone = CONFIG.cities.spb.phone;
      } else {
        phone = CONFIG.contacts.mainPhone;
      }

      const link = document.createElement('a');
      link.href = telHref(phone);
      link.textContent = phone;
      link.className = 'phone-reveal__value';
      btn.replaceWith(link);
    });
  });
}

/* =========================================================================
   Подстановка ссылок и контактов из CONFIG в статичную разметку
   ========================================================================= */
function initStaticContacts() {
  $$('[data-role="whatsapp-link"]').forEach((el) => {
    el.href = CONFIG.contacts.whatsappUrl;
    if (!el.textContent.trim() || el.textContent.trim() === 'WhatsApp') el.textContent = 'WhatsApp: ' + CONFIG.contacts.whatsapp;
  });
  $$('[data-role="telegram-link"]').forEach((el) => {
    el.href = CONFIG.contacts.telegramUrl;
    if (!el.textContent.trim() || el.textContent.trim() === 'Telegram') el.textContent = 'Telegram: ' + CONFIG.contacts.telegramHandle;
  });
  $$('[data-role="youtube-link"], [data-role="youtube-link-footer"]').forEach((el) => {
    el.href = CONFIG.contacts.youtubeUrl;
  });
  $$('[data-role="email-link"]').forEach((el) => {
    el.href = 'mailto:' + CONFIG.contacts.email;
  });
  $$('[data-role="reviews-moscow"]').forEach((el) => { el.href = CONFIG.cities.moscow.mapsUrl; });
  $$('[data-role="reviews-spb"]').forEach((el) => { el.href = CONFIG.cities.spb.mapsUrl; });
  $$('[data-role="maps-moscow"]').forEach((el) => { el.href = CONFIG.cities.moscow.mapsUrl; });
  $$('[data-role="maps-spb"]').forEach((el) => { el.href = CONFIG.cities.spb.mapsUrl; });

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
}

/* =========================================================================
   Рендер карточек услуг и моделей коробок из CONFIG
   ========================================================================= */
function renderServices() {
  const grid = $('#services-grid');
  if (!grid) return;
  grid.innerHTML = CONFIG.services.map((s) => `
    <article class="service-card">
      <h3>${s.title}</h3>
      <p class="service-card__price">${s.price}</p>
      <p class="service-card__note">${s.note}</p>
    </article>
  `).join('');
}

function renderTransmissions() {
  const grid = $('#brand-grid');
  if (!grid) return;
  grid.innerHTML = CONFIG.transmissions.map((t) => `
    <article class="brand-card">
      <h3>${t.brand}</h3>
      <p class="brand-card__models">${t.models}</p>
      <p class="brand-card__note">${t.note}</p>
    </article>
  `).join('');
}

/* =========================================================================
   Аккордеон FAQ
   ========================================================================= */
function initAccordion() {
  $$('.accordion__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
}

/* =========================================================================
   Квиз-калькулятор (4 шага)
   ========================================================================= */
function initQuiz() {
  const form = $('#quiz-form');
  if (!form) return;

  const steps = $$('.quiz__step', form);
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    currentStep = index;
  }

  function validateStep(index) {
    const step = steps[index];
    const required = $$('input[required]', step);
    return required.every((input) => {
      if (input.type === 'radio') {
        return $$('input[name="' + input.name + '"]', step).some((r) => r.checked);
      }
      return input.checkValidity();
    });
  }

  $$('.quiz__next', form).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!validateStep(currentStep)) {
        steps[currentStep].reportValidity && steps[currentStep].reportValidity();
        return;
      }
      if (currentStep < steps.length - 1) showStep(currentStep + 1);
    });
  });

  $$('.quiz__prev', form).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  });

  showStep(0);
}

/* =========================================================================
   Валидация телефона в реальном времени (простая маска РФ)
   ========================================================================= */
function formatPhoneInput(input) {
  input.addEventListener('input', () => {
    let digits = input.value.replace(/\D/g, '');
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    digits = digits.slice(0, 11);

    let formatted = '+7';
    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);
    input.value = formatted;

    validatePhoneField(input);
  });
}

function validatePhoneField(input) {
  const digits = input.value.replace(/\D/g, '');
  const errorEl = document.querySelector('[data-error-for="' + input.id + '"]');
  const isValid = digits.length === 11;
  input.setCustomValidity(isValid ? '' : 'Введите номер телефона полностью');
  if (errorEl) errorEl.textContent = isValid || digits.length === 0 ? '' : 'Проверьте номер телефона';
  return isValid;
}

/* =========================================================================
   submitLead — единая точка отправки заявок.
   TODO: подключить email/CRM/Telegram
   ========================================================================= */
function submitLead(data) {
  console.log('submitLead:', data);
  // TODO: подключить email/CRM/Telegram
  return Promise.resolve({ ok: true });
}

/* =========================================================================
   Обработка форм: honeypot, чекбокс согласия блокирует кнопку,
   экран «спасибо» после отправки.
   ========================================================================= */
function initForm(formId, thanksSelector) {
  const form = $('#' + formId);
  if (!form) return;

  const consentInput = $('input[name="consent"]', form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const phoneInput = $('input[type="tel"]', form);

  if (phoneInput) formatPhoneInput(phoneInput);

  function refreshSubmitState() {
    if (submitBtn && consentInput) submitBtn.disabled = !consentInput.checked;
  }

  if (consentInput) {
    consentInput.addEventListener('change', refreshSubmitState);
    refreshSubmitState();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Honeypot: если скрытое поле заполнено — это бот, тихо игнорируем
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') {
      return;
    }

    if (phoneInput && !validatePhoneField(phoneInput)) {
      phoneInput.focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    delete data.website; // honeypot не передаём

    submitLead({ ...data, source: formId, city: activeCity }).then(() => {
      form.hidden = true;
      const thanks = document.querySelector(thanksSelector);
      if (thanks) thanks.hidden = false;
    });
  });
}

/* Финальный шаг квиза отправляется вместе со всеми ответами формы */
function initQuizSubmit() {
  const form = $('#quiz-form');
  if (!form) return;
  initForm('quiz-form', '.quiz__thanks');
}

/* =========================================================================
   Cookie-баннер: показывается один раз за время текущей загрузки страницы.
   Состояние — только в переменной модуля (не localStorage/sessionStorage),
   поэтому баннер снова появится при обновлении страницы — это осознанное
   ограничение по требованиям задачи.
   ========================================================================= */
let cookieAccepted = false;

function initCookieBanner() {
  const banner = $('#cookie-banner');
  const acceptBtn = $('#cookie-accept');
  if (!banner || !acceptBtn) return;

  if (!cookieAccepted) banner.hidden = false;

  acceptBtn.addEventListener('click', () => {
    cookieAccepted = true;
    banner.hidden = true;
  });
}

/* =========================================================================
   Плавающая кнопка звонка/мессенджеров на мобильном при скролле
   ========================================================================= */
function initFloatingActions() {
  const el = $('#floating-actions');
  const callBtn = $('[data-role="floating-call"]', el || document);
  if (!el) return;

  if (callBtn) callBtn.href = telHref(CONFIG.contacts.mainPhone);

  let lastState = false;
  function toggle() {
    const shouldShow = window.scrollY > 400 && window.innerWidth < 768;
    if (shouldShow !== lastState) {
      el.hidden = !shouldShow;
      lastState = shouldShow;
    }
  }
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

/* =========================================================================
   Мобильное меню (бургер)
   ========================================================================= */
function initBurger() {
  const burger = $('#burger');
  const header = $('#header');
  if (!burger || !header) return;
  burger.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-menu-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
}

/* =========================================================================
   Плавное появление секций при скролле
   ========================================================================= */
function initScrollReveal() {
  const items = $$('section');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach((el) => observer.observe(el));
}

/* =========================================================================
   Инициализация
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderCityDependentUI();
  initCitySwitch();
  initPhoneReveal();
  initStaticContacts();
  renderServices();
  renderTransmissions();
  initAccordion();
  initQuiz();
  initForm('lead-form', '.lead-form__thanks');
  initQuizSubmit();
  initCookieBanner();
  initFloatingActions();
  initBurger();
  initScrollReveal();
});
