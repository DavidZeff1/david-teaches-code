"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-6">You must be signed in to view this page.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Sign out
      </button>
    </div>
  );
}
