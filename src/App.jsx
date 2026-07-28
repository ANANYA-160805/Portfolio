import React, { useEffect } from "react";
import gsap from "gsap";
import {
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrollToPlugin,
} from "gsap/all";


import WarpSpeed from "./components/warp/Warp";
import Cursor from "./ui/cursor/Cursor";
import Navbar from "./components/NavBar/Navbar";




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
          </div>
      
    </>
  );
};




export default App
