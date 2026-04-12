"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

export default function PaymentsPage() {
  const { lang } = useLanguage();
  
  // High-fidelity fake data for the demo
  const [transactions] = useState([
    { id: "TXN-88219A", student: "Mateo Ramirez", idNumber: "EP-99210", amount: 25.00, method: "Apple Pay", date: "2026-04-12 08:14 AM", status: "cleared" },
    { id: "TXN-88218B", student: "Isabella Chen", idNumber: "EP-44122", amount: 50.00, method: "Visa •••• 4242", date: "2026-04-12 07:45 AM", status: "cleared" },
    { id: "TXN-88217C", student: "Marcus Johnson", idNumber: "EP-33911", amount: 15.00, method: "Debit", date: "2026-04-11 09:22 PM", status: "cleared" },
    { id: "TXN-88216D", student: "Sofia Garcia", idNumber: "EP-77821", amount: 100.00, method: "Auto-Reload (ACH)", date: "2026-04-11 06:00 PM", status: "cleared" },
    { id: "TXN-88215E", student: "Elijah Smith", idNumber: "EP-11204", amount: 20.00, method: "Mastercard •••• 5511", date: "2026-04-11 05:30 PM", status: "processing" },
  ]);

  return (
    <div className="page-container" style={{ padding: "var(--space-xl)", maxWidth: "1400px", margin: "0 auto", animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      {/* Header section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-xl)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-1px" }}>
              {lang === "en" ? "Payment Ledger" : "Libro de Pagos"}
            </h1>
            <div data-demo-tooltip="RFP 26-027 Sect 4: Payment Gateway Parity & PCI Compliance" style={{
              background: "rgba(251, 222, 5, 0.15)", border: "1px solid var(--accent)", color: "var(--accent)",
              padding: "4px 8px", borderRadius: "6px", fontSize: "0.65rem", fontWeight: 800, cursor: "help"
            }}>💳 PCI-DSS COMPLIANT</div>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", lineHeight: 1.5 }}>
            {lang === "en" 
              ? "Real-time reconciliation of parent web portal deposits, auto-reloads, and point-of-sale terminal transactions."
              : "Conciliación en tiempo real de depósitos del portal web para padres, recargas automáticas y transacciones de terminales POS."}
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-secondary" style={{ 
            background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", padding: "10px 20px", 
            borderRadius: "12px", color: "var(--text-primary)", fontWeight: 600, cursor: "not-allowed", opacity: 0.7 
          }}>
            {lang === "en" ? "Export Reconciled CSV" : "Exportar CSV Conciliado"}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ 
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "var(--space-xl)" 
      }}>
        <div className="stat-card" style={{ 
          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
        }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
            {lang === "en" ? "Today's Portal Deposits" : "Depósitos del Portal Hoy"}
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text-primary)" }}>$4,250.00</div>
          <div style={{ fontSize: "0.8rem", color: "#4ade80", fontWeight: 600, marginTop: "8px" }}>↑ +15% vs Yesterday</div>
        </div>

        <div className="stat-card" style={{ 
          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
        }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
            {lang === "en" ? "Active Auto-Reloads" : "Recargas Automáticas Activas"}
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text-primary)" }}>1,402</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600, marginTop: "8px" }}>Accounts utilizing Smart-Trigger</div>
        </div>

        <div className="stat-card" style={{ 
          background: "var(--surface)", border: "1px solid var(--accent-transparent)", borderRadius: "16px", padding: "24px",
          boxShadow: "0 8px 24px rgba(251, 222, 5, 0.05)"
        }}>
          <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
            {lang === "en" ? "Processing Fee Liability" : "Responsabilidad de Tarifa de Procesamiento"}
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text-primary)" }}>$0.00</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600, marginTop: "8px" }}>Pass-through model enabled</div>
        </div>
      </div>

      {/* Transaction Ledger */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px", color: "var(--text-primary)" }}>
        {lang === "en" ? "Recent Parent Wallet Funding" : "Fondos Recientes de la Billetera para Padres"}
      </h2>
      <div style={{ 
        background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "16px 24px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Transaction ID</th>
              <th style={{ padding: "16px 24px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Student</th>
              <th style={{ padding: "16px 24px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Method</th>
              <th style={{ padding: "16px 24px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Date / Time</th>
              <th style={{ padding: "16px 24px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Amount</th>
              <th style={{ padding: "16px 24px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, idx) => (
              <tr key={idx} style={{ borderBottom: idx === transactions.length - 1 ? "none" : "1px solid var(--border)", transition: "background 0.2s", cursor: "default" }}>
                <td style={{ padding: "16px 24px", fontSize: "0.9rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>{txn.id}</td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>{txn.student}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>{txn.idNumber}</div>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  <span style={{ 
                    display: "inline-block", padding: "4px 8px", background: "rgba(255,255,255,0.05)", 
                    borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600 
                  }}>
                    {txn.method}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{txn.date}</td>
                <td style={{ padding: "16px 24px", fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  ${txn.amount.toFixed(2)}
                </td>
                <td style={{ padding: "16px 24px" }}>
                  {txn.status === "cleared" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#4ade80", fontSize: "0.8rem", fontWeight: 700 }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74, 222, 128, 0.4)" }}></span>
                      Cleared
                    </span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700 }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px rgba(251, 222, 5, 0.4)", animation: "pulse 2s infinite" }}></span>
                      Processing
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
