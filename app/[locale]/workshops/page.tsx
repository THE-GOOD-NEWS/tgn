"use client";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Newsletter from "../sections/Newsletter";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

  interface Workshop {
    _id: string;
    title: string;
    slug: string;
    briefy: string;
    price: number;
    startDate: string;
    endDate: string;
    images?: string[];
    availableSessions?: any[];
    instructors: string[];
    slots: number;
    attendance: any[];
    location?: {
      altText: string;
      link: string;
      moreDescription?: string;
    };
  }
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const res = await fetch("/api/workshops");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setWorkshops(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch workshops", err);
      }
    }
    fetchWorkshops();
  }, []);

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
      {/* Available Workshops Section (English Only) */}
      { workshops.length > 0 && (
        <section className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.15 }}
            className="text-center mb-10"
          >
            <div className={`text-3xl md:text-4xl font-bold font-english-heading text-carbon`}>
              Available Workshops
            </div>
          </motion.div>
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 flex">
              {workshops.map((ws) => {
                const isAvailable = ws.slots > (ws.attendance?.length || 0);
                return (
                <CarouselItem key={ws._id} className="basis-[85%] pl-4 md:basis-1/2 lg:basis-1/3">
               <Link key={ws._id} href={`/en/workshops/${ws.slug}`} className="block group">
                <article className="h-[400px] md:h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-1 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
                    {/* Left: Image */}
                    <div className="relative bg-[#F7EEDB] min-h-[200px] md:min-h-full">
                      {ws.images && ws.images.length > 0 ? (
                        <>
                          <Image
                            src={ws.images[0]}
                            alt={ws.title}
                            fill
                            className="object-cover md:object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {ws.images[1] && (
                            <Image
                              src={ws.images[1]}
                              alt={`${ws.title} - hover`}
                              fill
                              className="object-cover md:object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full min-h-[220px] md:min-h-[200px] bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
                          <span className="text-5xl text-white/80">🎨</span>
                        </div>
                      )}
                      {/* Soft divider */}
                      <div className="absolute inset-y-0 right-0 w-1 bg-white/60" />
                      
                      {/* Availability Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                          isAvailable ? "bg-green-500 text-white" : "bg-orange-500 text-white"
                        }`}>
                          {isAvailable ? "Available" : "Waitlist"}
                        </span>
                      </div>
                    </div>
          
                    {/* Right: Details */}
                    <div className="relative bg-white max-md:py-2 px-4  flex flex-col justify-between">
                      <div className="flex-1">
                        <h3 className="max-md:mt-1 mt-3 text-lg md:text-xl font-extrabold leading-tight tracking-tight h-6 md:h-10 overflow-hidden font-english-heading text-left">
                          {ws.title}
                        </h3>
                        <div className="flex flex-col  gap-1 md:gap-3 text-xs text-gray-500">
                          <time className="font-medium">
                            {new Date(ws.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            {ws.endDate && new Date(ws.startDate).toDateString() !== new Date(ws.endDate).toDateString() && ` - ${new Date(ws.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                          </time>
                          {/* <span className="w-px h-3 bg-gray-300" /> */}
                        <p className="text-xs md:text-sm line-clamp-3 md:line-clamp-5 leading-relaxed font-english text-left  text-purple-600">
                          {ws.briefy}
                        </p>
                        {ws.instructors && ws.instructors.length > 0 && (
                          <div className="mt-1 flex items-center gap-1.5">
                            <span className="text-[10px] text-gray-400 font-medium">With</span>
                            <span className="text-xs font-bold text-carbon">{ws.instructors.join(" & ")}</span>
                          </div>
                        )}
                          <p className="text-[10px] md:text-xs  rounded">
                            {ws.availableSessions?.length || 0} {ws.availableSessions?.length === 1 ? "Session" : "Sessions"}
                          </p>
                        </div>
                        {/* <div className="flex items-center gap-1 md:gap-3 text-xs text-gray-500">

                        </div>   */}
                      </div>
                    </div>
                  </div>
          
                  {/* Bottom CTA section */}
                  <div className="bg-gray-50 border-t border-gray-100 px-2 md:px-6 md:py-4 py-2 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/logos/TGN_LOGOS_PNG-03.png"
                        alt="TGN"
                        width={64}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                      <span className="text-sm font-semibold">View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                  </article>
                </Link>
              </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-white hover:bg-hot-pink transition hover:text-white" />
            <CarouselNext className="hidden md:flex bg-white hover:bg-hot-pink transition hover:text-white" />
          </Carousel>
        </section>
      )}
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
