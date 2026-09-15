import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";

export default async function SalePage() {
  const items = await getProducts({ sale: true, sort: "price-asc" });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-[11px] uppercase tracking-[0.22em] text-red-600">Sale</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Marked down</h1>
      <p className="mt-2 text-sm text-neutral-500">{items.length} products</p>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
