"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";
import "./portal.css";

// Bilingual content
const content = {
  en: {
    welcome: "Welcome back",
    subtitle: "View menus, manage payments, and track your child's nutrition.",
    dashboard: {
      balance: "Account Balance",
      mealsServed: "Meals This Week",
      nutritionScore: "Nutrition Score",
      addFunds: "Add Funds",
      viewHistory: "View History",
      enrolled: "Enrolled at"
    },
    nav: {
      dashboard: "Dashboard",
      activity: "Meal Activity",
      payments: "Payments & Autopay",
      notifications: "Notifications",
      profile: "Student Profile"
    },
    lowBalance: "⚠️ Low balance — Add funds for A la Carte extras over standard meals",
    addFunds: "Add Funds (Extras)",
    payNow: "Pay with Card",
    todayMenu: "Today's Menu",
    lunch: "Lunch Options",
    breakfast: "Breakfast Options",
    calories: "cal",
    recentActivity: "Recent Activity",
    mealHistory: "Meal History",
    nutritionSummary: "This Week's Nutrition",
    protein: "Protein",
    fiber: "Fiber",
    allergensTitle: "Allergen Alerts",
    allergensNote: "Your child's allergens are flagged on all menus",
    children: "Children",
    eligibility: "Program Status",
    mealsThisWeek: "Meals This Week",
    viewFullMenu: "View Full Weekly Menu →",
    signOut: "Sign Out",
    carbs: "Carbs",
    approved: "APPROVED",
    mealApp: "Meal Application",
    incomeVerified: "Income Verified",
    renewalDate: "Next Renewal",
    nslp: "NSLP (National School Lunch Program)",
    sbp: "SBP (School Breakfast Program)",
    usdaDisclaimer: "NutriServe is an equal opportunity provider. Meals served under USDA federal guidelines.",
    nutritionTarget: "USDA Target",
    nutritionActual: "Actual",
    caloriesPill: "Avg Calories",
    proteinPill: "Protein",
    carbsPill: "Carbs",
    fiberPill: "Fiber",
    sodiumPill: "Sodium",
    monthlyInsight: "Monthly Nutrition Insight",
    complianceCheck: "Compliance Check",
    compliant: "COMPLIANT",
  },
  es: {
    welcome: "Bienvenido de vuelta",
    subtitle: "Vea los menús, maneje pagos y siga la nutrición de su hijo.",
    dashboard: {
      balance: "Saldo de la Cuenta",
      mealsServed: "Comidas esta Semana",
      nutritionScore: "Puntaje de Nutrición",
      addFunds: "Agregar Fondos",
      viewHistory: "Ver Historial",
      enrolled: "Inscrito en"
    },
    nav: {
      dashboard: "Panel",
      activity: "Actividad de Comidas",
      payments: "Pagos y Autopago",
      notifications: "Notificaciones",
      profile: "Perfil del Estudiante"
    },
    lowBalance: "⚠️ Saldo bajo — Agregue fondos para extras a la carta",
    addFunds: "Agregar Fondos (Extras)",
    payNow: "Pagar con Tarjeta",
    todayMenu: "Menú de Hoy",
    lunch: "Opciones de Almuerzo",
    breakfast: "Opciones de Desayuno",
    calories: "cal",
    recentActivity: "Actividad Reciente",
    mealHistory: "Historial de Comidas",
    nutritionSummary: "Nutrición de Esta Semana",
    protein: "Proteína",
    fiber: "Fibra",
    allergensTitle: "Alertas de Alérgenos",
    allergensNote: "Los alérgenos de su hijo están marcados en todos los menús",
    children: "Hijos",
    eligibility: "Estado del Programa",
    mealsThisWeek: "Comidas Esta Semana",
    viewFullMenu: "Ver Menú Completo →",
    signOut: "Cerrar Sesión",
    carbs: "Carbos",
    approved: "APROBADO",
    mealApp: "Aplicación de Comidas",
    incomeVerified: "Ingresos Verificados",
    renewalDate: "Próxima Renovación",
    nslp: "NSLP (Programa Nacional de Almuerzos)",
    sbp: "SBP (Programa de Desayunos Escolares)",
    usdaDisclaimer: "NutriServe es un proveedor de igualdad de oportunidades. Comidas servidas bajo guías federales del USDA.",
    nutritionTarget: "Meta USDA",
    nutritionActual: "Actual",
    caloriesPill: "Cal Promedio",
    proteinPill: "Proteína",
    carbsPill: "Carbos",
    fiberPill: "Fibra",
    sodiumPill: "Sodio",
    monthlyInsight: "Resumen de Nutrición Mensual",
    complianceCheck: "Verificación de Cumplimiento",
    compliant: "EN REGLA",
  },
};

