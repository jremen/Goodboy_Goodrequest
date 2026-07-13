"use client";

import { getShelters, getStats } from "@/lib/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";

export function useShelters() {
  return useQuery({
    queryKey: queryKeys.shelters,
    queryFn: getShelters,
  });
}

export function useStats() {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: getStats,
    refetchInterval: 300_000,
  });
}
