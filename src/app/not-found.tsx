import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 