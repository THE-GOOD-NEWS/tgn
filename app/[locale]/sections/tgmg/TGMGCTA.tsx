"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Send } from "lucide-react";

export function TGMGCTA() {
  const t = useTranslations("tgmg.cta");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-hot-pink/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-bright-yellow/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-4xl mx-auto text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight ${
              isRTL ? "font-arabic-header" : "font-english-header"
            }`}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed ${
              isRTL ? "font-arabic-body" : "font-english-body"
            }`}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 flex justify-center"
          >
            <Link
              href={`/${locale}/contact/partner`}
              className={`px-8 py-4 sm:px-10 sm:py-5 rounded-2xl text-base sm:text-lg font-bold text-gray-900 bg-gradient-to-r from-hot-pink via-purple to-bright-yellow shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 button-glow ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              <Send className="w-5 h-5" />
              <span>{t("button")}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
