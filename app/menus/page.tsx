"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    title: "Menu Planning",
    subtitle: "Cycle Menu — Week of March 24, 2026",
    cycleTitle: "Cycle Management",
    cycles: ["Week 1", "Week 2", "Week 3", "Week 4"],
    complianceTitle: "USDA Meal Pattern Compliance",
    complianceDesc: "All menus meet current federal nutrition standards",
    options: "3 options",
    protein: "protein",
    nutritionTargets: [
      { nutrient: "Calories", target: "550-650", unit: "kcal", status: "met" },
      { nutrient: "Sodium", target: "< 1230mg", unit: "mg", status: "met" },
      { nutrient: "Saturated Fat", target: "< 10%", unit: "% cal", status: "met" },
      { nutrient: "Trans Fat", target: "0g", unit: "g", status: "met" },
      { nutrient: "Whole Grains", target: "≥ 80%", unit: "%", status: "met" },
      { nutrient: "Fruits & Vegs", target: "≥ ¾ cup", unit: "cups", status: "warning" },
    ],
    weeklyMenu: [
      {
        day: "Monday",
        meals: [
          { name: "Chicken Tenders", emoji: "🍗", calories: 580, protein: "28g", grain: "WGR", allergens: [] },
          { name: "Cheese Pizza", emoji: "🍕", calories: 520, protein: "22g", grain: "WGR", allergens: ["Dairy", "Gluten"] },
          { name: "Garden Salad", emoji: "🥗", calories: 380, protein: "15g", grain: "WGR", allergens: [] },
        ]
      },
      {
        day: "Tuesday",
        meals: [
          { name: "Beef Tacos", emoji: "🌮", calories: 490, protein: "25g", grain: "WGR", allergens: [] },
          { name: "Mac & Cheese", emoji: "🧀", calories: 450, protein: "18g", grain: "WGR", allergens: ["Dairy", "Gluten"] },
          { name: "Veggie Wrap", emoji: "🌯", calories: 360, protein: "12g", grain: "WGR", allergens: ["Gluten"] },
        ]
      },
      {
        day: "Wednesday",
        meals: [
          { name: "Burger", emoji: "🍔", calories: 620, protein: "30g", grain: "WGR", allergens: ["Gluten"] },
          { name: "Spaghetti", emoji: "🍝", calories: 540, protein: "20g", grain: "WGR", allergens: ["Gluten"] },
          { name: "Asian Bowl", emoji: "🍜", calories: 420, protein: "22g", grain: "WGR", allergens: ["Soy"] },
        ]
      },
      {
        day: "Thursday",
        meals: [
          { name: "BBQ Chicken", emoji: "🍗", calories: 560, protein: "32g", grain: "WGR", allergens: [] },
          { name: "Pepperoni Pizza", emoji: "🍕", calories: 550, protein: "24g", grain: "WGR", allergens: ["Dairy", "Gluten"] },
          { name: "Bean Burrito", emoji: "🌯", calories: 480, protein: "18g", grain: "WGR", allergens: ["Gluten"] },
        ]
      },
      {
        day: "Friday",
        meals: [
          { name: "Fish Sticks", emoji: "🐟", calories: 440, protein: "22g", grain: "WGR", allergens: ["Gluten"] },
          { name: "Cheese Quesadilla", emoji: "🧀", calories: 470, protein: "20g", grain: "WGR", allergens: ["Dairy", "Gluten"] },
          { name: "Chef Salad", emoji: "🥗", calories: 400, protein: "26g", grain: "WGR", allergens: ["Dairy"] },
        ]
      },
    ],
    tabs: {
      planning: "Menu Planning",
      recipes: "Recipe Developer",
      cycles: "Cycle Manager"
    },
    recipeStats: [
      { label: "Standardized Recipes", val: "142" },
      { label: "Nutrient Analyzed", val: "100%" },
      { label: "Costed Recipes", val: "94%" },
    ]
  },
  es: {
    title: "Planeación de Menú",
    subtitle: "Menú Ciclo — Semana del 24 de Marzo de 2026",
    cycleTitle: "Gestión de Ciclos",
    cycles: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    complianceTitle: "Cumplimiento del Patrón de Comidas USDA",
    complianceDesc: "Todos los menús cumplen los estándares federales de nutrición",
    options: "3 opciones",
    protein: "proteína",
    nutritionTargets: [
      { nutrient: "Calorías", target: "550-650", unit: "kcal", status: "met" },
      { nutrient: "Sodio", target: "< 1230mg", unit: "mg", status: "met" },
      { nutrient: "Grasa Saturada", target: "< 10%", unit: "% cal", status: "met" },
      { nutrient: "Grasa Trans", target: "0g", unit: "g", status: "met" },
      { nutrient: "Granos Integrales", target: "≥ 80%", unit: "%", status: "met" },
      { nutrient: "Frutas y Verduras", target: "≥ ¾ taza", unit: "tazas", status: "warning" },
    ],
    weeklyMenu: [
      {
        day: "Lunes",
        meals: [
          { name: "Tiras de Pollo", emoji: "🍗", calories: 580, protein: "28g", grain: "WGR", allergens: [] },
          { name: "Pizza de Queso", emoji: "🍕", calories: 520, protein: "22g", grain: "WGR", allergens: ["Lácteos", "Gluten"] },
          { name: "Ensalada del Huerto", emoji: "🥗", calories: 380, protein: "15g", grain: "WGR", allergens: [] },
        ]
      },
      {
        day: "Martes",
        meals: [
          { name: "Tacos de Res", emoji: "🌮", calories: 490, protein: "25g", grain: "WGR", allergens: [] },
          { name: "Mac & Queso", emoji: "🧀", calories: 450, protein: "18g", grain: "WGR", allergens: ["Lácteos", "Gluten"] },
          { name: "Wrap Vegetariano", emoji: "🌯", calories: 360, protein: "12g", grain: "WGR", allergens: ["Gluten"] },
        ]
      },
      {
        day: "Miércoles",
        meals: [
          { name: "Hamburguesa", emoji: "🍔", calories: 620, protein: "30g", grain: "WGR", allergens: ["Gluten"] },
          { name: "Espagueti", emoji: "🍝", calories: 540, protein: "20g", grain: "WGR", allergens: ["Gluten"] },
          { name: "Tazón Asiático", emoji: "🍜", calories: 420, protein: "22g", grain: "WGR", allergens: ["Soya"] },
        ]
      },
      {
        day: "Jueves",
        meals: [
          { name: "Pollo a la BBQ", emoji: "🍗", calories: 560, protein: "32g", grain: "WGR", allergens: [] },
          { name: "Pizza de Pepperoni", emoji: "🍕", calories: 550, protein: "24g", grain: "WGR", allergens: ["Lácteos", "Gluten"] },
          { name: "Burrito de Frijoles", emoji: "🌯", calories: 480, protein: "18g", grain: "WGR", allergens: ["Gluten"] },
        ]
      },
      {
        day: "Viernes",
        meals: [
          { name: "Dedos de Pescado", emoji: "🐟", calories: 440, protein: "22g", grain: "WGR", allergens: ["Gluten"] },
          { name: "Quesadilla", emoji: "🧀", calories: 470, protein: "20g", grain: "WGR", allergens: ["Lácteos", "Gluten"] },
          { name: "Ensalada del Chef", emoji: "🥗", calories: 400, protein: "26g", grain: "WGR", allergens: ["Lácteos"] },
        ]
      },
    ],
    tabs: {
      planning: "Planeación de Menú",
      recipes: "Desarrollador de Recetas",
      cycles: "Gestor de Ciclos"
    },
    recipeStats: [
      { label: "Recetas Estandarizadas", val: "142" },
      { label: "Análisis Nutricional", val: "100%" },
      { label: "Recetas Costeadas", val: "94%" },
    ]
  }
};

