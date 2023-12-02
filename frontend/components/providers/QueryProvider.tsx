"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/tanstack";

interface IProps {
  children: React.ReactNode;
}

const QueryProvider: React.FC<IProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
