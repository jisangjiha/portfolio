import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import DotNav from "./components/DotNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <DotNav />
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
