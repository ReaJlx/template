import { db } from '@/lib/db'

import { DrizzleUserRepository } from './user.repository'
import { DefaultUserService } from './user.service'

export * from './user.types'
export { DrizzleUserRepository, type UserRepository } from './user.repository'
export { DefaultUserService } from './user.service'

// Repository with injected database
const userRepository = new DrizzleUserRepository(db)

// Service with injected repository
export const userService = new DefaultUserService(userRepository)
