/**
 * Cache Helpers (Deprecated)
 * These helpers are deprecated. Use cacheService from @/services/cache instead.
 */

import { cacheService } from '@/services/cache'

/** @deprecated Use cacheService.getStats() instead */
export async function cacheGet<T>(_key: string): Promise<T | null> {
  return cacheService.getStats() as Promise<T | null>
}

/** @deprecated Use cacheService.setStats() instead */
export async function cacheSet<T>(_key: string, _value: T, _ttlSeconds?: number): Promise<void> {
  // No-op - use cacheService directly
  return Promise.resolve()
}

/** @deprecated Use cacheService methods instead */
export async function cacheDel(_key: string): Promise<void> {
  // No-op - use cacheService directly
  return Promise.resolve()
}
