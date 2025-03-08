interface StorageOptions {
  ttl?: number; // live time(seconds)
  path?: string; // file path
  prefix?: string; // key prefix
  domain?: string; // domain
  secure?: boolean; // secure
}

interface IStorage {
  get<T = unknown>(key: string, context?: unknown): Promise<T | null>;
  set(key: string, value: unknown, options?: StorageOptions, context?: unknown): Promise<void>;
  delete(key: string, context?: unknown): Promise<void>;
  clear(): Promise<void>;
  has(key: string, context?: unknown): Promise<boolean>;
}

// Judge the runtime environment
type RuntimeEnvironment = 'browser' | 'server';
interface EnvironmentAwareStorage extends IStorage {
  readonly environment: RuntimeEnvironment;
  isAvailable(): Promise<boolean>;
}

export type { IStorage, EnvironmentAwareStorage, StorageOptions };
