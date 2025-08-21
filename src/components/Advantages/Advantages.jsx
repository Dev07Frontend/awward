"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./Advantages.module.scss";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

/* tabs как у тебя */
const tabs = [
  {
    id: "tab-1",
    title: "Analytics",
    text: "Product Discovery: BPMN diagrams, ER-diagrams, Userflow, User Stories, CJM, Product Requirements Document",
    splineScene: "/ad1.splinecode",
  },
  {
    id: "tab-2",
    title: "UX/UI-design",
    text: "UX / UI design details and case studies...",
    splineScene: "/ad2.splinecode",
  },
  {
    id: "tab-3",
    title: "Development",
    text: "Frontend & Backend development services...",
    splineScene: "/ad1.splinecode",
  },
];

export const Advantages = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  // для измерения текста
  const measureRefs = useRef([]); // refs к скрытым элементам
  const [maxTextHeight, setMaxTextHeight] = useState(0);

  // scenes
  const scenes = useMemo(() => tabs.map((t) => t.splineScene), []);

  // измеряем все скрытые элементы и ставим min-height
  const measureAll = useCallback(() => {
    if (!measureRefs.current || measureRefs.current.length === 0) return;
    let max = 0;
    measureRefs.current.forEach((el) => {
      if (!el) return;
      // getBoundingClientRect даёт точную высоту включая переносы
      const h = Math.ceil(el.getBoundingClientRect().height);
      if (h > max) max = h;
    });
    if (max && max !== maxTextHeight) setMaxTextHeight(max);
  }, [maxTextHeight]);

  useEffect(() => {
    // измеряем после mount + после шрифта/ресайза
    measureAll();

    // пересчитать при ресайзе
    const onResize = () => {
      // небольшая задержка чтобы шрифты/переносы успели
      requestAnimationFrame(() => {
        measureAll();
      });
    };
    window.addEventListener("resize", onResize);

    // перезапуск измерений после полной загрузки шрифтов (если используются webfonts)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // чуть позже, чтобы браузер применил метрики
        setTimeout(measureAll, 50);
      });
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [measureAll]);

  // -- ОСТАВЛЯЕМ ТВОЙ ЛОГИК ДЛЯ СКРОЛЛА/ТАЧА И ТД. (НЕ ТРОГАЛ)
  // accumulate wheel deltas and schedule via rAF
  const wheelAccum = useRef(0);
  const rafScheduled = useRef(false);
  const throttled = useRef(false);

  // touch
  const touchStartY = useRef(null);

  const changeTab = useCallback((idx) => {
    setActiveTab((prev) => {
      const next = Math.max(0, Math.min(tabs.length - 1, idx));
      if (next === prev) return prev;
      return next;
    });
  }, []);

  const changeTabBy = useCallback((dir) => {
    setActiveTab((prev) => {
      const next = Math.max(0, Math.min(tabs.length - 1, prev + dir));
      return next;
    });
  }, []);

  const processAccum = useCallback(() => {
    rafScheduled.current = false;
    const accum = wheelAccum.current;
    const threshold = 90;
    if (!throttled.current && Math.abs(accum) > threshold) {
      if (accum > 0) changeTabBy(1);
      else changeTabBy(-1);
      throttled.current = true;
      setTimeout(() => {
        throttled.current = false;
      }, 500);
      wheelAccum.current = 0;
    } else {
      wheelAccum.current *= 0.6;
      if (Math.abs(wheelAccum.current) < 0.5) wheelAccum.current = 0;
    }
  }, [changeTabBy]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      if (
        !(
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        )
      )
        return;
      const hasLenis = typeof window !== "undefined" && !!window.lenis;
      if (!hasLenis) {
        try {
          e.preventDefault();
        } catch (err) {}
      }
      wheelAccum.current += e.deltaY;
      if (!rafScheduled.current) {
        rafScheduled.current = true;
        requestAnimationFrame(processAccum);
      }
    };

    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      const rect = container.getBoundingClientRect();
      if (
        t.clientX >= rect.left &&
        t.clientX <= rect.right &&
        t.clientY >= rect.top &&
        t.clientY <= rect.bottom
      ) {
        touchStartY.current = t.clientY;
      } else {
        touchStartY.current = null;
      }
    };
    const onTouchMove = (e) => {
      if (touchStartY.current === null) return;
      const t = e.touches && e.touches[0];
      if (!t) return;
      const delta = touchStartY.current - t.clientY;
      const swipeThreshold = 60;
      if (!throttled.current && Math.abs(delta) > swipeThreshold) {
        if (delta > 0) changeTabBy(1);
        else changeTabBy(-1);
        throttled.current = true;
        setTimeout(() => (throttled.current = false), 600);
        touchStartY.current = null;
      }
    };

    const onPointerEnter = () => (container.dataset.hovering = "true");
    const onPointerLeave = () => (container.dataset.hovering = "false");

    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [processAccum, changeTabBy]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        changeTabBy(1);
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        changeTabBy(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeTabBy]);

  // motion variants
  const textVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <section className={s.advantages}>
      <div className="container">
        <div
          className={s.advantages__wrapper}
          ref={containerRef}
          aria-roledescription="carousel"
        >
          {/* HIDDEN MEASURE NODE — off-screen, same width as visible .sideText */}
          <div className={s.textMeasure} aria-hidden="true">
            {tabs.map((t, i) => (
              <div
                key={`m-${t.id}`}
                ref={(el) => (measureRefs.current[i] = el)}
                className={s.measureItem}
              >
                <p>{t.text}</p>
              </div>
            ))}
          </div>

          <div className={s.sideLeft}>
            {/* Применяем minHeight, чтобы текст-контейнер не менял layout */}
            <div
              className={s.sideText}
              style={
                maxTextHeight ? { minHeight: `${maxTextHeight}px` } : undefined
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeTab}`}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.28 }}
                >
                  <p>{tabs[activeTab].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className={s.center}>
            <div className={s.splineStack}>
              {scenes.map((scene, idx) => {
                const isActive = idx === activeTab;
                return (
                  <motion.div
                    key={scene + idx}
                    className={s.splineLayer}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.98,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 0.9, 0.2, 1] }}
                  >
                    <Suspense fallback={<div>Loading...</div>}>
                      <Spline scene={scene} className={s.spline} />
                    </Suspense>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <nav className={s.sideRight} aria-label="Advantages tabs">
            {tabs.map((tab, idx) => (
              <motion.button
                key={tab.id}
                className={`${s.navBtn} ${activeTab === idx ? s.active : ""}`}
                onClick={() => changeTab(idx)}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                aria-pressed={activeTab === idx}
              >
                <span className={s.titleTxt}>{tab.title}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
