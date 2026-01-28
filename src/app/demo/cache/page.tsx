'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { usePing } from '@/hooks/usePing'
import { useStats } from '@/hooks/useStats'

export default function CacheDemoPage() {
  const { data: stats, loading: statsLoading, error: statsError, fetchStats } = useStats()
  const { data: ping, loading: pingLoading, error: pingError, fetchPing } = usePing()

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <div>
          <h1 className="text-3xl font-semibold">Cache + Rate Limit Demo</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Test the Upstash cache helpers and rate limiter from the browser.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Cache Demo</CardTitle>
                <CardDescription>
                  Fetch stats and observe cache hits for 60 seconds.
                </CardDescription>
              </div>
              <Button
                onClick={fetchStats}
                isLoading={statsLoading}
                variant="primary"
              >
                Fetch /api/stats
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {statsError && (
              <p className="text-sm text-red-600 dark:text-red-400">{statsError}</p>
            )}
            {stats && (
              <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-4 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                {JSON.stringify(stats, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Rate Limit Demo</CardTitle>
                <CardDescription>
                  Hit the endpoint to consume 10 requests per 10 seconds.
                </CardDescription>
              </div>
              <Button
                onClick={fetchPing}
                isLoading={pingLoading}
                variant="outline"
              >
                Fetch /api/ping
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pingError && (
              <p className="text-sm text-red-600 dark:text-red-400">{pingError}</p>
            )}
            {ping && (
              <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-4 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                {JSON.stringify(ping, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
