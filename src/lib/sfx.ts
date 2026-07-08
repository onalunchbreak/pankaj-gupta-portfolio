// ============================================================
// SFX SYNTH — generate short WAV data-URIs at runtime so
// Howler.js has real audio to play (no external assets needed).
// ============================================================

type ToneSpec = {
  freq: number;
  dur: number; // seconds
  type: OscillatorType;
  gain?: number;
  sweepTo?: number; // frequency sweep target
  decay?: number; // gain decay exponent
};

function encodeWav(samples: Float32Array, sampleRate: number): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return "data:audio/wav;base64," + btoa(binary);
}

function synth(spec: ToneSpec): string {
  const sampleRate = 44100;
  const total = Math.floor(spec.dur * sampleRate);
  const samples = new Float32Array(total);
  const gain = spec.gain ?? 0.25;
  const decay = spec.decay ?? 4;
  for (let i = 0; i < total; i++) {
    const t = i / sampleRate;
    const p = i / total;
    let f = spec.freq;
    if (spec.sweepTo) f = spec.freq + (spec.sweepTo - spec.freq) * p;
    const env = Math.pow(1 - p, decay);
    let val: number;
    const phase = 2 * Math.PI * f * t;
    switch (spec.type) {
      case "square":
        val = Math.sign(Math.sin(phase));
        break;
      case "sawtooth":
        val = 2 * (f * t - Math.floor(0.5 + f * t));
        break;
      case "triangle":
        val = 2 * Math.abs(2 * (f * t - Math.floor(f * t + 0.5))) - 1;
        break;
      default:
        val = Math.sin(phase);
    }
    samples[i] = val * env * gain;
  }
  return encodeWav(samples, sampleRate);
}

// Build the SFX library once.
let cached: Record<string, string> | null = null;
export function getSfx(): Record<string, string> {
  if (cached) return cached;
  cached = {
    tick: synth({ freq: 2200, dur: 0.03, type: "square", gain: 0.08, decay: 6 }),
    confirm: synth({ freq: 660, dur: 0.09, type: "triangle", gain: 0.18, sweepTo: 990, decay: 4 }),
    whoosh: synth({ freq: 180, dur: 0.32, type: "sawtooth", gain: 0.12, sweepTo: 720, decay: 3 }),
    blip: synth({ freq: 1200, dur: 0.04, type: "square", gain: 0.1, decay: 5 }),
    door: synth({ freq: 440, dur: 0.45, type: "sine", gain: 0.2, sweepTo: 880, decay: 2.2 }),
  };
  return cached;
}
