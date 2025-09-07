export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <a
          href="/"
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
