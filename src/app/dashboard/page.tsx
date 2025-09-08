"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [pending, setPending] = useState(false);

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (!session)
    return <p className="p-6">You must be signed in to view this page.</p>;

  const subscription = session.user?.subscription ?? "free";

  // ✅ pull cancelAt from session (populated in NextAuth callback)
  const cancelAt = session.user?.cancelAt
    ? new Date(session.user.cancelAt).getTime()
    : null;

  const endDateText = cancelAt ? new Date(cancelAt).toLocaleDateString() : null;

  /** Cancel subscription at period end */
  const cancel = async () => {
    try {
      setPending(true);
      const res = await fetch("/api/unsubscribe", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Cancel failed");

      window.alert(
        "✅ Your subscription will remain active until the end of the billing period."
      );
    } catch (e: unknown) {
      window.alert(
        e instanceof Error ? e.message : "An unexpected error occurred."
      );
    } finally {
      setPending(false);
    }
  };

  /** Resume subscription */
  const resume = async () => {
    try {
      setPending(true);
      const res = await fetch("/api/subscription/resume", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Resume failed");

      window.alert("🎉 Your subscription has been resumed.");
    } catch (e: unknown) {
      window.alert(
        e instanceof Error ? e.message : "Failed to resume subscription."
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-md space-y-6">
      {/* Banner if cancellation scheduled */}
      {endDateText && (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 px-4 py-3 text-sm">
          ⚠️ Your Pro plan is scheduled to end on <b>{endDateText}</b>. You keep
          access until then.
        </div>
      )}

      <div className="flex items-center gap-4">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="Avatar"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-slate-300 shadow-sm"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
            {session.user?.name?.charAt(0) ?? "?"}
          </div>
        )}

        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {session.user?.name || "User"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {session.user?.email}
          </p>

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
            {endDateText ? ` — cancels on ${endDateText}` : ""}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Free users → upsell */}
        {subscription === "free" && (
          <a
            href="/subscribe"
            className="block text-center rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-blue-700 transition"
          >
            Upgrade to Pro
          </a>
        )}

        {/* Pro users → can cancel or resume */}
        {subscription === "pro" && !endDateText && (
          <button
            onClick={cancel}
            disabled={pending}
            className="w-full rounded-lg bg-red-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-red-700 transition disabled:opacity-50 hover:cursor-pointer"
          >
            {pending ? "Cancelling..." : "Cancel Subscription"}
          </button>
        )}

        {subscription === "pro" && endDateText && (
          <button
            onClick={resume}
            disabled={pending}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-emerald-700 transition disabled:opacity-50 hover:cursor-pointer"
          >
            {pending ? "Resuming..." : "Resume Subscription"}
          </button>
        )}

        {/* Lifetime users */}
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
