import { useState, useCallback } from 'react';

export default function asyncUseCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(x => x + 1), []);
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [increment]);

  return { count, incrementAsync };
}
