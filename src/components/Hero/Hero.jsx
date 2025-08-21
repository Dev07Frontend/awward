import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));
import s from "./Hero.module.scss";

export const Hero = () => {
  return (
    <>
      <section className={s.hero} aria-labelledby="hero-title">
        <div className="container">
          <div className={s.hero__content}>
            <h1 className={s.hero__title}>
              UX/UI Design & Development
              <br /> for Web3
            </h1>
            <p className={s.hero__desc}>
              Design Support and Development for Blockchain, DeFi, Web3, Crypto
              startups.
              <br /> From Low-code websites to Full-stack Dapps.
            </p>
          </div>
          <div className={s.hero__spline}>
            <Suspense fallback={<div>Loading...</div>}>
              <Spline className="spline-viewer" scene="/cube.splinecode" />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};
