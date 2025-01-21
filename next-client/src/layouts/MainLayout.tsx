import React from "react";
import AppNavbar from "@/components/AppNavbar/AppNavbar"
import Footer from "@/components/Footer/Footer";
export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppNavbar />
      {children}
      <Footer />
    </div>
  );
};
