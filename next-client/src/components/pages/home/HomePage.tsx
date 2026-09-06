import HeroSection from "@/components/pages/home/HeroSection";
import AboutMe from "./AboutMe";
import Contact from "./Contact";
import Experiences from "./Experiences";
import Services from "./Services";
import Skills from "./Skills";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutMe />
      <Skills />
      <Services />
      <Experiences />
      <Contact />
    </main>
  );
}
