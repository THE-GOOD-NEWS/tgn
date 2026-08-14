import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale(en|ar)/articles",
        destination: "/:locale/the-good-news/articles",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/articles/:slug*",
        destination: "/:locale/the-good-news/articles/:slug*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/the-good-project",
        destination: "/:locale/the-good-news/the-good-project",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/the-good-project/join",
        destination: "/:locale/the-good-news/the-good-project/join",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/forseHelwa",
        destination: "/:locale/the-good-news/forsa-helwa",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/about/story",
        destination: "/:locale/the-good-news/about/story",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/the-good-news/about",
        destination: "/:locale/the-good-news/about/story",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/about/team/join",
        destination: "/:locale/contact/join-our-team",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
