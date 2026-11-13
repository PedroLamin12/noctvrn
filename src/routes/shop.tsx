import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/store/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Loja — NOCTVRN" },
      { name: "description", content: "Catálogo completo NOCTVRN: outerwear, tops, bottoms, footwear e acessórios de luxo." },
      { property: "og:title", content: "Loja — NOCTVRN" },
      { property: "og:description", content: "Catálogo completo de streetwear de luxo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "asc" | "desc";
const ranges = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "Até R$ 2.000", min: 0, max: 2000 },
  { label: "R$ 2.000 – 4.000", min: 2000, max: 4000 },
  { label: "Acima de R$ 4.000", min: 4000, max: Infinity },
];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>{children}</button>
  );
}

function Shop() {
  const [cat, setCat] = useState<Category | "Todos">("Todos");
  const [range, setRange] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const allSizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizes))), []);

  const list = useMemo(() => {
    const r = ranges[range] ?? ranges[0]!;
    const l = products.filter((p) => (cat === "Todos" || p.category === cat) && p.price >= r.min && p.price < r.max && (!size || p.sizes.includes(size)));
    return sort === "asc" ? [...l].sort((a, b) => a.price - b.price) : sort === "desc" ? [...l].sort((a, b) => b.price - a.price) : l;
  }, [cat, range, size, sort]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-16 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
        <h1 className="font-display text-7xl leading-none md:text-9xl">Loja<sup className="ml-2 font-mono text-sm align-top">{String(list.length).padStart(2, "0")}</sup></h1>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border-b border-foreground bg-transparent py-2 font-mono text-[11px] uppercase tracking-[0.2em] outline-none">
          <option value="featured">Destaques</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>

      <div className="grid gap-10 pt-10 md:grid-cols-[220px_1fr]">
        <aside className="space-y-8 md:sticky md:top-28 md:self-start">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Categoria</p>
            <div className="flex flex-wrap gap-2">
              {(["Todos", ...categories] as const).map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Preço</p>
            <div className="flex flex-wrap gap-2">
              {ranges.map((r, i) => <Chip key={r.label} active={range === i} onClick={() => setRange(i)}>{r.label}</Chip>)}
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Tamanho</p>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => <Chip key={s} active={size === s} onClick={() => setSize(size === s ? null : s)}>{s}</Chip>)}
            </div>
          </div>
          <button onClick={() => { setCat("Todos"); setRange(0); setSize(null); setSort("featured"); }} className="link-underline font-mono text-[10px] uppercase tracking-[0.2em]">Limpar filtros</button>
        </aside>

        {list.length === 0 ? (
          <p className="py-24 text-center font-display text-4xl italic">Nenhuma peça com esses filtros.</p>
        ) : (
          <div key={`${cat}-${range}-${size}-${sort}`} className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3">
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
