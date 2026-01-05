"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function JoinTheGoodProjectPage() {
  const t = useTranslations("joinTheGoodProject");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectLogoUrl, setProjectLogoUrl] = useState<string>("");
  const [teamPhotoUrl, setTeamPhotoUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectLogoUrl) {
      toast.error(t("form.errorMessage") + " (Logo missing)");
      return;
    }
    if (!teamPhotoUrl) {
      toast.error(t("form.errorMessage") + " (Team photo missing)");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      formType: "join_good_project",
      email: formData.get("email"),
      studentName: formData.get("studentName"),
      studentEmail: formData.get("studentEmail"),
      projectName: formData.get("projectName"),
      faculty: formData.get("faculty"),
      university: formData.get("university"),
      academicYear: formData.get("academicYear"),
      aboutProject: formData.get("aboutProject"),
      projectCategory: formData.get("projectCategory"),
      projectLogoUrl,
      teamPhotoUrl,
      projectPageLink: formData.get("projectPageLink"),
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
        setProjectLogoUrl("");
        setTeamPhotoUrl("");
        return t("form.successMessage");
      },
      error: (error) => {
        console.error(error);
        return t("form.errorMessage");
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
      className={`px-6 md:px-10 lg:px-16 pb-12 md:pb-16 pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon`}
          >
            {t("title")}
          </div>
          <div
            className={`text-xl md:text-2xl font-bold mt-3 ${
              isRTL ? "font-arabic-subheading" : "font-english-subheading"
            } text-carbon`}
          >
            {t("subtitle")}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              {t("form.email")} <span className="text-hot-pink">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Student Name */}
          <div className="space-y-2">
            <Label htmlFor="studentName">
              {t("form.studentName")} <span className="text-hot-pink">*</span>
            </Label>
            <Input
              id="studentName"
              name="studentName"
              type="text"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Student Email */}
          <div className="space-y-2">
            <Label htmlFor="studentEmail">
              {t("form.studentEmail")} <span className="text-hot-pink">*</span>
            </Label>
            <Input
              id="studentEmail"
              name="studentEmail"
              type="email"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="projectName">
              {t("form.projectName")} <span className="text-hot-pink">*</span>
            </Label>
            <Input
              id="projectName"
              name="projectName"
              type="text"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Faculty */}
          <div className="space-y-2">
            <Label htmlFor="faculty">
              {t("form.faculty")} <span className="text-hot-pink">*</span>
            </Label>
            <Input
              id="faculty"
              name="faculty"
              type="text"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* University */}
          <div className="space-y-2">
            <Label htmlFor="university">
              {t("form.university")} <span className="text-hot-pink">*</span>
            </Label>
            <Input
              id="university"
              name="university"
              type="text"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Academic Year */}
          <div className="space-y-2">
            <Label>
              {t("form.academicYear")} <span className="text-hot-pink">*</span>
            </Label>
            <RadioGroup
              name="academicYear"
              required
              className="flex flex-col space-y-1 items-start"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {["1st", "2nd", "3rd", "4th", "other"].map((year) => (
                <div
                  key={year}
                  className={`flex items-center gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <RadioGroupItem value={year} id={`year-${year}`} />
                  <Label htmlFor={`year-${year}`} className="font-normal">
                    {t(`form.years.${year}`)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* About the Project */}
          <div className="space-y-2">
            <Label htmlFor="aboutProject">
              {t("form.aboutProject")} <span className="text-hot-pink">*</span>
            </Label>
            <Textarea
              id="aboutProject"
              name="aboutProject"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Project Category */}
          <div dir={locale === "ar" ? "rtl" : "ltr"} className="space-y-2">
            <Label>
              {t("form.projectCategory")}{" "}
              <span className="text-hot-pink">*</span>
            </Label>
            <RadioGroup
              name="projectCategory"
              required
              className="flex flex-col space-y-1 items-start"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {[
                "environmental",
                "social",
                "health",
                "travelTourism",
                "cultural",
                "technologyAI",
                "other",
              ].map((cat) => (
                <div
                  key={cat}
                  className={`flex items-center gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <RadioGroupItem value={cat} id={`cat-${cat}`} />
                  <Label htmlFor={`cat-${cat}`} className="font-normal">
                    {t(`form.categories.${cat}`)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Project Logo */}
          <div className="space-y-2">
            <Label>
              {t("form.projectLogo")} <span className="text-hot-pink">*</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {projectLogoUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={projectLogoUrl}
                    alt="Project Logo"
                    className="h-32 object-contain mb-2"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => setProjectLogoUrl("")}
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <UploadButton
                  endpoint="newsMedia"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setProjectLogoUrl(res[0].url);
                      toast.success("Logo uploaded!");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                  }}
                  appearance={{
                    button:
                      "bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-2 px-4 rounded-md transition-colors",
                    allowedContent: "text-gray-500 text-sm",
                  }}
                />
              )}
            </div>
          </div>

          {/* Team Photo */}
          <div className="space-y-2">
            <Label>
              {t("form.teamPhoto")} <span className="text-hot-pink">*</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {teamPhotoUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={teamPhotoUrl}
                    alt="Team Photo"
                    className="h-32 object-contain mb-2"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => setTeamPhotoUrl("")}
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <UploadButton
                  endpoint="newsMedia"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setTeamPhotoUrl(res[0].url);
                      toast.success("Team photo uploaded!");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                  }}
                  appearance={{
                    button:
                      "bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-2 px-4 rounded-md transition-colors",
                    allowedContent: "text-gray-500 text-sm",
                  }}
                />
              )}
            </div>
          </div>

          {/* Project Page Link */}
          <div className="space-y-2">
            <Label htmlFor="projectPageLink">
              {t("form.projectPageLink")}{" "}
              <span className="text-hot-pink">*</span>
            </Label>
            <Input
              id="projectPageLink"
              name="projectPageLink"
              type="url"
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : t("form.submit")}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
