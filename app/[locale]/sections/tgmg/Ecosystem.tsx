"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Compass,
  Briefcase,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Handshake,
} from "lucide-react";

export function Ecosystem() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const ecosystemData = {
    badge: isRTL ? "المنظومة الإعلامية" : "Visual Ecosystem",
    title: isRTL ? "منظومة The Good Media Group" : "The TGMG Ecosystem",
    subtitle: isRTL
      ? "هيكل متكامل يجمع بين الإعلام الرقمي التفاعلي والمبادرات المجتمعية الواقعية"
      : "An integrated ecosystem connecting digital media platforms and real-world community experiences",
    tgmg: {
      name: isRTL ? "ذا جود ميديا جروب (TGMG)" : "The Good Media Group (TGMG)",
      role: isRTL ? "الشركة الأم والمظلة الاستراتيجية" : "Parent Company & Strategic Umbrella",
      desc: isRTL
        ? "المظلة الحاضنة للمنظومة الإعلامية والمبادرات الشبابية والشراكات الاستراتيجية الإقليمية."
        : "The overarching entity leading youth media brands, original IP, strategic partnerships, and impact initiatives.",
      badges: isRTL
        ? ["الشركة الأم", "إعلام الشباب", "التأثير المجتمعي"]
        : ["Parent Company", "Youth Media", "Impact Driven"],
    },
    tgn: {
      name: isRTL ? "THE GOOD NEWS (TGN)" : "THE GOOD NEWS (TGN)",
      role: isRTL ? "المنصة الإعلامية الرقمية الرئيسية" : "Flagship Digital Media Platform",
      desc: isRTL
        ? "منصتنا الرقمية الرائدة لصناعة الأخبار الإيجابية، الفيديوهات القصيرة، والتغطيات الصحفية الموجهة للشباب العربي."
        : "Leading digital media brand delivering positive, verified, social-first news, video reels, and inspiring stories across MENA.",
      link: `/${locale}/the-good-news`,
      linkText: isRTL ? "استكشف المنصة" : "Explore TGN",
      subTitle: isRTL ? "المبادرات التابعة لـ TGN" : "Pillars Under TGN",
    },
    tgp: {
      name: isRTL ? "The Good Project (TGP)" : "The Good Project (TGP)",
      role: isRTL ? "المحتوى والإنتاج الأصلي" : "Original Storytelling & Productions",
      desc: isRTL
        ? "سلاسل وثائقية وإنتاجات أصلية تسلط الضوء على قصص ملهمة وحملات ذات أثر مجتمعي."
        : "Original docu-series, storytelling formats, and custom impact campaigns.",
      badge: isRTL ? "إنتاج أصلي" : "Original Productions",
    },
    forsa: {
      name: isRTL ? "Forsa Helwa (فرصة حلوة)" : "Forsa Helwa",
      role: isRTL ? "بوابة الفرص والتمكين" : "Youth Opportunities & Career Growth",
      desc: isRTL
        ? "سلسلة متخصصة في نشر وتوفير فرص العمل، المنح الدراسية، والزمالات للشباب في المنطقة."
        : "Dedicated series connecting youth with verified jobs, internships, scholarships, fellowships, and grants.",
      link: `/${locale}/the-good-news/forsa-helwa`,
      linkText: isRTL ? "صفحة فرصة حلوة" : "View Forsa Helwa",
      badge: isRTL ? "فرص ومنح" : "Opportunities & Grants",
    },
    tgs: {
      name: isRTL ? "The Good Space (TGS)" : "The Good Space (TGS)",
      role: isRTL ? "المجتمع والفعاليات على أرض الواقع" : "On-Ground Community & Experiential Hub",
      desc: isRTL
        ? "المساحة الميدانية والفعاليات الواقعية، وورش العمل، وجلسات التواصل لصناع المحتوى والشباب."
        : "The physical community arm hosting workshops, creator meetups, masterclasses, and transformative real-world activations.",
      link: `/${locale}/the-good-space`,
      linkText: isRTL ? "استكشف ذا جود سبيس" : "Explore The Good Space",
      badge: isRTL ? "مجتمع وتجارب" : "Community & Events",
    },
  };

  return (
    <section
      id="ecosystem"
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-white to-cream relative overflow-hidden border-b border-gray-200/70"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="text-center space-y-3 max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 ${
              isRTL ? "font-arabic-header" : "font-english-header"
            }`}
          >
            {ecosystemData.title}
          </h2>
          <p
            className={`text-base sm:text-lg text-gray-600 font-medium ${
              isRTL ? "font-arabic-body" : "font-english-body"
            }`}
          >
            {ecosystemData.subtitle}
          </p>
        </div>

        {/* ========================================================= */}
        {/* VISUAL TREE DIAGRAM */}
        {/* ========================================================= */}
        <div className="space-y-6 md:space-y-8" dir={isRTL ? "rtl" : "ltr"}>
          
          {/* LEVEL 1: ROOT NODE (TGMG - Parent Company) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-gray-900/10 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-hot-pink/20 via-bright-yellow/20 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left rtl:sm:text-right">
                {/* TGMG Logo */}
                <div className="relative w-28 h-20 sm:w-32 sm:h-24 flex-shrink-0 bg-cream/50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/TGMG/logo.png"
                    alt="The Good Media Group Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* TGMG Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-gray-900 text-white tracking-wide">
                      {ecosystemData.tgmg.role}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                      isRTL ? "font-arabic-header" : "font-english-header"
                    }`}
                  >
                    {ecosystemData.tgmg.name}
                  </h3>

                  <p
                    className={`text-sm sm:text-base text-gray-600 leading-relaxed ${
                      isRTL ? "font-arabic-body" : "font-english-body"
                    }`}
                  >
                    {ecosystemData.tgmg.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start rtl:sm:justify-start">
                    {ecosystemData.tgmg.badges.map((b, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-cream text-gray-700 border border-gray-200"
                      >
                        • {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FLOW CONNECTOR ARROWS (Level 1 to Level 2) */}
          <div className="relative flex flex-col items-center">
            {/* Vertical line from TGMG */}
            <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-gray-900 to-gray-400 rounded-full" />

            {/* Horizontal Split Branch on medium+ screens */}
            <div className="hidden md:block w-3/4 max-w-3xl h-1 bg-gray-300 rounded-full relative">
              {/* Left downward corner connector */}
              <div className="absolute -left-0.5 top-0 w-1 h-4 bg-gray-300 rounded-b-full" />
              {/* Right downward corner connector */}
              <div className="absolute -right-0.5 top-0 w-1 h-4 bg-gray-300 rounded-b-full" />
            </div>

            {/* Mobile center arrow */}
            <div className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 shadow-sm text-gray-700 my-0.5">
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>

          {/* LEVEL 2: TWO MAIN PILLARS (TGN & TGS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* ========================================== */}
            {/* PILLAR 1: THE GOOD NEWS (TGN) */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-hot-pink/30 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-hot-pink transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-hot-pink/15 text-hot-pink-dark border border-hot-pink/20">
                    <Globe className="w-3.5 h-3.5" />
                    {ecosystemData.tgn.role}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-hot-pink animate-pulse" />
                </div>

                {/* TGN Logo */}
                <div className="relative w-44 h-16 sm:w-52 sm:h-20">
                  <Image
                    src="/logos/tgnLogo.png"
                    alt="THE GOOD NEWS Logo"
                    fill
                    className="object-contain object-left rtl:object-right"
                  />
                </div>

                {/* Title & Desc */}
                <div className="space-y-1.5">
                  <h3
                    className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                      isRTL ? "font-arabic-header" : "font-english-header"
                    }`}
                  >
                    {ecosystemData.tgn.name}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm leading-relaxed ${
                      isRTL ? "font-arabic-body" : "font-english-body"
                    }`}
                  >
                    {ecosystemData.tgn.desc}
                  </p>
                </div>

                {/* SUB-BRANCHES UNDER TGN: TGP & FORSA HELWA */}
                <div className="pt-4 border-t-2 border-dashed border-gray-200 space-y-3">
                  <div className="flex items-center gap-1.5">
                    <ArrowDown className="w-3.5 h-3.5 text-hot-pink" />
                    <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                      {ecosystemData.tgn.subTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Sub-node A: The Good Project (TGP) */}
                    <div className="p-3.5 rounded-2xl bg-cream/60 border border-gray-200/80 hover:bg-cream hover:shadow-md transition-all duration-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="relative w-16 h-8">
                          <Image
                            src="/tgp/tgpLogocropped.png"
                            alt="The Good Project Logo"
                            fill
                            className="object-contain object-left rtl:object-right"
                          />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-hot-pink/20 text-gray-800">
                          {ecosystemData.tgp.badge}
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold text-gray-900 ${
                          isRTL ? "font-arabic-header" : "font-english-header"
                        }`}
                      >
                        {ecosystemData.tgp.name}
                      </h4>
                      <p
                        className={`text-xs text-gray-600 leading-relaxed ${
                          isRTL ? "font-arabic-body" : "font-english-body"
                        }`}
                      >
                        {ecosystemData.tgp.desc}
                      </p>
                    </div>

                    {/* Sub-node B: Forsa Helwa */}
                    <div className="p-3.5 rounded-2xl bg-cream/60 border border-gray-200/80 hover:bg-cream hover:shadow-md transition-all duration-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="relative w-16 h-8">
                          <Image
                            src="/goodIntern/ForsaHelwaFinal(5).png"
                            alt="Forsa Helwa Logo"
                            fill
                            className="object-contain object-left rtl:object-right"
                          />
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-bright-yellow text-gray-900 border border-black/10">
                          {ecosystemData.forsa.badge}
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold text-gray-900 ${
                          isRTL ? "font-arabic-header" : "font-english-header"
                        }`}
                      >
                        {ecosystemData.forsa.name}
                      </h4>
                      <p
                        className={`text-xs text-gray-600 leading-relaxed ${
                          isRTL ? "font-arabic-body" : "font-english-body"
                        }`}
                      >
                        {ecosystemData.forsa.desc}
                      </p>
                      <Link
                        href={ecosystemData.forsa.link}
                        className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-hot-pink transition-colors pt-0.5"
                      >
                        <span>{ecosystemData.forsa.linkText}</span>
                        <ArrowIcon className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                </div>
              </div>

              {/* TGN CTA Link */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href={ecosystemData.tgn.link}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-hot-pink to-bright-yellow text-gray-900 font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${
                    isRTL ? "font-arabic-subheading" : "font-english-subheading"
                  }`}
                >
                  <span>{ecosystemData.tgn.linkText}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* ========================================== */}
            {/* PILLAR 2: THE GOOD SPACE (TGS) */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-400/30 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-amber-400 transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-800 border border-amber-400/20">
                    <Users className="w-3.5 h-3.5" />
                    {ecosystemData.tgs.role}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                </div>

                {/* TGS Logo */}
                <div className="relative w-44 h-16 sm:w-52 sm:h-20">
                  <Image
                    src="/goodSpace/1.png"
                    alt="The Good Space Logo"
                    fill
                    className="object-contain object-left rtl:object-right"
                  />
                </div>

                {/* Title & Desc */}
                <div className="space-y-1.5">
                  <h3
                    className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                      isRTL ? "font-arabic-header" : "font-english-header"
                    }`}
                  >
                    {ecosystemData.tgs.name}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm leading-relaxed ${
                      isRTL ? "font-arabic-body" : "font-english-body"
                    }`}
                  >
                    {ecosystemData.tgs.desc}
                  </p>
                </div>

                {/* Features & Activations under Good Space */}
                <div className="pt-4 border-t-2 border-dashed border-gray-200 space-y-2.5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                    {isRTL ? "أبرز أنشطة المساحة والمجتمع:" : "Core Physical Activations:"}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                      <div className="p-1 rounded-lg bg-amber-200/60 text-amber-900 font-bold mt-0.5">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                          {isRTL ? "ورش عمل وصناعة المحتوى" : "Creator Workshops & Masterclasses"}
                        </h5>
                        <p className="text-[11px] text-gray-600">
                          {isRTL
                            ? "تدريبات متقدمة في السرد القصصي والإنتاج الرقمي."
                            : "Hands-on storytelling, creative production, and digital creation."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                      <div className="p-1 rounded-lg bg-amber-200/60 text-amber-900 font-bold mt-0.5">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                          {isRTL ? "لقاءات تشبيك ومجتمع الشباب" : "Networking Meetups & Creator Summits"}
                        </h5>
                        <p className="text-[11px] text-gray-600">
                          {isRTL
                            ? "جمع صناع القرار والمؤسسات مع المواهب الصاعدة والمؤثرين."
                            : "Connecting emerging changemakers with institutional partners and leaders."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                      <div className="p-1 rounded-lg bg-amber-200/60 text-amber-900 font-bold mt-0.5">
                        <Handshake className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                            {isRTL ? "مسارات B2B والفعاليات المشتركة" : "B2B Tracks: Collab Events"}
                          </h5>
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-200/90 text-amber-950">
                            {isRTL ? "جديد" : "NEW"}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600">
                          {isRTL
                            ? "تجارب وفعاليات مشتركة نصممها مع الشركاء لتعزيز النمو المشترك والاندماج الحقيقي للعلامات التجارية."
                            : "Together with our partners, we co-create community-led experiences and activations that foster shared growth and authentic brand integration."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TGS CTA Link */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href={ecosystemData.tgs.link}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#5B1C1E] text-white font-extrabold text-sm shadow-md hover:bg-[#451416] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${
                    isRTL ? "font-arabic-subheading" : "font-english-subheading"
                  }`}
                >
                  <span>{ecosystemData.tgs.linkText}</span>
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
