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
  title: "Патентування винаходів в Україні",
  description:
    "Професійні послуги з патентування винаходів, корисних моделей та промислових зразків в Україні через УКРПАТЕНТ. Від ₴6 000.",
};

const patentTypes = [
  {
    type: "Патент на винахід",
    duration: "20 років",
    price: "₴12 000",
    description: "Захист технічних рішень, що мають винахідницький рівень",
    features: [
      "Повна експертиза по суті",
      "Максимальний термін охорони",
      "Найвищий рівень захисту",
      "Міжнародне визнання",
    ],
    examTime: "18-24 місяці",
  },
  {
    type: "Корисна модель",
    duration: "10 років",
    price: "₴8 000",
    popular: true,
    description: "Швидка реєстрація технічних рішень без експертизи по суті",
    features: [
      "Швидша процедура",
      "Без експертизи новизни",
      "Нижча вартість",
      "Для простих рішень",
    ],
    examTime: "6-12 місяців",
  },
  {
    type: "Промисловий зразок",
    duration: "25 років",
    price: "₴6 000",
    description: "Захист зовнішнього вигляду виробів, упаковки, інтерфейсів",
    features: [
      "Дизайн продукції",
      "Упаковка товарів",
      "UI/UX інтерфейси",
      "Найдовший термін",
    ],
    examTime: "6-9 місяців",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Попередня консультація",
    description: "Аналізуємо ваше рішення, визначаємо тип охорони, проводимо попередній патентний пошук.",
  },
  {
    step: "02",
    title: "Патентний пошук",
    description: "Детальний пошук по базах УКРПАТЕНТ, Espacenet, WIPO для оцінки патентоспроможності.",
  },
  {
    step: "03",
    title: "Підготовка документів",
    description: "Складання опису, формули винаходу/корисної моделі, креслень та інших матеріалів.",
  },
  {
    step: "04",
    title: "Подання заявки",
    description: "Подаємо заявку до УКРПАТЕНТ, отримуємо дату пріоритету та номер заявки.",
  },
  {
    step: "05",
    title: "Експертиза",
    description: "Супроводжуємо експертизу, відповідаємо на запити експертів, вносимо зміни.",
  },
  {
    step: "06",
    title: "Отримання патенту",
    description: "Після позитивного рішення отримуємо патент на винахід, корисну модель або промзразок.",
  },
];

const whatCanBePatented = [
  {
    category: "Технічні рішення",
    examples: [
      "Пристрої та механізми",
      "Технологічні процеси",
      "Способи виробництва",
      "Хімічні сполуки",
      "Фармацевтичні препарати",
      "Біотехнології",
    ],
  },
  {
    category: "Промислові зразки",
    examples: [
      "Дизайн виробів",
      "Упаковка товарів",
      "Графічні інтерфейси",
      "Іконки та шрифти",
      "Меблі та посуд",
      "Транспортні засоби",
    ],
  },
  {
    category: "Корисні моделі",
    examples: [
      "Пристрої та прилади",
      "Інструменти",
      "Пристосування",
      "Конструктивні рішення",
      "Вдосконалення існуючих виробів",
    ],
  },
];

const faq = [
  {
    question: "Що можна запатентувати?",
    answer: "Патентувати можна технічні рішення (винаходи, корисні моделі) та зовнішній вигляд виробів (промислові зразки). Не підлягають патентуванню наукові теорії, математичні методи, комп'ютерні програми як такі, методи лікування, бізнес-методи.",
  },
  {
    question: "Чим відрізняється винахід від корисної моделі?",
    answer: "Винахід має відповідати вищим критеріям новизни та винахідницького рівня, проходить повну експертизу по суті та діє 20 років. Корисна модель — це спрощена форма захисту для простіших технічних рішень, без експертизи новизни, терміном 10 років.",
  },
  {
    question: "Скільки часу займає патентування?",
    answer: "Корисна модель — 6-12 місяців, промисловий зразок — 6-9 місяців, винахід — 18-24 місяці. Терміни залежать від завантаженості УКРПАТЕНТ та складності експертизи.",
  },
  {
    question: "Чи потрібен патентний пошук?",
    answer: "Патентний пошук не є обов'язковим, але наполегливо рекомендується. Він дозволяє оцінити патентоспроможність винаходу та уникнути відмови в реєстрації через відсутність новизни.",
  },
  {
    question: "Скільки коштує підтримання патенту?",
    answer: "Після реєстрації потрібно щорічно сплачувати підтримуюче мито. Вартість зростає з кожним роком: від ₴200-300 на початку до ₴3 000-5 000 наприкінці терміну дії патенту.",
  },
  {
    question: "Чи можна подати міжнародну патентну заявку?",
    answer: "Так, через систему РСТ (Patent Cooperation Treaty) можна подати одну міжнародну заявку, яка діятиме як національна заявка у 150+ країнах. Вартість від ₴80 000 залежно від кількості країн.",
  },
];

