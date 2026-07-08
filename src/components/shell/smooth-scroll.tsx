"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, getLenis } from "@/lib/lenis-instance";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useBootStore } from "@/hooks/use-boot";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const booted = useBootStore((s) => s.booted);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // re-enable scrolling after boot completes (locked during preloader)
  useEffect(() => {
    const lenis = getLenis();
    if (booted) {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    } else {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [booted]);

  return <>{children}</>;
}
