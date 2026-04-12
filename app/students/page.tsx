"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useLanguage } from "@/components/LanguageContext";

// Mock students data
const allStudents = [
  { id: "1234", name: "Maria Garcia", grade: "10th", campus: "Bel Air HS", eligibility: "free" as const, balance: 0, mealsToday: 1, status: "active" },
  { id: "2345", name: "Carlos Rodriguez", grade: "8th", campus: "Bel Air MS", eligibility: "reduced" as const, balance: 12.50, mealsToday: 1, status: "active" },
  { id: "3456", name: "Sarah Kim", grade: "11th", campus: "Franklin HS", eligibility: "paid" as const, balance: 45.00, mealsToday: 0, status: "active" },
  { id: "4567", name: "James Thompson", grade: "9th", campus: "Coronado HS", eligibility: "paid" as const, balance: 8.25, mealsToday: 1, status: "active" },
  { id: "5678", name: "Ana Lopez", grade: "7th", campus: "Montwood MS", eligibility: "free" as const, balance: 0, mealsToday: 2, status: "active" },
  { id: "6789", name: "David Martinez", grade: "12th", campus: "Americas HS", eligibility: "free" as const, balance: 0, mealsToday: 1, status: "active" },
  { id: "7890", name: "Isabella Flores", grade: "6th", campus: "Transmountain ES", eligibility: "free" as const, balance: 0, mealsToday: 2, status: "active" },
  { id: "8901", name: "Ethan Williams", grade: "10th", campus: "Eastwood HS", eligibility: "paid" as const, balance: 22.75, mealsToday: 1, status: "active" },
  { id: "9012", name: "Sofia Hernandez", grade: "3rd", campus: "Roberts ES", eligibility: "free" as const, balance: 0, mealsToday: 2, status: "active" },
  { id: "0123", name: "Ryan O'Brien", grade: "8th", campus: "Morehead MS", eligibility: "reduced" as const, balance: 5.00, mealsToday: 0, status: "inactive" },
  { id: "1357", name: "Camila Reyes", grade: "11th", campus: "Socorro HS", eligibility: "free" as const, balance: 0, mealsToday: 1, status: "active" },
  { id: "2468", name: "Liam Chen", grade: "9th", campus: "Del Valle HS", eligibility: "paid" as const, balance: 67.50, mealsToday: 1, status: "active" },
];

const eligibilityStats = {
  free: { count: 30741, percent: 64.2 },
  reduced: { count: 8132, percent: 17.0 },
  paid: { count: 8959, percent: 18.8 },
};

