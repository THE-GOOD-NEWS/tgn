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
import LoadingGIF from "./loading";

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
  pendingRequests?: number;
  location?: {
    altText: string;
    link: string;
    moreDescription?: string;
  };
  status?: string;
}

export default function TheGoodSpacePage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [packages, setPackages] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

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

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/workshop-packages");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setPackages(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setLoadingPackages(false);
      }
    }
    fetchPackages();
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

//  workshops.length > 0 ?  
!loadingWorkshops ?
   <div className="theme-good-space bg-background min-h-screen">
    <div dir="ltr" className="px-6 md:px-10 lg:px-16 pt-24 md:pt-32 font-english overflow-hidden text-left bg-background">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-2 md:mb-4 2xl:mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
            Welcome to
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-english-heading text-primary mb-2 tracking-tight">
            The Good Space
          </h1>
          <div className="h-2 w-24 bg-primary mx-auto mb-5 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-bold font-english-subheading text-foreground leading-snug mb-2 md:mb-4">
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
                const isAvailable = ws.slots > (ws.attendance?.length || 0) + (ws.pendingRequests || 0);
                return (
                <CarouselItem key={ws._id} className="basis-[85%] pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link href={`/en/the-good-space/${ws.slug}`} className="block group">
                    <article className="h-[450px] md:h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border hover:border-primary/20 hover:-translate-y-1 flex flex-col bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 relative">
                        {/* Left: Image */}
                        <div className="relative bg-secondary/10 min-h-[200px] md:min-h-full">
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
                          <div className="absolute inset-y-0 right-0 w-1 bg-white/30 hidden md:block" />
                          
                          {/* Availability Badge */}
                          <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 items-center">
                            {ws.status === "coming soon" ? (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm bg-orange-500 text-white">
                                Coming Soon
                              </span>
                            ) : (
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                                isAvailable ? "bg-muted text-white" : "bg-accent text-white"
                              }`}>
                                {isAvailable ? "Available" : "Waitlist"}
                              </span>
                            )}
                            {ws.price === 0 && (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm bg-emerald-600 text-white">
                                Free
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right: Details */}
                        <div className="relative bg-accent/40 py-4 px-5 flex flex-col justify-between overflow-hidden">
                          <div className="flex-1">
                            <h3 className="text-lg text-primary font-extrabold leading-tight tracking-tight h-10 overflow-hidden font-english-heading text-left  transition-colors">
                              {ws.title}
                            </h3>
                            <div className="flex flex-col gap-2 mt-2">
                              {/* <time className="text-xs font-medium text-gray-400">
                                {new Date(ws.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                {ws.endDate && new Date(ws.startDate).toDateString() !== new Date(ws.endDate).toDateString() && ` - ${new Date(ws.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                              </time> */}
                              <p className="text-sm line-clamp-3 leading-relaxed font-english text-left text-primary/80">
                                {ws.briefy}
                              </p>
                            </div>
                            {ws.instructors && ws.instructors.length > 0 && (
                              <div className="mt-2 flex items-center gap-1.5">
                                <span className="text-[10px] text-muted-foreground font-medium">With</span>
                                <span className="text-xs font-bold text-foreground">{ws.instructors.join(" & ")}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-[10px] md:text-xs text-gray-400 font-bold">
                              {ws.availableSessions?.length || 0} {ws.availableSessions?.length === 1 ? "Session" : "Sessions"}
                            </p>
                            {ws.price === 0 && (
                              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                                Free
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom CTA section */}
                      <div className="bg-accent/50 border-t border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/goodSpace/1.png"
                            alt="Logo"
                            width={50}
                            height={20}
                            className="object-contain opacity-70"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-primary-foreground bg-primary rounded-full px-4 py-4 group-hover:bg-primary/90 transition-colors">
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
              <CarouselPrevious className="bg-white hover:bg-primary hover:text-white border-none shadow-md -left-4" />
              <CarouselNext className="bg-white hover:bg-primary hover:text-white border-none shadow-md -right-4" />
            </div>
          </Carousel>
        ) : (
          <p className="text-center text-gray-500 font-english py-10">Check back soon for upcoming sessions!</p>
        )}
      </section>



      {/* Workshop Packages Section */}
      <section className="max-w-6xl mx-auto mb-24 px-4 overflow-hidden">
        {loadingPackages ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-[350px] rounded-3xl bg-white border border-gray-100 animate-pulse overflow-hidden flex flex-col">
                <div className="flex-1 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : packages.length > 0 ? (
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {packages.map((pkg) => (
                <CarouselItem key={pkg._id} className="basis-[85%] pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link href={`/en/the-good-space/packages/${pkg.slug}`} className="block group">
                    <article className="h-[450px] md:h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border hover:border-primary/20 hover:-translate-y-1 flex flex-col bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 relative">
                        {/* Left: Image */}
                        <div className="relative bg-secondary/10 min-h-[200px] md:min-h-full overflow-hidden">
                          {pkg.thumbnail ? (
                            <Image
                              src={pkg.thumbnail}
                              alt={pkg.title}
                              fill
                              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full min-h-[220px] md:min-h-[200px] bg-gradient-to-br from-yellow-400 via-red-400 to-pink-400 flex items-center justify-center">
                              <span className="text-5xl text-white/80">📦</span>
                            </div>
                          )}
                          <div className="absolute inset-y-0 right-0 w-1 bg-white/30 hidden md:block" />
                                                      <div className="absolute top-3 left-3 z-20">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                             "bg-primary text-white"
                            }`}>
                              Package
                            </span>
                          </div>

                        </div>

                        {/* Right: Details */}
                        <div className="relative bg-secondary/40 py-4 px-5 flex flex-col justify-between overflow-hidden">
                          <div className="flex-1">
                            <h3 className="text-lg text-muted font-extrabold leading-tight tracking-tight h-10 overflow-hidden font-english-heading text-left transition-colors">
                              {pkg.title}
                            </h3>
                            <div className="flex flex-col gap-2 mt-2">
                              <p className="text-sm line-clamp-3 leading-relaxed font-english text-left text-muted/80">
                                {pkg.description}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-gray-800 mt-2">
                            {pkg.price} EGP
                          </p>
                        </div>
                      </div>

                      {/* Bottom CTA section */}
                      <div className="bg-secondary/50 border-t border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/goodSpace/logos/9.png"
                            alt="Logo"
                            width={50}
                            height={20}
                            className="object-contain opacity-70"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-primary-foreground bg-muted rounded-full px-4 py-4 group-hover:bg-muted transition-colors">
                          <span className="text-xs font-bold uppercase tracking-wider">Select Package</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="bg-white hover:bg-primary hover:text-white border-none shadow-md -left-4" />
              <CarouselNext className="bg-white hover:bg-primary hover:text-white border-none shadow-md -right-4" />
            </div>
          </Carousel>
        ) : null}
      </section>
      
      {/* Intro Context */}
      <section className="max-w-4xl mx-auto mb-24 px-6 md:px-12 py-12 bg-primary/10 rounded-[2rem] border-2 border-dashed border-primary/20 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-16 translate-y-16"></div>
        
        <div className="flex justify-center  relative z-10">
          <div className="relative w-80 h-80">
            <Image
              src="/goodSpace/2- MOUNIR.png"
              alt="Decorative Element"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-lg md:text-xl text-foreground leading-relaxed text-center relative z-10">
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
          <h2 className="text-4xl md:text-5xl font-black font-english-heading text-foreground mb-4">
            What we do
          </h2>
          {/* <p className="text-primary font-semibold">Purposeful growing, together</p> */}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/goodSpace/6.png"
                alt="Workshops"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 font-english-heading">
              Workshops & Learning Sessions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Practical sessions where you learn how to grow into the skilled, ethical creators and professionals you’ve always wanted to become.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/goodSpace/11.png"
                alt="Connections"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 font-english-heading">
              Real Connections & Gatherings
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Space to meet, connect, and build relationships that actually matter.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/goodSpace/23.png"
                alt="Experiences"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 font-english-heading">
              Co-Created Experiences
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Opportunities to help shape, host, and eventually lead sessions, giving you a real sense of ownership and shared growth.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={item} className="bg-white flex flex-col justify-between items-center p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10">
            <div className="w-32 h-32 relative mb-2">
              <Image
                src="/goodSpace/7.png"
                alt="Mentorship"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 font-english-heading">
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-32 -translate-y-32"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary font-bold text-sm mb-6">
                <Home size={16} />
                PILOT PHASE
              </div>
              <h2 className="text-4xl md:text-5xl text-primary font-english-heading mb-6 tracking-tight">
                Our First Home
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-english italic">
                "The Good Space begins at B87 Coworking Space, our first home, a space to meet, create, and learn together. While it starts here, The Good Space grows wherever our community comes together."
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <Link href="https://b87spaces.com/" target="_blank" className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image
                    src="/goodSpace/b87/B87Artboard 1.png"
                    alt="B87 Logo"
                    fill
                    className="object-contain"
                  />
               </Link>
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
            <Target size={120} className="text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black font-english-heading text-foreground mb-12 relative z-10">
            Our Belief
          </h2>

          <div className="space-y-6">
            <motion.div 
               whileHover={{ x: 10 }}
               className="bg-white p-6 rounded-2xl border-l-8 border-primary text-xl md:text-2xl font-bold text-foreground text-left shadow-sm"
            >
              Growth doesn’t have to be loud to be real.
            </motion.div>
            <motion.div 
               whileHover={{ x: -10 }}
               className="bg-white p-6 rounded-2xl border-r-8 border-primary text-xl md:text-2xl font-bold text-foreground text-right shadow-sm"
            >
              A community doesn’t have to be big to be powerful.
            </motion.div>
            <motion.div 
               className="bg-primary p-8 rounded-2xl text-2xl md:text-4xl font-black text-primary-foreground shadow-xl transform skew-y-1"
            >
              The Good Space is where good people grow — together.
            </motion.div>
          </div>
        </motion.div>
      </section>



      {/* Be a Facilitator with Us Section */}
      <section className="max-w-6xl mx-auto mb-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary/70 to-primary-foreground p-10 md:p-16 text-white shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -translate-x-32 translate-y-32 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-xs tracking-widest uppercase mb-6">
                <Star size={14} className="fill-current" />
                Join Our Creative Circle
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-english-heading mb-6 leading-tight">
                Be a facilitator <br />
                <span className="text-white/80">with us</span>
              </h2>
              <p className="text-xl text-white/90 leading-relaxed mb-10 max-w-xl font-english">
                Do you have a skill, a story, or a practice you want to share? 
                We are looking for creators and mentors who value growth as much as we do.
              </p>
              <Link 
                href="/en/the-good-space/be-facilitator"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-full font-black text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-xl group"
              >
                Apply Now
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
            
            <div className=" md:w-1/3 hidden md:flex justify-center relative">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <Image
                  src="/goodSpace/7.png"
                  alt="Be a Facilitator"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Newsletter */}
      {/* <section className="max-w-6xl mx-auto mb-16 px-4">
        <Newsletter />
      </section> */}
    </div>
    </div>
    :<LoadingGIF/>

  );
}