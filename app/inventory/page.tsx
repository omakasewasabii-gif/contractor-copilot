"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useToast } from "@/components/Toast";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    title: "Inventory Management",
    subtitle: "District-wide stock levels & ordering",
    perpetualTitle: "PERPETUAL TRACKING ACTIVE",
    districtReserve: "District Reserve Levels",
    demoMessage: "Available upon deployment — demo preview only",
    stats: {
      itemsTracked: "Total Items Tracked",
      lowStock: "Low Stock Alerts",
      needsReorder: "Needs reorder",
      critical: "Critical — Order Now",
      belowMin: "Below minimum",
      waste: "Waste This Week",
      underTarget: "↑ Under target"
    },
    inventoryTable: {
      title: "📋 Stock Levels",
      newOrder: "+ New Order",
      export: "Export ↓",
      cols: ["Item", "Category", "Qty On Hand", "Reorder Point", "Status", "Supplier", "Delivery Scheduled"],
      statusCritical: "🔴 CRITICAL",
      statusLow: "⚠️ LOW",
      statusOk: "✅ OK"
    },
    wasteTable: {
      title: "🗑️ Waste Tracking — This Week",
      subtitle: "FIFO monitoring active",
      cols: ["Date", "Campus", "Item", "Quantity", "Reason", "Cost"]
    },
    inventoryItems: [
      { id: "INV-001", name: "Chicken Tenders (50ct)", category: "Protein", qty: 245, unit: "cases", reorderAt: 100, status: "good", supplier: "Labatt", lastOrder: "03/18/2026" },
      { id: "INV-002", name: "Pizza Dough Rounds", category: "Grain", qty: 180, unit: "cases", reorderAt: 80, status: "good", supplier: "Labatt", lastOrder: "03/15/2026" },
      { id: "INV-003", name: "Shredded Mozzarella", category: "Dairy", qty: 42, unit: "cases", reorderAt: 50, status: "low", supplier: "Gh Dairy", lastOrder: "03/20/2026" },
      { id: "INV-004", name: "Ground Beef (80/20)", category: "Protein", qty: 156, unit: "cases", reorderAt: 60, status: "good", supplier: "Labatt", lastOrder: "03/17/2026" },
      { id: "INV-005", name: "Flour Tortillas (12\")", category: "Grain", qty: 320, unit: "packs", reorderAt: 100, status: "good", supplier: "Flowers Baking", lastOrder: "03/19/2026" },
      { id: "INV-006", name: "Fresh Apples", category: "Fruit", qty: 18, unit: "cases", reorderAt: 40, status: "critical", supplier: "Segovias", lastOrder: "03/22/2026" },
      { id: "INV-007", name: "Milk 1% (8oz)", category: "Dairy", qty: 890, unit: "cartons", reorderAt: 300, status: "good", supplier: "Gh Dairy", lastOrder: "03/21/2026" },
      { id: "INV-008", name: "Hamburger Buns (WGR)", category: "Grain", qty: 65, unit: "cases", reorderAt: 80, status: "low", supplier: "Flowers Baking", lastOrder: "03/18/2026" },
      { id: "INV-009", name: "Spaghetti Noodles (WGR)", category: "Grain", qty: 210, unit: "cases", reorderAt: 50, status: "good", supplier: "Labatt", lastOrder: "03/14/2026" },
      { id: "INV-010", name: "USDA Commodity Chicken", category: "USDA Commodity", qty: 380, unit: "lbs", reorderAt: 100, status: "good", supplier: "USDA/TDA", lastOrder: "03/01/2026" },
    ],
    wasteLog: [
      { date: "03/23", campus: "Bel Air HS", item: "Salad Mix", qty: "12 lbs", reason: "Expired", cost: "$18.00" },
      { date: "03/22", campus: "Franklin HS", item: "Milk Cartons", qty: "24 units", reason: "Damaged", cost: "$14.40" },
      { date: "03/22", campus: "Coronado HS", item: "Fruit Cups", qty: "8 units", reason: "Overproduction", cost: "$10.00" },
      { date: "03/21", campus: "Americas HS", item: "Bread Rolls", qty: "30 units", reason: "Expired", cost: "$9.00" },
    ],
    auditLog: {
      title: "🛡️ Manual Adjustment Audit Log",
      subtitle: "System-wide override tracking — Forensic Integrity Enabled",
      cols: ["Timestamp", "Officer", "Item", "Action", "Correction", "Digital Signature"],
      items: [
        { time: "2026-03-24 08:12", officer: "T. Gomez (ID: 8821)", item: "Milk 1%", action: "Manual Correction", change: "-12 units (Spillage)", hash: "SHA-256: 8a4f...9c2d" },
        { time: "2026-03-23 14:45", officer: "R. Herrera (ID: 4109)", item: "Chicken Tenders", action: "Inventory Recon", change: "+5 cases (Shortship Fix)", hash: "SHA-256: 3b1e...f7e1" },
        { time: "2026-03-22 10:30", officer: "M. Perez (ID: 9912)", item: "Fresh Apples", action: "Spoilage Log", change: "-2 cases (Quality Fail)", hash: "SHA-256: 2d8a...11ab" }
      ]
    }
  },
  es: {
    title: "Gestión de Inventario",
    subtitle: "Niveles de stock y pedidos de todo el distrito",
    perpetualTitle: "SEGUIMIENTO PERPETUO ACTIVO",
    districtReserve: "Niveles de Reserva del Distrito",
    demoMessage: "Disponible en despliegue — solo vista previa",
    stats: {
      itemsTracked: "Artículos Rastreados",
      lowStock: "Alertas de Stock Bajo",
      needsReorder: "Necesita pedido",
      critical: "Crítico — Pedir Ahora",
      belowMin: "Por debajo del mínimo",
      waste: "Desperdicio esta semana",
      underTarget: "↑ Por debajo de la meta"
    },
    inventoryTable: {
      title: "📋 Niveles de Inventario",
      newOrder: "+ Nuevo Pedido",
      export: "Exportar ↓",
      cols: ["Articulo", "Categoría", "Cant. Disponible", "Punto Pedido", "Estado", "Proveedor", "Entrega Programada"],
      statusCritical: "🔴 CRÍTICO",
      statusLow: "⚠️ BAJO",
      statusOk: "✅ BIEN"
    },
    wasteTable: {
      title: "🗑️ Seguimiento de Desperdicio — Esta Semana",
      subtitle: "Monitoreo FIFO activo",
      cols: ["Fecha", "Escuela", "Articulo", "Cantidad", "Razón", "Costo"]
    },
    inventoryItems: [
      { id: "INV-001", name: "Tiras de Pollo (50ct)", category: "Proteína", qty: 245, unit: "cajas", reorderAt: 100, status: "good", supplier: "Labatt", lastOrder: "18/03/2026" },
      { id: "INV-002", name: "Masa para Pizza", category: "Grano", qty: 180, unit: "cajas", reorderAt: 80, status: "good", supplier: "Labatt", lastOrder: "15/03/2026" },
      { id: "INV-003", name: "Queso Rallado", category: "Lácteo", qty: 42, unit: "cajas", reorderAt: 50, status: "low", supplier: "Gh Dairy", lastOrder: "20/03/2026" },
      { id: "INV-004", name: "Carne Molida (80/20)", category: "Proteína", qty: 156, unit: "cajas", reorderAt: 60, status: "good", supplier: "Labatt", lastOrder: "17/03/2026" },
      { id: "INV-005", name: "Tortillas Harina (12\")", category: "Grano", qty: 320, unit: "paq.", reorderAt: 100, status: "good", supplier: "Flowers Baking", lastOrder: "19/03/2026" },
      { id: "INV-006", name: "Manzanas Frescas", category: "Fruta", qty: 18, unit: "cajas", reorderAt: 40, status: "critical", supplier: "Segovias", lastOrder: "22/03/2026" },
      { id: "INV-007", name: "Leche 1% (8oz)", category: "Lácteo", qty: 890, unit: "cartones", reorderAt: 300, status: "good", supplier: "Gh Dairy", lastOrder: "21/03/2026" },
      { id: "INV-008", name: "Pan de Hamburguesa (WGR)", category: "Grano", qty: 65, unit: "cajas", reorderAt: 80, status: "low", supplier: "Flowers Baking", lastOrder: "18/03/2026" },
      { id: "INV-009", name: "Espagueti (WGR)", category: "Grano", qty: 210, unit: "cajas", reorderAt: 50, status: "good", supplier: "Labatt", lastOrder: "14/03/2026" },
      { id: "INV-010", name: "Pollo Comodidad USDA", category: "Comodidad USDA", qty: 380, unit: "lbs", reorderAt: 100, status: "good", supplier: "USDA/TDA", lastOrder: "01/03/2026" },
    ],
    wasteLog: [
      { date: "23/03", campus: "Bel Air HS", item: "Mezcla Ensalada", qty: "12 lbs", reason: "Caducado", cost: "$18.00" },
      { date: "22/03", campus: "Franklin HS", item: "Cartón Leche", qty: "24 uni.", reason: "Dañado", cost: "$14.40" },
      { date: "22/03", campus: "Coronado HS", item: "Vasos Fruta", qty: "8 uni.", reason: "Sobreproducción", cost: "$10.00" },
      { date: "21/03", campus: "Americas HS", item: "Rollos Pan", qty: "30 uni.", reason: "Caducado", cost: "$9.00" },
    ],
    auditLog: {
      title: "🛡️ Registro de Auditoría de Ajustes",
      subtitle: "Seguimiento de correcciones manuales — Integridad Forense Activada",
      cols: ["Marca de Tiempo", "Oficial", "Artículo", "Acción", "Corrección", "Firma Digital"],
      items: [
        { time: "2026-03-24 08:12", officer: "T. Gomez (ID: 8821)", item: "Leche 1%", action: "Corrección Manual", change: "-12 unidades (Derrame)", hash: "SHA-256: 8a4f...9c2d" },
        { time: "2026-03-23 14:45", officer: "R. Herrera (ID: 4109)", item: "Pollos", action: "Recon. Inv.", change: "+5 cajas (Error Envío)", hash: "SHA-256: 3b1e...f7e1" },
        { time: "2026-03-22 10:30", officer: "M. Perez (ID: 9912)", item: "Manzanas", action: "Reg. Desperdicio", change: "-2 cajas (Calidad)", hash: "SHA-256: 2d8a...11ab" }
      ]
    }
  }
};

