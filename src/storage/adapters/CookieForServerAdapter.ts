import { cookies } from 'next/headers';
import { EnvironmentAwareStorage, StorageOptions } from '../IStorage';

export default class CookieForServer implements EnvironmentAwareStorage {
  readonly environment = 'server';

  constructor() {}

  async get<T = unknown>(key: string): Promise<T | null> {
    return ((await cookies()).get(key)?.value as T) ?? null;
  }

  async set(key: string, value: unknown, options?: StorageOptions): Promise<void> {
    (await cookies())?.set({
      name: key,
      value: value as string,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: options?.path || '/',
      maxAge: options?.ttl,
    });
  }

  async delete(key: string): Promise<void> {
    (await cookies()).delete(key);
  }

  async clear(): Promise<void> {
    throw new Error("clear don't support in CookieStorageAdapter");
  }

  async has(key: string): Promise<boolean> {
    return !!this.get(key);
  }

  async isAvailable(): Promise<boolean> {
    return typeof window === 'undefined'; // only available in server
  }
}
