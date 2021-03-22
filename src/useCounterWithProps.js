import { useState, useCallback } from 'react';

export default function useCounterWithProps(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(x => x + 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  if (count > 10000) {
    throw new Error("It's over 10000!");
  }

  return { count, increment, reset };
}
