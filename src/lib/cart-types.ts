export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  quantity: number;
  priceCents: number;
};

export const CART_STORAGE_KEY = "solehaus-cart";
