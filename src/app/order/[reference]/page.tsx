import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const rows = await db.select().from(orders).where(eq(orders.reference, reference)).limit(1);
  const order = rows[0];
  if (!order) notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">Order confirmed</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Thanks, {order.customerName}.</h1>
      <p className="mt-3 text-sm text-neutral-600">
        Your order <span className="font-medium text-black">{order.reference}</span> is in. We&apos;ll
        email {order.email} with packing updates.
      </p>

      <div className="mt-10 border border-neutral-200">
        <div className="border-b border-neutral-200 bg-[#f6f6f6] px-5 py-3 text-[11px] uppercase tracking-[0.18em]">
          Items
        </div>
        <ul className="divide-y divide-neutral-200">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 px-5 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-16 w-16 object-cover" />
              <div className="flex-1 text-sm">
                <p>{item.name}</p>
                <p className="text-neutral-500">
                  {item.size} · Qty {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 border-t border-neutral-200 px-5 py-4 text-sm">
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>We&apos;ll confirm delivery details by email</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-neutral-600">
        <p className="font-medium text-black">Ship to</p>
        <p className="mt-2">
          {order.address}
          <br />
          {order.city}, {order.province} {order.postalCode}
          <br />
          {order.phone}
        </p>
      </div>

      <Link
        href="/shop"
        className="mt-10 inline-block bg-black px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-white"
      >
        Continue shopping
      </Link>
    </main>
  );
}
