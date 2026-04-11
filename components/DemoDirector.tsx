"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DEMO_SCENARIOS, Scenario } from "@/constants/demoScenarios";
import NarrativeOverlay from "./NarrativeOverlay";

export default function DemoDirector() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [showNarrative, setShowNarrative] = useState(false);
  const [showBrief, setShowBrief] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  // Sync current scenario with path
  useEffect(() => {
    setIsMounted(true);
    const active = DEMO_SCENARIOS.find(s => s.path === pathname);
    if (active) setCurrentScenario(active);
  }, [pathname]);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isMounted]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerScenario = (s: Scenario) => {
    setShowBrief(false); // Reset
    setTimeout(() => {
      router.push(s.path);
      window.dispatchEvent(new CustomEvent('nutriserve-demo-action', { detail: { ...s.targetState, id: s.id, path: s.path } }));
      setCurrentScenario(s);
      setShowBrief(true);
    }, 100);
  };

  if (!isMounted) return null;

  if (!isVisible) return (
    <button 
      onClick={() => setIsVisible(true)}
      className="animate-pulse-gold"
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
        background: 'rgba(12, 29, 63, 0.9)', color: 'var(--accent)',
        border: '2px solid var(--accent)', padding: '12px 20px', borderRadius: '32px',
        fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer',
        boxShadow: '0 0 20px var(--accent)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', gap: '8px'
      }}
    >
      <span>🎮</span> EXECUTIVE COCKPIT
    </button>
  );

  return (
    <>
      <NarrativeOverlay 
        currentScenario={currentScenario} 
        isVisible={showBrief} 
        onClose={() => setShowBrief(false)} 
      />

      <div style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, width: '90%', maxWidth: '800px',
        background: 'rgba(12, 29, 63, 0.85)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(251, 222, 5, 0.3)', borderRadius: '24px',
        padding: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: '12px',
        animation: 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🎬</span>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.1em' }}>MISSION CONTROL &bull; {formatTime(timeLeft)}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                {currentScenario?.name || "Awaiting Target Selection"}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setShowBrief(!showBrief)}
              style={{ 
                background: showBrief ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                color: showBrief ? 'var(--primary-dark)' : '#fff',
                border: 'none', padding: '6px 12px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer'
              }}
            >
              {showBrief ? "RECALL BRIEF" : "TRIGGER BRIEF"}
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0 8px' }}
            >
              ✕
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {DEMO_SCENARIOS.map((s, idx) => (
            <button
              key={s.id}
              className="director-btn"
              onClick={() => triggerScenario(s)}
              style={{
                flex: '1', minWidth: '130px',
                background: currentScenario?.id === s.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                color: currentScenario?.id === s.id ? 'var(--primary-dark)' : 'rgba(255,255,255,0.7)',
                border: currentScenario?.id === s.id ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                padding: '12px 8px', borderRadius: '16px', cursor: 'pointer',
                transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left',
                boxShadow: currentScenario?.id === s.id ? '0 0 15px rgba(251, 222, 5, 0.3)' : 'none'
              }}
            >
              <span style={{ fontSize: '0.55rem', fontWeight: 800, opacity: 0.7 }}>SCENARIO {s.id}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{s.name}</span>
            </button>
          ))}
        </div>

        {/* PORTAL JUMP BAR */}
        <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
          <button onClick={() => router.push('/dashboard')} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '10px', fontSize: '0.65rem', cursor: 'pointer' }}>ADMIN HQ</button>
          <button onClick={() => router.push('/campuses')} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '10px', fontSize: '0.65rem', cursor: 'pointer' }}>STAFF PORTAL</button>
          <button onClick={() => router.push('/portal')} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '10px', fontSize: '0.65rem', cursor: 'pointer' }}>PARENT PORTAL</button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translate(-50%, 120%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-focus {
          0% { box-shadow: 0 0 0 0 rgba(251, 222, 5, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(251, 222, 5, 0); }
          100% { box-shadow: 0 0 0 0 rgba(251, 222, 5, 0); }
        }
        .demo-focus-target {
          animation: pulse-focus 2s infinite;
          border: 2px solid var(--accent) !important;
          z-index: 100;
        }
        .director-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          border-color: var(--accent) !important;
        }
        .director-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
