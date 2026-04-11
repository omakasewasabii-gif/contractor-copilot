"use client";

import { useEffect } from "react";

export default function AntiTheft({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Massive Console Warning
    console.log(
      "%cSTOP!",
      "color: red; font-size: 60px; font-weight: bold; text-shadow: 2px 2px 0 #000;"
    );
    console.log(
      "%cThis is a proprietary demonstration environment for NutriServe (Contractor Copilot). Unauthorized access, scraping, reverse engineering, or reproduction of this software architecture is strictly prohibited and legally monitored.",
      "font-size: 18px; font-weight: bold;"
    );

    // 2. Disable Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 3. Disable DevTools Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+I / Cmd+Opt+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+J / Cmd+Opt+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
      }

      // Prevent Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }

      // Removed copy prevention to restore ADA compliance/legitimate use cases
    };

    // Attach listeners
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
