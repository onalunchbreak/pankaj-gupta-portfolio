"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  Sparkles,
  Star,
  Search,
  Settings,
  Compass,
  BarChart2,
  MessageSquare,
  Cpu,
  Move,
  Copy,
  Check,
  RotateCcw,
  ArrowRightLeft,
  Eye,
  Type,
  Tag,
  Navigation,
  Plus,
  Trash2,
  Undo2,
  Redo2,
  Palette,
  Baseline,
  Underline,
  Edit3,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { HERO } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

const EASE = [0.16, 1, 0.3, 1] as const;

function useLiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursStr = String(hours).padStart(2, "0");
      setTime(`${hoursStr}:${minutes} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export type NodeType = "quote" | "tag" | "arrow";
export type FontFamilyOption = "handwritten" | "mono" | "sans" | "serif";

export interface StudioNode {
  id: string;
  type: NodeType;
  text: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  fontSize: number; // in px
  fontFamily: FontFamilyOption;
  color: string;
  highlight: boolean;
  // Arrow specific
  curvature?: number; // 0 = straight, >0 = curved
  flipX?: boolean;
  arrowLength?: number;
}

// Preset color palette for fast professional styling
const COLOR_PRESETS = [
  "#F7F4ED", // Warm Off-White
  "#FFD400", // Signature Electric Yellow
  "#38BDF8", // Cyan Blue
  "#F43F5E", // Rose Red
  "#10B981", // Emerald Green
  "#A855F7", // Purple
  "#FFFFFF", // Pure White
];

// Initial default canvas nodes
const INITIAL_STUDIO_NODES: StudioNode[] = [
  // 1. PRODUCT STRATEGY
  {
    id: "quote-strategy",
    type: "quote",
    text: "I connect the dots others miss.",
    x: 0,
    y: 0,
    scale: 1,
    rotation: -2,
    fontSize: 24,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },
  {
    id: "arrow-strategy",
    type: "arrow",
    text: "",
    x: 230,
    y: 0,
    scale: 1,
    rotation: 0,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 18,
    flipX: true,
    arrowLength: 80,
  },
  {
    id: "tag-strategy",
    type: "tag",
    text: "PRODUCT STRATEGY",
    x: 40,
    y: 50,
    scale: 1,
    rotation: -1,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },

  // 2. USER RESEARCH
  {
    id: "tag-research",
    type: "tag",
    text: "USER RESEARCH",
    x: 20,
    y: 160,
    scale: 1,
    rotation: 2,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "arrow-research",
    type: "arrow",
    text: "",
    x: 160,
    y: 160,
    scale: 1,
    rotation: 0,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 14,
    flipX: false,
    arrowLength: 65,
  },
  {
    id: "quote-research",
    type: "quote",
    text: "small bets, big impact.",
    x: 240,
    y: 150,
    scale: 1,
    rotation: 2,
    fontSize: 24,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },

  // 3. WORKFLOW AUTOMATION
  {
    id: "quote-automation",
    type: "quote",
    text: "Fewer clicks, same outcome.",
    x: 0,
    y: 300,
    scale: 1,
    rotation: -1,
    fontSize: 20,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },
  {
    id: "arrow-automation",
    type: "arrow",
    text: "",
    x: 40,
    y: 345,
    scale: 1,
    rotation: 90,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 16,
    flipX: false,
    arrowLength: 50,
  },
  {
    id: "tag-automation",
    type: "tag",
    text: "WORKFLOW AUTOMATION",
    x: 0,
    y: 380,
    scale: 1,
    rotation: 1,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },

  // 4. ROADMAPPING
  {
    id: "quote-roadmapping",
    type: "quote",
    text: "Plans change. Direction shouldn't.",
    x: 50,
    y: 460,
    scale: 1,
    rotation: -2,
    fontSize: 20,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },
  {
    id: "arrow-roadmapping",
    type: "arrow",
    text: "",
    x: 90,
    y: 505,
    scale: 1,
    rotation: 90,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 16,
    flipX: false,
    arrowLength: 50,
  },
  {
    id: "tag-roadmapping",
    type: "tag",
    text: "ROADMAPPING",
    x: 50,
    y: 540,
    scale: 1,
    rotation: -2,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },

  // 5. APPLIED AI (Right Flank)
  {
    id: "arrow-ai",
    type: "arrow",
    text: "",
    x: 10,
    y: 0,
    scale: 1,
    rotation: 0,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 18,
    flipX: false,
    arrowLength: 80,
  },
  {
    id: "quote-ai",
    type: "quote",
    text: "curious by nature, obsessed with value. :)",
    x: 100,
    y: 0,
    scale: 1,
    rotation: -1,
    fontSize: 24,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },
  {
    id: "tag-ai",
    type: "tag",
    text: "APPLIED AI",
    x: 180,
    y: 50,
    scale: 1,
    rotation: 2,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },

  // 6. STORYTELLING
  {
    id: "quote-storytelling",
    type: "quote",
    text: "Numbers don't sell. Stories do.",
    x: 60,
    y: 150,
    scale: 1,
    rotation: 1,
    fontSize: 20,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },
  {
    id: "arrow-storytelling",
    type: "arrow",
    text: "",
    x: 140,
    y: 195,
    scale: 1,
    rotation: 90,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 16,
    flipX: false,
    arrowLength: 50,
  },
  {
    id: "tag-storytelling",
    type: "tag",
    text: "STORYTELLING",
    x: 120,
    y: 230,
    scale: 1,
    rotation: -1,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },

  // 7. PRODUCT DISCOVERY
  {
    id: "tag-discovery",
    type: "tag",
    text: "PRODUCT DISCOVERY",
    x: 100,
    y: 320,
    scale: 1,
    rotation: 3,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "arrow-discovery",
    type: "arrow",
    text: "",
    x: 140,
    y: 355,
    scale: 1,
    rotation: -90,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 18,
    flipX: false,
    arrowLength: 50,
  },
  {
    id: "quote-discovery",
    type: "quote",
    text: "data > opinion, always.",
    x: 100,
    y: 395,
    scale: 1,
    rotation: 1,
    fontSize: 24,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },

  // 8. SYSTEM DESIGN
  {
    id: "tag-system",
    type: "tag",
    text: "SYSTEM DESIGN",
    x: 120,
    y: 470,
    scale: 1,
    rotation: -2,
    fontSize: 12,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "arrow-system",
    type: "arrow",
    text: "",
    x: 150,
    y: 505,
    scale: 1,
    rotation: 90,
    fontSize: 14,
    fontFamily: "mono",
    color: "#FFD400",
    highlight: false,
    curvature: 16,
    flipX: false,
    arrowLength: 50,
  },
  {
    id: "quote-system",
    type: "quote",
    text: "scalable architectures, zero noise.",
    x: 40,
    y: 540,
    scale: 1,
    rotation: -1,
    fontSize: 20,
    fontFamily: "handwritten",
    color: "#F7F4ED",
    highlight: true,
  },
];

/**
 * Mathematically seamless SVG Arrow component.
 */
function StudioArrow({
  node,
}: {
  node: StudioNode;
}) {
  const width = node.arrowLength || 80;
  const height = 36;
  const curvature = node.curvature ?? 16;
  const color = node.color || "#FFD400";
  const strokeWidth = 2.2;
  const flipX = node.flipX ?? false;

  const isStraight = curvature === 0;
  const startX = 8;
  const startY = height / 2;
  const endX = width - 16;
  const endY = height / 2;

  const pathD = isStraight
    ? `M ${startX} ${startY} L ${endX} ${endY}`
    : `M ${startX} ${startY} Q ${width / 2} ${startY - curvature} ${endX} ${endY}`;

  const controlY = startY - curvature;
  const tangentAngle = isStraight
    ? Math.atan2(endY - startY, endX - startX)
    : Math.atan2(endY - controlY, endX - width / 2);

  const headLen = 13;
  const angleSpread = Math.PI / 6;

  const x1 = endX - headLen * Math.cos(tangentAngle - angleSpread);
  const y1 = endY - headLen * Math.sin(tangentAngle - angleSpread);
  const x2 = endX - headLen * Math.cos(tangentAngle + angleSpread);
  const y2 = endY - headLen * Math.sin(tangentAngle + angleSpread);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: flipX ? "scaleX(-1)" : "none" }}
      className="overflow-visible select-none pointer-events-none transition-transform"
    >
      <path d={pathD} strokeDasharray="4 4" />
      <path d={`M ${x1} ${y1} L ${endX} ${endY} L ${x2} ${y2}`} strokeWidth={strokeWidth + 0.6} />
    </svg>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const clock = useLiveClock();

  // Portrait scale/offset
  const [scale, setScale] = useState(100);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  // Editor State
  const [layoutMode, setLayoutMode] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic Nodes + Undo/Redo Stack
  const [nodes, setNodes] = useState<StudioNode[]>(INITIAL_STUDIO_NODES);
  const [history, setHistory] = useState<StudioNode[][]>([INITIAL_STUDIO_NODES]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load saved node configurations
  useEffect(() => {
    try {
      const savedNodes = localStorage.getItem("hero_canvas_studio_v3");
      if (savedNodes) {
        const parsed = JSON.parse(savedNodes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNodes(parsed);
          setHistory([parsed]);
          setHistoryIndex(0);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  // Helper to commit new nodes state and push to Undo/Redo stack
  const pushState = useCallback(
    (newNodes: StudioNode[]) => {
      setNodes(newNodes);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newNodes);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      localStorage.setItem("hero_canvas_studio_v3", JSON.stringify(newNodes));
    },
    [history, historyIndex]
  );

  // Undo action
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setNodes(history[prevIndex]);
      localStorage.setItem("hero_canvas_studio_v3", JSON.stringify(history[prevIndex]));
    }
  }, [history, historyIndex]);

  // Redo action
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setNodes(history[nextIndex]);
      localStorage.setItem("hero_canvas_studio_v3", JSON.stringify(history[nextIndex]));
    }
  }, [history, historyIndex]);

  // Update a single node property
  const updateNode = (id: string, partial: Partial<StudioNode>) => {
    const updated = nodes.map((n) => (n.id === id ? { ...n, ...partial } : n));
    pushState(updated);
  };

  // Delete node
  const deleteNode = (id: string) => {
    const updated = nodes.filter((n) => n.id !== id);
    pushState(updated);
    if (selectedId === id) setSelectedId(null);
  };

  // Add a brand new custom node
  const addNewNode = (type: NodeType) => {
    const newId = `${type}-${Date.now()}`;
    const newNode: StudioNode = {
      id: newId,
      type,
      text: type === "quote" ? "Your custom thought here..." : type === "tag" ? "CUSTOM SKILL" : "",
      x: 100 + Math.random() * 80,
      y: 100 + Math.random() * 80,
      scale: 1,
      rotation: 0,
      fontSize: type === "quote" ? 22 : 12,
      fontFamily: type === "quote" ? "handwritten" : "mono",
      color: type === "arrow" ? "#FFD400" : "#F7F4ED",
      highlight: type === "quote",
      curvature: 16,
      flipX: false,
      arrowLength: 80,
    };

    pushState([...nodes, newNode]);
    setSelectedId(newId);
    if (type !== "arrow") setEditingId(newId);
  };

  // Reset to initial baseline
  const resetAllNodes = () => {
    pushState(INITIAL_STUDIO_NODES);
    setSelectedId(null);
    localStorage.removeItem("hero_canvas_studio_v3");
  };

  // Keyboard shortcut listener (Ctrl+Z, Delete, etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently editing an input or textarea
      if (editingId || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      } else if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId) {
          e.preventDefault();
          deleteNode(selectedId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingId, selectedId, handleUndo, handleRedo]);

  const copyNodesJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(nodes, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tagXOffset = -xOffset * 0.75;
  const tagOpacity = Math.max(0.15, 1 - Math.abs(xOffset) / 550);

  const selectedNode = nodes.find((n) => n.id === selectedId);

  // Render individual Node with full typography and styling support
  const renderStudioNode = (node: StudioNode) => {
    const isSelected = selectedId === node.id;
    const isEditing = editingId === node.id;

    const fontClass =
      node.fontFamily === "handwritten"
        ? "hand-display"
        : node.fontFamily === "mono"
        ? "font-mono"
        : node.fontFamily === "serif"
        ? "font-serif"
        : "font-sans";

    return (
      <motion.div
        key={node.id}
        drag={layoutMode}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          updateNode(node.id, { x: node.x + info.offset.x, y: node.y + info.offset.y });
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(node.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setSelectedId(node.id);
          if (node.type !== "arrow") setEditingId(node.id);
        }}
        style={{
          x: node.x,
          y: node.y,
          scale: node.scale,
          rotate: node.rotation,
        }}
        className={`pointer-events-auto relative inline-flex items-center p-1.5 rounded-md transition-all ${
          layoutMode ? "cursor-grab active:cursor-grabbing hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
        } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/60 shadow-2xl z-30" : ""}`}
      >
        {node.type === "arrow" ? (
          <StudioArrow node={node} />
        ) : node.type === "tag" ? (
          <div
            className={`flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-3.5 py-1.5 uppercase tracking-wider backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] select-none ${fontClass}`}
            style={{ fontSize: `${node.fontSize}px`, color: node.color }}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FFD400] shrink-0" />
            {isEditing ? (
              <input
                type="text"
                value={node.text}
                onChange={(e) => updateNode(node.id, { text: e.target.value })}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
                autoFocus
                className="bg-black/80 border border-[#FFD400] px-1 py-0.5 text-white outline-none rounded"
              />
            ) : (
              <span className="border-b border-[#FFD400] pb-0.5">{node.text}</span>
            )}
          </div>
        ) : (
          <div
            className={`relative leading-snug select-none ${fontClass}`}
            style={{ fontSize: `${node.fontSize}px`, color: node.color }}
          >
            {isEditing ? (
              <textarea
                value={node.text}
                onChange={(e) => updateNode(node.id, { text: e.target.value })}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && setEditingId(null)}
                autoFocus
                rows={2}
                className="bg-black/90 border border-[#FFD400] p-1.5 text-white outline-none rounded min-w-[220px]"
              />
            ) : (
              <span className="relative inline-block">
                {node.text}
                {node.highlight && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full pointer-events-none" />
                )}
              </span>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section
      id="hero"
      onClick={() => {
        setSelectedId(null);
        setEditingId(null);
      }}
      className="env-blue relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-5 py-8 sm:px-8 sm:py-12 select-none"
    >
      {/* ---- L-shaped corner framing marks ---- */}
      <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-white/40 sm:left-6 sm:top-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-white/40 sm:right-6 sm:top-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-white/40 sm:bottom-6 sm:left-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-white/40 sm:bottom-6 sm:right-6 sm:h-6 sm:w-6" />

      {/* ---- Top metadata bar ---- */}
      <div className="relative z-20 flex w-full items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7F4ED]/75 sm:text-[11px] pointer-events-none">
        <motion.span
          className="max-w-[55%] leading-relaxed pointer-events-none pl-2 sm:pl-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          <span className="block text-[12px] sm:text-[14px] font-bold tracking-[0.22em] text-[#F7F4ED]">
            {HERO.topMeta}
          </span>
        </motion.span>

        <motion.div
          className="hidden max-w-[42%] text-right leading-relaxed sm:block pointer-events-auto z-20"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          {(() => {
            const parts = HERO.topLinks.split(" → ");
            const targets = ["best-work", "lab", "contact"];
            return (
              <>
                <span className="block text-[#F7F4ED]/80 select-none">{parts[0]}:</span>
                {parts.slice(1).map((part, index) => {
                  const targetId = targets[index];
                  return (
                    <button
                      key={part}
                      onClick={() => scrollTo(targetId)}
                      className="block w-full text-right text-white hover:text-[#FFD400] transition-colors focus:outline-none focus-ring select-none cursor-pointer"
                    >
                      ↓ {part}
                    </button>
                  );
                })}
              </>
            );
          })()}
        </motion.div>
      </div>

      {/* ---- Symmetrically Centered System Time ---- */}
      <motion.span
        className="absolute left-1/2 top-3 -translate-x-1/2 z-20 text-center font-mono text-[13px] uppercase tracking-[0.2em] text-[#FFD400] sm:top-6 sm:text-[15px] font-bold pointer-events-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.6, ease: EASE }}
      >
        {clock}
      </motion.span>

      {/* ---- MAIN HERO CANVAS ---- */}
      <div className="relative z-10 my-auto flex w-full flex-1 items-center justify-center py-1">

        {/* ---- Centered Cutout Portrait of Pankaj Gupta ---- */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-end w-full max-w-[680px] lg:max-w-[820px] -mt-8 sm:-mt-12 mb-2 origin-bottom pointer-events-none"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, scale: scale / 100, x: xOffset, y: yOffset }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          <div className="relative w-full h-[72vh] min-h-[500px] max-h-[760px] flex items-end justify-center">
            <Image
              src="/pankaj-hero-cutout.png"
              alt="Pankaj Gupta"
              width={1000}
              height={1200}
              priority
              className="h-full w-auto object-contain object-bottom select-none pointer-events-none transform-gpu"
            />
          </div>
        </motion.div>

        {/* ---- DYNAMIC STUDIO CANVAS NODES LAYER ---- */}
        <motion.div
          className="absolute inset-0 z-20 hidden lg:block pointer-events-none"
          animate={{ x: tagXOffset, opacity: tagOpacity }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {nodes.map(renderStudioNode)}
        </motion.div>

        {/* ---- MOBILE / TABLET REFLOW ---- */}
        <div className="relative z-20 mt-6 flex flex-col items-center gap-4 text-center lg:hidden px-4">
          <div className="hand-display text-xl text-[#F7F4ED]">
            I connect the dots <span className="border-b-2 border-[#FFD400]">others miss.</span>
          </div>
          <div className="hand-display text-xl text-[#F7F4ED]">
            curious by nature, obsessed with <span className="border-b-2 border-[#FFD400]">value. :)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
            {nodes
              .filter((n) => n.type === "tag")
              .map((n) => (
                <span
                  key={n.id}
                  className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white"
                >
                  <Sparkles className="h-3 w-3 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400]">{n.text}</span>
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* ---- CANVAS STUDIO EDITOR HUD TOOLBAR ---- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto font-mono">

        {/* Floating Typography & Node Inspector Panel */}
        <AnimatePresence>
          {selectedNode && layoutMode && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              className="flex flex-col gap-3 rounded-lg border border-[#FFD400]/40 bg-[#0A0A0A]/95 p-4 text-xs text-[#F7F4ED] shadow-2xl backdrop-blur-md w-80"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-[#FFD400] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  {selectedNode.type === "arrow" ? (
                    <Navigation className="h-3.5 w-3.5 text-[#FFD400]" />
                  ) : selectedNode.type === "tag" ? (
                    <Tag className="h-3.5 w-3.5 text-[#FFD400]" />
                  ) : (
                    <Type className="h-3.5 w-3.5 text-[#FFD400]" />
                  )}
                  {selectedNode.type.toUpperCase()}: {selectedNode.text.slice(0, 18) || selectedNode.id}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => deleteNode(selectedNode.id)}
                    title="Delete Node (Backspace)"
                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-white/60 hover:text-white px-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Text Edit Button */}
              {selectedNode.type !== "arrow" && (
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => setEditingId(selectedNode.id)}
                    className="flex items-center gap-1.5 w-full justify-center rounded border border-[#FFD400]/40 bg-[#FFD400]/10 py-1.5 text-[11px] font-bold text-[#FFD400] hover:bg-[#FFD400]/20 transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit Text Label
                  </button>
                </div>
              )}

              {/* Typography Options (for Quotes & Tags) */}
              {selectedNode.type !== "arrow" && (
                <>
                  {/* Font Family Selector */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-white/70">Font Style:</span>
                    <select
                      value={selectedNode.fontFamily}
                      onChange={(e) =>
                        updateNode(selectedNode.id, { fontFamily: e.target.value as FontFamilyOption })
                      }
                      className="bg-black/90 border border-white/20 text-white rounded px-2 py-1 outline-none accent-[#FFD400]"
                    >
                      <option value="handwritten">✍️ Handwritten</option>
                      <option value="mono">💻 Monospace</option>
                      <option value="sans">🎨 Modern Sans</option>
                      <option value="serif">📰 Classic Serif</option>
                    </select>
                  </div>

                  {/* Font Size Slider */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-white/70">Font Size:</span>
                    <input
                      type="range"
                      min="10"
                      max="48"
                      step="1"
                      value={selectedNode.fontSize}
                      onChange={(e) => updateNode(selectedNode.id, { fontSize: parseInt(e.target.value) })}
                      className="w-28 accent-[#FFD400]"
                    />
                    <span className="w-8 text-right font-bold text-[#FFD400]">{selectedNode.fontSize}px</span>
                  </div>

                  {/* Text Underline Highlight Toggle */}
                  {selectedNode.type === "quote" && (
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Yellow Underline:</span>
                      <button
                        onClick={() => updateNode(selectedNode.id, { highlight: !selectedNode.highlight })}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded border text-[10px] ${
                          selectedNode.highlight
                            ? "bg-[#FFD400] text-black font-bold border-[#FFD400]"
                            : "border-white/20 text-white/70"
                        }`}
                      >
                        <Underline className="h-3 w-3" />
                        {selectedNode.highlight ? "Active" : "Off"}
                      </button>
                    </div>
                  )}

                  {/* Color Palette Selector */}
                  <div className="flex items-center justify-between gap-2 text-[11px] pt-1 border-t border-white/10">
                    <span className="text-white/70">Text Color:</span>
                    <div className="flex items-center gap-1.5">
                      {COLOR_PRESETS.map((c) => (
                        <button
                          key={c}
                          onClick={() => updateNode(selectedNode.id, { color: c })}
                          style={{ backgroundColor: c }}
                          className={`h-4 w-4 rounded-full border border-white/40 transition-transform ${
                            selectedNode.color === c ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Arrow Specific Controls */}
              {selectedNode.type === "arrow" && (
                <>
                  {/* Arrow Length */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-white/70">Length:</span>
                    <input
                      type="range"
                      min="40"
                      max="200"
                      step="5"
                      value={selectedNode.arrowLength || 80}
                      onChange={(e) => updateNode(selectedNode.id, { arrowLength: parseInt(e.target.value) })}
                      className="w-28 accent-[#FFD400]"
                    />
                    <span className="w-8 text-right font-bold text-[#FFD400]">
                      {selectedNode.arrowLength || 80}px
                    </span>
                  </div>

                  {/* Curvature (Straight vs Curved) */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-white/70">Shape:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateNode(selectedNode.id, { curvature: 0 })}
                        className={`px-2.5 py-0.5 rounded text-[10px] border ${
                          (selectedNode.curvature ?? 16) === 0
                            ? "bg-[#FFD400] text-[#0A0A0A] font-bold border-[#FFD400]"
                            : "border-white/20 text-white/70 hover:text-white"
                        }`}
                      >
                        Straight
                      </button>
                      <button
                        onClick={() => updateNode(selectedNode.id, { curvature: 18 })}
                        className={`px-2.5 py-0.5 rounded text-[10px] border ${
                          (selectedNode.curvature ?? 16) > 0
                            ? "bg-[#FFD400] text-[#0A0A0A] font-bold border-[#FFD400]"
                            : "border-white/20 text-white/70 hover:text-white"
                        }`}
                      >
                        Curved
                      </button>
                    </div>
                  </div>

                  {(selectedNode.curvature ?? 16) > 0 && (
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Curvature:</span>
                      <input
                        type="range"
                        min="5"
                        max="45"
                        step="1"
                        value={selectedNode.curvature ?? 18}
                        onChange={(e) => updateNode(selectedNode.id, { curvature: parseInt(e.target.value) })}
                        className="w-28 accent-[#FFD400]"
                      />
                      <span className="w-8 text-right font-bold text-[#FFD400]">
                        {selectedNode.curvature ?? 18}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                    <button
                      onClick={() => updateNode(selectedNode.id, { flipX: !selectedNode.flipX })}
                      className="flex items-center gap-1.5 rounded border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
                    >
                      <ArrowRightLeft className="h-3 w-3" />
                      Flip Direction
                    </button>
                  </div>
                </>
              )}

              {/* General Rotation & Scale */}
              <div className="flex items-center justify-between gap-2 text-[11px] pt-1 border-t border-white/10">
                <span className="text-white/70">Rotation:</span>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="2"
                  value={selectedNode.rotation}
                  onChange={(e) => updateNode(selectedNode.id, { rotation: parseInt(e.target.value) })}
                  className="w-28 accent-[#FFD400]"
                />
                <span className="w-8 text-right font-bold text-[#FFD400]">{selectedNode.rotation}°</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Studio HUD Bar */}
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0A0A0A]/95 px-4 py-2 text-xs text-[#F7F4ED] shadow-2xl backdrop-blur-md">

          {/* Toggle Studio Mode */}
          <button
            onClick={() => setLayoutMode(!layoutMode)}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-bold text-[11px] tracking-wider transition-colors ${
              layoutMode
                ? "bg-[#FFD400] text-[#0A0A0A]"
                : "border border-white/30 text-white/80 hover:border-white"
            }`}
          >
            {layoutMode ? <Eye className="h-3.5 w-3.5" /> : <Move className="h-3.5 w-3.5" />}
            {layoutMode ? "STUDIO EDIT: ON" : "STUDIO EDIT: OFF"}
          </button>

          {/* Add New Elements */}
          <div className="flex items-center gap-1 border-l border-white/20 pl-2">
            <button
              onClick={() => addNewNode("quote")}
              title="Add New Custom Quote / Thought"
              className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
            >
              <Plus className="h-3 w-3" />
              Quote
            </button>
            <button
              onClick={() => addNewNode("tag")}
              title="Add New Custom Skill Tag"
              className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
            >
              <Plus className="h-3 w-3" />
              Tag
            </button>
            <button
              onClick={() => addNewNode("arrow")}
              title="Add New SVG Arrow"
              className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
            >
              <Plus className="h-3 w-3" />
              Arrow
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center gap-1 border-l border-white/20 pl-2">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              title="Undo (Ctrl+Z)"
              className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Undo2 className="h-3.5 w-3.5 text-white" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              title="Redo (Ctrl+Y)"
              className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Redo2 className="h-3.5 w-3.5 text-white" />
            </button>
          </div>

          {/* Copy Coordinates JSON */}
          <button
            onClick={copyNodesJSON}
            title="Copy entire Canvas JSON to clipboard"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors ml-1"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "COPIED JSON!" : "COPY JSON"}
          </button>

          {/* Reset All */}
          <button
            onClick={resetAllNodes}
            title="Reset layout to original baseline"
            className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 hover:text-white hover:border-red-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {/* ---- Bottom Prompt: GO ON ---- */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center gap-2 py-2 text-center pointer-events-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
      >
        <button
          onClick={() => scrollTo("origin")}
          data-cursor-label="scroll down"
          className="group flex flex-col items-center gap-1 font-mono text-xs uppercase tracking-[0.25em] text-[#F7F4ED] transition-colors hover:text-[#FFD400] focus-ring"
        >
          <span className="font-display text-lg font-bold italic tracking-wide underline underline-offset-4 decoration-[#FFD400] group-hover:no-underline">
            GO ON.
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#FFD400]" />
        </button>
      </motion.div>
    </section>
  );
}
