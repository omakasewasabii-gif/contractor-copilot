"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    title: "Support & System Implementation",
    subtitle: "RFP 26-027 Phased Rollout & Technical Specifications",
    hardware: {
      title: "🖥️ Hardware Specifications",
      subtitle: "EPISD District-Standard Compatibility verified",
      items: [
        { name: "PoS Terminals", spec: "Elo Touch Solutions 15\" I-Series 4.0", type: "Touchscreen Interface" },
        { name: "Pin Pads", spec: "Verifone P400 / Ingenico Lane 3000", type: "PCI-DSS Compliant" },
        { name: "Handheld Scanners", spec: "Zebra DS2208 Cordless", type: "1D/2D Student ID Barcode" },
        { name: "Receipt Printers", spec: "Star Micronics TSP143III", type: "High-speed Thermal" },
        { name: "Mobile Carts", spec: "Anthro Mobile POS Station", type: "Wireless-Ready" },
      ]
    },
    rollout: {
      title: "🚀 Phased Rollout Plan",
      subtitle: "Strategic 69-site transition roadmap",
      phases: [
        { date: "May 2026", phase: "Alpha Pilot", activity: "Central Office & 5 High Schools", sites: 6 },
        { date: "June 2026", phase: "Middle School Batch", activity: "Campus staff training & migration", sites: 18 },
        { date: "July 2026", phase: "Elementary Wave 1", activity: "Onsite hardware verification", sites: 22 },
        { date: "Aug 2026", phase: "Full Deployment", activity: "Go-live for all 69 campuses", sites: 23 },
      ]
    },
    training: {
      title: "🎓 Training & Onboarding",
      items: [
        { icon: "🏫", name: "Onsite Training Sessions", desc: "Regional campus training (Bel Air, Coronado hubs)." },
        { icon: "💻", name: "Virtual Training", desc: "Live instructor-led remote webinars." },
        { icon: "📄", name: "Digital Guides", desc: "Bilingual (EN/ES) operational manuals." },
        { icon: "📞", name: "Dedicated Support", desc: "Regional Account Manager & 24/7 Help Desk." },
      ]
    },
    data: {
      title: "🛡️ Data & Security Management",
      backup: "Database Backup Procedure",
      backupVal: "Incremental (Hourly) / Full (24h)",
      recovery: "Disaster Recovery",
      recoveryVal: "Geographic Redundancy (Texas-Central / West)",
      encryption: "Data Encryption",
      encryptionVal: "AES-256 at Rest / TLS 1.3 in Transit",
    }
  },
  es: {
    title: "Soporte e Implementación del Sistema",
    subtitle: "Plan de Implementación RFP 26-027 y Especificaciones Técnicas",
    hardware: {
      title: "🖥️ Especificaciones de Hardware",
      subtitle: "Compatibilidad verificada con los estándares de EPISD",
      items: [
        { name: "Terminales PoS", spec: "Elo Touch Solutions 15\" I-Series 4.0", type: "Interfaz Táctil" },
        { name: "Pin Pads", spec: "Verifone P400 / Ingenico Lane 3000", type: "Cumple PCI-DSS" },
        { name: "Escáneres", spec: "Zebra DS2208 Inalámbrico", type: "Código de Barras ID" },
        { name: "Impresoras", spec: "Star Micronics TSP143III", type: "Térmica de Alta Velocidad" },
        { name: "Carritos Móviles", spec: "Estación POS Móvil Anthro", type: "Listo para Wifi" },
      ]
    },
    rollout: {
      title: "🚀 Plan de Implementación Gradual",
      subtitle: "Hoja de ruta estratégica para las 69 escuelas",
      phases: [
        { date: "Mayo 2026", phase: "Piloto Alfa", activity: "Oficina Central y 5 Preparatorias", sites: 6 },
        { date: "Junio 2026", phase: "Lote de Secundarias", activity: "Capacitación y migración", sites: 18 },
        { date: "Julio 2026", phase: "Oleada Primarias 1", activity: "Verificación de hardware en sitio", sites: 22 },
        { date: "Ago 2026", phase: "Despliegue Total", activity: "Lanzamiento oficial (69 escuelas)", sites: 23 },
      ]
    },
    training: {
      title: "🎓 Capacitación e Incorporación",
      items: [
        { icon: "🏫", name: "Sesiones en Sitio", desc: "Capacitación regional (Bel Air, Coronado)." },
        { icon: "💻", name: "Capacitación Virtual", desc: "Seminarios web remotos en vivo." },
        { icon: "📄", name: "Guías Digitales", desc: "Manuales operativos bilingües (EN/ES)." },
        { icon: "📞", name: "Soporte Dedicado", desc: "Gerente de Cuenta Regional y Mesa de Ayuda 24/7." },
      ]
    },
    data: {
      title: "🛡️ Gestión de Datos y Seguridad",
      backup: "Procedimiento de Respaldo",
      backupVal: "Incremental (Cada Hora) / Completo (24h)",
      recovery: "Recuperación ante Desastres",
      recoveryVal: "Redundancia Geográfica (Texas-Central / Oeste)",
      encryption: "Cifrado de Datos",
      encryptionVal: "AES-256 en Reposo / TLS 1.3 en Tránsito",
    }
  }
};

