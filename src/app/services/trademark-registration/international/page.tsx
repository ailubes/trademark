import { Metadata } from "next";
import Link from "next/link";

import { TectonicSlab } from "@/components/tectonic/TectonicSlab";
import { Pillar } from "@/components/tectonic/Pillar";

export const metadata: Metadata = {
  title: "Міжнародна реєстрація торгової марки",
  description:
    "Міжнародна реєстрація торгової марки через Мадридську систему WIPO. Захист у 130+ країнах світу однією заявкою. Від €1 200.",
};

const processSteps = [
  {
    step: "01",
    title: "Базова заявка",
    description: "Подаємо або використовуємо існуючу базову заявку/реєстрацію в УКРПАТЕНТ.",
    duration: "якщо потрібно",
  },
  {
    step: "02",
    title: "Вибір країн",
    description: "Визначаємо країни призначення зі 130+ членів Мадридської системи.",
    duration: "1-2 дні",
  },
  {
    step: "03",
    title: "Підготовка заявки",
    description: "Формуємо міжнародну заявку через УКРПАТЕНТ до WIPO.",
    duration: "3-5 днів",
  },
  {
    step: "04",
    title: "Експертиза WIPO",
    description: "Міжнародне бюро перевіряє заявку та присвоює дату міжнародної реєстрації.",
    duration: "2-3 місяці",
  },
  {
    step: "05",
    title: "Національні експертизи",
    description: "Кожна призначена країна проводить власну експертизу відповідно до свого законодавства.",
    duration: "12-18 місяців",
  },
  {
    step: "06",
    title: "Отримання захисту",
    description: "Після схвалення марка отримує захист у всіх призначених країнах.",
    duration: "після експертиз",
  },
];

const popularRegions = [
  {
    region: "Європа",
    countries: "ЄС (EUIPO), Великобританія, Швейцарія, Норвегія, Туреччина, Сербія",
    icon: "🇪🇺",
  },
  {
    region: "Азія",
    countries: "Китай, Японія, Південна Корея, Сінгапур, В'єтнам, Індія",
    icon: "🌏",
  },
  {
    region: "Америка",
    countries: "США, Канада, Мексика, Бразилія, Чилі, Колумбія",
    icon: "🌎",
  },
  {
    region: "Інші",
    countries: "Австралія, Нова Зеландія, Ізраїль, ОАЕ, Саудівська Аравія",
    icon: "🌍",
  },
];

const pricing = [
  {
    title: "Базовий",
    price: "1 200",
    description: "До 3 країн призначення",
    features: [
      "Базова заявка в УКРПАТЕНТ",
      "Міжнародна заявка WIPO",
      "До 3 країн призначення",
      "1 клас МКТУ",
      "Супровід процесу",
    ],
    note: "Без урахування національних мит",
  },
  {
    title: "Стандарт",
    price: "2 400",
    popular: true,
    description: "До 10 країн призначення",
    features: [
      "Все з Базовий",
      "До 10 країн призначення",
      "3 класи МКТУ",
      "Моніторинг статусів",
      "Відповіді на запити відомств",
    ],
    note: "Без урахування національних мит",
  },
  {
    title: "Преміум",
    price: "індивідуально",
    description: "Необмежена кількість країн",
    features: [
      "Все зі Стандарт",
      "Необмежена кількість країн",
      "5+ класів МКТУ",
      "Персональний менеджер",
      "Продовження та зміни",
      "Пакетна знижка на мита",
    ],
    note: "Ціна залежить від кількості країн",
  },
];

const benefits = [
  {
    title: "Одна заявка",
    description: "Одна міжнародна заявка замість десятків національних.",
  },
  {
    title: "Економія коштів",
    description: "Значно дешевше, ніж окремі національні реєстрації.",
  },
  {
    title: "Централізоване управління",
    description: "Всі зміни, продовження та передача прав в одному місці.",
  },
  {
    title: "130+ країн",
    description: "Можливість вибрати будь-які країни зі 130+ членів системи.",
  },
  {
    title: "Гнучкість",
    description: "Можна додавати нові країни після реєстрації.",
  },
  {
    title: "Швидше розширення",
    description: "Легко розширювати географію захисту в міру росту бізнесу.",
  },
];

const faq = [
  {
    question: "Що таке Мадридська система?",
    answer: "Мадридська система — це міжнародна система реєстрації торгових марок, керована WIPO. Вона дозволяє отримати захист у багатьох країнах через одну міжнародну заявку.",
  },
  {
    question: "Які країни входять до системи?",
    answer: "На 2024 рік до Мадридської системи входить 130+ країн, включаючи ЄС, США, Китай, Японію, Великобританію, Туреччину та багато інших. Україна також є членом системи.",
  },
  {
    question: "Чи потрібна базова заявка в Україні?",
    answer: "Так, для подання міжнародної заявки через УКРПАТЕНТ потрібна базова українська заявка або реєстрація. Міжнародна заявка має збігатися з базовою за власником, позначенням та переліком товарів/послуг.",
  },
  {
    question: "Скільки коштують національні мита?",
    answer: "Крім базового збору WIPO (€653 за словесну марку), кожна країна призначення може стягувати додаткове національне мито. Вартість залежить від країни та кількості класів (від €50 до €500+ за країну).",
  },
  {
    question: "Скільки часу займає процес?",
    answer: "WIPO розглядає заявку 2-3 місяці. Після цього кожна призначена країна має 12-18 місяців на національну експертизу. Загальний термін — від 12 до 24 місяців.",
  },
  {
    question: "Чи можна додати країни пізніше?",
    answer: "Так, можна подавати подальші призначення (subsequent designations) у будь-який час після міжнародної реєстрації, додаючи нові країни до існуючої реєстрації.",
  },
];

