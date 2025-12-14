import { useLocale, useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | THE GOOD NEWS",
  description: "Privacy Policy for The Good News",
};

export default function PrivacyPage() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("privacyPolicy");

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="container mx-auto px-4 pt-28 md:pt-40 pb-12 max-w-4xl min-h-[60vh]"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
        {t("title")}
      </h1>

      <div className="space-y-8 bg-card p-6 rounded-lg shadow-sm border">
        <section>
          <p className="text-lg leading-relaxed">{t("description")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            {t("collection.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("collection.content")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            {t("usage.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("usage.content")}
          </p>
        </section>
      </div>
    </div>
  );
}
