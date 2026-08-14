import { Metadata } from "next";
import { TGMGHero } from "./sections/tgmg/TGMGHero";
import { OurStory } from "./sections/tgmg/OurStory";
import { HOPEFramework } from "./sections/tgmg/HOPEFramework";
import { Ecosystem } from "./sections/tgmg/Ecosystem";
import { Products } from "./sections/tgmg/Products";
import { PartnerSolutions } from "./sections/tgmg/PartnerSolutions";
import { PartnerCaseStudies } from "./sections/tgmg/PartnerCaseStudies";
import { TrustedByMarquee } from "./sections/tgmg/TrustedByMarquee";
import { ImpactMetrics } from "./sections/tgmg/ImpactMetrics";
import { TGMGCTA } from "./sections/tgmg/TGMGCTA";

export const metadata: Metadata = {
  title: "The Good Media Group (TGMG) | Youth Ecosystem & Media",
  description:
    "A modern youth online and offline ecosystem creating stories, communities, and experiences that drive impact across the MENA region.",
};

export default function TGMGHomePage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <main className="w-full flex flex-col">
        <TGMGHero />
        <Ecosystem />
        <HOPEFramework />
        <Products />
        <PartnerSolutions />
        <PartnerCaseStudies />
        <TrustedByMarquee />
        <ImpactMetrics />
        <TGMGCTA />
      </main>
    </div>
  );
}
