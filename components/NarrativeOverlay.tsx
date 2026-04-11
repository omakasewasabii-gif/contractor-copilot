"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { Scenario } from "@/constants/demoScenarios";

interface NarrativeOverlayProps {
  currentScenario: Scenario | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function NarrativeOverlay({ currentScenario, isVisible, onClose }: NarrativeOverlayProps) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setActive(true);
      // Auto-fade after 12 seconds as planned
      const timer = setTimeout(() => {
        setActive(false);
        setTimeout(onClose, 500); // Wait for transition
      }, 12000);
      return () => clearTimeout(timer);
    } else {
      setActive(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !currentScenario) return null;

  const bullets = lang === 'es' ? currentScenario.bulletsEs : currentScenario.bullets;

  return (
    <div style={{
      position: 'fixed',
      top: 'calc(var(--header-height) + 20px)',
      left: '50%',
      transform: active ? 'translateX(-50%)' : 'translateX(-50%) translateY(-20px)',
      opacity: active ? 1 : 0,
      zIndex: 1000,
      width: '90%',
      maxWidth: '600px',
      background: 'rgba(12, 29, 63, 0.9)',
      backdropFilter: 'blur(16px)',
      border: '2px solid var(--accent)',
      borderRadius: '24px',
      padding: '20px var(--space-xl)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 20px rgba(251, 222, 5, 0.2)',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <div style={{ 
          width: 40, height: 40, background: 'var(--accent)', borderRadius: '12px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' 
        }}>
          🎯
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {lang === 'es' ? 'INSTRUCCIONES DE MISIÓN' : 'MISSION BRIEFING'}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{currentScenario.name}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bullets.map((bullet, i) => (
          <div key={i} style={{ 
            display: 'flex', gap: '10px', alignItems: 'flex-start',
            animation: `fade-slide-in 0.5s ease forwards ${i * 0.1}s`,
            opacity: 0,
            transform: 'translateX(-10px)'
          }}>
            <span style={{ color: 'var(--accent)', fontWeight: 800 }}>•</span>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.4 }}>{bullet}</span>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '16px', height: '2px', background: 'rgba(255,255,255,0.1)', 
        borderRadius: '1px', position: 'relative', overflow: 'hidden' 
      }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, height: '100%', 
          background: 'var(--accent)', width: active ? '100%' : '0%',
          transition: 'width 12s linear'
        }} />
      </div>

      <style jsx>{`
        @keyframes fade-slide-in {
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
