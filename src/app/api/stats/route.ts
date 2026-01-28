import { NextResponse } from 'next/server'

import { cacheGet, cacheSet } from '@/lib/cache'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { count } from 'drizzle-orm'

type StatsPayload = {
  userCount: number
  timestamp: string
  random: number
}

export async function GET() {
  const cacheKey = 'stats:global'
  const cached = await cacheGet<StatsPayload>(cacheKey)

  if (cached) {
    return NextResponse.json({ ...cached, cache: 'hit' })
  }

  const [row] = await db.select({ userCount: count() }).from(users)

  const payload: StatsPayload = {
    userCount: row?.userCount ?? 0,
    timestamp: new Date().toISOString(),
    random: Math.floor(Math.random() * 1000),
  }

  await cacheSet(cacheKey, payload, 60)

  return NextResponse.json({ ...payload, cache: 'miss' })
}
