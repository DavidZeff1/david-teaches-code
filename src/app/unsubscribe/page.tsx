"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UnsubscribePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUnsubscribe = async () => {
    setLoading(true);

    const res = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert(
        "Your subscription has been cancelled. You’ll keep access until the end of the billing period."
      );
      router.push("/dashboard");
    } else {
      alert("Failed to cancel subscription. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Cancel Subscription
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Are you sure you want to cancel your Pro subscription? You’ll keep
          access until the end of your billing cycle.
        </p>
        <button
          onClick={handleUnsubscribe}
          disabled={loading}
          className="w-full font-semibold py-3 px-6 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Cancelling..." : "Confirm Cancel"}
        </button>
      </div>
    </main>
  );
}
