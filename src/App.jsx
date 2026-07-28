import React, { useEffect } from "react";
import gsap from "gsap";
import {
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrollToPlugin,
} from "gsap/all";

import WarpSpeed from "./components/warp/Warp";




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
      
    </>
  );
};




export default App
