"use client"

import { useState, useCallback } from 'react'

import type { PingResponse } from '@/types/demo'

interface UsePingReturn {
  data: PingResponse | null
  loading: boolean
  error: string | null
  fetchPing: () => Promise<void>
}

export function usePing(): UsePingReturn {
  const [data, setData] = useState<PingResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPing = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/ping')
      const pingData = (await res.json()) as PingResponse

      if (!res.ok) {
        setError(pingData.error ?? 'Rate limit exceeded')
      }

      setData(pingData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ping')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchPing }
}
