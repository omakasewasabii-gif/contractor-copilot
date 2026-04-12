"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";

const recipes = [
  {
    id: "R-101",
    name: { en: "Beef Street Tacos" , es: "Tacos de Bistec Estilo Calle" },
    baseServings: 100,
    nutrients: { kcal: 340, protein: "22g", fat: "12g", sodium: "480mg" },
    ingredients: [
      { name: { en: "Lean Ground Beef", es: "Carne Molida Magra" }, qty: "20 lbs" },
      { name: { en: "Corn Tortillas", es: "Tortillas de Maíz" }, qty: "200 units" },
      { name: { en: "Cilantro/Onion", es: "Cilantro y Cebolla" }, qty: "5 lbs" },
      { name: { en: "Taco Seasoning (Low Sodium)", es: "Sazonador de Tacos" }, qty: "1 lb" }
    ]
  },
  {
    id: "R-202",
    name: { en: "Southwest Burger Bar", es: "Barra de Hamburguesas del Suroeste" },
    baseServings: 100,
    nutrients: { kcal: 420, protein: "28g", fat: "16g", sodium: "520mg" },
    ingredients: [
      { name: { en: "Whole Grain Buns", es: "Pan Integral" }, qty: "100 units" },
      { name: { en: "Turkey Patties", es: "Tortas de Pavo" }, qty: "100 units" },
      { name: { en: "Pepper Jack Cheese", es: "Queso Pepper Jack" }, qty: "3 lbs" },
      { name: { en: "Fresh Pico de Gallo", es: "Pico de Gallo Fresco" }, qty: "10 lbs" }
    ]
  }
];

export default function RecipesPage() {
  const { lang } = useLanguage();
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);
  const [targetServings, setTargetServings] = useState(100);

  const t = {
    en: {
      title: "Recipe Intelligence",
      subtitle: "Nutritional Transparency & Scaling",
      scaler: "Scale Production",
      servings: "Target Servings",
      nutrients: "Nutritional Profile (per serving)",
      ingredients: "Production Ingredients",
      tda: "TDA COMPLIANT",
      calculate: "Adjust Scaler"
    },
    es: {
      title: "Inteligencia de Recetas",
      subtitle: "Transparencia Nutricional y Escalamiento",
      scaler: "Escalar Producción",
      servings: "Porciones Objetivo",
      nutrients: "Perfil Nutricional (por porción)",
      ingredients: "Ingredientes de Producción",
      tda: "CUMPLE CON TDA",
      calculate: "Ajustar Escala"
    }
  }[lang];

  const scaleFactor = targetServings / selectedRecipe.baseServings;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />
        <div className="page-content" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "var(--space-xl)" }}>
          
          {/* Left: Recipe List */}
          <div className="glass-panel" style={{ padding: "var(--space-lg)" }}>
            <h3 style={{ marginBottom: "var(--space-md)", color: "var(--accent)" }}>{lang === 'es' ? "Catálogo" : "Catalog"}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recipes.map(r => (
                <div 
                  key={r.id}
                  onClick={() => setSelectedRecipe(r)}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--radius-md)",
                    background: selectedRecipe.id === r.id ? "rgba(251, 222, 5, 0.15)" : "rgba(255, 255, 255, 0.03)",
                    border: `1px solid ${selectedRecipe.id === r.id ? "var(--accent)" : "var(--border)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <p style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700 }}>{r.id}</p>
                  <h4 style={{ margin: "4px 0" }}>{r.name[lang]}</h4>
                  <div className="badge gold">TDA Compliant</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Scaler Engine */}
          <div className="glass-panel" style={{ padding: "var(--space-xl)" }} data-demo-tooltip="RFP 26-027 Sect 2: Menu & Nutrition Intelligence. Production scaling and perpetual inventory sync (FIFO).">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{selectedRecipe.name[lang]}</h2>
                <span className="badge success">{t.tda}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px" }}>{t.scaler}</p>
                <input 
                  type="number" 
                  value={targetServings}
                  onChange={(e) => setTargetServings(parseInt(e.target.value) || 0)}
                  style={{
                    fontSize: "2rem",
                    background: "rgba(0,0,0,0.3)",
                    border: "2px solid var(--accent)",
                    color: "white",
                    width: "140px",
                    textAlign: "center",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 800
                  }}
                />
                <p style={{ fontSize: "0.7rem", marginTop: "4px" }}>{t.servings}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "20px" }}>
              <div className="stat-card minimal"><h3>{selectedRecipe.nutrients.kcal}</h3><p>KCAL</p></div>
              <div className="stat-card minimal"><h3>{selectedRecipe.nutrients.protein}</h3><p>PROTEIN</p></div>
              <div className="stat-card minimal"><h3>{selectedRecipe.nutrients.fat}</h3><p>FAT</p></div>
              <div className="stat-card minimal"><h3>{selectedRecipe.nutrients.sodium}</h3><p>SODIUM</p></div>
            </div>

            <div 
              data-demo-tooltip="RFP 26-027 Sect 2: Automated nutritional analysis. Reimbursable validation for SBP & NSLP."
              style={{ 
              marginBottom: "40px", 
              padding: "16px", 
              background: "rgba(16, 185, 129, 0.05)", 
              borderRadius: "8px", 
              border: "1px solid rgba(16, 185, 129, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.2rem" }}>🛡️</span>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--success)" }}>USDA NUTRITIONAL CERTIFICATION</div>
                  <div style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>Compliant with 7 CFR 210.10 (NSLP) and 220.8 (SBP) Standards</div>
                </div>
              </div>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--success)", border: "1px solid var(--success)", padding: "2px 8px", borderRadius: "100px" }}>
                PASSED
              </div>
            </div>

            <h3 style={{ marginBottom: "20px" }}>{t.ingredients}</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>{lang === 'es' ? "Ingrediente" : "Ingredient"}</th>
                  <th style={{ textAlign: "right" }}>{lang === 'es' ? "Cantidad Base (100)" : "Base Qty (100)"}</th>
                  <th style={{ textAlign: "right", color: "var(--accent)" }}>{lang === 'es' ? "Cantidad Escalada" : "Scaled Qty"}</th>
                </tr>
              </thead>
              <tbody>
                {selectedRecipe.ingredients.map((ing, i) => {
                   const matches = ing.qty.match(/(\d+)\s*(.*)/);
                   const val = matches ? parseInt(matches[1]) : 0;
                   const unit = matches ? matches[2] : "";
                   return (
                     <tr key={i}>
                       <td style={{ fontWeight: 600 }}>{ing.name[lang]}</td>
                       <td style={{ textAlign: "right", color: "var(--text-muted)" }}>{ing.qty}</td>
                       <td style={{ textAlign: "right", color: "var(--accent)", fontWeight: 800 }}>
                          {(val * scaleFactor).toFixed(1)} {unit}
                       </td>
                     </tr>
                   );
                })}
              </tbody>
            </table>
          </div>

        </div>
        <Footer />
      </main>
      <style jsx>{`
        .badge.success { background: rgba(0, 255, 100, 0.1); color: #00ff64; border: 1px solid rgba(0, 255, 100, 0.3); }
        .stat-card.minimal { padding: 15px; background: rgba(255,255,255,0.02); text-align: center; border: 1px solid var(--border); }
        .stat-card.minimal h3 { color: var(--accent); margin-bottom: 4px; }
      `}</style>
    </div>
  );
}
