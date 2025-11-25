"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Metric = {
  value: string; // e.g., "70+"
  label: string; // translated label
};

type MetricsCardsProps = {
  metrics: Metric[];
  isRTL?: boolean;
};

interface CounterProps {
  end: string;
  duration?: number;
  className?: string;
  isRTL?: boolean;
}

// Counter effect (in-view animated count, Arabic numerals when RTL)
const Counter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  className,
  isRTL,
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => {
      if (countRef.current) observer.unobserve(countRef.current);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | undefined;
    let animationFrame: number;
    const startValue = 0;

    const hasK = /k/i.test(end);
    const hasM = /m/i.test(end);
    const hasPlus = /\+/.test(end);
    const numericPart = parseInt(end.replace(/[^0-9]/g, ""), 10) || 0;

    // We count toward the numeric part (e.g., 10 for 10K, 1 for 1M, 300000 for 300,000)
    const endValue = numericPart;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(
        progress * (endValue - startValue) + startValue
      );
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  const hasK = /k/i.test(end);
  const hasM = /m/i.test(end);
  const hasPlus = /\+/.test(end);
  // When suffix present, display compact (e.g., 10K, 1M). Otherwise, use thousands separators.
  const baseCount = count.toString();
  const suffix = hasK
    ? isRTL
      ? " الف"
      : "K"
    : hasM
    ? isRTL
      ? " م"
      : "M"
    : "";
  const formattedCount =
    hasK || hasM
      ? `${baseCount}${suffix}${hasPlus ? "+" : ""}`
      : baseCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (hasPlus ? "+" : "");

  const displayCount = isRTL
    ? formattedCount.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)])
    : formattedCount;

  return (
    <span ref={countRef} className={className}>
      {displayCount}
    </span>
  );
};

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  metrics,
  isRTL,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {metrics.map((m, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
          className="flex flex-col items-center p-6 bg-pink-500 rounded-lg shadow-md"
        >
          <h3
            className={`text-3xl sm:text-4xl font-bold text-white mb-2 ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            }`}
          >
            <Counter end={m.value} duration={1800 + idx * 200} isRTL={isRTL} />
          </h3>
          <p
            className={`text-sm text-center text-white ${
              isRTL ? "font-arabic" : "font-english"
            }`}
          >
            {m.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsCards;
