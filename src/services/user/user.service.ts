import type { User } from '@/lib/db/schema/users'

import { userRepository } from './user.repository'

export type ClerkUserPayload = {
  clerkId: string
  email: string
  name?: string | null
  imageUrl?: string | null
}

export interface UserService {
  getUserByClerkId(clerkId: string): Promise<User | null>
  getOrCreateUser(payload: ClerkUserPayload): Promise<User>
  syncFromClerk(payload: ClerkUserPayload): Promise<User>
  deleteByClerkId(clerkId: string): Promise<void>
}

class DefaultUserService implements UserService {
  constructor(private readonly repository = userRepository) {}

  async getUserByClerkId(clerkId: string): Promise<User | null> {
    return this.repository.findByClerkId(clerkId)
  }

  async getOrCreateUser(payload: ClerkUserPayload): Promise<User> {
    const existing = await this.repository.findByClerkId(payload.clerkId)
    if (existing) return existing

    return this.repository.create({
      clerkId: payload.clerkId,
      email: payload.email,
      name: payload.name ?? null,
      imageUrl: payload.imageUrl ?? null,
    })
  }

  async syncFromClerk(payload: ClerkUserPayload): Promise<User> {
    const existing = await this.repository.findByClerkId(payload.clerkId)

    if (!existing) {
      return this.repository.create({
        clerkId: payload.clerkId,
        email: payload.email,
        name: payload.name ?? null,
        imageUrl: payload.imageUrl ?? null,
      })
    }

    const updated = await this.repository.updateByClerkId(payload.clerkId, {
      email: payload.email,
      name: payload.name ?? null,
      imageUrl: payload.imageUrl ?? null,
    })

    return updated ?? existing
  }

  async deleteByClerkId(clerkId: string): Promise<void> {
    await this.repository.deleteByClerkId(clerkId)
  }
}

export const userService = new DefaultUserService()
