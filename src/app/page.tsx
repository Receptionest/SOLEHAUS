import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Countdown } from "@/components/countdown";
import { getFeatured, getProducts } from "@/lib/products";

const REVIEWS = [
  {
    name: "Thandi M.",
    badge: "Verified Purchase",
    date: "September 2026",
    text: "My combo arrived in two days and both pairs fit perfectly. Wearing them non-stop — the combo deals are unbeatable.",
  },
  {
    name: "Nomsa D.",
    badge: "Verified Purchase",
    date: "July 2026",
    text: "The weave blends beautifully with my natural hair and feels so soft. Easily my favourite buy this year.",
  },
  {
    name: "Lerato M.",
    badge: "Repeat Customer",
    date: "July 2026",
    text: "Bought my first Airforce pair here two years ago and they still look great. Just ordered my second pair.",
  },
  {
    name: "Sipho N.",
    badge: "Verified Purchase",
    date: "June 2026",
    text: "Solid craftsmanship and the sizing guide was spot on. Worth every rand — I'll definitely be back.",
  },
  {
    name: "Zanele K.",
    badge: "Fast Delivery",
    date: "April 2026",
    text: "Ordered on Monday, delivered Wednesday. The courier phoned ahead and everything arrived in perfect condition.",
  },
  {
    name: "Precious M.",
    badge: "Verified Purchase",
    date: "March 2026",
    text: "Smooth from checkout to delivery, with tracking updates the whole way. The whole process was effortless.",
  },
];

export default async function HomePage() {
  const [combos, sneakers, sale] = await Promise.all([
    getFeatured(),
    getProducts({ category: "sneakers", sort: "newest" }),
    getProducts({ sale: true, sort: "price-asc" }),
  ]);

  const comboSlice = combos.slice(0, 8);
  const sneakerSlice = sneakers.slice(0, 16);
  const saleSlice = sale.slice(0, 8);

  return (
    <main>
      <section className="relative overflow-hidden bg-[#111] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 md:grid-cols-2 md:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e8d9b8]">
              SOLEHAUS
            </p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
              Spring clearance sale
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Massive discounts and free delivery on sneakers and combos — Airforce, Lowdunk,
              Jordan, adidas, PUMA and more. Courier to your door, nationwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop?category=combos"
                className="rounded-full bg-[#dc2626] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em]"
              >
                Shop combos
              </Link>
              <Link
                href="/shop?category=sneakers"
                className="rounded-full border border-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em]"
              >
                All sneakers
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero.jpg" alt="SOLEHAUS sneaker wall" className="w-full object-cover" />
          </div>
        </div>
      </section>

      <Countdown />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">
              Best sellers
            </p>
            <h2 className="mt-1 text-2xl font-black uppercase tracking-tight">Sneaker combos</h2>
          </div>
          <Link href="/shop?category=combos" className="text-[11px] font-bold uppercase tracking-[0.18em] underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {comboSlice.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#ded5c3] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em]">Sale</p>
              <h2 className="mt-1 text-2xl font-black uppercase tracking-tight">Marked down</h2>
            </div>
            <Link href="/sale" className="text-[11px] font-bold uppercase tracking-[0.18em] underline">
              Shop sale
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {saleSlice.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">
              Individual sneakers
            </p>
            <h2 className="mt-1 text-2xl font-black uppercase tracking-tight">All sneakers</h2>
          </div>
          <Link
            href="/shop?category=sneakers"
            className="text-[11px] font-bold uppercase tracking-[0.18em] underline"
          >
            Next page
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {sneakerSlice.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#f7f4ee] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight">What our customers say</h2>
            <p className="mt-2 text-sm text-neutral-600">Real reviews from real customers</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <article key={review.name} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-[#eab308]">★★★★★</p>
                <span className="mt-3 inline-block rounded-full bg-[#dc2626] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  {review.badge}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700">{review.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#dc2626] text-sm font-bold text-white">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-neutral-400">{review.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl bg-[#111] px-8 py-10 text-white md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8d9b8]">
              Best value
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase">Ready for a combo?</h2>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Two pairs. One order. Courier to your door.
            </p>
          </div>
          <Link
            href="/shop?category=combos"
            className="mt-6 inline-block rounded-full bg-[#dc2626] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] md:mt-0"
          >
            Shop combos
          </Link>
        </div>
      </section>
    </main>
  );
}
