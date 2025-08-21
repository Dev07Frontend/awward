"use client";

import SmoothScroll from "@/components/SmoothScroll";
import { Company } from "@/components/Company/Company";
import { Design } from "@/components/Design/Design";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Advantages } from "@/components/Advantages/Advantages";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Hero />
      <Header />
      <Company />
      <Design />
      <Advantages />
    </>
  );
}
