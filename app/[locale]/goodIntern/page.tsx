import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MetricsCards from "./components/MetricsCards";

type Props = {
  params: Promise<{ locale: string }>;
};

function getInstagramEmbedUrl(src: string): string {
  try {
    const url = new URL(src);
    const parts = url.pathname.split("/").filter(Boolean);
    const pIndex = parts.indexOf("p");
    const reelIndex = parts.indexOf("reel");
    const reelsIndex = parts.indexOf("reels");

    let type: "p" | "reel" | undefined;
    let shortcode: string | undefined;

    if (pIndex !== -1 && parts[pIndex + 1]) {
      type = "p";
      shortcode = parts[pIndex + 1];
    } else if (reelIndex !== -1 && parts[reelIndex + 1]) {
      type = "reel";
      shortcode = parts[reelIndex + 1];
    } else if (reelsIndex !== -1 && parts[reelsIndex + 1]) {
      type = "reel";
      shortcode = parts[reelsIndex + 1];
    }

    return type && shortcode
      ? `https://www.instagram.com/${type}/${shortcode}/embed/`
      : src;
  } catch {
    return src;
  }
}

export default async function GoodInternPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("goodIntern");
  const isArabic = locale === "ar";

  const yallaEmbedUrl = getInstagramEmbedUrl(
    "https://www.instagram.com/p/DaGG18gCj8O/?img_index=1"
  );
  const arabYouthEmbedUrl = getInstagramEmbedUrl(
    "https://www.instagram.com/reels/CtZTVSmgLOs/"
  );

  return (
    <div className="bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* Section 1: Story Behind / Hero */}
      <section className="mx-auto max-w-7xl min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 pt-20 md:pt-28 lg:pt-36">
        <div className="grid md:grid-cols-2 gap-10 items-center w-full">
          <div className={isArabic ? "text-right" : "text-left"}>
            <h1 className="font-black uppercase tracking-tight leading-tight text-3xl sm:text-5xl text-black">
              {t("storyTitle")}
            </h1>
            <div className=" flex items-center justify-center">
              <Image
                src="/goodIntern/ForsaHelwaFinal(5).png"
                width={480}
                height={240}
                alt={t("hero.logoAlt")}
                className="h-auto w-auto max-w-full max-h-64 object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-base sm:text-lg text-gray-600 font-medium">
              {t("subtitle")}
            </p>
          </div>
          <div className="md:justify-self-end w-full max-w-xl">
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

      {/* Section 2: Metrics */}
      <section className="border-t bg-gray-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-extrabold uppercase text-2xl sm:text-4xl text-black">
              {t("metrics.title")}
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <MetricsCards
              isRTL={isArabic}
              metrics={[
                { value: "85+", label: t("metrics.opportunities") },
                { value: "15K+", label: t("metrics.applicants") },
                { value: "2M+", label: t("metrics.reach") },
                { value: "25%+", label: isArabic ? "معدل تحويل التسجيلات" : "Sign-up Conversion" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Campaigns & Instagram Embeds */}
      <section className="border-t py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-extrabold uppercase text-2xl sm:text-4xl text-black mb-10 text-center">
            {t("campaigns.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            {/* Card 1: Yalla Success */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 font-bold rounded-full text-xs uppercase tracking-wider mb-3">
                  {t("campaigns.yallaSuccess.title")}
                </span>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                  {t("campaigns.yallaSuccess.description")}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-3 flex justify-center border border-gray-100 overflow-hidden">
                <iframe
                  src={yallaEmbedUrl}
                  className="w-full max-w-[360px] aspect-[9/14] min-h-[480px] border-none rounded-xl bg-white"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>

            {/* Card 2: Arab Youth Center */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-600 font-bold rounded-full text-xs uppercase tracking-wider mb-3">
                  {t("campaigns.arabYouthCenter.title")}
                </span>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                  {t("campaigns.arabYouthCenter.description")}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-3 flex justify-center border border-gray-100 overflow-hidden">
                <iframe
                  src={arabYouthEmbedUrl}
                  className="w-full max-w-[360px] aspect-[9/14] min-h-[480px] border-none rounded-xl bg-white"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Partner CTA */}
      <section className="border-t bg-gradient-to-br from-pink-50 via-amber-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 sm:p-12 shadow-xl border border-pink-100">
            <h2 className="font-extrabold uppercase text-2xl sm:text-3xl text-black mb-4">
              {isArabic ? "شريكنا القادم؟" : "Partner With Us"}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {t("partnerCta.text")}
            </p>
            <Link href={`/${locale}/contact/partner`}>
              <Button className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-6 px-10 text-lg rounded-full transition-transform hover:scale-105 shadow-lg">
                {t("partnerCta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
