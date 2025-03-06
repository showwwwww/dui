'use client';

export interface Cookie {
  name: string;
  value: string;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

class CookieManager {
  static set(cookie: Cookie): void {
    let cookieString = `${cookie.name}=${encodeURIComponent(cookie.value)}`;

    if (cookie.expires) {
      cookieString += `; expires=${cookie.expires.toUTCString()}`;
    }

    if (cookie.path) {
      cookieString += `; path=${cookie.path}`;
    }

    if (cookie.domain) {
      cookieString += `; domain=${cookie.domain}`;
    }

    if (cookie.secure) {
      cookieString += '; secure';
    }

    if (cookie.httpOnly) {
      cookieString += '; httpOnly';
    }

    document.cookie = cookieString;
  }

  static has(name: string): boolean {
    return document.cookie.split(';').some((cookie) => cookie.trim().startsWith(`${name}=`));
  }

  static get(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }

  static remove(name: string): void {
    this.set({
      name: name,
      value: '',
      expires: new Date('Thu, 01 Jan 1970 00:00:00 UTC'),
      path: '/',
    });
  }
}

export default CookieManager;
