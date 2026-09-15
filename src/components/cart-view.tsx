"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CartView() {
  const { items, updateQty, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block bg-black px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map((item) => (
          <li key={`${item.productId}-${item.size}`} className="flex gap-5 py-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.name} className="h-28 w-28 object-cover bg-[#f3f3f3]" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                  {item.brand}
                </p>
                <Link href={`/product/${item.slug}`} className="mt-1 block hover:underline">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-neutral-500">{item.size}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQty(item.productId, item.size, Number(e.target.value))}
                  className="border border-neutral-300 px-2 py-1 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-xs uppercase tracking-[0.14em] text-neutral-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit bg-[#f6f6f6] p-6">
        <h2 className="text-[11px] uppercase tracking-[0.22em]">Summary</h2>
        <div className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block rounded-full bg-[#dc2626] py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.22em] text-white"
        >
          Checkout
        </Link>
      </aside>
    </div>
  );
}
