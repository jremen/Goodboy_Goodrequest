'use client';

import { submitContribution } from '@/lib/api/endpoints';
import type { ContributePayload } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

export function useSubmitContribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ContributePayload) => submitContribution(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
}