const childAllergens = ["Peanuts"];

const getNutritionalData = (category: string) => {
  const data: Record<string, { calories: number; protein: number; carbs: number; sodium: number; fiber: number }> = {
    "Lunch": { calories: 580, protein: 28, carbs: 42, sodium: 640, fiber: 8 },
    "Breakfast": { calories: 420, protein: 18, carbs: 38, sodium: 480, fiber: 6 },
    "A la Carte": { calories: 150, protein: 2, carbs: 22, sodium: 180, fiber: 2 },
  };
  return data[category as keyof typeof data] || data["Lunch"];
};

const todayLunch = [
  { name: { en: "Chicken Tenders", es: "Tiras de Pollo" }, emoji: "🍗", calories: 580, protein: "28g", allergens: [] },
  { name: { en: "Cheese Pizza", es: "Pizza de Queso" }, emoji: "🍕", calories: 520, protein: "22g", allergens: ["Dairy", "Gluten"] },
  { name: { en: "Garden Salad", es: "Ensalada del Jardín" }, emoji: "🥗", calories: 380, protein: "15g", allergens: [] },
];

const todayBreakfast = [
  { name: { en: "Breakfast Burrito", es: "Burrito de Desayuno" }, emoji: "🌯", calories: 420, protein: "20g", allergens: ["Gluten"] },
  { name: { en: "Pancakes", es: "Panqueques" }, emoji: "🥞", calories: 380, protein: "12g", allergens: ["Gluten", "Dairy"] },
];

const mealHistory = [
  { date: "Mar 23", meal: { en: "A la Carte - Baked Chips", es: "A la Carta - Papas Horneadas" }, amount: "$1.50" },
  { date: "Mar 23", meal: { en: "Lunch - Chicken Tenders", es: "Almuerzo - Tiras de Pollo" }, amount: "$0.00" },
  { date: "Mar 23", meal: { en: "Breakfast - Burrito", es: "Desayuno - Burrito" }, amount: "$0.00" },
  { date: "Mar 22", meal: { en: "Lunch - Beef Tacos", es: "Almuerzo - Tacos de Res" }, amount: "$0.00" },
  { date: "Mar 22", meal: { en: "Breakfast - Cereal", es: "Desayuno - Cereal" }, amount: "$0.00" },
  { date: "Mar 21", meal: { en: "A la Carte - Extra Milk", es: "A la Carta - Leche Extra" }, amount: "$0.75" },
  { date: "Mar 21", meal: { en: "Lunch - Pizza + Juice", es: "Almuerzo - Pizza + Jugo" }, amount: "$1.00" },
  { date: "Mar 21", meal: { en: "Breakfast - Pancakes", es: "Desayuno - Panqueques" }, amount: "$0.00" },
  { date: "Mar 20", meal: { en: "Lunch - Spaghetti", es: "Almuerzo - Espaguetis" }, amount: "$0.00" },
  { date: "Mar 20", meal: { en: "Breakfast - Oatmeal", es: "Desayuno - Avena" }, amount: "$0.00" },
  { date: "Mar 19", meal: { en: "Lunch - Chicken Sandwich", es: "Almuerzo - Sandwich de Pollo" }, amount: "$0.00" },
  { date: "Mar 19", meal: { en: "A la Carte - Sports Drink", es: "A la Carta - Bebida Deportiva" }, amount: "$2.00" },
];

