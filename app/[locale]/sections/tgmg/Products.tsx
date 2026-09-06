"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  GraduationCap,
  Video,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  Bookmark,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Calendar,
  Award,
  Clock,
  Briefcase,
  MapPin,
  TrendingUp,
  Instagram,
} from "lucide-react";

export function Products() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const products = [
    {
      id: "news",
      icon: Newspaper,
      badge: isRTL ? "محتوى رقمي وتغطيات" : "Social-First Content",
      badgeColor: "bg-pink-500/10 text-pink-700 border-pink-400/30 font-bold",
      accentColor: "from-yellow-400 via-pink-500 to-hot-pink text-white",
      tabGradient: "from-yellow-400 via-pink-500 to-hot-pink",
      bulletColor: "text-pink-500",
      ctaClass: "bg-hot-pink hover:bg-pink-600 text-white font-bold shadow-md shadow-pink-500/25",
      title: isRTL ? "الأخبار والقصص" : "News & Features",
      tagline: isRTL
        ? "محتوى جديد وسريع، ومصمم للمشاركة.. محتوى الشباب فعلًا يحبوا يشوفوه"
        : "Fresh, fast, and made to be shared — content youth actually want to watch.",
      points: isRTL
        ? [
          "أشكال محتوى أصلية: Reels، Carousels، أخبار سريعة، مقالات، وStories",
          "إنتاج متكامل: كتابة السكريبت، التصوير، المونتاج، وكتابة المحتوى بالعربي والإنجليزي",
          "حملات مخصصة: للجهات الحكومية، والمنظمات غير الربحية، والعلامات التجارية الاستهلاكية",
          "توزيع على منصات متعددة: Instagram، TikTok، YouTube، Facebook، الموقع الإلكتروني، والنشرة البريدية",
          "مدعوم بأتمتة الذكاء الاصطناعي: لردود أسرع وأذكى على الرسائل والتعليقات",
        ]
        : [
          "Original formats: Reels, Carousels, Quick News, Articles, Stories",
          "End-to-end production: scripting, filming, editing, and bilingual (Arabic/English) copywriting",
          "Custom campaigns for public sector entities, nonprofits, and consumer brands",
          "Multi-platform distribution: Instagram, TikTok, YouTube, Facebook, Website & Newsletter",
          "Powered by AI automation for faster, smarter replies to DMs and comments",
        ],
      reels: [
        {
          id: "DaH0t0HCmjC",
          title: isRTL ? "منير — رسالة أمل وابتسامة لبداية الأسبوع" : "Mounir — Weekly Hope & Smiles",
          partner: isRTL ? "منير" : "Mounir",
          views: "410K+",
          thumbnail: "/products/mounir.png",
          url: "https://www.instagram.com/p/DaH0t0HCmjC/",
          badge: isRTL ? "سلسلة أسبوعية" : "Sunday Series",
        },
        {
          id: "DZKmnYGijem",
          title: isRTL ? "The Good Project — دعم مشاريع التخرج" : "The Good Project — Graduation Projects",
          partner: "Good Project",
          views: "320K+",
          thumbnail: "/products/TGP.png",
          url: "https://www.instagram.com/p/DZKmnYGijem/",
          badge: isRTL ? "دعم الابتكار" : "Youth Projects",
        },
        {
          id: "DZft2r_CgbS",
          title: isRTL ? "Features — قصص ملهمة من الوطن العربي" : "Features — Inspiring Arab Stories",
          partner: "Features",
          views: "350K+",
          thumbnail: "/products/hosam.png",
          url: "https://www.instagram.com/p/DZft2r_CgbS/",
          badge: isRTL ? "قصة ملهمة" : "Feature Story",
        },
      ],
      ctaText: isRTL ? "استكشف محتوى المنصة" : "Explore TGN Content",
      ctaLink: `/${locale}/the-good-news`,
    },
    {
      id: "forsa",
      icon: GraduationCap,
      badge: isRTL ? "فرص وتطوير" : "Youth Opportunities",
      badgeColor: "bg-yellow-400/25 text-black border-yellow-500/50 font-black",
      accentColor: "from-yellow-400 to-amber-500 text-black",
      tabGradient: "from-yellow-400 to-amber-500",
      bulletColor: "text-amber-500",
      ctaClass: "bg-yellow-400 hover:bg-yellow-300 text-black font-black border border-yellow-500 shadow-md",
      title: isRTL ? "فرصة حلوة" : "Forsa Helwa",

      tagline: isRTL
        ? "بنوصّل الشباب العربي بالفرص اللي تساعدهم يحققوا أهدافهم ويتطوروا."
        : "Connecting Arab youth to the opportunities that move them forward.",
      description: isRTL
        ? "سلسلة مخصصة بتسلّط الضوء على فرص مختلفة، من الوظائف والمنح الدراسية، للمنح التمويلية والمسابقات والزمالات، وحققت إجمالي وصول لأكتر من مليون شخص، بالإضافة لأكتر من 70 فرصة تدريب بالتعاون مع شركات ومؤسسات."
        : "A dedicated series highlighting opportunities—from jobs and scholarships to grants, competitions, and fellowships with 1M+ in total reach, and 70+ internship listings through companies and organizations.",
      media: "/products/forsaHelwa.png",
      postUrl: "https://www.instagram.com/p/DaGG18gCj8O/",
      stats: [
        { label: isRTL ? "إجمالي الوصول" : "Total Reach", value: "1M+" },
        { label: isRTL ? "فرص تدريب ووظائف" : "Opportunity Listings", value: "70+" },
        { label: isRTL ? "معدل تفاعل وتطبيق" : "Youth Engaged", value: "100%" },
      ],
      points: isRTL
        ? [
          "تغطية شاملة للمنح الدراسية، برامج التدريب الداخلي، والمسابقات الإقليمية",
          "ربط مباشر بين الشركات والمواهب الشابة الصاعدة",
          "سلاسل منشورات تعليمية لكيفية التقديم وبناء السيرة الذاتية",
        ]
        : [
          "Comprehensive coverage of scholarships, fellowships & internships",
          "Direct bridge connecting partner companies with rising youth talent",
          "Actionable application guides and resume masterclass content",
        ],
      ctaText: isRTL ? "اعرف أكتر" : "Learn More",
      ctaLink: `/${locale}/the-good-news/forsa-helwa`,
    },
    {
      id: "media",
      icon: Video,
      badge: isRTL ? "تغطية وإنتاج ميداني" : "On-Ground & Live Coverage",
      badgeColor: "bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-500/15 text-pink-700 border-pink-400/30 font-bold",
      accentColor: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white",
      tabGradient: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
      bulletColor: "text-pink-500",
      ctaClass: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-black shadow-md shadow-pink-500/20",
      title: isRTL ? "إنتاج المحتوى" : "MEDIA PRODUCTION",
      tagline: isRTL
        ? "بننقل اللحظات المهمة من قلب الحدث، لايف ومن أرض الواقع."
        : "Capturing the moments that matter, live and in the room.",
      points: isRTL
        ? [
          "تغطية ميدانية: للقمم والفعاليات والحملات والإطلاقات",
          "فريق إنتاج داخلي: بيقدّم تغطيات مباشرة، ومقابلات، وقصص بتعتمد على الأشخاص وتجاربهم",
          "ثقة مؤسسات رائدة: من بينها Schneider وRiseUp وiSpark، لتنفيذ محتوى يعزز حضورها ويحقق تأثير أكبر",
        ]
        : [
          "On-the-ground coverage of summits, campaigns, and launches",
          "In-house production team delivering live features, interviews, and human-led storytelling",
          "Trusted by leading institutions — including Schneider, RiseUp, and iSpark — to drive visibility and impact",
        ],
      reels: [
        {
          id: "DUkyiCwjP6a",
          title: isRTL ? "تجربة Budzegypt" : "Budzegypt Experience",
          partner: "Budzegypt",
          views: "200K+",
          thumbnail: "/products/budzzEg.png",
          url: "https://www.instagram.com/reels/DUkyiCwjP6a/",
          badge: isRTL ? "حملة مؤسسية" : "Brand Campaign",
        },
        {
          id: "DNQU6lTNidI",
          title: isRTL ? "تجربة Socks" : "Socks Experience",
          partner: "Socks",
          views: "300K+",
          thumbnail: "/ourGoodNews/socks.png",
          url: "https://www.instagram.com/reels/DNQU6lTNidI/",
          badge: isRTL ? "حملة مؤسسية" : "Brand Campaign",
        },
      ],
      ctaText: isRTL ? "تواصل لطلب إنتاج" : "Request Production",
      ctaLink: `#contact`,
    },
    {
      id: "edu",
      icon: Users,
      badge: isRTL ? "التعليم والمجتمع" : "Education & Community",
      badgeColor: "bg-[#8A1C2E]/15 text-[#6E1321] border-[#8A1C2E]/30 font-extrabold",
      accentColor: "from-[#8A1C2E] to-[#4A0A13] text-white",
      tabGradient: "from-[#8A1C2E] to-[#4A0A13]",
      bulletColor: "text-[#8A1C2E]",
      ctaClass: "bg-[#6E1321] hover:bg-[#8A1C2E] text-white font-bold shadow-md shadow-[#6E1321]/30",
      tabTitle: isRTL ? "التعليم والمجتمع" : "Education & Community",
      title: "The Good Space",
      tagline: isRTL
        ? "بنطوّر مهارات الشباب في المنطقة ونشجّعهم على اتخاذ خطوات فعلية."
        : "Building skills and sparking action across the region's youth.",
      points: isRTL
        ? [
          "ورش عمل: عن صناعة القصص، وصناعة المحتوى، والمواطنة الرقمية",
          "تدريبات: للشباب، والمنظمات غير الحكومية، وصنّاع المحتوى في منطقة الشرق الأوسط وشمال أفريقيا",
          "حملات تفاعلية: تشجّع على المشاركة والتفاعل، مش بس تقديم المعلومات",
        ]
        : [
          "Workshops on storytelling, content creation, and digital citizenship",
          "Trainings for youth, NGOs, and creators across the MENA region",
          "Activation campaigns that engage — not just inform",
        ],
      stats: [
        { label: isRTL ? "ورش عمل وتدريبات" : "Workshops Held", value: "35+" },
        { label: isRTL ? "مشارك وصانع محتوى" : "Youth Trained", value: "1,500+" },
        { label: isRTL ? "دول في المنطقة" : "MENA Reach", value: "8+" },
      ],
      media: "/products/tgs.png",
      ctaText: isRTL ? "اعرف أكتر" : "Learn More",
      ctaLink: `/${locale}/the-good-space`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [forsaSlide, setForsaSlide] = useState(0);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Autoplay timer effect - rock solid, no race conditions
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, activeIndex, products.length]);

  const handleSelectSlide = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const currentProduct = products[activeIndex];
  const Icon = currentProduct.icon;

  return (
    <section
      id="products"
      className="py-24 bg-gradient-to-b from-white via-cream/30 to-white relative overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-hot-pink/5 via-amber-500/5 to-purple-500/5 blur-3xl -z-0 pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl -z-0 pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div dir={isRTL ? "rtl" : "ltr"} className="max-w-6xl mx-auto space-y-3 md:space-y-6">

          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cream border border-gray-200 text-gray-800 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-hot-pink" />
              {isRTL ? "إيه اللي بنقدّمه (محاور المحتوى)" : "What We Create "}
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight ${isRTL ? "font-arabic-header" : "font-english-header"
                }`}
            >
              {isRTL ? "محاور المحتوى والمنتجات الإبداعية" : "Our Products & Content Pillars"}
            </h2>
            <p
              className={`text-lg sm:text-xl text-gray-600 font-medium leading-relaxed ${isRTL ? "font-arabic-body" : "font-english-body"
                }`}
            >
              {isRTL
                ? "بنطوّر محتوى مصمم لمنصات التواصل الاجتماعي، يناسب جمهور النهارده ويواكب احتياجات العلامات التجارية في المستقبل."
                : "We develop social-first content designed for today's audiences and tomorrow's brands."}
            </p>
          </div>

          {/* Carousel Tabs Selector (Compact & Sleek) */}
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100/90 p-1.5 rounded-xl border border-gray-200/80 backdrop-blur-sm shadow-inner">
            {products.map((p, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative flex items-center justify-center px-3 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 text-center ${isActive
                    ? "bg-white text-gray-950 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                >
                  <span className="truncate">{p.tabTitle || p.title}</span>

                  {/* Active bottom bar matching tab theme */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className={`absolute -bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r ${p.tabGradient} rounded-full`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Slide Carousel Stage with Side Navigations */}
          <div className="relative group/carousel mt-0">
            {/* Left Navigation Button */}
            <button
              onClick={isRTL ? handleNext : handlePrev}
              className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-gray-800 hover:text-gray-950 shadow-lg hover:shadow-xl border border-gray-200/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label={isRTL ? "الشريحة التالية" : "Previous slide"}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-transform duration-200 group-hover/carousel:-translate-x-0.5" />
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={isRTL ? handlePrev : handleNext}
              className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-gray-800 hover:text-gray-950 shadow-lg hover:shadow-xl border border-gray-200/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label={isRTL ? "الشريحة السابقة" : "Next slide"}
            >
              <ChevronRight className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-transform duration-200 group-hover/carousel:translate-x-0.5" />
            </button>

            <div
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
              className="relative min-h-[560px] bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200/90 shadow-xl overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Left Column: Product Information */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br ${currentProduct.accentColor}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-xs font-bold px-3.5 py-1 rounded-full border ${currentProduct.badgeColor}`}
                      >
                        {currentProduct.badge}
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight ${isRTL ? "font-arabic-header" : "font-english-header"
                          }`}
                      >
                        {currentProduct.title}
                      </h3>
                      <p
                        className={`text-base sm:text-lg font-semibold text-gray-700 leading-relaxed ${isRTL ? "font-arabic-body" : "font-english-body"
                          }`}
                      >
                        {currentProduct.tagline}
                      </p>
                      {currentProduct.description && (
                        <p
                          className={`text-sm text-gray-600 mt-2 leading-relaxed ${isRTL ? "font-arabic-body" : "font-english-body"
                            }`}
                        >
                          {currentProduct.description}
                        </p>
                      )}
                    </div>

                    {/* Highlight Stats if present */}
                    {currentProduct.stats && (
                      <div className="grid grid-cols-3 gap-3 py-2">
                        {currentProduct.stats.map((st, sidx) => (
                          <div
                            key={sidx}
                            className="bg-gray-50/80 border border-gray-100 rounded-2xl p-3 text-center"
                          >
                            <div className="text-xl font-black text-gray-900">{st.value}</div>
                            <div className="text-[11px] font-bold text-gray-500 mt-0.5 leading-tight">
                              {st.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bullet points */}
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      {currentProduct.points.map((pt, pidx) => (
                        <div key={pidx} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${currentProduct.bulletColor}`} />
                          <span
                            className={`leading-snug ${isRTL ? "font-arabic-body" : "font-english-body"
                              }`}
                          >
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Action */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href={currentProduct.ctaLink}
                        target={currentProduct.ctaLink.startsWith("#") ? undefined : "_blank"}
                        rel={currentProduct.ctaLink.startsWith("#") ? undefined : "noopener noreferrer"}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 group ${currentProduct.ctaClass}`}
                      >
                        <span>{currentProduct.ctaText}</span>
                        <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Custom Themed Media Mockups */}
                  <div className="lg:col-span-6 w-full">
                    {/* SLIDE 1: News & Features (Light Theme - 3 Instagram Highlights) */}
                    {currentProduct.id === "news" && (
                      <div className="bg-gradient-to-br from-purple-50/70 via-white to-pink-50/70 text-gray-900 rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-pink-200 space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-pink-100">
                          <div className="flex items-center gap-2">
                            <Instagram className="w-4 h-4 text-pink-600" />
                            <span className="text-xs font-black text-gray-900 uppercase tracking-wider">
                              {isRTL ? "نماذج المحتوى على إنستغرام" : "Instagram Highlights"}
                            </span>
                          </div>

                        </div>

                        {/* 3 Reel Cards with Instagram links & Thumbnails */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentProduct.reels?.map((reel, ridx) => (
                            <a
                              key={ridx}
                              href={reel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative bg-white hover:bg-gradient-to-br hover:from-purple-50/40 hover:to-pink-50/40 border border-pink-100 hover:border-pink-300 rounded-2xl overflow-hidden p-3 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md"
                            >
                              {/* Reel Thumbnail Container */}
                              <div className="relative h-40 w-full rounded-xl overflow-hidden bg-gray-900 shadow-inner group/thumb">
                                {reel.thumbnail && (
                                  <Image
                                    src={reel.thumbnail}
                                    alt={reel.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 200px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                )}
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />

                                {/* Top Bar on Image */}
                                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] text-white shadow">
                                    {reel.partner}
                                  </span>
                                  <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:text-pink-300 transition-colors">
                                    <ExternalLink className="w-3 h-3" />
                                  </div>
                                </div>

                                {/* Center Play Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                  <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-white text-[#fd1d1d] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-4 h-4 fill-[#fd1d1d] ml-0.5" />
                                  </div>
                                </div>

                                {/* Views Counter on Thumbnail Bottom */}
                                <div className="absolute bottom-2.5 left-2.5 z-10">
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                                    <Eye className="w-3 h-3 text-pink-400" /> {reel.views}
                                  </span>
                                </div>
                              </div>

                              {/* Details Below Thumbnail */}
                              <div className="space-y-1.5 px-0.5">
                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#833ab4] transition-colors line-clamp-2 leading-snug">
                                  {reel.title}
                                </h4>
                                <div className="flex items-center justify-between pt-1 border-t border-pink-100 text-[11px]">
                                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] font-black group-hover:underline flex items-center gap-1">
                                    {isRTL ? "شاهد على إنستغرام ↗" : "Watch on IG ↗"}
                                  </span>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* Partner Trust Badges */}
                        <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs text-gray-600">
                          <span className="text-[11px] font-bold text-pink-700 uppercase">
                            {isRTL ? "سلاسل أصلية:" : "Original Pillars:"}
                          </span>
                          <div className="flex items-center gap-2 text-gray-800 font-bold text-xs">
                            <span>Mounir</span>
                            <span>•</span>
                            <span>Good Project</span>
                            <span>•</span>
                            <span>Features</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SLIDE 2: Forsa Helwa (Light Theme & Instagram Carousel) */}
                    {currentProduct.id === "forsa" && (
                      <div className="bg-gradient-to-br from-amber-50/60 via-white to-yellow-50/60 text-gray-900 rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-yellow-200 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-yellow-100">
                          <div className="flex items-center gap-2">
                            <Instagram className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-black text-gray-900 uppercase tracking-wider">
                              {isRTL ? "سلسلة فرصة حلوة على إنستغرام" : "Instagram Carousel • فرصة حلوة"}
                            </span>
                          </div>
                          <span className="text-[11px] font-black bg-yellow-400 text-black px-2.5 py-0.5 rounded-full shadow-xs">
                            {isRTL ? "فرص نشطة" : "Active Listings"}
                          </span>
                        </div>

                        {/* Featured Media Image / Instagram Carousel Banner */}
                        {currentProduct.media && (
                          <a
                            href={currentProduct.postUrl || currentProduct.ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-yellow-200 shadow-md group block cursor-pointer"
                          >
                            <Image
                              src={currentProduct.media}
                              alt={currentProduct.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 500px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

                            {/* Top Bar Badge on Image */}
                            <div className="absolute top-2.5 inset-x-3 flex items-center justify-between z-10">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-yellow-400 text-black shadow">
                                {isRTL ? "منشور إنستغرام" : "Instagram Carousel"}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:text-yellow-300 transition-colors">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </div>
                            </div>

                            {/* Bottom info on Image */}
                            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between z-10">
                              <span className="text-[11px] font-bold text-yellow-300 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-yellow-400/20">
                                <Sparkles className="w-3 h-3 text-yellow-400" />
                                {isRTL ? "شاهد المنشور على إنستغرام ↗" : "View on Instagram ↗"}
                              </span>
                              <span className="text-[10px] font-black text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                                @thegoodnews
                              </span>
                            </div>
                          </a>
                        )}

                        {/* Interactive Opportunity Card */}
                        <a
                          href={currentProduct.postUrl || currentProduct.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group/forsa bg-white hover:bg-yellow-50/40 transition-all duration-300 border border-yellow-200 hover:border-yellow-400/80 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm hover:shadow-md cursor-pointer text-gray-900"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-yellow-400 text-black uppercase">
                                {forsaSlide === 0
                                  ? isRTL ? "تدريب صيفي" : "Summer Internship"
                                  : isRTL ? "منحة دراسية" : "Fellowship Grant"}
                              </span>
                              <h4
                                className={`text-base sm:text-lg font-black text-gray-900 mt-1.5 group-hover/forsa:text-amber-800 transition-colors leading-snug ${isRTL ? "font-arabic-header" : "font-english-header"
                                  }`}
                              >
                                {forsaSlide === 0
                                  ? (isRTL ? "برنامج تدريب صناع المحتوى والإعلام الرقمي" : "Digital Content & Creative Media Internship Batch")
                                  : (isRTL ? "منحة تمويلية للمشاريع الشبابية الريادية 2025" : "MENA Youth Innovation & Impact Grant Program")}
                              </h4>
                            </div>
                            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                            <div className="flex items-center gap-1.5 bg-yellow-50/80 px-2.5 py-1.5 rounded-lg border border-yellow-200/80">
                              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                              <span className="font-medium">{isRTL ? "دوام جزئي / عن بُعد" : "Hybrid / Remote"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-yellow-50/80 px-2.5 py-1.5 rounded-lg border border-yellow-200/80">
                              <MapPin className="w-3.5 h-3.5 text-amber-600" />
                              <span className="font-medium">{isRTL ? "مصر والشرق الأوسط" : "MENA Region"}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-yellow-100">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setForsaSlide(0);
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${forsaSlide === 0 ? "bg-yellow-400 w-6" : "bg-gray-200 hover:bg-gray-300"
                                  }`}
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setForsaSlide(1);
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${forsaSlide === 1 ? "bg-yellow-400 w-6" : "bg-gray-200 hover:bg-gray-300"
                                  }`}
                              />
                            </div>

                            <span className="text-xs font-bold text-yellow-700 group-hover/forsa:text-yellow-800 flex items-center gap-1">
                              {isRTL ? "شاهد الفرصة كاملة" : "View Listing"} →
                            </span>
                          </div>
                        </a>

                        {/* Reach Badge footer */}
                        <div className="flex items-center justify-between text-xs text-gray-600 px-1 pt-0.5 border-t border-yellow-100/80">
                          <span className="flex items-center gap-1 text-amber-700 font-bold">
                            <TrendingUp className="w-3.5 h-3.5" />
                            1M+ Total Reach
                          </span>
                          <span className="text-gray-800 font-bold">70+ Partner Companies</span>
                        </div>
                      </div>
                    )}

                    {/* SLIDE 3: Media Production (Instagram Gradient Colors - Light Theme) */}
                    {currentProduct.id === "media" && (
                      <div className="bg-gradient-to-br from-purple-50/70 via-white to-pink-50/70 text-gray-900 rounded-3xl p-6 shadow-xl border-2 border-pink-200 space-y-4">
                        {/* Viewfinder Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-pink-100">
                          {/* <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                          <span className="text-xs font-black text-red-600 uppercase tracking-widest">
                            LIVE REC • 4K 60FPS
                          </span>
                        </div> */}
                          <span className="text-[11px] font-black bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-3 py-0.5 rounded-full shadow-sm">
                            Instagram Production
                          </span>
                        </div>

                        {/* 2 Reel Cards with Instagram links & Thumbnails */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {currentProduct.reels?.map((reel, ridx) => (
                            <a
                              key={ridx}
                              href={reel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative bg-white hover:bg-gradient-to-br hover:from-purple-50/40 hover:to-pink-50/40 border border-pink-100 hover:border-pink-300 rounded-2xl overflow-hidden p-3 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md"
                            >
                              {/* Reel Thumbnail Container */}
                              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-gray-900 shadow-inner group/thumb">
                                {reel.thumbnail && (
                                  <Image
                                    src={reel.thumbnail}
                                    alt={reel.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 250px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                )}
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />

                                {/* Top Bar on Image */}
                                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] text-white shadow">
                                    {reel.partner}
                                  </span>
                                  <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:text-pink-300 transition-colors">
                                    <ExternalLink className="w-3 h-3" />
                                  </div>
                                </div>

                                {/* Center Play Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                  <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-white text-[#fd1d1d] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-5 h-5 fill-[#fd1d1d] ml-0.5" />
                                  </div>
                                </div>

                                {/* Views Counter on Thumbnail Bottom */}
                                <div className="absolute bottom-2.5 left-2.5 z-10">
                                  <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                                    <Eye className="w-3 h-3 text-pink-400" /> {reel.views}
                                  </span>
                                </div>
                              </div>

                              {/* Details Below Thumbnail */}
                              <div className="space-y-1.5 px-0.5">
                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#833ab4] transition-colors line-clamp-2 leading-snug">
                                  {reel.title}
                                </h4>
                                <div className="flex items-center justify-between pt-1 border-t border-pink-100 text-[11px]">
                                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] font-black group-hover:underline flex items-center gap-1">
                                    {isRTL ? "شاهد على إنستغرام ↗" : "Watch on IG ↗"}
                                  </span>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* Partner Trust Badges */}
                        <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs text-gray-600">
                          <span className="text-[11px] font-bold text-pink-700 uppercase">
                            {isRTL ? "شركاء موثوقون:" : "Trusted By:"}
                          </span>
                          <div className="flex items-center gap-3 text-gray-800 font-bold text-xs">
                            <span>Schneider</span>
                            <span>•</span>
                            <span>RiseUp</span>
                            <span>•</span>
                            <span>iSpark</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SLIDE 4: Education & Community / The Good Space (Burgundy Theme) */}
                    {currentProduct.id === "edu" && (
                      <div className="bg-gradient-to-br from-[#3D070E] via-[#240408] to-black text-white rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-[#8A1C2E]/40 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#8A1C2E]/30">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#FF9EAE]" />
                            <span className="text-xs font-black text-[#FFD1D8] uppercase tracking-wider">
                              The Good Space • Youth Lab
                            </span>
                          </div>
                          <span className="text-xs bg-[#8A1C2E]/40 text-[#FFD1D8] px-2.5 py-0.5 rounded-full border border-[#8A1C2E]/60 font-bold">
                            {isRTL ? "تدريب وتطوير" : "Masterclasses & Labs"}
                          </span>
                        </div>

                        {/* Featured Media Image */}
                        {currentProduct.media && (
                          <div className="relative h-40 sm:h-48 w-full rounded-2xl overflow-hidden border border-[#8A1C2E]/40 shadow-inner group">
                            <Image
                              src={currentProduct.media}
                              alt={currentProduct.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 500px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between z-10">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#8A1C2E]/90 text-white backdrop-blur-md border border-[#FF9EAE]/30">
                                {isRTL ? "مساحة التعلم والتمكين" : "Youth Learning & Impact Space"}
                              </span>
                              <span className="text-[10px] font-bold text-[#FFD1D8] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                                TGS Community
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Workshop Session Cards */}
                        <a
                          href={currentProduct.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group/edu bg-[#540D17]/40 hover:bg-[#540D17]/70 transition-all duration-300 border border-[#8A1C2E]/40 hover:border-[#8A1C2E]/70 rounded-2xl p-4 space-y-2.5 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#8A1C2E] text-white uppercase">
                              {isRTL ? "ورشة عمل قادمة" : "Upcoming Workshop"}
                            </span>
                            <span className="text-xs text-[#FFD1D8] flex items-center gap-1 font-bold">
                              <Calendar className="w-3.5 h-3.5" /> 2025 Cohort
                            </span>
                          </div>

                          <h4
                            className={`text-sm sm:text-base font-black text-white group-hover/edu:text-[#FFD1D8] transition-colors leading-snug ${isRTL ? "font-arabic-header" : "font-english-header"
                              }`}
                          >
                            {isRTL
                              ? "مختبر صناعة المحتوى والسرد القصصي للشباب وصناع التغيير"
                              : "Storytelling, Creative Production & Digital Citizenship Masterclass"}
                          </h4>

                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            <span className="text-[10px] sm:text-[11px] bg-[#6E1321]/60 px-2 py-0.5 rounded-md text-[#FFE6EB] border border-[#8A1C2E]/30 font-medium">
                              Storytelling
                            </span>
                            <span className="text-[10px] sm:text-[11px] bg-[#6E1321]/60 px-2 py-0.5 rounded-md text-[#FFE6EB] border border-[#8A1C2E]/30 font-medium">
                              Content Creation
                            </span>
                            <span className="text-[10px] sm:text-[11px] bg-[#6E1321]/60 px-2 py-0.5 rounded-md text-[#FFE6EB] border border-[#8A1C2E]/30 font-medium">
                              Digital Citizenship
                            </span>
                          </div>
                        </a>

                        {/* Impact metrics footer */}
                        <div className="flex items-center justify-between text-xs text-gray-300 px-1 pt-1 border-t border-[#8A1C2E]/20">
                          <span className="flex items-center gap-1 text-[#FF9EAE] font-bold">
                            <Award className="w-3.5 h-3.5" />
                            1,500+ Participants
                          </span>
                          <span className="text-[#FFD1D8]">MENA Wide Community</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Slide Indicator Pills */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleSelectSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                  ? `w-8 bg-gradient-to-r ${currentProduct.tabGradient} shadow-sm`
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


