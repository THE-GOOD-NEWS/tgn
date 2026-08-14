"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
      badgeColor: "bg-yellow-400/20 text-gray-950 border-pink-500/40 font-bold",
      accentColor: "from-yellow-400 via-pink-500 to-black text-white",
      tabGradient: "from-yellow-400 via-pink-500 to-black",
      bulletColor: "text-pink-500",
      ctaClass: "bg-gray-950 hover:bg-hot-pink text-yellow-300 hover:text-white border border-yellow-400/40 shadow-md",
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
          title: isRTL ? "تغطية قمة رايز أب (RiseUp Summit)" : "RiseUp Summit On-Ground Coverage",
          partner: "RiseUp Summit",
          views: "240K+",
          url: "https://www.instagram.com/reels/DUkyiCwjP6a/",
          badge: isRTL ? "تغطية مباشرة" : "Summit Live",
        },
        {
          id: "DNQU6lTNidI",
          title: isRTL ? "تغطية شنايدر إلكتريك (Schneider Electric)" : "Schneider Electric Innovation Launch",
          partner: "Schneider Electric",
          views: "180K+",
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
      badge: isRTL ? "التعليم والمجتمع" : "The Good Space",
      badgeColor: "bg-[#8A1C2E]/15 text-[#6E1321] border-[#8A1C2E]/30 font-extrabold",
      accentColor: "from-[#8A1C2E] to-[#4A0A13] text-white",
      tabGradient: "from-[#8A1C2E] to-[#4A0A13]",
      bulletColor: "text-[#8A1C2E]",
      ctaClass: "bg-[#6E1321] hover:bg-[#8A1C2E] text-white font-bold shadow-md shadow-[#6E1321]/30",
      title: isRTL ? "التعليم والمجتمع (The Good Space)" : "EDUCATION & COMMUNITY (THE GOOD SPACE)",
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
      ctaText: isRTL ? "اعرف أكتر" : "Learn More",
      ctaLink: `/${locale}/the-good-space`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [newsFormatTab, setNewsFormatTab] = useState<"qn" | "mariam" | "carousel">("qn");
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
              {isRTL ? "إيه اللي بنقدّمه (محاور المحتوى)" : "What We Create (Our Products)"}
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
              const PIcon = p.icon;
              const isActive = activeIndex === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold text-xs transition-all duration-300 text-center ${isActive
                    ? "bg-white text-gray-950 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-transform ${isActive ? "scale-105 shadow-xs" : "opacity-80"
                      } bg-gradient-to-br ${p.accentColor}`}
                  >
                    <PIcon className="w-3 h-3" />
                  </div>
                  <span className="truncate">{p.title}</span>

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

          {/* Main Slide Carousel Stage */}
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
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 group ${currentProduct.ctaClass}`}
                    >
                      <span>{currentProduct.ctaText}</span>
                      <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Custom Themed Media Mockups */}
                <div className="lg:col-span-6 w-full">
                  {/* SLIDE 1: News & Features (Yellow, Black, Pink) */}
                  {currentProduct.id === "news" && (
                    <div className="bg-gradient-to-br from-gray-950 via-black to-[#1c0a15] text-white rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-pink-500/30 space-y-4">
                      {/* Sub-tabs for the 3 requested mockups */}
                      <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                        <span className="text-xs font-black text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-hot-pink" />
                          {isRTL ? "نماذج المحتوى (3 أشكال)" : "Content Formats (3 Styles)"}
                        </span>
                        <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-xl border border-gray-800">
                          <button
                            onClick={() => setNewsFormatTab("qn")}
                            className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${newsFormatTab === "qn"
                              ? "bg-yellow-400 text-black shadow"
                              : "text-gray-400 hover:text-white"
                              }`}
                          >
                            1 QN
                          </button>
                          <button
                            onClick={() => setNewsFormatTab("mariam")}
                            className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${newsFormatTab === "mariam"
                              ? "bg-hot-pink text-white shadow"
                              : "text-gray-400 hover:text-white"
                              }`}
                          >
                            1 Mariam Reel
                          </button>
                          <button
                            onClick={() => setNewsFormatTab("carousel")}
                            className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${newsFormatTab === "carousel"
                              ? "bg-gradient-to-r from-yellow-400 to-hot-pink text-black shadow"
                              : "text-gray-400 hover:text-white"
                              }`}
                          >
                            1 Carousel
                          </button>
                        </div>
                      </div>

                      {/* Mockup 1: QN (Quick News) */}
                      {newsFormatTab === "qn" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-black/70 border border-yellow-400/30 rounded-2xl p-5 space-y-4 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-md bg-yellow-400 text-black text-[11px] font-black uppercase tracking-wider">
                                QUICK NEWS (QN)
                              </span>
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-hot-pink" />
                                {isRTL ? "منذ ساعتين" : "2h ago"}
                              </span>
                            </div>
                            <span className="text-xs text-pink-300 font-bold bg-pink-500/20 px-2 py-0.5 rounded border border-pink-500/30">
                              {isRTL ? "خبر إيجابي" : "Positive News"}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h4
                              className={`text-lg font-black text-white leading-snug ${isRTL ? "font-arabic-header" : "font-english-header"
                                }`}
                            >
                              {isRTL
                                ? "شاب عربي يبتكر منصة ذكاء اصطناعي تفوز بأكبر جائزة إقليمية للاستدامة"
                                : "Young Arab Innovator Wins Regional Sustainability Award for AI Water Tech"}
                            </h4>
                            <p className="text-xs text-gray-300 leading-relaxed">
                              {isRTL
                                ? "تغطية سريعة ومختصرة تسلط الضوء على الإنجاز وأثره على المجتمع في أقل من 40 كلمة."
                                : "Bite-sized, high-impact storytelling crafted specifically for fast social sharing."}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-800 text-xs text-gray-400">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-hot-pink font-bold">
                                <Heart className="w-3.5 h-3.5 fill-hot-pink" /> 12.4K
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3.5 h-3.5" /> 342
                              </span>
                              <span className="flex items-center gap-1 text-yellow-400">
                                <Share2 className="w-3.5 h-3.5" /> 1.8K
                              </span>
                            </div>
                            <span className="text-[11px] font-bold text-yellow-400">
                              @thegoodnews
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Mockup 2: Mariam Reel */}
                      {newsFormatTab === "mariam" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative h-72 bg-gradient-to-t from-black via-gray-950 to-[#220718] border border-pink-500/40 rounded-2xl overflow-hidden p-4 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between z-10">
                            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-400/30">
                              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                              <span className="text-xs font-bold text-yellow-300">REEL • Mariam El-Khatib</span>
                            </div>
                            <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30 font-bold">
                              45.2K Views
                            </span>
                          </div>

                          {/* Center Play Button Graphic */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-hot-pink/20 backdrop-blur-md border-2 border-yellow-400 flex items-center justify-center text-yellow-300 shadow-2xl">
                              <Play className="w-7 h-7 fill-yellow-300 ml-0.5" />
                            </div>
                          </div>

                          {/* Reel Bottom Details */}
                          <div className="z-10 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-pink-500/30 space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold text-white">
                              <span className="text-yellow-400">@thegoodnews • Original Audio</span>
                              <span className="text-hot-pink">#GoodNewsStory</span>
                            </div>
                            <p className="text-xs text-gray-200 line-clamp-2">
                              {isRTL
                                ? "مريم بتقدّم قصة ملهمة عن إزاي أفكار الشباب البسيطة بتتحول لمشاريع بتغيّر الواقع."
                                : "Mariam breaks down how youth-led grassroots projects are shaping tomorrow."}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Mockup 3: Carousel */}
                      {newsFormatTab === "carousel" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-black/70 border border-pink-500/30 rounded-2xl p-5 space-y-4 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-md bg-hot-pink text-[11px] font-black uppercase text-white">
                                CAROUSEL POST
                              </span>
                              <span className="text-xs text-yellow-300 font-bold bg-white/10 px-2 py-0.5 rounded">
                                Slide 1 of 6
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 rounded-full bg-yellow-400" />
                              <span className="w-2 h-2 rounded-full bg-hot-pink" />
                              <span className="w-2 h-2 rounded-full bg-gray-700" />
                              <span className="w-2 h-2 rounded-full bg-gray-700" />
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-yellow-500/10 via-pink-900/30 to-black p-4 rounded-xl border border-yellow-400/30 space-y-2">
                            <span className="text-[11px] font-black text-yellow-400 uppercase tracking-wide">
                              {isRTL ? "دليل شامل للشباب" : "Visual Guide"}
                            </span>
                            <h4
                              className={`text-base font-black text-white ${isRTL ? "font-arabic-header" : "font-english-header"
                                }`}
                            >
                              {isRTL
                                ? "5 مهارات يحتاجها الجيل الجديد في سوق العمل الرقمي 2025"
                                : "5 Digital Storytelling Habits That Built High-Growth Youth Brands"}
                            </h4>
                            <p className="text-xs text-gray-300">
                              {isRTL
                                ? "اسحب لليسار لمعرفة الخطوات العملية والأمثلة الواقعية ←"
                                : "Swipe to explore key takeaways and breakdown →"}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                            <span className="text-yellow-400 font-bold">Save for later</span>
                            <Bookmark className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* SLIDE 2: Forsa Helwa (Yellow, White, Black) */}
                  {currentProduct.id === "forsa" && (
                    <div className="bg-gradient-to-br from-black via-gray-950 to-[#1c1800] text-white rounded-3xl p-6 shadow-2xl border-2 border-yellow-400/40 space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-yellow-400/20">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-ping" />
                          <span className="text-xs font-black text-yellow-400 uppercase tracking-wider">
                            Yalla Success Carousel (فرصة حلوة)
                          </span>
                        </div>
                        <span className="text-xs bg-white/10 text-white px-2.5 py-0.5 rounded-full border border-white/20 font-bold">
                          {isRTL ? "فرص نشطة" : "Active Listings"}
                        </span>
                      </div>

                      {/* Interactive Opportunity Card */}
                      <div className="bg-white/5 border border-yellow-400/30 rounded-2xl p-5 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[11px] font-black px-2.5 py-0.5 rounded bg-yellow-400 text-black uppercase">
                              {forsaSlide === 0
                                ? isRTL ? "تدريب صيفي" : "Summer Internship"
                                : isRTL ? "منحة دراسية" : "Fellowship Grant"}
                            </span>
                            <h4
                              className={`text-lg font-black text-white mt-2 ${isRTL ? "font-arabic-header" : "font-english-header"
                                }`}
                            >
                              {forsaSlide === 0
                                ? (isRTL ? "برنامج تدريب صناع المحتوى والإعلام الرقمي" : "Digital Content & Creative Media Internship Batch")
                                : (isRTL ? "منحة تمويلية للمشاريع الشبابية الريادية 2025" : "MENA Youth Innovation & Impact Grant Program")}
                            </h4>
                          </div>
                          <Bookmark className="w-5 h-5 text-yellow-400 fill-yellow-400 shrink-0" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-200">
                          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/10">
                            <Briefcase className="w-3.5 h-3.5 text-yellow-400" />
                            <span>{isRTL ? "دوام جزئي / عن بُعد" : "Hybrid / Remote"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/10">
                            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                            <span>{isRTL ? "مصر والشرق الأوسط" : "MENA Region"}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setForsaSlide(0)}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${forsaSlide === 0 ? "bg-yellow-400 w-6" : "bg-white/30"
                                }`}
                            />
                            <button
                              onClick={() => setForsaSlide(1)}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${forsaSlide === 1 ? "bg-yellow-400 w-6" : "bg-white/30"
                                }`}
                            />
                          </div>

                          <span className="text-xs font-bold text-yellow-400 hover:text-white flex items-center gap-1">
                            {isRTL ? "شاهد الفرصة كاملة" : "View Listing"} →
                          </span>
                        </div>
                      </div>

                      {/* Reach Badge footer */}
                      <div className="flex items-center justify-between text-xs text-gray-300 px-1">
                        <span className="flex items-center gap-1 text-yellow-400 font-bold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          1M+ Total Reach
                        </span>
                        <span className="text-white font-medium">70+ Partner Companies</span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 3: Media Production (Instagram Gradient Colors) */}
                  {currentProduct.id === "media" && (
                    <div className="bg-gradient-to-br from-[#1a0928] via-[#100619] to-black text-white rounded-3xl p-6 shadow-2xl border-2 border-pink-500/30 space-y-4">
                      {/* Viewfinder Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-pink-500/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-xs font-black text-red-400 uppercase tracking-widest">
                            LIVE REC • 4K 60FPS
                          </span>
                        </div>
                        <span className="text-[11px] font-black bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-3 py-0.5 rounded-full shadow">
                          Instagram Production
                        </span>
                      </div>

                      {/* 2 Reel Cards requested with Instagram links */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentProduct.reels?.map((reel, ridx) => (
                          <a
                            key={ridx}
                            href={reel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white/5 hover:bg-white/10 border border-pink-500/20 hover:border-pink-500/60 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between space-y-3"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] text-white">
                                  {reel.partner}
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-pink-400 transition-colors" />
                              </div>
                              <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                                {reel.title}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-gray-300">
                              <span className="flex items-center gap-1 text-pink-300 font-semibold">
                                <Eye className="w-3 h-3" /> {reel.views}
                              </span>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 group-hover:underline font-black">
                                {isRTL ? "شاهد على إنستغرام ↗" : "Watch on IG ↗"}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Partner Trust Badges */}
                      <div className="pt-2 border-t border-pink-500/20 flex items-center justify-between text-xs text-gray-300">
                        <span className="text-[11px] font-bold text-pink-300 uppercase">
                          {isRTL ? "شركاء موثوقون:" : "Trusted By:"}
                        </span>
                        <div className="flex items-center gap-3 text-white font-bold text-xs">
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
                    <div className="bg-gradient-to-br from-[#3D070E] via-[#240408] to-black text-white rounded-3xl p-6 shadow-2xl border-2 border-[#8A1C2E]/40 space-y-5">
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

                      {/* Workshop Session Cards */}
                      <div className="bg-[#540D17]/40 border border-[#8A1C2E]/40 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#8A1C2E] text-white uppercase">
                            {isRTL ? "ورشة عمل قادمة" : "Upcoming Workshop"}
                          </span>
                          <span className="text-xs text-[#FFD1D8] flex items-center gap-1 font-bold">
                            <Calendar className="w-3.5 h-3.5" /> 2025 Cohort
                          </span>
                        </div>

                        <h4
                          className={`text-base font-black text-white leading-snug ${isRTL ? "font-arabic-header" : "font-english-header"
                            }`}
                        >
                          {isRTL
                            ? "مختبر صناعة المحتوى والسرد القصصي للشباب وصناع التغيير"
                            : "Storytelling, Creative Production & Digital Citizenship Masterclass"}
                        </h4>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="text-[11px] bg-[#6E1321]/60 px-2.5 py-1 rounded-md text-[#FFE6EB] border border-[#8A1C2E]/30 font-medium">
                            Storytelling
                          </span>
                          <span className="text-[11px] bg-[#6E1321]/60 px-2.5 py-1 rounded-md text-[#FFE6EB] border border-[#8A1C2E]/30 font-medium">
                            Content Creation
                          </span>
                          <span className="text-[11px] bg-[#6E1321]/60 px-2.5 py-1 rounded-md text-[#FFE6EB] border border-[#8A1C2E]/30 font-medium">
                            Digital Citizenship
                          </span>
                        </div>
                      </div>

                      {/* Impact metrics footer */}
                      <div className="flex items-center justify-between text-xs text-gray-300 px-1">
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

          {/* Bottom Navigation Controls & Indicators */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={isRTL ? handleNext : handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-bold transition-all shadow-sm hover:shadow"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isRTL ? "السابق" : "Previous"}</span>
            </button>

            {/* Indicator Pills matching active slide theme */}
            <div className="flex items-center justify-center gap-2">
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

            <button
              onClick={isRTL ? handlePrev : handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-bold transition-all shadow-sm hover:shadow"
              aria-label="Next product"
            >
              <span>{isRTL ? "التالي" : "Next"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}


