import { validateTokenVersion } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const isValid = await validateTokenVersion(body?.tokenVersion, body?.lastInvalidation);
  return new Response(JSON.stringify({ isValid }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
