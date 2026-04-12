"use client";

import { useState, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";
import { useHardware } from "@/hooks/useHardware";

// Mock student database
const studentDB: Record<string, StudentInfo> = {
  "1234": { id: "1234", name: "Maria Garcia", grade: "10th", campus: "Bel Air HS", eligibility: "free", balance: 0, photo: "MG", allergens: ["Peanuts", "Dairy", "Gluten"] },
  "2345": { id: "2345", name: "Carlos Rodriguez", grade: "8th", campus: "Bel Air MS", eligibility: "reduced", balance: 12.50, photo: "CR", allergens: [] },
  "3456": { id: "3456", name: "Sarah Kim", grade: "11th", campus: "Franklin HS", eligibility: "paid", balance: 45.00, photo: "SK", allergens: ["Dairy", "Gluten"] },
  "4567": { id: "4567", name: "James Thompson", grade: "9th", campus: "Coronado HS", eligibility: "paid", balance: 8.25, photo: "JT", allergens: [] },
  "5678": { id: "5678", name: "Ana Lopez", grade: "7th", campus: "Montwood MS", eligibility: "free", balance: 0, photo: "AL", allergens: ["Shellfish"] },
  "6789": { id: "6789", name: "David Martinez", grade: "12th", campus: "Americas HS", eligibility: "free", balance: 0, photo: "DM", allergens: [] },
  "4444": { id: "4444", name: "Leo Vance", grade: "6th", campus: "Richardson MS", eligibility: "paid", balance: -4.50, photo: "LV", allergens: [] },
};

type Eligibility = "free" | "reduced" | "paid";

interface StudentInfo {
  id: string;
  name: string;
  grade: string;
  campus: string;
  eligibility: Eligibility;
  balance: number;
  photo: string;
  allergens: string[];
}

interface MenuItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  freePrice: number;
  reducedPrice: number;
  calories: number;
  reimbursable: boolean;
  allergens: string[];
}

interface OrderItem extends MenuItem {
  qty: number;
}

// Menu items
const menuItems: MenuItem[] = [
  // Reimbursable Combos
  { id: "c1", name: "Combo A - Chicken", emoji: "🍗", category: "Combos", price: 3.50, freePrice: 0, reducedPrice: 0.40, calories: 580, reimbursable: true, allergens: [] },
  { id: "c2", name: "Combo B - Pizza", emoji: "🍕", category: "Combos", price: 3.50, freePrice: 0, reducedPrice: 0.40, calories: 520, reimbursable: true, allergens: ["Dairy", "Gluten"] },
  { id: "c3", name: "Combo C - Tacos", emoji: "🌮", category: "Combos", price: 3.50, freePrice: 0, reducedPrice: 0.40, calories: 490, reimbursable: true, allergens: [] },
  { id: "c4", name: "Combo D - Burger", emoji: "🍔", category: "Combos", price: 3.75, freePrice: 0, reducedPrice: 0.40, calories: 620, reimbursable: true, allergens: ["Gluten"] },
  { id: "c5", name: "Combo E - Pasta", emoji: "🍝", category: "Combos", price: 3.50, freePrice: 0, reducedPrice: 0.40, calories: 540, reimbursable: true, allergens: ["Dairy", "Gluten"] },
  { id: "c6", name: "Combo F - Salad", emoji: "🥗", category: "Combos", price: 3.25, freePrice: 0, reducedPrice: 0.40, calories: 380, reimbursable: true, allergens: [] },

  // A la Carte
  { id: "a1", name: "Extra Pizza Slice", emoji: "🍕", category: "A la Carte", price: 2.00, freePrice: 2.00, reducedPrice: 2.00, calories: 280, reimbursable: false, allergens: ["Dairy", "Gluten"] },
  { id: "a2", name: "Fruit Cup", emoji: "🍎", category: "A la Carte", price: 1.25, freePrice: 1.25, reducedPrice: 1.25, calories: 80, reimbursable: false, allergens: [] },
  { id: "a3", name: "Juice Box", emoji: "🧃", category: "A la Carte", price: 1.00, freePrice: 1.00, reducedPrice: 1.00, calories: 100, reimbursable: false, allergens: [] },
  { id: "a4", name: "Cookie", emoji: "🍪", category: "A la Carte", price: 0.75, freePrice: 0.75, reducedPrice: 0.75, calories: 150, reimbursable: false, allergens: ["Gluten", "Dairy"] },
  { id: "a5", name: "Water Bottle", emoji: "💧", category: "A la Carte", price: 1.00, freePrice: 1.00, reducedPrice: 1.00, calories: 0, reimbursable: false, allergens: [] },
  { id: "a6", name: "Chips", emoji: "🥔", category: "A la Carte", price: 1.25, freePrice: 1.25, reducedPrice: 1.25, calories: 160, reimbursable: false, allergens: [] },

  // Breakfast
  { id: "b1", name: "Breakfast Burrito", emoji: "🌯", category: "Breakfast", price: 2.50, freePrice: 0, reducedPrice: 0.30, calories: 420, reimbursable: true, allergens: ["Gluten"] },
  { id: "b2", name: "Pancakes", emoji: "🥞", category: "Breakfast", price: 2.25, freePrice: 0, reducedPrice: 0.30, calories: 380, reimbursable: true, allergens: ["Gluten", "Dairy"] },
  { id: "b3", name: "Cereal + Milk", emoji: "🥣", category: "Breakfast", price: 2.00, freePrice: 0, reducedPrice: 0.30, calories: 320, reimbursable: true, allergens: ["Dairy", "Gluten"] },
  { id: "b4", name: "Fruit & Yogurt", emoji: "🫐", category: "Breakfast", price: 2.00, freePrice: 0, reducedPrice: 0.30, calories: 240, reimbursable: true, allergens: ["Dairy"] },
];

