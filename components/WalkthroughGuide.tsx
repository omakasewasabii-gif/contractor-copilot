"use client";

import { useEffect, useState } from "react";
import { Joyride, EventData, STATUS, Step } from "react-joyride";
import { useRouter, usePathname } from "next/navigation";

export default function WalkthroughGuide() {
  const [run, setRun] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // We want to run this primarily on the POS page.
  useEffect(() => {
    // Only check once mounted to avoid hydration errors
    const hasSeenTour = sessionStorage.getItem("nutriserve_tour_complete");
    if (!hasSeenTour) {
      // Delay slightly so DOM is ready
      setTimeout(() => {
        if (pathname !== "/pos") {
           // Provide an option to start tour if they are on another page?
           // Actually, the button will start it! 
        }
      }, 1000);
    }
    
    // Listen for custom event to start tour
    const startTour = () => {
      // If we aren't on POS, route there first
      if (window.location.pathname !== "/pos") {
         router.push("/pos");
         setTimeout(() => setRun(true), 1500);
      } else {
         setRun(true);
      }
    };
    
    window.addEventListener("start-demo-walkthrough", startTour);
    return () => window.removeEventListener("start-demo-walkthrough", startTour);
  }, [pathname, router]);

  const steps: Step[] = [
    {
      target: "body",
      placement: "center",
      title: "NutriServe: EPISD RFP 26-027",
      content: "Welcome. Over the next 90 seconds, you'll see exactly how NutriServe fulfills your requirements. Our platform provides unified support for SBP, NSLP, CACFP, ASSP, and SSO programs with seamless architecture engineered specifically for your 69 campuses.",
      skipBeacon: true,
    },
    {
      target: ".sidebar",
      placement: "right",
      title: "Data Management & Back of House",
      content: "The Command Hub. Here, administrators configure Role-Based Access Controls (RBAC), Data Encryption strategies, and automated Database Backups/Disaster Recovery constraints. It hosts the automated reporting engine for Direct Certification, Identifed Student Percentages (ISP), and comprehensive revenue tracking.",
    },
    {
      target: ".student-lookup",
      placement: "right",
      title: "Hardware Agnostic & Identity",
      content: "Seamless integration with touch screen interfaces, physical POS keyboards, PIN pads, and handheld card readers. The engine instantly queries the central database, managing meal application status and delivering live low/negative balance tracking with discrete staff notifications.",
    },
    {
      target: ".pos-grid",
      placement: "center",
      title: "Cycle Menus & Dietary Safety",
      content: "Our deep Back-of-House integration pushes cycle menus, nutritional breakdowns, and recipe development directly to the POS. Real-time allergen tracking prevents cross-contamination, all mirrored on the Parent Portal for 100% transparency.",
    },
    {
      target: ".sync-status-bar",
      placement: "bottom",
      title: "Offline Transaction Capability",
      content: "Uninterrupted Execution. If internet connectivity drops, the POS immediately shifts to secure offline mode. Transactions cache locally with military-grade encryption and trigger automatic synchronization the millisecond the network is restored.",
    },
    {
      target: ".order-panel",
      placement: "left",
      title: "CEP & Payment Processing",
      content: "The ledger automatically bridges CEP and Non-CEP site data. We natively process in-person payments (check, debit, credit) alongside the Online Payment Portal, producing real-time daily participation logs and meal equivalency reports.",
    },
    {
      target: "body",
      placement: "center",
      title: "Training, Migration & Rollout",
      content: "Software is only half the equation. Our phased rollout for all 69 EPISD sites includes full historical data migration, hands-on onsite/virtual training, robust digital guides, and a dedicated local Account Manager backed by our Help Desk.",
    }
  ];

  const handleJoyrideCallback = (data: EventData) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      sessionStorage.setItem("nutriserve_tour_complete", "true");
    }
  };

  return (
    <Joyride
      onEvent={handleJoyrideCallback}
      continuous
      run={run}
      scrollToFirstStep
      steps={steps}
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
