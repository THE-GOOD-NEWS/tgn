"use client";

import { usePathname } from "next/navigation";
import NewsletterPopup from "./NewsletterPopup";
import GoodSpacePopUp from "./GoodSpacePopUp";

const PopupManager = () => {
  const pathname = usePathname();
  const isGoodSpace = pathname?.includes("the-good-space");

  return isGoodSpace ? <GoodSpacePopUp /> : <NewsletterPopup />;
};

export default PopupManager;
