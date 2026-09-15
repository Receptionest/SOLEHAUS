import Link from "next/link";
import type { Product } from "@/db/schema";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f3eee6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#dc2626] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            {product.badge}
          </span>
        ) : null}
        {product.category === "combos" ? (
          <span className="absolute right-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            Combo
          </span>
        ) : null}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium leading-snug group-hover:underline">{product.name}</h3>
      </div>
    </Link>
  );
}
