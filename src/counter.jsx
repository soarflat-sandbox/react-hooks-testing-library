import React, { useState, useCallback, useContext } from 'react';

const CounterStepContext = React.createContext();

export const CounterStepProvider = ({ step, children }) => (
  <CounterStepContext.Provider value={step}>
    {children}
  </CounterStepContext.Provider>
);

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const step = useContext(CounterStepContext);
  const increment = useCallback(() => setCount(x => x + step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, reset };
}
