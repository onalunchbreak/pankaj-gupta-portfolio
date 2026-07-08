import SmoothScroll from "@/components/shell/smooth-scroll";
import Preloader from "@/components/shell/preloader";
import StatusBar from "@/components/shell/status-bar";
import SideRail from "@/components/shell/side-rail";
import Nav from "@/components/shell/nav";
import Cursor from "@/components/shell/cursor";
import Grain from "@/components/shell/grain";
import MuteToggle from "@/components/shell/mute-toggle";
import SoundManager from "@/components/shell/sound-manager";
import CaseCloseOverlay from "@/components/shell/case-close-overlay";
import KeyboardRouter from "@/components/shell/keyboard-router";
import SessionStatsHud from "@/components/shell/session-stats-hud";
import SectionReachTracker from "@/components/shell/section-reach-tracker";

import Hero from "@/components/sections/hero";
import NavIndex from "@/components/sections/nav-index";
import PhilosophyQuote from "@/components/sections/philosophy-quote";
import BrandMarquee from "@/components/sections/brand-marquee";
import Origin from "@/components/sections/origin";
import ProductOS from "@/components/sections/product-os";
import WorkLog from "@/components/sections/work-log";
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
      <StatusBar />
      <SideRail />
      <Nav />
      <MuteToggle />
      <CaseCloseOverlay />
      <KeyboardRouter />
      <SessionStatsHud />
      <SectionReachTracker />

      {/* main flow — blue → black → black → black → paper → paper → blue → black → paper → black → paper → black+paper */}
      <main className="relative w-full overflow-x-clip pt-9">
        <Hero />
        <NavIndex />
        <PhilosophyQuote />
        <BrandMarquee />
        <Origin />
        <ProductOS />
        <WorkLog />
        <BestWorkMetro />
        <ResearchArchive />
        <ProductLab />
        <Achievements />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
