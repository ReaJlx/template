import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

export async function cacheGet<T>(key: string): Promise<T | null> {
  return redis.get<T>(key)
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
  if (ttlSeconds) {
    await redis.setex(key, ttlSeconds, value)
  } else {
    await redis.set(key, value)
  }
}

export async function cacheDel(key: string): Promise<void> {
  await redis.del(key)
}
