import React from "react";
import "./Projects.scss";
import portfolioImg from "../../assets/images/common/portfolio.png";
import echoAIImg from "../../assets/images/common/EchoAI.png";

const PROJECTS = [
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
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS</h2>
        <p className="sectionSub">
          A selection of projects showcasing API design, scalable backend architecture, and practical full-stack integrations.
        </p>
      </div>

      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
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
          </article>
        ))}
      </div>
    </section>
  );
}