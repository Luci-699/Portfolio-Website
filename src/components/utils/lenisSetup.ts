import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  const isMobile = window.innerWidth < 1025;

  lenisInstance = new Lenis({
    duration: isMobile ? 0.8 : 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: isMobile ? 1.5 : 2.0,
    infinite: false,
  });

  // Connect Lenis scroll events to GSAP ScrollTrigger
  lenisInstance.on("scroll", () => ScrollTrigger.update());

  // Drive Lenis using GSAP's ticker so they stay in sync
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis() {
  return lenisInstance;
}
