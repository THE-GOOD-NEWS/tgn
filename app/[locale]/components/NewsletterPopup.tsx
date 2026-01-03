"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterPopup = () => {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Show popup after a short delay to ensure hydration and user attention
    const timer = setTimeout(() => {
      // Check if user has already subscribed or closed the popup (optional, but good practice)
      // For now, per requirement "appears for all visitors", we show it.
      // We can add sessionStorage check to avoid showing it on every navigation if needed.
      const hasSeenPopup = sessionStorage.getItem("hasSeenNewsletterPopup");
      if (hasSeenPopup !== "true") {
        setIsOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      sessionStorage.setItem("hasSeenNewsletterPopup", "true");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage(isRTL ? "البريد الإلكتروني غير صالح" : "Invalid email");
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
        setMessage(t("success"));
        setEmail("");
        // Close popup after success message
        setTimeout(() => {
          setIsOpen(false);
          sessionStorage.setItem("hasSeenNewsletterPopup", "true");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(t("error"));
      }
    } catch (err) {
      setStatus("error");
      setMessage(t("error"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`sm:max-w-md ${isRTL ? "font-arabic" : "font-english"}`}
      >
        <DialogHeader className="items-center text-center">
          <div className="relative w-32 h-32 ">
            <Image
              src="/mounir/TGN_ELEMENTS_PNG-06.png"
              alt="Newsletter icon"
              fill
              className="object-contain"
            />
          </div>
          <DialogTitle
            className={`text-2xl font-bold text-black ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            }`}
          >
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-lg mt-2">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="text-center py-6 text-green-600 font-bold">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder={t("placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={isRTL ? "text-right" : "text-left"}
                disabled={status === "loading"}
              />
              {status === "error" && (
                <p className="text-red-500 text-sm">{message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-hot-pink hover:bg-hot-pink/90 text-cream font-bold"
              disabled={status === "loading"}
            >
              {status === "loading" ? "..." : t("button")}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
