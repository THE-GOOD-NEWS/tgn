"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink, Globe, MapPin, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export function Ecosystem() {
  const t = useTranslations("tgmg.ecosystem");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="ecosystem" className="py-24 bg-cream relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 right-10 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-bright-yellow/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-800 shadow-sm">
              {isRTL ? "المنظومة والمنصات" : "Our Platforms"}
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 ${
                isRTL ? "font-arabic-header" : "font-english-header"
              }`}
            >
              {t("title")}
            </h2>
            <p
              className={`text-lg sm:text-xl text-gray-600 font-medium ${
                isRTL ? "font-arabic-body" : "font-english-body"
              }`}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Platform 1: THE GOOD NEWS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-hot-pink/10 text-hot-pink">
                    <Globe className="w-3.5 h-3.5" />
                    Digital Media Ecosystem
                  </span>
                  <Sparkles className="w-5 h-5 text-hot-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="relative w-48 h-20 sm:w-56 sm:h-24">
                  <Image
                    src="/logos/TGN_LOGOS_PNG-03.png"
                    alt="The Good News"
                    fill
                    className="object-contain object-left rtl:object-right"
                  />
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                    isRTL ? "font-arabic-header" : "font-english-header"
                  }`}
                >
                  {t("tgnTitle")}
                </h3>

                <p
                  className={`text-gray-600 leading-relaxed text-base sm:text-lg ${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("tgnDesc")}
                </p>

                {/* Sub-brands & Programs under TGN */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {isRTL ? "تشمل المبادرات والمنصات التابعة:" : "Key Platforms & Initiatives:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cream rounded-lg text-xs font-bold text-gray-800 border border-gray-200">
                      The Good Intern
                    </span>
                    <span className="px-3 py-1 bg-cream rounded-lg text-xs font-bold text-gray-800 border border-gray-200">
                      The Good Project
                    </span>
                    <span className="px-3 py-1 bg-cream rounded-lg text-xs font-bold text-gray-800 border border-gray-200">
                      Forsa Helwa
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/${locale}/the-good-news`}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-hot-pink to-bright-yellow text-gray-900 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 ${
                    isRTL ? "font-arabic-subheading" : "font-english-subheading"
                  }`}
                >
                  <span>{t("tgnCta")}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Platform 2: The Good Space */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600">
                    <MapPin className="w-3.5 h-3.5" />
                    On-Ground Community & Events
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="relative w-48 h-20 sm:w-56 sm:h-24">
                  <Image
                    src="/goodSpace/1.png"
                    alt="The Good Space"
                    fill
                    className="object-contain object-left rtl:object-right"
                  />
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                    isRTL ? "font-arabic-header" : "font-english-header"
                  }`}
                >
                  {t("tgsTitle")}
                </h3>

                <p
                  className={`text-gray-600 leading-relaxed text-base sm:text-lg ${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("tgsDesc")}
                </p>

                {/* Sub-initiatives under Good Space */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {isRTL ? "تشمل الأنشطة والفعاليات:" : "Key Activations:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-amber-50 rounded-lg text-xs font-bold text-amber-900 border border-amber-200">
                      Workshops & Masterclasses
                    </span>
                    <span className="px-3 py-1 bg-amber-50 rounded-lg text-xs font-bold text-amber-900 border border-amber-200">
                      Networking Meetups
                    </span>
                    <span className="px-3 py-1 bg-amber-50 rounded-lg text-xs font-bold text-amber-900 border border-amber-200">
                      Creator Summits
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/${locale}/the-good-space`}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-bold text-sm shadow-md hover:bg-gray-800 transition-all duration-200 ${
                    isRTL ? "font-arabic-subheading" : "font-english-subheading"
                  }`}
                >
                  <span>{t("tgsCta")}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
