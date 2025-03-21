import clientPromise from '@/lib/db';

export async function GET() {
  const client = await clientPromise;
  const collections = await client.db('dui').collection('commands');
  const commands = await collections.find().toArray();
  return new Response(JSON.stringify(commands), {
    headers: { 'Content-Type': 'application/json' },
  });
}
