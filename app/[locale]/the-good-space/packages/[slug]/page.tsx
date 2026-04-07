"use client";

import { useEffect, useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X, Maximize2, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Checkbox } from "@/components/ui/checkbox";

interface Package {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  price: number;
  maxWorkshops: number;
  isAllWorkshopsIncluded: boolean;
  includedWorkshops: string[];
}

interface Workshop {
  _id: string;
  title: string;
  slug: string;
  images?: string[];
  instructors?: string[];
  availableSessions?: any[];
  description?: string;
  startDate?: string;
  endDate?: string;
  price?: number;
  slots: number;
  attendanceCount: number;
  pendingCount: number;
}

export default function PackageDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);
  
  const [pkg, setPkg] = useState<Package | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const iban = "100070320082";

  // Form state
  const [selected, setSelected] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    howDidYouKnow: "TGN",
    instapayImage: "",
    notes: "",
  });

  const [detailWorkshop, setDetailWorkshop] = useState<Workshop | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = useMemo(() => {
    const workshopImages = workshops.flatMap(w => w.images || []);
    return workshopImages.length > 0 ? workshopImages : (pkg?.thumbnail ? [pkg.thumbnail] : []);
  }, [workshops, pkg]);

  const nextMainImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevMainImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextLightboxImage = () => {
    setSelectedImageIndex((prev) => (prev === null ? 0 : (prev === allImages.length - 1 ? 0 : prev + 1)));
  };

  const prevLightboxImage = () => {
    setSelectedImageIndex((prev) => (prev === null ? 0 : (prev === 0 ? allImages.length - 1 : prev - 1)));
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
    return parts.join(" ");
  };

  const remaining = useMemo(() => {
    if (!pkg) return 0;
    return Math.max(0, pkg.maxWorkshops - selected.length);
  }, [pkg, selected]);

  const savings = useMemo(() => {
    if (!pkg || selected.length === 0) return 0;
    const selectedWorkshopsData = workshops.filter(w => selected.includes(w._id));
    const totalStandAlonePrice = selectedWorkshopsData.reduce((acc, curr) => acc + (curr.price || 0), 0);
    return Math.max(0, totalStandAlonePrice - pkg.price);
  }, [pkg, workshops, selected]);

  const toggleWorkshop = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (pkg && prev.length >= pkg.maxWorkshops) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleCopyIBAN = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(iban);
      setCopied(true);
      toast.success("Account Number is copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await fetch(`/api/workshop-packages/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setPkg(data.data.pkg);
            setWorkshops(data.data.workshops || []);
          } else {
            router.push("/en/the-good-space");
          }
        } else {
          router.push("/en/the-good-space");
        }
      } catch (err) {
        console.error("Error fetching package:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPackage();
  }, [slug, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.instapayImage || !formData.notes) {
      toast.error("Please fill all required fields and upload the instapay receipt.");
      return;
    }
    if (selected.length === 0) {
      toast.error(`Please select up to ${pkg?.maxWorkshops} workshop(s).`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/workshop-packages/${slug}/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedWorkshops: selected,
        }),
      });

      const data = await res.json();
      if (res.ok && (data.success || data)) { 
        toast.success("Package booking request submitted successfully! We will review it shortly.");
        router.push(`/en/the-good-space/success?type=booking`);
      } else {
        toast.error(data.message || data.error || "Failed to submit request. Please try again.");
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pkg) return null;

  return (
    <div className="theme-good-space px-6 md:px-10 bg-background lg:px-16 pt-28 md:pt-40 pb-20 font-english min-h-screen text-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 min-h-screen lg:grid-cols-2 gap-12">
        {/* Package Details Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-english-heading text-primary mb-2">
            {pkg.title}
          </h1>

          <div className="mt-8 space-y-4">
              {/* Main Image Display */}
              <div className="relative aspect-square rounded-3xl overflow-hidden group shadow-2xl border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full cursor-zoom-in"
                    onClick={() => setSelectedImageIndex(currentImageIndex)}
                  >
                    <CldImage 
                      src={allImages[currentImageIndex]} 
                      alt={`Preview ${currentImageIndex + 1}`}
                      fill 
                      className="object-cover" 
                      crop="fill"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                
                {allImages.length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevMainImage(); }} 
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/40 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextMainImage(); }} 
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/40 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar pt-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === idx ? "border-primary scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <CldImage 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`}
                        fill 
                        className="object-cover" 
                        crop="fill"
                      />
                    </button>
                  ))}
                </div>
              )}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImageIndex !== null && (
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
                        src={allImages[selectedImageIndex]}
                        alt="Viewing preview image"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Lightbox Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all hover:scale-110 z-[110]"
                        onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                      <button
                        className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all hover:scale-110 z-[110]"
                        onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 shadow-sm border-b border-gray-800 pb-2">
            <p className="text-xl font-semibold mt-2 mb-2">Price: {pkg.price} EGP</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-1 md:space-y-2 ">
            {/* 1. Description */}
            <AccordionItem value="description" className=" shadow-sm border-b border-black overflow-hidden ">
              <AccordionTrigger className="text-xl font-bold font-english-heading hover:no-underline hover:text-primary transition-colors">
                Description
              </AccordionTrigger>
              <AccordionContent className="pb-1 md:pb-2">
                <p className="text-gray-600 whitespace-pre-wrap mt-2">{pkg.description}</p>
              </AccordionContent>
            </AccordionItem>
            {/* 2. How to Join */}
            <AccordionItem value="how-to-join" className="  shadow-sm  border-primary border-b overflow-hidden ">
              <AccordionTrigger className="text-xl font-bold font-english-heading hover:no-underline hover:text-primary transition-colors">
                How to Join
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600 mt-2">
                <ol className="list-decimal list-inside space-y-4">
                  <li>Fill the request to join form with your information and select your preferred workshops.</li>
                  <li>
                    Open Instapay, choose "Send Money", then "Bank Account" and use the account number below:
                    <div className="mt-2 p-4 bg-background rounded-2xl border border-gray-200 flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Account Number</span>
                      <div className="flex items-center justify-between gap-4">
                        <code className="text-sm font-mono text-foreground font-bold break-all select-all">{iban}</code>
                        <button 
                          onClick={handleCopyIBAN}
                          className="flex-shrink-0 p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-sm border border-gray-100 active:scale-95"
                          title="Copy Account Number"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-primary" />
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>Attach the screenshot of your transaction along with your filled data.</li>
                  <li>Submit to finalize your checkout request!</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>

        {/* Checkout Form Section */}
        <div className="lg:h-full">
          <div className="bg-secondary/10 p-8 rounded-xl shadow-lg border border-secondary h-fit sticky top-28 mt-4 lg:mt-0">
            {/* <h2 className="text-2xl font-bold font-english-heading text-primary mb-4">
              Request Package
            </h2> */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="mb-4">
                <h2 className="block  font-semibold mb-2">
                  Select Workshops (Choose up to {pkg.maxWorkshops} — Remaining: {remaining})
                </h2>
                {workshops.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No workshops available for this package.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                    {workshops.map((w) => {
                      const checked = selected.includes(w._id);
                      const isFull = (w.attendanceCount + w.pendingCount) >= w.slots;
                      const disabled = !checked && (isFull || selected.length >= pkg.maxWorkshops);
                      return (
                        <label
                          key={w._id}
                          className={`flex items-start gap-3 p-3 bg-white border rounded-lg cursor-pointer transition-colors ${
                            checked ? "border-primary bg-primary/5" : "border-border"
                          } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/5"}`}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleWorkshop(w._id)}
                            disabled={disabled}
                            className="mt-1"
                          />
                          <div className="flex flex-col text-left">
                             <span className="text-sm font-bold text-primary">{w.title}</span>
                             {w.instructors && w.instructors.length > 0 && (
                               <span className="text-[10px] text-gray-500 font-medium">With {w.instructors.join(", ")}</span>
                             )}
                             {w.availableSessions && w.availableSessions.length > 0 && (
                               <span className="text-[10px] text-muted-foreground">{w.availableSessions.length} {w.availableSessions.length === 1 ? "Session" : "Sessions"}</span>
                             )}
                             {isFull && !checked && (
                               <span className="text-[10px] text-red-500 font-bold">Sold Out / Fully Booked</span>
                             )}
                             <button
                               type="button"
                               onClick={(e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 setDetailWorkshop(w);
                               }}
                               className="text-[10px] text-primary font-bold underline mt-1 text-left hover:text-primary/70"
                             >
                               More details
                             </button>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {selected.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 border-2 border-dashed border-primary/30 p-4 rounded-2xl flex flex-col items-center text-center gap-1"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-xs uppercase font-black tracking-widest">Great Choice!</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    You're saving <span className="text-primary text-lg"> {savings} EGP </span> with this package
                  </p>
                  <p className="text-[10px] text-primary italic">
                    Compared to booking these workshops individually
                  </p>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+20 123 456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">How did you know about the workshop?</label>
                <select
                  name="howDidYouKnow"
                  value={formData.howDidYouKnow}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="TGN">TGN</option>
                  <option value="Instructor page">Instructor page</option>
                  <option value="Ads">Ads</option>
                  <option value="Friends and Family">Friends and Family</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Instapay Transaction Status / Image</label>
                <div className="mb-2">
                  <div className="mt-2 p-4 bg-background rounded-2xl border border-gray-200 flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Account Number</span>
                    <div className="flex items-center justify-between gap-4">
                      <code className="text-sm font-mono text-foreground font-bold break-all select-all">{iban}</code>
                      <button 
                        type="button"
                        onClick={handleCopyIBAN}
                        className="flex-shrink-0 p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-sm border border-gray-100 active:scale-95"
                        title="Copy Account Number"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {formData.instapayImage ? (
                  <div className="relative w-full aspect-video border rounded-md overflow-hidden bg-background mt-4">
                    <Image src={formData.instapayImage} alt="Instapay receipt" fill className="object-contain" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, instapayImage: "" })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md text-sm cursor-pointer"
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
                        className="w-full py-4 mt-2 border-2 border-dashed border-primary/80 rounded-md text-gray-500 hover:border-primary hover:text-primary transition-colors focus:outline-none"
                      >
                        Click to upload Instapay receipt
                      </button>
                    )}
                  </CldUploadWidget>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">What do you expect to gain from these workshops? (Mandatory)</label>
                <textarea
                  name="notes"
                  required
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                  placeholder="Tell us what you're looking forward to..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting || selected.length === 0 || !formData.instapayImage}
                className="w-full bg-primary text-primary-foreground font-bold text-lg py-3 rounded-md hover:bg-opacity-90 disabled:opacity-50 transition"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Workshop Detail Modal */}
      <AnimatePresence>
        {detailWorkshop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDetailWorkshop(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl md:text-3xl font-black font-english-heading text-primary">
                    {detailWorkshop.title}
                  </h2>
                  <button 
                    onClick={() => setDetailWorkshop(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* description */}
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                       Description
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {detailWorkshop.description}
                    </p>
                  </div>

                  {/* Date & Price */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                    <div>
                      <span className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Duration</span>
                      <p className="text-sm font-bold text-foreground">
                        {detailWorkshop.startDate && new Date(detailWorkshop.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {detailWorkshop.endDate && ` - ${new Date(detailWorkshop.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Price (Stand-alone)</span>
                      <p className="text-sm font-bold text-foreground">{detailWorkshop.price} EGP</p>
                    </div>
                  </div>

                  {/* Sessions */}
                  {detailWorkshop.availableSessions && detailWorkshop.availableSessions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold mb-4">Sessions</h3>
                      <div className="space-y-3">
                        {detailWorkshop.availableSessions.map((session: any, idx: number) => (
                          <div key={idx} className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <h4 className="font-bold text-primary mb-1">{session.title}</h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                              <span>{new Date(session.sessionStartDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                              {session.startTime && <span>at {session.startTime}</span>}
                              {session.duration && <span>{formatDuration(session.duration)}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={() => setDetailWorkshop(null)}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
