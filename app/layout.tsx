import type { Metadata } from "next";
import "@/components/transition.tsx"
import "./globals.css";
import TransitionOverlay from "@/components/transition";
import Tabbar from "@/components/tabbar";

export const metadata: Metadata = {
  title: "keijay.me",
  description: "keijay huangs website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Tabbar />
        {/* <TransitionOverlay> */}
        {children}
        {/* </TransitionOverlay> */}
      </body>
    </html >
  );
}
