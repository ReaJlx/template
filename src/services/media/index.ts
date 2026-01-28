import { v2 as cloudinary } from 'cloudinary'

import { CloudinaryRepository } from './media.repository'
import { DefaultMediaService } from './media.service'

export * from './media.types'
export { CloudinaryRepository, type MediaRepository } from './media.repository'
export { DefaultMediaService } from './media.service'

// Repository with injected cloudinary instance
const mediaRepository = new CloudinaryRepository(cloudinary)

// Service with injected repository
export const mediaService = new DefaultMediaService(mediaRepository)
