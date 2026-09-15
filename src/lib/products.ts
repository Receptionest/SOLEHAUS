import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { and, asc, desc, eq, ilike, ne, or, sql, type SQL } from "drizzle-orm";
import { ensureCatalog } from "@/lib/seed";

export type ProductFilters = {
  category?: string;
  brand?: string;
  gender?: string;
  q?: string;
  sale?: boolean;
  comingSoon?: boolean;
  trending?: boolean;
  sort?: string;
};



export async function getProducts(filters: ProductFilters = {}) {
  await ensureCatalog();
  const clauses: SQL[] = [];

  if (filters.category) {
    clauses.push(eq(products.category, filters.category));
  }
  if (filters.brand) {
    clauses.push(eq(products.brand, filters.brand));
  }
  if (filters.gender) {
    clauses.push(eq(products.gender, filters.gender));
  }
  if (filters.q) {
    const term = `%${filters.q}%`;
    const search = or(
      ilike(products.name, term),
      ilike(products.brand, term),
      ilike(products.color, term),
      ilike(products.sku, term),
    );
    if (search) clauses.push(search);
  }
  if (filters.sale) {
    clauses.push(sql`${products.compareAtCents} is not null`);
  }
  if (filters.comingSoon) {
    clauses.push(eq(products.comingSoon, true));
  } else if (filters.trending) {
    clauses.push(eq(products.trending, true));
  }

  const where = clauses.length ? and(...clauses) : undefined;

  let orderBy;
  switch (filters.sort) {
    case "price-asc":
      orderBy = asc(products.priceCents);
      break;
    case "price-desc":
      orderBy = desc(products.priceCents);
      break;
    case "name":
      orderBy = asc(products.name);
      break;
    default:
      orderBy = desc(products.createdAt);
  }

  return db
    .select()
    .from(products)
    .where(where)
    .orderBy(orderBy);
}

export async function getProductBySlug(slug: string) {
  await ensureCatalog();
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getFeatured() {
  await ensureCatalog();
  return db.select().from(products).where(eq(products.featured, true)).orderBy(desc(products.id));
}

export async function getTrending() {
  await ensureCatalog();
  return db.select().from(products).where(eq(products.trending, true)).orderBy(asc(products.id));
}

export async function getComingSoon() {
  await ensureCatalog();
  return db
    .select()
    .from(products)
    .where(eq(products.comingSoon, true))
    .orderBy(asc(products.dropDate));
}

export async function getRelated(product: Product) {
  await ensureCatalog();
  return db
    .select()
    .from(products)
    .where(and(eq(products.brand, product.brand), ne(products.id, product.id)))
    .limit(4);
}

export async function getBrands() {
  await ensureCatalog();
  const rows = await db
    .selectDistinct({ brand: products.brand })
    .from(products)
    .orderBy(asc(products.brand));
  return rows.map((row) => row.brand);
}
