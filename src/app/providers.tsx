"use client";

import i18n from "@/lib/i18n/config";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

const theme = createTheme({
  primaryColor: "brand",
  fontFamily: `var(--font-inter), ${DEFAULT_THEME.fontFamily}`,
  headings: {
    fontFamily: `var(--font-inter), ${DEFAULT_THEME.fontFamily}`,
  },
  colors: {
    brand: [
      "#eef0ff",
      "#dde1ff",
      "#bcc4ff",
      "#9ba6ff",
      "#7a89ff",
      "#596bff",
      "#4F46E5",
      "#3f37c4",
      "#2f2aa3",
      "#1f1c82",
    ],
  },
});

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
