"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/search", label: "Пошук" },
  { href: "/services", label: "Послуги" },
  { href: "/pricing", label: "Ціни" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакти" },
];

const servicesMenu = [
  { href: "/services", label: "Усі послуги" },
  { href: "/services/trademark-registration/ukraine", label: "Реєстрація ТМ в Україні" },
  { href: "/services/trademark-registration/eu", label: "Реєстрація ТМ в ЄС" },
  { href: "/services/trademark-registration/international", label: "Міжнародна реєстрація" },
  { href: "/services/patents", label: "Патенти та промислові зразки" },
  { href: "/services/copyright", label: "Авторське право" },
  { href: "/contact", label: "Реєстрація ТОВ, ФОП, ГО або БО" },
  { href: "/contact", label: "Інші дозволи / ліцензії / сертифікати" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-10">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1">
          <span className="serif text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            Trademark
          </span>
          <span className="serif text-2xl font-bold text-tectonic-accent sm:text-3xl">
            .com.ua
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.25em] text-tectonic-primary lg:flex xl:gap-10">
          {navItems.map((item) => {
            if (item.label !== "Послуги") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-tectonic-accent"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-2 transition-colors hover:text-tectonic-accent"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {item.label}
                  <span className="text-[10px]">▾</span>
                </Link>
                <div className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-80 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <div className="flex flex-col gap-1 border border-tectonic-primary bg-white p-4 shadow-[6px_6px_0px_0px_#0D1B2A]">
                    {servicesMenu.map((service) => (
                      <Link
                        key={`${service.href}-${service.label}`}
                        href={service.href}
                        className="px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-tectonic-primary transition-colors hover:text-tectonic-accent"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-6 lg:flex">
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-tectonic-stone-500">
            UA
          </span>
          <Link
            href="/contact"
            className="bg-tectonic-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white transition-all hover:bg-tectonic-accent"
          >
            Консультація
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-tectonic-primary lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-tectonic-stone-200 bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-tectonic-primary">
            {navItems.map((item) => {
              if (item.label !== "Послуги") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 transition-colors hover:text-tectonic-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.href} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="py-2 transition-colors hover:text-tectonic-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <div className="flex flex-col gap-2 border-l-2 border-tectonic-stone-200 pl-4 text-xs font-semibold uppercase tracking-[0.2em] text-tectonic-stone-600">
                    {servicesMenu.map((service) => (
                      <Link
                        key={`${service.href}-${service.label}`}
                        href={service.href}
                        className="py-1 transition-colors hover:text-tectonic-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
          <Link
            href="/contact"
            className="mt-6 block bg-tectonic-primary py-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-white transition-all hover:bg-tectonic-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Безкоштовна консультація
          </Link>
        </div>
      )}
    </header>
  );
}
