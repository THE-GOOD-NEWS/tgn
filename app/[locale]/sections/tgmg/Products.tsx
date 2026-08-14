"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Newspaper, GraduationCap, Video, Users, CheckCircle2, ArrowRight, ArrowLeft, Bot, Radio, Target } from "lucide-react";

export function Products() {
  const t = useTranslations("tgmg.products");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const productsList = [
    {
      id: "news",
      icon: Newspaper,
      title: t("newsTitle"),
      tagline: t("newsTagline"),
      badge: isRTL ? "محتوى رقمي" : "Social-First Content",
      badgeColor: "bg-hot-pink/10 text-hot-pink border-hot-pink/20",
      items: [
        t("newsFormats"),
        t("newsProd"),
        t("newsCamp"),
        t("newsDist"),
        t("newsAi"),
      ],
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "forsa",
      icon: GraduationCap,
      title: t("forsaTitle"),
      tagline: t("forsaTagline"),
      badge: isRTL ? "فرص وتطوير" : "Youth Opportunities",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      items: [
        t("forsaDesc"),
        isRTL ? "1M+ إجمالي الوصول عبر وسائل التواصل" : "1M+ Total Reach across social platforms",
        isRTL ? "أكثر من 70 فرصة تدريب ووظيفة قائمة" : "70+ Internship and growth opportunity listings",
      ],
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "media",
      icon: Video,
      title: t("mediaTitle"),
      tagline: t("mediaTagline"),
      badge: isRTL ? "إنتاج ميداني" : "On-Ground Coverage",
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      items: [
        t("mediaDesc"),
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "edu",
      icon: Users,
      title: `${t("eduTitle")} ${t("eduSub")}`,
      tagline: t("eduTagline"),
      badge: isRTL ? "مجتمع وتدريب" : "Workshops & Training",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      items: [
        t("eduDesc"),
      ],
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cream border border-gray-200 text-gray-800 shadow-sm">
              {isRTL ? "محاور المحتوى والمنتجات" : "What We Create"}
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

          {/* Grid of Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productsList.map((product, idx) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-cream/40 via-white to-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${product.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-2xl font-black text-gray-900 mb-2 ${
                          isRTL ? "font-arabic-header" : "font-english-header"
                        }`}
                      >
                        {product.title}
                      </h3>
                      <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Bullet list of specs/details */}
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      {product.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={`${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