export default function ParentPortal() {
  const { lang, setLang } = useLanguage();
  const [selectedPrepay, setSelectedPrepay] = useState<number | null>(null);
  const [balance, setBalance] = useState(12.50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [focusVault, setFocusVault] = useState(false);

  // Handle Demo Director Actions
  useEffect(() => {
    const handleDemoAction = (e: any) => {
      if (e.detail?.id === "05" || e.detail?.path === "/portal") {
        setFocusVault(true);
        if (e.detail?.expandMenu) setShowFullMenu(true);
        setTimeout(() => setFocusVault(false), 8000); // 8 second highlight
      }
    };
    window.addEventListener('nutriserve-demo-action', handleDemoAction);
    return () => window.removeEventListener('nutriserve-demo-action', handleDemoAction);
  }, []);

  // Dynamic Nutrition Calculation
  const monthlyStats = mealHistory.reduce((acc, entry) => {
    const category = entry.meal.en.split(" - ")[0];
    const stats = getNutritionalData(category);
    acc.calories += stats.calories;
    acc.protein += stats.protein;
    acc.carbs += stats.carbs;
    acc.sodium += stats.sodium;
    acc.fiber += stats.fiber;
    acc.count += 1;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, sodium: 0, fiber: 0, count: 0 });

  const avgStats = {
    calories: Math.round(monthlyStats.calories / monthlyStats.count),
    protein: Math.round(monthlyStats.protein / monthlyStats.count),
    carbs: Math.round(monthlyStats.carbs / monthlyStats.count),
    sodium: Math.round(monthlyStats.sodium / monthlyStats.count),
    fiber: Math.round(monthlyStats.fiber / monthlyStats.count),
  };

  const handlePayment = () => {
    if (!selectedPrepay) return;
    setIsProcessing(true);
    // Simulate network delay / Stripe checkout processing
    setTimeout(() => {
      setBalance(b => b + selectedPrepay);
      setIsProcessing(false);
      setShowSuccess(true);
      setSelectedPrepay(null);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

   const currentLang = lang as "en" | "es";
   const t = content[currentLang];
   const childAllergens = ["Peanuts"];

  return (
    <div className="portal-body">
      {/* Header */}
      <header className="portal-header">
        <div className="portal-brand">
          <div className="portal-brand-logo" style={{ background: "transparent", padding: 0 }}>
            <img src="/episd-logo.png" alt="NutriServe Custom Icon" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 12 }} />
          </div>
          <div className="portal-brand-text">
            <h1>NutriServe</h1>
            <span>EPISD {lang === "en" ? "Parent Portal" : "Portal de Padres"}</span>
          </div>
        </div>
        <div className="portal-actions">
          <div className="lang-toggle">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>ES</button>
          </div>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => { sessionStorage.clear(); window.location.reload(); }}
          >
            {t.signOut}
          </button>
        </div>
      </header>

      <div className="portal-container">
        {/* Welcome Banner */}
        <div className="welcome-banner animate-fade-in">
          <h2>{t.welcome}, Rodriguez Family 👋</h2>
          <p>{t.subtitle}</p>
          <div className="welcome-stats">
            <div className="welcome-stat">
              <div className="stat-val">2</div>
              <div className="stat-label">{t.children}</div>
            </div>
            <div className="welcome-stat">
              <div className="stat-val" style={{ color: "var(--success)" }}>{t.approved}</div>
              <div className="stat-label">{t.mealApp}</div>
            </div>
            <div className="welcome-stat">
              <div className="stat-val" style={{ color: "var(--success)" }}>MEAL ELIGIBLE</div>
              <div className="stat-label">CEP Universal</div>
            </div>
            <div className="welcome-stat" style={{ minWidth: "120px" }}>
              <div className="stat-val" style={{ color: "var(--success)", fontSize: "0.8rem" }}>AUG 12, 2025</div>
              <div className="stat-label">{t.incomeVerified}</div>
            </div>
            <div className="welcome-stat" style={{ minWidth: "120px" }}>
              <div className="stat-val" style={{ fontSize: "0.8rem" }}>JUL 01, 2026</div>
              <div className="stat-label">{t.renewalDate}</div>
            </div>
            <div className="welcome-stat">
              <div className="stat-val">8</div>
              <div className="stat-label">{t.mealsThisWeek}</div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="portal-grid">
          {/* Today's Menu */}
          <div className="menu-card animate-fade-in" data-demo-tooltip="RFP 26-027 Sect 2: Parent Transparency. Live menu portals with multilingual support (EN/ES).">
            <div className="menu-card-header">
              <h3>🍽️ {t.todayMenu} — {t.lunch}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700 }}>{t.nslp}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Monday</span>
              </div>
            </div>
            <div className="menu-card-body">
              {todayLunch.map((item, i) => {
                const hasAllergen = item.allergens.some(a => childAllergens.includes(a));
                return (
                  <div key={i} className="menu-item-row" style={{ opacity: hasAllergen ? 0.4 : 1 }}>
                    <span className="menu-item-emoji">{item.emoji}</span>
                    <div className="menu-item-info">
                      <h4>{item.name[currentLang]}</h4>
                      <p>{item.calories} {t.calories} • {item.protein} {t.protein}</p>
                      <div className="menu-item-badges">
                        {item.allergens.map(a => (
                          <span key={a} className="allergen-badge">⚠️ {a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Breakfast */}
            <div className="menu-card-header" style={{ borderTop: "1px solid var(--border)" }}>
              <h3>☀️ {t.breakfast}</h3>
              <span style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700 }}>{t.sbp}</span>
            </div>
            <div className="menu-card-body">
              {todayBreakfast.map((item, i) => (
                <div key={i} className="menu-item-row">
                  <span className="menu-item-emoji">{item.emoji}</span>
                  <div className="menu-item-info">
                    <h4>{item.name[currentLang]}</h4>
                    <p>{item.calories} {t.calories} • {item.protein} {t.protein}</p>
                    <div className="menu-item-badges">
                      {item.allergens.map(a => (
                        <span key={a} className="allergen-badge">⚠️ {a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {showFullMenu && (
              <div className="animate-fade-in">
                {/* Tuesday */}
                <div className="menu-card-header" style={{ borderTop: "1px solid var(--border)" }}>
                  <h3>🍽️ Tuesday ({t.lunch})</h3>
                </div>
                <div className="menu-card-body">
                  <div className="menu-item-row" style={{ opacity: 1 }}>
                    <span className="menu-item-emoji">🌮</span>
                    <div className="menu-item-info">
                      <h4>{lang === "en" ? "Beef Tacos" : "Tacos de Carne"}</h4>
                      <p>450 {t.calories} • 22g {t.protein}</p>
                      <div className="menu-item-badges"></div>
                    </div>
                  </div>
                  <div className="menu-item-row" style={{ opacity: 0.4 }}>
                    <span className="menu-item-emoji">🍪</span>
                    <div className="menu-item-info">
                      <h4>{lang === "en" ? "Peanut Butter Cookie" : "Galleta de Crema de Cacahuate"}</h4>
                      <p>180 {t.calories} • 4g {t.protein}</p>
                      <div className="menu-item-badges">
                        <span className="allergen-badge">⚠️ Peanuts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wednesday */}
                <div className="menu-card-header" style={{ borderTop: "1px solid var(--border)" }}>
                  <h3>🍽️ Wednesday ({t.lunch})</h3>
                </div>
                <div className="menu-card-body">
                  <div className="menu-item-row" style={{ opacity: 1 }}>
                    <span className="menu-item-emoji">🍗</span>
                    <div className="menu-item-info">
                      <h4>{lang === "en" ? "Chicken Tenders" : "Tiras de Pollo"}</h4>
                      <p>510 {t.calories} • 28g {t.protein}</p>
                      <div className="menu-item-badges"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ padding: "var(--space-sm) var(--space-lg) var(--space-md)", borderTop: "1px solid var(--border)" }}>
              <button 
                className="btn btn-ghost btn-sm" 
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setShowFullMenu(!showFullMenu)}
              >
                {showFullMenu ? "⬆️ Collapse Menu" : t.viewFullMenu}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            {/* Account Balance */}
            <div className={`account-card animate-fade-in ${focusVault ? "demo-focus-target" : ""}`} style={{ animationDelay: "100ms", transition: 'all 0.3s ease' }}>
              <h3>💰 {t.dashboard.balance}</h3>
              <div className="balance-display" style={{ border: showSuccess ? "1px solid var(--success)" : "none", transition: "all 0.3s ease" }}>
                <div className="balance-amount">${balance.toFixed(2)}</div>
                <div className="balance-label">Carlos Rodriguez — Bel Air MS</div>
              </div>

              {balance < 15 && <div className="low-balance-alert">{t.lowBalance}</div>}

              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "var(--space-sm)" }}>
                {t.dashboard.addFunds}
              </div>
              <div className="prepay-amounts">
                {[10, 25, 50, 100].map(amt => (
                  <button key={amt} className={`prepay-btn ${selectedPrepay === amt ? "selected" : ""}`}
                    onClick={() => setSelectedPrepay(amt)}
                    disabled={isProcessing}>
                    ${amt}
                  </button>
                ))}
              </div>
              <button 
                className={`btn ${showSuccess ? "btn-success" : "btn-accent"}`} 
                style={{ width: "100%", justifyContent: "center", background: showSuccess ? "var(--success)" : undefined, color: showSuccess ? "white" : undefined }}
                onClick={handlePayment}
                disabled={!selectedPrepay || isProcessing || showSuccess}
              >
                {isProcessing 
                  ? "Processing..." 
                  : showSuccess 
                    ? "✅ Payment Successful" 
                    : `💳 ${t.payNow} ${selectedPrepay ? `— $${selectedPrepay}` : ""}`
                }
              </button>
            </div>

            {/* Allergen Alert */}
            <div className="account-card animate-fade-in" style={{ animationDelay: "150ms", borderColor: "rgba(239,68,68,0.2)" }} data-demo-tooltip="RFP 26-027 Sect 2: Safety Protocols. Automated allergen flagging based on student profile.">
              <h3>⚠️ {t.allergensTitle}</h3>
              <div style={{ display: "flex", gap: "var(--space-sm)", marginBottom: "var(--space-sm)", flexWrap: "wrap" }}>
                {childAllergens.map(a => (
                  <span key={a} style={{
                    padding: "4px 12px", borderRadius: 12, fontSize: "0.8rem", fontWeight: 700,
                    background: "var(--danger-bg)", color: "var(--danger)",
                    border: "1px solid rgba(239,68,68,0.3)"
                  }}>🚫 {a}</span>
                ))}
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.allergensNote}</p>
            </div>

            {/* Nutrition Summary */}
            <div className={`account-card animate-fade-in ${focusVault ? "demo-focus-target" : ""}`} style={{ animationDelay: "200ms", transition: 'all 0.3s ease' }} data-demo-tooltip="RFP 26-027 Sect 2: Transparency. Real-time nutritional scoring against USDA benchmarks.">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
                <h3 style={{ margin: 0 }}>📊 {t.nutritionSummary}</h3>
                <div style={{ fontSize: "0.6rem", background: "var(--success-bg)", color: "var(--success)", padding: "2px 8px", borderRadius: "10px", fontWeight: 700 }}>{t.compliant}</div>
              </div>
              
              <div className="nutrition-grid">
                <div className="nutrition-pill detailed">
                  <div className="np-val">{avgStats.calories}</div>
                  <div className="np-label">{t.caloriesPill}</div>
                  <div className="np-target">{t.nutritionTarget}: 550-650</div>
                </div>
                <div className="nutrition-pill detailed">
                  <div className="np-val">{avgStats.protein}g</div>
                  <div className="np-label">{t.proteinPill}</div>
                  <div className="np-target">{t.nutritionTarget}: 15g+</div>
                </div>
                <div className="nutrition-pill detailed">
                  <div className="np-val">{avgStats.carbs}g</div>
                  <div className="np-label">{t.carbsPill}</div>
                  <div className="np-target">{t.nutritionTarget}: 40g+</div>
                </div>
                <div className="nutrition-pill detailed">
                  <div className="np-val">{avgStats.sodium}mg</div>
                  <div className="np-label">{t.sodiumPill}</div>
                  <div className="np-target">{t.nutritionTarget}: &lt;740mg</div>
                </div>
                <div className="nutrition-pill detailed">
                  <div className="np-val">{avgStats.fiber}g</div>
                  <div className="np-label">{t.fiberPill}</div>
                  <div className="np-target">{t.nutritionTarget}: 5g+</div>
                </div>
                <div className="nutrition-pill detailed highlight">
                  <div className="np-val">100%</div>
                  <div className="np-label">{t.complianceCheck}</div>
                  <div className="np-target">USDA SEC. 201</div>
                </div>
              </div>

              <div style={{ marginTop: "var(--space-md)", padding: "var(--space-sm)", background: "rgba(251, 222, 5, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(251, 222, 5, 0.1)" }}>
                <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", margin: 0 }}>
                  <strong>{t.recentActivity}:</strong> Rodriguez Family meals have met or exceeded all USDA nutritional benchmarks for the current cycle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meal History */}
        <div className="account-card animate-fade-in" style={{ animationDelay: "250ms" }}>
          <h3 style={{ marginBottom: "var(--space-md)" }}>📋 {t.mealHistory}</h3>
          <div className="history-list">
            {mealHistory.map((entry, i) => (
              <div key={i} className="history-item">
                <div className="hi-left">
                  <span className="hi-label">{entry.meal[currentLang]}</span>
                  <span className="hi-date">{entry.date}, 2026</span>
                </div>
                <span className="hi-amount" style={{
                  color: entry.amount === "$0.00" ? "var(--success)" : "var(--text-primary)"
                }}>{entry.amount === "$0.00" ? (lang === "en" ? "FREE" : "GRATIS") : entry.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
