import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  createdAt: z.date().default(() => new Date()),
});

export interface User extends z.infer<typeof UserSchema> {} 