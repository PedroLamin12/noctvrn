import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/store/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — NOCTVRN` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — NOCTVRN` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Peça não encontrada — NOCTVRN" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(p.sizes.length === 1 ? (p.sizes[0] ?? null) : null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [warn, setWarn] = useState(false);
  const views = [{ s: 1, pos: "center" }, { s: 1.8, pos: "30% 30%" }, { s: 1.8, pos: "70% 75%" }];
  const [view, setView] = useState(0);
  const related = products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-8 md:px-10">
      <Link to="/shop" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"><ChevronLeft className="h-3 w-3" /> Loja / {p.category}</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-12">
        <div className="flex gap-3 md:col-span-7">
          <div className="hidden flex-col gap-3 md:flex">
            {views.map((v, i) => (
              <button key={i} onClick={() => setView(i)} className={`h-24 w-[72px] overflow-hidden bg-muted outline-offset-2 ${view === i ? "outline outline-1 outline-foreground" : "opacity-60 hover:opacity-100"}`}>
                <img src={p.image} alt="" className="h-full w-full object-cover" style={{ transform: `scale(${v.s})`, objectPosition: v.pos, transformOrigin: v.pos }} />
              </button>
            ))}
          </div>
          <div
            className="relative flex-1 cursor-zoom-in overflow-hidden bg-muted"
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
            onMouseLeave={() => setZoom(null)}
          >
            <img key={view} src={p.image} alt={p.name} width={768} height={1024} className="animate-fade-up aspect-[3/4] w-full object-cover transition-transform duration-300"
              style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : { transform: `scale(${views[view]?.s ?? 1})`, transformOrigin: views[view]?.pos }} />
            <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Passe o cursor para ampliar</span>
          </div>
        </div>

        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{p.line}{p.tag ? ` — ${p.tag}` : ""}</p>
          <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">{p.name}</h1>
          <p className="mt-4 font-mono text-lg">{formatPrice(p.price)}</p>
          <p className="mt-6 max-w-md text-muted-foreground">{p.description}</p>

          <div className="mt-8">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em]"><span>Tamanho {warn && !size && <span className="text-accent">— selecione</span>}</span><span className="text-muted-foreground">Cor: {p.colors.join(" / ")}</span></div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {p.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`border py-3 font-mono text-xs transition-colors ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>
          <button onClick={() => (size ? add(p.id, size) : setWarn(true))} className="mt-6 w-full bg-foreground py-5 font-mono text-xs uppercase tracking-[0.3em] text-background transition-colors hover:bg-accent hover:text-accent-foreground">
            Adicionar à sacola
          </button>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {p.details.map((d) => <li key={d} className="py-3 font-mono text-[11px] uppercase tracking-[0.15em]">✦ {d}</li>)}
            <li className="py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Envio em 48h · Trocas em 30 dias</li>
          </ul>
        </div>
      </div>

      <section className="mt-32">
        <h2 className="border-b border-border pb-6 font-display text-5xl">Complete o look</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
          {related.map((r, i) => <ProductCard key={r.id} p={r} index={i} />)}
        </div>
      </section>
    </div>
  );
}
