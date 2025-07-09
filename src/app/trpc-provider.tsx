"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpcApp } from "@/utils/trpcApp";
import { ReactNode, useState } from "react";
import { httpBatchLink } from "@trpc/client";

export function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcApp.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpcApp.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcApp.Provider>
  );
}
