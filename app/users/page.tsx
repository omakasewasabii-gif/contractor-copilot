"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Users() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="Users" subtitle="Access Management" />
        <main className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)' }}>
          <div className="card glass" style={{ maxWidth: 600, textAlign: 'center', padding: "var(--space-2xl)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "var(--space-md)" }}>👤</div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "var(--space-sm)", color: "var(--text-primary)" }}>User Directory</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "var(--space-xl)" }}>
              The full institutional directory module and role-based access control engine is restricted to active deployments.
            </p>
            <div className="badge active" style={{ display: 'inline-block', fontSize: "0.85rem", padding: "10px 20px" }}>
              UNLOCKED UPON RFP 26-027 CONTRACT EXECUTION
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
