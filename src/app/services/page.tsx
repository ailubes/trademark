import { Metadata } from "next";
import Link from "next/link";

import { TectonicSlab } from "@/components/tectonic/TectonicSlab";
import { Pillar } from "@/components/tectonic/Pillar";
import { generateBreadcrumbLD, renderJSONLD } from "@/lib/structured-data";

const servicesPageDescription =
  "Повний спектр послуг з реєстрації та захисту торгових марок, патентів і авторських прав, а також супровід бізнес-реєстрацій та дозвільних документів в Україні та за кордоном.";

export const metadata: Metadata = {
  title: "Послуги з реєстрації інтелектуальної власності",
  description: servicesPageDescription,
};

const services = [
  {
    category: "Торгові марки",
    description:
      "Реєстрація та захист вашого бренду в Україні, Європейському Союзі та міжнародна реєстрація за Мадридською угодою",
    items: [
      {
        title: "Реєстрація в Україні",
        description: "Повний супровід реєстрації торгової марки через УКРНОІВІ",
        price: "від ₴6 500",
        href: "/services/trademark-registration/ukraine",
        features: ["12 місяців до реєстрації", "Державне мито включено", "Перевірка доступності"],
      },
      {
        title: "Реєстрація в ЄС",
        description: "Захист у всіх 27 країнах Євросоюзу через EUIPO",
        price: "від €850",
        href: "/services/trademark-registration/eu",
        features: ["Єдина заявка на 27 країн", "Термін 4-6 місяців", "Пошук по TMview"],
      },
      {
        title: "Міжнародна реєстрація",
        description: "Захист у 130+ країнах через Мадридську систему WIPO",
        price: "від €1 200",
        href: "/services/trademark-registration/international",
        features: ["Вибір країн призначення", "Централізоване управління", "Економія коштів"],
      },
    ],
  },
  {
    category: "Патенти",
    description: "Патенти на винаходи й корисні моделі та свідоцтва на промислові зразки",
    items: [
      {
        title: "Патент на винахід",
        description: "Захист технічних рішень терміном до 20 років",
        price: "від ₴12 000",
        href: "/services/patents",
        features: ["Патентний пошук", "Складання формули", "Супровід експертизи"],
      },
      {
        title: "Корисна модель",
        description: "Швидка реєстрація технічних рішень",
        price: "від ₴8 000",
        href: "/services/patents",
        features: ["Прискорена процедура", "Термін до 10 років", "Без експертизи по суті"],
      },
      {
        title: "Свідоцтво на промисловий зразок",
        description: "Оформлення свідоцтва для захисту зовнішнього вигляду виробів",
        price: "від ₴6 000",
        href: "/services/patents",
        features: ["Дизайн продукції", "Упаковка", "Інтерфейси"],
      },
    ],
  },
  {
    category: "Авторське право",
    description: "Реєстрація та захист творів, програмного забезпечення, баз даних",
    items: [
      {
        title: "Реєстрація авторського права",
        description: "Офіційна реєстрація творів у державному реєстрі",
        price: "від ₴3 000",
        href: "/services/copyright",
        features: ["Літературні твори", "Музичні твори", "Комп'ютерні програми"],
      },
      {
        title: "Реєстрація договору про передачу авторських прав",
        description: "Офіційна реєстрація договору для підтвердження переходу прав",
        price: "за запитом",
        href: "/services/copyright",
        features: ["Підготовка договору", "Реєстрація у держоргані", "Юридичний супровід"],
      },
    ],
  },
  {
    category: "Бізнес та дозволи",
    description: "Реєстрація бізнесу та дозвільні документи для законної діяльності",
    items: [
      {
        title: "Реєстрація ТОВ, ФОП, ГО або благодійної організації",
        description: "Підготовка документів та супровід державної реєстрації бізнесу.",
        price: "за запитом",
        href: "/contact",
        features: ["Підбір КВЕД", "Статут і рішення", "Подача до держреєстратора"],
      },
      {
        title: "Інші дозволи/ліцензії/сертифікати",
        description:
          "Надаємо комплексний правовий супровід з отримання всіх дозвільних, ліцензійних і сертифікаційних документів, необхідних для законної діяльності бізнесу.",
        price: "за запитом",
        href: "/contact",
        features: ["Ліцензійні умови", "Дозвільні документи", "Сертифікація продукції"],
      },
    ],
  },
];

const serviceListItems = services.flatMap((category) =>
  category.items.map((item) => ({
    name: item.title,
    description: item.description,
    url: item.href,
  })),
);

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl font-semibold text-tectonic-primary sm:text-5xl">
          Наші послуги
        </h1>
        <p className="mt-4 text-lg text-tectonic-stone-600">
          Повний спектр послуг з реєстрації та захисту інтелектуальної власності, а також супровід
          бізнес-реєстрацій і дозвільних документів. Від перевірки доступності до отримання охоронного документа.
        </p>
      </div>

      {/* Services */}
      {services.map((category, categoryIndex) => (
        <section key={category.category} className="mb-20">
          <Pillar className="mb-8">
            <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
              0{categoryIndex + 1} / {category.category}
            </span>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              {category.category}
            </h2>
            <p className="mt-2 text-tectonic-stone-600">{category.description}</p>
          </Pillar>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.items.map((service) => (
              <Link key={service.title} href={service.href}>
                <TectonicSlab className="h-full p-6 transition-all">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-tectonic-stone-600">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-tectonic-stone-500">
                        <span className="h-1.5 w-1.5 bg-tectonic-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-tectonic-stone-200 pt-4">
                    <span className="text-lg font-bold text-tectonic-accent">
                      {service.price}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-tectonic-primary">
                      Детальніше →
                    </span>
                  </div>
                </TectonicSlab>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section>
        <TectonicSlab variant="dark" className="p-10 md:p-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                Не знаєте, яка послуга вам потрібна?
              </h3>
              <p className="mt-4 text-sm text-white/70">
                Отримайте безкоштовну консультацію від наших експертів.
                Ми допоможемо обрати оптимальну стратегію захисту.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-tectonic-accent px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:brightness-110"
            >
              Безкоштовна консультація
            </Link>
          </div>
        </TectonicSlab>
      </section>

      {/* Structured Data */}
      {renderJSONLD([
        generateBreadcrumbLD([
          { name: "Головна", url: "/" },
          { name: "Послуги", url: "/services" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Послуги",
          description: servicesPageDescription,
          url: "https://trademark.com.ua/services",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: serviceListItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: {
                "@type": "Service",
                name: item.name,
                description: item.description,
                url: `https://trademark.com.ua${item.url}`,
              },
            })),
          },
        },
      ])}
    </main>
  );
}
