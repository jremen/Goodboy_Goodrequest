import { ApiError } from './errors';

const API_PATH = process.env.NEXT_PUBLIC_API_PATH ?? '';

type RequestInitJSON = Omit<RequestInit, 'body'> & { body?: unknown };

export async function apiFetch<T>(endpoint: string, init: RequestInitJSON = {}): Promise<T> {
  const { body, headers, ...rest } = init;
  const url = `${API_PATH}${endpoint}`;

  const res = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(headers as Record<string, string>),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ApiError(res.status, text);
  }

  return res.json() as Promise<T>;
}
