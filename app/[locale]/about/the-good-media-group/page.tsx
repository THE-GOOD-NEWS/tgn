"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Globe,
  Users,
  Compass,
  Briefcase,
  ChevronDown,
  Heart,
  DoorOpen,
  ShieldCheck,
  Megaphone,
  CheckCircle2,
  TrendingUp,
  Eye,
  FileText,
  Calendar,
  Send,
} from "lucide-react";

export default function TheGoodMediaGroupPage() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [activeHopePillar, setActiveHopePillar] = useState<string>("H");

  // Bilingual Content for Section 1 (Our Story / قصتنا)
  const storyContent = {
    title: isRTL ? "قصتنا" : "Our Story",
    tagline: isRTL ? "عن The Good Media Group" : "About The Good Media Group",
    paragraphs: isRTL
      ? [
          "ذا جود ميديا جروب هي الشركة الأم لمجموعة من العلامات الإعلامية، والمحتوى الأصلي، والمبادرات المجتمعية، واللي بنعمل على تطويرها وتوسيعها باستمرار.",
          "شغلنا بيجمع بين صناعة المحتوى، والصحافة، والإبداع، والتأثير، من خلال المحتوى الرقمي، والتجارب على أرض الواقع، والشراكات الاستراتيجية، وكل ده تحت مظلة واحدة.",
          "سواء بننتج فيديو إخباري قصير، أو بننظم فعالية مجتمعية، أو بنطوّر سلسلة محتوى أصلية، هدفنا دايمًا واحد: إننا نصنع تجارب يكون لها تأثير حقيقي على الشباب.",
        ]
      : [
          "The Good Media Group (TGMG) is the parent company behind a growing ecosystem of media brands, original content, and community initiatives.",
          "Our work sits at the intersection of storytelling, journalism, creativity, and impact—bringing together digital content, on-ground experiences, and strategic partnerships under one umbrella.",
          "Whether we're producing a short-form news video, hosting a community event, or developing an original series, our goal remains the same: to create experiences that drive youth impact.",
        ],
  };

  // Section 2: Visual Ecosystem Data
  const ecosystemData = {
    badge: isRTL ? "المنظومة الإعلامية" : "Visual Ecosystem",
    title: isRTL ? "منظومة The Good Media Group" : "The TGMG Ecosystem",
    subtitle: isRTL
      ? "هيكل متكامل يجمع بين الإعلام الرقمي التفاعلي والمبادرات المجتمعية الواقعية"
      : "An integrated ecosystem connecting digital media platforms and real-world community experiences",
    tgmg: {
      name: isRTL ? "ذا جود ميديا جروب (TGMG)" : "The Good Media Group (TGMG)",
      role: isRTL ? "الشركة الأم والمظلة الاستراتيجية" : "Parent Company & Strategic Umbrella",
      desc: isRTL
        ? "المظلة الحاضنة للمنظومة الإعلامية والمبادرات الشبابية والشراكات الاستراتيجية الإقليمية."
        : "The overarching entity leading youth media brands, original IP, strategic partnerships, and impact initiatives.",
      badges: isRTL
        ? ["الشركة الأم", "إعلام الشباب", "التأثير المجتمعي"]
        : ["Parent Company", "Youth Media", "Impact Driven"],
    },
    tgn: {
      name: isRTL ? "THE GOOD NEWS (TGN)" : "THE GOOD NEWS (TGN)",
      role: isRTL ? "المنصة الإعلامية الرقمية الرئيسية" : "Flagship Digital Media Platform",
      desc: isRTL
        ? "منصتنا الرقمية الرائدة لصناعة الأخبار الإيجابية، الفيديوهات القصيرة، والتغطيات الصحفية الموجهة للشباب العربي."
        : "Leading digital media brand delivering positive, verified, social-first news, video reels, and inspiring stories across MENA.",
      link: `/${locale}/the-good-news`,
      linkText: isRTL ? "استكشف المنصة" : "Explore TGN",
      subTitle: isRTL ? "المبادرات التابعة لـ TGN" : "Pillars Under TGN",
    },
    tgp: {
      name: isRTL ? "The Good Project (TGP)" : "The Good Project (TGP)",
      role: isRTL ? "المحتوى والإنتاج الأصلي" : "Original Storytelling & Productions",
      desc: isRTL
        ? "سلاسل وثائقية وإنتاجات أصلية تسلط الضوء على قصص ملهمة وحملات ذات أثر مجتمعي."
        : "Original docu-series, storytelling formats, and custom impact campaigns.",
      badge: isRTL ? "إنتاج أصلي" : "Original Productions",
    },
    forsa: {
      name: isRTL ? "Forsa Helwa (فرصة حلوة)" : "Forsa Helwa",
      role: isRTL ? "بوابة الفرص والتمكين" : "Youth Opportunities & Career Growth",
      desc: isRTL
        ? "سلسلة متخصصة في نشر وتوفير فرص العمل، المنح الدراسية، والزمالات للشباب في المنطقة."
        : "Dedicated series connecting youth with verified jobs, internships, scholarships, fellowships, and grants.",
      link: `/${locale}/the-good-news/forsa-helwa`,
      linkText: isRTL ? "صفحة فرصة حلوة" : "View Forsa Helwa",
      badge: isRTL ? "فرص ومنح" : "Opportunities & Grants",
    },
    tgs: {
      name: isRTL ? "The Good Space (TGS)" : "The Good Space (TGS)",
      role: isRTL ? "المجتمع والفعاليات على أرض الواقع" : "On-Ground Community & Experiential Hub",
      desc: isRTL
        ? "المساحة الميدانية والفعاليات الواقعية، وورش العمل، وجلسات التواصل لصناع المحتوى والشباب."
        : "The physical community arm hosting workshops, creator meetups, masterclasses, and transformative real-world activations.",
      link: `/${locale}/the-good-space`,
      linkText: isRTL ? "استكشف ذا جود سبيس" : "Explore The Good Space",
      badge: isRTL ? "مجتمع وتجارب" : "Community & Events",
    },
  };

  // Section 3: HOPE Framework & Youth Journey Data
  const hopeData = {
    badge: isRTL ? "إطار عمل HOPE" : "The HOPE Framework",
    title: isRTL ? "استراتيجيتنا وإطار عملنا" : "Our Strategy and Framework — The HOPE Framework",
    subtitle: isRTL
      ? "استراتيجيتنا لبناء المنظومة الشبابية الرائدة"
      : "Our Strategy for Building the Leading Youth Ecosystem",
    intro: isRTL
      ? "كل حاجة بنبنيها هدفها تساعد الشباب ينتقلوا لفرصة حقيقية للمشاركة، ومن المشاركة لاكتشاف إمكاناتهم، ومن إمكاناتهم للقيادة."
      : "Everything we build should help young people move from possibility to participation, from participation to potential, and from potential to leadership.",
    pillars: [
      {
        id: "H",
        letter: "H",
        word: "Humanize",
        title: isRTL ? "H — Humanize نخلّي الموضوع إنساني وأقرب للناس" : "H — Humanize",
        tagline: isRTL ? "نخلّي الموضوع إنساني وأقرب للناس" : "Make possibilities feel personal.",
        desc: isRTL
          ? "من خلال قسم الأخبار والقصص، بنحكي قصص تساعد الشباب يشوفوا نفسهم في المستقبل اللي عايزين يبنوه. ولما بنعرض القضايا والتحديات والنجاحات من خلال تجارب أشخاص حقيقيين، بنشجع الشباب على اتخاذ خطوة فعلية، بدل الاكتفاء بمجرد الشعور بالتفاؤل."
          : "Through our News & Features, We tell stories that help young people see themselves in the future they want to build. By humanizing issues, challenges and successes through real people, we inspire action rather than passive optimism.",
        corePlatform: isRTL ? "قسم الأخبار والقصص (News & Features)" : "News & Features / Authentic Stories",
        icon: Heart,
        gradient: "from-rose-500 to-pink-500",
        accentColor: "#f43f5e",
        lightBadge: "bg-rose-50 border-rose-200 text-rose-700 font-black",
        transitionStage: isRTL ? "من الإمكانية إلى المشاركة" : "Possibility → Participation",
      },
      {
        id: "O",
        letter: "O",
        word: "Open",
        title: isRTL ? "O — Open نفتح أبواب الفرص" : "O — Open",
        tagline: isRTL ? "نفتح أبواب الفرص." : "Open doors to opportunities.",
        desc: isRTL
          ? "بنربط الشباب بفرص تساعدهم يطوّروا نفسهم ويخطوا خطوات أسرع في مسارهم الشخصي والمهني. احنا مش بس بنقدم معلومات، لكن بنسهل الوصول للفرص نفسها. ومن خلال خط المحتوى بتاعنا “فرصة حلوة”، بنساعد في سد الفجوة بين الشباب وفرص التطور والنمو. وكمان بنقدّم سلسلة محتوى كاملة تركّز على تزويد الشباب بالمهارات اللي تساعدهم على التطور."
          : "We connect young people with opportunities that accelerate their personal and professional journeys. We don't just inform — we create access. Our product line, Forsa Helwa, bridges the gap between Youth and growth opportunities. We built a whole content series focused on equipping youth with skills that would help them grow.",
        corePlatform: isRTL ? "فرصة حلوة (Forsa Helwa)" : "Forsa Helwa / Career Acceleration",
        icon: DoorOpen,
        gradient: "from-amber-500 to-orange-500",
        accentColor: "#f59e0b",
        lightBadge: "bg-amber-50 border-amber-200 text-amber-700 font-black",
        transitionStage: isRTL ? "من المشاركة إلى الإمكانات" : "Participation → Potential",
      },
      {
        id: "P",
        letter: "P",
        word: "Prepare",
        title: isRTL ? "P — Prepare نجهّز الشباب عشان يحققوا طموحاتهم" : "P — Prepare",
        tagline: isRTL ? "نجهّز الشباب عشان يحققوا طموحاتهم" : "Prepare young people to thrive.",
        desc: isRTL
          ? "بنساعد الشباب يكتسبوا المهارات والثقة والعلاقات والخبرات اللي محتاجينها عشان ينجحوا. ومن خلال التعلّم، والعمل الجماعي، والإرشاد، بنساعدهم يكونوا مستعدين للخطوة الجاية من خلال The Good Space."
          : "We equip youth with the skills, confidence, networks and experiences they need to succeed. Through learning, community and mentorship, we help them become ready for what's next through The Good Space.",
        corePlatform: isRTL ? "The Good Space (المجتمع والتعلم الميداني)" : "The Good Space / Community & Learning",
        icon: ShieldCheck,
        gradient: "from-[#9966FF] to-[#6A2BDE]",
        accentColor: "#9966FF",
        lightBadge: "bg-purple-100 border-purple-300 text-purple-900 font-black",
        transitionStage: isRTL ? "من الإمكانات إلى الجاهزية" : "Potential → Readiness",
      },
      {
        id: "E",
        letter: "E",
        word: "Elevate",
        title: isRTL ? "E — Elevate نوصل صوت الشباب" : "E — Elevate",
        tagline: isRTL ? "نوصل صوت الشباب" : "Elevate youth voices and ideas.",
        desc: isRTL
          ? "بنخلق منصات يكون فيها الشباب مش بس متلقين للقصص، لكن جزء من صناعتها وتشكيلها. وبنساعد في توصيل أصواتهم، وربطهم بصناع القرار، وتمكينهم من إن يكون لهم دور في تشكيل المستقبل."
          : "We create platforms where young people don't just consume stories — they shape them. We amplify youth voices, connect them with decision-makers and help them influence the future.",
        corePlatform: isRTL ? "تمكين وتأثير القيادات الشبابية" : "Youth Leadership & Amplification",
        icon: Megaphone,
        gradient: "from-emerald-500 to-teal-500",
        accentColor: "#10b981",
        lightBadge: "bg-emerald-100 border-emerald-300 text-emerald-900 font-black",
        transitionStage: isRTL ? "من الجاهزية إلى القيادة" : "Readiness → Leadership",
      },
    ],
    journey: {
      title: isRTL ? "رحلة الشباب" : "The Youth Journey",
      subtitle: isRTL
        ? "كل شاب بيتفاعل مع The Good Media Group المفروض يمر بنفس الرحلة:"
        : "Every young person who engages with The Good Media Group should move through the same journey:",
      steps: [
        {
          letter: "H",
          name: "Humanize",
          stage: isRTL ? "الإمكانية" : "Possibility",
          color: "bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-rose-500/40",
          progressColor: "bg-rose-500",
          text: isRTL
            ? "Humanize ← يكتشف قصص تخليه يشوف إن المستقبل اللي بيحلم بيه ممكن يتحقق."
            : "Humanize → Discover stories that make the future feel possible.",
        },
        {
          letter: "O",
          name: "Open",
          stage: isRTL ? "المشاركة" : "Participation",
          color: "bg-gradient-to-br from-amber-400 to-orange-500 text-gray-950 shadow-amber-500/40",
          progressColor: "bg-amber-400",
          text: isRTL
            ? "Open ← يوصل لفرص تساعده ياخد خطوات حقيقية لقدام."
            : "Open → Access opportunities that create momentum.",
        },
        {
          letter: "P",
          name: "Prepare",
          stage: isRTL ? "الإمكانات" : "Potential",
          color: "bg-gradient-to-br from-[#9966FF] to-[#6A2BDE] text-white shadow-purple-500/50",
          progressColor: "bg-[#9966FF]",
          text: isRTL
            ? "Prepare ← يكتسب المهارات والثقة والمجتمع اللي يساعده على التطور."
            : "Prepare → Gain the skills, confidence and community to grow.",
        },
        {
          letter: "E",
          name: "Elevate",
          stage: isRTL ? "القيادة" : "Leadership",
          color: "bg-gradient-to-br from-emerald-400 to-teal-500 text-gray-950 shadow-emerald-500/40",
          progressColor: "bg-emerald-400",
          text: isRTL
            ? "Elevate ← يقود ويبدع ويساهم في تشكيل مستقبل أفضل للآخرين."
            : "Elevate → Lead, create and shape the future for others.",
        },
      ],
      conclusion: isRTL
        ? "الأمل مش مجرد محور من محاور الرحلة دي. الأمل هو النتيجة اللي بتحصل لما المحاور الأربعة تشتغل مع بعض."
        : "Hope is not one pillar within this journey. Hope is what happens because all four pillars work together.",
    },
  };

  // Section 4: Our Impact Data
  const impactData = {
    title: isRTL ? "تأثيرنا" : "Our Impact",
    subtitle: isRTL
      ? "الأرقام بتحكي جزء من القصة."
      : "Numbers tell part of the story.",
    metrics: [
      {
        value: isRTL ? "ملايين" : "Millions",
        label: isRTL ? "المشاهدات شهريًا" : "of monthly views",
        icon: Eye,
        gradient: "from-rose-500 to-pink-500",
        lightBadge: "bg-rose-50 border-rose-200 text-rose-700",
        shadow: "shadow-rose-500/20",
      },
      {
        value: isRTL ? "آلاف" : "Thousands",
        label: isRTL ? "من أفراد Community المتفاعلين" : "of engaged community members",
        icon: Users,
        gradient: "from-[#9966FF] to-[#6A2BDE]",
        lightBadge: "bg-purple-100 border-purple-300 text-purple-900 font-bold",
        shadow: "shadow-purple-500/30",
      },
      {
        value: isRTL ? "مئات" : "Hundreds",
        label: isRTL ? "القصص المنشورة" : "of stories published",
        icon: FileText,
        gradient: "from-amber-500 to-orange-500",
        lightBadge: "bg-amber-50 border-amber-200 text-amber-700",
        shadow: "shadow-amber-500/20",
      },
      {
        value: isRTL ? "عشرات" : "Dozens",
        label: isRTL ? "الفعاليات على أرض الواقع" : "of on-ground events",
        icon: Calendar,
        gradient: "from-emerald-500 to-teal-500",
        lightBadge: "bg-emerald-50 border-emerald-200 text-emerald-700",
        shadow: "shadow-emerald-500/20",
      },
      {
        value: isRTL ? "شراكات" : "Partnerships",
        label: isRTL ? "في مصر والمنطقة وخارجها" : "across Egypt, the region, and beyond",
        icon: Globe,
        gradient: "from-blue-500 to-cyan-500",
        lightBadge: "bg-blue-50 border-blue-200 text-blue-700",
        shadow: "shadow-blue-500/20",
      },
    ],
  };

  // Section 5: Partner CTA Data
  const ctaData = {
    title: isRTL ? "يلا نبني شراكة محتوى" : "Let's Build Something Good Together",
    description: isRTL
      ? "سواء عايز تحكي قصة، أو تطلق حملة، أو تبني مجتمع، أو تقدّم محتوى له قيمة وتأثير — يسعدنا نسمع منك."
      : "Whether you're looking to tell a story, launch a campaign, build a community, or create meaningful content—we'd love to hear from you.",
    buttonText: isRTL
      ? "شاركنا في بناء شراكة مع The Good Media Group"
      : "Partner With The Good Media Group",
    link: `/${locale}/contact/partner`,
  };

  return (
    <div className="min-h-screen bg-cream text-foreground overflow-x-hidden selection:bg-hot-pink selection:text-white">
      {/* ========================================================================= */}
      {/* SECTION 1: OUR STORY (قصتنا) - Mounir & Dialogue Bubble */}
      {/* ========================================================================= */}
      <section
        id="our-story"
        className={`relative pt-12 md:pt-16 pb-10 md:pb-14 px-4 sm:px-6 lg:px-8 border-b border-gray-200/70 overflow-hidden ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-bright-yellow/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header (No badge) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8 space-y-2"
          >
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-carbon tracking-tight ${
                isRTL ? "font-arabic-header" : "font-english-heading"
              }`}
            >
              {storyContent.title}
            </h1>
          </motion.div>

          {/* Mounir Character & Chat Bubble Layout */}
          <div
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Mascot Character Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: isRTL ? 4 : -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              className="flex-shrink-0 relative group"
            >
              <div className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-hot-pink/20 to-bright-yellow/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500" />
                <Image
                  src="/mounir/notFoundPadding.png"
                  alt="THE GOOD NEWS Character Mounir"
                  fill
                  className="object-contain relative z-10 drop-shadow-xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Chat Bubble Container with The 3 Story Paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30, y: 15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-2xl relative"
            >
              {/* Chat Bubble Box */}
              <div
                className={`relative bg-hot-pink text-white rounded-3xl p-6 sm:p-7 md:p-8 shadow-2xl border-2 border-white/20 transform ${
                  isRTL ? "-rotate-1" : "rotate-1"
                } hover:rotate-0 transition-transform duration-300`}
              >
                {/* Speech Bubble Tail Arrow pointing directly to the character image on md & lg screens */}
                <div
                  className={`hidden md:block absolute top-1/3 -translate-y-1/2 ${
                    isRTL
                      ? "-right-4 border-y-[12px] border-y-transparent border-l-[16px] border-l-hot-pink border-r-0"
                      : "-left-4 border-y-[12px] border-y-transparent border-r-[16px] border-r-hot-pink border-l-0"
                  } w-0 h-0`}
                />

                {/* Mobile Tail Arrow pointing up towards the image above the bubble */}
                <div className="md:hidden absolute -top-3.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-b-[14px] border-b-hot-pink border-t-0" />

                {/* Story Content Paragraphs */}
                <div className="space-y-3.5 text-white">
                  {storyContent.paragraphs.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.15 }}
                      className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm ${
                        isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: VISUAL ECOSYSTEM (TGMG => TGN [TGP + Forsa Helwa] + TGS) */}
      {/* ========================================================================= */}
      <section
        id="ecosystem"
        className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-white to-cream relative overflow-hidden border-b border-gray-200/70"
      >
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header (No badge) */}
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="text-center space-y-3 max-w-3xl mx-auto mb-10 md:mb-12"
          >
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 ${
                isRTL ? "font-arabic-header" : "font-english-header"
              }`}
            >
              {ecosystemData.title}
            </h2>
            <p
              className={`text-base sm:text-lg text-gray-600 font-medium ${
                isRTL ? "font-arabic-body" : "font-english-body"
              }`}
            >
              {ecosystemData.subtitle}
            </p>
          </div>

          {/* ========================================================= */}
          {/* VISUAL TREE DIAGRAM */}
          {/* ========================================================= */}
          <div className="space-y-6 md:space-y-8" dir={isRTL ? "rtl" : "ltr"}>
            
            {/* LEVEL 1: ROOT NODE (TGMG - Parent Company) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-gray-900/10 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-hot-pink/20 via-bright-yellow/20 to-transparent rounded-bl-full pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left rtl:sm:text-right">
                  {/* TGMG Logo */}
                  <div className="relative w-28 h-20 sm:w-32 sm:h-24 flex-shrink-0 bg-cream/50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/TGMG/logo.png"
                      alt="The Good Media Group Logo"
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* TGMG Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-gray-900 text-white tracking-wide">
                        {ecosystemData.tgmg.role}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                        isRTL ? "font-arabic-header" : "font-english-header"
                      }`}
                    >
                      {ecosystemData.tgmg.name}
                    </h3>

                    <p
                      className={`text-sm sm:text-base text-gray-600 leading-relaxed ${
                        isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                    >
                      {ecosystemData.tgmg.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start rtl:sm:justify-start">
                      {ecosystemData.tgmg.badges.map((b, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-cream text-gray-700 border border-gray-200"
                        >
                          • {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FLOW CONNECTOR ARROWS (Level 1 to Level 2) */}
            <div className="relative flex flex-col items-center">
              {/* Vertical line from TGMG */}
              <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-gray-900 to-gray-400 rounded-full" />

              {/* Horizontal Split Branch on medium+ screens */}
              <div className="hidden md:block w-3/4 max-w-3xl h-1 bg-gray-300 rounded-full relative">
                {/* Left downward corner connector */}
                <div className="absolute -left-0.5 top-0 w-1 h-4 bg-gray-300 rounded-b-full" />
                {/* Right downward corner connector */}
                <div className="absolute -right-0.5 top-0 w-1 h-4 bg-gray-300 rounded-b-full" />
              </div>

              {/* Mobile center arrow */}
              <div className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 shadow-sm text-gray-700 my-0.5">
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>

            {/* LEVEL 2: TWO MAIN PILLARS (TGN & TGS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* ========================================== */}
              {/* PILLAR 1: THE GOOD NEWS (TGN) */}
              {/* ========================================== */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-hot-pink/30 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-hot-pink transition-all duration-300"
              >
                <div className="space-y-5">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-hot-pink/15 text-hot-pink-dark border border-hot-pink/20">
                      <Globe className="w-3.5 h-3.5" />
                      {ecosystemData.tgn.role}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-hot-pink animate-pulse" />
                  </div>

                  {/* TGN Logo */}
                  <div className="relative w-44 h-16 sm:w-52 sm:h-20">
                    <Image
                      src="/logos/tgnLogo.png"
                      alt="THE GOOD NEWS Logo"
                      fill
                      className="object-contain object-left rtl:object-right"
                    />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1.5">
                    <h3
                      className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                        isRTL ? "font-arabic-header" : "font-english-header"
                      }`}
                    >
                      {ecosystemData.tgn.name}
                    </h3>
                    <p
                      className={`text-gray-600 text-sm leading-relaxed ${
                        isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                    >
                      {ecosystemData.tgn.desc}
                    </p>
                  </div>

                  {/* SUB-BRANCHES UNDER TGN: TGP & FORSA HELWA */}
                  <div className="pt-4 border-t-2 border-dashed border-gray-200 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <ArrowDown className="w-3.5 h-3.5 text-hot-pink" />
                      <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                        {ecosystemData.tgn.subTitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Sub-node A: The Good Project (TGP) */}
                      <div className="p-3.5 rounded-2xl bg-cream/60 border border-gray-200/80 hover:bg-cream hover:shadow-md transition-all duration-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="relative w-16 h-8">
                            <Image
                              src="/tgp/tgpLogocropped.png"
                              alt="The Good Project Logo"
                              fill
                              className="object-contain object-left rtl:object-right"
                            />
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-hot-pink/20 text-gray-800">
                            {ecosystemData.tgp.badge}
                          </span>
                        </div>
                        <h4
                          className={`text-sm font-bold text-gray-900 ${
                            isRTL ? "font-arabic-header" : "font-english-header"
                          }`}
                        >
                          {ecosystemData.tgp.name}
                        </h4>
                        <p
                          className={`text-xs text-gray-600 leading-relaxed ${
                            isRTL ? "font-arabic-body" : "font-english-body"
                          }`}
                        >
                          {ecosystemData.tgp.desc}
                        </p>
                      </div>

                      {/* Sub-node B: Forsa Helwa */}
                      <div className="p-3.5 rounded-2xl bg-cream/60 border border-gray-200/80 hover:bg-cream hover:shadow-md transition-all duration-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="relative w-16 h-8">
                            <Image
                              src="/goodIntern/ForsaHelwaFinal(5).png"
                              alt="Forsa Helwa Logo"
                              fill
                              className="object-contain object-left rtl:object-right"
                            />
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-bright-yellow text-gray-900 border border-black/10">
                            {ecosystemData.forsa.badge}
                          </span>
                        </div>
                        <h4
                          className={`text-sm font-bold text-gray-900 ${
                            isRTL ? "font-arabic-header" : "font-english-header"
                          }`}
                        >
                          {ecosystemData.forsa.name}
                        </h4>
                        <p
                          className={`text-xs text-gray-600 leading-relaxed ${
                            isRTL ? "font-arabic-body" : "font-english-body"
                          }`}
                        >
                          {ecosystemData.forsa.desc}
                        </p>
                        <Link
                          href={ecosystemData.forsa.link}
                          className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-hot-pink transition-colors pt-0.5"
                        >
                          <span>{ecosystemData.forsa.linkText}</span>
                          <ArrowIcon className="w-3 h-3" />
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>

                {/* TGN CTA Link */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link
                    href={ecosystemData.tgn.link}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-hot-pink to-bright-yellow text-gray-900 font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${
                      isRTL ? "font-arabic-subheading" : "font-english-subheading"
                    }`}
                  >
                    <span>{ecosystemData.tgn.linkText}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* ========================================== */}
              {/* PILLAR 2: THE GOOD SPACE (TGS) */}
              {/* ========================================== */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-400/30 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-amber-400 transition-all duration-300"
              >
                <div className="space-y-5">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-800 border border-amber-400/20">
                      <Users className="w-3.5 h-3.5" />
                      {ecosystemData.tgs.role}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  </div>

                  {/* TGS Logo */}
                  <div className="relative w-44 h-16 sm:w-52 sm:h-20">
                    <Image
                      src="/goodSpace/1.png"
                      alt="The Good Space Logo"
                      fill
                      className="object-contain object-left rtl:object-right"
                    />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1.5">
                    <h3
                      className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                        isRTL ? "font-arabic-header" : "font-english-header"
                      }`}
                    >
                      {ecosystemData.tgs.name}
                    </h3>
                    <p
                      className={`text-gray-600 text-sm leading-relaxed ${
                        isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                    >
                      {ecosystemData.tgs.desc}
                    </p>
                  </div>

                  {/* Features & Activations under Good Space */}
                  <div className="pt-4 border-t-2 border-dashed border-gray-200 space-y-2.5">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                      {isRTL ? "أبرز أنشطة المساحة والمجتمع:" : "Core Physical Activations:"}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                        <div className="p-1 rounded-lg bg-amber-200/60 text-amber-900 font-bold mt-0.5">
                          <Compass className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                            {isRTL ? "ورش عمل وصناعة المحتوى" : "Creator Workshops & Masterclasses"}
                          </h5>
                          <p className="text-[11px] text-gray-600">
                            {isRTL
                              ? "تدريبات متقدمة في السرد القصصي والإنتاج الرقمي."
                              : "Hands-on storytelling, creative production, and digital creation."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                        <div className="p-1 rounded-lg bg-amber-200/60 text-amber-900 font-bold mt-0.5">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                            {isRTL ? "لقاءات تشبيك ومجتمع الشباب" : "Networking Meetups & Creator Summits"}
                          </h5>
                          <p className="text-[11px] text-gray-600">
                            {isRTL
                              ? "جمع صناع القرار والمؤسسات مع المواهب الصاعدة والمؤثرين."
                              : "Connecting emerging changemakers with institutional partners and leaders."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TGS CTA Link */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link
                    href={ecosystemData.tgs.link}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#5B1C1E] text-white font-extrabold text-sm shadow-md hover:bg-[#451416] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${
                      isRTL ? "font-arabic-subheading" : "font-english-subheading"
                    }`}
                  >
                    <span>{ecosystemData.tgs.linkText}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: OUR STRATEGY & FRAMEWORK — THE HOPE FRAMEWORK */}
      {/* ========================================================================= */}
      <section
        id="hope-framework"
        className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-white to-cream relative overflow-hidden border-b border-gray-200/70"
      >
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10" dir={isRTL ? "rtl" : "ltr"}>
          
          {/* Section Header (No badge) */}
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-10 md:mb-12">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight ${
                isRTL ? "font-arabic-header" : "font-english-header"
              }`}
            >
              {hopeData.title}
            </h2>

            <p
              className={`text-base sm:text-lg font-bold text-hot-pink-dark ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {hopeData.subtitle}
            </p>

            <p
              className={`text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium ${
                isRTL ? "font-arabic-body" : "font-english-body"
              }`}
            >
              {hopeData.intro}
            </p>
          </div>

          {/* ========================================================= */}
          {/* THE 4 HOPE PILLAR CARDS (H - O - P - E) */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {hopeData.pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activeHopePillar === pillar.id;

              return (
                <motion.div
                  key={pillar.id}
                  onClick={() => setActiveHopePillar(pillar.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all duration-300 relative border-2 flex flex-col justify-between overflow-hidden group ${
                    isSelected
                      ? "bg-white shadow-2xl ring-4 ring-offset-2 ring-gray-200/70"
                      : "bg-white/85 hover:bg-white border-gray-200/80 shadow-md hover:shadow-xl"
                  }`}
                  style={{
                    borderColor: isSelected ? pillar.accentColor : undefined,
                  }}
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Big Letter Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md bg-gradient-to-br ${pillar.gradient}`}
                      >
                        {pillar.letter}
                      </div>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: `${pillar.accentColor}15`,
                          color: pillar.accentColor,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Pillar Title */}
                    <div>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-1.5 ${pillar.lightBadge}`}
                      >
                        {pillar.word}
                      </span>
                      <h3
                        className={`text-lg font-bold text-gray-900 ${
                          isRTL ? "font-arabic-header" : "font-english-header"
                        }`}
                      >
                        {pillar.title}
                      </h3>
                    </div>

                    {/* Tagline */}
                    <p
                      className={`text-xs sm:text-sm font-semibold text-gray-600 leading-snug ${
                        isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                    >
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Bottom selection indicator */}
                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
                      {isSelected
                        ? isRTL
                          ? "المحور المختار ✓"
                          : "Selected Pillar ✓"
                        : isRTL
                        ? "اضغط للتفاصيل"
                        : "Click to explore"}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: isSelected ? pillar.accentColor : "#e5e7eb",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* ACTIVE PILLAR SPOTLIGHT CARD */}
          {/* ========================================================= */}
          <div className="mb-10 md:mb-14">
            <AnimatePresence mode="wait">
              {hopeData.pillars
                .filter((p) => p.id === activeHopePillar)
                .map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-gray-100 shadow-2xl relative overflow-hidden"
                    >
                      {/* Top background accent bar */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pillar.gradient}`}
                      />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                        
                        {/* Left/Main Column: Explanation */}
                        <div className="lg:col-span-8 space-y-4">
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${pillar.gradient}`}
                            >
                              <Icon className="w-7 h-7" />
                            </div>
                            <div>
                              <span
                                className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${pillar.lightBadge}`}
                              >
                                {pillar.transitionStage}
                              </span>
                              <h3
                                className={`text-2xl sm:text-3xl font-black text-gray-900 mt-1 ${
                                  isRTL ? "font-arabic-header" : "font-english-header"
                                }`}
                              >
                                {pillar.title}
                              </h3>
                            </div>
                          </div>

                          <p
                            className={`text-base sm:text-lg text-gray-800 leading-relaxed font-medium ${
                              isRTL ? "font-arabic-body" : "font-english-body"
                            }`}
                          >
                            {pillar.desc}
                          </p>
                        </div>

                        {/* Right Column: Platform Connection */}
                        <div className="lg:col-span-4 bg-gradient-to-br from-cream to-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-inner space-y-3">
                          <div className="flex items-center gap-2 text-xs font-black text-gray-600 uppercase tracking-wider">
                            <CheckCircle2
                              className="w-3.5 h-3.5"
                              style={{ color: pillar.accentColor }}
                            />
                            <span>{isRTL ? "المنصة والمحور التطبيقي" : "Core Operational Arm"}</span>
                          </div>

                          <h4
                            className={`text-base font-bold text-gray-900 ${
                              isRTL ? "font-arabic-header" : "font-english-header"
                            }`}
                          >
                            {pillar.corePlatform}
                          </h4>

                          <p
                            className={`text-xs sm:text-sm text-gray-600 leading-relaxed ${
                              isRTL ? "font-arabic-body" : "font-english-body"
                            }`}
                          >
                            {pillar.id === "H" &&
                              (isRTL
                                ? "سرد قصصي واقعي يبني الثقة ويحفز المشاركة الإيجابية."
                                : "Authentic human storytelling and journalism that builds trust and sparks action.")}
                            {pillar.id === "O" &&
                              (isRTL
                                ? "فرص عمل، تدريب، منح، ومسابقات موثوقة تسارع نمو الشباب."
                                : "Verified internships, scholarships, and growth opportunities that open real doors.")}
                            {pillar.id === "P" &&
                              (isRTL
                                ? "ورش عمل وفعاليات تفاعلية تبني المهارات وتوسع شبكة العلاقات."
                                : "Experiential workshops, community spaces, and hands-on mentorship.")}
                            {pillar.id === "E" &&
                              (isRTL
                                ? "منصات ترفع أصوات الشباب وتربطهم بصناع القرار في المنطقة."
                                : "Platforms elevating youth perspectives to leaders and shaping the future.")}
                          </p>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

          {/* ========================================================= */}
          {/* THE YOUTH JOURNEY (رحلة الشباب) - MILESTONES 1, 2, 3, 4 */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-800 relative overflow-hidden space-y-8 md:space-y-10"
          >
            {/* Ambient Background Glow inside dark card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-hot-pink/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="text-center space-y-2 max-w-3xl mx-auto relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-white border border-white/20 shadow-sm backdrop-blur-sm">
                <TrendingUp className="w-3.5 h-3.5 text-bright-yellow" />
                {isRTL ? "مراحل رحلة الشباب (4 محطات متتالية)" : "4-Stage Milestone Pipeline"}
              </span>

              <h3
                className={`text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight ${
                  isRTL ? "font-arabic-header" : "font-english-header"
                }`}
              >
                {hopeData.journey.title}
              </h3>

              <p
                className={`text-sm sm:text-base text-gray-300 leading-relaxed font-medium ${
                  isRTL ? "font-arabic-body" : "font-english-body"
                }`}
              >
                {hopeData.journey.subtitle}
              </p>
            </div>

            {/* PAYMENT-STYLE STEPPER PROGRESS BAR (Horizontal on md+) */}
            <div className="relative z-10 max-w-5xl mx-auto hidden md:block">
              <div className="relative flex items-center justify-between">
                <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-white/15 rounded-full z-0" />
                <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 rounded-full z-0 shadow-[0_0_15px_rgba(255,154,204,0.7)]" />

                {hopeData.journey.steps.map((step, idx) => {
                  const stepNumbers = ["01", "02", "03", "04"];
                  const percentages = ["25%", "50%", "75%", "100%"];
                  return (
                    <div
                      key={idx}
                      className="relative z-10 flex flex-col items-center group cursor-default"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-2xl transition-transform duration-300 group-hover:scale-110 border-2 border-white/60 ${step.color} ring-4 ring-black/50`}
                      >
                        {idx + 1}
                      </div>

                      <div className="text-center mt-2.5 space-y-0.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-bright-yellow drop-shadow-sm">
                          {isRTL ? `المحطة ${stepNumbers[idx]}` : `Milestone ${stepNumbers[idx]}`}
                        </span>
                        <h5
                          className={`text-xs sm:text-sm font-extrabold text-white ${
                            isRTL ? "font-arabic-header" : "font-english-header"
                          }`}
                        >
                          {step.name}
                        </h5>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/15 text-white border border-white/20">
                          {step.stage} • {percentages[idx]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4 DETAILED MILESTONE STEP CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
              {hopeData.journey.steps.map((step, idx) => {
                const stepNumbers = ["01", "02", "03", "04"];
                const percentages = ["25%", "50%", "75%", "100%"];
                const borderGradients = [
                  "border-rose-500/50 hover:border-rose-400",
                  "border-amber-400/50 hover:border-amber-300",
                  "border-purple-400/50 hover:border-purple-300",
                  "border-emerald-400/50 hover:border-emerald-300",
                ];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border-2 ${borderGradients[idx]} p-5 sm:p-6 rounded-3xl space-y-4 transition-all duration-300 flex flex-col justify-between shadow-2xl group`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-9 h-9 rounded-xl text-sm font-black flex items-center justify-center shadow-lg ${step.color} border border-white/30`}
                          >
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-bright-yellow/90">
                              {isRTL ? `المحطة ${stepNumbers[idx]}` : `Milestone ${stepNumbers[idx]}`}
                            </span>
                            <h4
                              className={`text-base font-black text-white ${
                                isRTL ? "font-arabic-header" : "font-english-header"
                              }`}
                            >
                              {step.name}
                            </h4>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-bright-yellow border border-white/20">
                          {percentages[idx]}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20">
                        <span className="text-white/80">{isRTL ? "المرحلة:" : "Stage:"}</span>
                        <span className="text-white font-black">{step.stage}</span>
                      </div>

                      <p
                        className={`text-xs sm:text-sm text-white/95 leading-relaxed font-medium ${
                          isRTL ? "font-arabic-body" : "font-english-body"
                        }`}
                      >
                        {step.text}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/15 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-extrabold text-white/85">
                        <span>
                          {idx === 0 && (isRTL ? "نقطة الانطلاق" : "Starting Point")}
                          {idx === 1 && (isRTL ? "بناء الفرص" : "Momentum Building")}
                          {idx === 2 && (isRTL ? "تطوير الجاهزية" : "Skill & Network")}
                          {idx === 3 && (isRTL ? "صناعة التأثير" : "Youth Leadership")}
                        </span>
                        {idx < 3 ? (
                          <span className="flex items-center gap-1 text-white group-hover:text-bright-yellow transition-colors font-bold">
                            <span>{isRTL ? "التالي" : "Next"}</span>
                            <ArrowIcon className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-black">✓ {isRTL ? "الهدف النهائي" : "Ultimate Goal"}</span>
                        )}
                      </div>

                      <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${step.progressColor} rounded-full transition-all duration-500 shadow-sm`}
                          style={{ width: percentages[idx] }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* The Concluding Hero Quote Box */}
            <div className="relative z-10 pt-2 text-center">
              <div className="inline-block p-5 sm:p-6 rounded-3xl bg-white/[0.05] border border-white/15 max-w-3xl mx-auto shadow-2xl backdrop-blur-md">
                <p
                  className={`text-base sm:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-bright-yellow via-hot-pink to-bright-yellow leading-relaxed ${
                    isRTL ? "font-arabic-header" : "font-english-header"
                  }`}
                >
                  ✨ &ldquo;{hopeData.journey.conclusion}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: OUR IMPACT (تأثيرنا) */}
      {/* ========================================================================= */}
      <section
        id="our-impact"
        className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-white to-cream relative overflow-hidden border-b border-gray-200/70"
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-10 w-96 h-96 bg-hot-pink/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-bright-yellow/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10" dir={isRTL ? "rtl" : "ltr"}>
          
          {/* Header (No Badge) */}
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-10 md:mb-12">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight ${
                isRTL ? "font-arabic-header" : "font-english-header"
              }`}
            >
              {impactData.title}
            </h2>
            <p
              className={`text-base sm:text-xl text-gray-600 font-bold ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {impactData.subtitle}
            </p>
          </div>

          {/* 5 Impact Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {impactData.metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center justify-between space-y-4 relative overflow-hidden group ${metric.shadow}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${metric.gradient} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <h3
                      className={`text-2xl sm:text-3xl font-black text-gray-900 ${
                        isRTL ? "font-arabic-header" : "font-english-header"
                      }`}
                    >
                      {metric.value}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-semibold text-gray-600 leading-snug ${
                        isRTL ? "font-arabic-body" : "font-english-body"
                      }`}
                    >
                      {metric.label}
                    </p>
                  </div>

                  <div className="w-full pt-3 border-t border-gray-100 flex items-center justify-center">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${metric.lightBadge}`}
                    >
                      {isRTL ? "تأثير مجتمعي" : "Youth Reach"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CTA — LET'S BUILD SOMETHING GOOD TOGETHER */}
      {/* ========================================================================= */}
      <section
        id="partner-cta"
        className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden"
      >
        {/* Glow Ornaments */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-hot-pink/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-bright-yellow/25 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6" dir={isRTL ? "rtl" : "ltr"}>
          
          {/* Section Title (No Badge) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight ${
              isRTL ? "font-arabic-header" : "font-english-header"
            }`}
          >
            {ctaData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium ${
              isRTL ? "font-arabic-body" : "font-english-body"
            }`}
          >
            {ctaData.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-4 flex justify-center"
          >
            <Link
              href={ctaData.link}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl text-base sm:text-lg font-black text-gray-900 bg-gradient-to-r from-hot-pink via-purple-300 to-bright-yellow shadow-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(255,154,204,0.6)] transition-all duration-300 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              <Send className="w-5 h-5" />
              <span>{ctaData.buttonText}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
