"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";
import { useToast } from "@/components/Toast";

const content = {
  en: {
    title: "NutriServe Command Center",
    subtitle: "El Paso ISD — 69 Campuses • 48,000+ Students",
    nav: {
      dashboard: "Dashboard",
      campuses: "Campuses",
      reports: "Reports",
      inventory: "Inventory",
      payments: "Payments"
    },
    stats: {
      mealsServed: "Meals Served Today",
      studentsActive: "Students Active",
      revenue: "Revenue Today",
      campuses: "Campuses Online"
    },
    compliance: {
      title: "RFP 26-027 COMPLIANCE STATUS",
      desc: "System fully aligned with EPISD district scale: 69 Campuses | 48,000+ Students | Bilingual (EN/ES) Support",
      verified: "VERIFIED",
      secure: "SECURE"
    },
    mission: {
      title: "🛡️ Compliance Mission Control",
      ready: "100% RFP Ready",
      ux: "Bilingual UX (EN/ES)",
      cep: "CEP Universal Eligibility",
      usda: "USDA Nutrient Standards",
      tda: "TDA Reimbursement Sync",
      alpha: "Automated RFP 26-027 Audit Trail Active"
    },
    throughput: {
      title: "📡 Live District Throughput",
      realtime: "Real-time",
      breakfast: "Breakfast Peak",
      tx: "TX Throughput",
      latency: "Average Latency"
    },
    table: {
      title: "Campus Performance — Top 8",
      subtitle: "Today's participation across high schools",
      viewAll: "View All 69 →",
      cols: ["Campus", "Meals Served", "ISP %", "Participation", "Revenue"]
    },
    bottom: {
      usda: "🛡️ USDA Compliance",
      tda: "📋 TDA Reports",
      system: "🔄 System Status",
      pending: "1 Due",
      online: "All Online",
      fedPrograms: "Fed Programs (SBP, NSLP, CACFP, ASSP, SSO, SFSP)",
      active: "Active",
      verified: "Verified",
      ready: "Ready",
      compliant: "Compliant"
    }
  },
  es: {
    title: "Centro de Mando NutriServe",
    subtitle: "El Paso ISD — 69 Escuelas • 48,000+ Estudiantes",
    nav: {
      dashboard: "Panel de Control",
      campuses: "Escuelas",
      reports: "Reportes",
      inventory: "Inventario",
      payments: "Pagos"
    },
    stats: {
      mealsServed: "Comidas Servidas Hoy",
      studentsActive: "Estudiantes Activos",
      revenue: "Ingresos de Hoy",
      campuses: "Escuelas en Línea"
    },
    compliance: {
      title: "ESTADO DE CUMPLIMIENTO RFP 26-027",
      desc: "Sistema alineado con la escala del distrito EPISD: 69 Escuelas | 48,000+ Estudiantes | Soporte Bilingüe",
      verified: "VERIFICADO",
      secure: "SEGURO"
    },
    mission: {
      title: "🛡️ Centro de Misión de Cumplimiento",
      ready: "100% Listo para RFP",
      ux: "UX Bilingüe (EN/ES)",
      cep: "Elegibilidad Universal CEP",
      usda: "Estándares Nutricionales USDA",
      tda: "Sincronización de Reembolsos TDA",
      alpha: "Rastro de Auditoría RFP 26-027 Automatizado"
    },
    throughput: {
      title: "📡 Rendimiento del Distrito en Vivo",
      realtime: "Tiempo real",
      breakfast: "Pico de Desayuno",
      tx: "Rendimiento TX",
      latency: "Latencia Promedio"
    },
    table: {
      title: "Rendimiento de Escuelas — Top 8",
      subtitle: "Participación de hoy en preparatorias",
      viewAll: "Ver las 69 →",
      cols: ["Escuela", "Comidas Servidas", "ISP %", "Participación", "Ingresos"]
    },
    bottom: {
      usda: "🛡️ Cumplimiento USDA",
      tda: "📋 Reportes TDA",
      system: "🔄 Estado del Sistema",
      pending: "1 Pendiente",
      online: "En Línea",
      fedPrograms: "Programas Fed. (SBP, NSLP, CACFP, ASSP, SSO, SFSP)",
      active: "Activo",
      verified: "Verificado",
      ready: "Listo",
      compliant: "En Regla"
    }
  }
};

