import Link from "next/link";
export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center">
      <h1 className="text-7xl font-extrabold text-accent">404</h1>
      <p className="mt-4 text-xl">Page not found</p>
      <Link href="/" className="mt-8 inline-block bg-accent hover:bg-accent2 px-6 py-3 rounded-full font-semibold">Go Home</Link>
    </div>
  );
}
