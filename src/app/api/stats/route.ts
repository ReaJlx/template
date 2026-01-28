import { NextResponse } from 'next/server'

import { cacheService } from '@/services/cache'
import type { StatsResponse } from '@/types/demo'

export async function GET() {
  const cached = await cacheService.getStats()

  if (cached) {
    const response: StatsResponse = { ...cached, cache: 'hit' }
    return NextResponse.json(response)
  }

  const data = await cacheService.fetchAndCacheStats(60)
  const response: StatsResponse = { ...data, cache: 'miss' }
  
  return NextResponse.json(response)
}
