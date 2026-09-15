"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/db/schema";
import { parseSizes } from "@/lib/sizes";

export function AddToCart({ product }: { product: Product }) {
  const sizes = parseSizes(product.sizes);
  const [size, setSize] = useState(sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const cart = useCart();
  const router = useRouter();

  const disabled = product.comingSoon || !product.inStock;

  function add() {
    if (!size || disabled) return;
    cart.addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.image,
        size,
        priceCents: product.priceCents,
      },
      1,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <span>Select size</span>
          <span className="text-neutral-400">UK sizing</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={`border px-2 py-2 text-xs ${
                size === option ? "border-black bg-black text-white" : "border-neutral-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={add}
        className="w-full rounded-full bg-[#dc2626] py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        {product.comingSoon
          ? product.dropDate
            ? `Drops ${product.dropDate}`
            : "Coming soon"
            : added
              ? "Added to cart"
              : "Add to cart"}
      </button>

      {!disabled ? (
        <button
          type="button"
          onClick={() => {
            add();
            router.push("/checkout");
          }}
          className="w-full rounded-full border border-black py-3.5 text-[12px] font-bold uppercase tracking-[0.22em]"
        >
          Buy now
        </button>
      ) : null}

      <p className="text-xs leading-relaxed text-neutral-500">
        Shipping calculated at checkout. Free delivery on qualifying orders. Easy refunds on unused items.
      </p>
    </div>
  );
}
