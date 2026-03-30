"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GoodSpacePopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Show popup after a short delay to ensure hydration and user attention
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenGoodSpacePopUp");
      if (hasSeenPopup !== "true") {
        setIsOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      sessionStorage.setItem("hasSeenGoodSpacePopUp", "true");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject: "the good space" }),
      });
      const data = await res.json();

      if (res.ok && data?.success) {
        setStatus("success");
        setMessage("Thank you! You've been subscribed to our updates.");
        setEmail("");
        // Close popup after success message
        setTimeout(() => {
          setIsOpen(false);
          sessionStorage.setItem("hasSeenGoodSpacePopUp", "true");
        }, 3000);
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md theme-good-space bg-background border-primary/20 font-english"
      >
        <DialogHeader className="items-center text-center">
          <div className="relative w-40 h-40 md:w-60 md:h-60 mb-2">
            <Image
              src="/goodSpace/1- MOUNIR.png"
              alt="The Good Space Logo"
              fill
              className="object-contain"
            />
          </div>
          <DialogTitle
            className="text-2xl font-bold text-primary font-english-heading"
          >
            Stay Connected
          </DialogTitle>
          <DialogDescription className="text-foreground/80 text-lg mt-2">
            Subscribe to know more updates from The Good Space.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="text-center py-6 text-primary font-bold">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 theme-good-space">
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-primary/30 text-foreground placeholder:text-foreground/40 focus-visible:ring-primary"
                disabled={status === "loading"}
              />
              {status === "error" && (
                <p className="text-red-600 text-sm">{message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GoodSpacePopUp;
