"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import s from "./Design.module.scss";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

const LINES = [
  "FROM DESIGN TO DEVELOPMENT",
  "COMPLETE DIGITAL SOLUTIONS",
  "TO ELEVATE YOUR PRODUCT",
];

export const Design = () => {
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ждем монтирования компонента на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const supportsBgClip =
    isMounted &&
    (CSS.supports("-webkit-background-clip", "text") ||
      CSS.supports("background-clip", "text"));

  const enter = 0.0; // first line starts right away
  const stagger = 0.15; // wait until the previous line is finished
  const lineDur = 0.15; // duration of one line

  const titleNodes = LINES.map((line, i) => {
    const start = Math.min(1, enter + i * stagger);
    const end = Math.min(1, start + lineDur);

    const lineProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
    const smooth = useSpring(lineProgress, { stiffness: 140, damping: 24 });

    if (supportsBgClip) {
      const bgSize = useTransform(
        smooth,
        (v) => `${Math.round(v * 100)}% 100%, 100% 100%`
      );

      return (
        <motion.span
          key={i}
          className={`${s.line} ${s.bgClip}`}
          aria-hidden="true"
          style={{
            backgroundSize: bgSize,
            backgroundPosition: "left center, left center",
            backgroundRepeat: "no-repeat, no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {line}
          {i < LINES.length - 1 && <br />}
        </motion.span>
      );
    }

    const color = useTransform(smooth, (v) => {
      const alpha = 0.18 + 0.82 * v;
      return `rgba(255,255,255,${alpha.toFixed(3)})`;
    });

    return (
      <motion.span
        key={i}
        className={s.line}
        aria-hidden="true"
        style={{ color }}
      >
        {line}
        {i < LINES.length - 1 && <br />}
      </motion.span>
    );
  });

  return (
    <section ref={sectionRef} className={s.design}>
      <div className="container">
        <div className={s.design__wrapper}>
          <h2 className={s.design__title} aria-label={LINES.join(" / ")}>
            {titleNodes}
          </h2>

          {isMounted && (
            <Suspense fallback={<div>Loading...</div>}>
              <Spline className={s.design__spline} scene="/cube2.splinecode" />
            </Suspense>
          )}

          <p className={s.design__desc}>
            Your product deserves to shine in the digital space.
            <br /> At our agency, we blend creativity with cutting-edge
            solutions
            <br /> to help you thrive and lead in the digital world
          </p>
        </div>
      </div>
    </section>
  );
};

export default Design;
