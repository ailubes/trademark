import Link from "next/link";

import { Pillar } from "@/components/tectonic/Pillar";
import { TectonicSlab } from "@/components/tectonic/TectonicSlab";
import { ErrorMascot } from "@/components/layout/ErrorMascot";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-8">
      <ErrorMascot />

      <Pillar className="mb-12 mt-12">
        <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
          404 / Сторінку не знайдено
        </span>
        <h1 className="mt-4 text-4xl font-semibold text-tectonic-primary sm:text-5xl">
          Сторінка відсутня
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-tectonic-stone-600">
          Схоже, цієї сторінки не існує або вона була переміщена. Перейдіть на
          головну або оберіть потрібну послугу.
        </p>
      </Pillar>

      <div className="grid gap-6 md:grid-cols-3">
        <TectonicSlab className="p-6">
          <h2 className="text-xl font-semibold">Повернутись на головну</h2>
          <p className="mt-2 text-sm text-tectonic-stone-600">
            Огляд ключових послуг та швидкий пошук торгових марок.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block border-2 border-tectonic-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-tectonic-primary transition-all hover:bg-tectonic-primary hover:text-white"
          >
            На головну
          </Link>
        </TectonicSlab>

        <TectonicSlab className="p-6">
          <h2 className="text-xl font-semibold">Наші послуги</h2>
          <p className="mt-2 text-sm text-tectonic-stone-600">
            Реєстрація ТМ, патенти, авторське право та інші послуги.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-block border-2 border-tectonic-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-tectonic-primary transition-all hover:bg-tectonic-primary hover:text-white"
          >
            Перейти
          </Link>
        </TectonicSlab>

        <TectonicSlab className="p-6">
          <h2 className="text-xl font-semibold">Зв'яжіться з нами</h2>
          <p className="mt-2 text-sm text-tectonic-stone-600">
            Отримайте консультацію та допомогу з вашим запитом.
          </p>
          <div className="mt-4 text-sm text-tectonic-stone-600">
            <a href="tel:+380687245000" className="block font-semibold text-tectonic-primary hover:text-tectonic-accent">
              +380 (68) 724-50-00
            </a>
            <a
              href="mailto:info@trademark.com.ua"
              className="mt-1 block font-semibold text-tectonic-primary hover:text-tectonic-accent"
            >
              info@trademark.com.ua
            </a>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-block bg-tectonic-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-tectonic-primary transition-all hover:brightness-110"
          >
            Консультація
          </Link>
        </TectonicSlab>
      </div>
    </main>
  );
}
