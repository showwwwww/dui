interface StorageOptions {
  ttl?: number; // live time(seconds)
  path?: string; // file path
  prefix?: string; // key prefix
}

interface IStorage {
  get<T = unknown>(key: string): Promise<T | null>;
  set(key: string, value: unknown, options?: StorageOptions): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
}

// Judge the runtime environment
type RuntimeEnvironment = 'browser' | 'server' | 'both';
interface EnvironmentAwareStorage extends IStorage {
  readonly environment: RuntimeEnvironment;
  isAvailable(): Promise<boolean>;
}

export type { IStorage, EnvironmentAwareStorage, StorageOptions };
