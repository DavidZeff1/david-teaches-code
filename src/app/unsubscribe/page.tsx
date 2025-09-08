// src/app/unsubscribe/page.tsx
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function UnsubscribePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center space-y-6">
        <XCircle className="w-12 h-12 text-red-500 mx-auto" />

        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Manage Your Subscription
        </h1>

        <p className="text-slate-600 dark:text-slate-400">
          To unsubscribe, please use the button in your{" "}
          <Link
            href="/dashboard"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            dashboard
          </Link>
          . There you can cancel your plan, and it will remain active until the
          end of your billing period.
        </p>

        <Link
          href="/dashboard"
          className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
