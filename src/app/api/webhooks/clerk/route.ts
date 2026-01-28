import { headers } from 'next/headers'
import { Webhook } from 'svix'

import { userService } from '@/services/user/user.service'

type ClerkWebhookUser = {
  id: string
  email_addresses?: Array<{ email_address: string }>
  first_name?: string | null
  last_name?: string | null
  image_url?: string | null
}

type ClerkWebhookEvent = {
  type: 'user.created' | 'user.updated' | 'user.deleted'
  data: ClerkWebhookUser
}

function getDisplayName(user: ClerkWebhookUser) {
  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(' ')
    .trim()

  return fullName || null
}

export async function POST(request: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    return new Response('Missing CLERK_WEBHOOK_SECRET', { status: 500 })
  }

  const payload = await request.text()
  const headerList = await headers()

  const svixId = headerList.get('svix-id')
  const svixTimestamp = headerList.get('svix-timestamp')
  const svixSignature = headerList.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const webhook = new Webhook(webhookSecret)
  let event: ClerkWebhookEvent

  try {
    event = webhook.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookEvent
  } catch (error) {
    console.error('Clerk webhook verification failed', error)
    return new Response('Invalid webhook signature', { status: 400 })
  }

  const clerkUser = event.data

  if (event.type === 'user.deleted') {
    if (clerkUser?.id) {
      await userService.deleteByClerkId(clerkUser.id)
    }

    return Response.json({ ok: true })
  }

  const email = clerkUser.email_addresses?.[0]?.email_address
  if (!email) {
    return new Response('Missing email address', { status: 400 })
  }

  await userService.syncFromClerk({
    clerkId: clerkUser.id,
    email,
    name: getDisplayName(clerkUser),
    imageUrl: clerkUser.image_url ?? null,
  })

  return Response.json({ ok: true })
}
