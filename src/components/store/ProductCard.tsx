import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { add } = useCart();
  return (
    <div className="group animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        <Link to="/product/$id" params={{ id: p.id }}>
          <img src={p.image} alt={p.name} loading="lazy" width={768} height={1024} className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
        </Link>
        {p.tag && <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 font-mono font-semibold text-[9px] uppercase tracking-[0.1em]">{p.tag}</span>}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 flex-wrap gap-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {p.sizes.map((s) => (
            <button key={s} onClick={() => add(p.id, s)} className="flex-1 rounded-full bg-background/90 py-2 font-mono font-semibold text-[10px] uppercase backdrop-blur hover:bg-foreground hover:text-background">{s}</button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono font-semibold text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{p.line}</p>
          <Link to="/product/$id" params={{ id: p.id }} className="text-sm font-medium">{p.name}</Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-xs">{formatPrice(p.price)}</span>
          <button onClick={() => add(p.id, p.sizes[0] ?? "Único")} aria-label={`Adicionar ${p.name}`} className="grid h-7 w-7 place-items-center rounded-full border border-border md:hidden"><Plus className="h-3 w-3" /></button>
        </div>
      </div>
    </div>
  );
}
