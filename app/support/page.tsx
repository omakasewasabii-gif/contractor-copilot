"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Support() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="Support" subtitle="Help Desk & Resources" />
        <main className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)' }}>
          <div className="card glass" style={{ maxWidth: 600, textAlign: 'center', padding: "var(--space-2xl)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "var(--space-md)" }}>🎧</div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "var(--space-sm)", color: "var(--text-primary)" }}>Support & Rollout</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "var(--space-xl)" }}>
              The 24/7 dedicated support and rollout logistics module is securely verified and currently restricted in the demo environment.
            </p>
            <div className="badge active" data-teleprompter={"Software is only as good as its implementation. For EPISD, we have structured a phased rollout plan that safely migrates legacy data with strict integrity checks before cascading across all 69 campuses.\n\nWe don't just hand you login credentials. We provide on-site and virtual training roadmaps, digital guides, a dedicated Help Desk, and Regional Account Management.\n\nNutriServe isn't just a software patch; it's a complete operating system built for the scale and security of the El Paso Independent School District. Thank you, and I’d like to open the floor to any specific workflows the committee would like to see in action."} style={{ display: 'inline-block', fontSize: "0.85rem", padding: "10px 20px" }}>
              UNLOCKED UPON RFP 26-027 CONTRACT EXECUTION
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
