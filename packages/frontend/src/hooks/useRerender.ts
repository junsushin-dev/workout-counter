import { useState } from 'react';

export function useRerender() {
  const [count, setCount] = useState(0);

  return () => setCount(n => n + 1);
}