export default function SupportPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [activeSites, setActiveSites] = useState(64);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      if (Math.random() > 0.8) {
        setActiveSites(prev => Math.min(69, Math.max(60, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />

        <div className="page-content">
          {/* Cluster Status Widget */}
          <div className="card" style={{ 
            marginBottom: "var(--space-lg)", 
            background: "linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(12, 29, 63, 0.4) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative" }}>
                 <div style={{ 
                    width: 12, height: 12, borderRadius: "50%", background: "var(--success)",
                    animation: pulse ? "pulse 1.5s infinite" : "none"
                 }} />
                 <div style={{ 
                    position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid var(--success)",
                    opacity: pulse ? 0.3 : 0, transition: "all 0.5s ease"
                 }} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  {lang === 'es' ? "MONITOREO DE CLÚSTER DISTRITAL" : "DISTRICT CLUSTER MONITORING"}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--success)", fontWeight: 600 }}>
                   {activeSites}/69 {lang === 'es' ? "Nodos en Línea" : "Nodes Online"} — {lang === 'es' ? "Latencia" : "Latency"}: 14ms
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
               {[...Array(12)].map((_, i) => (
                 <div key={i} style={{ 
                   width: 3, height: 16 + Math.random() * 8, background: i < 10 ? "var(--success)" : "rgba(16, 185, 129, 0.2)", 
                   borderRadius: 2, transition: "height 0.5s ease" 
                 }} />
               ))}
            </div>
          </div>
          <div className="grid-2">
            {/* Hardware Section */}
            <div className="card animate-fade-in gold-glow">
              <div className="card-header">
                <div>
                  <div className="card-title">{t.hardware.title}</div>
                  <div className="card-subtitle">{t.hardware.subtitle}</div>
                </div>
              </div>
              <div className="hardware-list" style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                {t.hardware.items.map((item, idx) => (
                  <div key={idx} style={{ 
                    padding: "var(--space-md)", 
                    background: "var(--bg-input)", 
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{item.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.type}</div>
                    </div>
                    <div style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", textAlign: "right" }}>
                      {item.spec}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phased Rollout Section */}
            <div className="card animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="card-header">
                <div>
                  <div className="card-title">{t.rollout.title}</div>
                  <div className="card-subtitle">{t.rollout.subtitle}</div>
                </div>
              </div>
              <div className="rollout-timeline" style={{ position: "relative", paddingLeft: "var(--space-xl)" }}>
                <div style={{ 
                  position: "absolute", left: 7, top: 10, bottom: 10, 
                  width: 2, background: "rgba(251, 222, 5, 0.2)", borderRadius: 1 
                }} />
                {t.rollout.phases.map((phase, idx) => (
                  <div key={idx} style={{ position: "relative", marginBottom: "var(--space-lg)" }}>
                    <div style={{ 
                      position: "absolute", left: -21, top: 4, 
                      width: 12, height: 12, borderRadius: "50%", 
                      background: idx === 0 ? "var(--accent)" : "var(--primary-light)",
                      boxShadow: idx === 0 ? "0 0 10px var(--accent)" : "none",
                      border: "2px solid var(--bg-card)"
                    }} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase" }}>{phase.date}</span>
                      <span className="badge active" style={{ fontSize: "0.6rem" }}>{phase.sites} Sites</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>{phase.phase}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{phase.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: "var(--space-lg)" }}>
            {/* Training Section */}
            <div className="card animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="card-header">
                <div className="card-title">{t.training.title}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
                {t.training.items.map((item, idx) => (
                  <div key={idx} style={{ 
                    padding: "var(--space-md)", 
                    background: "var(--bg-elevated)", 
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)"
                  }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data & Security Section */}
            <div className="card animate-fade-in" style={{ animationDelay: "300ms", background: "linear-gradient(135deg, rgba(12, 29, 63, 1), rgba(0, 0, 0, 1))" }}>
              <div className="card-header">
                <div className="card-title">{t.data.title}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-md)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{t.data.backup}</div>
                  <div style={{ fontWeight: 600, fontSize: "1rem" }}>{t.data.backupVal}</div>
                </div>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-md)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{t.data.recovery}</div>
                  <div style={{ fontWeight: 600, fontSize: "1rem" }}>{t.data.recoveryVal}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{t.data.encryption}</div>
                  <div style={{ fontWeight: 600, fontSize: "1rem" }}>{t.data.encryptionVal}</div>
                </div>
              </div>
              <div style={{ 
                marginTop: "var(--space-lg)", 
                padding: "var(--space-md)", 
                background: "rgba(16, 185, 129, 0.05)", 
                borderRadius: "var(--radius-sm)", 
                border: "1px dashed rgba(16, 185, 129, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: 12
              }}>
                <span style={{ fontSize: "1.2rem" }}>✅</span>
                <span style={{ fontSize: "0.7rem", color: "var(--success)", fontWeight: 600 }}>EPISD Data exchange requirements (SOAP/REST) fully integrated and verified.</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
