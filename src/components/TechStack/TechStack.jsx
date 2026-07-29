import { useState } from "react";
import "./TechStack.scss";
import WarpBackground from "./WarpBackground";
import {
  FaReact, FaNodeJs, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaAws,
} from "react-icons/fa";
import {
  SiJavascript, SiExpress, SiMongodb, SiMysql, SiTailwindcss, SiSass, SiPostman, SiVite,
} from "react-icons/si";

const categories = [
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "SCSS", icon: <SiSass /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Vite", icon: <SiVite /> },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Java", icon: <FaJava /> },
      { name: "REST APIs", icon: "🔗" },
      { name: "Socket.IO", icon: "⚡" },
    ],
  },
  {
    label: "Data & Cloud",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Pinecone", icon: "📌" },
      { name: "AWS", icon: <FaAws /> },
      { name: "Google Cloud", icon: "☁️" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Postman", icon: <SiPostman /> },
    ],
  },
];

export default function TechStack() {
  const [hovering, setHovering] = useState(false);

  return (
    <section
      className="tech-stack"
      id="skills"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <WarpBackground active={hovering} />

      <div className="container">
        <p className="subtitle">03. TECH STACK</p>
        <h2>Technologies I Work With</h2>
        <p className="description">
          Tools and technologies I use to build modern full-stack web applications.
        </p>

        {categories.map((cat, ci) => (
          <div className="category-block" key={cat.label}>
            <h3 className="category-label">{cat.label}</h3>
            <div className="skills-grid">
              {cat.skills.map((skill, i) => (
                <div
                  className="skill-card"
                  key={skill.name}
                  style={{ animationDelay: `${(ci * 4 + i) * 0.05}s` }}
                >
                  <div className="icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}