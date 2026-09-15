export const SHOE_MARKUP_ZAR = 650;
export const FREE_DELIVERY_CENTS = 80000;
export const FLAT_SHIPPING_CENTS = 12000;

export function zarToCents(zar: number) {
  return Math.round(zar * 100);
}

export function sellPriceCents(originalZar: number, isShoe: boolean) {
  return zarToCents(isShoe ? originalZar + SHOE_MARKUP_ZAR : originalZar);
}

export function formatZar(cents: number) {
  const value = cents / 100;
  return `R\u00a0${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function shippingCentsFor(subtotalCents: number) {
  return subtotalCents >= FREE_DELIVERY_CENTS ? 0 : FLAT_SHIPPING_CENTS;
}
