// frontend/app/layout.tsx

import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // <-- 1. COMENTA O BORRA ESTA LÍNEA
import "./styles/globals.css";

// const inter = Inter({ subsets: ["latin"] }); // <-- 2. COMENTA O BORRA ESTA LÍNEA

export const metadata: Metadata = {
  title: "EmotionAI | XLNet Classifier",
  description: "Real-time emotion classification in text using a fine-tuned XLNet model.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 3. BORRA className={inter.className} DE AQUÍ */}
      <body>{children}</body>
    </html>
  );
}