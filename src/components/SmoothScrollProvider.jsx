"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
// Если не используешь GSAP, можно убрать импорт
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // init
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      // Обновляем ScrollTrigger (если используется)
      try {
        if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.update) {
          ScrollTrigger.update();
        }
      } catch (err) {
        // ignore
      }
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    const onResize = () => {
      lenis.resize();
      try {
        if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.refresh) {
          ScrollTrigger.refresh();
        }
      } catch (err) {}
    };
    window.addEventListener("resize", onResize);

    // опционально: expose для отладки
    // eslint-disable-next-line no-unused-expressions
    window.lenis = lenis; // можно удалить, если не нужно

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      try {
        lenis.destroy();
      } catch (err) {}
      lenisRef.current = null;
      // eslint-disable-next-line no-unused-expressions
      try {
        delete window.lenis;
      } catch (e) {}
    };
  }, []);

  return <>{children}</>;
}
