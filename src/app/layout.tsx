import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from "./components/NavigationWrapper";

export const metadata: Metadata = {
  title: "Braydon Johnston | Portfolio",
  description: "Full-stack developer passionate about creating beautiful and functional web applications",
  keywords: ["developer", "portfolio", "react", "next.js", "web development", "Braydon Johnston"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=New+Rocker&display=swap" rel="stylesheet" />
      </head>
      <body className="relative min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <NavigationWrapper />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
