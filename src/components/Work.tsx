import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "SIEM System",
    category: "Cybersecurity",
    tools: "FastAPI, React (Vite), Python, MongoDB, Watchdog",
    image: "/images/siem_dashboard.png",
  },
  {
    title: "AI Sign Language Translator",
    category: "AI / Computer Vision",
    tools: "Python, OpenCV, MediaPipe, TensorFlow",
    image: "/images/sign_language_ai.png",
  },
  {
    title: "Music Rehab Platform",
    category: "Healthcare Tech",
    tools: "Python, React, FastAPI, Web Audio API",
    image: "/images/music_rehab.png",
  },
];

const Work = () => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const goTo = (index: number) => {
    if (isAnimating.current) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    if (clamped === current) return;

    isAnimating.current = true;
    const direction = clamped > current ? -1 : 1;

    gsap.to(sliderRef.current, {
      x: direction * 80,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(clamped);
        gsap.fromTo(
          sliderRef.current,
          { x: -direction * 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => { isAnimating.current = false; },
          }
        );
      },
    });
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Mouse wheel - only intercept when section is in view & slide navigation is needed
  useEffect(() => {
    let cooldown = false;
    const handleWheel = (e: WheelEvent) => {
      const section = document.querySelector(".work-section") as HTMLElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // At last slide going down → let page scroll through
      if (goingDown && current >= projects.length - 1) return;
      // At first slide going up → let page scroll through
      if (goingUp && current <= 0) return;

      // Otherwise intercept and navigate slides
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 600);

      if (goingDown) next();
      else if (goingUp) prev();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [current]);

  // Keyboard arrow support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  // Touch swipe support for mobile
  useEffect(() => {
    const el = document.querySelector(".work-slide-wrapper") as HTMLElement;
    if (!el) return;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff < -50) next();
      else if (diff > 50) prev();
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [current]);

  const project = projects[current];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>My <span>Work</span></h2>
          <div className="work-nav">
            <button
              className={`work-nav-btn${current === 0 ? " disabled" : ""}`}
              onClick={prev}
              aria-label="Previous project"
            >
              ←
            </button>
            <div className="work-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`work-dot${i === current ? " active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <button
              className={`work-nav-btn${current === projects.length - 1 ? " disabled" : ""}`}
              onClick={next}
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>

        <div className="work-slide-wrapper">
          <div className="work-box" ref={sliderRef}>
            <div className="work-info">
              <div className="work-title">
                <h3>0{current + 1}</h3>
                <div>
                  <h4>{project.title}</h4>
                  <p>{project.category}</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>{project.tools}</p>
            </div>
            <WorkImage image={project.image} alt={project.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
