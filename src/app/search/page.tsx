import { Metadata } from "next";

import { SearchInputGroup } from "@/components/tectonic/SearchInputGroup";
import { TectonicSlab } from "@/components/tectonic/TectonicSlab";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пошук торгової марки",
  description:
    "Перевірте доступність вашої торгової марки в базах України, ЄС та WIPO. Миттєвий онлайн пошук по 136+ мільйонам записів.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

const searchSources = [
  {
    name: "УКРНОІВІ",
    description: "Національний реєстр України",
    records: "200 000+",
    status: "active",
  },
  {
    name: "TMview (EUIPO)",
    description: "Європейський реєстр, 80+ країн",
    records: "136 000 000+",
    status: "active",
  },
  {
    name: "WIPO GBD",
    description: "Мадридська система, 130+ країн",
    records: "50 000 000+",
    status: "active",
  },
];

export default function SearchPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-tectonic-primary sm:text-5xl">
          Пошук торгової марки
        </h1>
        <p className="mt-4 text-lg text-tectonic-stone-600">
          Перевірте доступність вашої марки в реєстрах України, Європейського Союзу
          та за Мадридською системою. Отримайте миттєву оцінку ризиків.
        </p>
      </div>

      <SearchInputGroup
        action="/search"
        method="get"
        className="mt-10"
        placeholder="Введіть назву торгової марки..."
        buttonLabel="Шукати"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {searchSources.map((source) => (
          <TectonicSlab key={source.name} className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{source.name}</h3>
              <span className="mono text-[10px] uppercase tracking-wider text-emerald-600">
                Активний
              </span>
            </div>
            <p className="mt-2 text-sm text-tectonic-stone-600">
              {source.description}
            </p>
            <div className="mt-4 mono text-xs text-tectonic-stone-500">
              {source.records} записів
            </div>
          </TectonicSlab>
        ))}
      </div>

      <div className="mt-12 border-t-2 border-tectonic-stone-200 pt-12">
        <h2 className="text-2xl font-semibold">Як працює пошук</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-tectonic-accent">Пошук за назвою</h3>
            <p className="mt-2 text-sm text-tectonic-stone-600">
              Система шукає точні та схожі співпадіння з урахуванням фонетичної схожості,
              транслітерації та можливих варіантів написання.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-tectonic-accent">Оцінка ризиків</h3>
            <p className="mt-2 text-sm text-tectonic-stone-600">
              Для кожного результату розраховується відсоток схожості та визначається
              рівень ризику конфлікту з існуючими марками.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-tectonic-accent">Класи МКТУ</h3>
            <p className="mt-2 text-sm text-tectonic-stone-600">
              Фільтрація за класами Міжнародної класифікації товарів і послуг
              для точного визначення сфери захисту.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-tectonic-accent">Експертний аналіз</h3>
            <p className="mt-2 text-sm text-tectonic-stone-600">
              Після автоматичного пошуку наші фахівці готові надати детальний
              юридичний висновок та рекомендації.
            </p>
          </div>
        </div>
      </div>

      <TectonicSlab variant="dark" className="mt-12 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Потрібна детальна перевірка?
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Наші експерти проведуть повний аналіз та підготують юридичний висновок.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-tectonic-accent px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-tectonic-primary transition-all hover:brightness-110"
          >
            Замовити аналіз
          </Link>
        </div>
      </TectonicSlab>
    </main>
  );
}
