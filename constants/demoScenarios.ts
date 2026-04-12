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
    narrative: "Software/Data Management: Total district-wide oversight covering all 69 EPISD campuses with proactive real-time recovery.",
    bullets: [
      "Live site monitoring & background data sync",
      "Automated database backups & disaster recovery",
      "Zero-downtime over-the-air system upgrades"
    ],
    bulletsEs: [
      "Monitoreo en vivo de sitios y sincronización de datos",
      "Copias de seguridad automatizadas y recuperación de desastres",
      "Actualizaciones del sistema sin tiempo de inactividad"
    ]
  },
  {
    id: "02",
    name: "Point of Sale",
    path: "/pos",
    narrative: "Dynamic Frontlines: Processing universal federal meals reliably with 100% offline transaction survival.",
    bullets: [
      "Offline transactions with auto-synchronization",
      "Full hardware support (Touch, PIN, Handhelds, Keys)",
      "Instant CEP/Non-CEP verification & low balance alerts"
    ],
    bulletsEs: [
      "Transacciones fuera de línea con auto-sincronización",
      "Soporte completo de hardware (Táctil, PIN, Lectores)",
      "Verificación instantánea CEP y alertas de saldo"
    ],
    targetState: {
      autoLoginPin: "1234",
      triggerItemAllergen: "c2" 
    }
  },
  {
    id: "03",
    name: "Parent Portal",
    path: "/portal",
    narrative: "Household Transparency: Real-time parental engagement covering everything from nutrition to application prep.",
    bullets: [
      "Menu visibility with live nutritional & allergen alerts",
      "Online application portal integration",
      "Secure online payment processing & ledger history"
    ],
    bulletsEs: [
      "Visibilidad del menú con alertas nutricionales y de alérgenos",
      "Integración del portal de solicitudes en línea",
      "Procesamiento seguro de pagos en línea"
    ],
    targetState: {
      expandMenu: true
    }
  },
  {
    id: "04",
    name: "Student Roster",
    path: "/students",
    narrative: "Student Management: Streamlining federal eligibility across the entire district with automated verification.",
    bullets: [
      "Active Direct Certification sync process",
      "Verification and income validation processes",
      "Detailed student eligibility and account tracking"
    ],
    bulletsEs: [
      "Proceso activo de sincronización de certificación directa",
      "Procesos de validación de ingresos y verificación",
      "Seguimiento detallado de cuentas y elegibilidad"
    ]
  },
  {
    id: "05",
    name: "Menu Planning",
    path: "/menus",
    narrative: "Back of House: Comprehensive lifecycle management for EPISD menus and restrictive dietary accommodations.",
    bullets: [
      "Advanced Cycle Menu creation and strict management",
      "Smart menu item categorization for speed to serve",
      "Special dietary accommodations natively tracked"
    ],
    bulletsEs: [
      "Creación y manejo estricto de Ciclo de Menús",
      "Categorización inteligente de artículos del menú",
      "Seguimiento nativo de adaptaciones dietéticas especiales"
    ]
  },
  {
    id: "06",
    name: "Recipe Intelligence",
    path: "/recipes",
    narrative: "Scale & Health: Automated recipe formulation focused strictly on student safety and compliance constraints.",
    bullets: [
      "Precision District-wide recipe development",
      "Automated student allergen tracking matrix",
      "Yield scaling for single servings up to thousands"
    ],
    bulletsEs: [
      "Desarrollo de recetas preciso para todo el distrito",
      "Matriz automatizada de seguimiento de alérgenos",
      "Escalado de producción ajustado"
    ]
  },
  {
    id: "07",
    name: "Nutrition Analysis",
    path: "/nutrition",
    narrative: "USDA Compliance: Granular USDA constituent analysis mathematically guaranteeing regulatory nutrition targets.",
    bullets: [
      "Comprehensive nutritional breakdown of all menu items",
      "Caloric, sodium, and macro tracking against limits",
      "One-click audit reports for TDA/USDA inquiries"
    ],
    bulletsEs: [
      "Equivalente nutricional completo de todos los menús",
      "Seguimiento calórico y de macros frente a los límites",
      "Reportes de un clic para auditorías de TDA/USDA"
    ]
  },
  {
    id: "08",
    name: "Inventory Control",
    path: "/inventory",
    narrative: "Supply Chain Mastery: Zero-leakage perpetual inventory handling from vendor order to consumption.",
    bullets: [
      "Perpetual tracking, FIFO methodology, & waste logs",
      "Automated daily food production record generation",
      "Integrated vendor ordering & delivery scheduling"
    ],
    bulletsEs: [
      "Seguimiento continuo, método FIFO y registro de mermas",
      "Generación automática de registro de producción diaria",
      "Gestión de pedidos e integración de entregas de proveedores"
    ]
  },
  {
    id: "09",
    name: "Financial Ledger",
    path: "/payments",
    narrative: "Fiscal Integrity: Hardened accountability for all point-of-sale deposits and digital financial traffic.",
    bullets: [
      "Immutable cash journal and daily recon tools",
      "Real-time revenue and expense tracking",
      "Comprehensive in-person payment processing logic"
    ],
    bulletsEs: [
      "Libro de caja inmutable y herramientas de cierre diario",
      "Seguimiento en tiempo real de ingresos y gastos",
      "Procesamiento completo de pagos en persona"
    ]
  },
  {
    id: "10",
    name: "Federal Reports",
    path: "/reports",
    narrative: "Reimbursement Vault: Auto-compiling every claim and log to bulletproof EPISD against financial liability.",
    bullets: [
      "Monthly reimbursement, Edit Checks, & Daily Partic.",
      "Item sales, Meal counts (B/L/O), & Equivalency",
      "Detailed transaction logs, B/O/Y reports, and custom queries"
    ],
    bulletsEs: [
      "Reembolso mensual, revisiones y participación diaria",
      "Ventas por artículo, conteos de comidas (B/L/O)",
      "Registros detallados y reportes anuales"
    ]
  },
  {
    id: "11",
    name: "Campus Matrix",
    path: "/campuses",
    narrative: "Facility Intelligence: Macro-level configurations for the CEP structure spanning the district's footprint.",
    bullets: [
      "Site-by-site parameter configuration",
      "Identified Student Percentages (ISP) tracking",
      "Visual infrastructure mapping for 69 active sites"
    ],
    bulletsEs: [
      "Configuración de parámetros sitio por sitio",
      "Seguimiento del porcentaje de estudiantes (ISP)",
      "Mapeo visual de la infraestructura de 69 ubicaciones"
    ]
  },
  {
    id: "12",
    name: "User Access",
    path: "/users",
    narrative: "Security Core: Enforcing strict operational perimeters to guarantee data integrity across all EPISD staff.",
    bullets: [
      "Enterprise Role-Based Access Controls (RBAC)",
      "SHA-256 Data encryption for sensitive information",
      "Strict data exchange requirements and procedures"
    ],
    bulletsEs: [
      "Controles de acceso basados en roles (RBAC)",
      "Cifrado de datos SHA-256 para información sensible",
      "Requisitos estrictos de intercambio de datos"
    ]
  },
  {
    id: "13",
    name: "Support & Rollout",
    path: "/support",
    narrative: "Logistics Engine: We don't just sell software, we deliver 100% operational transformation with EPISD staff.",
    bullets: [
      "Phased rollout plan (Central Office & 69 sites)",
      "Onsite, virtual, and digital training & migration",
      "Dedicated Help Desk & Account Manager for Admin"
    ],
    bulletsEs: [
      "Plan de despliegue en fases (Oficina Central + 69 escuelas)",
      "Entrenamiento en persona, virtual y digital",
      "Mesa de ayuda dedicada y administrador de cuentas"
    ]
  }
];
