"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    brandSubtitle: "EPISD Food & Nutrition",
    operations: "Operations",
    pos: "PoS Terminal",
    dashboard: "Dashboard",
    students: "Students",
    nutrition: "Nutrition",
    menu: "Menu Planning",
    analysis: "Nutrition Analysis",
    inventory: "Inventory",
    finance: "Finance",
    payments: "Payments",
    reports: "Reports",
    admin: "Admin",
    campuses: "Campuses",
    users: "Users",
    settings: "Settings",
    pilot: "EPISD PILOT",
    builtFor: "Built for 69 EPISD Campuses",
  },
  es: {
    brandSubtitle: "Alimentación y Nutrición",
    operations: "Operaciones",
    pos: "Terminal PoS",
    dashboard: "Panel de Control",
    students: "Estudiantes",
    nutrition: "Nutrición",
    menu: "Planeación de Menú",
    analysis: "Análisis Nutricional",
    inventory: "Inventario",
    finance: "Finanzas",
    payments: "Pagos",
    reports: "Reportes",
    admin: "Administración",
    campuses: "Escuelas",
    users: "Usuarios",
    settings: "Ajustes",
    pilot: "PILOTO EPISD",
    builtFor: "Construido para 69 Escuelas",
  }
};

export default function Sidebar() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const t = content[lang];
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Listen for mobile toggle event from Header
  useEffect(() => {
    const handleToggle = () => setIsMobileOpen(prev => !prev);
    window.addEventListener("nutriserve-toggle-sidebar", handleToggle);
    return () => window.removeEventListener("nutriserve-toggle-sidebar", handleToggle);
  }, []);

  // Close sidebar on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);
  
  const [userRole, setUserRole] = useState("admin");

  useEffect(() => {
    const role = sessionStorage.getItem("nutriserve_role") || "admin";
    setUserRole(role);
  }, []);

  const isStaff = userRole === "staff";

  const navSections = [
    {
      label: t.operations,
      items: [
        { icon: "🖥️", label: t.pos, href: "/pos" },
        ...(!isStaff ? [{ icon: "📊", label: t.dashboard, href: "/" }] : []),
        ...(!isStaff ? [{ icon: "🏠", label: lang === "en" ? "Parent Portal" : "Portal de Padres", href: "/portal" }] : []),
        ...(!isStaff ? [{ icon: "👨‍🎓", label: t.students, href: "/students" }] : []),
      ],
    },
    {
      label: t.nutrition,
      items: [
        { icon: "🍽️", label: t.menu, href: "/menus" },
        { icon: "🥗", label: lang === "en" ? "Recipe Intelligence" : "Inteligencia de Recetas", href: "/recipes" },
        ...(!isStaff ? [{ icon: "📊", label: t.analysis, href: "/nutrition" }] : []),
        { icon: "📦", label: t.inventory, href: "/inventory" },
      ],
    },
    ...(!isStaff ? [{
      label: t.finance,
      items: [
        { icon: "💳", label: t.payments, href: "/payments" },
        { icon: "📈", label: t.reports, href: "/reports" },
      ],
    }] : []),
    ...(!isStaff ? [{
      label: t.admin,
      items: [
        { icon: "🏫", label: t.campuses, href: "/campuses" },
        { icon: "👤", label: t.users, href: "/users" },
        { icon: "🎧", label: lang === "en" ? "Support & Rollout" : "Soporte y Despliegue", href: "/support" },
        { icon: "⚙️", label: t.settings, href: "/settings" },
      ],
    }] : []),
  ];

  return (
    <>
      <div 
        className={`mobile-overlay ${isMobileOpen ? "active" : ""}`}
        onClick={() => setIsMobileOpen(false)}
      ></div>
      <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`} style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
      <div className="sidebar-header" style={{ padding: 'var(--space-lg)', borderBottom: '1px solid var(--border)' }}>
        <div className="sidebar-logo" style={{ 
          background: "var(--accent)", width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
          boxShadow: '0 0 20px rgba(251, 222, 5, 0.2)'
        }}>
          🥝
        </div>
        <div className="sidebar-brand">
          <h1 style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.5px' }}>NutriServe</h1>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase' }}>{t.brandSubtitle}</span>
        </div>
      </div>

      <nav className="sidebar-nav" style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-md)' }}>
        {navSections.map((section) => (
          <div key={section.label} className="nav-section" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="nav-section-label" style={{ 
              fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0 12px 8px' 
            }}>{section.label}</div>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href ? "active" : ""}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '12px',
                  fontSize: '0.85rem', fontWeight: 500, color: pathname === item.href ? 'var(--primary-dark)' : 'var(--text-secondary)',
                  background: pathname === item.href ? 'var(--accent)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <span className="nav-icon" style={{ fontSize: '1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div style={{
        padding: "var(--space-lg)",
        borderTop: "1px solid var(--border)",
        background: "rgba(5, 12, 25, 0.6)",
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ 
            width: 36, height: 36, borderRadius: "10px", background: "rgba(251, 222, 5, 0.15)", border: '1px solid var(--accent)',
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" 
          }}>🛡️</div>
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--text-primary)" }}>{t.pilot}</div>
            <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--accent)" }}>RFP 26-027 COMPLIANT</div>
          </div>
        </div>

        {/* Compliance Seals */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>TDA</div>
            <div style={{ fontSize: '0.4rem', fontWeight: 600, color: '#4ade80' }}>CERTIFIED</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>USDA</div>
            <div style={{ fontSize: '0.4rem', fontWeight: 600, color: '#4ade80' }}>ALIGNED</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>HIPAA</div>
            <div style={{ fontSize: '0.4rem', fontWeight: 600, color: '#4ade80' }}>SECURE</div>
          </div>
        </div>

        <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
          NutriServe v1.0 &bull; <strong>Gold State</strong>
          <br />
          {t.builtFor}
          <br />
          <span style={{ color: "var(--accent)", fontWeight: 700 }}>EP / LAS CRUCES / JUÁREZ</span>
        </div>
      </div>
      </aside>
    </>
  );
}
