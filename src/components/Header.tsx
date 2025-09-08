"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();

  const subscription = session?.user?.subscription || "free";

  // Simple color map for badge
  const badgeStyles: Record<string, string> = {
    free: "bg-gray-100 text-gray-600",
    pro: "bg-blue-100 text-blue-700",
    lifetime: "bg-green-100 text-green-700",
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="David Teaches Code Logo"
            width={500}
            height={500}
            className="h-15 w-35"
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/courses"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Courses
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Actions */}
        <div>
          {status === "loading" ? (
            <span className="text-gray-500">...</span>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              {/* Avatar */}
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt="profile"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border border-gray-200 shadow-sm"
                />
              )}

              {/* Subscription Badge */}
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full capitalize shadow-sm ${badgeStyles[subscription]}`}
              >
                {subscription}
              </span>

              {/* Sign out */}
              <button
                onClick={() => signOut()}
                className="rounded-full bg-red-50 px-5 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-100 hover:shadow transition hover:cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="rounded-full bg-green-50 px-5 py-2 text-sm font-medium text-green-600 shadow-sm hover:bg-green-100 hover:shadow transition hover:cursor-pointer"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
