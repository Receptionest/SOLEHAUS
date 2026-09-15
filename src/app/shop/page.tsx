import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";
import { BRANDS } from "@/lib/nav";

const CATS = [
  ["combos", "Combos"],
  ["sneakers", "Sneakers"],
  ["boots", "Boots"],
  ["slides", "Slides"],
  ["weaves", "Weaves"],
  ["accessories", "Caps"],
] as const;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    gender?: string;
    q?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  const items = await getProducts({
    category: params.category,
    brand: params.brand,
    gender: params.gender,
    q: params.q,
    sort: params.sort,
  });

  const title = params.q
    ? `Search: ${params.q}`
    : params.brand
      ? params.brand
      : params.category
        ? params.category[0].toUpperCase() + params.category.slice(1)
        : "All products";

  const sortLinks = [
    ["newest", "Newest"],
    ["price-asc", "Price: low to high"],
    ["price-desc", "Price: high to low"],
    ["name", "Name"],
  ] as const;

  function href(next: Record<string, string | undefined>) {
    const merged = { ...params, ...next };
    const qs = new URLSearchParams();
    Object.entries(merged).forEach(([key, value]) => {
      if (value) qs.set(key, value);
    });
    const s = qs.toString();
    return s ? `/shop?${s}` : "/shop";
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">Shop</p>
      <h1 className="mt-2 text-3xl font-black uppercase tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{items.length} products</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href={href({ category: undefined })}
          className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            !params.category ? "border-black bg-black text-white" : "border-neutral-300"
          }`}
        >
          All
        </Link>
        {CATS.map(([value, label]) => (
          <Link
            key={value}
            href={href({ category: params.category === value ? undefined : value })}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
              params.category === value ? "border-black bg-black text-white" : "border-neutral-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {BRANDS.map((brand) => (
          <Link
            key={brand}
            href={href({ brand: params.brand === brand ? undefined : brand })}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
              params.brand === brand ? "border-[#dc2626] bg-[#dc2626] text-white" : "border-neutral-300"
            }`}
          >
            {brand}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {sortLinks.map(([value, label]) => (
          <Link
            key={value}
            href={href({ sort: value === "newest" ? undefined : value })}
            className={(params.sort ?? "newest") === value ? "text-black underline" : "hover:text-black"}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