export default function TrademarkInternationalPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8">
      {/* Hero */}
      <div className="mb-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
            Послуги / Міжнародна реєстрація
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-tectonic-primary sm:text-5xl">
            Міжнародна реєстрація торгової марки
          </h1>
          <p className="mt-6 text-lg text-tectonic-stone-600">
            Захистіть свій бренд у 130+ країнах світу через Мадридську систему WIPO.
            Одна заявка, централізоване управління, значна економія коштів.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="bg-tectonic-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-tectonic-accent hover:text-tectonic-primary"
            >
              Замовити реєстрацію
            </Link>
            <Link
              href="/search"
              className="border-2 border-tectonic-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:bg-tectonic-primary hover:text-white"
            >
              Перевірити марку
            </Link>
          </div>
        </div>

        <TectonicSlab className="p-8">
          <div className="mb-6 text-xs font-semibold uppercase tracking-wider text-tectonic-stone-500">
            Вартість від
          </div>
          <div className="flex items-baseline gap-2">
            <span className="serif text-5xl font-semibold">€1 200</span>
            <span className="text-tectonic-stone-500">/ до 3 країн</span>
          </div>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              130+ країн доступні
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Централізоване управління
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Значна економія коштів
            </li>
          </ul>
        </TectonicSlab>
      </div>

      {/* Popular Regions */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Популярні регіони
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Країни, доступні через Мадридську систему
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {popularRegions.map((region) => (
            <TectonicSlab key={region.region} className="p-6">
              <div className="mb-3 text-3xl">{region.icon}</div>
              <h3 className="text-lg font-semibold">{region.region}</h3>
              <p className="mt-2 text-sm text-tectonic-stone-600">
                {region.countries}
              </p>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Переваги міжнародної реєстрації
          </h2>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <TectonicSlab key={benefit.title} className="p-6">
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-tectonic-stone-600">
                {benefit.description}
              </p>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Етапи реєстрації
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Процес міжнародної реєстрації через Мадридську систему
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <TectonicSlab key={step.step} className="p-6">
              <div className="flex items-center justify-between">
                <span className="mono text-2xl font-bold text-tectonic-accent">
                  {step.step}
                </span>
                <span className="mono text-xs text-tectonic-stone-500">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-tectonic-stone-600">
                {step.description}
              </p>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Тарифи
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Оберіть пакет залежно від кількості країн призначення
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((plan) => (
            <TectonicSlab
              key={plan.title}
              variant={plan.popular ? "dark" : undefined}
              className={`relative p-8 ${plan.popular ? "" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tectonic-accent px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-tectonic-primary">
                  Популярний
                </div>
              )}

              <h3 className={`text-2xl font-semibold ${plan.popular ? "text-white" : ""}`}>
                {plan.title}
              </h3>
              <p className={`text-sm ${plan.popular ? "text-white/70" : "text-tectonic-stone-600"}`}>
                {plan.description}
              </p>

              <div className={`my-6 border-y py-6 ${plan.popular ? "border-white/20" : "border-tectonic-stone-200"}`}>
                <span className={`serif text-4xl font-semibold ${plan.popular ? "text-white" : ""}`}>
                  {plan.price === "індивідуально" ? plan.price : `€${plan.price}`}
                </span>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 bg-tectonic-accent" />
                    <span className={`text-sm ${plan.popular ? "text-white/80" : "text-tectonic-stone-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={`mb-6 text-xs ${plan.popular ? "text-white/50" : "text-tectonic-stone-500"}`}>
                * {plan.note}
              </div>

              <Link
                href="/contact"
                className={`block py-3 text-center text-xs font-bold uppercase tracking-wider transition-all ${
                  plan.popular
                    ? "bg-tectonic-accent text-tectonic-primary hover:brightness-110"
                    : "border-2 border-tectonic-primary text-tectonic-primary hover:bg-tectonic-primary hover:text-white"
                }`}
              >
                Замовити
              </Link>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Часті питання
          </h2>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-2">
          {faq.map((item) => (
            <TectonicSlab key={item.question} className="p-6">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tectonic-stone-600">
                {item.answer}
              </p>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <TectonicSlab variant="dark" className="p-10 text-center md:p-14">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">
            Готові зареєструвати торгову марку міжнародно?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Отримайте безкоштовну консультацію та персональну стратегію
            міжнародного захисту вашого бренду.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="bg-tectonic-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:brightness-110"
            >
              Безкоштовна консультація
            </Link>
            <Link
              href="/search"
              className="border-2 border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-tectonic-accent hover:text-tectonic-accent"
            >
              Перевірити марку
            </Link>
          </div>
        </TectonicSlab>
      </section>
    </main>
  );
}
