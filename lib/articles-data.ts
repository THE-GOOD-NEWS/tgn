export interface Article {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  slug: string;
  excerpt: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  author?: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  publishedAt: string;
  featuredImage?: string;
  isExclusive: boolean;
  readTime: {
    en: string;
    ar: string;
  };
}

// export const sampleArticles: Article[] = [
//   {
//     id: "1",
//     title: {
//       en: "Vanilla chrome is the main manicure of this summer",
//       ar: "الكروم الفانيليا هو مانيكير الصيف الرئيسي"
//     },
//     slug: "vanilla-chrome-manicure-summer-2023",
//     excerpt: {
//       en: "The obsession with shimmering, glittery, and metallic nail shades continues this summer. The original glazed doughnut manicure has transformed into something even more sophisticated and elegant.",
//       ar: "يستمر الهوس بظلال الأظافر اللامعة والبراقة والمعدنية هذا الصيف. تحول مانيكير الدونات المزجج الأصلي إلى شيء أكثر تطوراً وأناقة."
//     },
//     category: {
//       en: "NAILS",
//       ar: "الأظافر"
//     },
//     author: {
//       en: "Jane Cooper",
//       ar: "جين كوبر"
//     },
//     publishedAt: "2023-06-23",
//     featuredImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     isExclusive: false,
//     readTime: {
//       en: "5 min read",
//       ar: "5 دقائق قراءة"
//     }
//   },
//   {
//     id: "2",
//     title: {
//       en: "Exclusive: Billie Eilish on hate, relationship with her own body",
//       ar: "حصري: بيلي إيليش تتحدث عن الكراهية وعلاقتها بجسدها"
//     },
//     slug: "billie-eilish-interview-body-relationship",
//     excerpt: {
//       en: "Singer Billie Eilish believes that people are really multifaceted, and she is, of course, too. 'For most of my life I felt like a boy, I liked being and...'",
//       ar: "تعتقد المغنية بيلي إيليش أن الناس متعددو الأوجه حقاً، وهي بالطبع كذلك أيضاً. 'لمعظم حياتي شعرت وكأنني ولد، أحببت أن أكون و...'"
//     },
//     category: {
//       en: "PERFUMES",
//       ar: "العطور"
//     },
//     author: {
//       en: "Anne Black",
//       ar: "آن بلاك"
//     },
//     publishedAt: "2023-06-21",
//     featuredImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     isExclusive: true,
//     readTime: {
//       en: "8 min read",
//       ar: "8 دقائق قراءة"
//     }
//   },
//   {
//     id: "3",
//     title: {
//       en: "Training that slows down aging",
//       ar: "التدريب الذي يبطئ الشيخوخة"
//     },
//     slug: "anti-aging-training-methods",
//     excerpt: {
//       en: "High-intensity interval training, or HIIT as it's known in gyms around the world, may be the key to today's everyday fitness regimen. Science says...",
//       ar: "قد يكون التدريب المتقطع عالي الكثافة، أو HIIT كما هو معروف في صالات الرياضة حول العالم، هو مفتاح نظام اللياقة البدنية اليومي اليوم. يقول العلم..."
//     },
//     category: {
//       en: "BODY",
//       ar: "الجسم"
//     },
//     author: {
//       en: "Andriy Kanda",
//       ar: "أندري كاندا"
//     },
//     publishedAt: "2023-06-18",
//     featuredImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     isExclusive: false,
//     readTime: {
//       en: "6 min read",
//       ar: "6 دقائق قراءة"
//     }
//   },
//   {
//     id: "4",
//     title: {
//       en: "The Art of Mindful Living in Modern Times",
//       ar: "فن العيش الواعي في العصر الحديث"
//     },
//     slug: "mindful-living-modern-times",
//     excerpt: {
//       en: "In our fast-paced world, finding moments of peace and mindfulness has become more important than ever. Discover practical ways to incorporate mindfulness into your daily routine.",
//       ar: "في عالمنا سريع الخطى، أصبح العثور على لحظات من السلام واليقظة أكثر أهمية من أي وقت مضى. اكتشف طرقاً عملية لدمج اليقظة في روتينك اليومي."
//     },
//     category: {
//       en: "WELLNESS",
//       ar: "العافية"
//     },
//     author: {
//       en: "Sarah Johnson",
//       ar: "سارة جونسون"
//     },
//     publishedAt: "2023-06-20",
//     featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     isExclusive: false,
//     readTime: {
//       en: "7 min read",
//       ar: "7 دقائق قراءة"
//     }
//   },
//   {
//     id: "5",
//     title: {
//       en: "Sustainable Fashion: The Future is Now",
//       ar: "الموضة المستدامة: المستقبل هو الآن"
//     },
//     slug: "sustainable-fashion-future",
//     excerpt: {
//       en: "The fashion industry is undergoing a revolutionary change towards sustainability. Learn about the brands and practices that are leading this transformation.",
//       ar: "تشهد صناعة الأزياء تغييراً ثورياً نحو الاستدامة. تعرف على العلامات التجارية والممارسات التي تقود هذا التحول."
//     },
//     category: {
//       en: "FASHION",
//       ar: "الموضة"
//     },
//     author: {
//       en: "Emma Wilson",
//       ar: "إيما ويلسون"
//     },
//     publishedAt: "2023-06-19",
//     featuredImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     isExclusive: true,
//     readTime: {
//       en: "9 min read",
//       ar: "9 دقائق قراءة"
//     }
//   },
//   {
//     id: "6",
//     title: {
//       en: "Digital Detox: Reclaiming Your Mental Space",
//       ar: "التخلص من السموم الرقمية: استعادة مساحتك الذهنية"
//     },
//     slug: "digital-detox-mental-space",
//     excerpt: {
//       en: "Technology has transformed our lives, but at what cost? Explore the benefits of digital detoxing and how to create healthy boundaries with technology.",
//       ar: "لقد غيرت التكنولوجيا حياتنا، ولكن بأي ثمن؟ استكشف فوائد التخلص من السموم الرقمية وكيفية إنشاء حدود صحية مع التكنولوجيا."
//     },
//     category: {
//       en: "LIFESTYLE",
//       ar: "نمط الحياة"
//     },
//     author: {
//       en: "Michael Chen",
//       ar: "مايكل تشين"
//     },
//     publishedAt: "2023-06-17",
//     featuredImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     isExclusive: false,
//     readTime: {
//       en: "5 min read",
//       ar: "5 دقائق قراءة"
//     }
//   }
// ];
