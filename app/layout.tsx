import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simaniuk Anna | Test task",
  description: "Simaniuk Anna test task",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={`${montserrat.className} custom-scrollbar`}>
          {children}
          <Toaster />
        </body>
      </ReduxProvider>
    </html>
  );
}
