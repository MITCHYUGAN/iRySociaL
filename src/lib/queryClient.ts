// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

// CHANGE: Create ONE shared QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      retry: 1,
    },
  },
});