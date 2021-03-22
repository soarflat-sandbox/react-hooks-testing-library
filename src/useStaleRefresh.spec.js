import { renderHook } from '@testing-library/react-hooks';
import useStaleRefresh from './useStaleRefresh';

global.fetch = jest.fn(
  (url, suffix = '') =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          json: () =>
            Promise.resolve({
              url: url + suffix,
            }),
        });
      }, 200 + Math.random() * 300);
    })
);

describe('useStaleRefresh', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetchをしてデータを取得する', async () => {
    const defaultValue = { data: '' };
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ url }) => useStaleRefresh(url, defaultValue),
      {
        initialProps: {
          url: 'url1',
        },
      }
    );

    expect(result.current.data).toEqual(defaultValue);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.data.url).toEqual('url1');
    expect(result.current.isLoading).toBe(false);
  });

  it('propsを変更すると、再度fetchをしてデータを取得する', async () => {
    const defaultValue = { data: '' };
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ url }) => useStaleRefresh(url, defaultValue),
      {
        initialProps: {
          url: 'url2',
        },
      }
    );

    expect(result.current.data).toEqual(defaultValue);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.data.url).toEqual('url2');
    expect(result.current.isLoading).toBe(false);

    rerender({ url: 'url3' });
    expect(result.current.data).toEqual(defaultValue);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.data.url).toEqual('url3');
    expect(result.current.isLoading).toBe(false);
  });

  it('同じリクエスト先の場合、fetchをせずにキャッシュを返却する', async () => {
    const defaultValue = { data: '' };
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ url }) => useStaleRefresh(url, defaultValue),
      {
        initialProps: {
          url: 'url4',
        },
      }
    );

    expect(result.current.data).toEqual(defaultValue);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.data.url).toEqual('url4');
    expect(result.current.isLoading).toBe(false);

    rerender({ url: 'url4' });
    expect(result.current.data.url).toEqual('url4');
    expect(result.current.isLoading).toBe(false);
  });
});
