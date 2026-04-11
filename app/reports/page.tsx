"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";

const monthlyData = [
  { month: "Oct 2025", meals: 892000, revenue: 148200, claimAmount: 412800, participation: 87.2 },
  { month: "Nov 2025", meals: 784000, revenue: 130100, claimAmount: 362400, participation: 86.8 },
  { month: "Dec 2025", meals: 612000, revenue: 101700, claimAmount: 283200, participation: 85.1 },
  { month: "Jan 2026", meals: 864000, revenue: 143500, claimAmount: 399600, participation: 88.4 },
  { month: "Feb 2026", meals: 798000, revenue: 132500, claimAmount: 369000, participation: 89.1 },
  { month: "Mar 2026", meals: 456000, revenue: 75700, claimAmount: 210900, participation: 89.8 },
];

const campusRanking = [
  { rank: 1, name: "Transmountain ES", participation: 96.2, trend: "+1.2%" },
  { rank: 2, name: "Roberts ES", participation: 95.8, trend: "+0.8%" },
  { rank: 3, name: "Montwood HS", participation: 91.6, trend: "+2.1%" },
  { rank: 4, name: "Bel Air HS", participation: 91.5, trend: "+0.3%" },
  { rank: 5, name: "Americas HS", participation: 91.7, trend: "+1.5%" },
  { rank: 6, name: "Franklin HS", participation: 90.2, trend: "-0.5%" },
  { rank: 7, name: "Coronado HS", participation: 89.5, trend: "+0.7%" },
  { rank: 8, name: "Eastwood HS", participation: 88.9, trend: "+1.1%" },
];

const content = {
  en: {
    title: "Reports & Analytics",
    subtitle: "FY2025-2026 — District-wide Performance",
    stats: {
      totalMeals: "Total Meals This Year",
      totalMealsVal: "4.4M",
      totalMealsTrend: "↑ 3.8% vs last year",
      revenue: "Total Revenue (YTD)",
      revenueVal: "$731K",
      revenueTrend: "↑ 5.2%",
      claims: "Reimbursement Claims",
      claimsVal: "$2.04M",
      claimsTrend: "↑ 4.1%",
      participation: "Avg Participation Rate",
      participationVal: "88.2%",
      participationTrend: "↑ 1.3%",
    },
    monthlyPerf: {
      title: "Monthly Performance",
      exportBtn: "Export CSV ↓",
      colMonth: "Month",
      colMeals: "Meals",
      colRev: "Revenue",
      colClaims: "Claims",
      colPart: "Participation",
    },
    topCampuses: {
      title: "🏆 Top Performing Campuses",
      badge: "March 2026",
      colRank: "#",
      colCampus: "Campus",
      colPart: "Participation",
      colTrend: "Trend",
      colHash: "Forensic Hash ID",
    },
    reports: {
      title: "📥 Generate Reports",
      list: [
        { icon: "📋", name: "Monthly Reimbursement Claim", type: "TDA Required" },
        { icon: "📊", name: "Participation Report", type: "By Campus" },
        { icon: "💰", name: "Revenue & Expense", type: "Financial" },
        { icon: "🛡️", name: "Verification Summary", type: "USDA Required" },
        { icon: "📄", name: "Daily Cash Journal", type: "Financial" },
        { icon: "🔍", name: "Account Edit Check", type: "Compliance" },
        { icon: "🔒", name: "End of Year Closeout", type: "Annual" },
        { icon: "🔑", name: "Start of Year Initialization", type: "Annual" },
        { icon: "👥", name: "Civil Rights Data", type: "Federal Required" },
        { icon: "📦", name: "Commodity Distribution", type: "USDA Required" },
        { icon: "🍽️", name: "Menu Item Performance", type: "Operations" },
        { icon: "💳", name: "Cashier Accountability", type: "By Campus" },
      ]
    }
  },
  es: {
    title: "Informes y Análisis",
    subtitle: "AF2025-2026 — Rendimiento a Nivel de Distrito",
    stats: {
      totalMeals: "Total de Comidas Este Año",
      totalMealsVal: "4.4M",
      totalMealsTrend: "↑ 3.8% vs año anterior",
      revenue: "Ingresos Totales (YTD)",
      revenueVal: "$731K",
      revenueTrend: "↑ 5.2%",
      claims: "Reclamos de Reembolso",
      claimsVal: "$2.04M",
      claimsTrend: "↑ 4.1%",
      participation: "Tasa de Participación Prom.",
      participationVal: "88.2%",
      participationTrend: "↑ 1.3%",
    },
    monthlyPerf: {
      title: "Rendimiento Mensual",
      exportBtn: "Exportar CSV ↓",
      colMonth: "Mes",
      colMeals: "Comidas",
      colRev: "Ingresos",
      colClaims: "Reclamos",
      colPart: "Participación",
    },
    topCampuses: {
      title: "🏆 Escuelas de Mayor Rendimiento",
      badge: "Marzo 2026",
      colRank: "#",
      colCampus: "Escuela",
      colPart: "Participación",
      colTrend: "Tendencia",
      colHash: "ID de Hash Forense",
    },
    reports: {
      title: "📥 Generar Informes",
      list: [
        { icon: "📋", name: "Reclamo Mensual de Reembolso", type: "Requerido por TDA" },
        { icon: "📊", name: "Informe de Participación", type: "Por Escuela" },
        { icon: "💰", name: "Ingresos y Gastos", type: "Financiero" },
        { icon: "🛡️", name: "Resumen de Verificación", type: "Requerido por USDA" },
        { icon: "📄", name: "Diario de Caja", type: "Financiero" },
        { icon: "🔍", name: "Verificación de Cuenta", type: "Cumplimiento" },
        { icon: "🔒", name: "Cierre de Fin de Año", type: "Anual" },
        { icon: "🔑", name: "Inicialización de Inicio de Año", type: "Anual" },
        { icon: "👥", name: "Datos de Derechos Civiles", type: "Requerido a Nivel Federal" },
        { icon: "📦", name: "Distribución de Productos", type: "Requerido por USDA" },
        { icon: "🍽️", name: "Rendimiento del Menó", type: "Operaciones" },
        { icon: "💳", name: "Responsabilidad del Cajero", type: "Por Escuela" },
      ]
    }
  }
};

