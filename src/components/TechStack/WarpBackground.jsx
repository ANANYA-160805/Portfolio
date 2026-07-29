import { useEffect, useRef } from "react";
import "./WarpBackground.scss";

export default function WarpBackground({ active = false }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const warpRef = useRef(0);

  useEffect(() => {
    warpRef.current = active ? 1 : 0;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const container = canvas.parentElement;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = container.clientWidth;
      h = canvas.height = container.clientHeight;
    };
    resize();

    function Star() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.c = Math.random() * 255;
    }
    Star.prototype.updateColor = function () {
      this.c = Math.min(255, this.c + 4);
    };
    Star.prototype.updatePos = function () {
      const speedMult = warpRef.current ? 0.02 : 0.012;
      const cx = w / 2, cy = h / 2;
      this.x += (this.x - cx) * speedMult;
      this.y += (this.y - cy) * speedMult;
      this.updateColor();
      if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.c = 0;
      }
    };

    const STAR_COUNT = 160;
    const stars = Array.from({ length: STAR_COUNT }, () => new Star());

    const draw = () => {
      ctx.fillStyle = warpRef.current ? "rgba(3,3,3,0.25)" : "rgba(3,3,3,0.15)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const c = s.c;
       ctx.fillStyle = warpRef.current
  ? `rgb(${c},${Math.floor(c * 0.45)},0)`
  : `rgb(${c},${c},${c})`;
        const size = Math.max(1, c / 100);
        ctx.fillRect(s.x, s.y, size, size);
        s.updatePos();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="warp-bg-canvas" />;
}