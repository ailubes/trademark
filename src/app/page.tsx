import Link from "next/link";

import { MasonryGrid } from "@/components/tectonic/MasonryGrid";
import { Pillar } from "@/components/tectonic/Pillar";
import { SearchInputGroup } from "@/components/tectonic/SearchInputGroup";
import { StatusBadge } from "@/components/tectonic/StatusBadge";
import { TectonicSlab } from "@/components/tectonic/TectonicSlab";
import {
  generateOrganizationLD,
  generateWebSiteLD,
  generateProfessionalServiceLD,
  renderJSONLD,
} from "@/lib/structured-data";

const registryCards = [
  {
    source: "UA_NIPO",
    statusLabel: "Активний",
    statusClass: "text-emerald-600",
    title: "Національний реєстр України",
    description:
      "Повна синхронізація з базою УКРПАТЕНТ. Охоплює всі діючі свідоцтва та заявки на території України.",
    metric: "₴6 500",
    metricSuffix: "/клас",
  },
  {
    source: "WIPO_GBD",
    statusLabel: "Глобальний",
    statusClass: "text-tectonic-accent",
    title: "Мадридська система WIPO",
    description:
      "Міжнародна реєстрація у 130+ країнах світу через єдину заявку. Оптимізовано для експортерів та IT-компаній.",
    metric: "130+",
    metricSuffix: "країн",
    variant: "dark" as const,
  },
  {
    source: "EUIPO_TMVIEW",
    statusLabel: "Європа",
    statusClass: "text-blue-600",
    title: "Реєстр Євросоюзу TMview",
    description:
      "Доступ до бази TMview: 136 мільйонів записів. Захист бренду в усіх 27 країнах ЄС одночасно.",
    metric: "136M+",
    metricSuffix: "записів",
  },
];

const processSteps = [
  {
    title: "Перевірка",
    description:
      "Миттєва перевірка доступності марки по всіх реєстрах з оцінкою схожості та аналізом класів МКТУ.",
  },
  {
    title: "Аналіз",
    description:
      "Виявляємо конфлікти, оцінюємо ризики та готуємо рекомендації щодо стратегії реєстрації.",
  },
  {
    title: "Реєстрація",
    description:
      "Готуємо та подаємо заявку, супроводжуємо процес до отримання свідоцтва на торгову марку.",
  },
];

