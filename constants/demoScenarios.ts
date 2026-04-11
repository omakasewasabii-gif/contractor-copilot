export interface Scenario {
  id: string;
  name: string;
  path: string;
  narrative: string;
  bullets: string[];
  bulletsEs: string[];
  setupActions?: () => void;
  targetState?: any;
}

export const DEMO_SCENARIOS: Scenario[] = [
  {
    id: "01",
    name: "Command Center",
    path: "/",
    narrative: "EPISD District Scale: Demonstrating 100% compliance with RFP 26-027 requirements for 69 active campuses.",
    bullets: [
      "Bilingual-First Architecture (EN/ES ready)",
      "Real-time visibility across 6,000,000+ meals annually",
      "Automated TDA/USDA compliance engine alignment"
    ],
    bulletsEs: [
      "Arquitectura bilingüe (listo para EN/ES)",
      "Visibilidad en tiempo real de más de 6,000,000 de comidas anuales",
      "Alineación del motor de cumplimiento automatizado TDA/USDA"
    ],
  },
  {
    id: "02",
    name: "Forensic Audit",
    path: "/reports",
    narrative: "Transparency & Accountability: Proving immutable records for TDA reimbursement and USDA reviews.",
    bullets: [
      "SHA-256 Digital Fingerprinting for audit integrity",
      "One-click 'Edit Checks' for immediate reimbursement",
      "Forensic trail eliminating district financial liability"
    ],
    bulletsEs: [
      "Huellas digitales SHA-256 para integridad de auditoría",
      "Revisiones con un clic para reembolso inmediato",
      "Rastro forense que elimina la responsabilidad financiera del distrito"
    ],
  },
  {
    id: "03",
    name: "CEP & ISP Tracking",
    path: "/campuses",
    narrative: "Universal Eligibility: Managing El Paso ISD's specific 82.4% ISP across 69 campuses.",
    bullets: [
      "Live ISP (Identified Student Percentage) monitoring",
      "Automated direct certification sync with state data",
      "Maximize federal reimbursement via Community Eligibility"
    ],
    bulletsEs: [
      "Monitoreo de ISP (Porcentaje de Estudiantes Identificados) en vivo",
      "Sincronización automatizada con datos estatales",
      "Maximizar el reembolso federal mediante elegibilidad comunitaria"
    ],
  },
  {
    id: "04",
    name: "Medical Safety",
    path: "/pos",
    narrative: "POS Excellence: Demonstrating bilingual safety and terminal medical lockouts.",
    bullets: [
      "Instant allergen alerts (Dairy, Nut, Gluten path)",
      "Smart Medical Lockouts preventing accidental exposure",
      "Offline-First reliability for high-volume cafeteria peaks"
    ],
    bulletsEs: [
      "Alertas de alérgenos instantáneas (lácteos, nueces, gluten)",
      "Bloqueos médicos inteligentes para prevenir exposición accidental",
      "Fiabilidad 'Offline-First' para los picos de volumen en cafetería"
    ],
    targetState: {
      autoLoginPin: "1234",
      triggerItemAllergen: "c2" 
    }
  },
  {
    id: "05",
    name: "Parent Trust",
    path: "/portal",
    narrative: "Community Engagement: Providing parents with bilingual transparency and nutritional trust.",
    bullets: [
      "Bilingual real-time balance and nutritional data",
      "Verified CEP status visibility for every household",
      "Transparency tools building long-term district trust"
    ],
    bulletsEs: [
      "Saldos y datos nutricionales bilingües en tiempo real",
      "Visibilidad del estado CEP verificado para cada hogar",
      "Herramientas de transparencia para la confianza del distrito"
    ],
    targetState: {
      expandMenu: true
    }
  }
];
