import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function getAuthUser() {
  // Return null if Clerk is not configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return null
  }
  const { userId } = await auth()
  if (!userId) return null
  return currentUser()
}

export async function requireAuth() {
  const user = await getAuthUser()
  if (!user) {
    redirect('/sign-in')
  }
  return user
}
