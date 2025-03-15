import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leo Henrique - Portfolio",
  description: "A Software Developer portfolio from Brazil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
