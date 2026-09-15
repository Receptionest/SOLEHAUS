import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { catalogInserts } from "@/lib/catalog";
import { count, ilike } from "drizzle-orm";

export async function ensureCatalog() {
  const items = catalogInserts();

  const [{ value }] = await db.select({ value: count() }).from(products);
  const [{ value: stale }] = await db
    .select({ value: count() })
    .from(products)
    .where(ilike(products.description, "%sgm%"));

  if (Number(value) === items.length && Number(stale) === 0) return;

  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(products);

  for (let i = 0; i < items.length; i += 80) {
    await db.insert(products).values(items.slice(i, i + 80));
  }
}
