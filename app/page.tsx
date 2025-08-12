import Starfield from "@/components/starfield";
import ScrollWrapper from "@/components/scrollWrapper";
import Hero from "@/components/hero";
import SocialLinks from "@/components/socials";
import Email from "@/components/email";
import Head from "next/head";
import Divider from "@/components/divider";
import About from "@/components/about";
import Works from "@/components/works";
import Footer from "@/components/footer";
//https://coolors.co/283044-78a1bb-ebf5ee-bfa89e-8b786d

export default function Home() {
  const height = 5000;
  // intro();
  return (
    <>
      <Head>
        <title>keijay huang</title>
        <meta name="keijay huang" />
        <link rel="preload" as="image" href="/assets/img1.jpg" />
        <link rel="preload" as="image" href="/assets/img2.jpg" />
        <link rel="preload" as="image" href="/assets/img3.jpg" />
      </Head>
      <main>
        <ScrollWrapper
          moving={
            <div className={"p-0 grainy-background"} >
              <div className="flex flex-col">
                <Hero />
                <Divider />
                <About />
                <Divider />
                <Works />
                <Footer />
              </div>
              <Starfield height={1000} />
            </div>
          }
          fixed={
            <div>
              <SocialLinks />
              <Email />
            </div>
          }
        />
      </main>
    </>
  );
}

