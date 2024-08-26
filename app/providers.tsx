"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, MantineProvider } from "@mantine/core";
import { getQueryClient } from "./utils";

const theme = createTheme({});

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
