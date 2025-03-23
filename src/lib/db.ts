import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(process.env.MONGODB_URI, {
  heartbeatFrequencyMS: 1000 * 60 * 15,
});
const clientPromise = client.connect();

export default clientPromise;
