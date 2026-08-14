"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export function TGMGHero() {
  const t = useTranslations("tgmg.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-cream via-cream/80 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-bright-yellow/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-4xl mx-auto space-y-8">
          
          {/* Logo Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center mb-4"
          >
            <div className="relative w-64 h-28 sm:w-80 sm:h-36 md:w-96 md:h-44 transition-all duration-300">
              <Image
                src="/TGMG/logo.png"
                alt="The Good Media Group"
                fill
                priority
                className="object-contain drop-shadow-md"
              />
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/80 border border-hot-pink/30 text-foreground shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-hot-pink" />
              {t("badge1")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/80 border border-purple/30 text-foreground shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple" />
              {t("badge2")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/80 border border-bright-yellow/50 text-foreground shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t("badge3")}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight ${
              isRTL ? "font-arabic-header" : "font-english-header"
            }`}
          >
            {t("headline")}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={`text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${
              isRTL ? "font-arabic-body" : "font-english-body"
            }`}
          >
            {t("subhead")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#ecosystem"
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-hot-pink via-purple to-bright-yellow hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 button-glow ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              <span>{t("primaryCta")}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>

            <Link
              href={`/${locale}/contact/partner`}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-gray-800 bg-white border border-gray-200 shadow-sm hover:bg-cream hover:border-gray-300 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
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
