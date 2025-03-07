import { type NextRequest, NextResponse } from 'next/server';
import { THEME_COOKIE_KEY } from '@/static/cookies';

const handleTheme = (request: NextRequest, response: NextResponse) => {
  // theme detection
  const cookieTheme = request.cookies.get(THEME_COOKIE_KEY)?.value ?? 'light';
  // set request headers and cookies
  response.cookies.set(THEME_COOKIE_KEY, cookieTheme, {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

const defaultPlugin: MWPlugin = {
  middleware: (request) => {
    const response = NextResponse.next();
    handleTheme(request, response);
    return response;
  },
  // handle all default api
  matcher: () => true,
};

export default defaultPlugin;
