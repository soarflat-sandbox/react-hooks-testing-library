import { renderHook, act } from '@testing-library/react-hooks';

import useCounterWithProps from './useCounterWithProps';

test('should increment counter from custom initial value', () => {
  const { result } = renderHook(() => useCounterWithProps(9000));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(9001);
});

test('should reset counter to updated initial value', () => {
  // 第１引数のコールバック関数に渡される引数は、第２引数の initialProps に指定した値になる。
  // そのため、今回は initialValue に 0 が渡される。
  const { result, rerender } = renderHook(({ initialValue }) => useCounterWithProps(initialValue), {
    initialProps: { initialValue: 0 },
  });
  expect(result.current.count).toBe(0);

  // テストコンポーネントを再レンダリングする。
  // 上記のコールバック関数の引数 initialValue に 10 が渡されて、テストコンポーネントが再レンダリングされる。
  rerender({ initialValue: 10 });

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

it('should throw when over 10000', () => {
  const { result } = renderHook(() => useCounterWithProps(10000));

  act(() => {
    result.current.increment();
  });

  expect(result.error).toEqual(Error("It's over 10000!"));
});
