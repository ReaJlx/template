import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { cacheService } from '@/services/cache'

async function getClientIp(): Promise<string> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  const realIp = headerList.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown'
  }

  return realIp ?? 'unknown'
}

export async function GET() {
  const ip = await getClientIp()
  const { success, remaining, reset } = await cacheService.checkRateLimit(ip)

  const response = {
    ok: success,
    ip,
    remaining,
    reset,
  }

  if (!success) {
    return NextResponse.json(
      { ...response, error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  return NextResponse.json(response)
}
