"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export default function JoinTeamPage() {
  const t = useTranslations("team.joinForm");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvUrl, setCvUrl] = useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const { startUpload, isUploading } = useUploadThing("cvUploader", {
    onClientUploadComplete: (res: any) => {
      if (res && res[0]) {
        setCvUrl(res[0].url);
        toast.success("CV uploaded successfully!");
      }
    },
    onUploadError: (error: Error) => {
      toast.error(`ERROR! ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cvUrl) {
      alert("Please upload your CV first");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);

    // Handle interested fields
    const interestedFields: string[] = [];
    if (formData.get("scriptwriting")) interestedFields.push("scriptwriting");
    if (formData.get("graphicDesign")) interestedFields.push("graphicDesign");
    if (formData.get("contentCreation"))
      interestedFields.push("contentCreation");
    if (formData.get("videoEditing")) interestedFields.push("videoEditing");
    if (formData.get("socialMedia")) interestedFields.push("socialMedia");
    if (formData.get("businessDevelopment"))
      interestedFields.push("businessDevelopment");
    if (formData.get("finance")) interestedFields.push("finance");
    if (formData.get("editorialWriting"))
      interestedFields.push("editorialWriting");
    if (formData.get("communityManagement"))
      interestedFields.push("communityManagement");

    // Handle work style
    const workStyle: string[] = [];
    if (formData.get("fullTime")) workStyle.push("fullTime");
    if (formData.get("partTime")) workStyle.push("partTime");
    if (formData.get("freelance")) workStyle.push("freelance");

    const data = {
      formType: "join_team",
      name: formData.get("fullName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      interestedFields,
      experience: formData.get("experience"),
      workStyle,
      cvUrl,
      resumeAs: formData.get("resumeAs"),
      notes: formData.get("notes"),
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
        setCvUrl("");
        return (
          t("form.successMessage") || "Application submitted successfully!"
        );
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
      // Error already handled in toast
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

        {/* {submitStatus === "success" && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-center">
            {t("form.successMessage") || "Application submitted successfully!"}
          </div>
        )}
        {submitStatus === "error" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
            {t("form.errorMessage") ||
              "Something went wrong. Please try again."}
          </div>
        )} */}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("fullName")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="fullName"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("email")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("phoneNumber")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="phoneNumber"
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Interested Fields */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("interestedFields")}
              <span className="text-hot-pink">*</span>
            </label>
            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  name="scriptwriting"
                  type="checkbox"
                  id="scriptwriting"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="scriptwriting"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.scriptwriting")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="graphicDesign"
                  type="checkbox"
                  id="graphicDesign"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="graphicDesign"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.graphicDesign")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="contentCreation"
                  type="checkbox"
                  id="contentCreation"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="contentCreation"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.contentCreation")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="videoEditing"
                  type="checkbox"
                  id="videoEditing"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="videoEditing"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.videoEditing")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="socialMedia"
                  type="checkbox"
                  id="socialMedia"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="socialMedia"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.socialMedia")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="businessDevelopment"
                  type="checkbox"
                  id="businessDevelopment"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="businessDevelopment"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.businessDevelopment")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="finance"
                  type="checkbox"
                  id="finance"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="finance"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.finance")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="editorialWriting"
                  type="checkbox"
                  id="editorialWriting"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="editorialWriting"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.editorialWriting")}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  name="communityManagement"
                  type="checkbox"
                  id="communityManagement"
                  className="mt-1 mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="communityManagement"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("fields.communityManagement")}
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {t("fields.selectMax")}
            </p>
          </div>

          {/* Experience */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("experience")}
              <span className="text-hot-pink">*</span>
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="exp0-1"
                  name="experience"
                  value="0-1"
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="exp0-1"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("experienceOptions.option1")}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="exp2-3"
                  name="experience"
                  value="2-3"
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="exp2-3"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("experienceOptions.option2")}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="exp4-5"
                  name="experience"
                  value="4-5"
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="exp4-5"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("experienceOptions.option3")}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="exp6plus"
                  name="experience"
                  value="6+"
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="exp6plus"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("experienceOptions.option4")}
                </label>
              </div>
            </div>
          </div>

          {/* Work Style */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("workStyle")}
              <span className="text-hot-pink">*</span>
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  name="fullTime"
                  type="checkbox"
                  id="fullTime"
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="fullTime"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("workStyleOptions.fullTime")}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  name="partTime"
                  type="checkbox"
                  id="partTime"
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="partTime"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("workStyleOptions.partTime")}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  name="freelance"
                  type="checkbox"
                  id="freelance"
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="freelance"
                  className={`${
                    isRTL ? "font-arabic-body" : "font-english-body"
                  }`}
                >
                  {t("workStyleOptions.freelance")}
                </label>
              </div>
            </div>
          </div>

          {/* Upload CV */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("uploadCV")}
              <span className="text-hot-pink">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
              {cvUrl ? (
                <div className="text-center">
                  <p className="text-green-600 mb-2 font-semibold">
                    CV Uploaded Successfully!
                  </p>
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-hot-pink hover:underline"
                  >
                    View Uploaded CV
                  </a>
                  <button
                    type="button"
                    onClick={() => setCvUrl("")}
                    className="block mt-2 text-sm text-red-500 hover:underline mx-auto"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <label className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload CV</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await startUpload([file]);
                        }
                      }}
                      accept=".pdf,.txt,.doc,.docx"
                      disabled={isUploading}
                    />
                  </label>
                  <p className="text-gray-500 mt-2 text-sm">
                    {isUploading ? "Uploading..." : "Max 8MB (PDF)"}
                  </p>
                </div>
              )}
            </div>
            <input
              name="resumeAs"
              type="text"
              placeholder={t("resumeAs")}
              className="w-full p-3 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
              disabled={isSubmitting}
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("notes")}
            </label>
            <textarea
              name="notes"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink h-32"
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : t("submit")}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
