import Link from "next/link";

const footerServices = [
  { href: "/services/trademark-registration/ukraine", label: "Реєстрація ТМ в Україні" },
  { href: "/services/trademark-registration/eu", label: "Реєстрація ТМ в ЄС" },
  { href: "/services/trademark-registration/international", label: "Міжнародна реєстрація" },
  { href: "/services/patents", label: "Патенти" },
];

const footerResources = [
  { href: "/nice-classes", label: "Класи МКТУ" },
  { href: "/blog", label: "Блог" },
  { href: "/resources/faq", label: "Часті питання" },
  { href: "/resources/glossary", label: "Глосарій" },
];

const footerLegal = [
  { href: "/privacy", label: "Політика конфіденційності" },
  { href: "/terms", label: "Умови використання" },
];

export function Footer() {
  return (
    <footer className="bg-tectonic-secondary text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 sm:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <div className="serif text-3xl uppercase tracking-tight">
              Trademark<span className="text-tectonic-accent">.com.ua</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Професійна реєстрація торгових марок, патентів та авторських прав в Україні, ЄС та за Мадридською системою.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-colors hover:border-tectonic-accent hover:text-tectonic-accent"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-colors hover:border-tectonic-accent hover:text-tectonic-accent"
                aria-label="Telegram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-colors hover:border-tectonic-accent hover:text-tectonic-accent"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <p className="mono text-[10px] uppercase tracking-[0.4em] text-tectonic-accent">
              Послуги
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              {footerServices.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-tectonic-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <p className="mono text-[10px] uppercase tracking-[0.4em] text-tectonic-accent">
              Ресурси
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              {footerResources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-tectonic-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="mono text-[10px] uppercase tracking-[0.4em] text-tectonic-accent">
              Контакти
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <p>м. Київ, Україна</p>
              <p>
                <a
                  href="tel:+380687245000"
                  className="transition-colors hover:text-tectonic-accent"
                >
                  +380 (68) 724-50-00
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@trademark.com.ua"
                  className="transition-colors hover:text-tectonic-accent"
                >
                  info@trademark.com.ua
                </a>
              </p>
            </div>
            <div className="pt-2 text-xs text-white/50">
              Пн-Пт: 09:00 - 18:00
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            {footerLegal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-tectonic-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <span className="text-xs text-white/50">
            © {new Date().getFullYear()} Trademark.com.ua. Усі права захищено.
          </span>
        </div>
      </div>
    </footer>
  );
}
