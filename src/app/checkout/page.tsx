import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">Checkout</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Delivery & payment</h1>
      <p className="mt-2 max-w-xl text-sm text-neutral-600">
        We currently take orders for EFT confirmation and in-store collection. You&apos;ll
        receive your order reference instantly.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </main>
  );
}
