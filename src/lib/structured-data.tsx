/**
 * Utility functions for generating JSON-LD structured data for SEO
 */

interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  sameAs: string[];
}

interface Service {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
  offers?: {
    price: string;
    priceCurrency: string;
    description: string;
  }[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

const SITE_URL = "https://trademark.com.ua";

const organizationData: Organization = {
  name: "TRADEMARK.COM.UA",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "Професійна реєстрація торгових марок, патентів та авторських прав в Україні, ЄС та міжнародно",
  telephone: "+380687245000",
  email: "info@trademark.com.ua",
  address: {
    streetAddress: "",
    addressLocality: "Київ",
    addressCountry: "UA",
  },
  sameAs: [
    "https://www.facebook.com/trademark.com.ua",
    "https://t.me/trademark_ua",
    "https://www.linkedin.com/company/trademark-ua",
  ],
};

/**
 * Generate Organization structured data
 */
export function generateOrganizationLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: organizationData.name,
    url: organizationData.url,
    logo: {
      "@type": "ImageObject",
      url: organizationData.logo,
    },
    description: organizationData.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: organizationData.telephone,
      email: organizationData.email,
      contactType: "customer service",
      availableLanguage: ["uk", "en"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: organizationData.address.addressLocality,
      addressCountry: organizationData.address.addressCountry,
    },
    sameAs: organizationData.sameAs,
  };
}

/**
 * Generate WebSite structured data
 */
export function generateWebSiteLD() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "TRADEMARK.COM.UA",
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "uk",
  };
}

/**
 * Generate Service structured data
 */
export function generateServiceLD(service: Service) {
  const baseService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: service.areaServed,
    },
    serviceType: service.serviceType,
  };

  if (service.offers && service.offers.length > 0) {
    return {
      ...baseService,
      offers: service.offers.map((offer) => ({
        "@type": "Offer",
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        description: offer.description,
      })),
    };
  }

  return baseService;
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQPageLD(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbLD(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate ProfessionalService structured data for trademark/patent services
 */
export function generateProfessionalServiceLD(params: {
  name: string;
  description: string;
  serviceType: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: params.name,
    description: params.description,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: params.serviceType,
    ...(params.priceRange && { priceRange: params.priceRange }),
    areaServed: [
      {
        "@type": "Country",
        name: "Ukraine",
      },
      {
        "@type": "Place",
        name: "European Union",
      },
    ],
  };
}

/**
 * Helper to render JSON-LD in HTML
 */
export function renderJSONLD(data: object | object[]) {
  const jsonLdArray = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLdArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
