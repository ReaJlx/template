import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: Buffer, folder = 'uploads'): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result!.secure_url)
      }
    ).end(file)
  })
}

export function getImageUrl(publicId: string, options?: { width?: number; height?: number }): string {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width: options?.width, height: options?.height, crop: 'fill' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  })
}

export { cloudinary }
