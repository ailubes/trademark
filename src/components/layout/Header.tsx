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
            .ua
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.25em] text-tectonic-primary lg:flex xl:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-tectonic-accent"
            >
              {item.label}
            </Link>
          ))}
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 transition-colors hover:text-tectonic-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
