import { renderHook, act } from '@testing-library/react-hooks';

import useCounter from './useCounter';

test('should use counter', () => {
  // renderHook を実行すると、フックをテストするためのコンポーネントが生成される
  // テストコンポーネントがレンダリングされるたびに、第一引数のコールバック関数が呼び出される。
  // コールバック関数内では、必ずテスト用のフックを１つ以上呼び出す必要がある。
  // 今回は useCounter を呼び出している。
  const { result } = renderHook(() => useCounter());

  // result.current には、呼び出したフックの戻り値が格納されるため、
  // それを利用してアサーションする。
  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe('function');
});

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());

  // テストコンポーネントを更新するロジックは act でラップする。
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
