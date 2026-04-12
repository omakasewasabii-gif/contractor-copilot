"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Campuses() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title="Campuses" subtitle="District Network" />
        <main className="page-content">
          <div className="card glass" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-lg)" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--space-md)" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: "1.5rem" }}>🏫</span>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>EPISD Network Matrix</h2>
              </div>
              <div className="badge active">69 / 69 Online</div>
            </div>
            
            <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '12px' }}>CAMPUS NAME</th>
                  <th style={{ padding: '12px' }}>ZONE / FEEDER</th>
                  <th style={{ padding: '12px' }}>CEP STATUS</th>
                  <th style={{ padding: '12px' }}>POS TERMINALS</th>
                  <th style={{ padding: '12px' }}>NETWORK</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Coronado High School", zone: "West", cep: "Non-CEP", pos: 6, network: "Healthy" },
                  { name: "Franklin High School", zone: "West", cep: "Non-CEP", pos: 6, network: "Healthy" },
                  { name: "El Paso High School", zone: "Central", cep: "CEP", pos: 4, network: "Healthy" },
                  { name: "Chapin High School", zone: "Northeast", cep: "CEP", pos: 5, network: "Healthy" },
                  { name: "Bowie High School", zone: "South", cep: "CEP", pos: 4, network: "Healthy" },
                  { name: "Andress High School", zone: "Northeast", cep: "CEP", pos: 5, network: "Healthy" },
                  { name: "Burges High School", zone: "Central", cep: "CEP", pos: 4, network: "Healthy" },
                  { name: "Silva Health Magnet", zone: "Central", cep: "CEP", pos: 2, network: "Healthy" },
                  { name: "Hornedo Middle School", zone: "West", cep: "Non-CEP", pos: 4, network: "Healthy" },
                  { name: "Mesita Elementary", zone: "West", cep: "Non-CEP", pos: 2, network: "Healthy" },
                ].map((campus, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{campus.name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{campus.zone}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700,
                        background: campus.cep === 'CEP' ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 165, 2, 0.1)',
                        color: campus.cep === 'CEP' ? '#2ed573' : '#ffa502'
                      }}>
                        {campus.cep}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{campus.pos} Active</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#2ed573' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ed573', boxShadow: '0 0 8px #2ed573' }} />
                        {campus.network}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => console.log(`Managing ${campus.name}`)}>Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: "var(--space-md)" }}>
             <button className="btn btn-primary" onClick={() => console.log('View remaining campuses')}>View All 69 Campuses</button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
