"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { formatZar, shippingCentsFor } from "@/lib/money";

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

export function CheckoutForm() {
  const { items, subtotalCents, clear } = useCart();
  const shipping = shippingCentsFor(subtotalCents);
  const total = subtotalCents + shipping;
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    const form = new FormData(event.currentTarget);
    setPending(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          email: form.get("email"),
          phone: form.get("phone"),
          address: form.get("address"),
          city: form.get("city"),
          province: form.get("province"),
          postalCode: form.get("postalCode"),
          notes: form.get("notes"),
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { reference?: string; error?: string };
      if (!res.ok || !data.reference) {
        setError(data.error || "Could not place order.");
        return;
      }
      clear();
      router.push(`/order/${data.reference}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (!items.length) {
    return (
      <p className="text-sm text-neutral-600">
        Your cart is empty. Add a pair before checking out.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <h2 className="text-[11px] uppercase tracking-[0.22em]">Delivery details</h2>
        <input name="customerName" required placeholder="Full name" className="field" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="email" type="email" required placeholder="Email" className="field" />
          <input name="phone" required placeholder="Phone" className="field" />
        </div>
        <input name="address" required placeholder="Street address" className="field" />
        <div className="grid gap-4 sm:grid-cols-3">
          <input name="city" required placeholder="City" className="field" />
          <select name="province" required defaultValue="Western Cape" className="field">
            {PROVINCES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <input name="postalCode" required placeholder="Postal code" className="field" />
        </div>
        <textarea name="notes" placeholder="Delivery notes (optional)" className="field min-h-24" />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-[#dc2626] py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white disabled:opacity-60"
        >
          {pending ? "Placing order…" : `Place order · ${formatZar(total)}`}
        </button>
      </div>

      <aside className="h-fit border border-neutral-200 p-6">
        <h2 className="text-[11px] uppercase tracking-[0.22em]">Order summary</h2>
        <ul className="mt-5 divide-y divide-neutral-200">
          {items.map((item) => (
            <li key={`${item.productId}-${item.size}`} className="flex gap-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-16 w-16 object-cover" />
              <div className="flex-1 text-sm">
                <p>{item.name}</p>
                <p className="text-neutral-500">
                  {item.size} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm">{formatZar(item.priceCents * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatZar(subtotalCents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{shipping === 0 ? "Free" : formatZar(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatZar(total)}</span>
          </div>
        </div>
      </aside>
    </form>
  );
}
