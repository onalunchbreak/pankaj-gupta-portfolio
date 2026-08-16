"use client";
import { useEffect, useState, useCallback } from "react";
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
  Underline,
  Edit3,
  Pencil,
  User,
  Save,
  Loader2,
  AlertCircle,
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

// Preset color palette for styling
const COLOR_PRESETS = [
  "#F7F4ED", // Warm Off-White
  "#FFD400", // Signature Electric Yellow
  "#38BDF8", // Cyan Blue
  "#F43F5E", // Rose Red
  "#10B981", // Emerald Green
  "#A855F7", // Purple
  "#FFFFFF", // Pure White
];

// PERMANENT PORTRAIT BASELINE
const PORTRAIT_BASELINE = { scale: 100, x: -8, y: 0 };
const MOBILE_PORTRAIT_BASELINE = { scale: 130, x: 0, y: 0 };

// MOBILE-SPECIFIC CANVAS BASELINE (Independent from Desktop)
const MOBILE_CANVAS_BASELINE: StudioNode[] = [
  {
    id: "mob-tag-strategy",
    type: "tag",
    text: "PRODUCT STRATEGY",
    x: 8,
    y: 18,
    scale: 1,
    rotation: -2,
    fontSize: 9,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "mob-tag-ai",
    type: "tag",
    text: "APPLIED AI",
    x: 232,
    y: 18,
    scale: 1,
    rotation: 2,
    fontSize: 9,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "mob-tag-research",
    type: "tag",
    text: "USER RESEARCH",
    x: 4,
    y: 160,
    scale: 1,
    rotation: 1,
    fontSize: 9,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "mob-tag-storytelling",
    type: "tag",
    text: "STORYTELLING",
    x: 238,
    y: 160,
    scale: 1,
    rotation: -1,
    fontSize: 9,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "mob-tag-automation",
    type: "tag",
    text: "WORKFLOW AUTOMATION",
    x: 6,
    y: 305,
    scale: 1,
    rotation: -1,
    fontSize: 9,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
  {
    id: "mob-tag-system",
    type: "tag",
    text: "SYSTEM DESIGN",
    x: 226,
    y: 305,
    scale: 1,
    rotation: 2,
    fontSize: 9,
    fontFamily: "mono",
    color: "#F7F4ED",
    highlight: false,
  },
];

// USER-APPROVED MASTER LAYOUT (Permanent baseline for all visitors)
const UNIFIED_CANVAS_BASELINE: StudioNode[] = [
  {
    "id": "quote-strategy",
    "type": "quote",
    "text": "I connect the dots\nothers miss.",
    "x": 367.53515625,
    "y": 16.22265625,
    "scale": 1,
    "rotation": -2,
    "fontSize": 24,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true
  },
  {
    "id": "arrow-strategy",
    "type": "arrow",
    "text": "",
    "x": 441.26171875,
    "y": 94.6328125,
    "scale": 1,
    "rotation": 32,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": -28,
    "flipX": true,
    "arrowLength": 135
  },
  {
    "id": "tag-strategy",
    "type": "tag",
    "text": "PRODUCT STRATEGY",
    "x": 25.484375,
    "y": 190.63671875,
    "scale": 1,
    "rotation": -1,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "tag-research",
    "type": "tag",
    "text": "USER RESEARCH",
    "x": 240.7109375,
    "y": 336.390625,
    "scale": 1,
    "rotation": 2,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "arrow-research",
    "type": "arrow",
    "text": "",
    "x": 210.59765625,
    "y": 198.9140625,
    "scale": 1,
    "rotation": 10,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": 24,
    "flipX": false,
    "arrowLength": 135
  },
  {
    "id": "quote-research",
    "type": "quote",
    "text": "small bets,\nbig impact.",
    "x": 337.6171875,
    "y": 207.31640625,
    "scale": 1,
    "rotation": 2,
    "fontSize": 24,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true
  },
  {
    "id": "quote-automation",
    "type": "quote",
    "text": "Fewer clicks,\nsame outcome.",
    "x": 80.375,
    "y": 411.51953125,
    "scale": 1,
    "rotation": -1,
    "fontSize": 20,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true
  },
  {
    "id": "arrow-automation",
    "type": "arrow",
    "text": "",
    "x": 174.19921875,
    "y": 376.71875,
    "scale": 1,
    "rotation": -24,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": -17,
    "flipX": false,
    "arrowLength": 115
  },
  {
    "id": "tag-automation",
    "type": "tag",
    "text": "WORKFLOW AUTOMATION",
    "x": 62.32421875,
    "y": 28.046875,
    "scale": 1,
    "rotation": -18,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "quote-roadmapping",
    "type": "quote",
    "text": "Plans change.\nDirection shouldn't.",
    "x": 97.56640625,
    "y": 559.59765625,
    "scale": 1,
    "rotation": -2,
    "fontSize": 20,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true
  },
  {
    "id": "arrow-roadmapping",
    "type": "arrow",
    "text": "",
    "x": 200.76953125,
    "y": 600.18359375,
    "scale": 1,
    "rotation": 28,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": -20,
    "flipX": false,
    "arrowLength": 110
  },
  {
    "id": "tag-roadmapping",
    "type": "tag",
    "text": "ROADMAPPING",
    "x": 300.21875,
    "y": 621.44921875,
    "scale": 1,
    "rotation": -2,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "arrow-ai",
    "type": "arrow",
    "text": "",
    "x": 863.4453125,
    "y": 50.234375,
    "scale": 1,
    "rotation": -26,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": -18,
    "flipX": false,
    "arrowLength": 135
  },
  {
    "id": "quote-ai",
    "type": "quote",
    "text": "curious by nature,\nobsessed with value. :)",
    "x": 1000.25,
    "y": -10.7265625,
    "scale": 1,
    "rotation": -1,
    "fontSize": 24,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true
  },
  {
    "id": "tag-ai",
    "type": "tag",
    "text": "APPLIED AI",
    "x": 1256.82421875,
    "y": 58.5546875,
    "scale": 1,
    "rotation": 16,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "quote-storytelling",
    "type": "quote",
    "text": "Numbers don't sell.\nStories do.",
    "x": 1282.91796875,
    "y": 197.12890625,
    "scale": 1,
    "rotation": 1,
    "fontSize": 20,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true
  },
  {
    "id": "arrow-storytelling",
    "type": "arrow",
    "text": "",
    "x": 1133.6640625,
    "y": 186.28125,
    "scale": 1,
    "rotation": 16,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": -31,
    "flipX": false,
    "arrowLength": 150
  },
  {
    "id": "tag-storytelling",
    "type": "tag",
    "text": "STORYTELLING",
    "x": 1029.359375,
    "y": 135.1328125,
    "scale": 1,
    "rotation": -1,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "tag-discovery",
    "type": "tag",
    "text": "PRODUCT DISCOVERY",
    "x": 1215.06640625,
    "y": 322.45703125,
    "scale": 1,
    "rotation": 3,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "arrow-discovery",
    "type": "arrow",
    "text": "",
    "x": 915,
    "y": 380,
    "scale": 1,
    "rotation": -90,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": 18,
    "flipX": false,
    "arrowLength": 45
  },
  {
    "id": "quote-discovery",
    "type": "quote",
    "text": "data > opinion,\nalways.",
    "x": 1036.8203125,
    "y": 317.28515625,
    "scale": 1,
    "rotation": 1,
    "fontSize": 24,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true
  },
  {
    "id": "tag-system",
    "type": "tag",
    "text": "SYSTEM DESIGN",
    "x": 1058.35546875,
    "y": 454.94140625,
    "scale": 1,
    "rotation": -2,
    "fontSize": 12,
    "fontFamily": "mono",
    "color": "#F7F4ED",
    "highlight": false
  },
  {
    "id": "arrow-system",
    "type": "arrow",
    "text": "",
    "x": 1151.65234375,
    "y": 502.125,
    "scale": 1,
    "rotation": 36,
    "fontSize": 14,
    "fontFamily": "mono",
    "color": "#FFD400",
    "highlight": false,
    "curvature": 3,
    "flipX": false,
    "arrowLength": 85
  },
  {
    "id": "quote-1786514859021",
    "type": "quote",
    "text": "≈",
    "x": 1173.458038027487,
    "y": 304.83610866961476,
    "scale": 1,
    "rotation": 0,
    "fontSize": 38,
    "fontFamily": "serif",
    "color": "#F7F4ED",
    "highlight": false,
    "curvature": 16,
    "flipX": false,
    "arrowLength": 75
  },
  {
    "id": "quote-1786515031928",
    "type": "quote",
    "text": "scalable architectures,\nzero noise.",
    "x": 1170.7013298294341,
    "y": 557.6784157907531,
    "scale": 1,
    "rotation": 0,
    "fontSize": 22,
    "fontFamily": "handwritten",
    "color": "#F7F4ED",
    "highlight": true,
    "curvature": 16,
    "flipX": false,
    "arrowLength": 75
  }
];

/**
 * Mathematically seamless SVG Arrow component.
 */
function StudioArrow({
  node,
}: {
  node: StudioNode;
}) {
  const width = node.arrowLength || 75;
  const height = 48;
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
      <path d={pathD} strokeDasharray="4 4" suppressHydrationWarning />
      <path d={`M ${x1} ${y1} L ${endX} ${endY} L ${x2} ${y2}`} strokeWidth={strokeWidth + 0.6} suppressHydrationWarning />
    </svg>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const clock = useLiveClock();

  // Determine if dev environment for rendering local editor toggle
  const isDev = process.env.NODE_ENV !== "production";
  
  // Central Portrait Scale & Offsets (Editable in Edit Panel)
  const [scale, setScale] = useState(PORTRAIT_BASELINE.scale);
  const [xOffset, setXOffset] = useState(PORTRAIT_BASELINE.x);
  const [yOffset, setYOffset] = useState(PORTRAIT_BASELINE.y);

  // Mobile Portrait Scale & Offsets (130% default on mobile)
  const [mobileScale, setMobileScale] = useState(MOBILE_PORTRAIT_BASELINE.scale);
  const [mobileXOffset, setMobileXOffset] = useState(MOBILE_PORTRAIT_BASELINE.x);
  const [mobileYOffset, setMobileYOffset] = useState(MOBILE_PORTRAIT_BASELINE.y);

  // Editor State — OFF BY DEFAULT for clean production-ready viewing
  const [layoutMode, setLayoutMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  // Save Modal Dialog & Loading State
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Restore native cursor while the save modal is open
  // (the custom cursor component applies cursor-none-fine to <html>, which hides all cursors)
  useEffect(() => {
    const html = document.documentElement;
    if (saveModalOpen) {
      html.classList.remove("cursor-none-fine");
    } else {
      // Only re-add if the custom cursor would have added it (pointer: fine device)
      if (window.matchMedia("(pointer: fine)").matches) {
        html.classList.add("cursor-none-fine");
      }
    }
  }, [saveModalOpen]);

  // Desktop Dynamic Nodes + Undo/Redo Stack
  const [nodes, setNodes] = useState<StudioNode[]>(UNIFIED_CANVAS_BASELINE);
  const [history, setHistory] = useState<StudioNode[][]>([UNIFIED_CANVAS_BASELINE]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Mobile Dynamic Nodes (Independent from Desktop)
  const [mobileNodes, setMobileNodes] = useState<StudioNode[]>(MOBILE_CANVAS_BASELINE);

  // Load saved node configurations and portrait settings
  useEffect(() => {
    try {
      const savedNodes = localStorage.getItem("hero_canvas_studio_master_v7");
      if (savedNodes) {
        const parsed = JSON.parse(savedNodes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNodes(parsed);
          setHistory([parsed]);
          setHistoryIndex(0);
        }
      }
      const savedMobileNodes = localStorage.getItem("hero_canvas_mobile_studio_v1");
      if (savedMobileNodes) {
        const parsed = JSON.parse(savedMobileNodes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMobileNodes(parsed);
        }
      }
      // Desktop Portrait Settings (100% baseline)
      const savedDesktopScale = localStorage.getItem("hero_desktop_portrait_scale");
      if (savedDesktopScale) {
        setScale(Number(savedDesktopScale));
      } else {
        setScale(PORTRAIT_BASELINE.scale); // 100%
      }
      const savedX = localStorage.getItem("hero_desktop_portrait_x");
      if (savedX) setXOffset(Number(savedX));
      const savedY = localStorage.getItem("hero_desktop_portrait_y");
      if (savedY) setYOffset(Number(savedY));

      // Mobile Portrait Settings (130% baseline)
      const savedMobileScale = localStorage.getItem("hero_mobile_portrait_scale");
      if (savedMobileScale) {
        setMobileScale(Number(savedMobileScale));
      } else {
        setMobileScale(MOBILE_PORTRAIT_BASELINE.scale); // 130%
      }
      const savedMobileX = localStorage.getItem("hero_mobile_portrait_x");
      if (savedMobileX) setMobileXOffset(Number(savedMobileX));
      const savedMobileY = localStorage.getItem("hero_mobile_portrait_y");
      if (savedMobileY) setMobileYOffset(Number(savedMobileY));
    } catch {
      // fallback
    }
  }, []);

  // Update desktop portrait photo settings
  const updatePortrait = (newScale: number, newX: number, newY: number) => {
    setScale(newScale);
    setXOffset(newX);
    setYOffset(newY);
    if (isDev) {
      localStorage.setItem("hero_desktop_portrait_scale", String(newScale));
      localStorage.setItem("hero_desktop_portrait_x", String(newX));
      localStorage.setItem("hero_desktop_portrait_y", String(newY));
    }
  };

  // Update mobile portrait photo settings
  const updateMobilePortrait = (newScale: number, newX: number, newY: number) => {
    setMobileScale(newScale);
    setMobileXOffset(newX);
    setMobileYOffset(newY);
    if (isDev) {
      localStorage.setItem("hero_mobile_portrait_scale", String(newScale));
      localStorage.setItem("hero_mobile_portrait_x", String(newX));
      localStorage.setItem("hero_mobile_portrait_y", String(newY));
    }
  };

  // Push new state snapshot to Undo/Redo stack (Desktop)
  const pushState = useCallback(
    (newNodes: StudioNode[]) => {
      setNodes(newNodes);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newNodes);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      if (isDev) {
        localStorage.setItem("hero_canvas_studio_master_v7", JSON.stringify(newNodes));
      }
    },
    [history, historyIndex, isDev]
  );

  // Update a single mobile node property
  const updateMobileNode = (id: string, partial: Partial<StudioNode>) => {
    setMobileNodes((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, ...partial } : n));
      if (isDev) {
        localStorage.setItem("hero_canvas_mobile_studio_v1", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Undo action
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setNodes(history[prevIndex]);
      if (isDev) {
        localStorage.setItem("hero_canvas_studio_master_v7", JSON.stringify(history[prevIndex]));
      }
    }
  }, [history, historyIndex, isDev]);

  // Redo action
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setNodes(history[nextIndex]);
      if (isDev) {
        localStorage.setItem("hero_canvas_studio_master_v7", JSON.stringify(history[nextIndex]));
      }
    }
  }, [history, historyIndex, isDev]);

  // Update a single node property (Handles both desktop and mobile nodes)
  const updateNode = (id: string, partial: Partial<StudioNode>) => {
    if (mobileNodes.some((n) => n.id === id)) {
      updateMobileNode(id, partial);
      return;
    }
    const updated = nodes.map((n) => (n.id === id ? { ...n, ...partial } : n));
    pushState(updated);
  };

  // Delete node
  const deleteNode = (id: string) => {
    if (mobileNodes.some((n) => n.id === id)) {
      const updated = mobileNodes.filter((n) => n.id !== id);
      setMobileNodes(updated);
      if (isDev) localStorage.setItem("hero_canvas_mobile_studio_v1", JSON.stringify(updated));
      if (selectedId === id) setSelectedId(null);
      return;
    }
    const updated = nodes.filter((n) => n.id !== id);
    pushState(updated);
    if (selectedId === id) setSelectedId(null);
  };

  // Reset to user's master baseline
  const resetAllNodes = () => {
    pushState(UNIFIED_CANVAS_BASELINE);
    updatePortrait(PORTRAIT_BASELINE.scale, PORTRAIT_BASELINE.x, PORTRAIT_BASELINE.y);
    setMobileNodes(MOBILE_CANVAS_BASELINE);
    updateMobilePortrait(MOBILE_PORTRAIT_BASELINE.scale, MOBILE_PORTRAIT_BASELINE.x, MOBILE_PORTRAIT_BASELINE.y);
    setSelectedId(null);
    localStorage.setItem("hero_canvas_studio_master_v7", JSON.stringify(UNIFIED_CANVAS_BASELINE));
    localStorage.setItem("hero_canvas_mobile_studio_v1", JSON.stringify(MOBILE_CANVAS_BASELINE));
  };

  // Execute direct code save & git commit via API endpoint
  const confirmAndSaveToCode = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/save-hero-layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodes,
          portrait: { scale, x: xOffset, y: yOffset },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Save failed");
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setSaveModalOpen(false);
      }, 1400);
    } catch (err: unknown) {
      console.error("Save layout error:", err);
      alert(`Save error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Active selected node
  const selectedNode =
    nodes.find((n) => n.id === selectedId) ||
    mobileNodes.find((n) => n.id === selectedId) ||
    null;

  // Keyboard navigation & deletion shortcuts in edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!layoutMode || !isDev || editingId) return;

      if (e.key === "Escape") {
        setSelectedId(null);
        setEditingId(null);
      }

      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        if (selectedId !== "central-portrait" && selectedId !== "central-portrait-mobile") {
          e.preventDefault();
          deleteNode(selectedId);
        }
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }

      if (selectedNode) {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          updateNode(selectedNode.id, { x: selectedNode.x - step });
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          updateNode(selectedNode.id, { x: selectedNode.x + step });
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          updateNode(selectedNode.id, { y: selectedNode.y - step });
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          updateNode(selectedNode.id, { y: selectedNode.y + step });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [layoutMode, isDev, editingId, selectedId, selectedNode, handleUndo, handleRedo]);

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

  // Render a mobile draggable studio node
  const renderMobileNode = (node: StudioNode) => {
    const isSelected = selectedId === node.id;
    const isEditing = editingId === node.id;

    return (
      <motion.div
        key={node.id}
        drag={layoutMode && isDev}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (layoutMode && isDev) {
            updateMobileNode(node.id, { x: node.x + info.offset.x, y: node.y + info.offset.y });
          }
        }}
        onClick={(e) => {
          if (layoutMode && isDev) {
            e.stopPropagation();
            setSelectedId(node.id);
          }
        }}
        onDoubleClick={(e) => {
          if (layoutMode && isDev) {
            e.stopPropagation();
            setSelectedId(node.id);
            if (node.type !== "arrow") setEditingId(node.id);
          }
        }}
        style={{
          x: node.x,
          y: node.y,
          scale: node.scale,
          rotate: node.rotation,
        }}
        className={`pointer-events-auto absolute p-1 rounded-md transition-all ${
          layoutMode && isDev
            ? "cursor-grab active:cursor-grabbing hover:outline hover:outline-1 hover:outline-[#FFD400]/70 z-30 hover:z-40"
            : "z-20 pointer-events-none"
        } ${isSelected && layoutMode && isDev ? "outline outline-2 outline-[#FFD400] bg-black/60 shadow-2xl z-40" : ""}`}
      >
        <div
          className="flex items-center gap-1.5 rounded-xs border border-white/40 bg-black/80 backdrop-blur-md px-2.5 py-1 uppercase tracking-wider shadow-xl hover:border-[#FFD400] select-none font-mono"
          style={{ fontSize: `${node.fontSize}px`, color: node.color }}
        >
          <Sparkles className="h-3 w-3 text-[#FFD400] shrink-0" />
          {isEditing && layoutMode && isDev ? (
            <input
              type="text"
              value={node.text}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => updateMobileNode(node.id, { text: e.target.value })}
              onBlur={() => setEditingId(null)}
              onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
              autoFocus
              className="bg-black/80 border border-[#FFD400] px-1 py-0.5 text-white outline-none rounded"
            />
          ) : (
            <span className="border-b border-[#FFD400] whitespace-nowrap">{node.text}</span>
          )}
        </div>
      </motion.div>
    );
  };

  // Render a single studio canvas node (Quote, Tag, or Curved Arrow)
  const renderStudioNode = (node: StudioNode) => {
    const isSelected = selectedId === node.id;
    const isEditing = editingId === node.id;

    return (
      <motion.div
        key={node.id}
        drag={layoutMode && isDev}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (layoutMode && isDev) {
            updateNode(node.id, { x: node.x + info.offset.x, y: node.y + info.offset.y });
          }
        }}
        onClick={(e) => {
          if (layoutMode && isDev) {
            e.stopPropagation();
            setSelectedId(node.id);
          }
        }}
        onDoubleClick={(e) => {
          if (layoutMode && isDev) {
            e.stopPropagation();
            setSelectedId(node.id);
            if (node.type !== "arrow") setEditingId(node.id);
          }
        }}
        style={{
          x: node.x,
          y: node.y,
          scale: node.scale,
          rotate: node.rotation,
        }}
        className={`pointer-events-auto absolute p-1 rounded-md transition-all ${
          layoutMode && isDev
            ? "cursor-grab active:cursor-grabbing hover:outline hover:outline-1 hover:outline-[#FFD400]/70 z-30 hover:z-40"
            : "z-20 pointer-events-none"
        } ${isSelected && layoutMode && isDev ? "outline outline-2 outline-[#FFD400] bg-black/60 shadow-2xl z-40" : ""}`}
      >
        {node.type === "arrow" ? (
          <StudioArrow node={node} />
        ) : node.type === "tag" ? (
          <div
            className="flex items-center gap-1 rounded-xs border border-white/40 bg-black/40 backdrop-blur-xs px-2.5 py-1 font-mono uppercase tracking-wider text-white shadow-xs hover:border-[#FFD400] select-none"
            style={{ fontSize: `${node.fontSize}px`, color: node.color }}
          >
            <Sparkles className="h-3 w-3 text-[#FFD400] shrink-0" />
            {isEditing && layoutMode && isDev ? (
              <input
                type="text"
                value={node.text}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => updateNode(node.id, { text: e.target.value })}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
                autoFocus
                className="bg-black/80 border border-[#FFD400] px-1 py-0.5 text-white outline-none rounded"
              />
            ) : (
              <span className="border-b border-[#FFD400] whitespace-nowrap">{node.text}</span>
            )}
          </div>
        ) : (
          <div
            className={`whitespace-pre-line leading-snug select-none ${
              node.fontFamily === "mono" ? "font-mono" : "hand-display"
            }`}
            style={{ fontSize: `${node.fontSize}px`, color: node.color }}
          >
            {isEditing && layoutMode && isDev ? (
              <textarea
                value={node.text}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => updateNode(node.id, { text: e.target.value })}
                onBlur={() => setEditingId(null)}
                autoFocus
                className="bg-black/80 border border-[#FFD400] p-1.5 text-white outline-none rounded min-w-[160px] min-h-[60px]"
              />
            ) : node.highlight ? (
              node.text.split("\n").map((line, idx, arr) => (
                <span key={idx} className="block">
                  {idx === arr.length - 1 ? (
                    <span className="relative inline-block">
                      {line}
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFD400]" />
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))
            ) : (
              node.text
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
        if (layoutMode) {
          setSelectedId(null);
          setEditingId(null);
        }
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

      {/* ---- SUCCESS BANNER ON CODE SAVE ---- */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-950/90 px-5 py-2 font-mono text-xs font-bold text-emerald-300 shadow-2xl backdrop-blur-md"
          >
            <Check className="h-4 w-4 text-emerald-400" />
            Saved & Committed directly to hero.tsx source code!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- MAIN HERO CANVAS ---- */}
      <div className="relative z-10 my-auto flex w-full flex-1 items-center justify-center py-2">

        {/* ============================================================ */}
        {/* DESKTOP VIEW (lg:flex) — FULL STUDIO CANVAS & MASTER NODES   */}
        {/* ============================================================ */}
        <div className="relative w-full hidden lg:flex items-center justify-center min-h-[72vh]">
          {/* Centered Cutout Portrait */}
          <motion.div
            onClick={(e) => {
              if (layoutMode && isDev) {
                e.stopPropagation();
                setSelectedId("central-portrait");
              }
            }}
            className={`relative z-10 flex flex-col items-center justify-end w-full max-w-[820px] -mt-8 sm:-mt-12 mb-2 origin-bottom transition-all ${
              layoutMode && isDev ? "pointer-events-auto cursor-pointer hover:outline hover:outline-1 hover:outline-[#FFD400]/70 rounded-lg" : "pointer-events-none"
            } ${selectedId === "central-portrait" && layoutMode && isDev ? "outline outline-2 outline-[#FFD400] ring-4 ring-[#FFD400]/20 rounded-lg" : ""}`}
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

          {/* Desktop Studio Canvas Nodes */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            animate={{ x: tagXOffset, opacity: tagOpacity }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {nodes.map(renderStudioNode)}
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE & TABLET VIEW (lg:hidden) — OPTICALLY CENTERED STAGE  */}
        {/* ============================================================ */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center lg:hidden my-auto py-1">
          
          {/* 1. Optical Center Stage: 130% Scaled Portrait + Draggable Mobile Nodes */}
          <div className="relative w-full max-w-[380px] sm:max-w-[480px] h-[380px] sm:h-[460px] flex items-center justify-center my-0.5">
            
            {/* Centered Cutout Portrait with 130% Default Scale & Full Edit Support */}
            <motion.div
              onClick={(e) => {
                if (layoutMode && isDev) {
                  e.stopPropagation();
                  setSelectedId("central-portrait-mobile");
                }
              }}
              className={`relative z-10 h-full w-full flex items-end justify-center origin-bottom transition-all ${
                layoutMode && isDev ? "pointer-events-auto cursor-pointer hover:outline hover:outline-1 hover:outline-[#FFD400]/70 rounded-lg" : "pointer-events-none"
              } ${selectedId === "central-portrait-mobile" && layoutMode && isDev ? "outline outline-2 outline-[#FFD400] ring-4 ring-[#FFD400]/20 rounded-lg" : ""}`}
              animate={{ scale: mobileScale / 100, x: mobileXOffset, y: mobileYOffset }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
            >
              <Image
                src="/pankaj-hero-cutout.png"
                alt="Pankaj Gupta"
                width={1000}
                height={1200}
                priority
                className="h-full w-auto max-h-[380px] sm:max-h-[460px] object-contain object-bottom select-none pointer-events-none drop-shadow-2xl"
              />
            </motion.div>

            {/* Mobile Drag-and-Drop Nodes Layer */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {mobileNodes.map(renderMobileNode)}
            </div>
          </div>

          {/* 2. Top Hook Headline Placed BELOW the Portrait on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center z-20 px-3 mt-3 mb-1 max-w-sm"
          >
            <div className="hand-display text-[21px] sm:text-2xl text-[#F7F4ED] tracking-wide leading-tight drop-shadow-sm">
              I connect the dots <span className="relative inline-block border-b-2 border-[#FFD400]">others miss.</span>
            </div>
            <div className="hand-display text-xs sm:text-sm text-[#F7F4ED]/85 tracking-wide mt-1">
              curious by nature, obsessed with <span className="border-b border-[#FFD400]">value. :)</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---- CONFIRMATION SAVE MODAL DIALOG ---- */}
      <AnimatePresence>
        {saveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSaveModalOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-mono cursor-auto modal-cursor-restore"
          >
            <motion.div
              initial={{ scale: 0.9, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-[#FFD400]/40 bg-[#0E0E0E] p-5 shadow-2xl text-[#F7F4ED] cursor-auto"
            >
              <div className="flex items-center gap-2 text-[#FFD400] font-bold text-sm tracking-wider uppercase border-b border-white/10 pb-3">
                <Save className="h-4 w-4" />
                Confirm Save
              </div>

              <ul className="mt-4 space-y-2 text-[12px] text-white/80">
                <li>• <span className="text-white font-bold">{nodes.length} elements</span> on canvas</li>
                <li>• Portrait scale: <span className="text-white font-bold">{scale}%</span></li>
                <li>• Portrait offset: <span className="text-white font-bold">X {xOffset}px, Y {yOffset}px</span></li>
                <li>• Writes directly into <span className="text-[#FFD400] font-bold">hero.tsx</span></li>
                <li>• Creates a <span className="text-[#FFD400] font-bold">git commit</span></li>
              </ul>

              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSaveModalOpen(false)}
                  disabled={isSaving}
                  className="rounded border border-white/20 px-4 py-2 text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmAndSaveToCode}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded bg-[#FFD400] px-5 py-2 text-xs font-bold text-black hover:bg-[#FFD400]/90 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  {isSaving ? "Saving..." : "Confirm & Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- LOCAL DEV ONLY: SINGLE CLEAN EDIT BUTTON & HUD TOOLBAR ---- */}
      {isDev && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto font-mono">

          {/* Floating Inspector Panel */}
          <AnimatePresence>
            {(selectedNode || selectedId === "central-portrait") && layoutMode && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-3 rounded-lg border border-[#FFD400]/40 bg-[#0A0A0A]/95 p-4 text-xs text-[#F7F4ED] shadow-2xl backdrop-blur-md w-80 z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-[#FFD400] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    {selectedId === "central-portrait" ? (
                      <>
                        <User className="h-3.5 w-3.5 text-[#FFD400]" />
                        DESKTOP PORTRAIT PHOTO
                      </>
                    ) : selectedId === "central-portrait-mobile" ? (
                      <>
                        <User className="h-3.5 w-3.5 text-[#FFD400]" />
                        MOBILE PORTRAIT PHOTO ({mobileScale}%)
                      </>
                    ) : selectedNode?.type === "arrow" ? (
                      <>
                        <Navigation className="h-3.5 w-3.5 text-[#FFD400]" />
                        ARROW: {selectedNode.id}
                      </>
                    ) : selectedNode?.type === "tag" ? (
                      <>
                        <Tag className="h-3.5 w-3.5 text-[#FFD400]" />
                        TAG: {selectedNode.text}
                      </>
                    ) : (
                      <>
                        <Type className="h-3.5 w-3.5 text-[#FFD400]" />
                        QUOTE: {selectedNode?.text.replace("\n", " ").slice(0, 16)}
                      </>
                    )}
                  </span>

                  <div className="flex items-center gap-1">
                    {selectedNode && (
                      <button
                        onClick={() => deleteNode(selectedNode.id)}
                        title="Delete Node"
                        className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedId(null)}
                      className="text-white/60 hover:text-white px-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Central Portrait Specific Resizer & Offsets (Desktop & Mobile) */}
                {(selectedId === "central-portrait" || selectedId === "central-portrait-mobile") && (
                  <>
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Portrait Scale:</span>
                      <input
                        type="range"
                        min="70"
                        max="160"
                        step="1"
                        value={selectedId === "central-portrait-mobile" ? mobileScale : scale}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (selectedId === "central-portrait-mobile") {
                            updateMobilePortrait(val, mobileXOffset, mobileYOffset);
                          } else {
                            updatePortrait(val, xOffset, yOffset);
                          }
                        }}
                        className="w-28 accent-[#FFD400]"
                      />
                      <span className="w-8 text-right font-bold text-[#FFD400]">
                        {selectedId === "central-portrait-mobile" ? mobileScale : scale}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Position X:</span>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        step="2"
                        value={selectedId === "central-portrait-mobile" ? mobileXOffset : xOffset}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (selectedId === "central-portrait-mobile") {
                            updateMobilePortrait(mobileScale, val, mobileYOffset);
                          } else {
                            updatePortrait(scale, val, yOffset);
                          }
                        }}
                        className="w-28 accent-[#FFD400]"
                      />
                      <span className="w-8 text-right font-bold text-[#FFD400]">
                        {selectedId === "central-portrait-mobile" ? mobileXOffset : xOffset}px
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Position Y:</span>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        step="2"
                        value={selectedId === "central-portrait-mobile" ? mobileYOffset : yOffset}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (selectedId === "central-portrait-mobile") {
                            updateMobilePortrait(mobileScale, mobileXOffset, val);
                          } else {
                            updatePortrait(scale, xOffset, val);
                          }
                        }}
                        className="w-28 accent-[#FFD400]"
                      />
                      <span className="w-8 text-right font-bold text-[#FFD400]">
                        {selectedId === "central-portrait-mobile" ? mobileYOffset : yOffset}px
                      </span>
                    </div>

                    <div className="flex justify-end pt-1 border-t border-white/10">
                      <button
                        onClick={() => {
                          if (selectedId === "central-portrait-mobile") {
                            updateMobilePortrait(MOBILE_PORTRAIT_BASELINE.scale, MOBILE_PORTRAIT_BASELINE.x, MOBILE_PORTRAIT_BASELINE.y);
                          } else {
                            updatePortrait(PORTRAIT_BASELINE.scale, PORTRAIT_BASELINE.x, PORTRAIT_BASELINE.y);
                          }
                        }}
                        className="text-[10px] text-white/50 hover:text-white underline"
                      >
                        Reset Portrait
                      </button>
                    </div>
                  </>
                )}

                {/* Node Text Edit Button */}
                {selectedNode && selectedNode.type !== "arrow" && (
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

                {/* Typography Options */}
                {selectedNode && selectedNode.type !== "arrow" && (
                  <>
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

                {/* Arrow Controls */}
                {selectedNode && selectedNode.type === "arrow" && (
                  <>
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Length:</span>
                      <input
                        type="range"
                        min="40"
                        max="200"
                        step="5"
                        value={selectedNode.arrowLength || 75}
                        onChange={(e) => updateNode(selectedNode.id, { arrowLength: parseInt(e.target.value) })}
                        className="w-28 accent-[#FFD400]"
                      />
                      <span className="w-8 text-right font-bold text-[#FFD400]">
                        {selectedNode.arrowLength || 75}px
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Shape:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateNode(selectedNode.id, { curvature: 0 })}
                          className={`px-2 py-0.5 rounded text-[10px] border ${
                            (selectedNode.curvature ?? 16) === 0
                              ? "bg-[#FFD400] text-[#0A0A0A] font-bold border-[#FFD400]"
                              : "border-white/20 text-white/70 hover:text-white"
                          }`}
                        >
                          Straight
                        </button>
                        <button
                          onClick={() => updateNode(selectedNode.id, { curvature: 18 })}
                          className={`px-2 py-0.5 rounded text-[10px] border ${
                            (selectedNode.curvature ?? 16) > 0
                              ? "bg-[#FFD400] text-[#0A0A0A] font-bold border-[#FFD400]"
                              : "border-white/20 text-white/70 hover:text-white"
                          }`}
                        >
                          Arc Up ↑
                        </button>
                        <button
                          onClick={() => updateNode(selectedNode.id, { curvature: -18 })}
                          className={`px-2 py-0.5 rounded text-[10px] border ${
                            (selectedNode.curvature ?? 16) < 0
                              ? "bg-[#FFD400] text-[#0A0A0A] font-bold border-[#FFD400]"
                              : "border-white/20 text-white/70 hover:text-white"
                          }`}
                        >
                          Arc Down ↓
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-white/70">Curvature:</span>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        step="1"
                        value={selectedNode.curvature ?? 16}
                        onChange={(e) => updateNode(selectedNode.id, { curvature: parseInt(e.target.value) })}
                        className="w-28 accent-[#FFD400]"
                      />
                      <span className="w-10 text-right font-bold text-[#FFD400]">
                        {(selectedNode.curvature ?? 16) > 0
                          ? `+${selectedNode.curvature ?? 16}`
                          : selectedNode.curvature ?? 16}
                      </span>
                    </div>

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

                {/* Rotation for nodes */}
                {selectedNode && (
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
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating HUD Bar (Appears when layoutMode is ON) */}
          {layoutMode ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0A0A0A]/95 px-4 py-2 text-xs text-[#F7F4ED] shadow-2xl backdrop-blur-md"
            >
              {/* Toggle Off */}
              <button
                onClick={() => {
                  setLayoutMode(false);
                  setSelectedId(null);
                  setEditingId(null);
                }}
                className="flex items-center gap-2 rounded-full bg-[#FFD400] px-3.5 py-1.5 font-bold text-[11px] text-[#0A0A0A] tracking-wider transition-colors hover:bg-[#FFD400]/90"
              >
                <Eye className="h-3.5 w-3.5" />
                EDIT: OFF
              </button>

              {/* Edit Central Portrait Button */}
              <button
                onClick={() => setSelectedId("central-portrait")}
                title="Edit Central Portrait Size & Offsets"
                className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  selectedId === "central-portrait"
                    ? "border-[#FFD400] bg-[#FFD400]/20 text-[#FFD400]"
                    : "border-white/20 bg-white/5 text-white hover:border-[#FFD400] hover:text-[#FFD400]"
                }`}
              >
                <User className="h-3 w-3" />
                Portrait
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
                  title="Undo"
                  className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  <Undo2 className="h-3.5 w-3.5 text-white" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  title="Redo"
                  className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  <Redo2 className="h-3.5 w-3.5 text-white" />
                </button>
              </div>

              {/* Direct Save Button (Opens Confirmation Modal) */}
              <button
                onClick={() => setSaveModalOpen(true)}
                title="Save entire Canvas layout directly into hero.tsx source code"
                className="flex items-center gap-2 rounded-full bg-[#FFD400] px-3.5 py-1.5 font-bold text-[11px] text-[#0A0A0A] tracking-wider transition-colors hover:bg-[#FFD400]/90 shadow-lg ml-1"
              >
                <Save className="h-3.5 w-3.5" />
                SAVE
              </button>

              {/* Reset All */}
              <button
                onClick={resetAllNodes}
                title="Reset layout to master user baseline"
                className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 hover:text-white hover:border-red-400 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>
          ) : (
            /* Single Subtle Edit Button (Default State) */
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLayoutMode(true);
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0A0A0A]/90 px-3.5 py-2 text-xs font-bold text-white/80 tracking-wider shadow-lg backdrop-blur-md hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
            >
              <Pencil className="h-3.5 w-3.5 text-[#FFD400]" />
              EDIT
            </button>
          )}
        </div>
      )}

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
