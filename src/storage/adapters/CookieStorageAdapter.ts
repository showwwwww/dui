import Cookies from 'js-cookie';
import { EnvironmentAwareStorage, StorageOptions } from '../IStorage';

export default class CookieStorage implements EnvironmentAwareStorage {
  readonly environment = 'both';
  private prefix: string;

  constructor(config?: { prefix?: string }) {
    this.prefix = config?.prefix || 'app_';
  }

  private getPrefixedKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async isAvailable(): Promise<boolean> {
    return typeof window !== 'undefined' && !!window.document.cookie;
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const value = Cookies.get(this.getPrefixedKey(key));
    return value ? (value as T) : null;
  }

  async set(key: string, value: unknown, options?: StorageOptions): Promise<void> {
    Cookies.set(this.getPrefixedKey(key), value as string, {
      expires: options?.ttl ? options.ttl / 60 / 60 / 24 : undefined,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  async has(key: string): Promise<boolean> {
    return Cookies.get(this.getPrefixedKey(key)) !== undefined;
  }

  async delete(key: string): Promise<void> {
    Cookies.remove(this.getPrefixedKey(key));
  }

  async clear(): Promise<void> {
    // Get an array of all cookie names
    const cookies = document.cookie.split(';');

    // Iterate over the cookies
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Trim whitespace
      const eqPos = cookie.indexOf('='); // Find the position of the '=' sign

      // Get the cookie name
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

      // Remove the cookie
      Cookies.remove(name);
    }
  }
}