const trustIndicators = [
  { value: "15+", label: "років досвіду" },
  { value: "2 500+", label: "зареєстрованих марок" },
  { value: "98%", label: "успішних реєстрацій" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-10 sm:px-8">
      {/* Hero Section */}
      <section className="mb-24 md:mb-32">
        <div className="mb-12 max-w-4xl">
          <h1 className="reveal text-4xl font-semibold leading-[1.1] text-tectonic-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Захистіть свій бренд —
            <span className="text-tectonic-accent italic"> впевнено.</span>
          </h1>
          <p className="pillar reveal reveal-delay-1 mt-8 max-w-xl text-lg leading-relaxed text-tectonic-stone-600">
            Професійна реєстрація торгових марок через інтеграцію з TMview, WIPO та УКРПАТЕНТ.
            Отримайте чітку оцінку ризиків та юридичний супровід.
          </p>
        </div>

        <SearchInputGroup
          action="/search"
          method="get"
          className="reveal reveal-delay-2"
          placeholder="Введіть назву вашої марки..."
          buttonLabel="Перевірити"
        />

        <div className="mono mt-6 flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.35em] text-tectonic-stone-500">
          <span>ОНЛАЙН ПЕРЕВІРКА</span>
          <span>136M+ ЗАПИСІВ</span>
          <span>УКРПАТЕНТ 2025</span>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="mb-24 md:mb-32">
        <div className="grid grid-cols-3 gap-4 border-y-2 border-tectonic-primary py-8 md:gap-8">
          {trustIndicators.map((item) => (
            <div key={item.label} className="text-center">
              <div className="serif text-3xl font-semibold text-tectonic-primary sm:text-4xl md:text-5xl">
                {item.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-tectonic-stone-500 sm:text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registry Cards */}
      <section className="mb-24 md:mb-32">
        <div className="mb-10 flex flex-col gap-4 border-b-2 border-tectonic-primary pb-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl sm:text-4xl">Доступні реєстри</h2>
          <Link
            href="/search"
            className="mono text-xs font-bold uppercase tracking-[0.3em] text-tectonic-accent"
          >
            Всі джерела пошуку
          </Link>
        </div>

        <MasonryGrid>
          {registryCards.map((card, index) => (
            <TectonicSlab
              key={card.source}
              variant={card.variant}
              className={`col-span-12 p-8 md:col-span-4 reveal reveal-delay-${index + 1}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="mono text-xs text-tectonic-stone-500">
                  {card.source}
                </span>
                <StatusBadge className={card.statusClass}>
                  {card.statusLabel}
                </StatusBadge>
              </div>
              <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">
                {card.title}
              </h3>
              <p
                className={`mb-8 text-sm leading-relaxed ${
                  card.variant === "dark"
                    ? "text-white/70"
                    : "text-tectonic-stone-600"
                }`}
              >
                {card.description}
              </p>
              <div
                className={`flex items-center justify-between border-t pt-6 ${
                  card.variant === "dark" ? "border-white/15" : "border-border"
                }`}
              >
                <span
                  className={`mono text-lg font-bold ${
                    card.variant === "dark" ? "text-tectonic-accent" : ""
                  }`}
                >
                  {card.metric}
                  <span className="ml-1 text-[10px] font-normal opacity-60">
                    {card.metricSuffix}
                  </span>
                </span>
                <Link
                  href="/search"
                  className={`flex h-10 w-10 items-center justify-center border text-xs font-bold transition-all ${
                    card.variant === "dark"
                      ? "border-tectonic-accent text-tectonic-accent hover:bg-tectonic-accent hover:text-tectonic-primary"
                      : "border-tectonic-primary hover:bg-tectonic-primary hover:text-white"
                  }`}
                >
                  →
                </Link>
              </div>
            </TectonicSlab>
          ))}
        </MasonryGrid>
      </section>

      {/* Strategy Section */}
      <section className="mb-24 grid gap-12 md:mb-32 md:grid-cols-[1.1fr_0.9fr]">
        <Pillar className="reveal">
          <span className="mono text-xs font-bold uppercase tracking-[0.35em] text-tectonic-accent">
            01 / Стратегія захисту
          </span>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl md:text-5xl">
            Оцінка ризиків перед подачею
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-tectonic-stone-600">
            Поєднуємо юридичну експертизу з автоматизованим аналізом схожості,
            щоб виявити конфлікти на ранній стадії. Зменшуємо ризик відмов та витрати на ребрендинг.
          </p>
          <ul className="mt-8 space-y-4 text-xs font-bold uppercase tracking-[0.2em] text-tectonic-secondary">
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 bg-tectonic-accent" /> Перевірка по 45 класам МКТУ
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 bg-tectonic-accent" /> Оцінка ймовірності змішування
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 bg-tectonic-accent" /> Відповідь експерта за 24 години
            </li>
          </ul>
        </Pillar>

        <div className="relative reveal reveal-delay-2">
          <TectonicSlab className="relative z-10 p-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="mono text-[10px] uppercase tracking-[0.3em] text-tectonic-stone-500">
                  Моніторинг ризиків
                </span>
                <span className="text-xs font-bold text-rose-600">
                  ВИСОКИЙ РИЗИК
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="serif text-5xl">92%</span>
                <span className="mono text-xs opacity-50">схожість виявлено</span>
              </div>
              <div className="bg-tectonic-stone-100 p-4 text-[11px] leading-relaxed text-tectonic-stone-600">
                Знайдено співпадіння в Класі 9. Існуюча марка «ACME TECH» зареєстрована у 2019 році.
                Ймовірний конфлікт.
              </div>
              <Link
                href="/contact"
                className="bg-tectonic-accent py-4 text-center text-xs font-bold uppercase tracking-[0.35em] text-tectonic-primary transition-all hover:brightness-110"
              >
                Отримати консультацію
              </Link>
            </div>
          </TectonicSlab>
          <div className="absolute -bottom-6 -right-6 h-full w-full border-4 border-tectonic-stone" />
        </div>
      </section>

      {/* Process Steps */}
      <section className="mb-24 md:mb-32">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl sm:text-4xl">Як це працює</h2>
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-tectonic-stone-500">
            Швидко, системно, надійно
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <TectonicSlab
              key={step.title}
              className={`reveal reveal-delay-${index + 1} p-8`}
            >
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-tectonic-accent">
                Крок 0{index + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tectonic-stone-600">
                {step.description}
              </p>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="mb-24 md:mb-32">
        <div className="mb-10 border-b-2 border-tectonic-primary pb-4">
          <h2 className="text-3xl sm:text-4xl">Наші послуги</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Торгові марки",
              description: "Реєстрація в Україні, ЄС та міжнародно",
              price: "від ₴6 500",
              href: "/services/trademark-registration/ukraine",
            },
            {
              title: "Патенти",
              description: "Винаходи, корисні моделі, промислові зразки",
              price: "від ₴8 000",
              href: "/services/patents",
            },
            {
              title: "Авторське право",
              description: "Реєстрація та захист авторських прав",
              price: "від ₴3 000",
              href: "/services/copyright",
            },
            {
              title: "Консультації",
              description: "Юридичний супровід та стратегія захисту",
              price: "безкоштовно",
              href: "/contact",
            },
          ].map((service) => (
            <Link key={service.title} href={service.href}>
              <TectonicSlab className="h-full p-6">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-tectonic-stone-600">
                  {service.description}
                </p>
                <div className="mt-4 text-lg font-bold text-tectonic-accent">
                  {service.price}
                </div>
              </TectonicSlab>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-24">
        <TectonicSlab
          variant="dark"
          className="flex flex-col gap-10 p-10 md:flex-row md:items-center md:justify-between md:p-14"
        >
          <div className="max-w-xl">
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">
              15+ років практики, 2 500+ зареєстрованих марок
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Від стартапів до великих компаній — супроводжуємо бренди на кожному етапі захисту інтелектуальної власності.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-tectonic-accent px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.35em] text-tectonic-primary transition-all hover:brightness-110"
          >
            Безкоштовна консультація
          </Link>
        </TectonicSlab>
      </section>

      {/* Structured Data */}
      {renderJSONLD([
        generateOrganizationLD(),
        generateWebSiteLD(),
        generateProfessionalServiceLD({
          name: "Реєстрація торгових марок в Україні",
          description: "Професійна реєстрація торгових марок через УКРПАТЕНТ. Повний супровід від перевірки до отримання свідоцтва.",
          serviceType: "Trademark Registration",
          priceRange: "₴₴",
        }),
      ])}
    </main>
  );
}
