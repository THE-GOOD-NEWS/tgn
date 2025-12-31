"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import TikTokEmbed from "@/components/tiktok-embed";

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
        <div className="relative h-96 w-full  rounded-md overflow-hidden">
          <Image
            src={media.src}
            alt={media.caption || "Case study image"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : media.type === "youtube" ? (
        <div className="relative h-64 w-full rounded-md overflow-hidden">
          <iframe
            src={getEmbedUrl(media)}
            title={media.caption || "YouTube video"}
            className="absolute w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      ) : media.type === "tiktok" ? (
        <TikTokEmbed url={media.src} caption={media.caption} />
      ) : media.type === "instagram" ? (
        <div className="relative w-full max-w-sm mx-auto aspect-[9/16] rounded-md overflow-hidden">
          <iframe
            src={getEmbedUrl(media)}
            title={media.caption || "Instagram post"}
            className="absolute w-full h-full"
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

        {categories.map((category) => (
          <section key={category.id} className="mb-16">
            <motion.div
              initial={{ opacity: 0, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <span className="inline-block text-hot-pink font-bold tracking-wide text-2xl md:text-3xl">
                {category.title}
              </span>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              {category.logos.map((logo) => (
                <motion.div key={logo.id} variants={item}>
                  <PartnerLogo src={logo.src} alt={logo.alt} link={logo.link} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
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
        <h2 className="text-4xl md:text-5xl font-bold text-hot-pink mb-2">
          {t("caseStudiesTitle")}
        </h2>
        {/* Case Studies Section */}
        <section className="mb-16">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-24 relative"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <div
                className="max-w-6xl mx-auto"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                {/* Title Section */}
                <div
                  className={`flex  w-full justify-between`}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <div className="mb-8 ">
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                      {t(`caseStudies.${study.id}.category`)}
                    </h3>
                    <div className="w-12 h-1 bg-black mb-8"></div>
                  </div>
                  {study.partnerLogo && (
                    <div className=" top-0 right-0 h-20 w-20 md:h-24 md:w-24">
                      <Image
                        src={study.partnerLogo}
                        alt="Partner logo"
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                <div
                  className={`flex flex-col md:flex-row gap-8 items-start`}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <div className="md:w-1/2">
                    <p className="text-base md:text-lg text-gray-800 mb-6">
                      {t(`caseStudies.${study.id}.description`)}
                    </p>

                    {/* Stats for Palm Hills case study */}
                    {study.id === "case2" && study.stats && (
                      <div className="mt-4">
                        <p className="text-lg font-bold">
                          {locale === "en"
                            ? "The campaign's debut video generated over "
                            : "حقق فيديو إطلاق الحملة أكثر من "}
                          <span className="text-hot-pink">
                            {t(`caseStudies.${study.id}.stats.views`)}
                          </span>
                          {locale === "en" ? "," : "،"}
                        </p>
                        <p className="text-lg font-bold">
                          {locale === "en"
                            ? "with the overall metrics reaching an impressive "
                            : "مع وصول المقاييس الإجمالية إلى "}
                          <span className="text-hot-pink">
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
                  <div className="md:w-1/2 flex w-full gap-4">
                    {study.mediaItems &&
                      study.mediaItems.map((media, index) => (
                        <div key={index} className="relative w-full">
                          <MediaRenderer media={media} />
                          {/* {media.caption && (
                            <p className="text-sm text-gray-600 mt-2">
                              {media.caption}
                            </p>
                          )} */}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Partner Logo */}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Become a Partner Section */}
      </section>
    </div>
  );
}
