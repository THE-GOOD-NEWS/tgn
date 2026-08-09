"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import TikTokEmbed from "@/components/tiktok-embed";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from "@/components/ui/carousel";

// Media renderer component to handle different media types
interface MediaItem {
  type: "image" | "youtube" | "tiktok" | "instagram";
  src: string;
  caption?: string;
}

const MediaRenderer = ({ media }: { media: MediaItem }) => {
  // Function to extract YouTube video ID
  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to create proper embed URL for different platforms
  const getEmbedUrl = (media: MediaItem) => {
    switch (media.type) {
      case "youtube":
        const videoId = getYoutubeVideoId(media.src);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : media.src;
      case "tiktok":
        // Robust extraction of TikTok video ID and embed URL
        try {
          const url = new URL(media.src);
          // Try to get video id from pathname (e.g., /@user/video/123456789)
          const match = url.pathname.match(/\/video\/(\d+)/);
          const idFromPath = match?.[1];
          // Fallback to query param referer_video_id
          const idFromQuery = url.searchParams.get("referer_video_id");
          const videoIdTikTok = idFromPath || idFromQuery;
          return videoIdTikTok
            ? `https://www.tiktok.com/embed/${videoIdTikTok}?autoplay=0&muted=0&controls=1&playsinline=0&loop=0&autopause=1&preload=none`
            : media.src;
        } catch {
          return media.src;
        }
      case "instagram":
        // Build proper Instagram embed URL supporting posts and reels
        try {
          const url = new URL(media.src);
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
            // Map plural path to the singular embed endpoint
            type = "reel";
            shortcode = parts[reelsIndex + 1];
          }

          return type && shortcode
            ? `https://www.instagram.com/${type}/${shortcode}/embed`
            : media.src;
        } catch {
          return media.src;
        }
      default:
        return media.src;
    }
  };

  return (
    <>
      {media.type === "image" ? (
        <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden">
          <Image
            src={media.src}
            alt={media.caption || "Case study image"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : media.type === "youtube" ? (
        <div className="relative h-56 md:h-64 w-full rounded-2xl overflow-hidden">
          <iframe
            src={getEmbedUrl(media)}
            title={media.caption || "YouTube video"}
            className="absolute w-full h-full rounded-2xl"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      ) : media.type === "tiktok" ? (
        <div className="relative w-full max-w-[260px] md:max-w-[280px] mx-auto h-[360px] md:h-[380px] rounded-2xl overflow-hidden flex justify-center items-center">
          <TikTokEmbed url={media.src} caption={media.caption} />
        </div>
      ) : media.type === "instagram" ? (
        <div className="relative w-full max-w-[260px] md:max-w-[280px] mx-auto h-[360px] md:h-[380px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex justify-center items-center">
          <iframe
            src={getEmbedUrl(media)}
            title={media.caption || "Instagram post"}
            className="w-full h-full border-none rounded-xl bg-white"
            allowFullScreen
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      ) : (
        <div className="relative h-64 w-full rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Unsupported media type</p>
        </div>
      )}
      {/* {media.caption && (
        <p className="text-sm text-gray-600 mt-2">{media.caption}</p>
      )} */}
    </>
  );
};

// Partner Logo Component with optional link
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

export default function PartnersPage() {
  const t = useTranslations("partners");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
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

  // Partner categories
  const categories = [
    {
      id: "humanitarian",
      title: t("categories.humanitarian"),
      folder: "Humanitarian & NGOs",
      logos: [
        {
          id: "10001",
          src: "/partners/Humanitarian & NGOs/10001.png",
          alt: "Partner 10001",
          link: null,
        },
        {
          id: "10003",
          src: "/partners/Humanitarian & NGOs/10003.jpeg",
          alt: "Partner 10003",
          link: null,
        },
        {
          id: "10004",
          src: "/partners/Humanitarian & NGOs/10004.png",
          alt: "Partner 10004",
          link: null,
        },
        {
          id: "10005",
          src: "/partners/Humanitarian & NGOs/10005.png",
          alt: "Partner 10005",
          link: null,
        },
        {
          id: "10007",
          src: "/partners/Humanitarian & NGOs/10007.png",
          alt: "Partner 10007",
          link: null,
        },
        {
          id: "10008",
          src: "/partners/Humanitarian & NGOs/10008.png",
          alt: "Partner 10008",
          link: null,
        },
        {
          id: "10014",
          src: "/partners/Humanitarian & NGOs/10014.png",
          alt: "Partner 10014",
          link: null,
        },
        {
          id: "10017",
          src: "/partners/Humanitarian & NGOs/10017.png",
          alt: "Partner 10017",
          link: null,
        },
        {
          id: "10021",
          src: "/partners/Humanitarian & NGOs/10021.png",
          alt: "Partner 10021",
          link: null,
        },
        {
          id: "10030",
          src: "/partners/Humanitarian & NGOs/10030.png",
          alt: "Partner 10030",
          link: null,
        },
        {
          id: "10031",
          src: "/partners/Humanitarian & NGOs/10031.png",
          alt: "Partner 10031",
          link: null,
        },
      ],
    },
    {
      id: "events",
      title: t("categories.events"),
      folder: "events",
      logos: [
        {
          id: "10006",
          src: "/partners/events/10006.png",
          alt: "Partner 10006",
          link: null,
        },
        {
          id: "10010",
          src: "/partners/events/10010.png",
          alt: "Partner 10010",
          link: null,
        },
        {
          id: "10012",
          src: "/partners/events/10012.png",
          alt: "Partner 10012",
          link: null,
        },
        {
          id: "10013",
          src: "/partners/events/10013.png",
          alt: "Partner 10013",
          link: null,
        },
        {
          id: "10022",
          src: "/partners/events/10022.png",
          alt: "Partner 10022",
          link: null,
        },
        {
          id: "10023",
          src: "/partners/events/10023.png",
          alt: "Partner 10023",
          link: null,
        },
        {
          id: "10034",
          src: "/partners/events/10034.png",
          alt: "Partner 10034",
          link: null,
        },
      ],
    },
    {
      id: "governate",
      title: t("categories.governate"),
      folder: "governate",
      logos: [
        {
          id: "10011",
          src: "/partners/governate/10011.png",
          alt: "Partner 10011",
          link: null,
        },
        {
          id: "10015",
          src: "/partners/governate/10015.png",
          alt: "Partner 10015",
          link: null,
        },
        {
          id: "10016",
          src: "/partners/governate/10016.png",
          alt: "Partner 10016",
          link: null,
        },
        {
          id: "10018",
          src: "/partners/governate/10018.png",
          alt: "Partner 10018",
          link: null,
        },
        {
          id: "10032",
          src: "/partners/governate/10032.png",
          alt: "Partner 10032",
          link: null,
        },
        {
          id: "instagram1",
          src: "/partners/governate/httpswww.instagram.comreelCdx08Tpgx2N.png",
          alt: "Instagram Reel",
          link: "https://www.instagram.com/reel/Cdx08Tpgx2N",
        },
        {
          id: "instagram2",
          src: "/partners/governate/httpswww.instagram.comreelCvXtvn3Ap7e.png",
          alt: "Instagram Reel",
          link: "https://www.instagram.com/reel/CvXtvn3Ap7e",
        },
      ],
    },
    {
      id: "privateSector",
      title: t("categories.privateSector"),
      folder: "private sector",
      logos: [
        {
          id: "10019",
          src: "/partners/private sector/10019.png",
          alt: "Partner 10019",
          link: null,
        },
        {
          id: "10020",
          src: "/partners/private sector/10020.png",
          alt: "Partner 10020",
          link: null,
        },
        {
          id: "10024",
          src: "/partners/private sector/10024.png",
          alt: "Partner 10024",
          link: null,
        },
        {
          id: "10025",
          src: "/partners/private sector/10025.png",
          alt: "Partner 10025",
          link: null,
        },
        {
          id: "10026",
          src: "/partners/private sector/10026.png",
          alt: "Partner 10026",
          link: null,
        },
        {
          id: "10027",
          src: "/partners/private sector/10027.png",
          alt: "Partner 10027",
          link: null,
        },
        {
          id: "10028",
          src: "/partners/private sector/10028.png",
          alt: "Partner 10028",
          link: null,
        },
        {
          id: "10029",
          src: "/partners/private sector/10029.png",
          alt: "Partner 10029",
          link: null,
        },
        {
          id: "10033",
          src: "/partners/private sector/10033.png",
          alt: "Partner 10033",
          link: null,
        },
        {
          id: "10035",
          src: "/partners/private sector/10035.png",
          alt: "Partner 10035",
          link: null,
        },
        {
          id: "google",
          src: "/partners/private sector/Google__G__logo.svg.png",
          alt: "Google",
          link: "https://www.google.com",
        },
      ],
    },
  ];

  // Case Studies data
  interface CaseStudy {
    id: string;
    partnerLogo?: string;
    stats?: Array<{ label: string; value: string }>;
    mediaItems: MediaItem[];
  }

  const caseStudies: CaseStudy[] = [
    {
      id: "case1",
      partnerLogo: "/partners/governate/10016.png",
      mediaItems: [
        {
          type: "image",
          src: "/partners/case studies/case11.jpeg",
          caption: "Collaboration post with H.E. Dr. Ashraf Sobhy",
        },
        // {
        //   type: "image",
        //   src: "/partners/case studies/ministry-case-2.jpg",
        //   caption:
        //     "Founder meeting by H.E. Dr. Ashraf Sobhy for innovative ideas of youth empowerment",
        // },
      ],
    },
    {
      id: "case2",
      partnerLogo: "/partners/private sector/10035.png",
      mediaItems: [
        {
          type: "tiktok",
          src: "https://www.tiktok.com/@thegoodnews.me/video/7396735281153543442",
          caption: "TGN Media Digital Campaign",
        },
      ],
      stats: [
        {
          value: "700K",
          label: "views",
        },
        {
          value: "3M+",
          label: "total reach",
        },
      ],
    },
    {
      id: "case3",
      partnerLogo: "/partners/yalla.png",
      mediaItems: [
        {
          type: "instagram",
          src: "https://www.instagram.com/p/DK-H8ntigsS/?utm_source=ig_embed&ig_rid=319440f4-4a0d-4784-9c9a-4baa7526fb9f",
          caption: "Digital transformation implementation",
        },
      ],
    },
    {
      id: "case4",
      partnerLogo: "/partners/private sector/10033.png",
      mediaItems: [
        {
          type: "instagram",
          src: "https://www.instagram.com/reels/DNlZf--NpEC/",
          caption: "Community development program in action",
        },
      ],
    },
    {
      id: "case5",
      partnerLogo: "/partners/Humanitarian & NGOs/10005.png",
      mediaItems: [
        {
          type: "image",
          src: "/partners/case studies/case12.jpeg",
          caption: "Community development program in action",
        },
      ],
    },
    {
      id: "case6",
      partnerLogo: "/partners/Humanitarian & NGOs/10014.png",
      mediaItems: [
        {
          type: "youtube",
          src: "https://www.youtube.com/watch?v=MaS8dIWRch4&t=89s",
          caption: "Community development program in action",
        },
      ],
    },
  ];
  const [tikTokEmbedData, setTikTokEmbedData] = useState<any>(null);

  return (
    <div
      className={`px-6 md:px-10 lg:px-16 pb-12 md:pb-16 pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
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
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            {t("description")}
          </p>
        </motion.div>
        {/* Case Studies Section */}
        <section className="mb-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hot-pink">
                {t("caseStudiesTitle")}
              </h2>
              <div className="flex items-center gap-2">
                <CarouselPrevious className="relative inset-auto translate-y-0 h-10 w-10 border-gray-200 hover:bg-hot-pink hover:text-white hover:border-hot-pink transition-all shadow-sm" />
                <CarouselNext className="relative inset-auto translate-y-0 h-10 w-10 border-gray-200 hover:bg-hot-pink hover:text-white hover:border-hot-pink transition-all shadow-sm" />
              </div>
            </div>
            <CarouselContent>
              {caseStudies.map((study) => (
                <CarouselItem key={study.id} className="basis-full">
                  <div
                    className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl relative min-h-[480px] flex flex-col justify-between"
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  >
                    <div>
                      {/* Title Section */}
                      <div
                        className="flex w-full justify-between items-start mb-6"
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                      >
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                            {t(`caseStudies.${study.id}.category`)}
                          </h3>
                          <div className="w-12 h-1 bg-hot-pink"></div>
                        </div>
                        {study.partnerLogo && (
                          <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 relative">
                            <Image
                              src={study.partnerLogo}
                              alt="Partner logo"
                              width={80}
                              height={80}
                              className="object-contain max-h-full"
                            />
                          </div>
                        )}
                      </div>

                      <div
                        className="flex flex-col md:flex-row gap-8 items-start"
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                      >
                        <div className="md:w-1/2">
                          <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-6">
                            {t(`caseStudies.${study.id}.description`)}
                          </p>

                          {/* Stats for Palm Hills case study */}
                          {study.id === "case2" && study.stats && (
                            <div className="mt-4 p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
                              <p className="text-base md:text-lg font-bold text-gray-900">
                                {locale === "en"
                                  ? "The campaign's debut video generated over "
                                  : "حقق فيديو إطلاق الحملة أكثر من "}
                                <span className="text-hot-pink font-extrabold text-xl">
                                  {t(`caseStudies.${study.id}.stats.views`)}
                                </span>
                                {locale === "en" ? "," : "،"}
                              </p>
                              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">
                                {locale === "en"
                                  ? "with the overall metrics reaching an impressive "
                                  : "مع وصول المقاييس الإجمالية إلى "}
                                <span className="text-hot-pink font-extrabold text-xl">
                                  {t(`caseStudies.${study.id}.stats.totalReach`)}
                                </span>
                                {locale === "en"
                                  ? " in total reach."
                                  : " في الوصول الإجمالي."}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Media Section */}
                        <div className="md:w-1/2 flex w-full gap-4 justify-center items-center">
                          {study.mediaItems &&
                            study.mediaItems.map((media, index) => (
                              <div key={index} className="relative w-full">
                                <MediaRenderer media={media} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-8 px-2">
              <CarouselIndicators className="gap-2" />
              <div className="flex gap-2">
                <CarouselPrevious className="relative inset-auto translate-y-0 h-10 w-10 border-gray-200 hover:bg-hot-pink hover:text-white transition-colors" />
                <CarouselNext className="relative inset-auto translate-y-0 h-10 w-10 border-gray-200 hover:bg-hot-pink hover:text-white transition-colors" />
              </div>
            </div>
          </Carousel>
        </section>


        {/* Infinite Horizontal Scrolling Partner Logos Section */}
        <section className="my-20 relative overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Row 1 - Scrolling Left */}
          <div className="flex overflow-hidden mb-6 select-none">
            <div className="animate-marquee-left flex gap-6 items-center">
              {[
                { id: "1", src: "/assets/newLogos/2025-Entreprenelle-logo.png", alt: "Entreprenelle" },
                { id: "2", src: "/assets/newLogos/257-2570094_transparent-background-vodafone-logo.png", alt: "Vodafone" },
                { id: "3", src: "/assets/newLogos/ANIMATEX.png", alt: "Animatex" },
                { id: "4", src: "/assets/newLogos/AUC.png", alt: "AUC" },
                { id: "5", src: "/assets/newLogos/Al-Ahly-Sabbour.webp", alt: "Al Ahly Sabbour" },
                { id: "6", src: "/assets/newLogos/BTC.png", alt: "BTC" },
                { id: "7", src: "/assets/newLogos/COP.png", alt: "COP" },
                { id: "8", src: "/assets/newLogos/CREATIVE INDUSTRY SUMMIT.png", alt: "Creative Industry Summit" },
                { id: "9", src: "/assets/newLogos/European_Commission.svg.webp", alt: "European Commission" },
                { id: "10", src: "/assets/newLogos/Google__G__logo.svg.webp", alt: "Google" },
                { id: "11", src: "/assets/newLogos/IOM_Logo.png", alt: "IOM" },
                { id: "12", src: "/assets/newLogos/LYDIA AKRAM MARKET.jpg", alt: "Lydia Akram Market" },
                { id: "13", src: "/assets/newLogos/MIU.png", alt: "MIU" },
                { id: "14", src: "/assets/newLogos/Masar Logo - 1.png", alt: "Masar" },
                { id: "15", src: "/assets/newLogos/Paragon.jpeg", alt: "Paragon" },
                { id: "16", src: "/assets/newLogos/Plan_International_Logo_blue.jpg", alt: "Plan International" },
                { id: "17", src: "/assets/newLogos/SAVE THE CHILDREN.webp", alt: "Save the Children" },
                { id: "18", src: "/assets/newLogos/SCHNEIDER.png", alt: "Schneider" },
                { id: "19", src: "/assets/newLogos/STARTUPS WITHOUT BOARDERS.png", alt: "Startups Without Borders" },
                { id: "20", src: "/assets/newLogos/SYNC SUMMIT.png", alt: "Sync Summit" },
                { id: "21", src: "/assets/newLogos/TETRA PAK.png", alt: "Tetra Pak" },
                { id: "22", src: "/assets/newLogos/Traverse23-Logo.png", alt: "Traverse 23" },
                { id: "23", src: "/assets/newLogos/UNHCR.svg.webp", alt: "UNHCR" },
                { id: "24", src: "/assets/newLogos/UNICEF_Logo.png", alt: "UNICEF" },
                { id: "25", src: "/assets/newLogos/UN_Women_Logo.svg.webp", alt: "UN Women" },
                { id: "26", src: "/assets/newLogos/US EMBASSY.png", alt: "US Embassy" },
                { id: "1", src: "/assets/newLogos/2025-Entreprenelle-logo.png", alt: "Entreprenelle" },
                { id: "2", src: "/assets/newLogos/257-2570094_transparent-background-vodafone-logo.png", alt: "Vodafone" },
                { id: "3", src: "/assets/newLogos/ANIMATEX.png", alt: "Animatex" },
                { id: "4", src: "/assets/newLogos/AUC.png", alt: "AUC" },
                { id: "5", src: "/assets/newLogos/Al-Ahly-Sabbour.webp", alt: "Al Ahly Sabbour" },
                { id: "6", src: "/assets/newLogos/BTC.png", alt: "BTC" },
                { id: "7", src: "/assets/newLogos/COP.png", alt: "COP" },
                { id: "8", src: "/assets/newLogos/CREATIVE INDUSTRY SUMMIT.png", alt: "Creative Industry Summit" },
                { id: "9", src: "/assets/newLogos/European_Commission.svg.webp", alt: "European Commission" },
                { id: "10", src: "/assets/newLogos/Google__G__logo.svg.webp", alt: "Google" },
                { id: "11", src: "/assets/newLogos/IOM_Logo.png", alt: "IOM" },
                { id: "12", src: "/assets/newLogos/LYDIA AKRAM MARKET.jpg", alt: "Lydia Akram Market" },
                { id: "13", src: "/assets/newLogos/MIU.png", alt: "MIU" },
                { id: "14", src: "/assets/newLogos/Masar Logo - 1.png", alt: "Masar" },
                { id: "15", src: "/assets/newLogos/Paragon.jpeg", alt: "Paragon" },
                { id: "16", src: "/assets/newLogos/Plan_International_Logo_blue.jpg", alt: "Plan International" },
                { id: "17", src: "/assets/newLogos/SAVE THE CHILDREN.webp", alt: "Save the Children" },
                { id: "18", src: "/assets/newLogos/SCHNEIDER.png", alt: "Schneider" },
                { id: "19", src: "/assets/newLogos/STARTUPS WITHOUT BOARDERS.png", alt: "Startups Without Borders" },
                { id: "20", src: "/assets/newLogos/SYNC SUMMIT.png", alt: "Sync Summit" },
                { id: "21", src: "/assets/newLogos/TETRA PAK.png", alt: "Tetra Pak" },
                { id: "22", src: "/assets/newLogos/Traverse23-Logo.png", alt: "Traverse 23" },
                { id: "23", src: "/assets/newLogos/UNHCR.svg.webp", alt: "UNHCR" },
                { id: "24", src: "/assets/newLogos/UNICEF_Logo.png", alt: "UNICEF" },
                { id: "25", src: "/assets/newLogos/UN_Women_Logo.svg.webp", alt: "UN Women" },
                { id: "26", src: "/assets/newLogos/US EMBASSY.png", alt: "US Embassy" },
              ].map((logo, index) => (
                <div
                  key={`row1-${logo.id}-${index}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-24 w-44 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-105 shrink-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="176px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className="flex overflow-hidden select-none">
            <div className="animate-marquee-right flex gap-6 items-center">
              {[
                { id: "27", src: "/assets/newLogos/WB.png", alt: "World Bank" },
                { id: "28", src: "/assets/newLogos/Water Valley.png", alt: "Water Valley" },
                { id: "29", src: "/assets/newLogos/Yalla-Success.jpg", alt: "Yalla Success" },
                { id: "30", src: "/assets/newLogos/ahl-masr.png", alt: "Ahl Masr" },
                { id: "31", src: "/assets/newLogos/hayat-logo.png", alt: "Hayat" },
                { id: "32", src: "/assets/newLogos/huawei-logo-picture-4.png", alt: "Huawei" },
                { id: "33", src: "/assets/newLogos/instax-logo-vector.png", alt: "Instax" },
                { id: "34", src: "/assets/newLogos/mountain view.jpg", alt: "Mountain View" },
                { id: "35", src: "/assets/newLogos/oppo-logo-png-oppo-logo-and-symbol-meaning-history-png-1920x1080.png", alt: "Oppo" },
                { id: "36", src: "/assets/newLogos/palm hills.png", alt: "Palm Hills" },
                { id: "37", src: "/assets/newLogos/pepsico.jpg", alt: "PepsiCo" },
                { id: "38", src: "/assets/newLogos/rise up summit.png", alt: "Rise Up Summit" },
                { id: "39", src: "/assets/newLogos/sharjah book authority.png", alt: "Sharjah Book Authority" },
                { id: "40", src: "/assets/newLogos/talabatlogo-freelogovectors.net_.png", alt: "Talabat" },
                { id: "41", src: "/assets/newLogos/terre-des-hommes-logo.png", alt: "Terre des Hommes" },
                { id: "42", src: "/assets/newLogos/tiktok-6338432_1280.png", alt: "TikTok" },
                { id: "43", src: "/assets/newLogos/undp-logo.png.webp", alt: "UNDP" },
                { id: "44", src: "/assets/newLogos/wujud.png", alt: "Wujud" },
                { id: "45", src: "/assets/newLogos/المجلس القومي للمرأة.jpg", alt: "المجلس القومي للمرأة" },
                { id: "46", src: "/assets/newLogos/جمهورية مصر العربية - وزارة البيئة.png", alt: "وزارة البيئة" },
                { id: "47", src: "/assets/newLogos/مركز الشباب العربي.png", alt: "مركز الشباب العربي" },
                { id: "48", src: "/assets/newLogos/وزارة التخطيط والتنمية الاقتصادية.jpg", alt: "وزارة التخطيط والتنمية الاقتصادية" },
                { id: "49", src: "/assets/newLogos/وزارة التضامن الاجتماعي.jpg", alt: "وزارة التضامن الاجتماعي" },
                { id: "50", src: "/assets/newLogos/وزارة الشباب والرياضة جمهورية مصر العربية.webp", alt: "وزارة الشباب والرياضة" },
                { id: "51", src: "/assets/newLogos/وزارة الهجرة وشئون المصريين بالخارج.jpg", alt: "وزارة الهجرة" },
                { id: "27", src: "/assets/newLogos/WB.png", alt: "World Bank" },
                { id: "28", src: "/assets/newLogos/Water Valley.png", alt: "Water Valley" },
                { id: "29", src: "/assets/newLogos/Yalla-Success.jpg", alt: "Yalla Success" },
                { id: "30", src: "/assets/newLogos/ahl-masr.png", alt: "Ahl Masr" },
                { id: "31", src: "/assets/newLogos/hayat-logo.png", alt: "Hayat" },
                { id: "32", src: "/assets/newLogos/huawei-logo-picture-4.png", alt: "Huawei" },
                { id: "33", src: "/assets/newLogos/instax-logo-vector.png", alt: "Instax" },
                { id: "34", src: "/assets/newLogos/mountain view.jpg", alt: "Mountain View" },
                { id: "35", src: "/assets/newLogos/oppo-logo-png-oppo-logo-and-symbol-meaning-history-png-1920x1080.png", alt: "Oppo" },
                { id: "36", src: "/assets/newLogos/palm hills.png", alt: "Palm Hills" },
                { id: "37", src: "/assets/newLogos/pepsico.jpg", alt: "PepsiCo" },
                { id: "38", src: "/assets/newLogos/rise up summit.png", alt: "Rise Up Summit" },
                { id: "39", src: "/assets/newLogos/sharjah book authority.png", alt: "Sharjah Book Authority" },
                { id: "40", src: "/assets/newLogos/talabatlogo-freelogovectors.net_.png", alt: "Talabat" },
                { id: "41", src: "/assets/newLogos/terre-des-hommes-logo.png", alt: "Terre des Hommes" },
                { id: "42", src: "/assets/newLogos/tiktok-6338432_1280.png", alt: "TikTok" },
                { id: "43", src: "/assets/newLogos/undp-logo.png.webp", alt: "UNDP" },
                { id: "44", src: "/assets/newLogos/wujud.png", alt: "Wujud" },
                { id: "45", src: "/assets/newLogos/المجلس القومي للمرأة.jpg", alt: "المجلس القومي للمرأة" },
                { id: "46", src: "/assets/newLogos/جمهورية مصر العربية - وزارة البيئة.png", alt: "وزارة البيئة" },
                { id: "47", src: "/assets/newLogos/مركز الشباب العربي.png", alt: "مركز الشباب العربي" },
                { id: "48", src: "/assets/newLogos/وزارة التخطيط والتنمية الاقتصادية.jpg", alt: "وزارة التخطيط والتنمية الاقتصادية" },
                { id: "49", src: "/assets/newLogos/وزارة التضامن الاجتماعي.jpg", alt: "وزارة التضامن الاجتماعي" },
                { id: "50", src: "/assets/newLogos/وزارة الشباب والرياضة جمهورية مصر العربية.webp", alt: "وزارة الشباب والرياضة" },
                { id: "51", src: "/assets/newLogos/وزارة الهجرة وشئون المصريين بالخارج.jpg", alt: "وزارة الهجرة" },
              ].map((logo, index) => (
                <div
                  key={`row2-${logo.id}-${index}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-24 w-44 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-105 shrink-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="176px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="my-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className={`text-2xl md:text-3xl font-bold ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              } text-carbon mb-6`}
            >
              {t("becomePartner")}
            </h3>
            <p
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="mb-8 max-w-2xl mx-auto text-center text-gray-600"
            >
              {t("becomePartnerDescription")}
            </p>
            <a href={`/${locale}/contact/partner`} className="inline-block">
              <button className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                {t("becomePartnerButton")}
              </button>
            </a>
          </motion.div>
        </section>

        {/* Become a Partner Section */}
      </section>
    </div>
  );
}
