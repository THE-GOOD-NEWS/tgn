"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/thegoodnews.mena",
      label: "Facebook",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@thegoodnews.me",
      label: "TikTok",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/thegoodnews.me/",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "#https://www.youtube.com/@mariamsolika",
      label: "YouTube",
    },
  ];

  const quickLinks = [
    { href: `/${locale}`, label: t("quickLinks.home") },
    { href: `/${locale}/articles`, label: t("quickLinks.articles") },
    { href: `/${locale}/about`, label: t("quickLinks.about") },
    { href: `/${locale}/contact`, label: t("quickLinks.contact") },
    { href: `/${locale}/privacy`, label: t("quickLinks.privacy") },
    { href: `/${locale}/terms`, label: t("quickLinks.terms") },
  ];
  const isRTL = locale === "ar";

  return (
    <footer className="bg-gradient-to-br from-cream/20 to-hot-pink/10 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="grid grid-cols-1 items-start justify-center md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <div className="space-y-4 text-start">
            <Link
              href={`/${locale}`}
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <div className="relative w-64 h-32 md:h-32 md:w-64 lg:h-36 lg:w-80">
                <Image
                  alt="The Good News Logo"
                  fill
                  className="object-cover"
                  src="/logos/TGN_LOGOS_PNG-03.png"
                />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("brand.description")}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-hot-pink transition-colors transform hover:scale-110 duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-start">
            <h3 className="text-lg font-semibold text-foreground">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 rtl:hover:-translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-start">
            <h3 className="text-lg font-semibold text-foreground">
              {t("contact.title")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-hot-pink" />
                <span>info@thegoodnews-me.com</span>
              </div>
              {/* <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-hot-pink" />
                <span>{t("contact.phone")}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-hot-pink" />
                <span>{t("contact.address")}</span>
              </div> */}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4 text-start">
            <h3 className="text-lg font-semibold text-foreground">
              {t("newsletter.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("newsletter.description")}
            </p>
            <div className="space-y-3">
              <form
                className="flex flex-col sm:flex-row gap-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email || !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
                    setStatus("error");
                    setMessage(locale === "ar" ? "البريد الإلكتروني غير صالح" : "Invalid email");
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
                      setMessage(locale === "ar" ? "تم الاشتراك بنجاح" : "Subscribed successfully");
                      setEmail("");
                    } else {
                      setStatus("error");
                      setMessage(locale === "ar" ? "فشل الاشتراك" : "Subscription failed");
                    }
                  } catch (err) {
                    setStatus("error");
                    setMessage(locale === "ar" ? "حدث خطأ" : "An error occurred");
                  }
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink/50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-4 py-2 bg-gradient-to-r from-hot-pink to-bright-yellow text-white text-sm font-medium rounded-md hover:shadow-lg transition-all duration-300 button-glow disabled:opacity-70"
                >
                  {status === "loading" ? (locale === "ar" ? "جارٍ الاشتراك..." : "Subscribing...") : t("newsletter.subscribe")}
                </button>
              </form>
              {message && (
                <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>{message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground text-start">
              {t("bottom.copyright", { year: currentYear })}
            </p>
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-muted-foreground">
              <span>{t("bottom.madeWith")}</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>{t("bottom.by")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
