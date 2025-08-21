"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // регистрация плагина обязательна

export default function SmoothScroll() {
  useEffect(() => {
    // создаём Lenis и вручную рулём кадрами через GSAP
    const lenis = new Lenis({ autoRaf: false, duration: 1.2 });

    // при каждом «скролле» Lenis просим ScrollTrigger обновляться
    lenis.on("scroll", () => ScrollTrigger.update());

    // подключаем RAF Lenis к тикеру GSAP
    const onTick = (time) => {
      // GSAP даёт секунды, Lenis ждёт миллисекунды
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // чтобы не было «смазки» при просадках FPS

    // после старта обновим расчёты триггеров
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.kill();
    };
  }, []);

  return null;
}
