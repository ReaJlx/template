"use client"

import { useState, useCallback } from 'react'

import type { StatsResponse } from '@/types/demo'

interface UseStatsReturn {
  data: StatsResponse | null
  loading: boolean
  error: string | null
  fetchStats: () => Promise<void>
}

export function useStats(): UseStatsReturn {
  const [data, setData] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stats')
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const statsData = (await res.json()) as StatsResponse
      setData(statsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchStats }
}
