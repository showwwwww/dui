import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
export interface Command {
  _id: string;
  name: string;
  command: string;
  params: string[];
  description: string;
  isDefault: boolean;
  level: number;
  isEditable: boolean;
}

export async function GET() {
  const client = await clientPromise;
  const collections = await client.db('dui').collection('commands');
  const commands = await collections.find().toArray();
  return NextResponse.json(commands);
}

interface Body {
  name: string;
}

// const mockData = [
//   {
//     _id: '1',
//     name: 'Command 1',
//     command: 'ls',
//     params: ['-l'],
//     description: 'List files in long format',
//     isDefault: true,
//     level: 0,
//     isEditable: true,
//   },
//   {
//     _id: '2',
//     name: 'Command 2',
//     command: 'pwd',
//     params: [],
//     description: 'Print working directory',
//     isDefault: false,
//     level: 1,
//     isEditable: true,
//   },
//   {
//     _id: '3',
//     name: 'Command 3',
//     command: 'cd',
//     params: ['path'],
//     description: 'Change directory',
//     isDefault: false,
//     level: 2,
//     isEditable: true,
//   },
//   {
//     _id: '4',
//     name: 'Command 4',
//     command: 'touch',
//     params: ['file'],
//     description: 'Create a file',
//     isDefault: false,
//     level: 3,
//     isEditable: true,
//   },
// ];

export async function POST(request: Request) {
  const body: Body = await request.json();
  const client = await clientPromise;
  const appsCollection = await client.db('dui').collection('apps');
  const app = await appsCollection.findOne(body);
  let commands: Command[] = [];
  if (app) {
    const commandsCollection = await client.db('dui').collection('commands');
    commands = await commandsCollection.find<Command>({ appId: app._id }).toArray();
  }
  return new Response(JSON.stringify(commands), {
    headers: { 'Content-Type': 'application/json' },
  });
}
