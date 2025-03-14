import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/mongodb';
import { UserSchema } from '@/types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const validation = UserSchema.safeParse(req.body);
  if (!validation.success) return res.status(400).json({ error: validation.error });

  const { email, password } = UserSchema.parse(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  const { db } = await connectToDatabase();

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) return res.status(409).json({ error: 'User already exists' });

  await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  res.status(201).json({ message: 'User created successfully' });
} 