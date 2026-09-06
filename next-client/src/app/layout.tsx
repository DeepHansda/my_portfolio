import type { Metadata } from "next";
import "@/styles/index.css";
import Nav from "@/components/Nav";
import Toaster from "@/components/ui/Toaster";
import Footer from "@/components/Footer";

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
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
