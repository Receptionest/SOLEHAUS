import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-6">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold">That pair has walked off.</h1>
        <Link
          href="/shop"
          className="mt-6 inline-block bg-black px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-white"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
