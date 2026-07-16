"use client";

import { createContext, useContext } from "react";

const ServerI18nContext = createContext<"sk" | "cs" | null>(null);

export function ServerI18nProvider({
  value,
  children,
}: {
  value: "sk" | "cs";
  children: React.ReactNode;
}) {
  return (
    <ServerI18nContext.Provider value={value}>
      {children}
    </ServerI18nContext.Provider>
  );
}

export function useServerLang() {
  return useContext(ServerI18nContext);
}
