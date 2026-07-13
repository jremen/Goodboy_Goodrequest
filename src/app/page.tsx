import { DonationWizard } from '@/components/form/DonationWizard';
import { getShelters } from '@/lib/api/endpoints';
import { getQueryClient } from '@/lib/query/getQueryClient';
import { queryKeys } from '@/lib/query/queryKeys';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export const metadata = {
  title: 'Prispieť - GoodBoy',
  description: 'Vyplňte formulár a podporte slovenské psie útulky.',
  openGraph: {
    title: 'Prispieť - GoodBoy',
    description: 'Vyplňte formulár a podporte slovenské psie útulky.',
  },
};

export default function HomePage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({ queryKey: queryKeys.shelters, queryFn: getShelters });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    </HydrationBoundary>
  );
}
