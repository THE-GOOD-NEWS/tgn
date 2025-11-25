"use client";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Newsletter from "../sections/Newsletter";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function WorkshopsPage() {
  const t = useTranslations("workshops");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Carousel autoplay state
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  useEffect(() => {
    if (!carouselApi) return;
    const id = setInterval(() => {
      // Advance to the next slide automatically
      carouselApi.scrollNext();
    }, 3500);
    return () => clearInterval(id);
  }, [carouselApi]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.15 },
    },
  };

  return (
    <div
      className={`px-6 md:px-10 lg:px-16  pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Header Section */}
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.15 }}
          className="text-center mb-10 md:mb-16"
        >
          <div
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon`}
          >
            {t("title")}
          </div>
          <div
            className={`text-2xl md:text-3xl font-bold mt-3 ${
              isRTL ? "font-arabic-subheading" : "font-english-subheading"
            } text-carbon`}
          >
            {t("subtitle")}
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.p
            variants={item}
            className={`text-lg md:text-xl leading-relaxed ${
              isRTL ? "font-arabic" : "font-english"
            } text-carbon`}
          >
            {t("introduction")}
          </motion.p>
        </motion.div>
      </section>

      {/* Objectives Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
          className="text-center mb-10"
        >
          <div
            className={`text-3xl md:text-4xl font-bold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon`}
          >
            {t("objectivesTitle")}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={item}
            className="bg-cream p-6 rounded-lg shadow-md"
          >
            <h3
              className={`text-xl font-bold mb-3 text-hot-pink ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("equip")}
            </h3>
            <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
              {t("equipDescription")}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-cream p-6 rounded-lg shadow-md"
          >
            <h3
              className={`text-xl font-bold mb-3 text-hot-pink ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("empower")}
            </h3>
            <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
              {t("empowerDescription")}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-cream p-6 rounded-lg shadow-md"
          >
            <h3
              className={`text-xl font-bold mb-3 text-hot-pink ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("inspire")}
            </h3>
            <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
              {t("inspireDescription")}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Workshop Tracks Section */}
      <div className="mb-12">
        <Carousel
          opts={{ loop: true, direction: isRTL ? "rtl" : "ltr" }}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent>
            {["IMG_3965.jpg", "IMG_3978.webp", "TMPH3233.webp"].map(
              (file, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={`/workshops/${file}`}
                      alt={t("title")}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselIndicators className="mt-4" />
        </Carousel>
      </div>
      {/* Autoplay Carousel from public/workshops */}
      <section className="max-w-6xl mx-auto " dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
          className="text-center mb-10"
        >
          <div
            className={`text-3xl md:text-4xl font-bold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon`}
          >
            {t("tracksTitle")}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Content Creation Track */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-cream p-8 rounded-lg shadow-lg"
          >
            <motion.h3
              variants={item}
              className={`text-2xl font-bold mb-6 text-hot-pink ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("contentCreationTitle")}
            </motion.h3>

            <motion.div variants={item} className="mb-6">
              <h4
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
              >
                {t("foundationTitle")}
              </h4>
              <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
                {t("foundationDescription")}
              </p>
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <h4
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
              >
                {t("skillsTitle")}
              </h4>
              <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
                {t("skillsDescription")}
              </p>
            </motion.div>

            <motion.div variants={item}>
              <h4
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
              >
                {t("audienceTitle")}
              </h4>
              <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
                {t("audienceDescription")}
              </p>
            </motion.div>
          </motion.div>

          {/* From Content to Business Track */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-cream p-8 rounded-lg shadow-lg"
          >
            <motion.h3
              variants={item}
              className={`text-2xl font-bold mb-6 text-hot-pink ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("businessTitle")}
            </motion.h3>

            <motion.div variants={item} className="mb-6">
              <h4
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
              >
                {t("partnershipsTitle")}
              </h4>
              <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
                {t("partnershipsDescription")}
              </p>
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <h4
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
              >
                {t("pitchingTitle")}
              </h4>
              <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
                {t("pitchingDescription")}
              </p>
            </motion.div>

            <motion.div variants={item}>
              <h4
                className={`text-xl font-semibold mb-2 ${
                  isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
              >
                {t("monetizationTitle")}
              </h4>
              <p className={`${isRTL ? "font-arabic" : "font-english"}`}>
                {t("monetizationDescription")}
              </p>
            </motion.div>
          </motion.div>
        </div>
        <Newsletter />
      </section>
    </div>
  );
}
