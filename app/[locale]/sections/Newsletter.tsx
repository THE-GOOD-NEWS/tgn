"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const Newsletter = () => {
  const t = useTranslations("workshops.newsletters");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage(
        locale === "ar" ? "البريد الإلكتروني غير صالح" : "Invalid email"
      );
      return;
    }
    try {
      setStatus("loading");
      setMessage("");
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setStatus("success");
        setMessage(
          locale === "ar" ? "تم الاشتراك بنجاح" : "Subscribed successfully"
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(locale === "ar" ? "فشل الاشتراك" : "Subscription failed");
      }
    } catch (err) {
      setStatus("error");
      setMessage(locale === "ar" ? "حدث خطأ" : "An error occurred");
    }
    // In a real implementation, this would send the email to your backend
    // For now, just show success message
    setStatus("success");
    setEmail("");
    // Reset status after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div id="newsletter" className="flex justify-center w-full py-10 md:py-14">
      <section
        className={`py-10 px-4 md:px-24 lg:max-w-4xl rounded-2xl bg-hot-pink ${
          isRTL ? "text-center" : "text-center"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            > */}
            <h2
              className={`text-3xl md:text-5xl font-bold mb-2 text-cream ${
                isRTL ? "font-arabic-header" : "font-english-heading"
              }`}
            >
              {t("title")}
            </h2>
            <div
              dir={isRTL ? "rtl" : "ltr"}
              className="flex items-center justify-center mb-2 gap-2"
            >
              <p
                className={`text-lg text-cream font-bold${
                  isRTL ? "font-arabic" : "font-english"
                }`}
              >
                {t("subTitle")}
              </p>
              <div className="relative w-20 h-20">
                <Image
                  src="/mounir/TGN_ELEMENTS_PNG-06.png"
                  alt="Newsletter icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              dir={isRTL ? "rtl" : "ltr"}
              className="flex flex-col  md:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                className={`flex-grow p-3 rounded-lg border-2 border-cream bg-transparent text-cream placeholder-cream/70 focus:outline-none focus:ring-2 focus:ring-cream ${
                  isRTL ? "font-arabic text-right" : "font-english text-left"
                }`}
                required
              />
              <button
                type="submit"
                className={`px-6 py-3 bg-bright-yellow text-gray-500 font-bold rounded-lg transition-transform hover:scale-105 ${
                  isRTL ? "font-arabic" : "font-english"
                }`}
              >
                {t("button")}
              </button>
            </form>

            {status === "success" && (
              <p
                className={`mt-4 text-cream ${
                  isRTL ? "font-arabic" : "font-english"
                }`}
              >
                {t("success")}
              </p>
            )}
            {status === "error" && (
              <p
                className={`mt-4 text-cream ${
                  isRTL ? "font-arabic" : "font-english"
                }`}
              >
                {t("error")}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
