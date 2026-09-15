import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Countdown } from "@/components/countdown";
import { getFeatured, getProducts } from "@/lib/products";

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
