"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CART_STORAGE_KEY, type CartItem } from "@/lib/cart-types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQty: (productId: number, size: string, quantity: number) => void;
  removeItem: (productId: number, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const index = current.findIndex(
        (row) => row.productId === item.productId && row.size === item.size,
      );
      if (index === -1) return [...current, { ...item, quantity }];
      return current.map((row, i) =>
        i === index ? { ...row, quantity: row.quantity + quantity } : row,
      );
    });
  }, []);

  const updateQty = useCallback((productId: number, size: string, quantity: number) => {
    setItems((current) =>
      current
        .map((row) =>
          row.productId === productId && row.size === size ? { ...row, quantity } : row,
        )
        .filter((row) => row.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId: number, size: string) => {
    setItems((current) =>
      current.filter((row) => !(row.productId === productId && row.size === size)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, row) => sum + row.quantity, 0);
    const subtotalCents = items.reduce((sum, row) => sum + row.quantity * row.priceCents, 0);
    return { items, count, subtotalCents, addItem, updateQty, removeItem, clear };
  }, [items, addItem, updateQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
