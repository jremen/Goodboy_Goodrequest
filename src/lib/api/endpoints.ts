import type { ContributePayload, SheltersResponse, Stats } from '@/types/api';
import { apiFetch } from './client';

export function getShelters() {
  return apiFetch<SheltersResponse>('/');
}

export function getStats() {
  return apiFetch<Stats>('/results');
}

export function submitContribution(payload: ContributePayload) {
  return apiFetch<{ success: boolean }>('/contribute', {
    method: 'POST',
    body: payload,
  });
}
