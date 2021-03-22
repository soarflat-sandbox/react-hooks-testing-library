import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { CounterStepProvider, useCounter } from './counter.jsx';

test('should use custom step when incrementing', () => {
  const wrapper = ({ children }) => <CounterStepProvider step={5}>{children}</CounterStepProvider>;

  // フックをレンダリングする時に CounterStepProvider がラッパーとして利用される。
  // useCounter() で useContext(CounterStepContext) が実行されるが
  // 今回のテストでは <CounterStepProvider step={5}> がラッパーなので 5 が返ってくる。
  const { result } = renderHook(() => useCounter(), { wrapper });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(5);
});

test('should use custom step when incrementing2', () => {
  const wrapper = ({ children, step }) => (
    <CounterStepProvider step={step}>{children}</CounterStepProvider>
  );

  const { result, rerender } = renderHook(() => useCounter(), {
    wrapper,
    // wrapper の引数に、initialProps した値が渡される。
    initialProps: {
      step: 2,
    },
  });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);

  rerender({ step: 8 });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(10);
});
