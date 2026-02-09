"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Pillar } from "@/components/tectonic/Pillar";
import { TectonicSlab } from "@/components/tectonic/TectonicSlab";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="uk">
      <body>
        <main className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-8">
          <Pillar className="mb-12">
            <span className="mono text-xs font-bold uppercase tracking-wider text-tectonic-accent">
              Критична помилка
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-tectonic-primary sm:text-5xl">
              Сервіс тимчасово недоступний
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-tectonic-stone-600">
              Виникла непередбачена помилка в застосунку. Спробуйте оновити
              сторінку або поверніться пізніше.
            </p>
          </Pillar>

          <div className="grid gap-6 md:grid-cols-2">
            <TectonicSlab className="p-6">
              <h2 className="text-xl font-semibold">Спробувати ще раз</h2>
              <p className="mt-2 text-sm text-tectonic-stone-600">
                Перезапустимо застосунок та повторимо запит.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-block bg-tectonic-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-tectonic-primary transition-all hover:brightness-110"
              >
                Оновити
              </button>
            </TectonicSlab>

            <TectonicSlab className="p-6">
              <h2 className="text-xl font-semibold">Альтернативні дії</h2>
              <p className="mt-2 text-sm text-tectonic-stone-600">
                Якщо проблема повторюється, зверніться до нас напряму.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="border-2 border-tectonic-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-tectonic-primary transition-all hover:bg-tectonic-primary hover:text-white"
                >
                  На головну
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-tectonic-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-tectonic-primary transition-all hover:bg-tectonic-primary hover:text-white"
                >
                  Контакти
                </Link>
              </div>
            </TectonicSlab>
          </div>
        </main>
      </body>
    </html>
  );
}
