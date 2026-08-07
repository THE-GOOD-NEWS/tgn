"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { TeamMemberCard } from "@/app/[locale]/components/TeamMemberCard";

export default function TeamPage() {
  const t = useTranslations("team");
  const roles = useTranslations("roles");
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

  return (
    <div
      className={`px-6 md:px-10 lg:px-16 pb-12 md:pb-16  pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Operations Section */}
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-6"
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
          <span className="inline-block mt-2 text-hot-pink font-bold tracking-wide">
            {t("opsLabel")}
          </span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center"
        >
          <motion.div variants={item}>
            <TeamMemberCard
              name="Mariam Solika"
              roleLines={[
                roles("founderCeoPresenter.line1"),
                roles("founderCeoPresenter.line2"),
              ]}
              imageSrc="/team/Mariam2.jpg"
            />
          </motion.div>
          <motion.div variants={item}>
            <TeamMemberCard
              name="Jannah Mahmoud"
              roleLines={[
                roles("projectManager.line1"),
                roles("projectManager.line2"),
              ]}
              imageSrc="/team/Jannah.jpg"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Creative Section */}
      <section className="max-w-6xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="inline-block mt-2 text-hot-pink font-bold tracking-wide">
            {t("creativeLabel")}
          </span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 place-items-center"
        >
          <motion.div variants={item}>
            <TeamMemberCard
              name="Nayirah Abdelaziz"
              roleLines={[
                roles("editorialManager.line1"),
                roles("editorialManager.line2"),
              ]}
              imageSrc="/team/Nina2.jpg"
            />
          </motion.div>
          <motion.div variants={item}>
            <TeamMemberCard
              name="Yasmine Waleed"
              roleLines={[
                roles("partnershipsExecutive.line1"),
                roles("partnershipsExecutive.line2"),
              ]}
              imageSrc="/team/Yasmina2.jpg"
            />
          </motion.div>
          <motion.div variants={item}>
            <TeamMemberCard
              name="Mariam Fawzy"
              roleLines={[
                roles("editorialExecutive.line1"),
                roles("editorialExecutive.line2"),
              ]}
              imageSrc="/team/Fawzoz.jpg"
            />
          </motion.div>
          <motion.div variants={item}>
            <TeamMemberCard
              name="Yomna Ehab"
              roleLines={[
                roles("videoEditorAnimator.line1"),
                roles("videoEditorAnimator.line2"),
              ]}
              imageSrc="/team/Yoyo.jpg"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Join the Team Button */}
      <section className="max-w-6xl mx-auto mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href={`/${locale}/about/team/join`} className="inline-block">
            <button className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              {t("joinTeamButton")}
            </button>
          </a>
        </motion.div>
      </section>
    </div>
  );
}
