"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export function ImpactMetrics() {
  const t = useTranslations("tgmg.impact");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const metrics = [
    {
      value: t("views"),
      label: t("viewsLabel"),
    },
    {
      value: t("community"),
      label: t("communityLabel"),
    },
    {
      value: t("stories"),
      label: t("storiesLabel"),
    },
    {
      value: t("events"),
      label: t("eventsLabel"),
    },
    {
      value: t("reach"),
      label: t("reachLabel"),
    },
  ];

  return (
    <section id="our-impact" className="py-20 lg:py-28 bg-gradient-to-br from-cream/60 via-white to-cream/40 relative overflow-hidden">
      {/* Decorative Pink Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-hot-pink/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-6 lg:space-y-12">

          {/* Centered Section Header above Image and Stats */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight ${isRTL ? "font-arabic-header" : "font-english-header"
                }`}
            >
              {t("title")}
            </h2>
            <p
              className={`text-base sm:text-lg text-gray-600 font-medium ${isRTL ? "font-arabic-body" : "font-english-body"
                }`}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Grid Layout: Side Image + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Side Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center relative"
            >
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Soft pink mascot background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-hot-pink/30 via-pink-300/20 to-hot-pink/10 rounded-full blur-3xl transform scale-95 -z-10" />

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex justify-center p-2"
                >
                  <Image
                    src="/mounir/notFoundPadding.png"
                    alt="TGMG Impact Mascot"
                    width={380}
                    height={380}
                    className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]  h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Column */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                {metrics.map((metric, idx) => {
                  const isLastItem = idx === metrics.length - 1 && metrics.length % 2 !== 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className={`bg-white/90 backdrop-blur-md rounded-2xl p-5 border-2 border-hot-pink/30 hover:border-hot-pink shadow-md hover:shadow-xl hover:shadow-hot-pink/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${isLastItem ? "col-span-2 sm:col-span-1" : ""
                        }`}
                    >
                      {/* Animated Pink Gradient Bar */}
                      <motion.div
                        className="h-1.5 w-12 rounded-full bg-gradient-to-r from-hot-pink via-pink-500 to-rose-400 mb-4 group-hover:w-full transition-all duration-500"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      />

                      {/* Animated pink accent highlight */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-hot-pink to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        <h3
                          className={`text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-hot-pink transition-colors duration-300 tracking-tight ${isRTL ? "font-arabic-header" : "font-english-header"
                            }`}
                        >
                          {metric.value}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-semibold text-gray-500 mt-1.5 leading-snug ${isRTL ? "font-arabic-body" : "font-english-body"
                            }`}
                        >
                          {metric.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
