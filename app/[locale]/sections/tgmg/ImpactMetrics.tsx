"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Eye, Users, FileText, Calendar, Globe, Sparkles } from "lucide-react";

export function ImpactMetrics() {
  const t = useTranslations("tgmg.impact");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const metrics = [
    {
      value: t("views"),
      label: t("viewsLabel"),
      icon: Eye,
      gradient: "from-pink-500 to-rose-500",
      lightBg: "bg-pink-50 border-pink-100 text-pink-700",
    },
    {
      value: t("community"),
      label: t("communityLabel"),
      icon: Users,
      gradient: "from-purple-500 to-indigo-500",
      lightBg: "bg-purple-50 border-purple-100 text-purple-700",
    },
    {
      value: t("stories"),
      label: t("storiesLabel"),
      icon: FileText,
      gradient: "from-amber-500 to-orange-500",
      lightBg: "bg-amber-50 border-amber-100 text-amber-700",
    },
    {
      value: t("events"),
      label: t("eventsLabel"),
      icon: Calendar,
      gradient: "from-emerald-500 to-teal-500",
      lightBg: "bg-emerald-50 border-emerald-100 text-emerald-700",
    },
    {
      value: t("reach"),
      label: t("reachLabel"),
      icon: Globe,
      gradient: "from-blue-500 to-cyan-500",
      lightBg: "bg-blue-50 border-blue-100 text-blue-700",
    },
  ];

  return (
    <section id="our-impact" className="py-24 bg-gradient-to-br from-cream/60 via-white to-cream/40 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-gray-800 border border-gray-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 inline mr-1 rtl:ml-1" />
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
              className={`text-lg sm:text-xl text-gray-600 font-medium ${
                isRTL ? "font-arabic-body" : "font-english-body"
              }`}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4 relative overflow-hidden group"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${metric.gradient}`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className={`text-2xl sm:text-3xl font-black text-gray-900 ${isRTL ? "font-arabic-header" : "font-english-header"}`}>
                      {metric.value}
                    </h3>
                    <p className={`text-xs sm:text-sm font-semibold text-gray-500 mt-1 ${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                      {metric.label}
                    </p>
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