export default function InventoryPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const { showToast } = useToast();
  
  const demoClick = () => showToast(t.demoMessage);
  
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />

        <div className="page-content">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-lg)" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--success)", background: "var(--success-bg)", padding: "4px 12px", borderRadius: "20px", border: "1px solid var(--success)" }}>
              🔒 {t.perpetualTitle}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              {t.districtReserve}: <strong style={{ color: "var(--accent)" }}>92.4%</strong>
            </div>
          </div>
          {/* Alert Cards */}
          <div className="stats-grid">
            <div className="stat-card gold-glow" style={{ border: "1px solid var(--accent)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.2rem", color: "var(--accent)" }}>📡 SIS Data Bridge</h3>
                <div className="pulse-dot"></div>
              </div>
              <p style={{ marginTop: "12px", fontSize: "0.85rem", fontWeight: 700 }}>EPISD Frontline Central</p>
              <div style={{ 
                marginTop: "16px", 
                padding: "10px", 
                background: "rgba(0,0,0,0.4)", 
                borderRadius: "8px",
                fontSize: "0.65rem",
                fontFamily: "var(--font-mono)",
                color: "var(--success)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>SYNC STATUS:</span>
                  <span>ENCRYPTED</span>
                </div>
                <div style={{ marginTop: "4px" }}>LAST: 2026-04-11 15:22:04</div>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.2rem" }}>🛡️ Forensic Logs</h3>
                <span className="badge gold">SHA-256</span>
              </div>
              <p style={{ marginTop: "12px", fontSize: "0.85rem" }}>Blockchain Verification Active</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                 <div className="badge">PCI-DSS</div>
                 <div className="badge">GLBA</div>
              </div>
            </div>
            <div className="stat-card" style={{ borderColor: "rgba(245,158,11,0.3)" }}>
              <div className="stat-icon amber">⚠️</div>
              <div className="stat-info">
                <h3>2</h3>
                <p>{t.stats.lowStock}</p>
                <div className="stat-trend down">{t.stats.needsReorder}</div>
              </div>
            </div>
            <div className="stat-card" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
              <div className="stat-icon red">🔴</div>
              <div className="stat-info">
                <h3>1</h3>
                <p>{t.stats.critical}</p>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div className="badge gold">RFP 26-027 COMPLIANT</div>
                    <div className="badge success">CACFP SITE</div>
                  </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">🔄</div>
              <div className="stat-info">
                <h3>$51.40</h3>
                <p>{t.stats.waste}</p>
                <div className="stat-trend up">{t.stats.underTarget}</div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          {/* 📈 PREDICTIVE PRODUCTION ANALYTICS (BONUS HARDENING) */}
          <div className="glass-panel" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-xl)", border: "2px solid rgba(251, 222, 5, 0.2)" }} data-demo-tooltip="RFP 26-027 Sect 3: Inventory Management. Automated purchase orders based on AI yield forecasting.">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <div>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent)" }}>📈 Predictive Production Forecasting</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lang === 'es' ? "Predicción basada en historial de 10 días (ADP)" : "Forecasting based on 10-day ADP history"}</p>
              </div>
              <div className="badge gold" style={{ padding: "8px 16px" }}>Selection-Ready Alpha</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px" }}>
              <div style={{ padding: "24px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                 <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "8px" }}>TREND ANALYSIS</p>
                 <h4 style={{ fontSize: "1.2rem", color: "var(--success)" }}>Taco Tuesday Spike (+14.2%)</h4>
                 <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>Participation rises consistently at Coronado HS & Franklin HS.</p>
              </div>
              <div style={{ padding: "24px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                 <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "8px" }}>RECOMMENDED PRODUCTION</p>
                 <h4 style={{ fontSize: "1.6rem", fontWeight: 800 }}>8,450 Servings</h4>
                 <p style={{ fontSize: "0.7rem", color: "var(--accent)" }}>Adjusted for Tuesday pattern.</p>
              </div>
              <div style={{ background: "rgba(251, 222, 5, 0.05)", padding: "24px", borderRadius: "12px", border: "1px dashed var(--accent)" }}>
                 <p style={{ fontSize: "0.7rem", fontWeight: 700, marginBottom: "8px" }}>SYSTEM ACTION</p>
                 <p style={{ fontSize: "0.9rem" }}>Automated vendor pre-order generated for <b>22 cases</b> of Tortillas.</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: "var(--space-lg)" }}>
            <div className="card-header">
              <div className="card-title">{t.inventoryTable.title}</div>
              <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                <button className="btn btn-accent btn-sm" onClick={demoClick}>{t.inventoryTable.newOrder}</button>
                <button className="btn btn-ghost btn-sm" onClick={demoClick}>{t.inventoryTable.export}</button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  {t.inventoryTable.cols.map(c => <th key={c}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {t.inventoryItems.map((item, i) => (
                  <tr key={item.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>#EP-{202600 + i}</td>
                    <td style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.name}</td>
                    <td>
                      <span style={{
                        padding: "2px 8px", borderRadius: 8, fontSize: "0.7rem",
                        background: item.category === "USDA Commodity" || item.category === "Comodidad USDA" ? "var(--info-bg)" : "var(--bg-elevated)",
                        color: item.category === "USDA Commodity" || item.category === "Comodidad USDA" ? "var(--info)" : "var(--text-secondary)",
                        fontWeight: 600
                      }}>{item.category}</span>
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>{item.qty} {item.unit}</td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{item.reorderAt}</td>
                    <td>
                      <span className={`badge ${item.status === "good" ? "active" : item.status === "low" ? "reduced" : "free"}`}
                        style={item.status === "critical" ? { background: "var(--danger-bg)", color: "var(--danger)", border: "1px solid rgba(239,68,68,0.3)" } : {}}>
                        {item.status === "critical" ? t.inventoryTable.statusCritical : item.status === "low" ? t.inventoryTable.statusLow : t.inventoryTable.statusOk}
                      </span>
                    </td>
                    <td>{item.supplier}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 600 }}>🚚 {item.lastOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Audit Log Section */}
          <div className="card" style={{ marginTop: "var(--space-lg)", background: "linear-gradient(180deg, var(--bg-card) 0%, rgba(12, 29, 63, 0.4) 100%)", border: "1px solid var(--border)" }} data-demo-tooltip="RFP 26-027 Sect 3: Audit Integrity. Non-repudiable SHA-256 logs for inventory adjustments.">
            <div className="card-header">
              <div>
                <div className="card-title" style={{ color: "var(--accent)" }}>{t.auditLog.title}</div>
                <div className="card-subtitle">{t.auditLog.subtitle}</div>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  {t.auditLog.cols.map(c => <th key={c}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {t.auditLog.items.map((entry, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>{entry.time}</td>
                    <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>{entry.officer}</td>
                    <td>{entry.item}</td>
                    <td><span className="badge active" style={{ background: "rgba(168, 162, 158, 0.1)", color: "var(--text-secondary)" }}>{entry.action}</span></td>
                    <td style={{ fontWeight: 600, color: entry.change.includes("-") ? "var(--danger)" : "var(--success)" }}>{entry.change}</td>
                    <td>
                      <code style={{ fontSize: "0.65rem", padding: "2px 6px", background: "var(--bg-input)", borderRadius: 4, color: "var(--accent)" }}>
                        {entry.hash}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
