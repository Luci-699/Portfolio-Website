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
  useEffect(() => {
    setSplitText();
    window.addEventListener("resize", setSplitText);
    return () => window.removeEventListener("resize", setSplitText);
  }, []);

  useEffect(() => {
    // Init Lenis — works on both desktop wheel and mobile touch
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {/* Character 3D model — always rendered, visible on all screens */}
      {children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Suspense fallback={<div />}>
              <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
