export const SUBSCRIPTION_PLANS = {
  monthly: {
    id: "monthly",
    name: "Monthly Plan",
    price: 9.99,
    interval: "month",
    features: [
      "Access to exclusive articles",
      "Premium video content",
      "Community access",
      "Priority support",
    ],
  },
  yearly: {
    id: "yearly",
    name: "Yearly Plan",
    price: 99.99,
    interval: "year",
    features: [
      "Access to exclusive articles",
      "Premium video content",
      "Community access",
      "Priority support",
      "Save 20% compared to monthly",
    ],
  },
} as const;

export const ARTICLE_CATEGORIES = {
  en: [
    { id: "1", name: "Technology", slug: "technology", color: "#3B82F6" },
    {
      id: "2",
      name: "Health & Wellness",
      slug: "health-wellness",
      color: "#10B981",
    },
    { id: "3", name: "Environment", slug: "environment", color: "#059669" },
    { id: "4", name: "Education", slug: "education", color: "#7C3AED" },
    { id: "5", name: "Community", slug: "community", color: "#F59E0B" },
    { id: "6", name: "Innovation", slug: "innovation", color: "#EF4444" },
    { id: "7", name: "Egypt", slug: "egypt", color: "#2563EB" },
    { id: "8", name: "UAE", slug: "uae", color: "#2563EB" },
    { id: "9", name: "Saudi", slug: "saudi", color: "#2563EB" },
    { id: "10", name: "Society", slug: "society", color: "#F59E0B" },
    { id: "11", name: "Business", slug: "business", color: "#1F2937" },
    { id: "12", name: "Sports", slug: "sports", color: "#22C55E" },
    {
      id: "13",
      name: "Entertainment",
      slug: "entertainment",
      color: "#EC4899",
    },
    { id: "14", name: "Lifestyle", slug: "lifestyle", color: "#EAB308" },
    {
      id: "15",
      name: "Sustainability",
      slug: "sustainability",
      color: "#10B981",
    },
    { id: "16", name: "Events", slug: "events", color: "#3B82F6" },
    { id: "17", name: "The Good Opportunity", slug: "intern", color: "#374151" },
    { id: "18", name: "Workshops", slug: "workshops", color: "#7C3AED" },
    { id: "19", name: "Programs", slug: "programs", color: "#6B7280" },
    { id: "20", name: "Scholarships", slug: "scholarships", color: "#0EA5E9" },
  ],
  ar: [
    { id: "1", name: "التكنولوجيا", slug: "technology", color: "#3B82F6" },
    {
      id: "2",
      name: "الصحة والعافية",
      slug: "health-wellness",
      color: "#10B981",
    },
    { id: "3", name: "البيئة", slug: "environment", color: "#059669" },
    { id: "4", name: "التعليم", slug: "education", color: "#7C3AED" },
    { id: "5", name: "المجتمع", slug: "community", color: "#F59E0B" },
    { id: "6", name: "الابتكار", slug: "innovation", color: "#EF4444" },
    { id: "7", name: "مصر", slug: "egypt", color: "#2563EB" },
    { id: "8", name: "الإمارات", slug: "uae", color: "#2563EB" },
    { id: "9", name: "السعودية", slug: "saudi", color: "#2563EB" },
    { id: "10", name: "المجتمع", slug: "society", color: "#F59E0B" },
    { id: "11", name: "الأعمال", slug: "business", color: "#1F2937" },
    { id: "12", name: "الرياضة", slug: "sports", color: "#22C55E" },
    { id: "13", name: "الترفيه", slug: "entertainment", color: "#EC4899" },
    { id: "14", name: "أسلوب الحياة", slug: "lifestyle", color: "#EAB308" },
    { id: "15", name: "الاستدامة", slug: "sustainability", color: "#10B981" },
    { id: "16", name: "الفعاليات", slug: "events", color: "#3B82F6" },
    { id: "17", name: "فرصة حلوة", slug: "intern", color: "#374151" },
    { id: "18", name: "ورش العمل", slug: "workshops", color: "#7C3AED" },
    { id: "19", name: "البرامج", slug: "programs", color: "#6B7280" },
    {
      id: "20",
      name: "المنح الدراسية",
      slug: "scholarships",
      color: "#0EA5E9",
    },
  ],
} as const;

export const SAMPLE_ARTICLES = {
  en: [
    {
      id: "1",
      title: "The Future of Sustainable Technology",
      slug: "future-sustainable-technology",
      excerpt:
        "Exploring how green technology is reshaping our world for the better.",
      category: "Technology",
      author: "Dr. Sarah Johnson",
      publishedAt: "2024-01-15",
      featuredImage:
        "https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg",
      isExclusive: false,
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Community Gardens: Growing Together",
      slug: "community-gardens-growing-together",
      excerpt:
        "How neighborhood gardens are bringing communities closer and promoting healthy living.",
      category: "Community",
      author: "Maria Rodriguez",
      publishedAt: "2024-01-12",
      featuredImage:
        "https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg",
      isExclusive: false,
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Mental Health in the Digital Age",
      slug: "mental-health-digital-age",
      excerpt:
        "Understanding and maintaining mental wellness in our connected world.",
      category: "Health & Wellness",
      author: "Dr. Michael Chen",
      publishedAt: "2024-01-10",
      featuredImage:
        "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
      isExclusive: true,
      readTime: "10 min read",
    },
  ],
  ar: [
    {
      id: "4",
      title: "مستقبل التكنولوجيا المستدامة",
      slug: "future-sustainable-technology-ar",
      excerpt: "استكشاف كيف تعيد التكنولوجيا الخضراء تشكيل عالمنا نحو الأفضل.",
      category: "التكنولوجيا",
      author: "د. سارة جونسون",
      publishedAt: "2024-01-15",
      featuredImage:
        "https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg",
      isExclusive: false,
      readTime: "قراءة 5 دقائق",
    },
    {
      id: "5",
      title: "حدائق المجتمع: النمو معاً",
      slug: "community-gardens-ar",
      excerpt: "كيف تقرب حدائق الأحياء المجتمعات وتعزز الحياة الصحية.",
      category: "المجتمع",
      author: "ماريا رودريغيز",
      publishedAt: "2024-01-12",
      featuredImage:
        "https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg",
      isExclusive: false,
      readTime: "قراءة 7 دقائق",
    },
  ],
} as const;

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
