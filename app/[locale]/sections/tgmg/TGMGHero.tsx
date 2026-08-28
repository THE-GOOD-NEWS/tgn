"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function TGMGHero() {
  const t = useTranslations("tgmg.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee autoplay on iOS Safari / WebKit devices
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay fallback handled gracefully
      });
    }
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end sm:items-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/TGMG/tgmgVideo.mp4" type="video/mp4" />
        </video>

        {/* High-contrast gradient overlay ensuring text readability on all devices */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/30 lg:to-transparent rtl:lg:bg-gradient-to-l rtl:lg:from-black/85 rtl:lg:via-black/30 rtl:lg:to-transparent" />
      </div>

      {/* Content Layer on the Left (Bottom-aligned on mobile) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-24 pb-6 sm:py-20 lg:py-28 w-full">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`max-w-2xl ${isRTL ? "text-right mr-0 ml-auto" : "text-left ml-0 mr-auto"} space-y-2 md:space-y-6`}
        >
          {/* Main Headline (Decreased size & aligned left) */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-lg ${isRTL ? "font-arabic-header" : "font-english-header"
              }`}
          >
            {t("headline")}
          </motion.h1>

          {/* Subhead (Decreased size & aligned left) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-xs sm:text-sm md:text-base text-white/90 max-w-xl leading-relaxed drop-shadow-md font-medium ${isRTL ? "font-arabic-body" : "font-english-body"
              }`}
          >
            {t("subhead")}
          </motion.p>

          {/* CTAs (Compact size & aligned left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 pt-2"
          >
            <a
              href="#ecosystem"
              className={`px-6 py-3.5 rounded-xl font-bold text-white shadow-xl bg-gradient-to-r from-hot-pink via-purple to-bright-yellow hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base button-glow ${isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
            >
              <span>{t("primaryCta")}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>

            <Link
              href={`/${locale}/contact/partner`}
              className={`px-6 py-3.5 rounded-xl font-bold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
            >
              <span>{t("secondaryCta")}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
