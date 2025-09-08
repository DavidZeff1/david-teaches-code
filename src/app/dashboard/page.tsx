"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  if (!session) {
    return <p className="p-6">You must be signed in to view this page.</p>;
  }

  const { user } = session;
  const subscription = user?.subscription || "free";

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-md space-y-6">
      {/* User Info */}
      <div className="flex items-center gap-4">
        {user?.image ? (
          <Image
            src={user.image}
            alt="Avatar"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-slate-300 shadow-sm"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
            {user?.name?.charAt(0) ?? "?"}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {user?.name || "User"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">{user?.email}</p>
          <span
            className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm capitalize
              ${
                subscription === "pro"
                  ? "bg-blue-100 text-blue-700"
                  : subscription === "lifetime"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {subscription}
          </span>
        </div>
      </div>

      {/* Subscription Action */}
      <div className="space-y-3">
        {subscription === "free" && (
          <Link
            href="/subscribe"
            className="block text-center rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-blue-700 transition"
          >
            Upgrade to Pro
          </Link>
        )}

        {subscription === "pro" && (
          <Link
            href="/unsubscribe"
            className="block text-center rounded-lg bg-red-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-red-700 transition"
          >
            Cancel Subscription
          </Link>
        )}

        {subscription === "lifetime" && (
          <div className="text-center text-green-600 dark:text-green-400 font-medium">
            🎉 Lifetime Member
          </div>
        )}
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut()}
        className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-slate-700 dark:text-slate-300 font-medium shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      >
        Sign out
      </button>
    </div>
  );
}
