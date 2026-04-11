import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useHardware } from "@/hooks/useHardware";

export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const { lang, setLang } = useLanguage();
  const { status } = useHardware();

  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString(lang === 'es' ? 'es-MX' : 'en-US', {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }));
      setDateStr(now.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  const getHardwareIcon = (type: keyof typeof status) => {
    const val = status[type];
    if (val === 'connected') return "🟢";
    if (val === 'disconnected') return "🔴";
    if (val === 'error' || val === 'searching') return "🟡";
    return "⚪";
  };

  return (
    <header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: '0 var(--space-xl)', height: 'var(--header-height)', background: 'rgba(5, 10, 20, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="header-left" style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
        <button 
          className="mobile-burger"
          onClick={() => window.dispatchEvent(new CustomEvent("nutriserve-toggle-sidebar"))}
          aria-label="Toggle Menu"
        >
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </button>
        {title ? (
          <div>
            <div className="header-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{title}</div>
            {subtitle && <div className="header-subtitle" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subtitle}</div>}
          </div>
        ) : (
          <h1 style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "1px", textTransform: 'uppercase' }}>
            NUTRITION SERVICES <span style={{ color: "var(--accent)" }}>COMMAND CENTER</span>
          </h1>
        )}
      </div>

      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: '20px' }}>
        {/* Live Hardware Status Area */}
        <div style={{ 
          display: 'flex', gap: '12px', padding: '6px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', fontWeight: 700 }} title="Printer Status">
            {getHardwareIcon('printer')} PRN
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', fontWeight: 700 }} title="Scanner Status">
            {getHardwareIcon('scanner')} SCN
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', fontWeight: 700 }} title="Pinpad Status">
            {getHardwareIcon('pinpad')} PIN
          </div>
        </div>

        {/* Bilingual Quick Toggle */}
        <div style={{ display: "flex", background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "2px", border: "1px solid var(--border)" }}>
          <button 
            onClick={() => setLang("en")}
            style={{ 
              padding: "4px 10px", 
              fontSize: "0.65rem", 
              fontWeight: 800,
              borderRadius: "6px",
              background: lang === "en" ? "var(--accent)" : "transparent",
              color: lang === "en" ? "var(--primary-dark)" : "var(--text-muted)",
              border: 'none',
              cursor: "pointer",
              transition: 'all 0.2s ease'
            }}
          >EN</button>
          <button 
            onClick={() => setLang("es")}
            style={{ 
              padding: "4px 10px", 
              fontSize: "0.65rem", 
              fontWeight: 800,
              borderRadius: "6px",
              background: lang === "es" ? "var(--accent)" : "transparent",
              color: lang === "es" ? "var(--primary-dark)" : "var(--text-muted)",
              border: 'none',
              cursor: "pointer",
              transition: 'all 0.2s ease'
            }}
          >ES</button>
        </div>

        <div style={{
          padding: "6px 12px",
          background: "rgba(251, 222, 5, 0.1)",
          border: "1px solid rgba(251, 222, 5, 0.3)",
          borderRadius: "var(--radius-sm)",
          fontSize: "0.65rem",
          fontWeight: 800,
          color: "var(--accent)",
          letterSpacing: "0.5px",
          textTransform: "uppercase"
        }}>
          RFP 26-027
        </div>

        <div style={{ textAlign: "right", minWidth: '100px' }}>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: 'var(--text-primary)' }}>{timeStr}</div>
          <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", textTransform: 'uppercase' }}>{dateStr}</div>
        </div>

        <div 
          onClick={() => { sessionStorage.clear(); window.location.reload(); }}
          className="user-avatar"
          style={{ 
            width: 32, height: 32, background: 'var(--accent)', color: 'var(--primary-dark)', 
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 0 10px rgba(251, 222, 5, 0.2)'
          }}>
          AD
        </div>
      </div>
    </header>
  );
}
