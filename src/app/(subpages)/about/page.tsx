import { getStats } from "@/lib/api/endpoints";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { queryKeys } from "@/lib/query/queryKeys";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPage from "./AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");

  return {
    title: t("metadata.about.title"),
    description: t("metadata.about.description"),
    openGraph: {
      title: t("metadata.about.title"),
      description: t("metadata.about.description"),
    },
  };
}

export default async function About() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.stats,
    queryFn: getStats,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutPage />
    </HydrationBoundary>
  );
}
