import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 220 }).notNull().unique(),
  name: text("name").notNull(),
  brand: varchar("brand", { length: 80 }).notNull(),
  category: varchar("category", { length: 40 }).notNull(),
  gender: varchar("gender", { length: 20 }).notNull(),
  description: text("description").notNull(),
  priceCents: integer("price_cents").notNull(),
  compareAtCents: integer("compare_at_cents"),
  image: text("image").notNull(),
  hoverImage: text("hover_image"),
  color: varchar("color", { length: 80 }).notNull(),
  sizes: text("sizes").notNull(),
  badge: varchar("badge", { length: 40 }),
  sku: varchar("sku", { length: 40 }).notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  isShoe: boolean("is_shoe").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  trending: boolean("trending").notNull().default(false),
  comingSoon: boolean("coming_soon").notNull().default(false),
  dropDate: varchar("drop_date", { length: 40 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  postalCode: text("postal_code").notNull(),
  notes: text("notes"),
  subtotalCents: integer("subtotal_cents").notNull(),
  shippingCents: integer("shipping_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  name: text("name").notNull(),
  size: text("size").notNull(),
  quantity: integer("quantity").notNull(),
  priceCents: integer("price_cents").notNull(),
  image: text("image").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
