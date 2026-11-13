type RelatedProduct = {
  name: string;
  href: string;
};

export default function RelatedProductLinks({ items }: { items: RelatedProduct[] }) {
  return (
    <section className="border-t border-[#D3DFE7] bg-white px-6 py-14 md:px-10 md:py-20 lg:px-[55px] lg:py-24">
      <div className="mx-auto w-full max-w-[1330px]">
        <p className="t-eyebrow m-0 text-[#0A6A88]">Other MQS Solutions</p>
        <h2 className="t-h2 mb-0 mt-4 text-[#0B2A3A]">Explore related inspection platforms.</h2>
        <div className="mt-9 grid gap-px border border-[#D3DFE7] bg-[#D3DFE7] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <a key={item.name} href={item.href} className="group flex min-h-[112px] items-center justify-between gap-5 bg-white p-6 text-[#0B2A3A] no-underline transition-colors hover:bg-[#EAF6FB]">
              <span className="t-h4">{item.name}</span>
              <span aria-hidden className="text-lg text-[#0A6A88] transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