function getItemPrice(item: MenuItem, eligibility: Eligibility): number {
  if (item.reimbursable) {
    switch (eligibility) {
      case "free": return item.freePrice;
      case "reduced": return item.reducedPrice;
      default: return item.price;
    }
  }
  return item.price;
}

export default function POSTerminal() {
  const { lang } = useLanguage();
  const hw = useHardware();
  const [pin, setPin] = useState("");
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [category, setCategory] = useState("Combos");
  const [lookupError, setLookupError] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(0);
  const [overrideItem, setOverrideItem] = useState<MenuItem | null>(null);
  const [overridePin, setOverridePin] = useState("");
  const [overrideError, setOverrideError] = useState(false);
  const [sessionClaimed, setSessionClaimed] = useState<Set<string>>(new Set());

  // Hardening Phase: Institutional Program Mapping
  const getProgramAcronym = (itemCategory: string, mealTime: string = "lunch") => {
    if (itemCategory === "Breakfast") return "SBP";
    if (itemCategory === "A la Carte") return "ALC";
    return mealTime === "lunch" ? "NSLP" : "SSO";
  };

  const [keyboardMode, setKeyboardMode] = useState(false);
  const [rfidActive, setRfidActive] = useState(false);

  // Translations
  const content = {
    en: {
      title: "Point of Sale Terminal",
      subtitle: "EPISD Campus Terminal — Active Service",
      online: "Online — Connected to EPISD Network",
      lastSync: "Last sync: 4 sec ago",
      localCache: "Local cache: 847 students loaded",
      offlineReady: "Offline-Ready",
      transactionComplete: "Transaction Complete!",
      mealRecorded: "Meal recorded for",
      nextStudent: "Next Student",
      printReceipt: "Print Receipt",
      studentLookup: "Student Lookup",
      enterPin: "Enter 4-digit PIN",
      studentNotFound: "Student not found — try again",
      scanId: "Or scan student ID card",
      mealEligible: "MEAL ELIGIBLE",
      balance: "Balance",
      newStudent: "New Student",
      ovsCompliant: "OFFER VS. SERVE (OvS) COMPLIANT",
      cepFree: "CEP FREE",
      currentOrder: "Current Order",
      item: "item",
      items: "items",
      selectItems: "Select menu items to add",
      lookupToStart: "Look up student to start",
      qty: "Qty",
      subtotal: "Subtotal",
      mealProgram: "Meal Program",
      totalDue: "Total Due",
      cancel: "Cancel",
      completeCEP: "Complete — CEP Reimbursement",
      process: "Process",
      categories: {
        "Combos": "Combos",
        "A la Carte": "A la Carte",
        "Breakfast": "Breakfast"
      },
      numpad: {
        clear: "CLEAR",
        back: "⌫"
      },
      keyboardMode: {
        active: "⌨️ KEYBOARD MODE ACTIVE",
        hint: "Press [0-9] for PIN, [Enter] to Process"
      },
      hardwareHealth: {
        title: "⚙️ HARDWARE STATUS",
        printer: "Receipt Printer",
        scanner: "ID Scanner",
        pinpad: "Pin Pad",
        connected: "CONNECTED"
      },
      disconnect: "Simulate Network Drop",
      reconnect: "Restore Network",
      offlineMode: "⚠️ OFFLINE MODE",
      queued: "transactions queued",
      medicalLockout: "⚠️ MEDICAL LOCKOUT",
      allergenAlert: "Allergen detected",
      supervisorOverride: "Require Supervisor Override PIN",
      allowOverride: "Override & Add",
      keyboardModeOn: "KEYBOARD MODE ON",
      keyboardModeOff: "TOUCH MODE",
      rfidScanning: "SCANNING RFID...",
      rfidSuccess: "ID SCANNED",
      lowBalanceAlert: "LOW BALANCE ALERT",
      negativeBalanceAlert: "NEGATIVE BALANCE / DEBT",
      parentNotified: "Parent notification sent via SMS/Email",
      altMeal: "Policy: Provide Alternative Meal if debt exceeds -$5.00"
    },
    es: {
      title: "Terminal Punto de Venta",
      subtitle: "Terminal EPISD — Servicio Activo",
      online: "En línea - Conectado a la Red EPISD",
      lastSync: "Hace 4 seg",
      localCache: "Caché local: 847 est. cargados",
      offlineReady: "Listo Sin Conexión",
      transactionComplete: "¡Transacción Completa!",
      mealRecorded: "Comida registrada para",
      nextStudent: "Siguiente Estudiante",
      printReceipt: "Imprimir Recibo",
      studentLookup: "Búsqueda de Estudiante",
      enterPin: "Ingrese PIN de 4 dígitos",
      studentNotFound: "Estudiante no encontrado - intente de nuevo",
      scanId: "O escanee tarjeta de estudiante",
      mealEligible: "CUMPLE P. COMIDAS",
      balance: "Saldo",
      newStudent: "Nuevo Estudiante",
      ovsCompliant: "CUMPLE OFERTA VS. SERVIR (OvS)",
      cepFree: "CEP GRATIS",
      currentOrder: "Orden Actual",
      item: "artículo",
      items: "artículos",
      selectItems: "Seleccione elementos para agregar",
      lookupToStart: "Busque un estudiante para comenzar",
      qty: "Cant",
      subtotal: "Subtotal",
      mealProgram: "Programa de Comidas",
      totalDue: "Total a Pagar",
      cancel: "Cancelar",
      completeCEP: "Completar — Reembolso CEP",
      process: "Procesar",
      categories: {
        "Combos": "Combos",
        "A la Carte": "A la Carta",
        "Breakfast": "Desayuno"
      },
      numpad: {
        clear: "BORRAR",
        back: "⌫"
      },
      keyboardMode: {
        active: "⌨️ MODO TECLADO ACTIVO",
        hint: "Presione [0-9] para PIN, [Enter] para Procesar"
      },
      hardwareHealth: {
        title: "⚙️ ESTADO DE HARDWARE",
        printer: "Impresora",
        scanner: "Escáner ID",
        pinpad: "Pin Pad",
        connected: "CONECTADO"
      },
      disconnect: "Simular Caída de Red",
      reconnect: "Restaurar Red",
      offlineMode: "⚠️ MODO SIN CONEXIÓN",
      queued: "transacciones en cola",
      medicalLockout: "⚠️ BLOQUEO MÉDICO",
      allergenAlert: "Alérgeno detectado",
      supervisorOverride: "Requiere PIN de Supervisor",
      allowOverride: "Anular y Agregar",
      keyboardModeOn: "MODO TECLADO ON",
      keyboardModeOff: "MODO TÁCTIL",
      rfidScanning: "ESCANEANDO RFID...",
      rfidSuccess: "ID ESCANEADO",
      lowBalanceAlert: "ALERTA DE SALDO BAJO",
      negativeBalanceAlert: "SALDO NEGATIVO / DEUDA",
      parentNotified: "Notificación enviada por SMS/Email",
      altMeal: "Política: Proveer Comida Alternativa si la deuda excede -$5.00"
    }
  };

  const t = content[lang as keyof typeof content];

  const handlePinEntry = useCallback((digit: string) => {
    if (digit === "clear") {
      setPin("");
      setStudent(null);
      setLookupError(false);
      return;
    }
    if (digit === "back") {
      setPin(p => p.slice(0, -1));
      return;
    }

    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      const found = studentDB[newPin];
      if (found) {
        setStudent(found);
        setLookupError(false);
        hw.playSound("scan");
      } else {
        setLookupError(true);
        hw.playSound("error");
      }
    }
  }, [pin, hw]);

  const addToOrder = useCallback((item: MenuItem) => {
    setOrder(prev => {
      const existing = prev.find(o => o.id === item.id);
      if (existing) {
        return prev.map(o => o.id === item.id ? { ...o, qty: o.qty + 1 } : o);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeFromOrder = useCallback((itemId: string) => {
    setOrder(prev => prev.filter(o => o.id !== itemId));
  }, []);

  const getTotal = useCallback(() => {
    if (!student) return 0;
    
    let reimbursableMealsApplied = sessionClaimed.has(student.id) ? 1 : 0;
    
    return order.reduce((sum, item) => {
      let itemTotal = 0;
      
      for (let i = 0; i < item.qty; i++) {
        if (item.reimbursable) {
          if (reimbursableMealsApplied === 0) {
            // First reimbursable meal gets the student's eligibility pricing (Free for CEP)
            itemTotal += getItemPrice(item, student.eligibility);
            reimbursableMealsApplied++;
          } else {
            // Any additional reimbursable entrees revert to full A La Carte price
            itemTotal += item.price;
          }
        } else {
          // A La Carte items always charge full price
          itemTotal += item.price;
        }
      }
      
      return sum + itemTotal;
    }, 0);
  }, [order, student]);

  const getLineItemBreakdown = useCallback((itemToCalc: OrderItem, allOrderItems: OrderItem[]) => {
    if (!student) return { label: `$${itemToCalc.price.toFixed(2)}`, total: itemToCalc.price * itemToCalc.qty };
    
    let reimbursableMealsAppliedBefore = sessionClaimed.has(student.id) ? 1 : 0;
    for (const item of allOrderItems) {
      if (item.id === itemToCalc.id) break;
      if (item.reimbursable) {
         reimbursableMealsAppliedBefore += item.qty;
      }
    }
    
    let itemTotal = 0;
    let hasDiscounted = false;
    let hasFullPrice = false;
    
    for (let i = 0; i < itemToCalc.qty; i++) {
        if (itemToCalc.reimbursable) {
          if (reimbursableMealsAppliedBefore === 0) {
            itemTotal += getItemPrice(itemToCalc, student.eligibility);
            hasDiscounted = true;
          } else {
            itemTotal += itemToCalc.price;
            hasFullPrice = true;
          }
          reimbursableMealsAppliedBefore++;
        } else {
          itemTotal += itemToCalc.price;
          hasFullPrice = true;
        }
    }
    
    let label = `$${itemToCalc.price.toFixed(2)}`;
    if (itemToCalc.reimbursable) {
      if (hasDiscounted && hasFullPrice) {
         label = `1×$${getItemPrice(itemToCalc, student.eligibility).toFixed(2)}, ${itemToCalc.qty - 1}×$${itemToCalc.price.toFixed(2)}`;
      } else if (hasDiscounted) {
         label = `$${getItemPrice(itemToCalc, student.eligibility).toFixed(2)}`;
      }
    }
    return { label, total: itemTotal };
  }, [student]);

  const [lastHash, setLastHash] = useState("");

  const processTransaction = useCallback(() => {
    // Simulate SHA-256 Forensic Hash Generation (Demo Mode)
    const hash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setLastHash(hash);
    
    // Check if order contains a reimbursable item and update session claim
    const hasReimbursable = order.some(item => item.reimbursable);
    if (hasReimbursable && student) {
      setSessionClaimed(prev => new Set(prev).add(student.id));
    }
    
    setTransactionComplete(true);
    hw.playSound("success");
    if (isOffline) {
      setOfflineQueue(prev => prev + 1);
    }
    setTimeout(() => {
      setTransactionComplete(false);
      setPin("");
      setStudent(null);
      setOrder([]);
    }, 4500); // Extended for the auditor to read the hash
  }, [isOffline, hw, student, order]);

  const categories = [...new Set(menuItems.map(i => i.category))];
  const filteredItems = menuItems.filter(i => i.category === category);

  // Check for allergen warnings
  const getAllergenWarnings = useCallback((item: MenuItem) => {
    if (!student || student.allergens.length === 0) return [];
    return item.allergens.filter(a => student.allergens.includes(a));
  }, [student]);

  const [focusSecure, setFocusSecure] = useState(false);

  // Handle Demo Director Actions
  useEffect(() => {
    const handleDemoAction = (e: any) => {
      const { autoLoginPin } = e.detail;
      if (autoLoginPin && studentDB[autoLoginPin]) {
        setStudent(studentDB[autoLoginPin]);
        setPin(autoLoginPin);
      }

      if (e.detail?.id === "04" || e.detail?.path === "/pos") {
        setFocusSecure(true);
        setTimeout(() => setFocusSecure(false), 8000);
      }
    };
    window.addEventListener('nutriserve-demo-action', handleDemoAction);

    // Keyboard Mode Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (student) {
        if (e.key === 'Enter' && order.length > 0) {
          processTransaction();
        }
        if (e.key === 'Escape') {
          setOrder([]);
          setStudent(null);
          setPin("");
        }
      } else {
        if (/[0-9]/.test(e.key)) {
          handlePinEntry(e.key);
        }
        if (e.key === 'Backspace') {
          handlePinEntry('back');
        }
        if (e.key === 'Escape') {
          handlePinEntry('clear');
        }
        
        // Demo Hotkeys
        if (e.key === 'F8') {
          e.preventDefault();
          hw.simulateScan(() => {
            setStudent(studentDB["1234"]); 
            setPin("1234");
          });
        }
        if (e.key === 'F9') {
          e.preventDefault();
          hw.simulatePrint();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('nutriserve-demo-action', handleDemoAction);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [student, pin, order, handlePinEntry, processTransaction]);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header title={t.title} subtitle={t.subtitle} />

        <div className="page-content">
          {/* Connection & Sync Status Bar */}
          <div 
            className={focusSecure ? "demo-focus-target" : ""} 
            data-demo-tooltip={lang === 'en' ? "RFP 26-027 Sect 1: Offline transaction capability with automatic synchronization across all 69 campuses." : "Motor de sincronización. Transacciones sin conexión con sincronización automática."}
            style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 16px", marginBottom: "var(--space-md)",
            background: isOffline ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.08)", 
            border: `1px solid ${isOffline ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.2)"}`,
            borderRadius: "var(--radius-md)", fontSize: "0.75rem",
            transition: 'all 0.3s ease',
            boxShadow: isOffline ? "0 0 15px rgba(239, 68, 68, 0.1)" : "none"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {isOffline ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--danger)", fontWeight: 700 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--danger)", animation: "pulse 1s infinite" }} />
                  {t.offlineMode} — {offlineQueue} {t.queued}
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--success)", fontWeight: 600 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", display: "inline-block", animation: "pulse 2s infinite" }} />
                  {t.online}
                </span>
              )}
              <span style={{ color: "var(--text-muted)" }}>|</span>
              <span style={{ color: "var(--text-secondary)" }}>📡 {t.lastSync}</span>
              <span style={{ color: "var(--text-muted)" }}>|</span>
              <span style={{ color: "var(--text-secondary)" }}>💾 {t.localCache}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "6px" }}>
                {t.keyboardMode.active}
              </span>
              <button 
                onClick={() => {
                   setIsOffline(!isOffline);
                }}
                className="demo-director-btn"
                style={{ 
                  background: isOffline ? "var(--success)" : "rgba(239, 68, 68, 0.1)", 
                  color: isOffline ? "white" : "var(--danger)", 
                  border: `1px solid ${isOffline ? "var(--success)" : "rgba(239, 68, 68, 0.2)"}`,
                  padding: "6px 14px", borderRadius: "100px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 800,
                  transition: "all 0.2s ease"
                }}
              >
                {isOffline ? `⚡ ${t.reconnect}` : `📡 ${t.disconnect}`}
              </button>
            </div>
          </div>

          {/* Transaction Complete Overlay */}
          {transactionComplete && (
            <div style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(12, 29, 63, 0.95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(12px)",
            }}>
              <div style={{ textAlign: "center", animation: "fadeIn 0.3s ease", padding: "var(--space-2xl)", background: "var(--bg-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--accent)", boxShadow: "var(--shadow-lg)", maxWidth: 600 }}>
                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>✅</div>
                <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--success)" }}>{t.transactionComplete}</h2>
                <div style={{ margin: "1.5rem 0", padding: "1rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "var(--radius-md)", border: "1px dashed rgba(16, 185, 129, 0.3)" }}>
                   <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", fontWeight: 600 }}>
                    {t.mealRecorded} {student?.name}
                  </p>
                  <div style={{ marginTop: "1rem" }}>
                    <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>NutriServe Forensic Log ID (SHA-256)</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--accent)", fontFamily: "var(--font-mono)", wordBreak: "break-all", background: "rgba(0,0,0,0.2)", padding: "8px", borderRadius: 4 }}>
                      {lastHash || "6f947e8c3a2b1f8d9c0e4a5b6f708192a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p"}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center" }}>
                  <button className="btn btn-primary btn-lg" onClick={() => { setTransactionComplete(false); setPin(""); setStudent(null); setOrder([]); setLookupError(false); }}>
                    {t.nextStudent}
                  </button>
                  <button className="btn btn-ghost" onClick={() => window.print()}>
                    🖨️ {t.printReceipt}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Medical Override Overlay */}
          {overrideItem && (
            <div style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(12, 29, 63, 0.95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(12px)",
            }}>
              <div style={{ textAlign: "center", animation: "fadeIn 0.2s ease", padding: "var(--space-2xl)", background: "var(--bg-card)", borderRadius: "var(--radius-xl)", border: "2px solid var(--danger)", boxShadow: "0 0 40px rgba(239, 68, 68, 0.3)", maxWidth: 500 }}>
                <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>⚠️</div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--danger)" }}>{t.medicalLockout}</h2>
                <div style={{ padding: "var(--space-md)", background: "var(--danger-bg)", borderRadius: "var(--radius-md)", margin: "var(--space-lg) 0" }}>
                  <p style={{ color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 600 }}>{student?.name}</p>
                  <p style={{ color: "var(--danger)", fontWeight: 700, marginTop: 4 }}>{t.allergenAlert}: {getAllergenWarnings(overrideItem).join(", ")}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 8 }}>Item: {overrideItem.name}</p>
                </div>
                <div style={{ marginBottom: "var(--space-lg)" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 8 }}>{t.supervisorOverride}</p>
                  <input 
                    type="password" 
                    placeholder="PIN" 
                    value={overridePin}
                    onChange={(e) => {
                      setOverridePin(e.target.value);
                      setOverrideError(false);
                    }}
                    style={{ 
                      background: "var(--bg-input)", 
                      border: overrideError ? "1px solid var(--danger)" : "1px solid var(--border)", 
                      padding: "12px", 
                      borderRadius: "var(--radius-md)", 
                      color: "white", 
                      textAlign: "center", 
                      fontSize: "1.2rem", 
                      letterSpacing: 8, 
                      width: 120 
                    }} 
                  />
                  {overrideError && (
                    <p style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: 8 }}>Invalid Supervisor PIN</p>
                  )}
                </div>
                <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center" }}>
                  <button className="btn btn-ghost" onClick={() => { setOverrideItem(null); setOverridePin(""); setOverrideError(false); }}>
                    {t.cancel}
                  </button>
                  <button className="btn btn-danger" onClick={() => { 
                    if (overridePin === "7777") {
                      addToOrder(overrideItem); 
                      setOverrideItem(null); 
                      setOverridePin("");
                      setOverrideError(false);
                    } else {
                      setOverrideError(true);
                    }
                  }}>
                    {t.allowOverride}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Student Lookup & PoS Grid */}
          <div className="pos-grid">
            {/* Left: Student + Menu */}
            <div>
              {/* Student Lookup */}
              <div 
                className={`student-lookup ${focusSecure ? "demo-focus-target" : ""}`} 
                data-demo-tooltip={lang === 'en' ? "RFP 26-027 Sect 1: POS Hardware integration (Touch screens, on-screen keyboards, PIN pads, handheld card readers)." : "Autenticación segura: Teclados en pantalla, PIN, códigos de barras o RFID."}
                style={{ transition: 'all 0.3s ease' }}
              >
                <div className="card-header">
                  <div className="card-title">👨‍🎓 {t.studentLookup}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.enterPin}</span>
                    <button 
                      onClick={() => setKeyboardMode(!keyboardMode)}
                      style={{ 
                        fontSize: "0.6rem", padding: "2px 8px", borderRadius: 4,
                        background: keyboardMode ? "var(--accent)" : "var(--bg-elevated)",
                        color: keyboardMode ? "var(--primary-dark)" : "var(--text-muted)",
                        border: "1px solid var(--border)", cursor: "pointer", fontWeight: 700
                      }}>
                      {keyboardMode ? t.keyboardModeOn : t.keyboardModeOff}
                    </button>
                  </div>
                </div>

                {!student ? (
                  <div style={{ display: "flex", gap: "var(--space-lg)", alignItems: "flex-start" }}>
                    {/* PIN Display */}
                    <div style={{ flex: 1 }}>
                      <div className={focusSecure ? "animate-pulse-gold" : ""} style={{
                        display: "flex", gap: 12, justifyContent: "center",
                        marginBottom: "var(--space-md)"
                      }}>
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} style={{
                            width: 56, height: 64,
                            background: pin[i] ? "var(--primary-glow)" : "var(--bg-input)",
                            border: `2px solid ${pin[i] ? "var(--primary-light)" : "var(--border)"}`,
                            borderRadius: "var(--radius-md)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "1.5rem", fontWeight: 700,
                            color: "var(--text-primary)",
                            transition: "all 0.15s ease",
                          }}>
                            {pin[i] ? "●" : ""}
                          </div>
                        ))}
                      </div>

                      {lookupError && (
                        <div style={{
                          textAlign: "center", padding: "var(--space-sm)",
                          background: "var(--danger-bg)", borderRadius: "var(--radius-sm)",
                          color: "var(--danger)", fontSize: "0.85rem", fontWeight: 600,
                          marginBottom: "var(--space-md)"
                        }}>
                          ⚠️ {t.studentNotFound}
                        </div>
                      )}

                      {/* Number Pad */}
                      <div style={{
                        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 8, maxWidth: 280, margin: "0 auto"
                      }}>
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"].map(key => (
                          <button key={key} onClick={() => handlePinEntry(key)} style={{
                            padding: "12px",
                            background: key === "clear" ? "var(--danger-bg)" : key === "back" ? "var(--warning-bg)" : "var(--bg-elevated)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-sm)",
                            color: key === "clear" ? "var(--danger)" : key === "back" ? "var(--warning)" : "var(--text-primary)",
                            fontSize: key === "clear" || key === "back" ? "0.7rem" : "1.2rem",
                            fontWeight: 700, cursor: "pointer",
                            fontFamily: "var(--font-sans)",
                            transition: "all 0.1s ease",
                          }}>
                            {key === "clear" ? (lang === 'es' ? t.numpad.clear : "CLEAR") : key === "back" ? t.numpad.back : key}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Scan info */}
                    <div 
                      onClick={() => {
                        hw.simulateScan(() => {
                          setStudent(studentDB["1234"]); 
                          setPin("1234");
                        });
                      }}
                      style={{
                        textAlign: "center", padding: "var(--space-lg)",
                        background: hw.status.scanner === "searching" ? "var(--success-bg)" : "var(--bg-input)", 
                        borderRadius: "var(--radius-md)",
                        border: hw.status.scanner === "searching" ? "1px solid var(--success)" : "1px dashed var(--border)", 
                        minWidth: 160, cursor: "pointer", transition: "all 0.3s ease"
                      }}>
                      <div style={{ fontSize: "2rem", marginBottom: 8 }}>{hw.status.scanner === "searching" ? "🛰️" : "📸"}</div>
                      <div style={{ fontSize: "0.8rem", color: hw.status.scanner === "searching" ? "var(--success)" : "var(--text-muted)", fontWeight: hw.status.scanner === "searching" ? 700 : 400, whiteSpace: "pre-wrap" }}>
                        {hw.status.scanner === "searching" ? t.rfidScanning : t.scanId.replace(" ", "\n")}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Student Found
                  <div className="student-info">
                    <div className="student-avatar">{student.photo}</div>
                    <div className="student-details" style={{ flex: 1 }}>
                      <h3>{student.name}</h3>
                      <p>ID: {student.id} • {student.grade} • {student.campus}</p>
                      {student.allergens.length > 0 && (
                        <div style={{
                          marginTop: 4, display: "flex", gap: 4, flexWrap: "wrap"
                        }}>
                          {student.allergens.map(a => (
                            <span key={a} style={{
                              background: "var(--danger-bg)", color: "var(--danger)",
                              padding: "1px 8px", borderRadius: 12, fontSize: "0.7rem",
                              fontWeight: 600, border: "1px solid rgba(239,68,68,0.2)"
                            }}>⚠️ {a}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                          <span className="badge free" style={{ fontSize: "0.8rem", padding: "4px 14px", background: "var(--success)", color: "white" }}>
                            {t.mealEligible}
                          </span>
                          <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                            {student.eligibility === "free" && (
                              <span style={{ 
                                fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", 
                                background: "rgba(251, 222, 5, 0.2)", color: "var(--accent)", 
                                borderRadius: 4, border: "1px solid var(--accent)" 
                              }}>CEP ELIGIBLE</span>
                            )}
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "2px 6px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", borderRadius: 4, border: "1px solid var(--border)" }}>NSLP</span>
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "2px 6px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", borderRadius: 4, border: "1px solid var(--border)" }}>SBP</span>
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "2px 6px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", borderRadius: 4, border: "1px solid var(--border)" }}>CACFP</span>
                          </div>
                        </div>
                      {student.eligibility === "paid" && (
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {t.balance}: <strong style={{ color: student.balance < 0 ? "var(--danger)" : "var(--accent)" }}>${student.balance.toFixed(2)}</strong>
                            {student.balance < 0 && (
                              <span className="badge" style={{ background: "var(--danger-bg)", color: "var(--danger)", border: "1px solid rgba(239, 68, 68, 0.3)", fontSize: "0.6rem" }}>
                                {lang === 'es' ? 'SALDO NEGATIVO' : 'NEGATIVE BALANCE'}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <button onClick={() => { setPin(""); setStudent(null); setOrder([]); setLookupError(false); }}
                      className="btn btn-ghost btn-sm">{t.newStudent}</button>
                  </div>
                )}
              </div>

              {/* Menu Categories */}
              {student && (
                <>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", 
                    marginBottom: "var(--space-md)", flexWrap: "wrap"
                  }}>
                    <div 
                      data-demo-tooltip={lang === 'en' ? "RFP 26-027 Sect 1: Low/negative balance tracking and notifications. Smart compliance logic enforcing federal Offer vs. Serve guidelines." : "Lógica inteligente de Oferta vs. Servir. Valida comidas reembolsables."}
                      style={{
                      fontSize: "0.7rem", fontWeight: 800, color: "var(--accent)", 
                      background: "rgba(251, 222, 5, 0.08)", padding: "4px 12px", 
                      borderRadius: "20px", border: "1px solid var(--accent)",
                      display: "flex", alignItems: "center", gap: "6px",
                      cursor: "help"
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s infinite" }}></span>
                      {t.ovsCompliant}
                    </div>
                    <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                      {categories.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)}
                          className={`btn ${category === cat ? "btn-primary" : "btn-ghost"} btn-sm`}>
                          {t.categories[cat as keyof typeof t.categories] || cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Menu Grid */}
                  <div className="pos-menu-grid">
                    {filteredItems.map(item => {
                      const allergenWarnings = getAllergenWarnings(item);
                      const price = getItemPrice(item, student.eligibility);
                      return (
                        <div key={item.id} className="pos-menu-item"
                          onClick={() => {
                             if (allergenWarnings.length > 0) {
                               setOverrideItem(item);
                             } else {
                               addToOrder(item);
                             }
                          }}
                          style={{
                            opacity: allergenWarnings.length > 0 ? 0.4 : 1,
                            cursor: allergenWarnings.length > 0 ? "not-allowed" : "pointer",
                            borderColor: allergenWarnings.length > 0 ? "rgba(239, 68, 68, 0.4)" : "var(--border)",
                          }}>
                          <span className="item-emoji">{item.emoji}</span>
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">
                            {price === 0 ? t.cepFree : `$${price.toFixed(2)}`}
                          </span>
                          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                            {item.calories} cal
                          </span>
                          {allergenWarnings.length > 0 && (
                            <span style={{ fontSize: "0.65rem", color: "var(--danger)" }}>
                              ⚠️ {allergenWarnings.join(", ")}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Right: Order Panel */}
            <div className="order-panel">
              <div className="order-header">
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>🧾 {t.currentOrder}</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {order.length} {order.length !== 1 ? t.items : t.item}
                </span>
              </div>

              <div className="order-items">
                {order.length === 0 ? (
                  <div style={{
                    textAlign: "center", padding: "var(--space-2xl) var(--space-lg)",
                    color: "var(--text-muted)", fontSize: "0.85rem"
                  }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-md)", opacity: 0.3 }}>🍽️</div>
                    {student ? t.selectItems : t.lookupToStart}
                  </div>
                ) : (
                  order.map(item => (
                    <div key={item.id} className="order-item">
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          {item.emoji} {item.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {t.qty}: {item.qty} × {getLineItemBreakdown(item, order).label}
                          <span style={{ marginLeft: 8, color: "var(--accent)", fontWeight: 700 }}>[{getProgramAcronym(item.category)}]</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                          ${getLineItemBreakdown(item, order).total.toFixed(2)}
                        </span>
                        <button onClick={() => removeFromOrder(item.id)} style={{
                          width: 24, height: 24, borderRadius: "50%",
                          background: "var(--danger-bg)", border: "none",
                          color: "var(--danger)", cursor: "pointer",
                          fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center"
                        }}>×</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {order.length > 0 && student && (
                <>
                  <div className="order-total">
                    <div className="total-row">
                      <span style={{ color: "var(--text-muted)" }}>{t.subtotal}</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                    {student.eligibility !== "paid" && (
                      <div className="total-row">
                        <span style={{ color: "var(--text-muted)" }}>{t.mealProgram}</span>
                        <span className={`badge ${student.eligibility}`}>{student.eligibility}</span>
                      </div>
                    )}
                    <div className="total-row grand">
                      <span>{t.totalDue}</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="btn btn-ghost" onClick={() => setOrder([])}>
                      {t.cancel}
                    </button>
                    <button 
                      className="btn btn-accent btn-lg" 
                      onClick={processTransaction} 
                      style={{ flex: 2 }}
                      data-demo-tooltip={lang === 'en' ? "RFP 26-027 Sect 1: Supports Federal Meal Programs (SBP/NSLP/CACFP/ASSP/SSO), CEP and Non-CEP sites, and payment processing." : "Procesamiento de pagos y programas federales (NSLP/CEP)." }
                    >
                      {getTotal() === 0 ? `✅ ${t.completeCEP}` : `💳 ${t.process} $${getTotal().toFixed(2)}`}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Hardware Status Indicators */}
          <div className="card" style={{ marginTop: "var(--space-lg)", padding: "var(--space-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>{t.hardwareHealth.title}</div>
              <div style={{ display: "flex", gap: "var(--space-xl)", alignItems: "center" }}>
                {[
                  { label: t.hardwareHealth.printer, icon: "🖨️", status: hw.status.printer },
                  { label: t.hardwareHealth.scanner, icon: "📸", status: hw.status.scanner },
                  { label: t.hardwareHealth.pinpad, icon: "⌨️", status: hw.status.pinpad },
                ].map((hwItem, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "1rem" }}>{hwItem.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{hwItem.label}</div>
                      <div style={{ 
                        fontSize: "0.7rem", 
                        fontWeight: 700, 
                        color: hwItem.status === "connected" ? "var(--success)" : hwItem.status === "error" ? "var(--danger)" : "var(--text-muted)" 
                      }}>
                        ● {hwItem.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div style={{ height: 24, width: 1, background: "var(--border)", margin: "0 8px" }} />
                
                <div style={{ display: "flex", gap: 6 }}>
                  <button 
                    onClick={() => hw.simulateScan(() => {
                      setStudent(studentDB["1234"]); 
                      setPin("1234");
                    })}
                    style={{ 
                      padding: "4px 8px", borderRadius: 4, border: "1px solid var(--border)",
                      background: "var(--bg-elevated)", color: "var(--text-secondary)",
                      fontSize: "0.6rem", fontWeight: 700, cursor: "pointer"
                    }}>
                    SIM SCAN [F8]
                  </button>
                  <button 
                    onClick={() => hw.simulatePrint()}
                    style={{ 
                      padding: "4px 8px", borderRadius: 4, border: "1px solid var(--border)",
                      background: "var(--bg-elevated)", color: "var(--text-secondary)",
                      fontSize: "0.6rem", fontWeight: 700, cursor: "pointer"
                    }}>
                    SIM PRINT [F9]
                  </button>
                </div>

                <div style={{ height: 24, width: 1, background: "var(--border)", margin: "0 8px" }} />
                
                <button 
                  onClick={() => hw.connectRealHardware()}
                  style={{ 
                    padding: "6px 14px", borderRadius: 6, border: "1px solid var(--accent)",
                    background: "rgba(251, 222, 5, 0.05)", color: "var(--accent)",
                    fontSize: "0.7rem", fontWeight: 700, cursor: "pointer"
                  }}>
                  {hw.serialSupported ? "🔌 CONNECT ZEBRA" : "⚠️ USB NOT SUPPORTED"}
                </button>
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                {t.keyboardMode.hint}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

