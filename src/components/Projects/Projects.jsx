

import React, { useEffect, useRef, useState } from "react";
import "./Projects.scss";
import portfolioImg from "../../assets/images/common/portfolio.png";
import echoAIImg from "../../assets/images/common/EchoAI.png";
import captionCraftImg from "../../assets/images/common/caption-craft.png";

const PROJECTS = [
 
  {
    title: "Echo AI — Full Stack AI Chat Application",
    desc:
      "Built a real-time AI chat application using React, Node.js, Express, Socket.IO, MongoDB, and Google's Gemini API. Implemented JWT authentication, persistent chat history, real-time messaging, AI-powered conversations, and a modern responsive interface. Designed a scalable backend with REST APIs and WebSocket communication for seamless user experience.",
    image: echoAIImg,
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "Gemini API",
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://echoai-ua1s.onrender.com/",
        icon: "↗",
      },
      {
        label: "Source Code",
        href: "https://github.com/ANANYA-160805/EchoAI.git",
        icon: "⌂",
      },
    ],
  },
  {
    title: "CaptionCraft — AI Caption Generator",
    desc:
      "Developed an AI-powered caption generation application using React, Node.js, Express, and the Gemini API. Users can generate creative social media captions from prompts, copy results instantly, and enjoy a responsive interface with fast API interactions and robust error handling.",
    image: captionCraftImg,
    tags: ["React", "JavaScript", "CSS", "API"],
    links: [
      {
        label: "Live Demo",
        href: "https://www.linkedin.com/posts/ananya-sinha-724421307_reactjs-nodejs-expressjs-ugcPost-7467578731973459968-0Iig/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE4xzMwBLm2TDSi05yX-S6EsDDv_xLR8AjY",
        icon: "↗",
      },
      {
        label: "Source Code",
        href: "https://github.com/ANANYA-160805/CaptionCraft.git",
        icon: "⌂",
      },
    ],
  },
   {
    title: "GSAP Portfolio — React + GSAP",
    desc:
      "Designed and built a high-performance animated portfolio using React and GSAP. Implemented ScrollTrigger-based section pinning, scrubbed timelines, parallax/zoom effects, and smooth anchor navigation. Built reusable motion patterns, responsive layouts, and optimized rendering with will-change, transform-based animations, and cleanup-safe GSAP hooks for consistent behavior across refresh/resize.",
    image: portfolioImg,
    tags: ["React", "GSAP", "ScrollTrigger", "SCSS", "Vite"],
    links: [
      { label: "Live Demo", href: "", icon: "↗" },
      {
        label: "Source Code",
        href: "https://github.com/ANANYA-160805/Portfolio.git",
        icon: "⌂",
      },
    ],
  },
];

export default function Projects() {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTimeout = useRef(null);

  const scrollToIndex = (index) => {
    const clamped = Math.max(0, Math.min(index, PROJECTS.length - 1));
    const slide = slideRefs.current[clamped];
    if (slide && trackRef.current) {
      trackRef.current.scrollTo({
        left: slide.offsetLeft - trackRef.current.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        const trackLeft = track.getBoundingClientRect().left;
        let closest = 0;
        let closestDist = Infinity;

        slideRefs.current.forEach((slide, i) => {
          if (!slide) return;
          const dist = Math.abs(slide.getBoundingClientRect().left - trackLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });

        setActiveIndex(closest);
      }, 100);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS</h2>
        <p className="sectionSub">
          A selection of projects showcasing API design, scalable backend architecture, and practical full-stack integrations.
        </p>
      </div>

      <div className="projectsSlider">
        <button
          type="button"
          className="projectsArrow projectsArrow--prev"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous project"
        >
          ←
        </button>

        <div
          className="projectsTrack"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Project slides"
          aria-live="polite"
          onKeyDown={handleKeyDown}
        >
          {PROJECTS.map((p, i) => (
            <article
              className="projectSlide"
              key={p.title}
              ref={(el) => (slideRefs.current[i] = el)}
            >
              <div className="projectCard">
                <div className="projectMedia">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="projectMediaOverlay" />
                </div>

                <div className="projectBody">
                  <h3 className="projectTitle">{p.title}</h3>
                  <p className="projectDesc">{p.desc}</p>

                  <div className="projectTags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="projectFooter">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        className="projectLink"
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="icon">{l.icon}</span>
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="projectsArrow projectsArrow--next"
          onClick={handleNext}
          disabled={activeIndex === PROJECTS.length - 1}
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <div className="projectsDots" role="tablist" aria-label="Select project">
        {PROJECTS.map((p, i) => (
          <button
            key={p.title}
            type="button"
            className={`projectsDot ${i === activeIndex ? "is-active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${p.title}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
    </section>
  );
}