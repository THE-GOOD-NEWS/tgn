"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname() || "";
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
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
    { href: `/${locale}/the-good-news/articles`, label: t("quickLinks.articles") },
    { href: `/${locale}/the-good-news/about/story`, label: t("quickLinks.about") },
    { href: `/${locale}/contact`, label: t("quickLinks.contact") },
    { href: `/${locale}/privacy`, label: t("quickLinks.privacy") },
    { href: `/${locale}/terms`, label: t("quickLinks.terms") },
  ];

  const getInvolvedLinks = [
    {
      href: `/${locale}/contact/partner`,
      label: navT("contactSubItems.beOurPartner"),
    },
    {
      href: `/${locale}/contact/share-news`,
      label: navT("contactSubItems.shareGoodNews"),
    },
    {
      href: `/${locale}/contact/join-our-team`,
      label: navT("contactSubItems.joinOurTeam"),
    },
    {
      href: `/${locale}/the-good-news/the-good-project/join`,
      label: "The Good Project",
    },
    { href: `/${locale}/contact`, label: navT("contact") },
  ];

  const isRTL = locale === "ar";

  return (
    <footer className={`border-t ${
      pathname.includes("/the-good-space") 
        ? "theme-good-space bg-background" 
        : "bg-gradient-to-br from-cream/20 to-hot-pink/10"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="grid grid-cols-1 items-start justify-center md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <div className="space-y-4 text-start">
            <Link
              href={
                pathname.includes("/the-good-space")
                  ? `/${locale}/the-good-space`
                  : pathname.includes("/the-good-news")
                  ? `/${locale}/the-good-news`
                  : `/${locale}`
              }
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <div className="relative w-64 h-32 md:h-32 md:w-64 lg:h-36 lg:w-80">
                <Image
                  alt="The Good Media Group Logo"
                  fill
                  className="object-contain"
                  src={
                    pathname.includes("/the-good-space")
                      ? "/goodSpace/1.png"
                      : pathname.includes("/the-good-news")
                      ? "/logos/TGN_LOGOS_PNG-03.png"
                      : "/TGMG/logo.png"
                  }
                />
              </div>
            </Link>
            {pathname.includes("/the-good-news") ? (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("brand.description")}
              </p>
            ) : !pathname.includes("/the-good-space") ? (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("brand.tgmgDescription")}
              </p>
            ) : null}
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
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
                <Mail className="h-4 w-4 text-primary" />
                <span>info@thegoodnews-me.com</span>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {navT("involved")}
                </h4>
                <ul className="space-y-2">
                  {getInvolvedLinks.map((link) => (
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
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`px-4 py-2 text-white text-sm font-medium rounded-md hover:shadow-lg transition-all duration-300 button-glow disabled:opacity-70 ${
                    pathname.includes("/the-good-space") 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-gradient-to-r from-hot-pink to-bright-yellow"
                  }`}
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
