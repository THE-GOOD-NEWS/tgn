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
  const isFree = type === "free";

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center  pt-20 md:pt-36 px-6 pb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl py-2 px-4 md:py-4 md:px-8 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-hot-pink/5 rounded-full -translate-x-12 -translate-y-12 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full translate-x-12 translate-y-12 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-40 h-40  relative"
          >
            {isWaitlist ? (
              <div className="w-full h-full relative">
                <Image
                  src="/mounir/TGN_ELEMENTS_PNG-08.png"
                  alt="Waitlist"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src="/mounir/TGN_ELEMENTS_PNG-06.png"
                  alt="Success"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black font-english-heading text-carbon mb-4 tracking-tight">
            {isWaitlist ? "Request Received" : "Thank You!"}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-english mb-10 max-w-lg">
            {isWaitlist 
              ? "Your request for the waiting list has been submitted successfully. We'll notify you if a slot becomes available!"
              : isFree
              ? "Your registration request for the workshop has been submitted. We are reviewing your details; we will send you a confirmation email soon!"
              : "Your booking request for the workshop has been submitted. We are reviewing your payment and details; we will send you a confirmation email soon!"
            }
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Link href="/en/the-good-space" className="flex items-center justify-center gap-2 px-8 py-4 bg-carbon text-black rounded-full font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] shadow-lg">
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Workshops
            </Link>
            <Link href="/en" className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-carbon rounded-full font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] shadow-sm">
              <Home className="w-5 h-5 text-hot-pink" />
              Go Home
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-4 ">
            <Image
              src="/logos/TGN_LOGOS_PNG-03.png"
              alt="TGN Logo"
              width={100}
              height={80}
              className="object-contain"
            />
            {/* <div className="h-4 w-px bg-gray-300"></div> */}
            {/* <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              The Good News
            </p> */}
          </div>
        </div>
      </motion.div>

      {/* Footer link */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-gray-500 text-sm font-medium flex items-center gap-2"
      >
        <Globe className="w-4 h-4 text-hot-pink" />
        Explore more about <Link href="/en/the-good-space" className="text-hot-pink hover:underline font-bold underline-offset-4 decoration-2">The Good Space</Link>
      </motion.p>
    </div>
  );
}

export default function WorkshopSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center pt-40">
        <div className="w-12 h-12 border-4 border-hot-pink border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
