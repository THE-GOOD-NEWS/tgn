"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
}

export default function PackagePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [pkg, setPkg] = useState<Package | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instapayUrl, setInstapayUrl] = useState<string>("");

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res = await fetch(`/api/workshop-packages/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setPkg(data.data.pkg);
            setWorkshops(data.data.workshops || []);
          }
        }
      } catch (e) {
        // ignore
      }
    })();
  }, [slug]);

  const remaining = useMemo(() => {
    if (!pkg) return 0;
    return Math.max(0, pkg.maxWorkshops - selected.length);
  }, [pkg, selected]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pkg) return;
    if (!instapayUrl) {
      toast.error("Please upload Instapay proof image.");
      return;
    }
    const form = new FormData(e.currentTarget);
    const data = {
      selectedWorkshops: selected,
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      instapayImage: instapayUrl,
      notes: form.get("notes"),
    };
    setIsSubmitting(true);
    const promise = fetch(`/api/workshop-packages/${pkg.slug}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) throw new Error("Failed to submit");
      return res;
    });
    toast.promise(promise, {
      loading: "Submitting...",
      success: "Request submitted! We will contact you shortly.",
      error: "Failed to submit. Please try again.",
    });
    try {
      await promise;
      (e.target as HTMLFormElement).reset();
      setSelected([]);
      setInstapayUrl("");
    } catch (_) {
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black font-english-heading mb-2">
          {pkg.title}
        </h1>
        <p className="text-muted-foreground mb-8">
          Choose up to {pkg.maxWorkshops} workshop
          {pkg.maxWorkshops > 1 ? "s" : ""}. Remaining: {remaining}
        </p>

        <div className="bg-white rounded-2xl border p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Workshops</h2>
          {workshops.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No workshops available for this package.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {workshops.map((w) => {
                const checked = selected.includes(w._id);
                const disabled =
                  !checked && selected.length >= pkg.maxWorkshops;
                return (
                  <label
                    key={w._id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                      checked ? "border-primary bg-primary/5" : "border-border"
                    } ${disabled ? "opacity-50" : ""}`}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleWorkshop(w._id)}
                      disabled={disabled}
                    />
                    <span className="text-sm font-medium">{w.title}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Instapay Proof Image</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              {instapayUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={instapayUrl} className="h-32 object-contain" />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setInstapayUrl("")}
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <UploadButton
                  endpoint="newsMedia"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setInstapayUrl(res[0].url);
                      toast.success("Image uploaded");
                    }
                  }}
                  onUploadError={(e) => {
                    const msg = (e as any)?.message ?? "Upload failed";
                    toast.error(String(msg));
                  }}
                  appearance={{
                    button:
                      "bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-2 px-4 rounded-md transition-colors",
                    allowedContent: "text-gray-500 text-sm",
                  }}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input id="notes" name="notes" placeholder="Any notes…" />
          </div>

          <Button
            type="submit"
            className="w-full bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-4 text-lg"
            disabled={isSubmitting || selected.length === 0 || !instapayUrl}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}
