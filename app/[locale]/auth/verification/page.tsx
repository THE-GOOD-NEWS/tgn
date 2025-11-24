import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

function VerificationPage() {
  const t = useTranslations("auth.verification");
  const locale = useLocale();

  return (
    <div className="h-[calc(100vh)] md:h-[calc(100vh)] w-full justify-center bg-cream items-center flex text-hot-pink px-4">
      <div className="max-w-md w-full text-center">
        <div className="px-6 pb-12 mt-4 rounded-3xl font-bold border bg-hot-pink text-lg md:text-2xl text-white border-lovely">
          <div className="mb-2">
            <Image
              src="/mounir/TGN_ELEMENTS_PNG-12.png"
              alt={t("imageAlt")}
              width={300}
              height={300}
              className="mx-auto"
              priority
            />
          </div>
          {t("message")}
        </div>
      </div>
    </div>
  );
}

export default VerificationPage;
