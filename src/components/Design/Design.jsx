// "use client";

// import React, { useLayoutEffect, useRef, useMemo } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import s from "./Design.module.scss";
// import Spline from "@splinetool/react-spline";

// gsap.registerPlugin(ScrollTrigger);

// const LINES = [
//   "FROM DESIGN TO DEVELOPMENT",
//   "COMPLETE DIGITAL SOLUTIONS",
//   "TO ELEVATE YOUR PRODUCT",
// ];

// export const Design = () => {
//   const sectionRef = useRef(null);

//   const titleNodes = useMemo(
//     () =>
//       LINES.map((line, idx) => (
//         <span key={idx} className={`${s.line} js-line`} aria-hidden="true">
//           {line}
//           {idx < LINES.length - 1 && <br />}
//         </span>
//       )),
//     []
//   );

// //  useLayoutEffect(() => {
// //   const sectionEl = sectionRef.current;
// //   if (!sectionEl) return;

// //   const lines = gsap.utils.toArray(sectionEl.querySelectorAll(".js-line"));
// //   if (!lines.length) return;

// //   const supportsBgClip =
// //     typeof CSS !== "undefined" &&
// //     (CSS.supports("-webkit-background-clip", "text") ||
// //       CSS.supports("background-clip", "text"));

// //   // начальное состояние: 2 слоя фона (верхний белый 0%, нижний серый 100%)
// //   if (supportsBgClip) {
// //     lines.forEach((el) => el.classList.add(s.bgClip));
// //     gsap.set(lines, {
// //       backgroundSize: "0% 100%, 100% 100%",
// //       backgroundPosition: "left center, left center",
// //     });
// //   } else {
// //     gsap.set(lines, { color: "rgba(255,255,255,0.18)" });
// //   }

// //   // timeline: для каждой строки свой tween (заполняется слева->направо)
// //   const tl = gsap.timeline();
// //   lines.forEach((el) => {
// //     if (supportsBgClip) {
// //       tl.to(
// //         el,
// //         {
// //           backgroundSize: "100% 100%, 100% 100%",
// //           duration: 1,     // каждая строка "занимает" 1 единицу времени в timeline
// //           ease: "none",
// //         },
// //         "+=0" // идут строго одна за другой
// //       );
// //     } else {
// //       tl.to(
// //         el,
// //         {
// //           color: "rgba(255,255,255,1)",
// //           duration: 1,
// //           ease: "none",
// //         },
// //         "+=0"
// //       );
// //     }
// //   });

// //   // ScrollTrigger: привязываем timeline к прокрутке
// //   const totalScreens = lines.length; // по 1 экрану на строку
// //   const st = ScrollTrigger.create({
// //     trigger: sectionEl,
// //     start: "top 85%",
// //     end: `+=${totalScreens * 100}%`, // например, 3 строки -> "+=300%" (3 экрана)
// //     scrub: 0.5, // демпфинг, можно увеличить/уменьшить
// //     animation: tl,
// //     // markers: true, // включи для отладки
// //   });

// //   const ro = new ResizeObserver(() => ScrollTrigger.refresh());
// //   ro.observe(sectionEl);
// //   requestAnimationFrame(() => ScrollTrigger.refresh());

// //   return () => {
// //     st.kill();
// //     tl.kill();
// //     ro.disconnect();
// //   };
// // }, []);

// useLayoutEffect(() => {
//   const sectionEl = sectionRef.current;
//   if (!sectionEl) return;

//   const lines = gsap.utils.toArray(sectionEl.querySelectorAll(".js-line"));
//   if (!lines.length) return;

//   const supportsBgClip =
//     typeof CSS !== "undefined" &&
//     (CSS.supports("-webkit-background-clip", "text") ||
//       CSS.supports("background-clip", "text"));

//   // начальное состояние: два слоя фона (белый сверху 0%, серый снизу 100%)
//   if (supportsBgClip) {
//     lines.forEach((el) => el.classList.add(s.bgClip));
//     gsap.set(lines, {
//       backgroundSize: "0% 100%, 100% 100%",
//       backgroundPosition: "left center, left center",
//     });
//   } else {
//     gsap.set(lines, { color: "rgba(255,255,255,0.18)" });
//   }

//   // timeline: по одной строке — каждая занимает 1 "единицу" в timeline
//   const tl = gsap.timeline({ defaults: { ease: "none", duration: 1 } });
//   lines.forEach((el) => {
//     if (supportsBgClip) {
//       tl.to(el, { backgroundSize: "100% 100%, 100% 100%" }, "+=0");
//     } else {
//       tl.to(el, { color: "rgba(255,255,255,1)" }, "+=0");
//     }
//   });

//   // totalScreens = 2 => суммарно занимаем 2 высоты viewport
//   const totalScreens = 1;

//   const st = ScrollTrigger.create({
//     trigger: sectionEl,
//     start: "top 85%",
//     end: `+=${totalScreens * 89}%`, // "+=200%" -> 2 экрана
//     scrub: true, // строго привязано к скроллу, без демпфинга
//     animation: tl,
//     // markers: true, // включи для отладки
//   });

//   const ro = new ResizeObserver(() => ScrollTrigger.refresh());
//   ro.observe(sectionEl);
//   requestAnimationFrame(() => ScrollTrigger.refresh());

//   return () => {
//     st.kill();
//     tl.kill();
//     ro.disconnect();
//   };
// }, []);

//   return (
//     <section ref={sectionRef} className={s.design}>
//       <div className="container">
//         <div className={s.design__wrapper}>
//            <h2 className={s.design__title} aria-label={LINES.join(" / ")}>
//             {titleNodes}
//           </h2>
//           <Spline
//           className={s.design__spline}
//           scene="https://prod.spline.design/yi2WcGKo6DhnpI2S/scene.splinecode"
//         />
//          <p className={s.design__desc}>
//             Your product deserves to shine in the digital space.<br/> At our agency,
//             we blend creativity with cutting-edge solutions<br/> to help you thrive
//             and lead in the digital world
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Design;

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import s from "./Design.module.scss";
import Spline from "@splinetool/react-spline";

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
            <Spline
              className={s.design__spline}
              scene="https://prod.spline.design/yi2WcGKo6DhnpI2S/scene.splinecode"
            />
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
