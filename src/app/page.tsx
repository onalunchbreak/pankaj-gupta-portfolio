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

import Hero from "@/components/sections/hero";
import PhilosophyQuote from "@/components/sections/philosophy-quote";
import BrandMarquee from "@/components/sections/brand-marquee";
import ViewsCount from "@/components/sections/views-count";
import CorePhilosophy from "@/components/sections/core-philosophy";
import PlacesHustled from "@/components/sections/places-hustled";
import StatsTrio from "@/components/sections/stats-trio";
import Origin from "@/components/sections/origin";
import Projects from "@/components/sections/projects";
import BestWorkMetro from "@/components/sections/best-work-metro";
import InsomniacWork from "@/components/sections/insomniac-work";
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

      {/* main flow */}
      <main className="relative w-full overflow-x-clip pt-9">
        <Hero />
        <PhilosophyQuote />
        <BrandMarquee />
        <ViewsCount />
        <CorePhilosophy />
        <PlacesHustled />
        <StatsTrio />
        <Origin />
        <Projects />
        <BestWorkMetro />
        <InsomniacWork />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
