// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ToastProvider placement="top-center" />
        <main className="dark text-foreground bg-background">{children}</main>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
