"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Clock, ArrowRight, Home, Globe } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const isWaitlist = type === "waitlist";
  const isComingSoon = type === "coming soon";
  const isFacilitator = type === "be_facilitator";
  const isFree = type === "free";

  return (
    <div className="min-h-screen theme-good-space bg-background flex flex-col items-center justify-center  pt-20 md:pt-36 px-6 pb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full theme-good-space bg-white/50 backdrop-blur-sm border border-primary/10 rounded-[2.5rem] shadow-2xl py-2 px-4 md:py-4 md:px-8 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-12 -translate-y-12 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-x-12 translate-y-12 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-40 h-40  relative"
          >
            <div className="w-full h-full relative">
              <Image
                src="/goodSpace/1- MOUNIR.png"
                alt="Success"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black font-english-heading text-primary mb-4 tracking-tight text-center">
            {isComingSoon ? "Request Received" : isWaitlist ? "Request Received" : isFacilitator ? "Application Received" : "Thank You!"}
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-english  max-w-lg">
            {isComingSoon 
              ? "Your request has been submitted and we will notify you when it's available"
              : isWaitlist 
              ? "Your request for the waiting list has been submitted successfully. We'll notify you if a slot becomes available!"
              : isFacilitator 
              ? "Your facilitator application has been submitted successfully. We'll review your details and get back to you soon!"
              : isFree
              ? "Your registration request for the workshop has been submitted. We are reviewing your details; we will send you a confirmation email soon!"
              : "Your booking request for the workshop has been submitted. We are reviewing your payment and details; we will send you a confirmation email soon!"
            }
          </p>
          <span className="text-gray-500 text-xs mb-10 md:text-sm ">Please make sure to check your spam folder.</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Link href="/en/the-good-space" className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg">
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to The Good Space
            </Link>
            <Link href="/en" className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary/10 text-primary rounded-full font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] shadow-sm">
              <Home className="w-5 h-5 text-primary" />
              Go Home
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer link */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-foreground/60 text-sm font-medium flex items-center gap-2"
      >
        <Globe className="w-4 h-4 text-primary" />
        Explore more about <Link href="/en/the-good-space" className="text-primary hover:underline font-bold underline-offset-4 decoration-2">The Good Space</Link>
      </motion.p>
    </div>
  );
}

export default function WorkshopSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen theme-good-space bg-background flex items-center justify-center pt-40">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
