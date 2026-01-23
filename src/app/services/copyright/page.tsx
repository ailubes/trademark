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
  title: "Реєстрація авторського права в Україні",
  description:
    "Офіційна реєстрація авторських прав на твори, програмне забезпечення, музику, відео. Захист інтелектуальної власності від ₴3 000.",
};

const copyrightTypes = [
  {
    type: "Літературні твори",
    icon: "📚",
    examples: ["Книги та статті", "Вірші та п'єси", "Сценарії", "Переклади", "Навчальні матеріали"],
  },
  {
    type: "Музичні твори",
    icon: "🎵",
    examples: ["Музичні композиції", "Пісні з текстом", "Інструментальна музика", "Аранжування", "Саундтреки"],
  },
  {
    type: "Аудіовізуальні твори",
    icon: "🎬",
    examples: ["Фільми та відео", "Телепередачі", "Анімація", "Відеокліпи", "Документалістика"],
  },
  {
    type: "Комп'ютерні програми",
    icon: "💻",
    examples: ["Програмне забезпечення", "Мобільні додатки", "Веб-застосунки", "Бази даних", "Ігри"],
  },
  {
    type: "Художні твори",
    icon: "🎨",
    examples: ["Картини та малюнки", "Графіка та ілюстрації", "Скульптури", "Фотографії", "Дизайн"],
  },
  {
    type: "Інші твори",
    icon: "📋",
    examples: ["Карти та плани", "Наукові роботи", "Лекції та промови", "Хореографія", "Архітектурні проєкти"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Консультація",
    description: "Визначаємо тип твору, перевіряємо відповідність критеріям охороноспроможності.",
    duration: "1 день",
  },
  {
    step: "02",
    title: "Підготовка матеріалів",
    description: "Готуємо заявку, опис твору, примірники або зразки для депонування.",
    duration: "2-3 дні",
  },
  {
    step: "03",
    title: "Подання до Держінтелектсервісу",
    description: "Подаємо заявку на реєстрацію авторського права до державного органу.",
    duration: "1 день",
  },
  {
    step: "04",
    title: "Експертиза",
    description: "Держінтелектсервіс перевіряє правильність оформлення та відповідність вимогам.",
    duration: "1 місяць",
  },
  {
    step: "05",
    title: "Реєстрація",
    description: "Внесення до Державного реєстру авторського права і суміжних прав.",
    duration: "1 тиждень",
  },
  {
    step: "06",
    title: "Отримання свідоцтва",
    description: "Видача офіційного свідоцтва про реєстрацію авторського права.",
    duration: "1 тиждень",
  },
];

const pricing = [
  {
    title: "Базовий",
    price: "3 000",
    description: "Один твір, стандартний термін",
    features: [
      "Консультація юриста",
      "Підготовка заявки",
      "Подання до держоргану",
      "Супровід реєстрації",
      "Отримання свідоцтва",
    ],
  },
  {
    title: "Стандарт",
    price: "7 500",
    popular: true,
    description: "До 3 творів",
    features: [
      "Все з Базовий",
      "Реєстрація до 3 творів",
      "Детальний юридичний висновок",
      "Пріоритетна обробка",
      "Електронні копії документів",
    ],
  },
  {
    title: "Преміум",
    price: "15 000",
    description: "До 10 творів",
    features: [
      "Все зі Стандарт",
      "Реєстрація до 10 творів",
      "Персональний менеджер",
      "Договори про передачу прав",
      "Ліцензійні угоди",
    ],
  },
];

const benefits = [
  {
    title: "Офіційне підтвердження",
    description: "Свідоцтво державного зразка є офіційним доказом авторства в суді.",
  },
  {
    title: "Захист прав",
    description: "Можливість захистити свої права в судових та адміністративних органах.",
  },
  {
    title: "Комерціалізація",
    description: "Легше продавати ліцензії, укладати договори, залучати інвестиції.",
  },
  {
    title: "Міжнародне визнання",
    description: "Україна — учасниця Бернської конвенції, права діють у 180+ країнах.",
  },
  {
    title: "Довічна охорона",
    description: "Авторське право діє протягом життя автора + 70 років після смерті.",
  },
  {
    title: "Швидка процедура",
    description: "Реєстрація займає 1-2 місяці від подання до отримання свідоцтва.",
  },
];

const faq = [
  {
    question: "Чи потрібно реєструвати авторське право?",
    answer: "Авторське право виникає автоматично при створенні твору. Реєстрація не є обов'язковою, але надає офіційне підтвердження авторства, яке є важливим доказом у судових спорах.",
  },
  {
    question: "Скільки діє авторське право?",
    answer: "Авторське право на твори літератури, мистецтва та науки діє протягом усього життя автора і 70 років після його смерті. Для програмного забезпечення — також 70 років після створення або оприлюднення.",
  },
  {
    question: "Чи можна зареєструвати ідею?",
    answer: "Ні, авторське право охороняє лише конкретну форму вираження ідеї, а не саму ідею. Ідея, концепція, метод, принцип не підлягають реєстрації.",
  },
  {
    question: "Що таке суміжні права?",
    answer: "Суміжні права — це права виконавців, виробників фонограм і відеограм, організацій мовлення. Вони схожі на авторські, але стосуються виконання, а не створення твору.",
  },
  {
    question: "Чи потрібно продовжувати реєстрацію?",
    answer: "Ні, авторське право не потребує продовження. Після реєстрації воно діє автоматично протягом усього терміну охорони без додаткових платежів.",
  },
  {
    question: "Чи діє українське авторське право за кордоном?",
    answer: "Так, завдяки Бернській конвенції українські автори автоматично отримують захист у всіх країнах-учасницях (180+ країн) без додаткової реєстрації.",
  },
];

export default function CopyrightPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8">
      {/* Hero */}
      <div className="mb-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
            Послуги / Авторське право
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-tectonic-primary sm:text-5xl">
            Реєстрація авторського права
          </h1>
          <p className="mt-6 text-lg text-tectonic-stone-600">
            Офіційна реєстрація авторських прав на літературні, музичні, аудіовізуальні твори,
            програмне забезпечення та інші об'єкти інтелектуальної власності.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="bg-tectonic-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-tectonic-accent hover:text-tectonic-primary"
            >
              Замовити реєстрацію
            </Link>
            <a
              href="tel:+380687245000"
              className="border-2 border-tectonic-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:bg-tectonic-primary hover:text-white"
            >
              +380 (68) 724-50-00
            </a>
          </div>
        </div>

        <TectonicSlab className="p-8">
          <div className="mb-6 text-xs font-semibold uppercase tracking-wider text-tectonic-stone-500">
            Вартість від
          </div>
          <div className="flex items-baseline gap-2">
            <span className="serif text-5xl font-semibold">₴3 000</span>
            <span className="text-tectonic-stone-500">/ 1 твір</span>
          </div>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Термін 1-2 місяці
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Офіційне свідоцтво
            </li>
            <li className="flex items-center gap-3 text-sm text-tectonic-stone-600">
              <span className="h-2 w-2 bg-tectonic-accent" />
              Довічна охорона + 70 років
            </li>
          </ul>
        </TectonicSlab>
      </div>

      {/* Copyright Types */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Що можна зареєструвати
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Види творів, що підлягають реєстрації авторського права
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {copyrightTypes.map((type) => (
            <TectonicSlab key={type.type} className="p-6">
              <div className="mb-3 text-3xl">{type.icon}</div>
              <h3 className="text-lg font-semibold">{type.type}</h3>
              <ul className="mt-4 space-y-2">
                {type.examples.map((example) => (
                  <li key={example} className="flex items-center gap-2 text-sm text-tectonic-stone-600">
                    <span className="h-1.5 w-1.5 bg-tectonic-accent" />
                    {example}
                  </li>
                ))}
              </ul>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Переваги реєстрації
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Чому варто офіційно зареєструвати авторське право
          </p>
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
            Процес реєстрації від консультації до отримання свідоцтва
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
            Оберіть пакет залежно від кількості творів
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
                  ₴{plan.price}
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
            Готові зареєструвати авторське право?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Отримайте безкоштовну консультацію щодо захисту ваших творів
            та процедури реєстрації авторських прав.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="bg-tectonic-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:brightness-110"
            >
              Безкоштовна консультація
            </Link>
            <a
              href="tel:+380687245000"
              className="border-2 border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-tectonic-accent hover:text-tectonic-accent"
            >
              +380 (68) 724-50-00
            </a>
          </div>
        </TectonicSlab>
      </section>

      {/* Structured Data */}
      {renderJSONLD([
        generateBreadcrumbLD([
          { name: "Головна", url: "/" },
          { name: "Послуги", url: "/services" },
          { name: "Авторське право", url: "/services/copyright" },
        ]),
        generateProfessionalServiceLD({
          name: "Реєстрація авторського права в Україні",
          description: "Офіційна реєстрація авторських прав на літературні, музичні, аудіовізуальні твори, програмне забезпечення.",
          serviceType: "Copyright Registration",
          priceRange: "₴3,000 - ₴15,000",
        }),
        generateFAQPageLD(faq),
      ])}
    </main>
  );
}
