'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { CldImage } from 'next-cloudinary'

export default function MediaDemoPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState('Select an image to upload.')
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  const canUpload = useMemo(() => Boolean(selectedFile), [selectedFile])

  async function handleUpload() {
    if (!selectedFile) {
      setStatus('Please select a file first.')
      return
    }

    setStatus('Uploading...')
    setProgress(0)

    try {
      const url = await uploadFile(selectedFile, setProgress)
      setImageUrl(url)
      setStatus('Upload complete!')
    } catch (error) {
      console.error(error)
      setStatus('Upload failed. Please try again.')
    }
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

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null
                setSelectedFile(file)
                setStatus(file ? 'Ready to upload.' : 'Select an image to upload.')
                setProgress(0)
              }}
            />
            <button
              type="button"
              onClick={handleUpload}
              disabled={!canUpload}
              className="h-11 w-full rounded-full bg-foreground text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              Upload Image
            </button>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <p>{status}</p>
              {progress > 0 && progress < 100 && (
                <p className="mt-1">{progress}%</p>
              )}
            </div>
          </div>
        </div>

        {imageUrl && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <CldImage
              src={imageUrl}
              alt="Uploaded image"
              width={720}
              height={480}
              deliveryType="fetch"
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function uploadFile(file: File, onProgress: (value: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', file)

    xhr.open('POST', '/api/upload')

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        onProgress(percent)
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText)
          resolve(data.url)
        } catch (error) {
          reject(error)
        }
      } else {
        reject(new Error('Upload failed'))
      }
    }

    xhr.onerror = () => reject(new Error('Upload failed'))

    xhr.send(formData)
  })
}
