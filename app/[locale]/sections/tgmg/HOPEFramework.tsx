"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, DoorOpen, ShieldCheck, Zap, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export function HOPEFramework() {
  const t = useTranslations("tgmg.hope");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeLetter, setActiveLetter] = useState<string>("H");

  const pillars = [
    {
      id: "H",
      title: t("hTitle"),
      tagline: t("hTagline"),
      desc: t("hDesc"),
      icon: Heart,
      badge: isRTL ? "الخطوة الأولى" : "Step 1",
      gradient: "from-rose-500 to-pink-500",
      lightBg: "bg-rose-50 border-rose-200 text-rose-700",
      accentColor: "#f43f5e",
    },
    {
      id: "O",
      title: t("oTitle"),
      tagline: t("oTagline"),
      desc: t("oDesc"),
      icon: DoorOpen,
      badge: isRTL ? "الخطوة الثانية" : "Step 2",
      gradient: "from-amber-500 to-orange-500",
      lightBg: "bg-amber-50 border-amber-200 text-amber-700",
      accentColor: "#f59e0b",
    },
    {
      id: "P",
      title: t("pTitle"),
      tagline: t("pTagline"),
      desc: t("pDesc"),
      icon: ShieldCheck,
      badge: isRTL ? "الخطوة الثالثة" : "Step 3",
      gradient: "from-emerald-500 to-teal-500",
      lightBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      accentColor: "#10b981",
    },
    {
      id: "E",
      title: t("eTitle"),
      tagline: t("eTagline"),
      desc: t("eDesc"),
      icon: Zap,
      badge: isRTL ? "الخطوة الرابعة" : "Step 4",
      gradient: "from-purple-500 to-indigo-500",
      lightBg: "bg-purple-50 border-purple-200 text-purple-700",
      accentColor: "#8b5cf6",
    },
  ];

  const journeySteps = [
    {
      letter: "H",
      name: "Humanize",
      text: t("stepH"),
      color: "bg-rose-500",
    },
    {
      letter: "O",
      name: "Open",
      text: t("stepO"),
      color: "bg-amber-500",
    },
    {
      letter: "P",
      name: "Prepare",
      text: t("stepP"),
      color: "bg-emerald-500",
    },
    {
      letter: "E",
      name: "Elevate",
      text: t("stepE"),
      color: "bg-purple-500",
    },
  ];

  return (
    <section id="hope-framework" className="py-24 bg-gradient-to-b from-white via-cream/40 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple/10 text-purple border border-purple/20">
              {t("frameworkTitle")}
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
            <p
              className={`text-base text-gray-500 max-w-2xl mx-auto leading-relaxed ${
                isRTL ? "font-arabic-body" : "font-english-body"
              }`}
            >
              {t("intro")}
            </p>
          </div>

          {/* Interactive HOPE Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activeLetter === pillar.id;

              return (
                <motion.div
                  key={pillar.id}
                  onClick={() => setActiveLetter(pillar.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border overflow-hidden ${
                    isSelected
                      ? `bg-white shadow-2xl border-2 ring-4 ring-offset-2 ring-gray-100`
                      : "bg-white/80 border-gray-200 shadow-sm hover:border-gray-300"
                  }`}
                  style={{ borderColor: isSelected ? pillar.accentColor : undefined }}
                >
                  {/* Top Letter & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md bg-gradient-to-br ${pillar.gradient}`}
                    >
                      {pillar.id}
                    </div>
                    <Icon className="w-6 h-6 text-gray-400" style={{ color: isSelected ? pillar.accentColor : undefined }} />
                  </div>

                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-2 ${pillar.lightBg}`}>
                    {pillar.badge}
                  </span>

                  <h3
                    className={`text-xl font-bold text-gray-900 mb-1 ${
                      isRTL ? "font-arabic-header" : "font-english-header"
                    }`}
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-sm font-semibold text-gray-500 mb-3">
                    {pillar.tagline}
                  </p>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-3 border-t border-gray-100"
                      >
                        <p
                          className={`text-sm text-gray-700 leading-relaxed ${
                            isRTL ? "font-arabic-body" : "font-english-body"
                          }`}
                        >
                          {pillar.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Active Detail Feature Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl relative overflow-hidden">
            {pillars
              .filter((p) => p.id === activeLetter)
              .map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${pillar.gradient}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? "font-arabic-header" : "font-english-header"}`}>
                            {pillar.title}
                          </h3>
                          <p className="text-sm font-semibold text-gray-500">{pillar.tagline}</p>
                        </div>
                      </div>

                      <p className={`text-base sm:text-lg text-gray-700 leading-relaxed ${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="lg:col-span-4 bg-gradient-to-br from-cream to-white p-6 rounded-2xl border border-gray-200/80 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Core Focus</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        {pillar.id === "H" && "Authentic stories & human experiences that build trust."}
                        {pillar.id === "O" && "Forsa Helwa, internships, and skill content channels."}
                        {pillar.id === "P" && "The Good Space workshops, community, and networking."}
                        {pillar.id === "E" && "Amplifying youth voices to decision makers and brands."}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* The Youth Journey */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-hot-pink/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h3 className={`text-2xl sm:text-3xl font-black text-white ${isRTL ? "font-arabic-header" : "font-english-header"}`}>
                {t("journeyTitle")}
              </h3>
              <p className={`text-sm sm:text-base text-gray-300 ${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                {t("journeySub")}
              </p>
            </div>

            {/* Journey steps timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-3 transition-transform hover:-translate-y-1 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center ${step.color}`}>
                      {step.letter}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      {step.name}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm text-gray-200 leading-relaxed ${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Journey conclusion */}
            <div className="pt-6 border-t border-white/10 text-center">
              <p className={`text-base sm:text-lg font-bold text-amber-300 max-w-2xl mx-auto ${isRTL ? "font-arabic-subheading" : "font-english-subheading"}`}>
                ✨ {t("conclusion")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
