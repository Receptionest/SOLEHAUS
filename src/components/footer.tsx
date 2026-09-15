import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 bg-[#242833] text-white">
      <div className="grid grid-cols-2 gap-6 border-b border-white/10 px-6 py-10 text-center md:grid-cols-4">
        {[
          ["Free Delivery", "On qualifying sneaker orders"],
          ["Nationwide Courier", "Tracked to your door"],
          ["Sneaker Combos", "Two pairs, one checkout"],
          ["Easy Returns", "Simple refund policy"],
        ].map(([title, copy]) => (
          <div key={title}>
            <p className="text-sm font-semibold">{title}</p>
            <p className="mt-1 text-xs text-white/60">{copy}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <p className="text-2xl font-black uppercase tracking-[0.24em]">
            SOLE<span className="text-[#dc2626]">HAUS</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Sneakers, sneaker combos, weaves and extras. Quality pairs that last, delivered
            across South Africa.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8d9b8]">Shop</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <Link href="/shop?category=combos">Sneaker Combos</Link>
            <Link href="/shop?category=sneakers">Sneakers</Link>
            <Link href="/shop?brand=Nike">Nike</Link>
            <Link href="/shop?brand=Jordan">Jordan</Link>
            <Link href="/sale">Sale</Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8d9b8]">More</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <Link href="/shop?category=weaves">Weaves</Link>
            <Link href="/shop?category=accessories">Caps</Link>
            <Link href="/about">Customer reviews</Link>
            <Link href="/about">Contact</Link>
          </div>
        </div>
        <div className="text-sm text-white/70">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8d9b8]">
            Policies
          </p>
          <p className="mt-4">Shipping calculated at checkout.</p>
          <p className="mt-2">Refunds within 7 days on unused items.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-[11px] uppercase tracking-[0.16em] text-white/50">
        © {new Date().getFullYear()} SOLEHAUS · South Africa
      </div>
    </footer>
  );
}
