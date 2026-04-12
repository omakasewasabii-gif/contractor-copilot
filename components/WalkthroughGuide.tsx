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
      title: "Welcome to NutriServe",
      content: "This brief walkthrough will guide you through the platform's core functionalities. You'll learn how this system streamlines cafeteria operations while remaining 100% compliant with state and federal regulations.",
      skipBeacon: true,
    },
    {
      target: ".sidebar",
      placement: "right",
      title: "Navigation Overview",
      content: "This is the master navigation hub. From here, administrators and staff can fluidly transition between Point of Sale, Analytics, Campuses, and Medical Safety configurations with zero latency.",
    },
    {
      target: ".student-lookup",
      placement: "right",
      title: "Step 1: Student Lookup",
      content: "Let's start the checkout flow. Staff can instantly pull up student records by scanning a barcode, searching by name, or typing a student ID directly into the secure PIN pad.",
    },
    {
      target: ".pos-menu-grid",
      placement: "top",
      title: "Step 2: Interactive Visual Menu",
      content: "Cashiers tap these high-visibility, category-driven menu items to build the tray. You can toggle between Breakfast, Lunch, and Snack depending on the master cycle menu.",
    },
    {
      target: ".demo-focus-target",
      placement: "bottom",
      title: "Important Features: Offline Capability",
      content: "Critical feature: The Offline Synchronization engine. Even if the school loses network connectivity, the cafeteria continues processing meals. When back online, data syncs perfectly to the district ledger.",
    },
    {
      target: ".btn-accent.btn-lg",
      placement: "left",
      title: "Final Steps: Frictionless Checkout",
      content: "Once the meal meets USDA reimbursement standards, click here to finalize the transaction. The system automatically processes payments or logs it as a CEP free meal.",
    },
    {
      target: "body",
      placement: "center",
      title: "Walkthrough Complete!",
      content: "You've completely processed a unified, compliant transaction. Take control using the Executive Mission Control overlay at any time to simulate hardware actions like barcode scans and allergy lockouts.",
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
