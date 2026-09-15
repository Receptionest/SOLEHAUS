import type { NewProduct } from "@/db/schema";
import raw from "@/lib/store-catalog.json";

export type CatalogRow = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  gender: string;
  description: string;
  priceCents: number;
  compareAtCents: number | null;
  image: string;
  hoverImage: string | null;
  color: string;
  sizes: string[];
  badge: string | null;
  sku: string;
  inStock: boolean;
  isShoe: boolean;
  featured: boolean;
  trending: boolean;
  comingSoon: boolean;
  dropDate: string | null;
};

const CATALOG = raw as CatalogRow[];

export function catalogInserts(): NewProduct[] {
  return CATALOG.map((item) => ({
    slug: item.slug,
    name: item.name,
    brand: item.brand,
    category: item.category,
    gender: item.gender,
    description: item.description,
    priceCents: item.priceCents,
    compareAtCents: item.compareAtCents,
    image: item.image,
    hoverImage: item.hoverImage,
    color: item.color,
    sizes: JSON.stringify(item.sizes),
    badge: item.badge,
    sku: item.sku,
    inStock: item.inStock,
    isShoe: item.isShoe,
    featured: item.category === "combos",
    trending: item.category === "sneakers",
    comingSoon: false,
    dropDate: item.dropDate,
  }));
}

export { BRANDS, CATEGORIES } from "@/lib/nav";
