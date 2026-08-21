import SmoothScroll from "@/components/shell/smooth-scroll";
import Preloader from "@/components/shell/preloader";
import Nav from "@/components/shell/nav";
import Cursor from "@/components/shell/cursor";
import Grain from "@/components/shell/grain";
import SoundManager from "@/components/shell/sound-manager";
import MuteToggle from "@/components/shell/mute-toggle";
import KeyboardRouter from "@/components/shell/keyboard-router";
import SectionReachTracker from "@/components/shell/section-reach-tracker";
import ScrollToTop from "@/components/shell/scroll-to-top";
import HashScrollOnLoad from "@/components/shell/hash-scroll-on-load";

import Hero from "@/components/sections/hero";
import NavIndex from "@/components/sections/nav-index";
import BrandMarquee from "@/components/sections/brand-marquee";
import Origin from "@/components/sections/origin";
import BestWorkMetro from "@/components/sections/best-work-metro";
import ResearchArchive from "@/components/sections/research-archive";
import ProductLab from "@/components/sections/product-lab";
import Achievements from "@/components/sections/achievements";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <SmoothScroll>
      {/* global overlays */}
      <Preloader />
      <Grain />
      <Cursor />
      <SoundManager />
      <MuteToggle />
      <Nav />
      <KeyboardRouter />
      <SectionReachTracker />
      <ScrollToTop />
      <HashScrollOnLoad />

      {/* main flow — blue → black → black → paper → black → paper → black → paper → black+paper */}
      <main className="relative w-full overflow-x-clip">
        <Hero />
        <NavIndex />
        <BrandMarquee />
        <Origin />
        <BestWorkMetro />
        <ResearchArchive />
        <ProductLab />
        <Achievements />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
