export const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status.toString()} ${res.statusText}`);
  }

  if (init?.method === 'DELETE') return;

  return await res.json();
};
