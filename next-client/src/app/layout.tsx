import type { Metadata } from "next";
import "@/styles/index.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "DEEP.HANSDA",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
