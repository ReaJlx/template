/**
 * Media Helpers (Deprecated)
 * These helpers are deprecated. Use mediaService from @/services/media instead.
 */

import { mediaService } from '@/services/media'
import type { MediaTransformOptions } from '@/services/media/media.types'

/** @deprecated Use mediaService.uploadImage() instead */
export async function uploadImage(file: Buffer, folder = 'uploads'): Promise<string> {
  const result = await mediaService.uploadImage(file, folder)
  return result.url
}

/** @deprecated Use mediaService.getImageUrl() instead */
export function getImageUrl(publicId: string, options?: { width?: number; height?: number }): string {
  const transformOptions: MediaTransformOptions = {
    width: options?.width,
    height: options?.height,
    quality: 'auto',
    format: 'auto',
  }
  return mediaService.getImageUrl(publicId, transformOptions)
}
