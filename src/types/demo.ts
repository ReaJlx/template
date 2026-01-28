/**
 * Demo Page Types
 * Types used in demo pages for cache and media features
 */

// Cache Demo Types
export interface StatsData {
  userCount: number
  timestamp: string
  random: number
}

export interface StatsResponse extends StatsData {
  cache: 'hit' | 'miss'
}

export interface PingResponse {
  ok: boolean
  ip: string
  remaining: number
  reset: number
  error?: string
}

// Media Demo Types
export interface UploadResponse {
  url: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}
