"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";

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
  const t = content[lang];
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />
        <div className="page-content">
           <div className="stats-grid">
              <div className="stat-card"><h3>12,847</h3><p>{t.stats.mealsServed}</p></div>
              <div className="stat-card"><h3>47,832</h3><p>{t.stats.studentsActive}</p></div>
              <div className="stat-card"><h3>$18,420</h3><p>{t.stats.revenue}</p></div>
              <div className="stat-card"><h3>69/69</h3><p>{t.stats.campuses}</p></div>
           </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
