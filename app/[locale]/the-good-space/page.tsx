"use client";
import { motion } from "framer-motion";
import Newsletter from "../sections/Newsletter";
import Link from "next/link";
import Image from "next/image";
import { 
  BookOpen, 
  Users, 
  Heart, 
  Target,
  Home,
  Star,
  ArrowRight
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface Workshop {
  _id: string;
  title: string;
  slug: string;
  briefy: string;
  price: number;
  startDate: string;
  endDate: string;
  images?: string[];
  availableSessions?: any[];
  instructors: string[];
  slots: number;
  attendance: any[];
  location?: {
    altText: string;
    link: string;
    moreDescription?: string;
  };
}

export default function TheGoodSpacePage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const res = await fetch("/api/workshops");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setWorkshops(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch workshops", err);
      } finally {
        setLoadingWorkshops(false);
      }
    }
    fetchWorkshops();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4 },
    },
  };

  return (
    <div dir="ltr" className="px-6 md:px-10 lg:px-16 pt-24 md:pt-32 bg-cream font-english overflow-hidden text-left">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-2 md:mb-4 2xl:mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-hot-pink font-bold tracking-widest uppercase text-sm mb-2 block">
            Welcome to
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-english-heading text-carbon mb-2 tracking-tight">
            The Good Space
          </h1>
          <div className="h-2 w-24 bg-hot-pink mx-auto mb-5 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-bold font-english-subheading text-carbon leading-snug mb-2 md:mb-4">
            "Not everyone needs a louder room. Some of us need a better one."
          </p>
          <p className="text-sm md:text-md 2xl:text-lg text-gray-600 leading-relaxed font-english">
            The Good Space is a second home for early-career professionals and creators who are ambitious but tired of pressure. 
            Here, you can grow at your own pace, in a way that feels natural and fulfilling, not rushed or performative.
          </p>
        </motion.div>
      </section>
      {/* Available Workshops Section */}
      <section className="max-w-6xl mx-auto max-md:mt-8 mb-24 px-4 overflow-hidden">
        {/* <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black font-english-heading text-carbon">
            Available Workshops
          </h2>
        </motion.div> */}

        {loadingWorkshops ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[350px] rounded-3xl bg-white border border-gray-100 animate-pulse overflow-hidden flex flex-col">
                <div className="flex-1 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : workshops.length > 0 ? (
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {workshops.map((ws) => {
                const isAvailable = ws.slots > (ws.attendance?.length || 0);
                return (
                <CarouselItem key={ws._id} className="basis-[85%] pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link href={`/en/workshops/${ws.slug}`} className="block group">
                    <article className="h-[450px] md:h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-1 flex flex-col bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 relative">
                        {/* Left: Image */}
                        <div className="relative bg-[#F7EEDB] min-h-[200px] md:min-h-full">
                          {ws.images && ws.images.length > 0 ? (
                            <>
                              <Image
                                src={ws.images[0]}
                                alt={ws.title}
                                fill
                                className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              {ws.images[1] && (
                                <Image
                                  src={ws.images[1]}
                                  alt={`${ws.title} - hover`}
                                  fill
                                  className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full min-h-[220px] md:min-h-[200px] bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
                              <span className="text-5xl text-white/80">🎨</span>
                            </div>
                          )}
                          <div className="absolute inset-y-0 right-0 w-1 bg-white/60 hidden md:block" />
                          
                          {/* Availability Badge */}
                          <div className="absolute top-3 left-3 z-20">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                              isAvailable ? "bg-green-500 text-white" : "bg-orange-500 text-white"
                            }`}>
                              {isAvailable ? "Available" : "Waitlist"}
                            </span>
                          </div>
                        </div>

                        {/* Right: Details */}
                        <div className="relative bg-white py-4 px-5 flex flex-col justify-between overflow-hidden">
                          <div className="flex-1">
                            <h3 className="text-lg font-extrabold leading-tight tracking-tight h-10 overflow-hidden font-english-heading text-left  transition-colors">
                              {ws.title}
                            </h3>
                            <div className="flex flex-col gap-2 mt-2">
                              {/* <time className="text-xs font-medium text-gray-400">
                                {new Date(ws.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                {ws.endDate && new Date(ws.startDate).toDateString() !== new Date(ws.endDate).toDateString() && ` - ${new Date(ws.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                              </time> */}
                              <p className="text-sm line-clamp-3 leading-relaxed font-english text-left text-purple-600">
                                {ws.briefy}
                              </p>
                            </div>
                            {ws.instructors && ws.instructors.length > 0 && (
                              <div className="mt-2 flex items-center gap-1.5">
                                <span className="text-[10px] text-gray-400 font-medium">With</span>
                                <span className="text-xs font-bold text-carbon">{ws.instructors.join(" & ")}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] md:text-xs text-gray-400 font-bold mt-2">
                            {ws.availableSessions?.length || 0} {ws.availableSessions?.length === 1 ? "Session" : "Sessions"}
                          </p>
                        </div>
                      </div>

                      {/* Bottom CTA section */}
                      <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/logos/TGN_LOGOS_PNG-03.png"
                            alt="TGN"
                            width={50}
                            height={20}
                            className="object-contain opacity-70"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-white bg-pink-500 rounded-full px-4 py-4 group-hover:bg-pink-600 transition-colors">
                          <span className="text-xs font-bold uppercase tracking-wider">More Details</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="bg-white hover:bg-hot-pink hover:text-white border-none shadow-md -left-4" />
              <CarouselNext className="bg-white hover:bg-hot-pink hover:text-white border-none shadow-md -right-4" />
            </div>
          </Carousel>
        ) : (
          <p className="text-center text-gray-500 font-english py-10">Check back soon for upcoming sessions!</p>
        )}
      </section>
      {/* Intro Context */}
      <section className="max-w-4xl mx-auto mb-24 px-6 md:px-12 py-12 bg-hot-pink rounded-[2rem] border-2 border-dashed border-hot-pink/10 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-24 h-24 bg-hot-pink/5 rounded-full -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-hot-pink/5 rounded-full translate-x-16 translate-y-16"></div>
        
        <div className="flex justify-center  relative z-10">
          <div className="relative w-80 h-80">
            <Image
              src="/mounir/TGN_ELEMENTS_PNG-08.png"
              alt="Decorative Element"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-lg md:text-xl text-carbon leading-relaxed text-center relative z-10">
          More than a workspace or event space, The Good Space is about people, practice, and connections. 
          It’s a calm, intentional space where relationships grow and creativity is supported. 
          Here, we grow together steadily, intentionally, and with good company.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black font-english-heading text-carbon mb-4">
            What we do
          </h2>
          {/* <p className="text-hot-pink font-semibold">Purposeful growing, together</p> */}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-hot-pink/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/assets/TGN_ELEMENTS_PNG-43.png"
                alt="Workshops"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-carbon mb-4 font-english-heading">
              Workshops & Learning Sessions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Practical sessions where you learn how to grow into the skilled, ethical creators and professionals you’ve always wanted to become.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-hot-pink/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/assets/TGN_ELEMENTS_PNG-46.png"
                alt="Connections"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-carbon mb-4 font-english-heading">
              Real Connections & Gatherings
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Space to meet, connect, and build relationships that actually matter.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-hot-pink/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/assets/TGN_ELEMENTS_PNG-48.png"
                alt="Experiences"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-carbon mb-4 font-english-heading">
              Co-Created Experiences
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Opportunities to help shape, host, and eventually lead sessions, giving you a real sense of ownership and shared growth.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-hot-pink/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/assets/TGN_ELEMENTS_PNG-45.png"
                alt="Mentorship"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-carbon mb-4 font-english-heading">
              Learning from People You Look Up To
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access to mentors, facilitators, and leaders who share The Good Space’s values and offer guidance and inspiration.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Pilot Phase Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <div className="bg-white text-black rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hot-pink/10 rounded-full translate-x-32 -translate-y-32"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hot-pink/20 rounded-full text-hot-pink font-bold text-sm mb-6">
                <Home size={16} />
                PILOT PHASE
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-english-heading mb-6 tracking-tight">
                Our First Home
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-english italic">
                "The Good Space begins at B87 Coworking Space, our first home, a space to meet, create, and learn together. While it starts here, The Good Space grows wherever our community comes together."
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <div className="absolute inset-0 bg-hot-pink-dark rounded-full animate-pulse blur-3xl opacity-20"></div>
                  <div className="relative z-10 w-full h-full border-4 border-hot-pink rounded-full flex items-center justify-center p-8 bg-carbon shadow-2xl">
                     <div className="text-center">
                        <span className="block text-4xl md:text-5xl font-black text-white">B87</span>
                        <span className="block text-hot-pink font-bold mt-1">SPACE</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Belief Section */}
      <section className="max-w-4xl mx-auto mb-24 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="relative"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10">
            <Target size={120} className="text-hot-pink" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black font-english-heading text-carbon mb-12 relative z-10">
            Our Belief
          </h2>

          <div className="space-y-6">
            <motion.div 
               whileHover={{ x: 10 }}
               className="bg-white p-6 rounded-2xl border-l-8 border-hot-pink text-xl md:text-2xl font-bold text-carbon text-left shadow-sm"
            >
              Growth doesn’t have to be loud to be real.
            </motion.div>
            <motion.div 
               whileHover={{ x: -10 }}
               className="bg-white p-6 rounded-2xl border-r-8 border-hot-pink text-xl md:text-2xl font-bold text-carbon text-right shadow-sm"
            >
              A community doesn’t have to be big to be powerful.
            </motion.div>
            <motion.div 
               className="bg-hot-pink p-8 rounded-2xl text-2xl md:text-4xl font-black text-white shadow-xl transform skew-y-1"
            >
              The Good Space is where good people grow — together.
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Newsletter */}
      {/* <section className="max-w-6xl mx-auto mb-16 px-4">
        <Newsletter />
      </section> */}
    </div>
  );
}