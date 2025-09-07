"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    priceId: null,
    cta: "Start Free",
    features: ["Access to first section of all courses"],
  },
  {
    name: "Pro",
    price: "$10",
    period: "per month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
    cta: "Subscribe Monthly",
    features: [
      "Access to all sections",
      "Cancel anytime",
      "New content monthly",
    ],
  },
  {
    name: "Lifetime",
    price: "$100",
    period: "one-time",
    priceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID!,
    cta: "Get Lifetime Access",
    features: [
      "Lifetime access to all courses",
      "All future updates",
      "Best value",
    ],
  },
];

export default function SubscribePage() {
  const router = useRouter();

  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) {
      router.push("/courses");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Unlock the full learning experience by subscribing.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-3xl font-extrabold text-blue-600 mb-2">
              {plan.price}
            </p>
            <p className="text-sm text-slate-500 mb-6">{plan.period}</p>

            <ul className="flex-1 space-y-3 text-left mb-6">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                >
                  <Check className="w-5 h-5 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.priceId)}
              className="w-full font-semibold py-3 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
