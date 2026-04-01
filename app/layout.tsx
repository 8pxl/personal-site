import type { Metadata } from "next";
import "@/components/providers"
import "./globals.css";
import Providers from "@/components/providers";
import Tabbar from "@/components/tabbar";
import ScrollWrapper from "@/components/scrollWrapper";
import Starfield from "@/components/starfield";
import SocialLinks from "@/components/socials";
import Email from "@/components/email";
import ResumeLink from "@/components/resumeLink";
import HoverOverlay from "@/components/HoverOverlay";


export const metadata: Metadata = {
  title: "keijay.me",
  description: "keijay huangs website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const starsHeight = 1000;
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <HoverOverlay />
          <ScrollWrapper

            moving={
              <div className={"p-0 grainy-background"} >
                {children}
                <Starfield height={starsHeight} />
              </div>
            }
            fixed={
              <div>
                <SocialLinks />
                <ResumeLink />
                <Email />
              </div>
            }
          />
          <Tabbar />
        </Providers>
      </body>
    </html >
  );
}
