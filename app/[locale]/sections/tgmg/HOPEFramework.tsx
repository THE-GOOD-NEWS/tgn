"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Heart, DoorOpen, ShieldCheck, Megaphone, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export function HOPEFramework() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const hopeData = {
    badge: isRTL ? "إطار العمل" : "The Framework",
    title: isRTL ? "HOPE" : "HOPE",
    subtitle: isRTL
      ? "استراتيجيتنا لبناء المنظومة الشبابية الرائدة"
      : "Our Strategy for Building the Leading Youth Ecosystem",
    intro: isRTL
      ? "كل حاجة بنبنيها هدفها تساعد الشباب ينتقلوا لفرصة حقيقية للمشاركة، ومن المشاركة لاكتشاف إمكاناتهم، ومن إمكاناتهم للقيادة."
      : "Everything we build should help young people move from possibility to participation, from participation to potential, and from potential to leadership.",
    seeMoreText: isRTL
      ? "استكشف استراتيجية HOPE الكاملة ورحلة الشباب"
      : "Explore the Full HOPE Framework & Youth Journey",
    link: `/${locale}/about/the-good-media-group#hope-framework`,
    pillars: [
      {
        id: "H",
        letter: "H",
        word: "Humanize",
        title: isRTL ? "H — Humanize" : "H — Humanize",
        tagline: isRTL ? "نخلّي الموضوع إنساني وأقرب للناس" : "Make possibilities feel personal.",
        desc: isRTL
          ? "سرد قصصي واقعي يبني الثقة ويحفز المشاركة الإيجابية."
          : "Authentic human storytelling and journalism that sparks action.",
        icon: Heart,
        gradient: "from-hot-pink via-pink-500 to-rose-500 text-white",
        cardBorder: "border-hot-pink/40 hover:border-hot-pink",
        lightBadge: "bg-pink-50 border-pink-200 text-pink-700",
        iconBox: "bg-pink-100 text-hot-pink-dark group-hover:bg-pink-200",
        shadow: "shadow-hot-pink/20 hover:shadow-hot-pink/30",
      },
      {
        id: "O",
        letter: "O",
        word: "Open",
        title: isRTL ? "O — Open" : "O — Open",
        tagline: isRTL ? "نفتح أبواب الفرص" : "Open doors to opportunities.",
        desc: isRTL
          ? "فرص عمل، تدريب، منح، ومسابقات موثوقة تسارع نمو الشباب."
          : "Verified internships, scholarships, and career growth opportunities.",
        icon: DoorOpen,
        gradient: "from-hot-pink via-rose-400 to-amber-300 text-white",
        cardBorder: "border-pink-300/50 hover:border-pink-400",
        lightBadge: "bg-pink-50/90 border-pink-200 text-pink-800",
        iconBox: "bg-pink-50 text-pink-700 group-hover:bg-pink-100",
        shadow: "shadow-pink-400/20 hover:shadow-pink-400/30",
      },
      {
        id: "P",
        letter: "P",
        word: "Prepare",
        title: isRTL ? "P — Prepare" : "P — Prepare",
        tagline: isRTL ? "نجهّز الشباب عشان يحققوا طموحاتهم" : "Prepare young people to thrive.",
        desc: isRTL
          ? "ورش عمل وتجارب تفاعلية تبني المهارات وتوسع شبكة العلاقات."
          : "Hands-on workshops, community spaces, and mentorship to thrive.",
        icon: ShieldCheck,
        gradient: "from-pink-300 via-amber-300 to-yellow-300 text-gray-900",
        cardBorder: "border-amber-300/50 hover:border-amber-400",
        lightBadge: "bg-amber-50 border-amber-200 text-amber-900",
        iconBox: "bg-amber-100 text-amber-800 group-hover:bg-amber-200",
        shadow: "shadow-amber-400/20 hover:shadow-amber-400/30",
      },
      {
        id: "E",
        letter: "E",
        word: "Elevate",
        title: isRTL ? "E — Elevate" : "E — Elevate",
        tagline: isRTL ? "نوصل صوت الشباب" : "Elevate youth voices and ideas.",
        desc: isRTL
          ? "منصات ترفع أصوات الشباب وتربطهم بصناع القرار في المنطقة."
          : "Platforms elevating youth perspectives and shaping the future.",
        icon: Megaphone,
        gradient: "from-amber-300 via-yellow-300 to-bright-yellow text-gray-900",
        cardBorder: "border-bright-yellow/70 hover:border-bright-yellow",
        lightBadge: "bg-yellow-50 border-yellow-300 text-yellow-900",
        iconBox: "bg-yellow-100 text-yellow-900 group-hover:bg-yellow-200",
        shadow: "shadow-bright-yellow/25 hover:shadow-bright-yellow/40",
      },
    ],
  };

  return (
    <section
      id="hope-framework"
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-cream/50 to-white relative overflow-hidden border-b border-gray-200/70"
    >
      {/* Background Left-to-Right Pink-to-Yellow Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-0 right-0 h-96 -translate-y-1/2 bg-gradient-to-r from-hot-pink/25 via-pink-300/15 to-bright-yellow/30 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-hot-pink/15 via-amber-200/20 to-bright-yellow/25 text-gray-900 border border-hot-pink/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-hot-pink-dark" />
            {hopeData.badge}
          </span>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight ${isRTL ? "font-arabic-header" : "font-english-header"
              }`}
          >
            {hopeData.title}
          </h2>

          <p
            className={`text-base sm:text-lg font-bold text-hot-pink-dark ${isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
          >
            {hopeData.subtitle}
          </p>

          <p
            className={`text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium ${isRTL ? "font-arabic-body" : "font-english-body"
              }`}
          >
            {hopeData.intro}
          </p>
        </div>

        {/* 4 Brief HOPE Cards: First almost full Pink, Last almost full Yellow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 relative">
          {hopeData.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`bg-white rounded-3xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group ${pillar.cardBorder} ${pillar.shadow}`}
              >
                <div className="space-y-3.5">
                  {/* Top Row: Letter Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-md bg-gradient-to-r ${pillar.gradient} group-hover:scale-105 transition-transform duration-300`}
                    >
                      {pillar.letter}
                    </div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${pillar.iconBox}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    {/* <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-1.5 ${pillar.lightBadge}`}
                    >
                      {pillar.word}
                    </span> */}
                    {/* <h3
                      className={`text-lg font-bold text-gray-900 ${isRTL ? "font-arabic-header" : "font-english-header"
                        }`}
                    >
                      {pillar.title}
                    </h3> */}
                  </div>

                  <p
                    className={`text-xs font-semibold text-gray-800 leading-snug ${isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                  >
                    {pillar.tagline}
                  </p>

                  <p
                    className={`text-xs text-gray-500 leading-relaxed font-medium ${isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                  >
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* See More Button */}
        <div className="text-center pt-2">
          <Link
            href={hopeData.link}
            className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm sm:text-base text-gray-900 bg-gradient-to-r from-hot-pink via-amber-200 to-bright-yellow shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ${isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
          >
            <span>{hopeData.seeMoreText}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
