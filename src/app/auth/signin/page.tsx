"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  if (!providers) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Sign in to David Teaches Code</h1>
      {Object.values(providers).map((provider: any) => (
        <button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
}
