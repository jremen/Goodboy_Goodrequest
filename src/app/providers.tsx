"use client";

import i18n from "@/lib/i18n/config";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { theme } from "@/lib/theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [ready, setReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (!i18n.isInitialized) {
      const handle = () => setReady(true);
      i18n.on("initialized", handle);
      return () => {
        i18n.off("initialized", handle);
      };
    }
  }, []);

  if (!ready) {
    return (
      <MantineProvider defaultColorScheme="light" theme={theme}>
        {children}
      </MantineProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light" theme={theme}>
        <Notifications />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
