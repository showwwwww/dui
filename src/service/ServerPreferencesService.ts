import { IStorage } from '@/storage/IStorage';
import {
  THEME_COOKIE_KEY,
  LOCALE_COOKIE_KEY,
  DEFAULT_LOCALE,
  DEFAULT_THEME,
  APP_NAME,
} from '@/const';
import FileStorageAdapter from '@/storage/adapters/FileStorageAdapter';

const EXPIRED_TIME_DAY = 365;

class UserPreferencesService {
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
}

// server side
const serverStorage = new FileStorageAdapter({
  storagePath: `/var/data/${APP_NAME}`,
});
const ssrPrefService = new UserPreferencesService({ theme: serverStorage, locale: serverStorage });

export default ssrPrefService;
