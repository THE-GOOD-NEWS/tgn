"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner"; // Using sonner for toasts as found in package.json
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const isAvailable = workshop ? workshop.slots > (workshop.attendance?.length || 0) : true;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    howDidYouKnow: "TGN",
    instapayImage: "",
  });

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || (isAvailable && !formData.instapayImage)) {
      toast.error(isAvailable ? "Please fill all fields and upload the instapay receipt." : "Please fill all fields.");
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
        toast.success(isAvailable ? "Checkout request submitted successfully! We will review it shortly." : "Waitlist request submitted successfully! We will notify you if a slot becomes available.");
        router.push("/en/workshops");
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
                    {workshop.images && workshop.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {workshop.images.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded overflow-hidden">
                  <Image src={img} alt="Workshop Image" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
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
            <p className="text-xl font-semibold mt-2 mb-2">Price: {workshop.price} EGP</p>
          </div>
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
                              <span className="font-semibold text-carbon">Duration:</span> {session.duration} minutes
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
                <ol className="list-decimal list-inside space-y-2">
                  <li>Fill the request to join form with your information.</li>
                  <li>Make the transaction amount on Instapay.</li>
                  <li>Attach the screenshot of your transaction along with your filled data.</li>
                  <li>Submit to finalize your checkout request!</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>


        </div>

        {/* Checkout Form Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-28">
          <h2 className="text-2xl font-bold font-english-heading text-hot-pink mb-6">
            {isAvailable ? "Request to Join" : "Join the Waitlist"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
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
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
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
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
                placeholder="+20 123 456 7890"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">How did you know about the workshop?</label>
              <select
                name="howDidYouKnow"
                value={formData.howDidYouKnow}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink"
              >
                <option value="TGN">TGN</option>
                <option value="Instructor page">Instructor page</option>
                <option value="Ads">Ads</option>
                <option value="Friends and Family">Friends and Family</option>
              </select>
            </div>

            {isAvailable && (
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

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-hot-pink text-white font-bold text-lg py-3 rounded-md hover:bg-opacity-90 disabled:opacity-50 transition"
            >
              {submitting ? "Submitting..." : isAvailable ? "Submit Checkout" : "Join Waitlist"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
