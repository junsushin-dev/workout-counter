import { useState } from 'react';

export function useRerender() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  return () => setCount(n => n + 1);
}