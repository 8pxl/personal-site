import Starfield from "@/components/starfield";
// import Planets from "@/components/planets";
import Tabbar from "@/components/tabbar";
import ScrollWrapper from "@/components/scrollWrapper";
import Hero from "@/components/hero";
import SocialLinks from "@/components/socials";
import Email from "@/components/email";
import Divider from "@/components/divider";
import About from "@/components/about";
import Works from "@/components/works";
import Footer from "@/components/footer";
//https://coolors.co/283044-78a1bb-ebf5ee-bfa89e-8b786d

export default function Home() {
  const height = 1000;
  return (
    <div className="flex flex-col">
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Works />
      <Footer />
    </div>
  );
}

