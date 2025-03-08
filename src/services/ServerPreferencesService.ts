import { IStorage } from '@/storage/IStorage';
import { THEME_COOKIE_KEY, LOCALE_COOKIE_KEY, DEFAULT_LOCALE, DEFAULT_THEME } from '@/const';
import CookieForServer from '@/storage/adapters/CookieForServerAdapter';

const EXPIRED_TIME_DAY = 365;

class ServerPreferencesService {
  constructor(
    private storage: {
      theme: IStorage;
      locale: IStorage;
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
    return (await import(`@/locales/${locale}/index`)).default;
  }
}

// server side
const cookieStorage = new CookieForServer();
const ssrPrefService = new ServerPreferencesService({
  theme: cookieStorage,
  locale: cookieStorage,
});

export default ssrPrefService;
