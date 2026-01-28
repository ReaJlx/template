import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

import { db } from '@/lib/db'

import { UpstashCacheRepository } from './cache.repository'
import { DefaultCacheService } from './cache.service'

export * from './cache.types'
export { UpstashCacheRepository, type CacheRepository } from './cache.repository'
export { DefaultCacheService } from './cache.service'

// Infrastructure dependencies - instantiated at module level for production use
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

// Repository with injected dependencies
const cacheRepository = new UpstashCacheRepository(redis, ratelimit)

// Service with injected repository and database
export const cacheService = new DefaultCacheService(cacheRepository, db)
