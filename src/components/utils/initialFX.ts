import gsap from "gsap";

// Simple manual char splitter (replaces gsap-trial SplitText) — used ONLY for hero intro text
function splitTextToChars(selector: string): Element[] {
  const elements = document.querySelectorAll(selector);
  const chars: Element[] = [];
  elements.forEach((el) => {
    const text = el.textContent || "";
    el.innerHTML = text
      .split("")
      .map(
        (c) =>
          `<span style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`
      )
      .join("");
    chars.push(...Array.from(el.querySelectorAll("span")));
  });
  return chars;
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Animate hero name chars (each name word separately to preserve line break)
  const introChars = splitTextToChars(".landing-intro h2, .name-word");
  gsap.fromTo(
    introChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // Animate nav & icons fade in
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // --- Looping word animation (NO char splitting — animate full word divs) ---

  // Ensure second words start hidden below
  gsap.set(".landing-h2-2", { y: "100%", opacity: 1 });
  gsap.set(".landing-h2-info-1", { y: "100%", opacity: 1 });

  // Animate large purple word (landing-info-h2) in first
  gsap.fromTo(
    ".landing-h2-1",
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
  );

  // Animate small word row in first
  gsap.fromTo(
    ".landing-h2-info",
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
  );

  // Also animate "A Creative" label and the landing-info-h2 container
  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  // Start looping word animation immediately (hold is handled inside the timeline)
  loopWords(".landing-h2-1", ".landing-h2-2");
  loopWords(".landing-h2-info", ".landing-h2-info-1");
}

function loopWords(selector1: string, selector2: string) {
  const word1 = document.querySelector(selector1) as HTMLElement;
  const word2 = document.querySelector(selector2) as HTMLElement;
  if (!word1 || !word2) return;

  const duration = 0.65;
  const hold = 3;

  // Set word2 off-screen below to start
  gsap.set(word2, { y: "100%" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

  // Hold word1, then swap
  tl.to({}, { duration: hold }) // hold word1
    .to(word1, { y: "-100%", duration, ease: "power3.inOut" }, "swap1")
    .fromTo(word2, { y: "100%" }, { y: "0%", duration, ease: "power3.inOut" }, "swap1")
    .to({}, { duration: hold }) // hold word2
    .to(word2, { y: "100%", duration, ease: "power3.inOut" }, "swap2")
    .fromTo(word1, { y: "-100%" }, { y: "0%", duration, ease: "power3.inOut" }, "swap2");
}

