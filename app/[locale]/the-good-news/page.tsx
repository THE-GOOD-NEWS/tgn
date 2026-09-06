import { Metadata } from "next";
import HeroGif from "../sections/HeroGif";
import Quote from "../components/Quote";
import ArticlesSection from "../sections/ArticlesSection";
import Testimonials from "../sections/testomonials/Testimonials";
import Billion from "../sections/Billion";

export const metadata: Metadata = {
  title: "THE GOOD NEWS",
  description:
    "Join our community of readers sharing positive stories. Access exclusive content, premium articles, and connect with like-minded individuals.",
};

export default function TheGoodNewsPage() {
  return (
    <div className="min-h-screen bg-cream overflow-hidden">
      <main className="w-full flex flex-col items-center">
        <HeroGif />
        <Quote />
        <ArticlesSection />
        <Testimonials />
        <Billion />
      </main>
    </div>
  );
}
