export default function Home() {
  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        David Teaches Code
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Structured courses with lessons, videos, and coding challenges.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="/courses"
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:opacity-90"
        >
          Browse courses
        </a>
        <a
          href="/auth/signin"
          className="rounded-lg border px-5 py-3 font-medium hover:bg-gray-50"
        >
          Sign in
        </a>
      </div>
    </main>
  );
}
