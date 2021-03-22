import { renderHook } from '@testing-library/react-hooks';
import asyncUseCounter from './asyncUseCounter';

test('should increment counter after delay', async () => {
  const { result, waitForNextUpdate } = renderHook(() => asyncUseCounter());

  // 非同期の更新処理は act() でラップする必要はない
  result.current.incrementAsync();

  // 状態が更新されたりして、テストコンポーネントが再レンダリングされるのを待つ
  await waitForNextUpdate();

  expect(result.current.count).toBe(1);
});
