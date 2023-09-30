import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Logo from "../components/Logo/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizApp",
  description: "QuizApp dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Logo />
        {children}
      </body>
    </html>
  );
}