export default function Dashboard() {
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const t = content[lang];
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />
        <div className="page-content">
            <div className="stats-grid">
              <div className="stat-card" data-demo-tooltip="RFP 26-027 Sect 3: Ground Control Dashboard. Real-time participation scale across 69 campuses.">
                <div className="stat-icon green">📊</div>
                <div className="stat-info">
                  <h3>12,847</h3>
                  <p>{t.stats.mealsServed}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon blue">👤</div>
                <div className="stat-info">
                  <h3>47,832</h3>
                  <p>{t.stats.studentsActive}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon amber">💰</div>
                <div className="stat-info">
                  <h3>$18,420</h3>
                  <p>{t.stats.revenue}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon red">🏫</div>
                <div className="stat-info">
                  <h3>69/69</h3>
                  <p>{t.stats.campuses}</p>
                </div>
              </div>
            </div>

            <div className="dashboard-row">
              <section className="dashboard-section mission-control glass" data-demo-tooltip="RFP 26-027 Sect 1: Federal Program Parity & compliance rules engine (CEP, SBP, NSLP)." data-teleprompter={"Good morning, everyone. I'm Fresh, the Lead Developer and Operator behind NutriServe.\n\nWhen my team looked at EPISD's requirements for RFP 26-027, we didn't just see a technical checklist. We saw the operational reality of managing 69 campuses, millions of dollars in federal funding, and the daily chaos of the lunchline.\n\nMost software vendors build tools that look good in a boardroom but break on the frontlines. NutriServe was built differently. It's an institutional-grade operating system designed specifically around zero-downtime, offline-first reliability, and strict federal compliance.\n\nLet's dive in. If you look at the screen I'm sharing, we'll start at the top:\n\nWhat you are looking at right now is our Mission Control Dashboard. This is the central office's high-altitude view of the entire district's operations in real-time.\n\nFrom here, you have an immediate pulse on compliance, daily drawdowns, and network health across the district. Everything is secured with Role-Based Access Controls."}>
                <div className="section-header">
                  <h2>{t.mission.title}</h2>
                  <span className="badge active">{t.compliance.verified}</span>
                </div>
                <div className="compliance-grid">
                  <div className="compliance-item">
                    <span className="check">✓</span>
                    <p>{t.mission.cep}</p>
                  </div>
                  <div className="compliance-item">
                    <span className="check">✓</span>
                    <p>{t.mission.usda}</p>
                  </div>
                  <div className="compliance-item">
                    <span className="check">✓</span>
                    <p>{t.mission.tda}</p>
                  </div>
                  <div className="compliance-item">
                    <span className="check">✓</span>
                    <p>{t.mission.ux}</p>
                  </div>
                </div>
                <div className="mission-footer">
                  <p className="alpha-tag">{t.mission.alpha}</p>
                </div>
              </section>

              <section className="dashboard-section throughput glass" data-demo-tooltip="RFP 26-027 Sect 3: Infrastructure. Disaster Recovery, Latency monitoring, and load performance.">
                <div className="section-header">
                  <h2>{t.throughput.title}</h2>
                  <div className="pulse-dot"></div>
                </div>
                <div className="throughput-metrics">
                  <div className="metric">
                    <p>{t.throughput.breakfast}</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '88%' }}></div>
                    </div>
                    <span className="percent">88%</span>
                  </div>
                  <div className="metric">
                    <p>{t.throughput.tx}</p>
                    <div className="progress-bar">
                      <div className="progress blue" style={{ width: '94%' }}></div>
                    </div>
                    <span className="percent">94%</span>
                  </div>
                </div>
                <div className="latency-info">
                  <p>{t.throughput.latency}: <span className="gold">12ms</span></p>
                </div>
              </section>
            </div>

            <section className="dashboard-section table-section glass" data-demo-tooltip="RFP 26-027 Sect 2: Institutional Reporting. Automated Identified Student Percentage (ISP) tracking.">
              <div className="section-header">
                <div>
                  <h2>{t.table.title}</h2>
                  <p className="section-subtitle">{t.table.subtitle}</p>
                </div>
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => showToast(lang === 'es' ? "Cargando directorio completo..." : "Loading total 69-campus roster...")}
                >
                  {t.table.viewAll}
                </button>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      {t.table.cols.map((col: string, i: number) => (
                        <th key={i}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Franklin HS", "1,240", "100%", "92%", "$2,480"],
                      ["Coronado HS", "1,180", "100%", "89%", "$2,360"],
                      ["El Paso HS", "980", "100%", "94%", "$1,960"],
                      ["Austin HS", "850", "100%", "87%", "$1,700"],
                      ["Jefferson HS", "790", "100%", "91%", "$1,580"],
                      ["Andress HS", "760", "100%", "88%", "$1,520"],
                      ["Irvin HS", "720", "100%", "85%", "$1,440"],
                      ["Bowie HS", "680", "100%", "82%", "$1,360"]
                    ].map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <Footer />
      </main>
    </div>
  );
}
