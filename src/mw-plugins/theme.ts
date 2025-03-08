import { type NextRequest } from 'next/server';
import ssrPrefService from '@/service/ServerPreferencesService';
import { THEME_COOKIE_KEY } from '@/const';

const handleTheme = (request: NextRequest) => {
  // theme detection
  const cookieTheme = (request.cookies.get(THEME_COOKIE_KEY)?.value as Theme) ?? 'light';

  // save theme preference
  ssrPrefService.saveThemePreference(cookieTheme);
};

const defaultPlugin: MWPlugin = {
  middleware: (request) => {
    handleTheme(request);
  },
  // handle all default api
  matcher: () => true,
};

export default defaultPlugin;
