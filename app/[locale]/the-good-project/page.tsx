import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MetricsCards from "@/app/[locale]/goodIntern/components/MetricsCards";

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

export default async function TheGoodProjectPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("nav.theGoodProject");
  const tJoin = await getTranslations("joinTheGoodProject");
  const isArabic = locale === "ar";
  const instagramUrl = "https://www.instagram.com/reels/DXce9d5DM81/";

  const descriptionParagraphs = t("description").split("\n\n");

  return (
    <div className="bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* Section 1: Story Behind / Hero */}
      <section className="mx-auto max-w-7xl min-h-screen flex items-center justify-center h-auto px-4 sm:px-6 py-12 pt-20 md:pt-28">
        <div className="grid md:grid-cols-2 gap-10 items-center w-full">
          <div className={isArabic ? "text-right" : "text-left"}>
            <h1 className="font-black uppercase tracking-tight leading-tight text-3xl sm:text-5xl text-black">
              {t("storyTitle")}
            </h1>
            <div className="mt-4">
              <Image
                src="/tgp/tgpLogocropped.png"
                width={420}
                height={120}
                alt={t("title")}
                className="h-auto w-auto"
                priority
              />
            </div>
          </div>
          <div className="md:justify-self-end w-full max-w-xl">
            <div className="rounded-3xl p-[2px] bg-gradient-to-br from-fuchsia-500 to-yellow-400">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                {descriptionParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`text-sm sm:text-base text-gray-700 leading-relaxed ${idx > 0 ? "mt-4" : ""
                      }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Metrics & Media Embed */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className={isArabic ? "text-right" : "text-left"}>
              <h2
                className={`${isArabic ? "font-arabic-header" : "font-english-header"
                  } font-extrabold uppercase text-2xl sm:text-4xl text-black`}
              >
                {t("stats.title")}
              </h2>


              <div className="mt-8">
                <MetricsCards
                  isRTL={isArabic}
                  metrics={[
                    {
                      value: t("stats.audienceVal"),
                      label: t("stats.audienceLabel"),
                    },
                    {
                      value: t("stats.projectsVal"),
                      label: t("stats.projectsLabel"),
                    },
                    {
                      value: t("stats.universitiesVal"),
                      label: t("stats.universitiesLabel"),
                    },
                    {
                      value: t("stats.studentsVal"),
                      label: t("stats.studentsLabel"),
                    },
                  ]}
                />
              </div>
              <p className="mt-4 text-gray-700 sm:max-w-xl">
                {t("partnerCta.text")}
              </p>
              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <Link href={`/${locale}/the-good-project/join`}>
                  <Button className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-6 px-10 text-lg rounded-full transition-transform hover:scale-105 shadow-lg">
                    {tJoin("title")}
                  </Button>
                </Link>
                <Link href={`/${locale}/contact/partner`}>
                  <Button
                    variant="outline"
                    className="border-2 border-hot-pink text-hot-pink hover:bg-hot-pink/10 font-bold py-6 px-10 text-lg rounded-full transition-transform hover:scale-105 shadow-lg"
                  >
                    {t("partnerCta.button")}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* <div
                className={`-top-4 ${isArabic
                  ? "-left-2 font-arabic-header"
                  : "-right-2 font-english-heading"
                  } px-8 py-4 bg-pink-500 text-white text-xl md:text-2xl font-black uppercase rounded-lg shadow inline-block mb-4`}
              >
                {t("title")}
              </div> */}

              <div className="rounded-2xl bg-white p-4 shadow-xl border border-gray-100 flex justify-center">
                <iframe
                  src={getInstagramEmbedUrl(instagramUrl)}
                  className="w-full max-w-[380px] aspect-[9/16] min-h-[540px] border-none rounded-xl bg-white mx-auto"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

