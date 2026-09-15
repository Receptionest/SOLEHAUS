import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { getProductBySlug, getRelated } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelated(product);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
        <Link href="/shop">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?brand=${encodeURIComponent(product.brand)}`}>{product.brand}</Link>
      </p>

      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square bg-[#f3f3f3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.hoverImage ? (
            <div className="aspect-square bg-[#f3f3f3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.hoverImage} alt="" className="h-full w-full object-cover" />
            </div>
          ) : null}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          {product.badge ? (
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                product.badge === "SALE" ? "text-red-600" : ""
              }`}
            >
              {product.badge}
            </p>
          ) : null}
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-sm text-neutral-500">{product.color}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600">
            {product.description}
          </p>
          <p className="mt-4 text-xs text-neutral-400">SKU {product.sku}</p>
          <div className="mt-8">
            <AddToCart product={product} />
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mt-20">
          <h2 className="text-xl font-semibold">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
