import { auth, currentUser } from '@clerk/nextjs/server'

export async function getAuthUser() {
  const { userId } = await auth()
  if (!userId) return null
  return currentUser()
}

export async function requireAuth() {
  const user = await getAuthUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
