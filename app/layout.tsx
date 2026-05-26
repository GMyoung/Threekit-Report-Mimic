import type { Metadata } from "next";
import "@/app/globals.css";
import { GlobalCanvasRoot } from "@/components/webgl/GlobalCanvasRoot";

export const metadata: Metadata = {
  title: "The State of Configurable Product Manufacturing Websites",
  description: "Interactive Threekit report microsite with data-driven sections and shared Three.js canvas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <GlobalCanvasRoot />
        {children}
      </body>
    </html>
  );
}
