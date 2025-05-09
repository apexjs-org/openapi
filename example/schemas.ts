import { z } from "zod";

export const User = z.object({
  id: z.string().regex(/^[a-zA-Z0-9-_]+$/).min(10).max(200),
  email: z.string().email().min(5).max(200),
  name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/).min(2).max(200),
  createdAt: z.optional(z.date()),
});

export const UserList = z.object({
  results: z.array(User),
  totalCount: z.number()
});

export const UserCreate = User.omit({ id: true, createdAt: true });

export const UserUpdate = User.pick({ name: true }).partial();