export default function PatentsPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8">
      {/* Hero */}
      <div className="mb-16">
        <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
          Послуги / Патенти
        </span>
        <h1 className="mt-4 text-4xl font-semibold text-tectonic-primary sm:text-5xl">
          Патентування винаходів в Україні
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-tectonic-stone-600">
          Професійний супровід патентування винаходів, корисних моделей та промислових зразків
          через УКРПАТЕНТ. Від патентного пошуку до отримання охоронного документа.
        </p>
      </div>

      {/* Patent Types */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Види охоронних документів
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Оберіть тип захисту відповідно до вашої інновації
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-3">
          {patentTypes.map((patent) => (
            <TectonicSlab
              key={patent.type}
              variant={patent.popular ? "dark" : undefined}
              className={`relative p-8 ${patent.popular ? "" : ""}`}
            >
              {patent.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tectonic-accent px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-tectonic-primary">
                  Популярний
                </div>
              )}

              <div className="mb-4">
                <h3 className={`text-xl font-semibold ${patent.popular ? "text-white" : ""}`}>
                  {patent.type}
                </h3>
                <div className={`mt-1 flex items-center gap-2 text-sm ${patent.popular ? "text-white/70" : "text-tectonic-stone-500"}`}>
                  <span className="mono text-xs text-tectonic-accent">
                    Термін: {patent.duration}
                  </span>
                </div>
              </div>

              <p className={`text-sm ${patent.popular ? "text-white/80" : "text-tectonic-stone-600"}`}>
                {patent.description}
              </p>

              <div className={`my-6 border-y py-6 ${patent.popular ? "border-white/20" : "border-tectonic-stone-200"}`}>
                <span className={`serif text-4xl font-semibold ${patent.popular ? "text-white" : ""}`}>
                  {patent.price}
                </span>
                <div className={`mt-1 text-xs ${patent.popular ? "text-white/60" : "text-tectonic-stone-500"}`}>
                  Термін: {patent.examTime}
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {patent.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 bg-tectonic-accent" />
                    <span className={`text-sm ${patent.popular ? "text-white/80" : "text-tectonic-stone-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`block py-3 text-center text-xs font-bold uppercase tracking-wider transition-all ${
                  patent.popular
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

      {/* What Can Be Patented */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Що можна запатентувати
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Приклади об'єктів, що підлягають патентуванню
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-3">
          {whatCanBePatented.map((category) => (
            <TectonicSlab key={category.category} className="p-6">
              <h3 className="text-lg font-semibold">{category.category}</h3>
              <ul className="mt-4 space-y-2">
                {category.examples.map((example) => (
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

      {/* Process */}
      <section className="mb-20">
        <Pillar className="mb-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Етапи патентування
          </h2>
          <p className="mt-2 text-tectonic-stone-600">
            Від ідеї до отримання патенту
          </p>
        </Pillar>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <TectonicSlab key={step.step} className="p-6">
              <span className="mono text-2xl font-bold text-tectonic-accent">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-tectonic-stone-600">
                {step.description}
              </p>
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
            Готові запатентувати ваш винахід?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Отримайте безкоштовну консультацію та попередню оцінку
            патентоспроможності вашого рішення.
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
          { name: "Патенти", url: "/services/patents" },
        ]),
        generateProfessionalServiceLD({
          name: "Патентування винаходів в Україні",
          description: "Професійний супровід патентування винаходів, корисних моделей та промислових зразків через УКРПАТЕНТ.",
          serviceType: "Patent Registration",
          priceRange: "₴6,000 - ₴12,000",
        }),
        generateFAQPageLD(faq),
      ])}
    </main>
  );
}
