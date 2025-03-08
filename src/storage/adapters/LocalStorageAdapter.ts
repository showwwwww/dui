import { EnvironmentAwareStorage, StorageOptions } from '../IStorage';

export default class LocalStorageAdapter implements EnvironmentAwareStorage {
  readonly environment = 'browser';
  private prefix: string;

  constructor(config?: { prefix?: string }) {
    this.prefix = config?.prefix || 'app_';
  }

  private getPrefixedKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async isAvailable(): Promise<boolean> {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const value = localStorage.getItem(this.getPrefixedKey(key));
    return value ? JSON.parse(value).value : null;
  }

  async set(key: string, value: unknown, options?: StorageOptions): Promise<void> {
    localStorage.setItem(
      this.getPrefixedKey(key),
      JSON.stringify({
        value,
        _meta: {
          expires: options?.ttl ? Date.now() + options.ttl * 1000 : undefined,
        },
      })
    );
  }

  async has(key: string): Promise<boolean> {
    return localStorage.getItem(this.getPrefixedKey(key)) !== null;
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(this.getPrefixedKey(key));
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}
