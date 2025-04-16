"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };

    // Set initial visibility
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className="fixed bottom-8 right-6 z-50 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 text-white hover:text-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;