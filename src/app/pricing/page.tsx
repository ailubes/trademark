import { Metadata } from "next";
import Link from "next/link";

import { TectonicSlab } from "@/components/tectonic/TectonicSlab";

export const metadata: Metadata = {
  title: "Ціни на реєстрацію торгових марок",
  description:
    "Прозорі ціни на реєстрацію торгових марок в Україні, ЄС та міжнародно. Фіксована вартість без прихованих платежів.",
};

const trademarkPricing = [
  {
    title: "Стандарт",
    subtitle: "Реєстрація в Україні",
    price: "6 500",
    currency: "₴",
    period: "за 1 клас МКТУ",
    duration: "12 місяців",
    popular: false,
    features: [
      "Повна перевірка доступності",
      "Підготовка та подання заявки",
      "Супровід до реєстрації",
      "Отримання свідоцтва",
      "Консультація експерта",
    ],
    note: "Державне мито включено",
  },
  {
    title: "Прискорена",
    subtitle: "Реєстрація в Україні",
    price: "43 400",
    currency: "₴",
    period: "за 1 клас МКТУ",
    duration: "8 місяців",
    popular: true,
    features: [
      "Все зі Стандарт",
      "Прискорена експертиза",
      "Пріоритетна обробка",
      "Оперативний зв'язок",
      "Моніторинг статусу 24/7",
    ],
    note: "Державне мито включено",
  },
  {
    title: "Експрес",
    subtitle: "Реєстрація в Україні",
    price: "58 200",
    currency: "₴",
    period: "за 1 клас МКТУ",
    duration: "4 місяці",
    popular: false,
    features: [
      "Все з Прискорена",
      "Найшвидша реєстрація",
      "Персональний менеджер",
      "Щоденні оновлення",
      "Гарантія термінів",
    ],
    note: "Державне мито включено",
  },
];

const internationalPricing = [
  {
    title: "Євросоюз (EUIPO)",
    price: "€850",
    description: "Захист у всіх 27 країнах ЄС однією заявкою",
    features: [
      "Перевірка по TMview",
      "Підготовка заявки",
      "Супровід процесу",
      "Отримання сертифікату",
    ],
  },
  {
    title: "Мадридська система",
    price: "від €1 200",
    description: "Міжнародна реєстрація у 130+ країнах",
    features: [
      "Базова заявка через УКРПАТЕНТ",
      "Вибір країн призначення",
      "Супровід у WIPO",
      "Моніторинг статусу",
    ],
  },
];

const additionalServices = [
  { service: "Додатковий клас МКТУ (Україна)", price: "₴1 500" },
  { service: "Перевірка торгової марки (експрес)", price: "₴1 000" },
  { service: "Юридичний висновок", price: "₴2 500" },
  { service: "Відповідь на заперечення", price: "від ₴5 000" },
  { service: "Продовження реєстрації", price: "₴4 500" },
  { service: "Внесення змін до реєстру", price: "₴1 500" },
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl font-semibold text-tectonic-primary sm:text-5xl">
          Ціни на послуги
        </h1>
        <p className="mt-4 text-lg text-tectonic-stone-600">
          Прозорі фіксовані ціни без прихованих платежів. Державне мито та всі витрати включені у вартість.
        </p>
      </div>

      {/* Ukraine Pricing */}
      <section className="mb-20">
        <div className="mb-8 flex items-center justify-between border-b-2 border-tectonic-primary pb-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Реєстрація в Україні
          </h2>
          <span className="mono text-xs uppercase tracking-wider text-tectonic-stone-500">
            УКРПАТЕНТ
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trademarkPricing.map((plan) => (
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

              <div className="mb-6">
                <span className="mono text-xs uppercase tracking-wider text-tectonic-accent">
                  {plan.duration}
                </span>
                <h3 className={`mt-2 text-2xl font-semibold ${plan.popular ? "text-white" : ""}`}>
                  {plan.title}
                </h3>
                <p className={`text-sm ${plan.popular ? "text-white/70" : "text-tectonic-stone-600"}`}>
                  {plan.subtitle}
                </p>
              </div>

              <div className={`mb-6 border-y py-6 ${plan.popular ? "border-white/20" : "border-tectonic-stone-200"}`}>
                <div className="flex items-baseline gap-1">
                  <span className={`serif text-4xl font-semibold ${plan.popular ? "text-white" : ""}`}>
                    {plan.currency}{plan.price}
                  </span>
                </div>
                <div className={`mt-1 text-sm ${plan.popular ? "text-white/60" : "text-tectonic-stone-500"}`}>
                  {plan.period}
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className={`mt-1 h-2 w-2 shrink-0 ${plan.popular ? "bg-tectonic-accent" : "bg-tectonic-accent"}`} />
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

      {/* International Pricing */}
      <section className="mb-20">
        <div className="mb-8 flex items-center justify-between border-b-2 border-tectonic-primary pb-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Міжнародна реєстрація
          </h2>
          <span className="mono text-xs uppercase tracking-wider text-tectonic-stone-500">
            EUIPO / WIPO
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {internationalPricing.map((plan) => (
            <TectonicSlab key={plan.title} className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{plan.title}</h3>
                  <p className="mt-1 text-sm text-tectonic-stone-600">
                    {plan.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="serif text-3xl font-semibold text-tectonic-accent">
                    {plan.price}
                  </div>
                  <div className="text-xs text-tectonic-stone-500">за заявку</div>
                </div>
              </div>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-tectonic-stone-600">
                    <span className="h-1.5 w-1.5 bg-tectonic-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 block border-2 border-tectonic-primary py-3 text-center text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:bg-tectonic-primary hover:text-white"
              >
                Дізнатися більше
              </Link>
            </TectonicSlab>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="mb-20">
        <div className="mb-8 border-b-2 border-tectonic-primary pb-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Додаткові послуги
          </h2>
        </div>

        <TectonicSlab className="overflow-hidden">
          <table className="w-full">
            <tbody>
              {additionalServices.map((item, index) => (
                <tr
                  key={item.service}
                  className={index !== additionalServices.length - 1 ? "border-b border-tectonic-stone-200" : ""}
                >
                  <td className="px-6 py-4 text-sm font-medium text-tectonic-primary">
                    {item.service}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-tectonic-accent">
                      {item.price}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TectonicSlab>
      </section>

      {/* CTA */}
      <section>
        <TectonicSlab variant="dark" className="p-10 text-center md:p-14">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">
            Потрібна індивідуальна пропозиція?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Для портфельних замовлень, агентств та корпоративних клієнтів ми пропонуємо
            спеціальні умови. Зв'яжіться з нами для обговорення.
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
    </main>
  );
}
