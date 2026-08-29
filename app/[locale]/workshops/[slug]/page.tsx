"use client";

import { useEffect, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { toast } from "sonner"; // Using sonner for toasts as found in package.json
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight, X, Maximize2, Copy, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface Session {
  _id?: string;
  title: string;
  sessionStartDate: string;
  startTime?: string;
  duration?: number;
  includes?: string[];
  description?: string;
}

interface Workshop {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  images: string[];
  slots: number;
  attendance: any[];
  availableSessions?: Session[];
  location?: {
    altText: string;
    link: string;
    moreDescription?: string;
  };
  visits: number;
  instructors?: string[];
}

export default function WorkshopDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const iban = "EG420010013400000100070320082";
  const isAvailable = workshop ? workshop.slots > (workshop.attendance?.length || 0) : true;
  const isFree = workshop?.price === 0;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);

    return parts.join(" ");
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    areaOfResidence: "Nasr City",
    howDidYouKnow: "TGN",
    instapayImage: "",
    notes: "",
  });

  const visitedRef = useRef(false);

  useEffect(() => {
    if (visitedRef.current) return;
    visitedRef.current = true;

    async function recordVisit() {
      try {
        await fetch(`/api/workshops/${slug}`, { method: "PATCH" });
      } catch (err) {
        console.error("Error recording visit:", err);
      }
    }
    recordVisit();
  }, [slug]);

  const handleCopyIBAN = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(iban);
      setCopied(true);
      toast.success("IBAN copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nextImage = () => {
    if (workshop && workshop.images) {
      setSelectedImageIndex((prev) =>
        prev === workshop.images.length - 1 ? 0 : (prev || 0) + 1
      );
    }
  };

  const prevImage = () => {
    if (workshop && workshop.images) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? workshop.images.length - 1 : (prev || 0) - 1
      );
    }
  };

  useEffect(() => {
    async function fetchWorkshop() {
      try {
        const res = await fetch(`/api/workshops/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setWorkshop(data.data);
          } else {
            router.push("/en/workshops");
          }
        } else {
          router.push("/en/workshops");
        }
      } catch (err) {
        console.error("Error fetching workshop:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkshop();
  }, [slug, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.age || !formData.areaOfResidence || (!isFree && isAvailable && !formData.instapayImage)) {
      toast.error((!isFree && isAvailable) ? "Please fill all fields and upload the instapay receipt." : "Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/workshops/${slug}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: isAvailable ? "available" : "waitlist",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(
          isAvailable
            ? isFree
              ? "Registration submitted successfully! It is pending admin review."
              : "Booking request submitted successfully! We will review it shortly."
            : "Waiting list request submitted successfully! We will notify you if a slot becomes available."
        );
        router.push(`/en/workshops/success?type=${!isAvailable ? "waitlist" : isFree ? "free" : "booking"}`);
      } else {
        toast.error(data.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during submission.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hot-pink"></div>
      </div>
    );
  }

  if (!workshop) return null;

  return (
    <div className="px-6 md:px-10 bg-cream lg:px-16 pt-28 md:pt-40 pb-20 font-english">
      <div className="max-w-6xl mx-auto grid grid-cols-1 min-h-screen lg:grid-cols-2 gap-12">
        {/* Workshop Details Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-english-heading text-carbon mb-2">
            {workshop.title}
          </h1>
          {workshop.instructors && workshop.instructors.length > 0 && (
            <p className="text-gray-500 font-bold flex items-center gap-2 mb-2">
              <span className="text-sm uppercase tracking-widest opacity-60">With</span>
              <span className="text-lg">{workshop.instructors.join(" & ")}</span>
            </p>
          )}
          {workshop.images && workshop.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {workshop.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  layoutId={`image-${idx}`}
                  onClick={() => setSelectedImageIndex(idx)}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <CldImage
                    src={img}
                    alt={`Workshop preview ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    crop="fill"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white w-8 h-8" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImageIndex !== null && workshop && workshop.images && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                onClick={() => setSelectedImageIndex(null)}
              >
                <button
                  className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(null);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative w-full h-full"
                    >
                      <CldImage
                        src={workshop.images[selectedImageIndex]}
                        alt="Viewing workshop image"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Controls */}
                  {workshop.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all hover:scale-110 z-[110]"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                      <button
                        className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all hover:scale-110 z-[110]"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>

                      {/* Mobile Navigation */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 md:hidden">
                        <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="p-2 text-white">
                          <ChevronLeft className="w-8 h-8" />
                        </button>
                        <span className="text-white font-bold tracking-widest text-sm">
                          {selectedImageIndex + 1} / {workshop.images.length}
                        </span>
                        <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="p-2 text-white">
                          <ChevronRight className="w-8 h-8" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {isAvailable && (
            <div className=" mt-2 md:mt-4  shadow-sm border-b border-gray-800 pb-2">
              <p className="text-gray-600  whitespace-pre-wrap">{new Date(workshop.startDate).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })} - {new Date(workshop.endDate).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}</p>
              <Link className="text-gray-600" href={workshop.location?.link || "#"}><p> {"At" + " " + workshop.location?.altText}</p></Link>
              <p className="text-gray-400">{workshop.location?.moreDescription}</p>
              {isFree ? (
                <div className="flex items-center gap-2 mt-2 mb-2">
                  <span className="text-xl font-semibold">Price:</span>
                  <span className="bg-muted text-white text-sm font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
                    Free
                  </span>
                </div>
              ) : (
                <p className="text-xl font-semibold mt-2 mb-2">Price: {workshop.price} EGP</p>
              )}
              {workshop.availableSessions && workshop.availableSessions.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-semibold text-foreground">Sessions Date:</p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {workshop.availableSessions.map((session, idx) => (
                      <li key={session._id || idx} className="text-sm text-gray-600">
                        <span className="font-medium text-foreground">{session.title}:</span>{" "}
                        {new Date(session.sessionStartDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {session.startTime && ` at ${session.startTime}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <Accordion type="single" collapsible className="w-full space-y-1 md:space-y-2 ">
            {/* 1. Description */}
            <AccordionItem value="description" className=" shadow-sm border-b border-black overflow-hidden ">
              <AccordionTrigger className="text-xl font-bold font-english-heading hover:no-underline hover:text-hot-pink transition-colors">
                Description
              </AccordionTrigger>
              <AccordionContent className="pb-1 md:pb-2">
                <p className="text-gray-600 whitespace-pre-wrap mt-2">{workshop.description}</p>
              </AccordionContent>
            </AccordionItem>

            {/* 2. Sessions */}
            {workshop.availableSessions && workshop.availableSessions.length > 0 && (
              <AccordionItem value="sessions" className="  shadow-sm border-b border-black overflow-hidden ">
                <AccordionTrigger className="text-xl font-bold font-english-heading hover:no-underline hover:text-hot-pink transition-colors">
                  Sessions
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <Accordion type="single" collapsible className="w-full space-y-4 mt-2">
                    {workshop.availableSessions.map((session, idx) => (
                      <AccordionItem
                        key={session._id || idx.toString()}
                        value={session._id || idx.toString()}
                        className=" shadow-sm   overflow-hidden "
                      >
                        <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline hover:text-hot-pink transition-colors">
                          {session.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-semibold text-carbon">Date:</span>{" "}
                            {new Date(session.sessionStartDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                            {session.startTime && ` at ${session.startTime}`}
                          </p>
                          {session.duration && session.duration > 0 && (
                            <p>
                              <span className="font-semibold text-carbon">Duration:</span> {formatDuration(session.duration)}
                            </p>
                          )}
                          {session.includes && session.includes.length > 0 && (
                            <div className="mt-2">
                              <span className="font-semibold text-carbon">Includes:</span>
                              <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                                {session.includes.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {session.description && (
                            <p className="mt-3 text-gray-700">{session.description}</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* 3. Refund Policy */}
            <AccordionItem value="refund-policy" className=" shadow-sm border-b border-black overflow-hidden ">
              <AccordionTrigger className="text-xl font-bold font-english-heading hover:no-underline hover:text-hot-pink transition-colors">
                Refund Policy
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600 mt-2">
                Contact us to cancel your appointment three days before the workshop starts.
              </AccordionContent>
            </AccordionItem>

            {/* 4. How to Join */}
            <AccordionItem value="how-to-join" className=" rounded-lg shadow-sm border border-gray-100 overflow-hidden ">
              <AccordionTrigger className="text-xl font-bold font-english-heading hover:no-underline hover:text-hot-pink transition-colors">
                How to Join
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600 mt-2">
                {isAvailable ? (
                  isFree ? (
                    <ol className="list-decimal list-inside space-y-3">
                      <li>Fill the registration form with your information and answers.</li>
                      <li>Submit your request to join the workshop (100% Free).</li>
                      <li>Your registration will be reviewed by our team, and you will receive a confirmation once approved!</li>
                    </ol>
                  ) : (
                    <ol className="list-decimal list-inside space-y-4">
                      <li>Fill the request to join form with your information.</li>
                      <li>
                        Open Instapay, choose "Send Money", then "Bank Account" and use the IBAN below:
                        <div className="mt-2 p-4 bg-cream rounded-2xl border border-gray-200 flex flex-col gap-2">
                          <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">IBAN Number</span>
                          <div className="flex items-center justify-between gap-4">
                            <code className="text-sm font-mono text-carbon font-bold break-all select-all">{iban}</code>
                            <button
                              onClick={handleCopyIBAN}
                              className="flex-shrink-0 p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-sm border border-gray-100 active:scale-95"
                              title="Copy IBAN"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-hot-pink" />
                              )}
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>Attach the screenshot of your transaction along with your filled data.</li>
                      <li>Submit to finalize your checkout request!</li>
                    </ol>
                  )
                ) : (
                  <ol className="list-decimal list-inside space-y-4">
                    <li>Fill the form with your details to join the waitlist.</li>
                    <li>We will notify you via email if a slot becomes available or when the next cohort opens!</li>
                  </ol>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>


        </div>

        {/* Checkout Form Section */}
        <div className="lg:h-full">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-28 mt-4 lg:mt-0">
            <h2 className="text-2xl font-bold font-english-heading text-hot-pink mb-2">
              {!isAvailable ? "Join the Waitlist" : isFree ? "Register for Free" : "Request to Join"}
              {(!isAvailable || isFree) && (
                <span className="text-sm text-gray-500 ml-2">
                  {isFree && isAvailable ? "(Free - Admin Review)" : "(No payment is needed)"}
                </span>
              )}
            </h2>
            {!isAvailable && (
              <p className="text-sm text-gray-500 mb-4">
                Joining the waitlist is free and very important for us to know how many people are interested in the workshop so we can prepare for the next cohort.            </p>
            )}
            {isAvailable && isFree && (
              <p className="text-sm text-gray-500 mb-4">
                Complete the form to register for free. All requests are reviewed by our team before confirmation.            </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink bg-background"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink bg-background"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink bg-background"
                  placeholder="+20 123 456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  min={1}
                  max={120}
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink bg-background"
                  placeholder="e.g. 25"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Area of residence</label>
                <select
                  name="areaOfResidence"
                  required
                  value={formData.areaOfResidence}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink bg-background"
                >
                  <option value="Nasr City">Nasr City</option>
                  <option value="Heliopolis">Heliopolis</option>
                  <option value="New Cairo">New Cairo</option>
                  <option value="Madinaty">Madinaty</option>
                  <option value="El-Shorouk">El-Shorouk</option>
                  <option value="Maadi">Maadi</option>
                  <option value="Giza (ElMohandiseen, Agouza, Zamalek..etc)">Giza (ElMohandiseen, Agouza, Zamalek..etc)</option>
                  <option value="6th of October">6th of October</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">How did you know about the workshop?</label>
                <select
                  name="howDidYouKnow"
                  value={formData.howDidYouKnow}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink bg-background"
                >
                  <option value="TGN">TGN</option>
                  <option value="Instructor page">Instructor page</option>
                  <option value="Ads">Ads</option>
                  <option value="Friends and Family">Friends and Family</option>
                </select>
              </div>

              {isAvailable && !isFree && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Instapay Transaction Status / Image</label>
                  {formData.instapayImage ? (
                    <div className="relative w-full aspect-video border rounded-md overflow-hidden bg-cream">
                      <Image src={formData.instapayImage} alt="Instapay receipt" fill className="object-contain" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, instapayImage: "" })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <CldUploadWidget
                      uploadPreset="workshops"
                      onClose={() => {
                        document.body.style.overflow = "auto";
                      }}
                      options={{
                        maxFiles: 1,
                        clientAllowedFormats: ["image", "png", "jpeg"],
                        sources: ["local", "url", "camera"],
                      }}
                      onSuccess={(result) => {
                        document.body.style.overflow = "auto";
                        const info = result?.info as any;
                        if (info && info.secure_url) {
                          setFormData((prev) => ({
                            ...prev,
                            instapayImage: info.secure_url,
                          }));
                        }
                      }}
                      onError={(error) => {
                        document.body.style.overflow = "auto";
                        toast.error("Error uploading image");
                      }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-hot-pink hover:text-hot-pink transition-colors focus:outline-none"
                        >
                          Click to upload Instapay receipt
                        </button>
                      )}
                    </CldUploadWidget>
                  )}
                </div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink min-h-[100px] bg-background"
                  placeholder="Any special requests or information you'd like to share?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-hot-pink text-white font-bold text-lg py-3 rounded-md hover:bg-opacity-90 disabled:opacity-50 transition"
              >
                {submitting ? "Submitting..." : !isAvailable ? "Join Waitlist" : isFree ? "Submit Registration" : "Submit Checkout"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
