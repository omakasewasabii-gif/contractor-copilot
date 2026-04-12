"use client";

import { useEffect, useState } from "react";
import { Joyride, EventData, STATUS, Step } from "react-joyride";
import { useRouter, usePathname } from "next/navigation";

type RouteStep = Step & { route: string };

const steps: RouteStep[] = [
  {
    target: "body",
    placement: "center",
    title: "NutriServe: EPISD RFP 26-027",
    content: "Welcome. You'll see exactly how NutriServe fulfills your requirements. Our platform provides unified support for SBP, NSLP, CACFP, ASSP, and SSO programs with seamless architecture engineered specifically for your 69 campuses.",
    skipBeacon: true,
    route: "/",
  },
  {
    target: ".sidebar",
    placement: "right",
    title: "Data Management & Back of House",
    content: "The Command Hub. Here, administrators configure Role-Based Access Controls (RBAC), Data Encryption strategies, and automated Database Backups/Disaster Recovery constraints. It hosts the automated reporting engine for Direct Certification, Identified Student Percentages (ISP), and comprehensive revenue tracking.",
    route: "/",
  },
  {
    target: ".student-lookup",
    placement: "right",
    title: "Hardware Agnostic & Identity",
    content: "Seamless integration with touch screen interfaces, physical POS keyboards, PIN pads, and handheld card readers. The engine instantly queries the central database, managing meal application status and delivering live low/negative balance tracking with discrete staff notifications.",
    route: "/pos",
  },
  {
    target: ".pos-grid",
    placement: "center",
    title: "Cycle Menus & Dietary Safety",
    content: "Our deep Back-of-House integration pushes cycle menus, nutritional breakdowns, and recipe development directly to the POS. Real-time allergen tracking prevents cross-contamination, all mirrored on the Parent Portal for 100% transparency.",
    route: "/pos",
  },
  {
    target: ".sync-status-bar",
    placement: "bottom",
    title: "Offline Transaction Capability",
    content: "Uninterrupted Execution. If internet connectivity drops, the POS immediately shifts to secure offline mode. Transactions cache locally with military-grade encryption and trigger automatic synchronization the millisecond the network is restored.",
    route: "/pos",
  },
  {
    target: ".order-panel",
    placement: "left",
    title: "CEP & Payment Processing",
    content: "The ledger automatically bridges CEP and Non-CEP site data. We natively process in-person payments (check, debit, credit) alongside the Online Payment Portal, producing real-time daily participation logs and meal equivalency reports.",
    route: "/pos",
  },
  {
    target: "body",
    placement: "center",
    title: "Inventory & Supply Chain Integration",
    content: "Perpetual Inventory & FIFO Protocol. NutriServe tracks real-time depletion and expiration dates, embedding direct Supply Chain APIs to ingest supplier catalogs (US Foods/Sysco) and run automated vendor cost analysis.",
    route: "/inventory",
  },
  {
    target: "body",
    placement: "center",
    title: "Eligibility & Verification Reporting",
    content: "Back of House Automation. The Reports engine automatically aggregates District-wide transaction logs to process Direct Certification and ISP ratios. Data connects securely to Texas state validation tools without manual batch intervention.",
    route: "/reports",
  },
  {
    target: "body",
    placement: "center",
    title: "Parent Portal Transparency",
    content: "Parental Trust perfectly executed. Custom Parent Portals sync live cycle menus and track dietary allergens in real-time, matching precisely what operators see at the POS. Full nutritional accountability.",
    route: "/portal",
  },
  {
    target: "body",
    placement: "center",
    title: "Training, Migration & Rollout",
    content: "Software is only half the equation. Our phased rollout for all 69 EPISD sites includes full historical data migration, hands-on onsite/virtual training, robust digital guides, and a dedicated local Account Manager backed by our Help Desk.",
    route: "/",
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
        }, 600); // Allow DOM animations/hydration to settle
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, stepIndex, run, steps]);

  const handleJoyrideCallback = (data: EventData) => {
    const { status, type, action, index } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      setStepIndex(0);
      sessionStorage.setItem("nutriserve_tour_complete", "true");
      return;
    }

    if (type === "step:after" || type === "error:target_not_found") {
      let nextStepIndex = index;
      if (action === "next") {
        nextStepIndex = index + 1;
      } else if (action === "prev") {
        nextStepIndex = index - 1;
      }

      if (nextStepIndex >= 0 && nextStepIndex < steps.length) {
        setStepIndex(nextStepIndex);
        
        const nextRoute = steps[nextStepIndex].route;
        if (nextRoute !== pathname) {
          setRun(false); // Halt the tour immediately for navigation
          router.push(nextRoute);
        }
      }
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
