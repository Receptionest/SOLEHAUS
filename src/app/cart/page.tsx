import { CartView } from "@/components/cart-view";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">Bag</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your cart</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </main>
  );
}
