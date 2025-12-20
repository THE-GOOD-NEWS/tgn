"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Link2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface ShareMenuProps {
  title: string;
  url: string;
  trigger?: React.ReactNode;
}

export function ShareMenu({ title, url, trigger }: ShareMenuProps) {
  const t = useTranslations("share");
  const [fullUrl, setFullUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(
        url.startsWith("http") ? url : `${window.location.origin}${url}`
      );
    }
  }, [url]);

  const handleCopyLink = async () => {
    if (!fullUrl) return;
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success(t("copied"));
    } catch (err) {
      toast.error(t("failed"));
    }
  };

  const shareLinks = [
    {
      name: t("facebook"),
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        fullUrl
      )}`,
    },
    {
      name: t("twitter"),
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: t("linkedin"),
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        fullUrl
      )}`,
    },
    {
      name: t("whatsapp"),
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + fullUrl)}`,
    },
  ];

  const handleShare = (shareUrl: string) => {
    if (!fullUrl) return;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <button className="flex items-center space-x-2 rtl:space-x-reverse hover:text-hot-pink transition-colors">
            <Share2 className="h-4 w-4" />
            <span>{t("share")}</span>
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <Link2 className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
          {t("copyLink")}
        </DropdownMenuItem>
        {shareLinks.map((link) => (
          <DropdownMenuItem
            key={link.name}
            onClick={() => handleShare(link.url)}
            className="cursor-pointer"
          >
            <link.icon className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            {link.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
