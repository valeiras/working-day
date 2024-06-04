import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Working Day",
  description: "Time tracker app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="business">
        <body className="min-h-screen w-screen flex flex-col items-stretch">{children}</body>
      </html>
    </ClerkProvider>
  );
}
