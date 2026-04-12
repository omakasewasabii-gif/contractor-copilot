import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const [mealsToday, setMealsToday] = useState(12847);
  const [activeTerminals, setActiveTerminals] = useState(69);

  // Real-time counter logic to simulate active district throughput
  useEffect(() => {
    const interval = setInterval(() => {
      setMealsToday(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const disclaimer = lang === 'en' 
    ? "NutriServe is an equal opportunity provider. In accordance with federal civil rights law and U.S. Department of Agriculture (USDA) civil rights regulations and policies, this institution is prohibited from discriminating on the basis of race, color, national origin, sex (including gender identity and sexual orientation), disability, age, or reprisal or retaliation for prior civil rights activity."
    : "NutriServe es un proveedor que ofrece igualdad de oportunidades. De acuerdo con la ley federal de derechos civiles y las regulaciones y políticas de derechos civiles del Departamento de Agricultura de los EE. UU. (USDA), esta institución tiene prohibido discriminar por motivos de raza, color, origen nacional, sexo (incluida la identidad de género y la orientación sexual), discapacidad, edad, o represalia o venganza por actividades previas de derechos civiles.";

  return (
    <footer className="footer" style={{
      padding: "var(--space-lg)",
      borderTop: "1px solid var(--border)",
      background: "var(--bg-elevated)",
      marginTop: "auto"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "var(--space-xl)",
        alignItems: "center"
      }}>
        <div>
          <h4 style={{ color: "var(--accent)", marginBottom: "4px", fontSize: "0.9rem" }}>NutriServe EPISD</h4>
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>RFP 26-027 Institutional Compliance Suite</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
               <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", animation: "pulse 2s infinite" }}></span>
               <span style={{ fontSize: "0.65rem", color: "var(--success)", fontWeight: 700 }}>{lang === 'es' ? "TRÁFICO EN VIVO" : "LIVE THROUGHPUT"}:</span>
               <span style={{ fontSize: "0.7rem", color: "var(--text-primary)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>{mealsToday.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
               <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600 }}>{lang === 'es' ? "TERMINALES" : "TERMINALS"}:</span>
               <span style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 800 }}>{activeTerminals}/69</span>
            </div>
            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 500 }}>v1.4.2-stable</span>
          </div>
        </div>
        <div>
          <p style={{ 
            fontSize: "0.65rem", 
            lineHeight: "1.5", 
            color: "var(--text-muted)",
            textAlign: "right",
            fontStyle: "italic"
          }}>
            {disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
