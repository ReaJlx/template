/**
 * Media Library
 * Re-exports from services/media for backward compatibility
 * @deprecated Import from @/services/media instead
 */

export { mediaService, mediaService as cloudinary } from '@/services/media'
export { uploadImage, getImageUrl } from './deprecated-helpers'
