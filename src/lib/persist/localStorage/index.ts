'use client';
import type { JSBaseType } from '@/types/common';

class LocalStorage {
  static set(key: string, value: JSBaseType): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  static get(key: string): JSBaseType {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorage;
