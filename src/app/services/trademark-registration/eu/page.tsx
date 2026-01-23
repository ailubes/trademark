import { Metadata } from "next";
import Link from "next/link";

import { TectonicSlab } from "@/components/tectonic/TectonicSlab";
import { Pillar } from "@/components/tectonic/Pillar";

export const metadata: Metadata = {
  title: "Реєстрація торгової марки в ЄС",
  description:
    "Професійна реєстрація торгової марки в Європейському Союзі через EUIPO. Захист у всіх 27 країнах ЄС однією заявкою. Від €850.",
};

const processSteps = [
  {
    step: "01",
    title: "Перевірка доступності",
    description: "Комплексний пошук по базі EUIPO та TMview для виявлення конфліктних марок у всіх країнах ЄС.",
    duration: "2-3 дні",
  },
  {
    step: "02",
    title: "Підготовка заявки",
    description: "Формуємо заявку англійською мовою, визначаємо класи МКТУ, готуємо зображення марки.",
    duration: "3-4 дні",
  },
  {
    step: "03",
    title: "Подання до EUIPO",
    description: "Подаємо заявку в електронному вигляді до Відомства ЄС з інтелектуальної власності.",
    duration: "1 день",
  },
  {
    step: "04",
    title: "Формальна експертиза",
    description: "EUIPO перевіряє правильність оформлення та класифікації товарів і послуг.",
    duration: "1 місяць",
  },
  {
    step: "05",
    title: "Публікація та опозиція",
    description: "Марка публікується в бюлетені. Період для подання заперечень від третіх осіб.",
    duration: "3 місяці",
  },
  {
    step: "06",
    title: "Отримання сертифікату",
    description: "Реєстрація марки та видача сертифікату на торгову марку ЄС терміном на 10 років.",
    duration: "1-2 тижні",
  },
];

const pricing = [
  {
    title: "Стандарт",
    price: "850",
    duration: "4-6 місяців",
    description: "Стандартний термін реєстрації",
    features: [
      "Перевірка по TMview",
      "Підготовка заявки",
      "1 клас МКТУ",
      "Супровід процесу",
      "Отримання сертифікату",
    ],
  },
  {
    title: "Розширена",
    price: "1 150",
    duration: "4-6 місяців",
    popular: true,
    description: "Реєстрація у 3 класах МКТУ",
    features: [
      "Все зі Стандарт",
      "3 класи МКТУ",
      "Детальний юридичний висновок",
      "Пріоритетна підтримка",
      "Моніторинг заперечень",
    ],
  },
  {
    title: "Преміум",
    price: "1 650",
    duration: "4-6 місяців",
    description: "Максимальний захист у 5 класах",
    features: [
      "Все з Розширена",
      "5 класів МКТУ",
      "Fast Track процедура",
      "Персональний менеджер",
      "Відповідь на опозиції",
    ],
  },
];

const benefits = [
  {
    title: "Захист у 27 країнах",
    description: "Одна заявка забезпечує захист у всіх країнах-членах ЄС автоматично.",
    icon: "🇪🇺",
  },
  {
    title: "Єдине продовження",
    description: "Продовжувати реєстрацію потрібно лише один раз для всього ЄС.",
    icon: "🔄",
  },
  {
    title: "Економія коштів",
    description: "Значно дешевше, ніж реєструвати марку окремо в кожній країні ЄС.",
    icon: "💰",
  },
  {
    title: "Швидка процедура",
    description: "Процес реєстрації займає в середньому 4-6 місяців.",
    icon: "⚡",
  },
];

const faq = [
  {
    question: "Які країни входять до ЄС для цілей реєстрації?",
    answer: "Торгова марка ЄС діє у всіх 27 країнах-членах: Австрія, Бельгія, Болгарія, Хорватія, Кіпр, Чехія, Данія, Естонія, Фінляндія, Франція, Німеччина, Греція, Угорщина, Ірландія, Італія, Латвія, Литва, Люксембург, Мальта, Нідерланди, Польща, Португалія, Румунія, Словаччина, Словенія, Іспанія та Швеція.",
  },
  {
    question: "Чи потрібна національна реєстрація в Україні?",
    answer: "Реєстрація ЄС не покриває Україну. Якщо ви ведете бізнес в Україні, рекомендуємо окрему національну реєстрацію через УКРПАТЕНТ.",
  },
  {
    question: "Що станеться з моєю маркою після Brexit?",
    answer: "Після Brexit торгові марки ЄС більше не діють у Великій Британії. Якщо ваша марка була зареєстрована до Brexit, ви автоматично отримали еквівалентну британську марку. Для нових реєстрацій потрібна окрема заявка до UK IPO.",
  },
  {
    question: "Скільки класів МКТУ включено у вартість?",
    answer: "Базовий тариф EUIPO включає до 3 класів МКТУ. Кожен додатковий клас коштує €150. Наші пакети включають різну кількість класів відповідно до тарифу.",
  },
  {
    question: "Що таке період опозиції?",
    answer: "Після публікації заявки є 3-місячний період, коли власники схожих марок можуть подати заперечення. Ми моніторимо цей період та допомагаємо відповідати на опозиції при необхідності.",
  },
];

export default function TrademarkEUPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8">
      {/* Hero */}
      <div className="mb-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
            Послуги / Міжнародна реєстрація
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-tectonic-primary sm:text-5xl">
            Реєстрація торгової марки в Європейському Союзі
          </h1>
          <p className="mt-6 text-lg text-tectonic-stone-600">
            Захистіть свій бренд у всіх 27 країнах ЄС однією заявкою через EUIPO.
            Швидка процедура, єдине продовження, економія коштів.
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
            <span className="serif text-5xl font-semibold">€850</span>
            <span className="text-tectonic-stone-500">/ 1 клас МКТУ</span>
          </div>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Захист у 27 країнах ЄС
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Термін 4-6 місяців
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Діє 10 років з можливістю продовження
            </li>
          </ul>
        </TectonicSlab>
      </div>

      {/* Benefits */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Переваги торгової марки ЄС
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Чому варто обрати європейську реєстрацію
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <TectonicSlab key={benefit.title} className="p-6 text-center">
              <div className="mb-4 text-4xl">{benefit.icon}</div>
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
            Процес реєстрації торгової марки через EUIPO
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
            Оберіть пакет залежно від кількості класів МКТУ
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

              <span className="mono text-xs uppercase tracking-wider text-tectonic-accent">
                {plan.duration}
              </span>
              <h3 className={`mt-2 text-2xl font-semibold ${plan.popular ? "text-white" : ""}`}>
                {plan.title}
              </h3>
              <p className={`text-sm ${plan.popular ? "text-white/70" : "text-tectonic-stone-600"}`}>
                {plan.description}
              </p>

              <div className={`my-6 border-y py-6 ${plan.popular ? "border-white/20" : "border-tectonic-stone-200"}`}>
                <span className={`serif text-4xl font-semibold ${plan.popular ? "text-white" : ""}`}>
                  €{plan.price}
                </span>
                <span className={`ml-2 text-sm ${plan.popular ? "text-white/60" : "text-tectonic-stone-500"}`}>
                  / заявка
                </span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 bg-tectonic-accent" />
                    <span className={`text-sm ${plan.popular ? "text-white/80" : "text-tectonic-stone-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

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
            Готові зареєструвати торгову марку в ЄС?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Отримайте безкоштовну консультацію та дізнайтеся,
            чи доступна ваша марка для реєстрації в Європейському Союзі.
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
