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
        <main className="page-content">
          <div className="card glass" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-lg)" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--space-md)" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: "1.5rem" }}>👤</span>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>Role-Based Access Control (RBAC)</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => console.log('Importing AD/SSO...')}>Active Directory Sync</button>
                <button className="btn btn-accent btn-sm" onClick={() => console.log('Adding User...')}>+ Provision User</button>
              </div>
            </div>
            
            <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '12px' }}>PERSONNEL</th>
                  <th style={{ padding: '12px' }}>ACCESS ROLE</th>
                  <th style={{ padding: '12px' }}>ASSIGNMENT</th>
                  <th style={{ padding: '12px' }}>2FA STATUS</th>
                  <th style={{ padding: '12px' }}>SESSION</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Sarah Jenkins", email: "sjenkins@episd.org", role: "District Dietitian", campus: "All Campuses", 2fa: "Secured", session: "Active" },
                  { name: "Michael Vance", email: "mvance@episd.org", role: "Nutrition Director", campus: "All Campuses", 2fa: "Secured", session: "Inactive" },
                  { name: "Elena Rodriguez", email: "erodriguez@episd.org", role: "Area Supervisor", campus: "West Zone (14)", 2fa: "Secured", session: "Active" },
                  { name: "Robert Chen", email: "rchen@episd.org", role: "System Admin", campus: "Central Office", 2fa: "Secured", session: "Active" },
                  { name: "Maria Garza", email: "mgarza@episd.org", role: "Cafeteria Manager", campus: "Coronado HS", 2fa: "Secured", session: "Inactive" },
                  { name: "David Loya", email: "dloya@episd.org", role: "POS Cashier", campus: "Franklin HS", 2fa: "Pending", session: "Inactive" },
                  { name: "Jessica Smith", email: "jsmith@episd.org", role: "POS Cashier", campus: "El Paso HS", 2fa: "Secured", session: "Active" },
                  { name: "Carlos Soto", email: "csoto@episd.org", role: "Area Supervisor", campus: "Northeast Zone (12)", 2fa: "Secured", session: "Active" },
                ].map((user, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700,
                        background: user.role.includes('Director') || user.role.includes('Admin') ? 'rgba(235, 59, 90, 0.1)' : 
                                    user.role.includes('Dietitian') || user.role.includes('Supervisor') ? 'rgba(45, 152, 218, 0.1)' :
                                    'rgba(165, 177, 194, 0.1)',
                        color: user.role.includes('Director') || user.role.includes('Admin') ? '#eb3b5a' : 
                               user.role.includes('Dietitian') || user.role.includes('Supervisor') ? '#2d98da' :
                               '#a5b1c2'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{user.campus}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: user['2fa'] === 'Secured' ? '#2ed573' : '#ffa502' }}>
                        {user['2fa'] === 'Secured' ? '🔒 Secured' : '⚠️ Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: user.session === 'Active' ? '#2ed573' : 'var(--text-muted)' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: user.session === 'Active' ? '#2ed573' : 'var(--bg-elevated)', boxShadow: user.session === 'Active' ? '0 0 8px #2ed573' : 'none' }} />
                        {user.session}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => console.log(`Managing Access: ${user.name}`)}>Audit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
