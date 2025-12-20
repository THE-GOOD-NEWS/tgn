"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";

export default function PartnerPage() {
  const t = useTranslations("partner");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(false);
    setFormSubmitted(false);

    const formData = new FormData(e.currentTarget);

    // Handle checkboxes for contact method
    const contactMethods: string[] = [];
    if (formData.get("contactEmailMethod")) contactMethods.push("email");
    if (formData.get("contactPhoneMethod")) contactMethods.push("phone");
    if (formData.get("contactWhatsappMethod")) contactMethods.push("whatsapp");

    const data = {
      formType: "partner",
      businessName: formData.get("businessName"),
      industry: formData.get("industry"),
      collaborationIdea: formData.get("collaborationIdea"),
      campaignDetails: formData.get("campaignDetails"),
      socialMediaAccounts: formData.get("socialMediaAccounts"),
      contactName: formData.get("contactName"),
      contactNumber: formData.get("contactNumber"),
      contactEmail: formData.get("contactEmail"),
      contactMethod: contactMethods,
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
        setFormSubmitted(true);
        (e.target as HTMLFormElement).reset();
        return t("form.successMessage") || "Submission successful!";
      },
      error: (error) => {
        console.error(error);
        setFormError(true);
        return t("form.errorMessage") || "Submission failed. Please try again.";
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

  const handleClearForm = () => {
    // Reset the form
    const form = document.getElementById("partnerForm") as HTMLFormElement;
    if (form) form.reset();
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
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon`}
          >
            {t("title")}
          </div>
          <div
            className={`text-2xl md:text-3xl font-bold mt-3 ${
              isRTL ? "font-arabic-subheading" : "font-english-body"
            } text-carbon`}
          >
            {t("subtitle")}
          </div>
        </motion.div>

        {formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
          >
            <p className="text-center">{t("form.successMessage")}</p>
          </motion.div>
        ) : formError ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          >
            <p className="text-center">{t("form.errorMessage")}</p>
          </motion.div>
        ) : null}

        <motion.form
          id="partnerForm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Business Name */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.businessName")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="businessName"
              type="text"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            />
          </div>

          {/* Industry */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.industry")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="industry"
              type="text"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            />
          </div>

          {/* How do you think we can collaborate? */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.howCollaborate")}
              <span className="text-hot-pink">*</span>
            </label>
            <textarea
              name="collaborationIdea"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink h-32 ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Campaign Details */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.campaignDetails")}
            </label>
            <p
              className={`text-sm text-gray-500 mb-2 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("form.campaignDetailsHint")}
            </p>
            <textarea
              name="campaignDetails"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink h-32 ${
                isRTL ? "text-right" : "text-left"
              }`}
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Social Media Accounts */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.socialMedia")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="socialMediaAccounts"
              type="text"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            />
          </div>

          {/* Contact Person Name */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.contactName")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="contactName"
              type="text"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            />
          </div>

          {/* Contact Person Number */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.contactNumber")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="contactNumber"
              type="tel"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            />
          </div>

          {/* Contact Person Email */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.contactEmail")}
              <span className="text-hot-pink">*</span>
            </label>
            <input
              name="contactEmail"
              type="email"
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
              placeholder={t("form.placeholder")}
              dir={isRTL ? "rtl" : "ltr"}
              disabled={isSubmitting}
            />
          </div>

          {/* Contact Method */}
          <div className="form-group">
            <label
              className={`block text-carbon font-bold mb-2 ${
                isRTL ? "font-arabic-subheading" : "font-english-subheading"
              }`}
            >
              {t("form.contactMethod")}
              <span className="text-hot-pink">*</span>
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  name="contactEmailMethod"
                  type="checkbox"
                  id="contactEmail"
                  className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-hot-pink focus:ring-hot-pink"
                  disabled={isSubmitting}
                />
                <label htmlFor="contactEmail">{t("form.email")}</label>
              </div>
              <div className="flex items-center">
                <input
                  name="contactPhoneMethod"
                  type="checkbox"
                  id="contactPhone"
                  className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-hot-pink focus:ring-hot-pink"
                  disabled={isSubmitting}
                />
                <label htmlFor="contactPhone">{t("form.phone")}</label>
              </div>
              <div className="flex items-center">
                <input
                  name="contactWhatsappMethod"
                  type="checkbox"
                  id="contactWhatsapp"
                  className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-hot-pink focus:ring-hot-pink"
                  disabled={isSubmitting}
                />
                <label htmlFor="contactWhatsapp">{t("form.whatsapp")}</label>
              </div>
            </div>
          </div>

          {/* Submit and Clear Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-3 px-8 rounded-md text-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : t("form.submit")}
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              disabled={isSubmitting}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-md text-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("form.clear")}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
