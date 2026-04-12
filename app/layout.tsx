import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import AntiTheft from "@/components/AntiTheft";
import Teleprompter from "@/components/Teleprompter";



export const metadata: Metadata = {
  title: "NutriServe POS — EPISD Food & Nutrition Services",
  description: "Comprehensive Point of Sale and Nutrition Management System for El Paso Independent School District. Supporting 69 campuses and 48,000+ students.",
  keywords: "school nutrition, POS, point of sale, EPISD, El Paso, food service, USDA, TDA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <AntiTheft>
            {children}
          </AntiTheft>
          <Teleprompter />
        </Providers>
      </body>
    </html>
  );
}

