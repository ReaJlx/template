import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { uploadImage } from '@/lib/media'

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadImage(buffer)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload failed', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
