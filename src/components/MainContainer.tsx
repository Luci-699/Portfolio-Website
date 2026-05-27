import { PropsWithChildren, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { lazy, Suspense } from "react";
import { initLenis, destroyLenis } from "./utils/lenisSetup";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const isDesktop = window.innerWidth >= 1025;

  useEffect(() => {
    setSplitText();
    window.addEventListener("resize", setSplitText);
    return () => window.removeEventListener("resize", setSplitText);
  }, []);

  useEffect(() => {
    // Lenis only on desktop — mobile uses native hardware-accelerated scroll
    if (isDesktop) {
      initLenis();
      return () => destroyLenis();
    }
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {/* 3D character — desktop only (too heavy for mobile) */}
      {isDesktop && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktop && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktop && (
              <Suspense fallback={<div />}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
