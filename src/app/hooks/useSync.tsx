import calculateHash from '@/lib/hash';
import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
type AsyncFunction<T> = (...args: any[]) => Promise<T>;
interface Options<Args, Result> {
  defaultValue?: Result;
  parameters?: Args;
}

type Cache = {
  status: 'pending' | 'fulfilled' | 'rejected';
  value: unknown;
  createdAt?: number;
};
const caches = new Map<string, Cache>();

const useSync = function <Result>(
  asyncFunction: AsyncFunction<Result>,
  { defaultValue, parameters }: Options<Parameters<typeof asyncFunction>, Result> = {}
): Result | undefined {
  const [, setTrigger] = React.useState(0);
  const forceUpdate = React.useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  const key = calculateHash([asyncFunction, parameters]);

  if (caches.has(key)) {
    return caches.get(key) as Result;
  }

  caches.set(key, { status: 'pending', value: defaultValue, createdAt: Date.now() });
  asyncFunction(...(parameters || []))
    .then((value) => {
      caches.set(key, { status: 'fulfilled', value, createdAt: Date.now() });
    })
    .catch((error) => {
      caches.set(key, { status: 'rejected', value: error, createdAt: Date.now() });
    })
    .finally(forceUpdate);
  return defaultValue;
};

const EXPIRED_TIME = 1000 * 60 * 15;
setInterval(() => {
  const now = Date.now();
  for (const [key, cache] of caches) {
    if (cache.createdAt && now - cache.createdAt > EXPIRED_TIME) {
      caches.delete(key);
    }
  }
}, EXPIRED_TIME);

export default useSync;
