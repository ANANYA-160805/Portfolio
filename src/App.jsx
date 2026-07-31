import React, { useEffect } from "react";
import gsap from "gsap";
import {
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrollToPlugin,
} from "gsap/all";


import WarpSpeed from "./components/Warp/Warp";
import Cursor from "./ui/cursor/cursor";
import Navbar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/AboutMe/AboutMe";
import Experience from "./components/Experience/Experience";
import TechStack from "./components/TechStack/TechStack";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";




gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  useEffect(() => {
  ScrollSmoother.create({
    smooth: 3,
    effects: true,
    normalizeScroll: true,
  });

  ScrollTrigger.refresh();
}, []);

 return (
    <>
      <WarpSpeed />
        <Cursor />
          <div id="smooth-wrapper">
          <Navbar />
          <div id="smooth-content">
          <Hero />
          <AboutMe />
           <Experience />
           <TechStack/>
            <Projects />  
             <Contact />  
          </div>
          </div>
      
    </>
  );
};




export default App