export default function ReportsPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [successReport, setSuccessReport] = useState<string | null>(null);

  const [viewingReport, setViewingReport] = useState<string | null>(null);
  const [isCertified, setIsCertified] = useState(false);
  const [focusHash, setFocusHash] = useState(false);

  // Handle Demo Director Actions
  useEffect(() => {
    const handleDemoAction = (e: any) => {
      if (e.detail?.id === "02" || e.detail?.path === "/reports") {
        setFocusHash(true);
        setTimeout(() => setFocusHash(false), 8000); // 8 second highlight
      }
    };
    window.addEventListener('nutriserve-demo-action', handleDemoAction);
    return () => window.removeEventListener('nutriserve-demo-action', handleDemoAction);
  }, []);

  const handleGenerate = (reportName: string) => {
    if (successReport === reportName) {
      setViewingReport(reportName);
      setIsCertified(false);
      return;
    }

    setGeneratingReport(reportName);
    setSuccessReport(null);
    setTimeout(() => {
      setGeneratingReport(null);
      setSuccessReport(reportName);
    }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header title={t.title} subtitle={t.subtitle} />

        <div className="page-content">
          {/* Summary Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon green">📊</div>
              <div className="stat-info">
                <h3>{t.stats.totalMealsVal}</h3>
                <p>{t.stats.totalMeals}</p>
                <div className="stat-trend up">{t.stats.totalMealsTrend}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">💰</div>
              <div className="stat-info">
                <h3>{t.stats.revenueVal}</h3>
                <p>{t.stats.revenue}</p>
                <div className="stat-trend up">{t.stats.revenueTrend}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber">📋</div>
              <div className="stat-info">
                <h3>{t.stats.claimsVal}</h3>
                <p>{t.stats.claims}</p>
                <div className="stat-trend up">{t.stats.claimsTrend}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">📈</div>
              <div className="stat-info">
                <h3>{t.stats.participationVal}</h3>
                <p>{t.stats.participation}</p>
                <div className="stat-trend up">{t.stats.participationTrend}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: "rgba(168, 85, 247, 0.1)", color: "#a855f7" }}>🛡️</div>
              <div className="stat-info">
                <h3>82.4%</h3>
                <p>{lang === 'es' ? "Porcentaje de Estudiantes Identificados (ISP)" : "Identified Student Percentage (ISP)"}</p>
                <div className="stat-trend up">{lang === 'es' ? "Verificado Mar 2026" : "Verified Mar 2026"}</div>
              </div>
            </div>
          </div>

          <div className="grid-2">
            {/* Monthly Performance */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">{t.monthlyPerf.title}</div>
                <button className="btn btn-ghost btn-sm">{t.monthlyPerf.exportBtn}</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t.monthlyPerf.colMonth}</th>
                    <th>{t.monthlyPerf.colMeals}</th>
                    <th>{t.monthlyPerf.colRev}</th>
                    <th>{t.monthlyPerf.colClaims}</th>
                    <th>{t.monthlyPerf.colPart}</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map(row => (
                    <tr key={row.month}>
                      <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{row.month}</td>
                      <td>{(row.meals / 1000).toFixed(0)}K</td>
                      <td style={{ fontFamily: "var(--font-mono)" }}>${(row.revenue / 1000).toFixed(1)}K</td>
                      <td style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}>${(row.claimAmount / 1000).toFixed(1)}K</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 50, height: 6, background: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{
                              width: `${row.participation}%`, height: "100%",
                              background: "var(--primary-light)", borderRadius: 3,
                            }} />
                          </div>
                          {row.participation}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Campuses */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">{t.topCampuses.title}</div>
                <span className="badge active">{t.topCampuses.badge}</span>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t.topCampuses.colRank}</th>
                    <th>{t.topCampuses.colCampus}</th>
                    <th>{t.topCampuses.colPart}</th>
                    <th>{t.topCampuses.colTrend}</th>
                    <th style={{ fontSize: '0.65rem' }}>{t.topCampuses.colHash}</th>
                  </tr>
                </thead>
                <tbody>
                  {campusRanking.map(campus => (
                    <tr key={campus.rank}>
                      <td>
                        <span style={{
                          width: 24, height: 24, borderRadius: "50%",
                          background: campus.rank <= 3 ? "var(--accent)" : "var(--bg-elevated)",
                          color: campus.rank <= 3 ? "var(--text-inverse)" : "var(--text-secondary)",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.75rem", fontWeight: 700
                        }}>
                          {campus.rank}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{campus.name}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 60, height: 6, background: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{
                              width: `${campus.participation}%`, height: "100%",
                              background: campus.participation > 92 ? "var(--success)" : "var(--primary-light)",
                              borderRadius: 3,
                            }} />
                          </div>
                          {campus.participation}%
                        </div>
                      </td>
                      <td>
                        <span style={{
                          color: campus.trend.startsWith("+") ? "var(--success)" : "var(--danger)",
                          fontWeight: 600, fontSize: "0.8rem"
                        }}>
                          {campus.trend}
                        </span>
                      </td>
                      <td className={focusHash ? "demo-focus-target" : ""} style={{ 
                        fontSize: '0.55rem', 
                        fontFamily: 'var(--font-mono)', 
                        color: focusHash ? 'var(--primary-dark)' : 'var(--text-muted)', 
                        maxWidth: 80, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        transition: 'all 0.3s ease'
                      }}>
                        {btoa(`${campus.name}-FY2026-SALT`).substring(0, 10).toUpperCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card" style={{ marginTop: "var(--space-lg)" }}>
            <div className="card-header">
              <div className="card-title">{t.reports.title}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "var(--space-md)" }}>
              {t.reports.list.map(report => {
                const isGenerating = generatingReport === report.name;
                const isSuccess = successReport === report.name;

                return (
                  <button 
                    key={report.name} 
                    className={`btn btn-ghost ${isGenerating ? 'generating' : ''} ${isSuccess ? 'success' : ''}`}
                    onClick={() => handleGenerate(report.name)}
                    disabled={generatingReport !== null}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "flex-start",
                      padding: "var(--space-md)", height: "auto", textAlign: "left",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      border: isSuccess ? "1px solid var(--success-muted)" : undefined,
                      background: isSuccess ? "rgba(40, 167, 69, 0.05)" : undefined,
                    }}
                  >
                    <span style={{ fontSize: "1.25rem", marginBottom: 4 }}>
                      {isGenerating ? "⏳" : isSuccess ? "✅" : report.icon}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem", color: isSuccess ? "var(--success)" : undefined }}>
                      {isGenerating ? (lang === 'es' ? "Generando..." : "Generating...") : isSuccess ? (lang === 'es' ? "Reporte Listo" : "Report Ready") : report.name}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: isSuccess ? "var(--success)" : "var(--text-muted)" }}>
                      {isGenerating ? (lang === 'es' ? "Procesando datos..." : "Processing data...") : isSuccess ? (lang === 'es' ? "Haz clic para ver la vista previa" : "Click to view preview") : report.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {viewingReport && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "var(--space-lg)", backdropFilter: "blur(4px)"
          }}>
            <div className="card" style={{ width: "100%", maxWidth: 800, maxHeight: "90vh", overflow: "auto", background: "var(--bg-base)" }}>
              <div className="card-header" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-md)", marginBottom: "var(--space-md)" }}>
                <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>📑</span> 
                  {lang === 'es' ? "Vista Previa del Informe" : "Report Preview"}: {viewingReport}
                </div>
                <button className="btn btn-ghost" onClick={() => { setViewingReport(null); setSuccessReport(null); }}>✕</button>
              </div>
              <div style={{ padding: "var(--space-md) 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-xl)", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  <div><strong>{lang === 'es' ? "Fecha Generada:" : "Generated Date:"}</strong> {new Date().toLocaleDateString()}</div>
                  <div><strong>{lang === 'es' ? "Confidencialidad:" : "Confidentiality:"}</strong> TDA / USDA Standard</div>
                </div>
                
                <div style={{ textAlign: "center", padding: "var(--space-xxl) 0", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "var(--space-md)" }}>📊</div>
                  <h3 style={{ color: "var(--text-primary)", marginBottom: "var(--space-sm)" }}>{viewingReport}</h3>
                  <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6, textAlign: "left", background: "var(--bg-input)", padding: "var(--space-md)", borderRadius: 8, fontFamily: "var(--font-mono)", fontSize: "0.85rem", whiteSpace: "pre-wrap", overflowX: "auto" }}>
                    {viewingReport === "Participation Report" || viewingReport === "Informe de Participación" ? `CAMPUS,DATE,MEALS_SERVED,ENROLLMENT,PARTICIPATION_RATE
Transmountain ES,2026-03-01,450,468,96.15%
Roberts ES,2026-03-01,385,402,95.77%
Montwood HS,2026-03-01,1250,1365,91.57%
Bel Air HS,2026-03-01,1102,1204,91.53%
Americas HS,2026-03-01,1540,1680,91.66%` : 
                    viewingReport === "Monthly Reimbursement Claim" || viewingReport === "Reclamo Mensual de Reembolso" ? `CLAIM_MONTH,CLAIM_YEAR,SPONSOR_ID,SITE_ID,MEAL_TYPE,FREE,REDUCED,PAID,TOTAL,CLAIM_AMOUNT
03,2026,EPISD_001,001,BREAKFAST,12000,2000,1000,15000,34500.00
03,2026,EPISD_001,001,LUNCH,25000,3500,2000,30500,132450.00
03,2026,EPISD_001,002,BREAKFAST,8500,1500,500,10500,24150.00` :
                    viewingReport === "Revenue & Expense" || viewingReport === "Ingresos y Gastos" ? `GL_ACCOUNT,DESCRIPTION,PERIOD,DEBIT,CREDIT,NET_BALANCE
4100-00,A La Carte Sales,2026-03,0.00,45250.75,45250.75
4105-00,Adult Meal Sales,2026-03,0.00,12400.50,12400.50
4200-00,Federal Reimbursement,2026-03,0.00,210900.00,210900.00
6100-00,Food Costs,2026-03,115400.20,0.00,-115400.20
6200-00,Labor Costs,2026-03,85600.00,0.00,-85600.00` :
                    `[DATA PREVIEW UNAVAILABLE]
Exporting will download the full TDA/USDA compliant encrypted dataset.`}
                  </p>

                  <div style={{ 
                    marginTop: "var(--space-lg)", 
                    padding: "16px", 
                    background: "rgba(168, 162, 158, 0.05)", 
                    borderRadius: 8, 
                    border: "1px dashed var(--border)",
                    textAlign: "left"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>
                          SHA-256 Forensic Fingerprint
                        </div>
                        <code style={{ fontSize: "0.75rem", color: "var(--accent)", display: "block", marginTop: 4 }}>
                          {btoa(viewingReport || "").toUpperCase()}...{Math.random().toString(36).substring(7).toUpperCase()}
                        </code>
                      </div>
                      <div style={{ textAlign: "right" }}>
                         {isCertified ? (
                            <div style={{ color: "var(--success)", fontWeight: 800, fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontSize: "1.1rem" }}>✅</span> {lang === 'es' ? "CERTIFICADO POR DISTRITO" : "DISTRICT CERTIFIED"}
                            </div>
                         ) : (
                            <button 
                              className="btn btn-accent btn-sm"
                              onClick={() => {
                                setIsCertified(true);
                              }}
                            >
                              ✒️ {lang === 'es' ? "Firmar y Certificar" : "Sign & Certify"}
                            </button>
                         )}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "var(--space-xl)", display: "flex", gap: "var(--space-md)", justifyContent: "center" }}>
                    <button className="btn btn-primary" onClick={() => { setViewingReport(null); setSuccessReport(null); }}>
                      {lang === 'es' ? "Descargar CSV Seguro" : "Download Secure CSV"}
                    </button>
                    <button className="btn btn-ghost" onClick={() => { setViewingReport(null); }}>
                      {lang === 'es' ? "Cerrar" : "Close"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}
