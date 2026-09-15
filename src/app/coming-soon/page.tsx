import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";

export default async function ComingSoonPage() {
  const items = await getProducts({ category: "combos" });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">Hot now</p>
      <h1 className="mt-2 text-3xl font-black uppercase tracking-tight">Sneaker combos</h1>
      <p className="mt-2 max-w-xl text-sm text-neutral-600">
        Two pairs, one checkout. Mix your rotation and save with a combo deal.
      </p>
      <Link href="/shop?category=sneakers" className="mt-4 inline-block text-sm underline">
        Shop individual sneakers
      </Link>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
