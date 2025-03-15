import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface GlobalWithMongo extends Global {
  mongo: {
    conn: MongoConnection | null;
    promise: Promise<MongoConnection> | null;
  };
}

// Define types for MongoDB connection
export interface MongoConnection {
  client: MongoClient;
  db: Db;
}

// Use a type assertion to inform TypeScript that global has the mongo property
let cached = (global as unknown as GlobalWithMongo).mongo;

if (!cached) {
  cached = (global as unknown as GlobalWithMongo).mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<MongoConnection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URI as string).then((client: MongoClient) => {
      return {
        client,
        db: client.db(MONGODB_DB as string),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
} 