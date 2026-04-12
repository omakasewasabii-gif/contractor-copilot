"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { DEMO_SCENARIOS } from "@/constants/demoScenarios";
import { useLanguage } from "./LanguageContext";

export default function Teleprompter() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  // Auto-detect the script for the current page. If no direct match, fallback to the mission control 01 scenario.
  const scenario = DEMO_SCENARIOS.find(s => s.path === pathname) || DEMO_SCENARIOS[0];
  const bullets = lang === 'es' ? scenario.bulletsEs : scenario.bullets;

  return (
    <div 
      className="teleprompter-badge"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        top: '50%',
        right: '0',
        transform: 'translateY(-50%)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{
        background: 'rgba(12, 29, 63, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '2px solid var(--accent)',
        borderRight: 'none',
        borderRadius: '16px 0 0 16px',
        padding: '12px 16px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 0 20px rgba(251, 222, 5, 0.4)',
        transition: 'all 0.3s ease',
      }}>
        <span style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 0 8px rgba(251, 222, 5, 0.8))' }}>🌟</span>
      </div>

      <div style={{
        position: 'absolute',
        right: '100%',
        top: '50%',
        transform: isHovered ? 'translateY(-50%) translateX(-12px) scale(1)' : 'translateY(-50%) translateX(10px) scale(0.95)',
        background: 'rgba(12, 29, 63, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '2px solid var(--accent)',
        borderRadius: '24px',
        padding: '24px',
        width: '400px',
        opacity: isHovered ? 1 : 0,
        pointerEvents: isHovered ? 'auto' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        transformOrigin: 'center right'
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          {scenario.name}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', lineHeight: 1.5 }}>
          {scenario.narrative}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bullets.map((b, i) => (
             <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
               <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: '1.2rem', lineHeight: '1rem' }}>•</span>
               <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.95)', fontWeight: 600, lineHeight: 1.4 }}>{b}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
