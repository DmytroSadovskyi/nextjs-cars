import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import "modern-normalize/modern-normalize.css";

export const metadata: Metadata = {
  title: "DreamCar",
  description: "The best car rental service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
