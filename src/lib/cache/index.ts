/**
 * Cache Library
 * Re-exports from services/cache for backward compatibility
 * @deprecated Import from @/services/cache instead
 */

export { cacheService as redis, cacheService as ratelimit, cacheService } from '@/services/cache'
export { 
  cacheGet, 
  cacheSet, 
  cacheDel 
} from './deprecated-helpers'
