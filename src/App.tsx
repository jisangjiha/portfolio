import SummerBackground from "./components/SummerBackground";
import SandTrail from "./components/SandTrail";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import DotNav from "./components/DotNav";
import TravelingPhone from "./components/TravelingPhone";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <SummerBackground />
      <SandTrail />
      <CustomCursor />
      <Navbar />
      <DotNav />
      <TravelingPhone />
      <div id="deck" className="deck">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </div>
    </>
  );
}
