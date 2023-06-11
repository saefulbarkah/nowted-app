"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function ReactQueryProvider({ children }: PropsWithChildren) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
