'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { CldImage } from 'next-cloudinary'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { FileInput } from '@/components/ui/Input'
import { useUpload } from '@/hooks/useUpload'

export default function MediaDemoPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { upload, uploading, progress, error, reset } = useUpload()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  async function handleUpload() {
    if (!selectedFile) return

    try {
      const url = await upload(selectedFile)
      setImageUrl(url)
    } catch {
      // Error is handled by the hook
    }
  }

  function handleFileChange(file: File | null) {
    setSelectedFile(file)
    setImageUrl(null)
    reset()
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold">Cloudinary Media Upload</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Upload an image to Cloudinary and preview it below.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload</CardTitle>
            <CardDescription>Select an image file to upload</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FileInput
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              isLoading={uploading}
              className="w-full"
            >
              {uploading ? `Uploading ${progress}%` : 'Upload Image'}
            </Button>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {uploading && progress > 0 && progress < 100 && (
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full bg-foreground transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {imageUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Your uploaded image</CardDescription>
            </CardHeader>
            <CardContent>
              <CldImage
                src={imageUrl}
                alt="Uploaded image"
                width={720}
                height={480}
                deliveryType="fetch"
                className="h-auto w-full rounded-xl object-cover"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
