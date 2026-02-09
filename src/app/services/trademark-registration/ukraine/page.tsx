import { Metadata } from "next";
import Link from "next/link";

import { TectonicSlab } from "@/components/tectonic/TectonicSlab";
import { Pillar } from "@/components/tectonic/Pillar";
import {
  generateProfessionalServiceLD,
  generateFAQPageLD,
  generateBreadcrumbLD,
  renderJSONLD,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Реєстрація торгової марки в Україні",
  description:
    "Професійна реєстрація торгової марки в Україні через УКРНОІВІ. Повний супровід від перевірки до отримання свідоцтва. Від 6 500 грн.",
};

const processSteps = [
  {
    step: "01",
    title: "Перевірка доступності",
    description: "Проводимо пошук по базі УКРНОІВІ та TMview для виявлення схожих марок і оцінки ризиків.",
    duration: "1-2 дні",
  },
  {
    step: "02",
    title: "Підготовка заявки",
    description: "Формуємо заявку, визначаємо класи МКТУ, готуємо всі необхідні документи.",
    duration: "2-3 дні",
  },
  {
    step: "03",
    title: "Подання до УКРНОІВІ",
    description: "Подаємо заявку в електронному вигляді, отримуємо номер заявки та дату пріоритету.",
    duration: "1 день",
  },
  {
    step: "04",
    title: "Формальна експертиза",
    description: "УКРНОІВІ перевіряє правильність оформлення заявки та сплату мита.",
    duration: "1-2 місяці",
  },
  {
    step: "05",
    title: "Експертиза по суті",
    description: "Перевірка на відповідність вимогам та відсутність підстав для відмови.",
    duration: "6-10 місяців",
  },
  {
    step: "06",
    title: "Отримання свідоцтва",
    description: "Реєстрація марки та видача свідоцтва на торгову марку терміном на 10 років.",
    duration: "1-2 тижні",
  },
];

const pricing = [
  {
    title: "Стандарт",
    popular: false,
    price: "6 500",
    duration: "12 місяців",
    description: "Стандартний термін реєстрації",
    features: [
      "Попередня перевірка",
      "Підготовка заявки",
      "Державне мито включено",
      "Супровід процесу",
      "Отримання свідоцтва",
    ],
  },
];

const faq = [
  {
    question: "Що таке торгова марка?",
    answer: "Торгова марка — це позначення (слово, зображення, комбінація), яке дозволяє відрізняти товари та послуги одних осіб від товарів та послуг інших. Реєстрація надає виключне право на використання.",
  },
  {
    question: "Що таке класи МКТУ?",
    answer: "МКТУ (Міжнародна класифікація товарів і послуг) ділить всі товари і послуги на 45 класів. При реєстрації потрібно обрати класи, в яких буде захищена марка.",
  },
  {
    question: "Скільки діє свідоцтво?",
    answer: "Свідоцтво на торгову марку в Україні діє 10 років від дати подання заявки. Потім можна продовжити необмежену кількість разів по 10 років.",
  },
  {
    question: "Чи можна зареєструвати марку, яка використовується?",
    answer: "Так, можна зареєструвати марку, яку ви вже використовуєте. Однак, якщо хтось зареєструє схожу марку раніше, можуть виникнути проблеми.",
  },
];

export default function TrademarkUkrainePage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8">
      {/* Hero */}
      <div className="mb-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
            Послуги / Торгові марки
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-tectonic-primary sm:text-5xl">
            Реєстрація торгової марки в Україні
          </h1>
          <p className="mt-6 text-lg text-tectonic-stone-600">
            Професійний супровід реєстрації торгової марки через УКРНОІВІ.
            Від перевірки доступності до отримання свідоцтва — все включено у фіксовану вартість.
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
            <span className="serif text-5xl font-semibold">₴6 500</span>
            <span className="text-tectonic-stone-500">/ 1 клас МКТУ</span>
          </div>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Державне мито включено
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Повний супровід процесу
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Без прихованих платежів
            </li>
          </ul>
        </TectonicSlab>
      </div>

      {/* Process */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Етапи реєстрації
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Повний процес від подання заявки до отримання свідоцтва
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
            Тариф
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Фіксована вартість стандартної реєстрації
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-1">
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
                  ₴{plan.price}
                </span>
                <span className={`ml-2 text-sm ${plan.popular ? "text-white/60" : "text-tectonic-stone-500"}`}>
                  / 1 клас
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
            Готові зареєструвати торгову марку?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Отримайте безкоштовну консультацію та дізнайтеся,
            чи доступна ваша марка для реєстрації.
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

      {/* Structured Data */}
      {renderJSONLD([
        generateBreadcrumbLD([
          { name: "Головна", url: "/" },
          { name: "Послуги", url: "/services" },
          { name: "Реєстрація ТМ в Україні", url: "/services/trademark-registration/ukraine" },
        ]),
        generateProfessionalServiceLD({
          name: "Реєстрація торгової марки в Україні",
          description: "Професійний супровід реєстрації торгової марки через УКРНОІВІ. Від перевірки доступності до отримання свідоцтва.",
          serviceType: "Trademark Registration",
          priceRange: "₴6,500",
        }),
        generateFAQPageLD(faq),
      ])}
    </main>
  );
}
