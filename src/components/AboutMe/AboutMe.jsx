import React, { useRef } from "react";
import "./AboutMe.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { aboutmeDescription } from "../../constants/aboutmeConstants";
import ananyaImg from "../../assets/images/common/ananya.jpeg";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const root = sectionRef.current;
    const p = textRef.current;
    if (!root || !p) return;

    const split = new SplitType(p, {
      types: "words",
      wordClass: "whoami-word",
      tagName: "span",
    });

    gsap.set(split.words, { opacity: 0.15, yPercent: 20 });

    const tween = gsap.to(split.words, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top 70%",
        end: "bottom 40%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, { scope: sectionRef });

  return (
    <section className="whoami-section" id="aboutMe">
      <h1 className="whoami-sub-heading">01. About Me</h1>
      <div className="whoami-content" ref={sectionRef}>
        <div className="whoami-inner">
          <p className="split" ref={textRef}>
            {aboutmeDescription}
          </p>
          <img src={ananyaImg} alt="about me" className="whoami-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;