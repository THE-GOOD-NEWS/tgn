"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const PartnerLogo = ({
  src,
  alt,
  link = null,
}: {
  src: string;
  alt: string;
  link?: string | null;
}) => {
  const content = (
    <div className="bg-white rounded-lg shadow-md p-4 h-32 flex items-center justify-center transition-all duration-300 hover:shadow-lg">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    </div>
  );

  if (link) {
    return (
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </Link>
    );
  }

  return content;
};
export default function MediaPresencePage() {
  const t = useTranslations("mediaPresence");
  const locale = useLocale();
  const isRTL = locale === "ar";

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
      transition: { duration: 0.6 },
    },
  };

  const mediaLogos = [
    {
      name: "CBC",
      src: "/logos/media presence/cbc.png",
      link: "https://www.facebook.com/CBCEgypt/?locale=ar_AR",
    },
    {
      name: "Al Nahar",
      src: "/logos/media presence/alnahar.jpg",
      link: "https://www.facebook.com/alnahareg/?locale=ar_AR",
    },
    {
      name: "European Commission",
      src: "/logos/media presence/European Commission.png",
      link: "https://www.instagram.com/reels/Cq6LjoSA9Vq/",
    },
    {
      name: "Identity",
      src: "/logos/media presence/identity.jpg",
      link: "https://www.facebook.com/IdentityMagEG",
    },
    {
      name: "Maspero",
      src: "/logos/media presence/maspero.png",
      link: "https://www.maspero.eg/",
    },
    {
      name: "Scoop Empire",
      src: "/logos/media presence/scoop empire.png",
      link: "https://www.facebook.com/ScoopEmpire/?locale=ar_AR",
    },
    {
      name: "What Women Want",
      src: "/logos/media presence/what women want.jpg",
      link: "https://whatwomenwant-mag.com/",
    },
    {
      name: "Dubai tv",
      src: "/logos/media presence/dubai-tv.jpg",
      link: "https://www.facebook.com/DubaiTV/?locale=ar_AR",
    },
  ];

  return (
    <div
      className={`px-6 md:px-10 lg:px-16 pb-12 md:pb-16 pt-20 md:pt-28 ${isRTL ? "text-right" : "text-left"
        }`}
    >
      {/* Founder Hero Section matching reference media */}
      <section className="max-w-6xl mx-auto mt-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Title, Subtitles & Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            {/* Header Titles */}
            <div className="space-y-1">
              <span
                className={`block text-4xl sm:text-5xl md:text-6xl font-black text-hot-pink uppercase tracking-tight ${isRTL ? "font-arabic-header" : "font-english-heading"
                  }`}
              >
                {isRTL ? "تعرف على" : "MEET THE"}
              </span>
              <p
                className={`text-xl sm:text-2xl font-bold text-gray-800 tracking-wide ${isRTL ? "font-arabic" : "font-english"
                  }`}
              >
                {isRTL ? "المؤسس والرئيس التنفيذي" : "Founder & CEO"}
              </p>
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 ${isRTL ? "font-arabic-header" : "font-english-heading"
                  }`}
              >
                {isRTL ? "مريم سوليكا" : "Mariam Solika"}
              </h1>
            </div>

            {/* Bio Card (Cream Box with rounded corners and TGN logo) */}
            <div className="bg-[#FAF6F0] rounded-[2rem] p-6 sm:p-8 md:p-9 border border-amber-200/50 shadow-xl relative space-y-5">
              <p
                dir={isRTL ? "rtl" : "ltr"}
                className={`text-sm sm:text-base md:text-[1.05rem] text-gray-900 leading-relaxed font-medium ${isRTL ? "font-arabic text-right" : "font-english text-left"
                  }`}
              >
                {t("content2")}
              </p>

              {/* TGN Logo at the bottom */}
              <div className="pt-2 flex items-center">
                <Image
                  src="/logos/TGN_LOGOS_PNG-03.png"
                  alt="The Good News ذا جود نيوز"
                  width={140}
                  height={50}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Founder Photo at UN (IMG_2982.JPG) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 group"
          >
            <Image
              src="/founder/IMG_2982.JPG"
              alt="Mariam Solika"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured On Section */}
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-6"
        >

          {/* <div
            className={`text-2xl md:text-3xl font-bold mt-3 ${
              isRTL ? "font-arabic-subheading" : "font-english-subheading"
            } text-carbon`}
          >
            {t("subtitle")}
          </div> */}
          <span className="inline-block mt-2 text-hot-pink font-bold tracking-wide">
            {t("featuredOnLabel")}
          </span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          {mediaLogos.map((logo, index) => (
            <motion.div key={index} variants={item} className="w-full">
              <PartnerLogo src={logo.src} alt={logo.name} link={logo.link} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* YouTube Playlist Section */}
      <section className="max-w-6xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span
            className={`inline-block mt-2 text-2xl md:text-3xl ${isRTL ? "font-arabic-subheading" : "font-english-subheading"
              } text-carbon font-bold tracking-wide`}
          >
            {t("interviewsLabel")}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto px-8 md:px-12"
        >
          <Carousel
            opts={{ align: "start", loop: true, direction: isRTL ? "rtl" : "ltr" }}
            className="w-full relative"
          >
            <CarouselContent>
              {[
                "TvMmW4MOHTk",
                "TVtAxOnIV2s",
                "NdGnjgpthOM",
                "01-TN6zwGfc",
                "V3dmqbAfmmU",
                "ycbDcr-hbdw",
                "8EJzfybOAKo",
                "gSIpa0PjhQk",
                "Numm4ydwNO4",
              ].map((videoId, idx) => (
                <CarouselItem key={idx}>
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`THE GOOD NEWS Interview ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full md:h-[500px] aspect-video rounded-xl shadow-lg"
                    ></iframe>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white hover:bg-primary hover:text-white border-none shadow-md -left-4 md:-left-12" />
            <CarouselNext className="bg-white hover:bg-primary hover:text-white border-none shadow-md -right-4 md:-right-12" />
          </Carousel>
        </motion.div>
      </section>
    </div>
  );
}
