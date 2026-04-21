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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

export default function JoinTheGoodProjectPage() {
  const t = useTranslations("joinTheGoodProject");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectLogoUrl, setProjectLogoUrl] = useState<string>("");
  const [teamPhotoUrl, setTeamPhotoUrl] = useState<string>("");
  const [instagramLinks, setInstagramLinks] = useState<string[]>([""]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
    const validLinks = instagramLinks.filter((link) => link.trim() !== "");
    if (validLinks.length === 0) {
      toast.error(t("form.errorMessage") + " (Please add at least one Instagram link)");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      formType: "join_good_project",
      name: formData.get("studentName"),
      email: formData.get("studentEmail"),
      projectName: formData.get("projectName"),
      faculty: formData.get("faculty"),
      university: formData.get("university"),
      academicYear: formData.get("academicYear"),
      graduationMonth: formData.get("graduationMonth"),
      graduationDate: formData.get("graduationDate"),
      aboutProject: formData.get("aboutProject"),
      projectCategory: formData.get("projectCategory"),
      projectLogoUrl,
      teamPhotoUrl,
      projectPageLink: formData.get("projectPageLink"),
      teamInstagramLinks: validLinks,
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
        setInstagramLinks([""]);
        setShowSuccessDialog(true);
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
    dir={isRTL ? "rtl" : "ltr"}
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
     {/*     <div
            className={`text-xl md:text-2xl font-bold mt-3 ${
              isRTL ? "font-arabic-subheading" : "font-english-subheading"
            } text-carbon`}
          >
            {t("subtitle")}
          </div>
          */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mb-12 p-8 rounded-3xl bg-sand/20 border border-sand/30 shadow-sm relative overflow-hidden ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div className="relative z-10">
            <h2
              className={`text-2xl md:text-3xl font-bold mb-4 text-carbon ${
                isRTL ? "font-arabic-header" : "font-english-heading"
              }`}
            >
              {t("instructions.title")}
            </h2>
            <p className="mb-6 text-carbon/80 font-bold italic">
              {t("instructions.warning")}
            </p>
            <ul className="space-y-4 mb-8">
              {(t.raw("instructions.list") as string[]).map((item, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-hot-pink/10 text-hot-pink flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-carbon/90 leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
            {locale === "en" && (
              <p className="text-lg md:text-xl font-bold text-hot-pink mt-4 italic">
                {t("instructions.footer")}
              </p>
            )}
          </div>

          {/* Subtle decorative element */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-hot-pink/5 rounded-full blur-3xl" />
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-sand/20 rounded-full blur-2xl" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          {/* <div className="space-y-2">
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
          </div> */}

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
          
          {/* Graduation Month */}
          <div className="space-y-2">
            <Label>
              {t("form.graduationMonth")} <span className="text-hot-pink">*</span>
            </Label>
            <RadioGroup
              name="graduationMonth"
              required
              className="flex flex-col space-y-1 items-start"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {["april", "may", "june", "july"].map((month) => (
                <div
                  key={month}
                  className={`flex items-center gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <RadioGroupItem value={month} id={`month-${month}`} />
                  <Label htmlFor={`month-${month}`} className="font-normal">
                    {t(`form.months.${month}`)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Graduation Date */}
          <div className="space-y-2">
            <Label htmlFor="graduationDate">
              {t("form.graduationDate")}
            </Label>
            <Input
              id="graduationDate"
              name="graduationDate"
              type="date"
              disabled={isSubmitting}
            />
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
              placeholder={t("form.aboutProjectDescription")}
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
              {t("form.projectLogo")} <span className="text-hot-pink">*</span>{" "}
              <span className="text-gray-400 font-normal text-xs md:text-sm">
                {t("form.logoResolutionHint")}
              </span>
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
              {t("form.teamPhoto")} <span className="text-hot-pink">*</span>{" "}
              <span className="text-gray-400 font-normal text-xs md:text-sm">
                {t("form.teamPhotoHint")}
              </span>
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

          <div className="space-y-4">
            <Label htmlFor="teamInstagramLinks">
              {t("form.teamInstagramLinks")}{" "}
              <span className="text-hot-pink">*</span>
            </Label>
            
            <div className="space-y-3">
              {instagramLinks.map((link, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    type="url"
                    value={link}
                    onChange={(e) => {
                      const newLinks = [...instagramLinks];
                      newLinks[index] = e.target.value;
                      setInstagramLinks(newLinks);
                    }}
                    placeholder={isRTL ? "رابط إنستجرام..." : "Instagram link..."}
                    disabled={isSubmitting}
                  />
                  {instagramLinks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setInstagramLinks(instagramLinks.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                    >
                      <span className="text-xl">×</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setInstagramLinks([...instagramLinks, ""])}
              className="text-sm font-bold text-carbon/70 hover:text-hot-pink underline decoration-dotted transition-colors block"
              disabled={isSubmitting}
            >
              {t("form.addMember")}
            </button>
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

        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent className="max-w-[400px] rounded-3xl p-8 border-none shadow-2xl">
            <AlertDialogHeader className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <CheckCircle2 size={48} />
              </div>
              <AlertDialogTitle className={`text-2xl font-bold ${isRTL ? "font-arabic-header" : "font-english-heading"}`}>
                {t("form.successMessage")}
              </AlertDialogTitle>
              <AlertDialogDescription className={`text-lg text-carbon/80 font-medium leading-relaxed ${isRTL ? "font-arabic-subheading text-right" : "font-english-subheading"}`}>
                {t("form.successPopup")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-8">
              <AlertDialogAction 
                onClick={() => setShowSuccessDialog(false)}
                className="w-full bg-hot-pink hover:bg-hot-pink/90 text-white font-bold h-12 rounded-xl text-lg transition-all active:scale-95"
              >
                {locale === "ar" ? "حسناً" : "Got it!"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
