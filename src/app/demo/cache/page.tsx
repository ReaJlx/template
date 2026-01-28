'use client'

import { useState } from 'react'

type StatsResponse = {
  userCount: number
  timestamp: string
  random: number
  cache: 'hit' | 'miss'
}

type PingResponse = {
  ok: boolean
  ip: string
  remaining: number
  reset: number
  error?: string
}

export default function CacheDemoPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [statsLoading, setStatsLoading] = useState(false)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [ping, setPing] = useState<PingResponse | null>(null)
  const [pingLoading, setPingLoading] = useState(false)
  const [pingError, setPingError] = useState<string | null>(null)

  const fetchStats = async () => {
    setStatsLoading(true)
    setStatsError(null)

    try {
      const res = await fetch('/api/stats')
      const data = (await res.json()) as StatsResponse
      setStats(data)
    } catch (error) {
      setStatsError('Failed to fetch stats.')
      setStats(null)
    } finally {
      setStatsLoading(false)
    }
  }

  const fetchPing = async () => {
    setPingLoading(true)
    setPingError(null)

    try {
      const res = await fetch('/api/ping')
      const data = (await res.json()) as PingResponse
      setPing(data)

      if (!res.ok) {
        setPingError(data.error ?? 'Rate limit exceeded.')
      }
    } catch (error) {
      setPingError('Failed to fetch ping.')
      setPing(null)
    } finally {
      setPingLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <div>
          <h1 className="text-3xl font-semibold">Cache + Rate Limit Demo</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Test the Upstash cache helpers and rate limiter from the browser.
          </p>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Cache Demo</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Fetch stats and observe cache hits for 60 seconds.
              </p>
            </div>
            <button
              onClick={fetchStats}
              disabled={statsLoading}
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition disabled:opacity-50"
            >
              {statsLoading ? 'Loading...' : 'Fetch /api/stats'}
            </button>
          </div>

          <div className="mt-4">
            {statsError && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {statsError}
              </p>
            )}
            {stats && (
              <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-100 p-4 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                {JSON.stringify(stats, null, 2)}
              </pre>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Rate Limit Demo</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Hit the endpoint to consume 10 requests per 10 seconds.
              </p>
            </div>
            <button
              onClick={fetchPing}
              disabled={pingLoading}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              {pingLoading ? 'Loading...' : 'Fetch /api/ping'}
            </button>
          </div>

          <div className="mt-4">
            {pingError && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {pingError}
              </p>
            )}
            {ping && (
              <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-100 p-4 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                {JSON.stringify(ping, null, 2)}
              </pre>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
