"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen, Compass, Target, Users } from "lucide-react";

export function OurStory() {
  const t = useTranslations("tgmg.ourStory");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const pillars = [
    {
      icon: BookOpen,
      title: isRTL ? "صناعة المحتوى والصحافة" : "Storytelling & Journalism",
      desc: isRTL
        ? "نحكي قصص حقيقية تلهم الشباب وتسلط الضوء على الفرص والإنجازات."
        : "Crafting authentic human stories that inform and inspire youth action.",
      color: "border-hot-pink bg-hot-pink/5 text-hot-pink",
    },
    {
      icon: Compass,
      title: isRTL ? "الإبداع والتجارب الرقمية" : "Creativity & Digital Content",
      desc: isRTL
        ? "محتوى مبتكر مصمم خصيصًا لمنصات التواصل الاجتماعي باللغتين العربية والإنجليزية."
        : "Social-first, bilingual content formats tailored for modern audiences.",
      color: "border-purple bg-purple/5 text-purple",
    },
    {
      icon: Users,
      title: isRTL ? "التجارب على أرض الواقع" : "On-Ground Community",
      desc: isRTL
        ? "فعاليات وورش عمل تجسّد مجتمع الشباب وتربطهم بصناع القرار والشراكات."
        : "Building real-world experiences, workshops, and networking forums.",
      color: "border-amber-500 bg-amber-500/5 text-amber-500",
    },
    {
      icon: Target,
      title: isRTL ? "الشراكات الاستراتيجية" : "Strategic Partnerships",
      desc: isRTL
        ? "ربط المؤسسات والعلامات التجارية بالشباب من خلال حلول شراكة متكاملة."
        : "Connecting global brands and NGOs with the region's youth demographic.",
      color: "border-emerald-500 bg-emerald-500/5 text-emerald-500",
    },
  ];

  return (
    <section id="our-story" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-hot-pink/10 text-hot-pink">
              {t("title")}
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 ${
                isRTL ? "font-arabic-header" : "font-english-header"
              }`}
            >
              {t("title")}
            </h2>
            <p
              className={`text-lg sm:text-xl text-gray-600 leading-relaxed font-medium ${
                isRTL ? "font-arabic-body" : "font-english-body"
              }`}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Grid Layout: Main text + Pillar cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Card */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 bg-gradient-to-br from-cream to-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-hot-pink/10 rounded-full blur-2xl" />
              
              <h3
                className={`text-2xl font-bold text-gray-900 ${
                  isRTL ? "font-arabic-header" : "font-english-header"
                }`}
              >
                The Good Media Group (TGMG)
              </h3>

              <p
                className={`text-gray-700 leading-relaxed text-base sm:text-lg ${
                  isRTL ? "font-arabic-body" : "font-english-body"
                }`}
              >
                {t("p1")}
              </p>

              <p
                className={`text-gray-700 leading-relaxed text-base sm:text-lg ${
                  isRTL ? "font-arabic-body" : "font-english-body"
                }`}
              >
                {t("p2")}
              </p>

              <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 rounded-full bg-hot-pink/20 flex items-center justify-center font-bold text-hot-pink">
                    ★
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Youth-Driven Mission</h4>
                    <p className="text-xs text-gray-500">Connecting, Inspiring, Elevating</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4 Key Pillars */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-3"
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4
                      className={`text-lg font-bold text-gray-900 ${
                        isRTL ? "font-arabic-header" : "font-english-header"
                      }`}
                    >
                      {pillar.title}
                    </h4>
                    <p
                      className={`text-sm text-gray-600 leading-relaxed ${
                        isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                    >
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
