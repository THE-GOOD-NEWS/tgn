"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getInstagramEmbedUrl(src: string): string {
  try {
    const url = new URL(src);
    const parts = url.pathname.split("/").filter(Boolean);
    const pIndex = parts.indexOf("p");
    const reelIndex = parts.indexOf("reel");
    const reelsIndex = parts.indexOf("reels");

    let type: "p" | "reel" | undefined;
    let shortcode: string | undefined;

    if (pIndex !== -1 && parts[pIndex + 1]) {
      type = "p";
      shortcode = parts[pIndex + 1];
    } else if (reelIndex !== -1 && parts[reelIndex + 1]) {
      type = "reel";
      shortcode = parts[reelIndex + 1];
    } else if (reelsIndex !== -1 && parts[reelsIndex + 1]) {
      type = "reel";
      shortcode = parts[reelsIndex + 1];
    }

    return type && shortcode
      ? `https://www.instagram.com/${type}/${shortcode}/embed`
      : src;
  } catch {
    return src;
  }
}

export function PartnerCaseStudies() {
  const t = useTranslations("tgmg.caseStudies");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [currentIndex, setCurrentIndex] = useState(0);

  const caseStudies = [
    {
      id: 1,
      title: t("item1Title"),
      desc: t("item1Desc"),
      stats: t("item1Stats"),
      instagramUrl: "https://www.instagram.com/p/DaGG18gCj8O/?igsh=aGN4cDRzcnd4Zm41&igsi=aGN4cDRzcnd4Zm41",
      image: "/partners/case studies/Screenshot 2025-10-14 144716.png",
      tag: "Masar Ventures",
      metrics: [
        { label: isRTL ? "مشاهدات" : "Views", value: "~150K" },
        { label: isRTL ? "وصول" : "Reach", value: "~54K" },
        { label: isRTL ? "تفاعلات" : "Engagements", value: "~8,200" },
      ],
    },
    {
      id: 2,
      title: t("item2Title"),
      desc: t("item2Desc"),
      stats: t("item2Stats"),
      instagramUrl: "https://www.instagram.com/reel/DZNll7NKOoz/?igsh=MWdpZTJ5ZTY1ejJxdw==&igsi=MWdpZTJ5ZTY1ejJxdw==",
      image: "/partners/case studies/Screenshot 2025-10-14 144823.png",
      tag: "Gemini",
      metrics: [
        { label: isRTL ? "صنّاع محتوى" : "Creators", value: "10 Top" },
        { label: isRTL ? "وصول مشاع" : "Combined Audience", value: "10M+" },
      ],
    },
    {
      id: 3,
      title: t("item3Title"),
      desc: t("item3Desc"),
      stats: t("item3Stats"),
      instagramUrl: "https://www.instagram.com/reel/DNlZf--NpEC/?igsh=MTBzcndrYWYzaDczNA==&igsi=MTBzcndrYWYzaDczNA==",
      image: "/partners/case studies/Screenshot 2025-10-14 145202.png",
      tag: "Mountain View",
      metrics: [
        { label: isRTL ? "مشاهدات أصلية" : "Organic Views", value: "100K+" },
        { label: isRTL ? "مشاركات" : "Shares", value: "1,000+" },
        { label: isRTL ? "تعليقات" : "Comments", value: "300+" },
      ],
    },
    {
      id: 4,
      title: t("item4Title"),
      desc: t("item4Desc"),
      stats: t("item4Stats"),
      instagramUrl: "https://www.instagram.com/p/DUbUwp_DCsf/?igsh=NzFrd2t2M3ZxbmFh&igsi=NzFrd2t2M3ZxbmFh",
      image: "/partners/case studies/Screenshot 2025-10-14 145249.png",
      tag: "BTC",
      metrics: [
        { label: isRTL ? "مشاهدات" : "Views", value: "470K+" },
        { label: isRTL ? "تفاعلات" : "Engagement", value: "8,000+" },
        { label: isRTL ? "معدل تفاعل" : "Engagement Rate", value: "6%–7.5%" },
      ],
    },
    {
      id: 5,
      title: t("item5Title"),
      desc: t("item5Desc"),
      stats: t("item5Stats"),
      image: "/partners/case studies/Screenshot 2025-10-14 145334.png",
      tag: "Palm Hills",
      metrics: [
        { label: isRTL ? "مشاهدات أول فيديو" : "Debut Reel Views", value: "700K+" },
        { label: isRTL ? "إجمالي الوصول" : "Total Reach", value: "3M+" },
        { label: isRTL ? "معدل تفاعل" : "Engagement Rate", value: "7.8% (6x avg)" },
      ],
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const current = caseStudies[currentIndex];

  return (
    <section id="case-studies" className="py-24 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-hot-pink border border-hot-pink/20 shadow-sm">
                {isRTL ? "قصص نجاح الشركاء" : "Case Studies"}
              </span>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 ${
                  isRTL ? "font-arabic-header" : "font-english-header"
                }`}
              >
                {t("title")}
              </h2>
              <p
                className={`text-base sm:text-lg text-gray-600 ${
                  isRTL ? "font-arabic-body" : "font-english-body"
                }`}
              >
                {t("subtitle")}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 self-end">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-800 hover:bg-hot-pink hover:text-white transition-all duration-200"
                aria-label="Previous case study"
              >
                <ChevronLeft className={`w-6 h-6 ${isRTL ? "rotate-180" : ""}`} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-800 hover:bg-hot-pink hover:text-white transition-all duration-200"
                aria-label="Next case study"
              >
                <ChevronRight className={`w-6 h-6 ${isRTL ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Active Case Study Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Content Side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-hot-pink/10 text-hot-pink border border-hot-pink/20">
                    {current.tag}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {currentIndex + 1} / {caseStudies.length}
                  </span>
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-black text-gray-900 leading-tight ${
                    isRTL ? "font-arabic-header" : "font-english-header"
                  }`}
                >
                  {current.title}
                </h3>

                <p
                  className={`text-base sm:text-lg text-gray-600 leading-relaxed ${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {current.desc}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  {current.metrics.map((m, idx) => (
                    <div key={idx} className="bg-cream/60 p-4 rounded-2xl border border-gray-200/60 space-y-1">
                      <p className="text-xl sm:text-2xl font-black text-gray-900">{m.value}</p>
                      <p className="text-xs font-semibold text-gray-500">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Preview */}
              <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50 flex items-center justify-center">
                {current.instagramUrl ? (
                  <iframe
                    key={current.id}
                    src={getInstagramEmbedUrl(current.instagramUrl)}
                    title={current.title}
                    className="w-full h-full border-none rounded-2xl bg-white"
                    allowFullScreen
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                ) : current.image ? (
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2">
            {caseStudies.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-hot-pink" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
