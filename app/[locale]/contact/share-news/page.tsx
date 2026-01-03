"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";

export default function ShareNewsPage() {
  const t = useTranslations("shareNews");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("idle");

    if (!mediaUrls || mediaUrls.length === 0) {
      toast.error(
        t("form.attachmentRequired") || "Please upload at least one file."
      );
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      formType: "share_news",
      story: formData.get("story"),
      name: formData.get("name"),
      email: formData.get("email"),
      mediaUrls: mediaUrls,
    };

    const promise = fetch("/api/forms/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) throw new Error("Submission failed");
      return response;
    });

    toast.promise(promise, {
      loading: "Submitting...",
      success: () => {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
        setMediaUrls([]);
        return t("form.successMessage") || "Story submitted successfully!";
      },
      error: (error) => {
        console.error(error);
        setSubmitStatus("error");
        return (
          t("form.errorMessage") || "Something went wrong. Please try again."
        );
      },
    });

    try {
      await promise;
    } catch (error) {
      // Error handled in toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`px-6 md:px-10  lg:px-16 pb-12 md:pb-16 pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <section className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-12"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white  rounded-xl shadow-lg p-6 md:p-8"
        >
          {/* {submitStatus === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-center">
              {t("form.successMessage") || "Story submitted successfully!"}
            </div>
          )}
          {submitStatus === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
              {t("form.errorMessage") ||
                "Something went wrong. Please try again."}
            </div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="story" className="text-base font-medium">
                {t("form.story")}
              </Label>
              <span className="text-hot-pink">*</span>

              <Textarea
                id="story"
                name="story"
                rows={5}
                className="w-full resize-y border border-gray-400"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="file-upload" className="text-base font-medium">
                {t("form.attachment")}
                <span className="text-hot-pink">*</span>
              </Label>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                {mediaUrls.length > 0 ? (
                  <div className="mb-4">
                    <p className="text-green-600 font-bold mb-2">
                      {mediaUrls.length} file(s) uploaded
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {mediaUrls.map((url, idx) => (
                        <div key={idx} className="relative">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-hot-pink underline"
                          >
                            File {idx + 1}
                          </a>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setMediaUrls([])}
                      className="text-xs text-red-500 underline mt-2"
                    >
                      Remove All
                    </button>
                  </div>
                ) : (
                  <UploadButton
                    endpoint="newsMedia"
                    onClientUploadComplete={(res) => {
                      if (res) {
                        setMediaUrls(res.map((file) => file.url));
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    appearance={{
                      button:
                        "bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-2 px-4 rounded-md transition-colors",
                      allowedContent: "text-gray-500 text-sm",
                    }}
                  />
                )}
                {!mediaUrls.length && (
                  <p className="text-sm text-gray-600 mt-2">
                    {t("form.uploadInstructions")}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base font-medium">
                  {t("form.name")}
                  <span className="text-hot-pink">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="w-full border border-gray-400"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-medium">
                  {t("form.email")}
                  <span className="text-hot-pink">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full border border-gray-400"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-hot-pink hover:bg-hot-pink/90 text-white font-medium py-2 px-6 rounded-md transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : t("form.submit")}
              </Button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
