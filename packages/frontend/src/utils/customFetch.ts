export const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);

  if(!res.ok) {
    throw new Error(`${res.status.toString()} ${res.statusText}`);
  }

  return await res.json();
}