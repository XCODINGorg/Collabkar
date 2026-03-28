import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Collabkar",
  description: "developed and innovated by Arpit Jha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
