import type { Metadata } from "next";
import "@/components/providers"
import "./globals.css";
import Providers from "@/components/providers";
import Tabbar from "@/components/tabbar";
import Head from "next/head";

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
      <Head>
        <title>keijay huang</title>
        <meta name="keijay huang" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />

        <style>
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');
        </style>
        <link rel="preload" as="image" href="/assets/img1.jpg" />
        <link rel="preload" as="image" href="/assets/img2.jpg" />
        <link rel="preload" as="image" href="/assets/img3.jpg" />
      </Head>
      <body>
        <main>
          <Tabbar />
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html >
  );
}
