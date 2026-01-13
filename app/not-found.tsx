import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        <p className="text-lg text-foreground/70">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-block bg-foreground text-background px-8 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
