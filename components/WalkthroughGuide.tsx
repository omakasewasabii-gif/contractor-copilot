"use client";

import { useEffect, useState } from "react";
import { Joyride, EventData, STATUS, Step } from "react-joyride";
import { useRouter, usePathname } from "next/navigation";

type RouteStep = Step & { route: string };

const steps: RouteStep[] = [
  {
    target: "body",
    placement: "center",
    title: "NutriServe: The El Paso Infrastructure",
    content: "Welcome to NutriServe. This isn't a generic software mockup—this is a live, production-ready environment engineered specifically for your 69 campuses. We bridge SBP, NSLP, CACFP, and SSO programs into a single, unified state machine. The purpose? To eliminate data silos and guarantee 100% audit compliance for the district from day one.",
    skipBeacon: true,
    route: "/",
  },
  {
    target: ".sidebar",
    placement: "right",
    title: "Mission Control: The Operator's Hub",
    content: "This is where your administrators live. We've centralized Role-Based Access Controls, Data Encryption, and automated Direct Certification ingestion. By putting all critical operational telemetry on one screen, your nutrition directors can proactively identify funding gaps and manage Identified Student Percentages (ISP) without hunting through spreadsheets.",
    route: "/",
  },
  {
    target: ".student-lookup",
    placement: "right",
    title: "Hardware-Agnostic Terminal",
    content: "Our POS architecture is universally adaptable. Whether you use touch screens, physical keyboards, or Zebra scanners, the terminal instantly communicates with the central database. It provides cashiers with immediate meal application status and balance data, drastically accelerating line speed while maintaining absolute data integrity.",
    route: "/pos",
  },
  {
    target: ".pos-grid",
    placement: "center",
    title: "Deterministic Allergen Intervention",
    content: "Student safety is our highest liability control. All cycle menus and recipes push directly to the POS. When a student scans in, any detected allergens instantly trigger a secure staff notification—preventing cross-contamination before the meal leaves the line. This protects both the student and the district.",
    route: "/pos",
  },
  {
    target: ".sync-status-bar",
    placement: "bottom",
    title: "Zero-Downtime Resilience",
    content: "What happens when campus Wi-Fi drops? The terminal immediately falls back to secure offline mode. Transactions are cached using military-grade encryption and automatically sync the millisecond the network is restored. Your café managers never have to halt service or resort to paper logs during an outage.",
    route: "/pos",
  },
  {
    target: "body",
    placement: "center",
    title: "Unified Financial Ledger",
    content: "We bridge CEP and Non-CEP site data seamlessly. The ledger processes in-person payments alongside the Online Portal, instantly reconciling debit, credit, and cash transactions. This produces highly accurate daily participation logs and meal equivalency reports for immediate financial visibility.",
    route: "/payments",
  },
  {
    target: "body",
    placement: "center",
    title: "Dynamic Menu Planning",
    content: "This is our drag-and-drop Cycle Manager. Back-of-house staff can sequence full weekly menus—from Chicken Tenders to Beef Tacos. As menus are built, USDA nutritional compliance is auto-validated, immediately exposing ingredient overlaps or compliance gaps before food is even ordered.",
    route: "/menus",
  },
  {
    target: "body",
    placement: "center",
    title: "Ordering & Production Forecasting",
    content: "Eliminate waste with Suggestive Ordering. NutriServe's predictive engine forecasts production based on historical cycle menus, automatically generating electronic purchase orders (POs) for seamless vendor fulfillment.",
    route: "/inventory",
  },
  {
    target: "body",
    placement: "center",
    title: "Parent Portal: Community Transparency",
    content: "Parental trust is a non-negotiable metric. The Parent Portal mirrors the live menus from the POS in real-time. Parents can track their child's transaction history, load balances, and review live nutritional/allergen data from anywhere, significantly reducing inbound support calls to the district office.",
    route: "/portal",
  },
  {
    target: "body",
    placement: "center",
    title: "State Reimbursement & Compliance",
    content: "The final layer is revenue realization. Our reporting engine conducts transaction-level audits, automatically formatting data for state reimbursement claims. Every operational action taken across the district funnels into this interface, delivering bulletproof, audit-ready federal reporting with a single click.",
    route: "/reports",
  }
];

export default function WalkthroughGuide() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize checks
  useEffect(() => {
    const hasSeenTour = sessionStorage.getItem("nutriserve_tour_complete");
    if (!hasSeenTour) {
      setTimeout(() => {
        // Option to conditionally start here
      }, 1000);
    }
    
    const startTour = () => {
      setStepIndex(0);
      if (pathname !== "/") {
         router.push("/");
         setTimeout(() => setRun(true), 800);
      } else {
         setRun(true);
      }
    };
    
    window.addEventListener("start-demo-walkthrough", startTour);
    return () => window.removeEventListener("start-demo-walkthrough", startTour);
  }, [pathname, router]);

  // Handle cross-page tour resumption
  useEffect(() => {
    if (!run && stepIndex > 0 && stepIndex < steps.length) {
      if (steps[stepIndex].route === pathname) {
        const timer = setTimeout(() => {
           setRun(true);
        }, 1500); // 1.5s buffer to explicitly guarantee DOM hydration before target binding
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, stepIndex, run]);

  const handleJoyrideCallback = (data: EventData) => {
    const { status, type, action, index } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      setStepIndex(0);
      sessionStorage.setItem("nutriserve_tour_complete", "true");
      return;
    }

    if (type === "step:after") {
      let nextStepIndex = index;
      if (action === "next") {
        nextStepIndex = index + 1;
      } else if (action === "prev") {
        nextStepIndex = index - 1;
      }

      if (nextStepIndex >= 0 && nextStepIndex < steps.length) {
        const nextRoute = steps[nextStepIndex].route;
        
        if (nextRoute !== pathname) {
          setRun(false); // Halt the tour immediately for navigation
          setStepIndex(nextStepIndex); // Pre-load the next index
          setTimeout(() => {
             router.push(nextRoute);
          }, 100);
        } else {
          setStepIndex(nextStepIndex);
        }
      }
    } else if (type === "error:target_not_found") {
       // If it fails to find the target on page load, wait a moment and try again by toggling run state
       setRun(false);
       setTimeout(() => setRun(true), 1000);
    }
  };

  return (
    <Joyride
      onEvent={handleJoyrideCallback}
      continuous
      run={run}
      stepIndex={stepIndex}
      scrollToFirstStep
      steps={steps as Step[]}
      styles={{
        buttonPrimary: {
          backgroundColor: "var(--accent)",
          color: "#0a1628",
          fontWeight: 700,
          borderRadius: "8px",
        },
        buttonBack: {
          color: "#666",
        },
        tooltip: {
          borderRadius: "12px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        },
        tooltipTitle: {
          fontSize: "1.2rem",
          fontWeight: 800,
          color: "var(--primary)",
        }
      }}
      options={{
        zIndex: 10000,
        primaryColor: "#0a1628",
        textColor: "#333",
        backgroundColor: "#ffffff",
        overlayColor: "rgba(0, 0, 0, 0.6)",
        showProgress: true,
        buttons: ["back", "primary", "skip", "close"],
      }}
    />
  );
}
