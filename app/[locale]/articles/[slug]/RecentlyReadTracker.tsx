"use client";

import { useEffect } from "react";

export default function RecentlyReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    // Fire-and-forget update to recently read list
    fetch(`/api/account/recently-read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      credentials: "include",
    }).catch(() => {});
  }, [slug]);

  return null;
}

