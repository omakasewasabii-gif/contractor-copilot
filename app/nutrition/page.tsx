"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";

export default function NutritionalAnalysis() {
  const { lang } = useLanguage();
  const [activeRange, setActiveRange] = useState("week");

  const kpis = [
    { label: lang === 'en' ? "Avg Daily Calories" : "Calorías Diarias Prom.", value: "624", limit: "Target: 550-650", status: "success" },
    { label: lang === 'en' ? "Avg Sodium" : "Sodio Prom.", value: "1,140mg", limit: "Limit: <1230mg", status: "success" },
    { label: lang === 'en' ? "Saturated Fat" : "Grasa Saturada", value: "8.2%", limit: "Limit: <10%", status: "success" },
    { label: lang === 'en' ? "Trans Fat" : "Grasas Trans", value: "0g", limit: "Required: 0g", status: "success" }
  ];

  const analysisData = [
    { name: "Homestyle Chicken Tenders", menu: "Monday", cal: 580, protein: 28, sodium: 850, fat: 12, compliance: "TDA Certified" },
    { name: "Beef Street Tacos", menu: "Tuesday", cal: 610, protein: 32, sodium: 920, fat: 14, compliance: "TDA Certified" },
    { name: "Roasted Turkey Sub", menu: "Wednesday", cal: 520, protein: 26, sodium: 1100, fat: 8, compliance: "USDA Aligned" },
    { name: "Classic Cheese Pizza", menu: "Thursday", cal: 640, protein: 24, sodium: 1180, fat: 18, compliance: "Under Review" },
    { name: "Texas BBQ Chicken", menu: "Friday", cal: 590, protein: 30, sodium: 980, fat: 10, compliance: "TDA Certified" }
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title={lang === 'en' ? "Nutrition" : "Nutrición"} subtitle={lang === 'en' ? "Compliance & Macro Tracking" : "Cumplimiento y Macros"} />
        <main className="page-content" style={{ padding: "var(--space-xl)", maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          
          {/* Top Controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                {lang === 'en' ? "District Macro Pulse" : "Pulso Macro del Distrito"}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'en' ? "Real-time compliance aggregation across 69 campuses" : "Agregación de cumplimiento en tiempo real en 69 escuelas"}
              </p>
            </div>
            
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4 }}>
              {['day', 'week', 'month'].map(range => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: activeRange === range ? 'var(--accent)' : 'transparent',
                    color: activeRange === range ? 'var(--primary-dark)' : 'var(--text-secondary)',
                    fontWeight: activeRange === range ? 800 : 600,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'en' ? range : (range === 'day' ? 'Día' : range === 'week' ? 'Semana' : 'Mes')}
                </button>
              ))}
            </div>
          </div>

          {/* KPI Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
            {kpis.map((kpi, idx) => (
              <div key={idx} className="card glass" style={{ padding: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{kpi.label}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: kpi.status === 'success' ? '#4ade80' : 'var(--accent)', boxShadow: `0 0 10px ${kpi.status === 'success' ? '#4ade80' : 'var(--accent)'}` }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.5px' }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', display: 'inline-block', padding: '4px 8px', borderRadius: 6 }}>
                  {kpi.limit}
                </div>
              </div>
            ))}
          </div>

          {/* Macro Breakdown Visual */}
          <div className="card glass" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 'var(--space-lg)' }}>{lang === 'en' ? "Caloric Distribution Target" : "Objetivo de Distribución Calórica"}</h3>
             
             <div style={{ display: 'flex', height: 24, borderRadius: 12, overflow: 'hidden', marginBottom: 'var(--space-md)' }}>
                <div style={{ width: '55%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#fff' }}>55% CARBS</div>
                <div style={{ width: '20%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary-dark)' }}>20% PRO</div>
                <div style={{ width: '25%', background: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#fff' }}>25% FAT</div>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
               <span>USDA Guideline Alignment: <strong style={{ color: '#4ade80' }}>Verified</strong></span>
               <span>TDA Caloric Deviation: <strong>&lt; 2%</strong></span>
             </div>
          </div>

          {/* Deep Analysis Table */}
          <div className="card glass" style={{ overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-lg)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
               <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{lang === 'en' ? "High-Volume Recipe Audits" : "Auditorías de Recetas de Alto Volumen"}</h3>
            </div>
            <div className="table-container" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '16px' }}>{lang === 'en' ? "Item" : "Artículo"}</th>
                    <th style={{ padding: '16px' }}>{lang === 'en' ? "Cycle" : "Ciclo"}</th>
                    <th style={{ padding: '16px' }}>{lang === 'en' ? "Kcal" : "Kcal"}</th>
                    <th style={{ padding: '16px' }}>{lang === 'en' ? "Pro (g)" : "Pro (g)"}</th>
                    <th style={{ padding: '16px' }}>{lang === 'en' ? "Sod (mg)" : "Sod (mg)"}</th>
                    <th style={{ padding: '16px', textAlign: 'right' }}>{lang === 'en' ? "Compliance" : "Cumplimiento"}</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <td style={{ padding: '16px', fontWeight: 700 }}>{row.name}</td>
                      <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{row.menu}</td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{row.cal}</td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{row.protein}</td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{row.sodium}</td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <span style={{ 
                          fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase',
                          background: row.compliance === 'Under Review' ? 'rgba(251, 222, 5, 0.15)' : 'rgba(74, 222, 128, 0.15)',
                          color: row.compliance === 'Under Review' ? 'var(--accent)' : '#4ade80'
                        }}>
                          {row.compliance === 'Under Review' && lang === 'es' ? 'En Revisión' : row.compliance === 'TDA Certified' && lang === 'es' ? 'Certificado TDA' : row.compliance === 'USDA Aligned' && lang === 'es' ? 'Alineado USDA' : row.compliance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
