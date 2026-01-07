"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

export default function FeedbackPage() {
  const t = useTranslations("feedback");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratings, setRatings] = useState({
    professionalism: 0,
    clarity: 0,
    adaptability: 0,
    responsiveness: 0,
    overall: 0,
    continueWorking: 0,
    recommend: 0,
  });

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      formType: "testimonial",
      name: formData.get("name"),
      companyName: formData.get("companyName"),
      role: formData.get("role"),
      campaignPurpose: formData.get("campaignPurpose"),
      professionalismRating: ratings.professionalism,
      clarityRating: ratings.clarity,
      adaptabilityRating: ratings.adaptability,
      responsivenessRating: ratings.responsiveness,
      overallRating: ratings.overall,
      continueWorkingRating: ratings.continueWorking,
      recommendRating: ratings.recommend,
      testimonialComment: formData.get("testimonialComment"),
      // agreeToShare: formData.get("agreeToShare") === "on",
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
        (e.target as HTMLFormElement).reset();
        setRatings({
          professionalism: 0,
          clarity: 0,
          adaptability: 0,
          responsiveness: 0,
          overall: 0,
          continueWorking: 0,
          recommend: 0,
        });
        return t("successMessage");
      },
      error: (error) => {
        console.error(error);
        return t("errorMessage");
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

  const renderStarRating = (
    category: string,
    label: string,
    description?: string
  ) => (
    <div className="space-y-2  mb-6">
      <Label className="text-lg font-semibold">{label}</Label>
      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                ratings[category as keyof typeof ratings] >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t("form.name")} *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder={t("form.namePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">{t("form.companyName")} *</Label>
              <Input
                id="companyName"
                name="companyName"
                required
                placeholder={t("form.companyNamePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">{t("form.role")} *</Label>
              <Input
                id="role"
                name="role"
                required
                placeholder={t("form.rolePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignPurpose">
                {t("form.campaignPurpose")} *
              </Label>
              <Input
                id="campaignPurpose"
                name="campaignPurpose"
                required
                placeholder={t("form.campaignPurposePlaceholder")}
              />
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">{t("ratings.title")}</h2>

            {renderStarRating(
              "professionalism",
              t("ratings.professionalism"),
              t("ratings.professionalismDesc")
            )}
            {renderStarRating(
              "clarity",
              t("ratings.clarity"),
              t("ratings.clarityDesc")
            )}
            {renderStarRating(
              "adaptability",
              t("ratings.adaptability"),
              t("ratings.adaptabilityDesc")
            )}
            {renderStarRating(
              "responsiveness",
              t("ratings.responsiveness"),
              t("ratings.responsivenessDesc")
            )}
            {renderStarRating(
              "overall",
              t("ratings.overall"),
              t("ratings.overallDesc")
            )}
            {renderStarRating(
              "continueWorking",
              t("ratings.continueWorking"),
              t("ratings.continueWorkingDesc")
            )}
            {renderStarRating(
              "recommend",
              t("ratings.recommend"),
              t("ratings.recommendDesc")
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="testimonialComment"
              className="text-lg font-semibold"
            >
              {t("form.comment")}
            </Label>
            <Textarea
              id="testimonialComment"
              name="testimonialComment"
              placeholder={t("form.commentPlaceholder")}
              className="h-32"
            />
          </div>

          <div className="flex items-start space-x-2">
            {/* <Checkbox id="agreeToShare" name="agreeToShare" /> */}
            <Label
              htmlFor="agreeToShare"
              className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("form.agreeToShare")}
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-4 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : t("form.submit")}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
