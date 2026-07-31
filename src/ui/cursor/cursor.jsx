import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import "./cursor.scss";

export default function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    const setDotX = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power3.out",
    });
    const setDotY = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    const setGlowX = gsap.quickTo(glow, "x", {
      duration: 0.7,
      ease: "power3.out",
    });
    const setGlowY = gsap.quickTo(glow, "y", {
      duration: 0.7,
      ease: "power3.out",
    });

    const move = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setGlowX(e.clientX);
      setGlowY(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="cursor-dot" />
    </>,
    document.body
  );
}