import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { catalogInserts } from "@/lib/catalog";
import { count, ilike } from "drizzle-orm";

let seedingPromise: Promise<void> | null = null;

async function seed() {
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
    await db
      .insert(products)
      .values(items.slice(i, i + 80))
      .onConflictDoNothing({ target: products.slug });
  }
}

export async function ensureCatalog() {
  // Multiple server components (layout, page, product queries) call this
  // concurrently on first render. Dedupe with a shared promise so only one
  // seed runs per process, avoiding duplicate-key races on the unique slug.
  if (!seedingPromise) {
    seedingPromise = seed().catch((error) => {
      seedingPromise = null;
      throw error;
    });
  }
  return seedingPromise;
}
