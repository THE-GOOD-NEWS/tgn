"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Handshake, Building2, Sparkles, Rocket, Globe2, ShieldCheck, HeartHandshake } from "lucide-react";

export function PartnerSolutions() {
  const t = useTranslations("tgmg.partnerships");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const partnerTypes = [
    { label: isRTL ? "العلامات التجارية" : "Brands", icon: Building2 },
    { label: isRTL ? "الشركات الناشئة" : "Startups", icon: Rocket },
    { label: isRTL ? "المنظمات غير الحكومية" : "NGOs", icon: HeartHandshake },
    { label: isRTL ? "الجهات الحكومية" : "Government Entities", icon: ShieldCheck },
    { label: isRTL ? "المنظمات الدولية" : "International Orgs", icon: Globe2 },
    { label: isRTL ? "الجامعات والمؤسسات" : "Universities", icon: Sparkles },
    { label: isRTL ? "مسرّعات الأعمال" : "Accelerators", icon: Handshake },
    { label: isRTL ? "المؤسسات الاجتماعية" : "Social Enterprises", icon: CheckCircle2 },
  ];

  const reasons = [
    t("reasons.0"),
    t("reasons.1"),
    t("reasons.2"),
    t("reasons.3"),
    t("reasons.4"),
    t("reasons.5"),
  ];

  return (
    <section id="partner-solutions" className="py-24 bg-gradient-to-b from-white via-cream/30 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-hot-pink/10 text-hot-pink border border-hot-pink/20">
              {t("title")}
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 ${
                isRTL ? "font-arabic-header" : "font-english-header"
              }`}
            >
              {t("subtitle")}
            </h2>
            <p
              className={`text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed ${
                isRTL ? "font-arabic-body" : "font-english-body"
              }`}
            >
              {t("desc")}
            </p>
          </div>

          {/* Grid: Who We Work With + Why Partners Choose Us */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Who We Work With */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <Handshake className="w-6 h-6 text-hot-pink" />
                <h3 className={`text-xl font-bold text-gray-900 ${isRTL ? "font-arabic-header" : "font-english-header"}`}>
                  {t("whoTitle")}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {partnerTypes.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-cream/50 border border-gray-100 flex items-center gap-2.5 hover:bg-cream transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 text-hot-pink shrink-0" />
                      <span className={`text-xs sm:text-sm font-semibold text-gray-800 ${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 text-center">
                <Link
                  href={`/${locale}/contact/partner`}
                  className={`inline-block px-6 py-3 rounded-xl bg-hot-pink text-white font-bold text-sm shadow-md hover:bg-hot-pink/90 transition-all duration-200 button-glow ${
                    isRTL ? "font-arabic-subheading" : "font-english-subheading"
                  }`}
                >
                  {isRTL ? "تواصل لبناء شراكة" : "Become a Partner"}
                </Link>
              </div>
            </motion.div>

            {/* Why Partners Choose Us */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Value Proposition
                </span>
                <h3 className={`text-2xl sm:text-3xl font-black text-white ${isRTL ? "font-arabic-header" : "font-english-header"}`}>
                  {t("whyTitle")}
                </h3>
                <p className={`text-sm sm:text-base text-gray-300 font-semibold ${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                  {t("whySub")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-bright-yellow shrink-0 mt-0.5" />
                    <span className={`text-xs sm:text-sm text-gray-100 font-medium ${isRTL ? "font-arabic-body" : "font-english-body"}`}>
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
