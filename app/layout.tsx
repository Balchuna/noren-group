import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const serif = localFont({
  src: [
    { path: "../assets/fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const sans = localFont({
  src: [
    { path: "../assets/fonts/InstrumentSans-Variable.woff2", weight: "400 700", style: "normal" },
    { path: "../assets/fonts/InstrumentSans-Italic-Variable.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Noren Group — Estratégia, marca e crescimento para restaurantes",
  description:
    "Visualizer conceitual da Noren Group. Estratégia, marca e crescimento para restaurantes construídos para durar.",
};

export const viewport: Viewport = {
  themeColor: "#111010",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={serif.variable + " " + sans.variable}>
      <head>
        <script
          // marca que o JS está ativo: só então os reveals começam escondidos.
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "window.addEventListener('error',function(){document.documentElement.classList.add('js-error')});",
          }}
        />
      </head>
      <body className="grain">
        <SmoothScroll />
        <Preloader />
        <CustomCursor />
        <TransitionProvider>
          <Navbar />
          <main id="noren-page">{children}</main>
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
