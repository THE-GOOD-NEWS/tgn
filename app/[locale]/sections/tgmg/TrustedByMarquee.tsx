"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export function TrustedByMarquee() {
  const t = useTranslations("tgmg.trustedBy");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const partnerLogos = [
    { id: "1", src: "/assets/newLogos/2025-Entreprenelle-logo.png", alt: "Entreprenelle" },
    { id: "2", src: "/assets/newLogos/257-2570094_transparent-background-vodafone-logo.png", alt: "Vodafone" },
    { id: "3", src: "/assets/newLogos/ANIMATEX.png", alt: "Animatex" },
    { id: "4", src: "/assets/newLogos/AUC.png", alt: "AUC" },
    { id: "5", src: "/assets/newLogos/Al-Ahly-Sabbour.webp", alt: "Al Ahly Sabbour" },
    { id: "6", src: "/assets/newLogos/BTC.png", alt: "BTC" },
    { id: "7", src: "/assets/newLogos/COP.png", alt: "COP" },
    { id: "8", src: "/assets/newLogos/CREATIVE INDUSTRY SUMMIT.png", alt: "Creative Industry Summit" },
    { id: "9", src: "/assets/newLogos/European_Commission.svg.webp", alt: "European Commission" },
    { id: "10", src: "/assets/newLogos/Google__G__logo.svg.webp", alt: "Google" },
    { id: "11", src: "/assets/newLogos/IOM_Logo.png", alt: "IOM" },
    { id: "12", src: "/assets/newLogos/Masar Logo - 1.png", alt: "Masar" },
    { id: "13", src: "/assets/newLogos/Plan_International_Logo_blue.jpg", alt: "Plan International" },
    { id: "14", src: "/assets/newLogos/SAVE THE CHILDREN.webp", alt: "Save the Children" },
    { id: "15", src: "/assets/newLogos/SCHNEIDER.png", alt: "Schneider" },
    { id: "16", src: "/assets/newLogos/STARTUPS WITHOUT BOARDERS.png", alt: "Startups Without Borders" },
    { id: "17", src: "/assets/newLogos/SYNC SUMMIT.png", alt: "Sync Summit" },
    { id: "18", src: "/assets/newLogos/TETRA PAK.png", alt: "Tetra Pak" },
    { id: "19", src: "/assets/newLogos/UNHCR.svg.webp", alt: "UNHCR" },
    { id: "20", src: "/assets/newLogos/UNICEF_Logo.png", alt: "UNICEF text" },
    { id: "21", src: "/assets/newLogos/UN_Women_Logo.svg.webp", alt: "UN Women" },
    { id: "22", src: "/assets/newLogos/US EMBASSY.png", alt: "US Embassy" },
    { id: "23", src: "/assets/newLogos/mountain view.jpg", alt: "Mountain View" },
    { id: "24", src: "/assets/newLogos/palm hills.png", alt: "Palm Hills" },
    { id: "25", src: "/assets/newLogos/rise up summit.png", alt: "RiseUp Summit" },
  ];

  // Split partner logos into two rows for alternating marquee directions
  const firstRowLogos = partnerLogos.filter((_, idx) => idx % 2 === 0);
  const secondRowLogos = partnerLogos.filter((_, idx) => idx % 2 !== 0);

  // Duplicate lists for infinite smooth scrolling
  const marqueeList1 = [...firstRowLogos, ...firstRowLogos];
  const marqueeList2 = [...secondRowLogos, ...secondRowLogos];

  return (
    <section id="trusted-by" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div dir={isRTL ? "rtl" : "ltr"} className="text-center space-y-3 max-w-2xl mx-auto">
          {/* <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cream text-gray-800 border border-gray-200 shadow-sm">
            {isRTL ? "شركاء النجاح" : "Partners & Clients"}
          </span> */}
          <h2
            className={`text-3xl sm:text-4xl font-black text-gray-900 ${isRTL ? "font-arabic-header" : "font-english-header"
              }`}
          >
            {t("title")}
          </h2>
          {/* <p
            className={`text-base text-gray-600 ${
              isRTL ? "font-arabic-body" : "font-english-body"
            }`}
          >
            {t("subtitle")}
          </p> */}
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative w-full overflow-hidden py-4 space-y-6">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute top-0 left-0 bottom-0 w-36 sm:w-60 md:w-80 lg:w-96 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-36 sm:w-60 md:w-80 lg:w-96 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* First Row - Moving Left */}
        <div className="animate-marquee-left flex gap-6 items-center">
          {marqueeList1.map((logo, idx) => (
            <div
              key={`row1-${logo.id}-${idx}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-24 w-44 flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 hover:shadow-md"
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="176px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Moving Right (Vice Versa) */}
        <div className="animate-marquee-right flex gap-6 items-center">
          {marqueeList2.map((logo, idx) => (
            <div
              key={`row2-${logo.id}-${idx}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-24 w-44 flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 hover:shadow-md"
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="176px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
