import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrushCraft - Find Love by Occupation",
  description: "A dating app focused on discovering partners by occupation and region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
