"use client";
import { useSound } from "@/hooks/use-sound";
import { useMuteStore } from "@/hooks/use-mute";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";

export default function MuteToggle() {
  const muted = useMuteStore((s) => s.muted);
  const armed = useMuteStore((s) => s.armed);
  const toggle = useMuteStore((s) => s.toggle);
  const arm = useMuteStore((s) => s.arm);
  const { play } = useSound();
  const booted = useBootStore((s) => s.booted);

  const handleClick = () => {
    if (!armed) {
      arm();
      play("confirm");
      return;
    }
    toggle();
    play("tick");
  };

  if (!booted) return null;

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => play("tick")}
      data-cursor-label={muted ? "unmute" : "mute"}
      className="fixed bottom-4 left-4 z-[78] flex items-center gap-2 border border-white/15 bg-[#0A0A0A]/70 px-2.5 py-2 font-mono text-[10px] uppercase tracking-widest text-[#F4F1EA]/70 backdrop-blur-md transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring sm:bottom-5 sm:left-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
    >
      {muted ? (
        <VolumeX className="h-3.5 w-3.5" />
      ) : (
        <Volume2 className="h-3.5 w-3.5 text-[#FFD400]" />
      )}
      <span className="hidden sm:inline">{muted ? "sound off" : "sound on"}</span>
    </motion.button>
  );
}
