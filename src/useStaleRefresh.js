import { useState, useEffect } from 'react';
const CACHE = {};

export default function useStaleRefresh(url, dafaultValue = []) {
  const [data, setData] = useState(dafaultValue);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const cacheID = url;

    if (CACHE[cacheID] !== undefined) {
      setData(CACHE[cacheID]);
      setLoading(false);
    } else {
      setLoading(true);
      setData(dafaultValue);
    }

    fetch(url)
      .then(res => res.json())
      .then(newData => {
        CACHE[cacheID] = newData;
        setData(newData);
        setLoading(false);
      });
  }, [url, dafaultValue]);

  return { data, isLoading };
}
