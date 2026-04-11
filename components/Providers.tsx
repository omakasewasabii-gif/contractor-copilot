"use client";

import { ToastProvider } from "@/components/Toast";
import LoginGate from "@/components/LoginGate";
import { LanguageProvider } from "@/components/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>
        <LoginGate>{children}</LoginGate>
      </ToastProvider>
    </LanguageProvider>
  );
}
