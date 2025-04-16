"use client";
import { useEffect, useState } from "react";
import { personalData } from "@/utils/data/personal-data";
import dynamic from "next/dynamic";

// Create NoSSR component
const NoSSR = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return children;
};

// Dynamic imports with NoSSR wrapper
const HeroSection = dynamic(() => import("./components/homepage/hero-section"), {
  loading: () => <NoSSR><div className="min-h-[80vh]"></div></NoSSR>,
});
const AboutSection = dynamic(() => import("./components/homepage/about"), {
  loading: () => <NoSSR><div className="min-h-[50vh]"></div></NoSSR>,
});
const Experience = dynamic(() => import("./components/homepage/experience"), {
  loading: () => <NoSSR><div className="min-h-[60vh]"></div></NoSSR>,
});
const Skills = dynamic(() => import("./components/homepage/skills"), {
  loading: () => <NoSSR><div className="min-h-[70vh]"></div></NoSSR>,
});
const Projects = dynamic(() => import("./components/homepage/projects"), {
  loading: () => <NoSSR><div className="min-h-[80vh]"></div></NoSSR>,
});
const Education = dynamic(() => import("./components/homepage/education"), {
  loading: () => <NoSSR><div className="min-h-[50vh]"></div></NoSSR>,
});
const ContactSection = dynamic(() => import("./components/homepage/contact"), {
  loading: () => <NoSSR><div className="min-h-[60vh]"></div></NoSSR>,
});

export default function Home() {
  return (
    <NoSSR>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <ContactSection />
    </NoSSR>
  );
}