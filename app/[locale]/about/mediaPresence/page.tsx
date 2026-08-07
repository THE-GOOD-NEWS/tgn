"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
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
      className={`px-6 md:px-10 lg:px-16 pb-12 md:pb-16 pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}

    >
                <div
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon text-center pb-6 md:pb-10`}
          >
            {t("title")}
          </div>
      {/* Who is Mariam Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2
          dir={isRTL ? "rtl" : "ltr"}
          className={`text-xl md:text-2xl lg:text-3xl ${
            isRTL ? "font-arabic" : "font-english"
          } text-pink-500 font-semibold mb-3 text-center`}
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
            className={`inline-block mt-2 text-2xl md:text-3xl ${
              isRTL ? "font-arabic-subheading" : "font-english-subheading"
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
          className="aspect-video w-full max-w-4xl mx-auto"
        >
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLYs-fHK8RjGzx8hWqkBaI8JvzPY054RNp"
            title="THE GOOD NEWS Interviews"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full  md:h-[500px] aspect-video rounded-xl shadow-lg"
          ></iframe>
        </motion.div>
      </section>
    </div>
  );
}
