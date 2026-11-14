import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import coat from "@/assets/p-coat.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/store/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOCTVRN — Capítulo 07 | Streetwear de Luxo" },
      { name: "description", content: "Capítulo 07: silhuetas oversized, alfaiataria crua e edições numeradas. Conceito editorial de e-commerce de luxo." },
      { property: "og:title", content: "NOCTVRN — Capítulo 07" },
      { property: "og:description", content: "Silhuetas oversized, alfaiataria crua e edições numeradas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative h-[calc(100vh-150px)] mx-3 mt-3 rounded-3xl md:mx-6 min-h-[560px] overflow-hidden">
        <img src={hero} alt="Campanha Capítulo 07" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-12 text-background md:px-10">
          <p className="animate-fade-up font-mono font-semibold text-[11px] uppercase tracking-[0.14em]">Outono / Inverno 2026 — Capítulo 07</p>
          <h1 className="animate-fade-up mt-4 font-display text-[19vw] leading-[0.82] tracking-tighter md:text-[12vw]" style={{ animationDelay: "120ms" }}>
            Concreto <em className="text-accent">&amp;</em> Silêncio
          </h1>
          <div className="animate-fade-up mt-8 flex flex-wrap items-end justify-between gap-6" style={{ animationDelay: "240ms" }}>
            <p className="max-w-sm text-sm opacity-80">Silhuetas que ocupam espaço. Tecidos que envelhecem com você. Uma coleção sobre a beleza do que é bruto.</p>
            <Link to="/shop" className="group inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 shadow-xl font-mono font-semibold text-xs uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Explorar coleção <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pt-24 md:px-10">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <h2 className="font-display text-5xl md:text-7xl">Novidades</h2>
          <Link to="/shop" className="link-underline font-mono font-semibold text-[11px] uppercase tracking-[0.1em]">Ver tudo ({products.length})</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
          {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      <section id="editorial" className="mx-auto mt-32 grid max-w-[1600px] gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5 md:col-start-1">
          <img src={coat} alt="Atelier Wool Coat" loading="lazy" width={768} height={1024} className="aspect-[3/4] w-full rounded-2xl bg-muted object-cover" />
        </div>
        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <p className="font-mono font-semibold text-[11px] uppercase tracking-[0.14em] text-accent">Editorial — Nº 07</p>
          <h3 className="mt-6 font-display text-5xl leading-[0.95] md:text-8xl">O luxo <em>não grita.</em> Ele permanece.</h3>
          <p className="mt-8 max-w-md text-muted-foreground">Cada peça do Atelier é cortada e costurada à mão em pequenas tiragens. Lã double-face, couro de bezerro, metais em paládio — matérias-primas escolhidas para durar décadas, não estações.</p>
          <div className="mt-10 grid grid-cols-3 border-t border-border pt-6 font-mono font-semibold text-[10px] uppercase tracking-[0.1em]">
            <div><p className="font-display text-4xl normal-case tracking-normal">150</p>peças por drop</div>
            <div><p className="font-display text-4xl normal-case tracking-normal">32h</p>de confecção</div>
            <div><p className="font-display text-4xl normal-case tracking-normal">03</p>ateliês</div>
          </div>
          <Link to="/product/$id" params={{ id: "atelier-coat" }} className="link-underline mt-10 self-start font-mono font-semibold text-xs uppercase tracking-[0.14em]">Ver o sobretudo →</Link>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
          {products.slice(4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>
    </>
  );
}
