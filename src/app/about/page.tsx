export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">SOLEHAUS</p>
      <h1 className="mt-2 text-4xl font-black uppercase tracking-tight">Help & contact</h1>
      <p className="mt-5 text-sm leading-relaxed text-neutral-600">
        Sneakers, sneaker combos, weaves and extras — quality pairs delivered by courier across
        South Africa. Combos are two pairs in one checkout.
      </p>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700">
        <p>
          <strong>Shipping.</strong> Nationwide courier. Tracking is sent once your order is packed.
          Free delivery on qualifying orders over R800.
        </p>
        <p>
          <strong>Refunds.</strong> Unused items in original condition can be returned within 7 days.
        </p>
        <p>
          <strong>Weaves.</strong> Weave orders follow a seasonal calendar. Check the Weaves
          collection for what is currently open.
        </p>
        <p>
          <strong>Sizes.</strong> Sneakers use UK sizing (typically 3–10). If you are between sizes,
          we recommend going half a size up.
        </p>
        <p>
          <strong>Orders.</strong> You receive an order reference immediately at checkout and email
          updates as your parcel moves.
        </p>
      </div>
    </main>
  );
}
