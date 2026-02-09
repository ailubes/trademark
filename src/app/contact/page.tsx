import { Metadata } from "next";

import { TectonicSlab } from "@/components/tectonic/TectonicSlab";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Зв'яжіться з нами для безкоштовної консультації щодо реєстрації торгової марки, патенту або авторського права.",
};

const contactInfo = [
  {
    label: "Телефон",
    value: "+380 (68) 724-50-00",
    href: "tel:+380687245000",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "info@trademark.com.ua",
    href: "mailto:info@trademark.com.ua",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Адреса",
    value: "м. Київ, Україна",
    href: null,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Графік роботи",
    value: "Пн-Пт: 09:00 - 18:00",
    href: null,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const serviceOptions = [
  "Реєстрація торгової марки в Україні",
  "Реєстрація торгової марки в ЄС",
  "Міжнародна реєстрація (Мадрид)",
  "Патент на винахід",
  "Корисна модель",
  "Свідоцтво на промисловий зразок",
  "Авторське право",
  "Реєстрація договору про передачу авторських прав",
  "Реєстрація ТОВ, ФОП, ГО або благодійної організації",
  "Інші дозволи/ліцензії/сертифікати",
  "Юридична консультація",
  "Інше",
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-semibold text-tectonic-primary sm:text-5xl">
          Зв'яжіться з нами
        </h1>
        <p className="mt-4 text-lg text-tectonic-stone-600">
          Отримайте безкоштовну консультацію щодо захисту вашої інтелектуальної власності.
          Ми відповімо протягом одного робочого дня.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-tectonic-stone-100 text-tectonic-primary">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-tectonic-stone-500">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 text-lg font-medium text-tectonic-primary transition-colors hover:text-tectonic-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="mt-1 text-lg font-medium text-tectonic-primary">
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <TectonicSlab variant="dark" className="p-6">
            <h3 className="text-lg font-semibold text-white">
              Терміновий запит?
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Зателефонуйте нам напряму для термінової консультації або запишіться на зустріч.
            </p>
            <a
              href="tel:+380687245000"
              className="mt-4 inline-block bg-tectonic-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:brightness-110"
            >
              Зателефонувати зараз
            </a>
          </TectonicSlab>
        </div>

        {/* Contact Form */}
        <TectonicSlab className="p-8">
          <h2 className="text-2xl font-semibold">Форма звернення</h2>
          <p className="mt-2 text-sm text-tectonic-stone-600">
            Заповніть форму і ми зв'яжемося з вами найближчим часом.
          </p>

          <form className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tectonic-stone-600"
                >
                  Ім'я *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border-2 border-tectonic-stone-200 bg-white px-4 py-3 text-tectonic-primary transition-colors focus:border-tectonic-accent focus:outline-none"
                  placeholder="Ваше ім'я"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tectonic-stone-600"
                >
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full border-2 border-tectonic-stone-200 bg-white px-4 py-3 text-tectonic-primary transition-colors focus:border-tectonic-accent focus:outline-none"
                  placeholder="+380"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tectonic-stone-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border-2 border-tectonic-stone-200 bg-white px-4 py-3 text-tectonic-primary transition-colors focus:border-tectonic-accent focus:outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tectonic-stone-600"
              >
                Послуга
              </label>
              <select
                id="service"
                name="service"
                className="w-full border-2 border-tectonic-stone-200 bg-white px-4 py-3 text-tectonic-primary transition-colors focus:border-tectonic-accent focus:outline-none"
              >
                <option value="">Оберіть послугу</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="trademark"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tectonic-stone-600"
              >
                Назва торгової марки (якщо є)
              </label>
              <input
                type="text"
                id="trademark"
                name="trademark"
                className="w-full border-2 border-tectonic-stone-200 bg-white px-4 py-3 text-tectonic-primary transition-colors focus:border-tectonic-accent focus:outline-none"
                placeholder="Назва вашого бренду"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tectonic-stone-600"
              >
                Повідомлення
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full resize-none border-2 border-tectonic-stone-200 bg-white px-4 py-3 text-tectonic-primary transition-colors focus:border-tectonic-accent focus:outline-none"
                placeholder="Опишіть ваш запит..."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                required
                className="mt-1 h-4 w-4 border-2 border-tectonic-stone-300 text-tectonic-accent focus:ring-tectonic-accent"
              />
              <label htmlFor="consent" className="text-sm text-tectonic-stone-600">
                Я погоджуюся на обробку персональних даних відповідно до{" "}
                <a href="/privacy" className="text-tectonic-accent hover:underline">
                  Політики конфіденційності
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-tectonic-primary py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-tectonic-accent hover:text-tectonic-primary"
            >
              Надіслати запит
            </button>
          </form>
        </TectonicSlab>
      </div>
    </main>
  );
}
