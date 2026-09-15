import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { shippingCentsFor } from "@/lib/money";

type Payload = {
  customerName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  notes?: string;
  items?: { productId: number; size: string; quantity: number }[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const required = [
    body.customerName,
    body.email,
    body.phone,
    body.address,
    body.city,
    body.province,
    body.postalCode,
  ];
  if (required.some((value) => !value || !String(value).trim()) || !body.items?.length) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const ids = [...new Set(body.items.map((item) => item.productId))];
  const rows = await db.select().from(products).where(inArray(products.id, ids));
  const byId = new Map(rows.map((row) => [row.id, row]));

  let subtotal = 0;
  const lines: {
    productId: number;
    name: string;
    size: string;
    quantity: number;
    priceCents: number;
    image: string;
  }[] = [];

  for (const item of body.items) {
    const product = byId.get(item.productId);
    if (!product || product.comingSoon || !product.inStock) {
      return NextResponse.json({ error: "One or more items are no longer available." }, { status: 400 });
    }
    const quantity = Math.max(1, Math.min(5, Number(item.quantity) || 1));
    const size = String(item.size || "").trim();
    if (!size) {
      return NextResponse.json({ error: "Please choose a size for every item." }, { status: 400 });
    }
    subtotal += product.priceCents * quantity;
    lines.push({
      productId: product.id,
      name: product.name,
      size,
      quantity,
      priceCents: product.priceCents,
      image: product.image,
    });
  }

  const shippingCents = shippingCentsFor(subtotal);
  const reference = `SH${Date.now().toString(36).toUpperCase()}`;

  const inserted = await db
    .insert(orders)
    .values({
      reference,
      customerName: String(body.customerName).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      address: String(body.address).trim(),
      city: String(body.city).trim(),
      province: String(body.province).trim(),
      postalCode: String(body.postalCode).trim(),
      notes: body.notes ? String(body.notes).trim() : null,
      subtotalCents: subtotal,
      shippingCents,
      totalCents: subtotal + shippingCents,
      status: "confirmed",
    })
    .returning({ id: orders.id, reference: orders.reference });

  const order = inserted[0];
  await db.insert(orderItems).values(
    lines.map((line) => ({
      orderId: order.id,
      ...line,
    })),
  );

  return NextResponse.json({ reference: order.reference });
}
