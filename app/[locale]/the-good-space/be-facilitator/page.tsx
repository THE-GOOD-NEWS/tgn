"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, 
  Send, 
  Check, 
  Info, 
  User, 
  Mail, 
  Phone, 
  Instagram, 
  Briefcase, 
  Clock, 
  Trophy, 
  BookOpen, 
  FileText, 
  Camera, 
  Link as LinkIcon,
  Loader2,
  CheckCircle2,
  Calendar,
  Layers,
  Heart
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BeFacilitatorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Section 1: Who You Are
    name: "",
    email: "",
    phoneNumber: "",
    instagramHandle: "",
    
    // Section 2: What You Do
    expertiseArea: "",
    currentRole: "",
    yearsOfExperience: "",
    
    // Section 3: Your Workshop
    workshopTitle: "",
    learningOutcomes: "",
    formatPreference: "",
    sessionLength: "",
    numberOfDays: "",
    hasFacilitateBefore: "no",
    previousWorkshopDetails: "",
    
    // Section 5: Logistics
    portfolioUrl: "",
    documentationComfort: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [id]: id === "email" ? value.toLowerCase() : value 
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "be_facilitator",
          ...formData,
          hasFacilitateBefore: formData.hasFacilitateBefore === "yes",
        }),
      });

      if (response.ok) {
        router.push("/en/the-good-space/success?type=be_facilitator");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to submit form"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setFormStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setFormStep((prev) => Math.max(prev - 1, 1));

  const expertiseOptions = [
    "Content Creation", 
    "Design", 
    "Marketing", 
    "Copywriting", 
    "Business & Strategy", 
    "Photography", 
    "Video", 
    "Wellbeing", 
    "Career Development", 
    "Ai & Technolofy", 
    "Other"
  ];

  const experienceOptions = ["1–2 years", "3–5 years", "5+ years"];
  const formatOptions = ["Solo workshop", "Roundtable", "Open conversation", "Talk"];
  const lengthOptions = ["60 min", "90 min", "2 hours"];
  const daysOptions = ["1", "2", "3"];
  const docComfortOptions = ["Yes", "No", "Depends"];

  return (
    <div className="theme-good-space bg-background min-h-screen pt-24 pb-20 px-6 font-english overflow-hidden">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <Link 
          href="/en/the-good-space"
          className="inline-flex items-center gap-2 text-primary font-bold hover:underline mb-8 transition-all hover:-translate-x-1"
        >
          <ArrowLeft size={18} />
          Back to The Good Space
        </Link>
        
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary font-black tracking-widest uppercase text-xs mb-3 block">
              Application Form
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-english-heading text-primary leading-tight tracking-tight">
              Be a <span className="text-foreground">Facilitator</span> <br className="hidden md:block" /> with us
            </h1>
            <div className="h-2 w-24 bg-primary mt-4 rounded-full"></div>
            <p className="mt-6 text-gray-600 font-medium leading-relaxed max-w-2xl">
              We're excited to have you share your wisdom with The Good Space community. 
              Please tell us more about yourself and the workshop you'd like to lead.
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black uppercase text-primary/60 tracking-wider">Step {formStep} of {totalSteps}</span>
            <span className="text-xs font-black text-foreground">
              {formStep === 1 && "Who You Are"}
              {formStep === 2 && "What You Do"}
              {formStep === 3 && "Your Workshop"}
              {formStep === 4 && "Logistics"}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "25%" }}
              animate={{ width: `${(formStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <AnimatePresence mode="wait">
            {/* Step 1: Who You Are */}
            {formStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <User size={20} className="text-primary" />
                   </div>
                   <h2 className="text-2xl font-black font-english-heading text-foreground">Section 1 — Who You Are</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-bold text-gray-700">Full name</Label>
                    <Input 
                      id="name" 
                      required 
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-xl border-primary/70  focus:border-primary focus:ring-primary/20 bg-white/70 backdrop-blur-sm transition-all py-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-gray-700">Email address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      required 
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-xl border-primary/70  focus:border-primary focus:ring-primary/20 bg-white/70 backdrop-blur-sm transition-all py-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-bold text-gray-700">Phone number</Label>
                    <Input 
                      id="phoneNumber" 
                      required 
                      placeholder="+20 123 456 7890"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="rounded-xl border-primary/70  focus:border-primary focus:ring-primary/20 bg-white/70 backdrop-blur-sm transition-all py-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagramHandle" className="text-sm font-bold text-gray-700">Instagram handle</Label>
                    <div className="relative">
                      <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input 
                        id="instagramHandle" 
                        required 
                        placeholder="@username"
                        value={formData.instagramHandle}
                        onChange={handleChange}
                        className="rounded-xl border-primary/70  focus:border-primary focus:ring-primary/20 bg-white/70 backdrop-blur-sm transition-all py-6 pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-8">
                   <Button 
                     type="button" 
                     onClick={nextStep}
                     disabled={!formData.name || !formData.email || !formData.phoneNumber || !formData.instagramHandle}
                     className="rounded-full px-10 py-6 bg-primary font-black text-lg hover:opacity-90 transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
                   >
                     Next Section
                   </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: What You Do */}
            {formStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Briefcase size={20} className="text-muted-foreground" />
                   </div>
                   <h2 className="text-2xl font-black font-english-heading text-foreground">Section 2 — What You Do</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="expertiseArea" className="text-sm font-bold text-gray-700">Your area of expertise</Label>
                    <Select value={formData.expertiseArea} onValueChange={(val) => handleSelectChange("expertiseArea", val)}>
                      <SelectTrigger className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6">
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-primary/10">
                        {expertiseOptions.map((opt) => (
                          <SelectItem key={opt} value={opt} className="py-3 focus:bg-primary/10 transition-colors">{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentRole" className="text-sm font-bold text-gray-700">Current role / what you do in one line</Label>
                    <Input 
                      id="currentRole" 
                      required 
                      placeholder="e.g. Senior Product Designer at TechCo"
                      value={formData.currentRole}
                      onChange={handleChange}
                      className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience" className="text-sm font-bold text-gray-700">How long have you been working in this field?</Label>
                    <Select value={formData.yearsOfExperience} onValueChange={(val) => handleSelectChange("yearsOfExperience", val)}>
                      <SelectTrigger className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {experienceOptions.map((opt) => (
                          <SelectItem key={opt} value={opt} className="py-3">{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-10 py-6 border-primary/20 font-bold">
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!formData.expertiseArea || !formData.currentRole || !formData.yearsOfExperience}
                    className="rounded-full px-10 py-6 bg-primary font-black text-lg hover:opacity-90 shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    Next Section
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Your Workshop */}
            {formStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                      <BookOpen size={20} className="text-accent" />
                   </div>
                   <h2 className="text-2xl font-black font-english-heading text-foreground">Section 3 — Your Workshop</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="workshopTitle" className="text-sm font-bold text-gray-700">Workshop title (what would you call your session?)</Label>
                    <Input 
                      id="workshopTitle" 
                      required 
                      placeholder="e.g. Mastering Visual Storytelling"
                      value={formData.workshopTitle}
                      onChange={handleChange}
                      className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="learningOutcomes" className="text-sm font-bold text-gray-700">What will attendees learn? (Give as much details as you can)</Label>
                    <Textarea 
                      id="learningOutcomes" 
                      required 
                      placeholder="Outline the key takeaways and learning objectives..."
                      value={formData.learningOutcomes}
                      onChange={handleChange}
                      className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm min-h-[120px] resize-none p-4"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="formatPreference" className="text-sm font-bold text-gray-700">Format preference</Label>
                      <Select value={formData.formatPreference} onValueChange={(val) => handleSelectChange("formatPreference", val)}>
                        <SelectTrigger className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {formatOptions.map((opt) => (
                            <SelectItem key={opt} value={opt} className="py-3">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sessionLength" className="text-sm font-bold text-gray-700">Ideal session length</Label>
                      <Select value={formData.sessionLength} onValueChange={(val) => handleSelectChange("sessionLength", val)}>
                        <SelectTrigger className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {lengthOptions.map((opt) => (
                            <SelectItem key={opt} value={opt} className="py-3">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfDays" className="text-sm font-bold text-gray-700">Ideal number of days</Label>
                    <Select value={formData.numberOfDays} onValueChange={(val) => handleSelectChange("numberOfDays", val)}>
                      <SelectTrigger className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {daysOptions.map((opt) => (
                          <SelectItem key={opt} value={opt} className="py-3">{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 pt-2">
                    <Label className="text-sm font-bold text-gray-700">Have you facilitated or taught before?</Label>
                    <RadioGroup 
                      value={formData.hasFacilitateBefore} 
                      onValueChange={(val) => handleSelectChange("hasFacilitateBefore", val)}
                      className="flex gap-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" className="border-primary text-primary" />
                        <Label htmlFor="yes" className="font-bold cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" className="border-primary text-primary" />
                        <Label htmlFor="no" className="font-bold cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.hasFacilitateBefore === "yes" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <Label htmlFor="previousWorkshopDetails" className="text-sm font-bold text-gray-700">Previous workshop details</Label>
                      <Textarea 
                        id="previousWorkshopDetails" 
                        placeholder="Briefly describe your previous experience..."
                        value={formData.previousWorkshopDetails}
                        onChange={handleChange}
                        className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm min-h-[100px] resize-none p-4"
                      />
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between pt-8">
                  <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-10 py-6 border-primary/20 font-bold">
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!formData.workshopTitle || !formData.learningOutcomes || !formData.formatPreference || !formData.sessionLength || !formData.numberOfDays}
                    className="rounded-full px-10 py-6 bg-primary font-black text-lg hover:opacity-90 shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    Next Section
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Logistics */}
            {formStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Layers size={20} className="text-purple-600" />
                   </div>
                   <h2 className="text-2xl font-black font-english-heading text-foreground">Section 5 — Logistics</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="portfolioUrl" className="text-sm font-bold text-gray-700">
                      Link to portfolio / work / workshop samples / website 
                      <span className="text-xs font-normal text-gray-400 ml-2">(optional)</span>
                    </Label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input 
                        id="portfolioUrl" 
                        placeholder="https://..."
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentationComfort" className="text-sm font-bold text-gray-700">Are you comfortable with your session being documented?</Label>
                    <Select value={formData.documentationComfort} onValueChange={(val) => handleSelectChange("documentationComfort", val)}>
                      <SelectTrigger className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm py-6">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {docComfortOptions.map((opt) => (
                          <SelectItem key={opt} value={opt} className="py-3">{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo" className="text-sm font-bold text-gray-700">Any other information you'd like us to know?</Label>
                    <Textarea 
                      id="additionalInfo" 
                      placeholder="Anything else?"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="rounded-xl border-primary/70  bg-white/70 backdrop-blur-sm min-h-[120px] resize-none p-4"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-10 py-6 border-primary/20 font-bold" disabled={isSubmitting}>
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !formData.documentationComfort}
                    className="rounded-full px-12 py-6 bg-primary font-black text-xl hover:opacity-90 shadow-xl hover:scale-105 active:scale-95 group transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Application
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Bottom decorative section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 pt-10 border-t border-primary/10 flex flex-col items-center text-center space-y-4"
        >
           <Image
              src="/goodSpace/1.png"
              alt="The Good Space Logo"
              width={80}
              height={32}
              className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"
           />
           <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
             The Good Space © 2026 — Growth Doesn't Have To Be Loud
           </p>
        </motion.div>
      </div>
    </div>
  );
}
