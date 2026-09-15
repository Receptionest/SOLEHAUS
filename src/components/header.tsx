"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { CATEGORIES } from "@/lib/nav";

export function Header() {
  const { count } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    setSearchOpen(false);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#ded5c3] px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#121212]">
        Spring clearance sale · massive discount · free delivery
      </div>
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-black" />
            <span className="mt-1.5 block h-0.5 w-5 bg-black" />
            <span className="mt-1.5 block h-0.5 w-5 bg-black" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black uppercase tracking-[0.24em] md:text-2xl">
              SOLE<span className="text-[#dc2626]">HAUS</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.16em] xl:flex">
            {CATEGORIES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.label === "Sale" ? "text-[#dc2626]" : "hover:text-[#dc2626]"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <button type="button" onClick={() => setSearchOpen((v) => !v)}>
              Search
            </button>
            <Link href="/cart">Cart ({count})</Link>
          </div>
        </div>
        {searchOpen ? (
          <form onSubmit={onSearch} className="mx-auto max-w-7xl px-4 pb-4 lg:px-6">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sneakers, combos, brands…"
              className="w-full border-b border-black bg-transparent py-2 text-sm outline-none"
            />
          </form>
        ) : null}
        {open ? (
          <div className="grid grid-cols-2 gap-2 border-t border-neutral-200 px-4 py-4 lg:hidden">
            {CATEGORIES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.12em]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
