/**
 * API Response Types
 * Standard wrappers for API responses
 */

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasMore: boolean
}

export interface ErrorResponse {
  error: string
  message?: string
}