export default function MenusPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [activeTab, setActiveTab] = useState("planning");
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [cycleDays, setCycleDays] = useState([
    { id: 'mon', dayEn: "Monday", dayEs: "Lunes", items: ["Chicken Tenders", "Salad Bar"] },
    { id: 'tue', dayEn: "Tuesday", dayEs: "Martes", items: ["Beef Tacos", "Pinto Beans"] },
    { id: 'wed', dayEn: "Wednesday", dayEs: "Miércoles", items: ["Burger & Bake", "Baby Carrots"] },
    { id: 'thu', dayEn: "Thursday", dayEs: "Jueves", items: ["BBQ Chicken", "Corn Cobbette"] },
    { id: 'fri', dayEn: "Friday", dayEs: "Viernes", items: ["Fish Sticks", "Coleslaw"] }
  ]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null) return;
    const newDays = [...cycleDays];
    const [draggedItem] = newDays.splice(draggedIdx, 1);
    newDays.splice(targetIdx, 0, draggedItem);
    setCycleDays(newDays);
    setDraggedIdx(null);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />

        <div className="page-content">
          {/* Sub-navigation Tabs */}
          <div style={{ display: "flex", gap: "var(--space-md)", marginBottom: "var(--space-lg)", borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-sm)" }}>
            {Object.entries(t.tabs).map(([id, label]) => (
              <button 
                key={id} 
                onClick={() => setActiveTab(id)}
                style={{ 
                  background: "transparent", border: "none", color: activeTab === id ? "var(--accent)" : "var(--text-muted)", 
                  fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", padding: "8px 16px",
                  borderBottom: activeTab === id ? "2px solid var(--accent)" : "2px solid transparent",
                  transition: "all 0.2s ease"
                }}
              >
                {label as string}
              </button>
            ))}
          </div>

          {activeTab === "planning" && (
            <div className="animate-fade-in">
              {/* USDA Compliance Bar */}
          <div className="card" style={{ marginBottom: "var(--space-lg)", padding: "var(--space-md) var(--space-lg)" }} data-demo-tooltip="RFP 26-027 Sect 2: Institutional Reporting. Direct USDA Meal Pattern certification and reporting logs.">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                <span style={{ fontSize: "1.5rem" }}>🛡️</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.complianceTitle}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.complianceDesc}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
                {t.nutritionTargets.map(n => (
                  <div key={n.nutrient} style={{
                    padding: "4px 12px", borderRadius: "var(--radius-sm)",
                    background: n.status === "met" ? "var(--success-bg)" : "var(--warning-bg)",
                    fontSize: "0.7rem", fontWeight: 600,
                    color: n.status === "met" ? "var(--success)" : "var(--warning)",
                    border: `1px solid ${n.status === "met" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                  }}>
                    {n.status === "met" ? "✅" : "⚠️"} {n.nutrient}: {n.target}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Menu Grid */}
          <div style={{ display: "grid", gap: "var(--space-md)" }}>
            {t.weeklyMenu.map((day, di) => (
              <div key={day.day} className="card animate-fade-in" style={{ animationDelay: `${di * 60}ms` }} data-demo-tooltip="RFP 26-027 Sect 2: Parent Transparency. Live menu portal with automated allergen flagging.">
                <div className="card-header">
                  <div className="card-title" style={{ fontSize: "1.1rem" }}>
                    📅 {day.day}
                  </div>
                  <span className="badge active">{t.options}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-md)" }}>
                  {day.meals.map((meal, mi) => (
                    <div key={mi} style={{
                      padding: "var(--space-md)", background: "var(--bg-elevated)",
                      borderRadius: "var(--radius-md)", border: "1px solid var(--border)",
                      display: "flex", gap: "var(--space-md)", alignItems: "center",
                    }}>
                      <span style={{ fontSize: "2rem" }}>{meal.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                          {meal.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                          {meal.calories} cal • {meal.protein} {t.protein} • {meal.grain}
                        </div>
                        {meal.allergens.length > 0 && (
                          <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                            {meal.allergens.map(a => (
                              <span key={a} style={{
                                padding: "1px 6px", borderRadius: 8, fontSize: "0.6rem",
                                background: "var(--warning-bg)", color: "var(--warning)",
                                fontWeight: 600
                              }}>⚠️ {a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

          {activeTab === "recipes" && (
            <div className="animate-fade-in">
              <div className="stats-grid">
                {t.recipeStats.map((s: any, i: number) => (
                  <div key={i} className="stat-card">
                    <div className="stat-info">
                      <h3>{s.val}</h3>
                      <p>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ marginTop: "var(--space-lg)" }}>
                <div className="card-header">
                  <div className="card-title">📖 Standardized Recipe Matrix</div>
                  <button className="btn btn-accent btn-sm">+ Create New Recipe</button>
                </div>
                <div style={{ padding: "var(--space-xxl)", textAlign: "center", background: "var(--bg-input)", borderRadius: "var(--radius-md)", border: "1px dashed var(--border)" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "var(--space-md)" }}>🍲</span>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Recipe development engine active. Select a recipe to review detailed nutrient breakdown and HACCAP protocols.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cycles" && (
            <div className="animate-fade-in">
              <div className="card" data-demo-tooltip="RFP 26-027 Sect 2: Cycle Menu Management. Drag-and-drop planning for seasonal/rotating menus.">
                <div className="card-header">
                  <div className="card-title">🔄 Cycle Menu Management</div>
                </div>
                <div style={{ padding: "var(--space-lg)" }}>
                   <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center", marginBottom: "var(--space-xl)", flexWrap: "wrap" }}>
                      {["Week 1", "Week 2", "Week 3", "Week 4", "Holiday Peak"].map((w, i) => (
                        <div key={i} style={{ 
                          padding: "12px 24px", background: i === 0 ? "var(--accent)" : "rgba(251, 222, 5, 0.05)", 
                          color: i === 0 ? "var(--primary-dark)" : "var(--accent)", 
                          borderRadius: "var(--radius-sm)", border: "1px solid var(--accent)",
                          fontWeight: 700, fontSize: "0.8rem"
                        }}>{w}</div>
                      ))}
                   </div>
                   <div style={{ padding: "var(--space-lg)", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--space-md)" }}>
                        {cycleDays.map((d, i) => (
                           <div 
                             key={d.id} 
                             draggable 
                             onDragStart={(e) => handleDragStart(e, i)}
                             onDragOver={handleDragOver}
                             onDrop={(e) => handleDrop(e, i)}
                             className="animate-fade-in" 
                             style={{ 
                               animationDelay: `${i * 100}ms`, 
                               background: draggedIdx === i ? "var(--bg-elevated)" : "var(--bg-card)", 
                               opacity: draggedIdx === i ? 0.5 : 1,
                               padding: "var(--space-md)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", cursor: "grab", position: 'relative', overflow: 'hidden', transition: "all 0.2s ease" 
                             }}>
                              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: "var(--accent)" }}></div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, marginTop: 4 }}>
                                 <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{lang === 'en' ? d.dayEn : d.dayEs}</span>
                                 <span style={{ opacity: 0.3, letterSpacing: "-2px" }}>⋮⋮</span>
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                {d.items.map(item => (
                                  <div key={item} style={{ fontSize: "0.75rem", padding: "6px 8px", background: "rgba(251, 222, 5, 0.05)", border: "1px solid rgba(251, 222, 5, 0.1)", borderRadius: 6, color: "var(--text-muted)", pointerEvents: "none" }}>{item}</div>
                                ))}
                              </div>
                           </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "var(--space-md)", textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }}></span>
                        {lang === 'en' ? "Drag and drop enabled. USDA compliance auto-validates on drop." : "Arrastrar y soltar habilitado. Cumplimiento USDA validado automáticamente."}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