export default function StudentsPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "free" | "reduced" | "paid" | "cep" | "a la carte">("all");
  const [studentsList, setStudentsList] = useState(allStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", grade: "9th", campus: "Bel Air HS" });

  const content = {
    en: {
      title: "Student Management",
      subtitle: "48,000+ students across 69 campuses",
      addStudent: "Add New Student",
      fullName: "Full Name",
      grade: "Grade",
      campus: "Campus",
      cancel: "Cancel",
      save: "Save Student",
      totalActive: "Total Active Students",
      universalMeals: "Universal Meals (CEP)",
      searchHost: "🔍 Search by name, ID, or campus...",
      btnAddStudent: "+ Add Student",
      headers: ["Student ID", "Name", "Grade", "Campus", "Meal Program", "Balance (Extras)", "Meals Today", "Status"],
      mealEligible: "MEAL ELIGIBLE",
      showing: "Showing",
      of: "of",
      students: "students",
      page: "Page",
      filters: {
        "all": "all",
        "CEP": "CEP",
        "A la carte": "A la carte"
      }
    },
    es: {
      title: "Gestión de Estudiantes",
      subtitle: "Más de 48,000 estudiantes en 69 campus",
      addStudent: "Agregar Nuevo Estudiante",
      fullName: "Nombre Completo",
      grade: "Grado",
      campus: "Escuela / Campus",
      cancel: "Cancelar",
      save: "Guardar Estudiante",
      totalActive: "Total Estudiantes Activos",
      universalMeals: "Comidas Universales (CEP)",
      searchHost: "🔍 Buscar por nombre, ID o campus...",
      btnAddStudent: "+ Agregar Estudiante",
      headers: ["ID Estudiante", "Nombre", "Grado", "Campus", "Prog. Comidas", "Saldo (Extras)", "Comidas Hoy", "Estado"],
      mealEligible: "CUMPLE P. COMIDAS",
      showing: "Mostrando",
      of: "de",
      students: "estudiantes",
      page: "Página",
      filters: {
        "all": "todos",
        "CEP": "CEP",
        "A la carte": "A la carta"
      }
    }
  };

  const t = content[lang as keyof typeof content];

  const filtered = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.includes(search) || s.campus.toLowerCase().includes(search.toLowerCase());
    
    let matchesFilter = true;
    if (filter === "cep") {
      // Under CEP (Community Eligibility Provision), all students in these campuses are effectively free
      matchesFilter = s.eligibility === "free" || s.eligibility === "reduced";
    } else if (filter === "a la carte") {
      // A la carte users are typically 'paid' status for extra items
      matchesFilter = s.eligibility === "paid";
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleAddStudent = () => {
    if (!newStudent.name) return;
    const id = Math.floor(1000 + Math.random() * 9000).toString();
    setStudentsList([{
      id,
      name: newStudent.name,
      grade: newStudent.grade,
      campus: newStudent.campus,
      eligibility: "free",
      balance: 0,
      mealsToday: 0,
      status: "active"
    }, ...studentsList]);
    setIsModalOpen(false);
    setNewStudent({ name: "", grade: "9th", campus: "Bel Air HS" });
  };

  return (
    <div className="app-layout">
      {/* Add Student Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card animate-fade-in" style={{ width: 400, maxWidth: '90%' }}>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>{t.addStudent}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t.fullName}</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Mateo Ramirez" 
                  value={newStudent.name}
                  onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                  style={{ width: '100%' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t.grade}</label>
                <select 
                  className="input-field" 
                  value={newStudent.grade}
                  onChange={e => setNewStudent({...newStudent, grade: e.target.value})}
                  style={{ width: '100%', backgroundColor: 'var(--bg-card)' }}
                >
                  <option>9th</option>
                  <option>10th</option>
                  <option>11th</option>
                  <option>12th</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t.campus}</label>
                <select 
                  className="input-field" 
                  value={newStudent.campus}
                  onChange={e => setNewStudent({...newStudent, campus: e.target.value})}
                  style={{ width: '100%', backgroundColor: 'var(--bg-card)' }}
                >
                  <option>Bel Air HS</option>
                  <option>Coronado HS</option>
                  <option>Franklin HS</option>
                  <option>Transmountain ES</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
              <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>{t.cancel}</button>
              <button className="btn btn-primary" onClick={handleAddStudent}>{t.save}</button>
            </div>
          </div>
        </div>
      )}

      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />

        <div className="page-content" data-teleprompter={"Finally, let's look at Data Management and Institutional Reporting. For the central office, this is where NutriServe pays for itself.\n\nWe fully automate the Direct Certification and Verification processes. The system actively monitors your Identified Student Percentage (ISP) to optimize your CEP grouping and ensures your monthly reimbursement claims are perfectly reconciled.\n\nEvery piece of data—from cash journals to participation metrics and end-of-year reports—is secured using Role-Based Access Controls and SHA-256 encryption. Your data is backed by enterprise-grade Disaster Recovery protocols."}>
          {/* Eligibility Overview */}
          <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div className="stat-card animate-fade-in">
              <div className="stat-icon green">👨‍🎓</div>
              <div className="stat-info">
                <h3>47,832</h3>
                <p>{t.totalActive}</p>
              </div>
            </div>
            <div className="stat-card animate-fade-in" style={{ animationDelay: "150ms" }}>
              <div className="stat-icon green">🟢</div>
              <div className="stat-info">
                <h3>47,832</h3>
                <p>{t.universalMeals}</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="card" style={{ marginBottom: "var(--space-lg)" }}>
            <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center", flexWrap: "wrap" }}>
              <input
                type="text"
                className="input-field"
                placeholder={t.searchHost}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, minWidth: 250 }}
              />
              <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                {["all", "CEP", "A la carte"].map(f => (
                  <button key={f} onClick={() => setFilter(f.toLowerCase() as any)}
                    className={`btn ${filter === f.toLowerCase() ? "btn-primary" : "btn-ghost"} btn-sm`}>
                    {t.filters[f as keyof typeof t.filters] || f}
                  </button>
                ))}
              </div>
              <button className="btn btn-accent btn-sm" onClick={() => setIsModalOpen(true)}>{t.btnAddStudent}</button>
            </div>
          </div>

          {/* Students Table */}
          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  {t.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map(student => (
                  <tr key={student.id}>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--primary-light)" }}>{student.id}</td>
                    <td style={{ color: "var(--text-primary)", fontWeight: 600 }}>{student.name}</td>
                    <td>{student.grade}</td>
                    <td>{student.campus}</td>
                    <td><span className="badge active" style={{ background: "var(--success)" }}>{t.mealEligible}</span></td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>
                      {student.eligibility === "free" ? "CEP" : `$${student.balance.toFixed(2)}`}
                    </td>
                    <td>
                      <span style={{
                        color: student.mealsToday > 0 ? "var(--success)" : "var(--text-muted)"
                      }}>
                        {student.mealsToday > 0 ? `✅ ${student.mealsToday}` : "—"}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${student.status === "active" ? "active" : "pending"}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{
              padding: "var(--space-md)", textAlign: "center",
              fontSize: "0.8rem", color: "var(--text-muted)"
            }}>
              {t.showing} {filtered.length} {t.of} 47,832 {t.students} • {t.page} 1 {t.of} 3,986
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
