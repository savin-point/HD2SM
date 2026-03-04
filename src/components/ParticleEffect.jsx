import { useEffect, useRef } from "react";

const COLORS = ["#FFEE18", "#FF6753", "#4caf50", "#ffffff", "#a5d6f7", "#ffb347"];

export default function ParticleEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height * 0.42;

    const particles = Array.from({ length: 160 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 10;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: COLORS[i % COLORS.length],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        isRect: Math.random() > 0.4,
        w: 5 + Math.random() * 9,
        h: 3 + Math.random() * 5,
        r: 2 + Math.random() * 3,
      };
    });

    const GRAVITY = 0.18;
    const DRAG = 0.985;
    let animId;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        if (p.alpha <= 0) continue;
        alive = true;

        p.vx *= DRAG;
        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = p.y > canvas.height ? 0 : 1;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        if (p.isRect) {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
