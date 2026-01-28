/**
 * Media Repository
 * Low-level data access for Cloudinary
 */

import type { ConfigOptions } from 'cloudinary'

import type { MediaTransformOptions, MediaUploadResult } from './media.types'

export interface MediaRepository {
  upload(file: Buffer, folder: string): Promise<MediaUploadResult>
  getUrl(publicId: string, options?: MediaTransformOptions): string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CloudinaryV2 = any

export class CloudinaryRepository implements MediaRepository {
  constructor(private readonly cloudinary: CloudinaryV2) {
    this.cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async upload(file: Buffer, folder: string): Promise<MediaUploadResult> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error: Error | null, result?: { secure_url: string; public_id: string }) => {
          if (error || !result) {
            reject(error ?? new Error('Upload failed'))
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            })
          }
        }
      ).end(file)
    })
  }

  getUrl(publicId: string, options?: MediaTransformOptions): string {
    return this.cloudinary.url(publicId, {
      secure: true,
      transformation: [
        { 
          width: options?.width, 
          height: options?.height, 
          crop: 'fill' 
        },
        { 
          quality: options?.quality ?? 'auto', 
          fetch_format: options?.format ?? 'auto' 
        },
      ],
    })
  }
}
