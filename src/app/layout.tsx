import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/Globals.css";
import Toaster from "@/components/toast";
import { ThemeProvider } from "@/Contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rafiki",
  description: "Rafiki fi Sihati",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
