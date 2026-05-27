import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  _words?: HTMLElement[];
  _chars?: HTMLElement[];
}

// Manual word splitter — replaces gsap-trial SplitText
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.innerHTML = text
    .split(" ")
    .map(
      (w) =>
        `<span class="split-word" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${w}</span></span>`
    )
    .join(" ");
  return Array.from(el.querySelectorAll(".split-word > span")) as HTMLElement[];
}

function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.innerHTML = text
    .split("")
    .map(
      (c) =>
        `<span class="split-char" style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`
    )
    .join("");
  return Array.from(el.querySelectorAll(".split-char")) as HTMLElement[];
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
    }

    const words = splitWords(para);
    para._words = words;

    para.anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }
    const chars = splitChars(title);
    title._chars = chars;

    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
