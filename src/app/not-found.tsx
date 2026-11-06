import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest opacity-70">404</p>
      <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
      <p className="mt-4">The page you are looking for does not exist on this site.</p>
      <div className="mt-8 flex gap-6 text-sm font-semibold">
        <Link href="/" className="underline underline-offset-4">
          Back to home
        </Link>
        <Link href="/products" className="underline underline-offset-4">
          View products
        </Link>
      </div>
    </section>
  );
}
