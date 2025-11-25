import Image from "next/image";
import { getTranslations } from "next-intl/server";
import MetricsCards from "./components/MetricsCards";

type Props = {
  params: { locale: string };
};

export default async function GoodInternPage({ params: { locale } }: Props) {
  const t = await getTranslations("goodIntern");
  const isArabic = locale === "ar";

  return (
    <div className="bg-white " dir={isArabic ? "rtl" : "ltr"}>
      {/* Section 1: Story Behind */}
      <section className="mx-auto max-w-7xl min-h-screen flex items-center justify-center h-auto px-4 sm:px-6 ">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className={isArabic ? "text-right" : "text-left"}>
            <h1 className="font-black uppercase tracking-tight leading-tight text-3xl sm:text-5xl">
              {t("storyTitle")}
            </h1>
            <div className="">
              <Image
                src="/goodIntern/goodIntern.png"
                width={420}
                height={120}
                alt={t("hero.logoAlt")}
                className="h-auto w-auto"
                priority
              />
            </div>
          </div>
          <div className="md:justify-self-end">
            <div className="rounded-3xl p-[2px] bg-gradient-to-br from-fuchsia-500 to-yellow-400">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {t("story.p1")}
                </p>
                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {t("story.p2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Campaign + Metrics + Introducing */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className={isArabic ? "text-right" : "text-left"}>
              <h2
                className={`${
                  isArabic ? "font-arabic-header" : "font-english-header"
                } font-extrabold     uppercase text-2xl sm:text-4xl`}
              >
                {t("campaign.title")}
              </h2>
              <p className="mt-4 text-gray-700 sm:max-w-xl">
                {t("campaign.description")}
              </p>

              <h3
                className={`${
                  isArabic
                    ? "font-arabic-subheading"
                    : "font-english-subheading"
                } font-extrabold uppercase tracking-wide text-lg mt-4`}
              >
                {t("metrics.title")}
              </h3>
              <div className="mt-6">
                <MetricsCards
                  isRTL={isArabic}
                  metrics={[
                    { value: "70+", label: t("metrics.internships") },
                    { value: "10K+", label: t("metrics.applicants") },
                    { value: "30K", label: t("metrics.views") },
                    { value: "1M+", label: t("metrics.reach") },
                  ]}
                />
              </div>
            </div>

            <div className="relative">
              <div
                className={` -top-4 ${
                  isArabic
                    ? "-left-2 font-arabic-header"
                    : "-right-2 font-english-heading"
                } px-20 py-10 bg-pink-500 text-white text-2xl font-black uppercase rounded-lg shadow`}
              >
                {t("intro")}
              </div>

              <div className="rounded-2xl  bg-white p-6 ">
                <div className="aspect-[4/3] w-full md:w-1/2 rounded-xl bg-gray-50 grid place-items-center">
                  <a
                    href="https://www.instagram.com/p/DKzh1yziD7i/?img_index=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("hero.logoAlt")}
                    className={
                      isArabic ? "ms-auto inline-block" : "me-auto inline-block"
                    }
                  >
                    <Image
                      src="/goodIntern/goodIntern2.png"
                      alt={t("hero.logoAlt")}
                      width={360}
                      height={200}
                      className="h-auto w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
