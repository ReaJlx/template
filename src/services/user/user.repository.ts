import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import type { NewUser, User } from '@/lib/db/schema/users'

export interface UserRepository {
  findByClerkId(clerkId: string): Promise<User | null>
  create(data: NewUser): Promise<User>
  updateByClerkId(clerkId: string, data: Partial<NewUser>): Promise<User | null>
  deleteByClerkId(clerkId: string): Promise<void>
}

class DrizzleUserRepository implements UserRepository {
  async findByClerkId(clerkId: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1)

    return result[0] ?? null
  }

  async create(data: NewUser): Promise<User> {
    const result = await db.insert(users).values(data).returning()
    return result[0]
  }

  async updateByClerkId(
    clerkId: string,
    data: Partial<NewUser>
  ): Promise<User | null> {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.clerkId, clerkId))
      .returning()

    return result[0] ?? null
  }

  async deleteByClerkId(clerkId: string): Promise<void> {
    await db.delete(users).where(eq(users.clerkId, clerkId))
  }
}

export const userRepository = new DrizzleUserRepository()
