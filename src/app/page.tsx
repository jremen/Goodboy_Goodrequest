import DonationWizard from "@/components/form/DonationWizard";
import Doggy from "@/components/layout/Doggy";
import { getShelters } from "@/lib/api/endpoints";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { queryKeys } from "@/lib/query/queryKeys";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");

  return {
    title: t("metadata.home.title"),
    description: t("metadata.home.description"),
    openGraph: {
      title: t("metadata.home.title"),
      description: t("metadata.home.description"),
    },
  };
}

export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.shelters,
    queryFn: getShelters,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DonationWizard />
      <Doggy />
    </HydrationBoundary>
  );
}
