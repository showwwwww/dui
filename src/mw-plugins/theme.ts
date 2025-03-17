import { type NextResponse, type NextRequest } from 'next/server';
import ssrPrefService from '@/services/ServerPreferencesService';
import { THEME_COOKIE_KEY, DEFAULT_THEME, themes } from '@/const';

const handleTheme = async (request: NextRequest, response: NextResponse) => {
  // theme detection
  const cookieTheme = (request.cookies.get(THEME_COOKIE_KEY)?.value as Theme) ?? DEFAULT_THEME;

  if (themes.includes(cookieTheme)) {
    await ssrPrefService.saveThemePreference(cookieTheme);
  }
  // save theme preference
  const currentTheme = await ssrPrefService.getThemePreference();
  response.headers.set('x-theme', currentTheme);
};

const defaultPlugin: MWPlugin = {
  middleware: async (request, response) => {
    handleTheme(request, response);
  },
  // handle all default api
  matcher: (req) => !req.url.includes('/api'),
};

export default defaultPlugin;
