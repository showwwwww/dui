import { IStorage } from '@/storage/IStorage';
import { THEME_COOKIE_KEY, LOCALE_COOKIE_KEY, DEFAULT_LOCALE, DEFAULT_THEME } from '@/const';
import LocalStorageAdapter from '@/storage/adapters/LocalStorageAdapter';
import CookieStorage from '@/storage/adapters/CookieStorageAdapter';

const EXPIRED_TIME_DAY = 365;

class UserPreferencesService {
  constructor(
    private storage: {
      theme: IStorage;
      locale: IStorage;
      translations: IStorage;
      token: IStorage;
    }
  ) {}

  async saveThemePreference(theme: Theme): Promise<void> {
    await this.storage.theme.set(THEME_COOKIE_KEY, theme, {
      ttl: EXPIRED_TIME_DAY * 24 * 3600,
    });
  }

  async getThemePreference(): Promise<Theme> {
    return ((await this.storage.theme.get<string>(THEME_COOKIE_KEY)) as Theme) || DEFAULT_THEME;
  }

  async saveLocalePreference(locale: Locale): Promise<void> {
    await this.storage.locale.set(LOCALE_COOKIE_KEY, locale, {
      ttl: EXPIRED_TIME_DAY * 24 * 3600,
    });
  }

  async getLocalePreference(): Promise<Locale> {
    return ((await this.storage.locale.get<string>(LOCALE_COOKIE_KEY)) as Locale) || DEFAULT_LOCALE;
  }

  async getTranslations(locale: Locale): Promise<TranslationKeys> {
    const hasTranslations = await this.storage.translations.has(locale);
    if (hasTranslations) {
      return this.storage.translations.get<TranslationKeys>(
        locale
      ) as unknown as Translations[Locale];
    }

    try {
      const translations = (await import(`@/locales/${locale}/index`)).default;
      await this.storage.translations?.set(locale, translations, {
        ttl: EXPIRED_TIME_DAY * 24 * 3600,
      });
      return translations;
    } catch {
      const hasDefaultTranslations = await this.storage.translations.has(DEFAULT_LOCALE);
      if (hasDefaultTranslations) {
        return this.storage.translations.get(DEFAULT_LOCALE) as unknown as Translations[Locale];
      }
      const defaultTranslations = (await import(`@/locales/${DEFAULT_LOCALE}/index`)).default;
      this.storage.translations?.set(DEFAULT_LOCALE, defaultTranslations);
      return defaultTranslations;
    }
  }

  async saveToken(token: string): Promise<void> {
    await this.storage.token.set('jwt_token', token);
  }

  async getToken(): Promise<string | null> {
    return this.storage.token.get('jwt_token');
  }
}

const localStorage = new LocalStorageAdapter();
const cookieStorage = new CookieStorage();
const userPrefService = new UserPreferencesService({
  theme: cookieStorage,
  locale: cookieStorage,
  translations: localStorage,
  token: cookieStorage,
});

export default userPrefService;
