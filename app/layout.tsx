import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Multilingual Classroom",
  description: "Practical, WIDA-informed scaffolds for multilingual learners."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
