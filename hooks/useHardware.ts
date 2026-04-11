"use client";

import { useState, useCallback, useEffect } from "react";

export interface HardwareStatus {
  printer: "connected" | "disconnected" | "error";
  scanner: "connected" | "disconnected" | "searching";
  pinpad: "connected" | "disconnected";
  isSimulated: boolean;
}

export function useHardware() {
  const [status, setStatus] = useState<HardwareStatus>({
    printer: "connected",
    scanner: "disconnected",
    pinpad: "connected",
    isSimulated: true,
  });

  const [serialSupported, setSerialSupported] = useState(false);

  useEffect(() => {
    setSerialSupported("serial" in navigator);
  }, []);

  // Premium Audio Service (Synthesized)
  const playSound = useCallback((type: "scan" | "success" | "error") => {
    if (typeof window === "undefined") return;
    
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "scan") {
        // High-end Premium Ping (C6)
        osc.type = "sine";
        osc.frequency.setValueAtTime(1046.50, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "success") {
        // Double-tap success chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(1318.51, now); // E6
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1567.98, now + 0.08); // G6
        gain2.gain.setValueAtTime(0, now + 0.08);
        gain2.gain.linearRampToValueAtTime(0.2, now + 0.09);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        
        osc.start(now);
        osc.stop(now + 0.1);
        osc2.start(now + 0.08);
        osc2.stop(now + 0.2);
      } else if (type === "error") {
        // Low-freq alert buzz
        osc.type = "triangle";
        osc.frequency.setValueAtTime(110, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {
      console.warn("Audio Context blocked or unsupported");
    }
  }, []);

  const simulateScan = useCallback((callback?: () => void) => {
    setStatus(prev => ({ ...prev, scanner: "searching" }));
    setTimeout(() => {
      playSound("scan");
      setStatus(prev => ({ ...prev, scanner: "connected" }));
      if (callback) callback();
    }, 800);
  }, [playSound]);

  const simulatePrint = useCallback(() => {
    setStatus(prev => ({ ...prev, printer: "error" }));
    setTimeout(() => {
      playSound("scan");
      setStatus(prev => ({ ...prev, printer: "connected" }));
    }, 1500);
  }, [playSound]);

  const connectRealHardware = useCallback(async () => {
    if (!serialSupported) {
      alert("Web Serial API not supported in this browser. Use Chrome.");
      return;
    }

    try {
      // @ts-ignore
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      setStatus(prev => ({ ...prev, scanner: "connected", isSimulated: false }));
      playSound("success");
    } catch (e) {
      console.error("Hardware connection failed", e);
    }
  }, [serialSupported, playSound]);

  return {
    status,
    serialSupported,
    playSound,
    simulateScan,
    simulatePrint,
    connectRealHardware
  };
}
