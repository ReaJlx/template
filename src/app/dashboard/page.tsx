import Image from "next/image";
import Link from "next/link";

import { requireAuth } from "@/lib/auth";
import { userService } from "@/services/user";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireAuth();
  const dbUser = await userService.getUserByClerkId(user.id);
  const isSynced = Boolean(dbUser);
  const createdAt = dbUser?.createdAt
    ? new Date(dbUser.createdAt).toLocaleString()
    : "—";
  const { SignOutButton } = await import("@clerk/nextjs");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>

        <div className="flex flex-col items-center gap-4">
          {user.imageUrl && (
            <Image
              src={user.imageUrl}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <div className="text-center">
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {user.emailAddresses[0]?.emailAddress}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              DB Sync: {isSynced ? "Synced" : "Pending"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Created: {createdAt}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Link
            href="/"
            className="flex h-10 items-center justify-center rounded-full border border-zinc-200 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            ← Back to Home
          </Link>
          <SignOutButton>
            <button className="flex h-10 w-full cursor-pointer items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white transition-colors hover:bg-red-600">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </main>
    </div>
  );
}
