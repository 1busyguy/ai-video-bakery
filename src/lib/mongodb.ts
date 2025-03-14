import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error('Please define the MONGODB_URI environment variable');

let client: MongoClient;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri as string);
    await client.connect();
  }
  return client.db();
}

export { connectToDatabase }; 