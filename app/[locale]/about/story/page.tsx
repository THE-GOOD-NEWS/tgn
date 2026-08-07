"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { TestimonialCard } from "../../sections/testomonials/TestomonialsCard";
import { WhoWeAreChatBubble } from "./components/WhoWeAreChatBubble";

// Counter component that animates from 0 to target value
interface CounterProps {
  end: string;
  duration?: number;
  className?: string;
}

const Counter = ({ end, duration = 2000, className }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | undefined;
    let animationFrame: number;

    const startValue = 0;
    // Handle non-numeric values like "Millions"
    const endValue = isNaN(parseInt(end.replace(/,/g, "").replace(/\+/g, "")))
      ? 1000000 // Default for "Millions" or other text
      : parseInt(end.replace(/,/g, "").replace(/\+/g, ""));

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(
        progress * (endValue - startValue) + startValue
      );

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  // Format the count with commas and add + if original had it
  const formattedCount =
    count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (end.includes("+") ? "+" : "");

  // Convert to Arabic numerals if in RTL mode
  const displayCount = isRTL
    ? formattedCount.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)])
    : formattedCount;

  return (
    <span ref={countRef} className={className}>
      {displayCount}
    </span>
  );
};

export default function StoryPage() {
  const t = useTranslations("about.story");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      className={` pb-12 md:pb-16 pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon mb-3 text-center`}
          >
            {t("title")}
          </h1>

          <div
            className="flex  flex-col md:flex-row items-center gap-8 max-sm:mb-36 mb-10"
            dir="ltr"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-start relative"
            >
              <div className="relative w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px]">
                <Image
                  src="/mounir/notFoundPadding.png"
                  alt="THE GOOD NEWS Character"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
                <div className="absolute top-[90%] -right-[145%] sm:top-1/3 sm:left-[140%] md:top-1/4 md:left-[140%] -translate-x-1/2 -translate-y-1/2">
                  <WhoWeAreChatBubble
                    text={t("content1")}
                    direction={"left"}
                    index={0}
                  />
                </div>
              </div>
              <div></div>
            </motion.div>
          </div>
          {/* <div>
            <h2
              dir={isRTL ? "rtl" : "ltr"}
              className={`text-xl md:text-2xl lg:text-3xl ${
                isRTL ? "font-arabic" : "font-english"
              } text-pink-500 font-semibold mb-6 text-center`}
            >
              {t("whoIsMariam")}
            </h2>
            <div className="flex mb-14 px-4 sm:px-6 md:px-16 lg:px-16 flex-col md:flex-row items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`w-full md:w-1/3 flex justify-center ${
                  isRTL ? "md:order-last" : "md:order-first"
                }`}
              >
                <Image
                  src="/pictures/TGN_Profilepicture2.png"
                  alt="Mariam Solika"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </motion.div>
              <motion.p
                dir={isRTL ? "rtl" : "ltr"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`${
                  isRTL ? "font-arabic text-right" : "font-english text-left"
                } mt-6 md:mt-0 md:w-2/3`}
              >
                {t("content2")}
              </motion.p>
            </div>
          </div> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 mb-10 px-4  sm:px-6 md:px-10 lg:px-16 pt-12 border-y border-gray-200"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon mb-4 text-center`}
          >
            {t("missionTitle")}
          </h2>

          <div className="flex flex-col-reverse md:flex-row items-center gap-8">
            <div
              className={`w-full md:w-1/2 ${
                isRTL ? "md:order-last" : "md:order-first"
              }`}
            >
              <p
                dir={isRTL ? "rtl" : "ltr"}
                className={`text-lg ${
                  isRTL ? "font-arabic text-right" : "font-english text-left"
                } text-center md:text-left ${isRTL ? "md:text-right" : ""}`}
              >
                {t("missionContent")}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className={`w-full md:pb-8 md:w-1/2 flex justify-center ${
                isRTL ? "md:order-first" : "md:order-last"
              }`}
            >
              <Image
                src="/wiig/mission4.gif"
                alt="Our Mission"
                width={300}
                height={200}
                className=""
                priority
              />
            </motion.div>
          </div>
        </motion.div>
        <div className="mb-36 px-4  sm:px-6 md:px-10 lg:px-16 border-gray-200 border-b pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon mb-10 text-center`}
          >
            {t("impact.title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
            {/* Followers Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center p-6 bg-pink-500 rounded-lg shadow-md"
            >
              <h3
                className={`text-3xl md:text-4xl font-bold text-white mb-3 ${
                  isRTL ? "font-arabic-header" : "font-english-heading"
                }`}
              >
                <Counter end="300,000+" duration={2500} />
              </h3>
              <p
                className={`text-lg text-center text-white ${
                  isRTL ? "font-arabic" : "font-english"
                }`}
              >
                {t("impact.followers").split(" ").slice(1).join(" ")}
              </p>
            </motion.div>

            {/* Stories Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center p-6 bg-pink-500 rounded-lg shadow-md"
            >
              <h3
                className={`text-3xl md:text-4xl font-bold text-white mb-3 ${
                  isRTL ? "font-arabic-header" : "font-english-heading"
                }`}
              >
                <Counter end="2,500+" duration={2000} />
              </h3>
              <p
                className={`text-lg text-center text-white ${
                  isRTL ? "font-arabic" : "font-english"
                }`}
              >
                {t("impact.stories").split(" ").slice(1).join(" ")}
              </p>
            </motion.div>

            {/* Students Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center p-6 bg-pink-500 rounded-lg shadow-md"
            >
              <h3
                className={`text-3xl md:text-4xl font-bold text-white mb-3 ${
                  isRTL ? "font-arabic-header" : "font-english-heading"
                }`}
              >
                <Counter end="20,000+" duration={2200} />
              </h3>
              <p
                className={`text-lg text-center text-white ${
                  isRTL ? "font-arabic" : "font-english"
                }`}
              >
                {t("impact.students").split(" ").slice(1).join(" ")}
              </p>
            </motion.div>
          </div>

          {/* Quote below cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p
              className={`text-2xl md:text-3xl font-semibold text-pink-500 italic ${
                isRTL ? "font-arabic" : "font-english"
              }`}
            >
              {t("impact.hearts")}
            </p>
          </motion.div>
        </div>
        <div className="mb-20 px-4  sm:px-6 md:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`font-semibold text-center text-xl md:text-2xl ${
              isRTL ? "font-arabic" : "font-english"
            } italic mt-6`}
          >
            {t("content3")}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
