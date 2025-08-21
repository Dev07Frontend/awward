import Script from "next/script";
import { Manrope } from "next/font/google";
import "@/styles/index.scss";
import SmoothScroll from "@/components/SmoothScroll";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

// Создаём экземпляр шрифта
const manrope = Manrope({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Awward",
  description: "Awward No-code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <SmoothScroll/> */}
      <body className={`${manrope.className}`}>{children}</body>
    </html>
  );
}
