import fs from 'fs/promises';
import path from 'path';
import { EnvironmentAwareStorage } from '../IStorage';

export default class FileStorageAdapter implements EnvironmentAwareStorage {
  readonly environment = 'server';
  private storagePath: string;

  constructor(config: { storagePath: string }) {
    this.storagePath = config.storagePath;
  }

  private getFilePath(key: string): string {
    return path.join(this.storagePath, `${key}.json`);
  }

  async isAvailable(): Promise<boolean> {
    try {
      await fs.access(this.storagePath, fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    try {
      const data = await fs.readFile(this.getFilePath(key), 'utf-8');
      const { value, _meta } = JSON.parse(data);

      if (_meta?.expires && Date.now() > _meta.expires) {
        await this.delete(key);
        return null;
      }

      return value as T;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown, options?: { ttl?: number }): Promise<void> {
    console.log(window);
    await fs.writeFile(
      this.getFilePath(key),
      JSON.stringify({
        value,
        _meta: {
          expires: options?.ttl ? Date.now() + options.ttl * 1000 : undefined,
        },
      })
    );
  }

  async has(key: string): Promise<boolean> {
    try {
      await fs.access(this.getFilePath(key));
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string): Promise<void> {
    await fs.unlink(this.getFilePath(key));
  }

  async clear(): Promise<void> {
    await fs.rmdir(this.storagePath, { recursive: true });
  }
}
